import React from 'react'

import { cn } from '@/lib/utils'

const CheckoutSteps = ({ current = 0 }) => {
	return (
		<div className='flex-between flex-col space-x-2 space-y-2 mb-10 md:flex-row'>
			{['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
				(item, index) => {
					return (
						<React.Fragment key={index}>
							<div
								className={cn(
									'p-2 w-56 rounded-full text-center text-sm',
									index === current ? 'bg-secondary' : ''
								)}>
								{item}
							</div>
							{item !== 'Place Order' && (
								<hr className='w-16 border-slate-300 mx-2'></hr>
							)}
						</React.Fragment>
					)
				}
			)}
		</div>
	)
}

export default CheckoutSteps
