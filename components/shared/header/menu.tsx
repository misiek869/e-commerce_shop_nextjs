import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import ModeToggle from './modeToggle'
import { Button } from '@/components/ui/button'
import { CiShoppingCart, CiUser } from 'react-icons/ci'
import Link from 'next/link'
import { HiEllipsisVertical } from 'react-icons/hi2'

const Menu = () => {
	return (
		<div className=' flex justify-end gap-3'>
			<nav className='hidden md:flex w-full max-w-xs gap-1'>
				<ModeToggle />
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
			</nav>
			<nav className='md:hidden'>
				<Sheet>
					<SheetTrigger className='align-middle'>
						<HiEllipsisVertical />
					</SheetTrigger>
					<SheetContent className='flex flex-col items-start'>
						<SheetTitle>Menu</SheetTitle>
						<ModeToggle />
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
						<SheetDescription></SheetDescription>
					</SheetContent>
				</Sheet>
			</nav>
		</div>
	)
}

export default Menu
