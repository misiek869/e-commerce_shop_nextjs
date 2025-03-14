import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import '@/assets/styles/globals.css'
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from '@/lib/constants'

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
	title: `${APP_NAME}`,
	description: `${APP_DESCRIPTION}`,
	metadataBase: new URL(SERVER_URL),
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
