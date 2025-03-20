'use client'

import { CartItem } from '@/types'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/types'
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '../ui/toast'
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions'
import { Cart } from '@/types'

const AddToCard = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
	const router = useRouter()
	const { toast } = useToast()

	const handleAddToCart = async () => {
		const response = await addItemToCart(item)

		if (!response.success) {
			toast({
				variant: 'destructive',
				description: response.message,
			})
			return
		}

		toast({
			description: response.message,
			action: (
				<ToastAction
					className='bg-primary text-slate-100 hover:bg-slate-600 '
					altText='Go To Cart'
					onClick={() => router.push('/cart')}>
					Go To Cart
				</ToastAction>
			),
		})
	}
	const handleRemoveFromCart = async () => {
		const response = await removeItemFromCart(item.productId)

		toast({
			variant: response.success ? 'default' : 'destructive',
			description: response.message,
		})

		return
	}

	// check if is in the cart

	const existItem = cart && cart.items.find(a => a.productId === item.productId)

	return existItem ? (
		<div className=''>
			<Button type='button' variant={'outline'} onClick={handleRemoveFromCart}>
				<FaCircleMinus className='h-4 w-4' />
			</Button>
			<span className='px-2'>{existItem.quantity}</span>
			<Button type='button' variant={'outline'} onClick={handleAddToCart}>
				<FaCirclePlus className='h-4 w-4' />
			</Button>
		</div>
	) : (
		<Button
			className='w-full capitalize'
			type='button'
			onClick={handleAddToCart}>
			add to cart
		</Button>
	)
}

export default AddToCard
