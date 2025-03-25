import { auth } from '@/auth'
import { getUserById } from '@/lib/actions/user.actions'
import PaymentMethodForm from './PaymentMethodForm'

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
			<PaymentMethodForm preferedPaymentMethod={user.paymentMethod} />
		</>
	)
}

export default PaymentMethodPage
