import { auth } from '@/auth'
import { getMyCart } from '@/lib/actions/cart.actions'
import { getUserById } from '@/lib/actions/user.actions'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { ShippingAddressType } from '@/types'
import ShippingAddressForm from './ShippingAddressForm'
import { shippingAddressSchema } from '@/lib/validators'
import { shippingAddressDefaultValues } from '@/lib/constants'

export const metadata = {
	title: 'Shipping Address',
}

const ShippingAddressPage = async () => {
	const cart = await getMyCart()
	const session = await auth()
	const userId = session?.user?.id
	const user = await getUserById(userId)

	if (!cart || cart.items.length === 0) {
		redirect('/cart')
	}

	if (!userId) {
		throw new Error('No User Id')
	}

	
	return (
		<>
			<ShippingAddressForm address={user.address as ShippingAddressType} />
		</>
	)
}

export default ShippingAddressPage
