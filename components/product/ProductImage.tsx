'use client'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type ProductImageProps = {
	images: string[]
}

const ProductImage = ({ images }: ProductImageProps) => {
	const [currentImage, setCurrentImage] = useState(0)

	return (
		<div className='space-y-4'>
			<Image
				src={images[currentImage]}
				width={1000}
				height={1000}
				className='min-h-[300px] object-cover object-center'
				alt='product image'
			/>
			<div className='flex'>
				{images.map((image, index) => {
					return (
						<div
							className={cn(
								'border mr-2 cursor-pointer hover:border-r-slate-800 hover:border-yellow-600 duration-150',
								currentImage === index && 'border-yellow-600'
							)}
							key={image}
							onClick={() => setCurrentImage(index)}>
							<Image src={image} alt='image small' width={100} height={100} />
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default ProductImage
