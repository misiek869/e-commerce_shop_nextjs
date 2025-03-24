export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Super Store'
export const APP_DESCRIPTION =
	process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Super Store'
export const SERVER_URL =
	process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
export const LATEST_PRODUCTS_LIMIT =
	Number(process.env.LATEST_PRODUCTS_LIMIT) || 4

export const signUpDefaultValues = {
	email: '',
	name: '',
	password: '',
	confirmPassword: '',
}

export const shippingAddressDefaultValues = {
	fullName: 'Michael',
	streetAddress: '321 Random Street',
	city: 'Los Angeles',
	postalCode: '2340',
	country: 'United States',
}

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
	? process.env.PAYMENT_METHODS.split(', ')
	: ['Paypal', 'Stripe', 'CashOnDelivery']

export const DEFAULT_PAYMENT_METHOD =
	process.env.DEFAULT_PAYMENT_METHOD || 'Paypal'
