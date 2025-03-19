'use server'

import { signInSchema, signUpSchema } from '../validators'
import { signIn, signOut } from '@/auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { hashSync } from 'bcrypt-ts-edge'
import { prisma } from '@/db/prisma'
import { formatError } from '../utils'

export async function singInWithCredentials(
	prevState: unknown,
	formData: FormData
) {
	try {
		const user = signInSchema.parse({
			email: formData.get('email'),
			password: formData.get('password'),
		})

		await signIn('credentials', user)

		return { success: true, message: 'Signed in successfully' }
	} catch (error) {
		if (isRedirectError(error)) {
			throw error
		}
		return { success: false, message: 'Invalid email or password' }
	}
}

export async function singOutUser() {
	await signOut()
}

export async function signUpUser(prev: unknown, formData: FormData) {
	try {
		const user = signUpSchema.parse({
			email: formData.get('email'),
			name: formData.get('name'),
			password: formData.get('password'),
			confirmPassword: formData.get('confirmPassword'),
		})

		const plainPassword = user.password

		user.password = hashSync(user.password, 10)

		await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
			},
		})

		await signIn('credentials', {
			email: user.email,
			password: plainPassword,
		})

		return { success: true, message: 'Successful registration!' }
	} catch (error) {
		if (isRedirectError(error)) {
			throw error
		}
		return { success: false, message: formatError(error) }
	}
}
