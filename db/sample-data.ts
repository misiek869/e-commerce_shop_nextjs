import { hashSync } from 'bcrypt-ts-edge'

const sampleData = {
	users: [
		{
			name: 'Michael',
			email: 'michael@michael.com',
			role: 'admin',
			password: hashSync('1234', 10),
		},
		{
			name: 'Dorothy',
			email: 'dorothy@michael.com',
			role: 'user',
			password: hashSync('1234', 10),
		},
	],

	products: [
		{
			name: 'CarPro Reload',
			slug: 'carPro-reload',
			category: 'CarPro',
			description: 'CarPro Reload',
			images: [
				'/images/sample-products/p1-1.jpg',
				'/images/sample-products/p1-2.jpg',
			],
			price: 59.99,
			brand: 'CarPro',
			rating: 4.5,
			numReviews: 10,
			stock: 5,
			isFeatured: true,
			banner: 'banner-1.jpg',
		},
		{
			name: 'CarPro ImmoGel',
			slug: 'carPro-immoGel',
			category: 'CarPro',
			description: 'CarPro ImmoGel',
			images: [
				'/images/sample-products/p2-1.jpg',
				'/images/sample-products/p2-2.jpg',
			],
			price: 85.9,
			brand: 'CarPro',
			rating: 4.2,
			numReviews: 8,
			stock: 10,
			isFeatured: true,
			banner: 'banner-2.jpg',
		},
		{
			name: 'CarPro Gliss 2.0',
			slug: 'carPro-gliss-2.0',
			category: 'CarPro',
			description: 'CarPro Gliss 2.0',
			images: [
				'/images/sample-products/p3-1.jpg',
				'/images/sample-products/p3-2.jpg',
			],
			price: 99.95,
			brand: 'CarPro',
			rating: 4.9,
			numReviews: 3,
			stock: 0,
			isFeatured: false,
			banner: null,
		},
		{
			name: 'CarPro Cleanse Leather',
			slug: 'CarPro-cleanse-leather',
			category: 'CarPro',
			description: 'CarPro Cleanse Leather',
			images: [
				'/images/sample-products/p4-1.jpg',
				'/images/sample-products/p4-2.jpg',
			],
			price: 39.95,
			brand: 'CarPro',
			rating: 3.6,
			numReviews: 5,
			stock: 10,
			isFeatured: false,
			banner: null,
		},
		{
			name: 'CarPro DarkSide',
			slug: 'carPro-arkSide',
			category: 'CarPro',
			description: 'CarPro DarkSide',
			images: [
				'/images/sample-products/p5-1.jpg',
				'/images/sample-products/p5-2.jpg',
			],
			price: 79.99,
			brand: 'CarPro',
			rating: 4.7,
			numReviews: 18,
			stock: 6,
			isFeatured: false,
			banner: null,
		},
	],
}

export default sampleData
