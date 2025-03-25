'use client'

import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { use, useTransition } from 'react'
import { paymentMethodsSchema } from '@/lib/validators'
import CheckoutSteps from '@/components/product/CheckoutSteps'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { DEFAULT_PAYMENT_METHOD } from '@/lib/constants'

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

	return (
		<>
			<CheckoutSteps current={2} />
		</>
	)
}

export default PaymentMethodForm
