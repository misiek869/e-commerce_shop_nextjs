import { z } from 'zod'
import { formatPrice } from './utils'

export const currency = z
	.string()
	.refine(
		value => /^\d+(\.\d{2})?$/.test(formatPrice(Number(value))),
		'price must have exactly '
	)

export const insertProductSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	slug: z.string().min(3, 'Slug must be at least 3 characters'),
	category: z.string().min(3, 'Category must be at least 3 characters'),
	brand: z.string().min(3, 'Brand must be at least 3 characters'),
	description: z.string().min(3, 'Description must be at least 3 characters'),
	stock: z.coerce.number(),
	images: z.array(z.string()).min(1, 'Product must have al least one image'),
	isFeatured: z.boolean(),
	banner: z.string().nullable(),
	price: currency,
})

export const signInSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signUpSchema = z
	.object({
		name: z.string().min(3, 'Name must be at least 3 characters'),
		email: z.string().email('Invalid email address'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string().min(6, ''),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Password don't match",
		path: ['confirmPassword'],
	})
