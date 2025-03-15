'use server'

import { PrismaClient } from '@prisma/client'
import { convertToJsPlainObject } from '../utils'
import { LATEST_PRODUCTS_LIMIT } from '../constants'

export async function getLatestProducts() {
	const prisma = new PrismaClient()

	const data = await prisma.product.findMany({
		take: LATEST_PRODUCTS_LIMIT,

		orderBy: { createdAt: 'desc' },
	})

	console.log(data)
	return convertToJsPlainObject(data)
}
