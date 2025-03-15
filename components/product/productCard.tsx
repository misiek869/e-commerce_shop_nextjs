import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import ProductPrice from './productPrice'
import { Product as ProductType } from '@/types'

const ProductCard = ({ product }: { product: ProductType }) => {
	return (
		<Card className='w-full max-w-sm'>
			<CardHeader className='p-0 items-center'>
				<Link href={`/product/${product.slug}`}>
					<Image
						src={product.images[0]}
						alt={product.name}
						height={300}
						width={300}
						priority={true}
					/>
				</Link>
			</CardHeader>
			<CardContent className='p-4 grid gap-4'>
				<div className='text-xs'>{product.brand}</div>
				<Link href={`/product/${product.slug}`}>
					<h2 className='text-sm font-medium'>{product.name}</h2>
				</Link>
				<div className='flex-between gap-4'>
					<p className=''>{product.rating} Stars</p>
					{product.stock > 1 ? (
						<div className='font-bold'>
							<ProductPrice value={Number(product.price)} />
						</div>
					) : (
						<p className='text-destructive'>Out Of Stock</p>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export default ProductCard
