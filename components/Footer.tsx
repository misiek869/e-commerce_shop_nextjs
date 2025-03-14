import React from 'react'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='border-t p-5 flex-center'>
			{currentYear} Car Care Detailing Shop
		</footer>
	)
}

export default Footer
