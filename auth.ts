import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'
import type { NextAuthConfig } from 'next-auth'

export const config = {
	pages: {
		signIn: '/sign-in',
		error: '/sign-in',
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			credentials: {
				email: { type: 'email' },
				password: { type: 'password' },
			},
			async authorize(credentials) {
				if (credentials == null) return null
				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email as string,
					},
				})

				if (user && user.password) {
					const isPasswordMatch = compareSync(
						credentials.password as string,
						user.password
					)

					if (isPasswordMatch) {
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							role: user.role,
						}
					}
				}
				// return null when user doesn't exist or password doesn't match
				return null
			},
		}),
	],
	callbacks: {
		async session({ session, user, trigger, token }: any) {
			session.user.id = token.sub

			if (trigger === 'update') {
				session.user.name = user.name
				session.user.role = token.role
				session.user.name = token.name
			}

			console.log(token)

			return session
		},

		async jwt({ token, user, trigger, session }: any) {
			if (user) {
				token.role = user.role

				if (user.name === 'NO_NAME') {
					token.name = user.email!.split('@')[0]

					await prisma.user.update({
						where: { id: user.id },
						data: { name: token.name },
					})
				}
			}

			return token
		},
	},
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
