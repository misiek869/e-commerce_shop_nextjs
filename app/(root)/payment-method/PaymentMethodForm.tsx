'use client'

import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useTransition } from 'react'
import { paymentMethodsSchema } from '@/lib/validators'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from '@/lib/constants'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TbLoader } from 'react-icons/tb'
import { FaArrowRight } from 'react-icons/fa'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const PaymentMethodForm = ({
	preferredPaymentMethod,
}: {
	preferredPaymentMethod: string | null
}) => {
	const router = useRouter()
	const { toast } = useToast()
	const form = useForm<z.infer<typeof paymentMethodsSchema>>({
		resolver: zodResolver(paymentMethodsSchema),
		defaultValues: {
			type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
		},
	})

	const [isPending, startTransition] = useTransition()

	const onSubmit = () => {
		return
	}

	return (
		<>
			return (
			<>
				<div className='max-w-md mx-auto space-y-4'>
					<h2 className='mt-4 text-2xl lg:text-3xl tracking-wide'>
						Payment Method
					</h2>
					<Form {...form}>
						<form
							method='post'
							className='space-y-4'
							onSubmit={form.handleSubmit(onSubmit)}>
							<div className='flex flex-col md:flex-row gap-5'>
								<FormField
									control={form.control}
									name='type'
									render={({ field }) => (
										<FormItem className='space-y-3'>
											<FormControl>
												<RadioGroup
													onValueChange={field.onChange}
													className='flex flex-col space-y-2'>
													{PAYMENT_METHODS.map(item => {
														return (
															<FormItem
																key={item}
																className='flex items-center space-x-3'>
																<FormControl>
																	<RadioGroupItem
																		value={item}
																		checked={
																			field.value === item
																		}></RadioGroupItem>
																</FormControl>
																<FormLabel className='font-normal'>
																	{item}
																</FormLabel>
															</FormItem>
														)
													})}
												</RadioGroup>
											</FormControl>
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
		</>
	)
}

export default PaymentMethodForm
