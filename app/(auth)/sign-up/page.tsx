import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import SignUpForm from '@/components/credentials/SignUpForm'

export const metadata: Metadata = {
	title: 'Sign Up',
}

const SingUpPage = async (props: {
	searchParams: Promise<{ callbackUrl: string }>
}) => {
	const { callbackUrl } = await props.searchParams

	const session = await auth()

	if (session) {
		return redirect(callbackUrl || '/')
	}

	return (
		<div className='w-full max-w-md mx-auto'>
			<Card>
				<CardHeader className='space-y-4'>
					<Link className='flex-center' href={'/'}>
						<Image
							src={'/images/Logo.svg'}
							width={100}
							height={100}
							alt='store logo'
							priority={true}
						/>
					</Link>
					<CardTitle className='text-center'>Sign Up</CardTitle>
					<CardDescription className='text-center'>
						Create new account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<SignUpForm />
				</CardContent>
			</Card>
		</div>
	)
}

export default SingUpPage
