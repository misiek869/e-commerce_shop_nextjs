import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'

const Header = () => {
	return (
		<header className='border-b w-full'>
			<div className='wrapper flex-between'>
				<div className='flex-start'>
					<Link href={'/'}>
						<div className='flex items-center'>
							<Image
								src='./images/Logo.svg'
								height={48}
								width={48}
								alt='logo'
								priority={true}
							/>
							<span className='hidden lg:block font-bold text-2xl ml-3'>
								Detailing Shop
							</span>
						</div>
					</Link>
				</div>
				<Menu />
			</div>
		</header>
	)
}

export default Header
