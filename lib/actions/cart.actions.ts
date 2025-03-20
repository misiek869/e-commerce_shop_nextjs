'use server'

import { prisma } from '@/db/prisma'
import { Prisma } from '@prisma/client'
import { convertToJsPlainObject, formatError, roundNUmber } from '../utils'
// import { LATEST_PRODUCTS_LIMIT } from '../constants'
import { CartItem } from '@/types'
import { cookies } from 'next/headers'
import { auth } from '@/auth'
import { cartItemSchema, insertCartSchema } from '../validators'
import { revalidatePath } from 'next/cache'

// calculate prices
const calcPrice = (items: CartItem[]) => {
	const itemsPrice = roundNUmber(
			items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
		),
		shippingPrice = roundNUmber(itemsPrice > 100 ? 0 : 10),
		taxPrice = roundNUmber(0.23 * itemsPrice),
		totalPrice = roundNUmber(itemsPrice + taxPrice + shippingPrice)

	return {
		itemsPrice: itemsPrice.toFixed(2),
		shippingPrice: shippingPrice.toFixed(2),
		taxPrice: taxPrice.toFixed(2),
		totalPrice: totalPrice.toFixed(2),
	}
}

export async function addItemToCart(data: CartItem) {
	try {
		const sessionCartId = (await cookies()).get('sessionCartId')?.value

		if (!sessionCartId) throw new Error("Can't found cart session")

		const session = await auth()
		const userId = session?.user?.id ? (session.user.id as string) : undefined

		const cart = await getMyCart()

		const item = cartItemSchema.parse(data)

		// find product in db
		const product = await prisma.product.findFirst({
			where: { id: item.productId },
		})

		if (!product) throw new Error('Product not found')
		if (!cart) {
			const newCart = insertCartSchema.parse({
				userId: userId,
				items: [item],
				sessionCartId: sessionCartId,
				...calcPrice([item]),
			})

			await prisma.cart.create({
				data: newCart,
			})

			revalidatePath(`/product/${product.slug}`)
			return { success: true, message: `${product.name} added to cart` }
		} else {
			const existingItem = (cart.items as CartItem[]).find(x => {
				return x.productId === item.productId
			})

			if (existingItem) {
				// check  stock
				if (product.stock < existingItem.quantity + 1) {
					throw new Error('Not enough products')
				}

				// cart.items.find(x => x.productId === item.productId)!.quantity =
				// 	existingItem.quantity + 1
				existingItem.quantity++
			} else {
				if (product.stock < 1) throw new Error('Not enough products')
				cart.items.push(item)
			}

			await prisma.cart.update({
				where: { id: cart.id },
				data: {
					items: cart.items as Prisma.CartUpdateitemsInput[],
					...calcPrice(cart.items as CartItem[]),
				},
			})

			revalidatePath(`/product/${product.slug}`)

			return {
				success: true,
				message: `${product.name} ${
					existingItem ? 'updated' : 'added to'
				} cart`,
			}
		}
	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}

export async function getMyCart() {
	const sessionCartId = (await cookies()).get('sessionCartId')?.value

	if (!sessionCartId) throw new Error("Can't found cart session")

	const session = await auth()
	const userId = session?.user?.id ? (session.user.id as string) : undefined

	// get user cart from db
	const cart = await prisma.cart.findFirst({
		where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
	})

	if (!cart) {
		return undefined
	}

	// if cart exists convert decimals and return
	return convertToJsPlainObject({
		...cart,
		items: cart.items as CartItem[],
		itemsPrice: cart.itemsPrice.toString(),
		totalPrice: cart.totalPrice.toString(),
		shippingPrice: cart.shippingPrice.toString(),
		taxPrice: cart.taxPrice.toString(),
	})
}

export async function removeItemFromCart(productId: string) {
	try {
		const sessionCartId = (await cookies()).get('sessionCartId')?.value

		if (!sessionCartId) throw new Error("Can't found cart session")

		const product = await prisma.product.findFirst({
			where: {
				id: productId,
			},
		})

		if (!product) throw new Error("Can't find product")

		const userCart = await getMyCart()
		if (!userCart) throw new Error("Can't find cart")

		const existingItem = userCart.items.find(
			item => item.productId === productId
		)

		if (!existingItem) throw new Error("Can't find item")

		if (existingItem.quantity === 1) {
			userCart.items = userCart.items.filter(
				item => item.productId !== existingItem.productId
			)
		} else {
			userCart.items.find(item => item.productId === productId)!.quantity =
				existingItem - 1
		}

		await prisma.cart.update({
			where: { id: userCart.id },
			data: {
				items: userCart.items as Prisma.CartUpdateitemsInput[],
				...calcPrice(userCart.items as CartItem[]),
			},
		})

		revalidatePath(`/product/${product.slug}`)

		return { success: true, message: `${product.name} removed successfully` }
	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}
