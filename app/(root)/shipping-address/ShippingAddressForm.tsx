'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ControllerRenderProps, useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { ShippingAddressType } from '@/types'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useTransition } from 'react'
import { shippingAddressSchema } from '@/lib/validators'
import { shippingAddressDefaultValues } from '@/lib/constants'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TbLoader } from 'react-icons/tb'
import { FaArrowRight } from 'react-icons/fa'
import { updateUserAddress } from '@/lib/actions/user.actions'

const ShippingAddressForm = ({ address }: { address: ShippingAddressType }) => {
	const router = useRouter()
	const { toast } = useToast()
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof shippingAddressSchema>>({
		resolver: zodResolver(shippingAddressSchema),
		defaultValues: address || shippingAddressDefaultValues,
	})

	const onSubmit: SubmitHandler<
		z.infer<typeof shippingAddressSchema>
	> = async values => {
		startTransition(async () => {
			const response = await updateUserAddress(values)

			if (!response) {
				toast({
					variant: 'destructive',
					description: response.message,
				})
			}

			router.push('/payment-method')
		})
	}

	return (
		<>
			<div className='max-w-md mx-auto space-y-4'>
				<h2 className='mt-4 text-2xl lg:text-3xl tracking-wide'>
					Shipping Address
				</h2>
				<Form {...form}>
					<form
						method='post'
						className='space-y-4'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex flex-col md:flex-row gap-5'>
							<FormField
								control={form.control}
								name='fullName'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<Input placeholder='Enter full name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex flex-col md:flex-row gap-5'>
							<FormField
								control={form.control}
								name='streetAddress'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Address</FormLabel>
										<FormControl>
											<Input placeholder='Enter address' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex flex-col md:flex-row gap-5'>
							<FormField
								control={form.control}
								name='city'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>City</FormLabel>
										<FormControl>
											<Input placeholder='Enter city' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex flex-col md:flex-row gap-5'>
							<FormField
								control={form.control}
								name='postalCode'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Postal Code</FormLabel>
										<FormControl>
											<Input placeholder='Enter postal code' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex flex-col md:flex-row gap-5'>
							<FormField
								control={form.control}
								name='country'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Country</FormLabel>
										<FormControl>
											<Input placeholder='Enter country' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex gap-2'>
							<Button type='submit' disabled={isPending}>
								{isPending ? (
									<TbLoader className='animate-spin w-4 h-4' />
								) : (
									<FaArrowRight className='w-4 h-4' />
								)}{' '}
								Send
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</>
	)
}

export default ShippingAddressForm
