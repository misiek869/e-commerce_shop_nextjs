import { CiShoppingCart, CiUser } from 'react-icons/ci'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'

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
				<div className='space-x-2'>
					<Button asChild variant={'ghost'}>
						<Link href={'/cart'}>
							<CiShoppingCart /> Cart
						</Link>
					</Button>
					<Button asChild variant={'ghost'}>
						<Link href={'/sign-in'}>
							<CiUser /> Sign In
						</Link>
					</Button>
				</div>
			</div>
		</header>
	)
}

export default Header
