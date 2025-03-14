import sampleData from '@/db/sample-data'
import ProductList from '@/components/product/productList'

const Homepage = () => {
	return (
		<>
			<ProductList data={sampleData.products} title='New Arrivals' limit={4} />
		</>
	)
}

export default Homepage
