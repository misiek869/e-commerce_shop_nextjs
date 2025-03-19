import Link from 'next/link'
import { auth } from '@/auth'
import { singOutUser } from '@/lib/actions/user.actions'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { CiUser } from 'react-icons/ci'

const UserButton = async () => {
	const session = await auth()

	if (!session) {
		return (
			<Button asChild variant={'ghost'}>
				<Link href={'/sign-in'}>
					<CiUser /> Sign In
				</Link>
			</Button>
		)
	}

	const firstLetter = session.user?.name?.charAt(0) ?? ''

	return (
		<div className='flex gap-2 items-center'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className='flex items-center'>
						<Button
							variant={'ghost'}
							className='relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-slate-600 text-slate-100'>
							{firstLetter}
						</Button>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56' align={'end'} forceMount>
					<DropdownMenuLabel className='font-normal'>
						<div className='flex flex-col space-y-1'>
							<div className='text-sm font-medium leading-tight'>
								{session.user?.name}
							</div>
							<div className='text-xs text-muted-foreground leading-tight'>
								{session.user?.email}
							</div>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuItem className='p-0 mb-2'>
						<form action={singOutUser} className='w-full'>
							<Button
								className='w-full py-4 px-2 h-4 justify-start'
								variant={'secondary'}>
								Sign Out
							</Button>
						</form>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default UserButton
