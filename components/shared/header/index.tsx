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
						<Image
							src='./images/Logo.svg'
							height={48}
							width={48}
							alt='logo'
							priority={true}
						/>
						<span className='hidden lg:visible font-bold text-2xl ml-3 '>
							Super Shop
						</span>
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
