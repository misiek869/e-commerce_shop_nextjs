'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'

const CredentialsSingInForm = () => {
	return (
		<form>
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
				<Button className='w-full' variant={'secondary'}>
					Sign In
				</Button>
			</div>
			<div className='text-sm text-center text-muted-foreground'>
				Don&apos;t have an account?{' '}
				<Link href={'/sign-up'} target='self' className='link'>
					Sign Up
				</Link>
			</div>
		</form>
	)
}

export default CredentialsSingInForm
