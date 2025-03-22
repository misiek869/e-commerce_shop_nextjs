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
					<div className='overflow-x-auto md:col-span-3'>Table</div>
				</div>
			)}
		</div>
	)
}

export default CartTable
