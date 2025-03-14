'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CiSun, CiCloudMoon } from 'react-icons/ci'
import { TbSunMoon } from 'react-icons/tb'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'

const ModeToggle = () => {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className='focus-visible:ring-0 focus-visible:ring-offset-0'
					variant={'ghost'}>
					{theme === 'system' ? (
						<TbSunMoon />
					) : theme === 'dark' ? (
						<CiCloudMoon />
					) : (
						<CiSun />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Apperance</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					checked={theme === 'system'}
					onClick={() => setTheme('system')}>
					System
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={theme === 'dark'}
					onClick={() => setTheme('dark')}>
					Dark
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={theme === 'light'}
					onClick={() => setTheme('light')}>
					Light
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ModeToggle
