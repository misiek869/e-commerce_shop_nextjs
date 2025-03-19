'use server'

import { prisma } from '@/db/prisma'
import { convertToJsPlainObject } from '../utils'
import { LATEST_PRODUCTS_LIMIT } from '../constants'
import { CartItem } from '@/types'

export async function addItemToCart(data: CartItem) {
	return { success: true, message: 'item added' }
}
