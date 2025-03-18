'use server'

import { signInSchema } from '../validators'
import { signIn, signOut } from '@/auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

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
