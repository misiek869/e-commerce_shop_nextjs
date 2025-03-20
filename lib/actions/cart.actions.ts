'use server'

import { prisma } from '@/db/prisma'
import { convertToJsPlainObject, formatError } from '../utils'
import { LATEST_PRODUCTS_LIMIT } from '../constants'
import { CartItem } from '@/types'
import { cookies } from 'next/headers'
import { auth } from '@/auth'
import { cartItemSchema } from '../validators'

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

		console.log({
			UserID: userId,
			'session cardId': sessionCartId,
			'Item requested': item,
			'Product found': product,
		})
	} catch (error) {
		return { success: false, message: formatError(error) }
	}

	return { success: true, message: 'item added' }
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
		items: cart.Items as CartItem[],
		itemsPrice: cart.ItemsPrice.toString(),
		totalPrice: cart.TotalPrice.toString(),
		shippingPrice: cart.ShippingPrice.toString(),
		taxPrice: cart.TaxPrice.toString(),
	})
}
