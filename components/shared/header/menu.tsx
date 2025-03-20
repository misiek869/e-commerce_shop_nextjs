import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import ModeToggle from './modeToggle'
import { Button } from '@/components/ui/button'
import { CiShoppingCart } from 'react-icons/ci'
import Link from 'next/link'
import { HiEllipsisVertical } from 'react-icons/hi2'
import UserButton from './userButton'

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
				<UserButton />
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
						<UserButton />
						<SheetDescription></SheetDescription>
					</SheetContent>
				</Sheet>
			</nav>
		</div>
	)
}

export default Menu
