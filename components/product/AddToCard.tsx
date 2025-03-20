'use client'

import { CartItem } from '@/types'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/types'
import { FaCirclePlus } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '../ui/toast'
import { addItemToCart } from '@/lib/actions/cart.actions'

const AddToCard = ({ item }: { item: CartItem }) => {
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

	return (
		<Button
			className='w-full capitalize'
			type='button'
			onClick={handleAddToCart}>
			add to cart
		</Button>
	)
}

export default AddToCard
