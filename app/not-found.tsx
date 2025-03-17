'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const NotFoundPage = () => {
	return (
		<div className='flex flex-col min-h-screen justify-center items-center'>
			<Image
				src={'/images/Logo.svg'}
				width={120}
				height={120}
				alt='Logo'
				priority={true}
			/>
			<div className='text-center mt-12'>
				<h1 className='text-3xl font-bold mb-4'>Not Found</h1>
				<p className='text-destructive'>We can not find requested page </p>
				<Button
					variant={'outline'}
					className='mt-4 ml-2'
					onClick={() => {
						window.location.href = '/'
					}}>
					Back Home
				</Button>
			</div>
		</div>
	)
}

export default NotFoundPage
