import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import '@/assets/styles/globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})
const inter = Inter({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Super Shop',
	description: 'Super E-commerce Shop',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className}`}>{children}</body>
		</html>
	)
}
