import { getSingleProduct } from '@/lib/actions/product.actions'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

import { Card, CardContent } from '@/components/ui/card'
import ProductPrice from '@/components/product/productPrice'
import ProductImage from '@/components/product/ProductImage'
import AddToCard from '@/components/product/AddToCard'
import { getMyCart } from '@/lib/actions/cart.actions'

const SingleProductPage = async (props: {
	params: Promise<{ slug: string }>
}) => {
	const { slug } = await props.params
	const product = await getSingleProduct(slug)

	if (!product) notFound()

	const cart = await getMyCart()

	return (
		<>
			<section className=''>
				<div className='grid grid-cols-1 md:grid-cols-5'>
					<div className='col-span-2'>
						<ProductImage images={product.images} />
					</div>
					{/* column */}
					<div className='col-span-2 p-6'>
						<div className='flex flex-col gap-6'>
							<p>
								{product.brand} {product.category}
							</p>
							<h1 className='h3-bold'>{product.name}</h1>
							<p className=''>
								{product.rating} of {product.numReviews} Reviews
							</p>
							<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
								<ProductPrice
									className='w-24 rounded-full bg-slate-600 text-slate-50 px-5 py-2'
									value={Number(product.price)}
								/>
							</div>
						</div>
						<div className='mt-10'>
							<p className='font-semibold'>Description</p>
							<p className=''>{product.description}</p>
						</div>
					</div>
					{/* column */}
					<div className=''>
						<Card>
							<CardContent className='p-4'>
								<div className='mb-2 flex justify-between'>
									<div>Price</div>
									<div>
										<ProductPrice value={Number(product.price)} />
									</div>
								</div>
								<div className='mb-2 flex justify-between'>
									<div>Status</div>
									<div>
										{product.stock > 0 ? (
											<Badge variant={'default'}>In Stock</Badge>
										) : (
											<Badge variant={'destructive'}>Out Of Stock</Badge>
										)}
									</div>
								</div>
								<div className='mt-4'>
									{product.stock > 0 && (
										<div className='flex-center'>
											<AddToCard
												cart={cart}
												item={{
													productId: product.id,
													name: product.name,
													slug: product.slug,
													quantity: 1,
													image: product.images![0],
													price: product.price,
												}}
											/>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</>
	)
}

export default SingleProductPage
