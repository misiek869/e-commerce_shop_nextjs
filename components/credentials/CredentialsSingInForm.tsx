'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { singInWithCredentials } from '@/lib/actions/user.actions'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'

const CredentialsSingInForm = () => {
	const [data, action] = useActionState(singInWithCredentials, {
		success: false,
		message: '',
	})

	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'

	const SingInBtn = () => {
		const { pending } = useFormStatus()

		return (
			<Button disabled={pending} className='w-full' variant={'secondary'}>
				{pending ? 'Signing In...' : 'Sign In'}
			</Button>
		)
	}

	return (
		<form action={action}>
			<input type='hidden' name='callbackUrl' value={callbackUrl} />
			<div className='space-y-6'>
				<div className=''>
					<Label htmlFor='email'>Email</Label>
					<Input
						id='email'
						name='email'
						type='email'
						required
						autoComplete='email'
					/>
				</div>
				<div className=''>
					<Label htmlFor='password'>Password</Label>
					<Input
						id='password'
						name='password'
						type='password'
						required
						autoComplete='password'
					/>
				</div>
				<SingInBtn />
			</div>

			{data && !data.success && (
				<div className='text-center text-destructive'>{data.message}</div>
			)}

			<div className='text-sm text-center text-muted-foreground mt-6'>
				Don&apos;t have an account?{' '}
				<Link href={'/sign-up'} target='self' className='link'>
					Sign Up
				</Link>
			</div>
		</form>
	)
}

export default CredentialsSingInForm
