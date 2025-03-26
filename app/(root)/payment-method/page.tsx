import { auth } from '@/auth'
import { getUserById } from '@/lib/actions/user.actions'
import PaymentMethodForm from './PaymentMethodForm'
import CheckoutSteps from '@/components/product/CheckoutSteps'

export const metadata = {
	title: 'Payment Method',
}

const PaymentMethodPage = async () => {
	const session = await auth()
	const userId = session?.user?.id

	if (!userId) {
		throw new Error('User not found')
	}

	const user = await getUserById(userId)

	return (
		<>
			<CheckoutSteps current={2} />
			<PaymentMethodForm preferedPaymentMethod={user.paymentMethod} />
		</>
	)
}

export default PaymentMethodPage
