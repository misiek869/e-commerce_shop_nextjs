'use server'

import { prisma } from '@/db/prisma'
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
			return { success: true, message: 'item added' }
		} else {
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
