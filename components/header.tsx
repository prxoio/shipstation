'use client'
import Image from 'next/image'
import Link from 'next/link'
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft, ShoppingCart,
  Users2
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { ModeToggle } from '@/components/ui/darkmode'
import Breadcrumbs from './breadcrumbs'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function Header() {
  const { isLoggedIn, userEmail } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      console.log('User logged out successfully')
    } catch (error) {
      console.log('Logout failed', error)
    }
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant='outline' className='sm:hidden'>
            <PanelLeft className='h-5 w-5' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='sm:max-w-xs'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              href='#'
              className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
            >
              <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
              <span className='sr-only'>Acme Inc</span>
            </Link>
            <Link
              href='#'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
            >
              <Home className='h-5 w-5' />
              Dashboard
            </Link>
            <Link
              href='#'
              className='flex items-center gap-4 px-2.5 text-foreground'
            >
              <ShoppingCart className='h-5 w-5' />
              Orders
            </Link>
            <Link
              href='#'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
            >
              <Package className='h-5 w-5' />
              Products
            </Link>
            <Link
              href='#'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
            >
              <Users2 className='h-5 w-5' />
              Customers
            </Link>
            <Link
              href='#'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
            >
              <LineChart className='h-5 w-5' />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumbs />
      <div className='relative ml-auto flex-1 md:grow-0'></div>
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='overflow-hidden rounded-full'
          >
            <Image
              src='/avatar.jpeg'
              width={40}
              height={40}
              alt='Avatar'
              className='overflow-hidden'
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
