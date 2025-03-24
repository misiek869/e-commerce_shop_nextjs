'use client'

import { Cart } from '@/types'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useTransition } from 'react'
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions'
import { FaArrowRight } from 'react-icons/fa'
import { FaPlus, FaMinus } from 'react-icons/fa6'
import { FaRegSmileWink } from 'react-icons/fa'
import { TbLoader } from 'react-icons/tb'
import Link from 'next/link'
import Image from 'next/image'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const CartTable = ({ cart }: { cart?: Cart }) => {
	const router = useRouter()
	const { toast } = useToast()
	const [isPending, startTransition] = useTransition()

	return (
		<div>
			<h1 className='py-4 font-semibold text-2xl lg:text-3xl tracking-wide'>
				Shopping Cart
			</h1>
			{!cart || cart.items.length === 0 ? (
				<div className=''>
					<h2 className='mb-2 font-medium text-2xl lg:text-xl tracking-wide'>
						Your cart is empty
					</h2>
					<Link href={'/'} className=''>
						Go Shopping
					</Link>
				</div>
			) : (
				<div className='grid md:grid-cols-4 md:gap-5'>
					<div className='overflow-x-auto md:col-span-3'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Item</TableHead>
									<TableHead className='text-center'>Quantity</TableHead>
									<TableHead className='text-right'>Quantity</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{cart.items.map(item => {
									return (
										<TableRow key={item.slug}>
											<TableCell>
												<Link
													href={`/product/${item.slug}`}
													className='flex items-center'>
													<Image
														src={item.image}
														alt={item.name}
														width={50}
														height={50}
													/>
													<span className='px-2'>{item.name}</span>
												</Link>
											</TableCell>
											<TableCell className='flex-center gap-2'>
												<Button
													disabled={isPending}
													variant={'outline'}
													type={'button'}
													onClick={() =>
														startTransition(async () => {
															const response = await removeItemFromCart(
																item.productId
															)

															if (!response.success) {
																toast({
																	variant: 'destructive',
																	description: response.message,
																})
															}
														})
													}>
													{isPending ? (
														<TbLoader className='animate-spin w-4 h-4' />
													) : (
														<FaMinus className='w-4 h-4' />
													)}
												</Button>
												<span>{item.quantity}</span>
												<Button
													disabled={isPending}
													variant={'outline'}
													type={'button'}
													onClick={() =>
														startTransition(async () => {
															const response = await addItemToCart(item)

															if (!response.success) {
																toast({
																	variant: 'destructive',
																	description: response.message,
																})
															}
														})
													}>
													{isPending ? (
														<TbLoader className='animate-spin w-4 h-4' />
													) : (
														<FaPlus className='w-4 h-4' />
													)}
												</Button>
											</TableCell>
											<TableCell className='text-right'>
												${item.price}
											</TableCell>
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
					</div>
				</div>
			)}
		</div>
	)
}

export default CartTable
