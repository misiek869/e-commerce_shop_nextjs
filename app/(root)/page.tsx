import { getLatestProducts } from '@/lib/actions/product.actions'
import ProductList from '@/components/product/productList'

const Homepage = async () => {
	const latesProducts = await getLatestProducts()
	return (
		<>
			<ProductList data={latesProducts} title='New Arrivals' limit={4} />
		</>
	)
}

export default Homepage
