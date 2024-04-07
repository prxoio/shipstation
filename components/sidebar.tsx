'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()

  // Function to check if the link is active based on the current pathname
  const isActive = (href: string) => pathname === href
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Link
          href='#'
          className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
        >
          <Package2 className='h-4 w-4 transition-all group-hover:scale-110' />
          <span className='sr-only'>Acme Inc</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#'
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                isActive('#')
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}            >
              <Home className='h-5 w-5' />
              <span className='sr-only'>Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#'
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                isActive('#')
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}            >
              <ShoppingCart className='h-5 w-5' />
              <span className='sr-only'>Orders</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Orders</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='/'
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                isActive('/')
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}            >
              <Package className='h-5 w-5' />
              <span className='sr-only'>Orders</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Orders</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='/clients'
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                isActive('/clients')
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users2 className='h-5 w-5' />
              <span className='sr-only'>Clients</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Clients</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#'
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                isActive('#')
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}            >
              <LineChart className='h-5 w-5' />
              <span className='sr-only'>Analytics</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Analytics</TooltipContent>
        </Tooltip>
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#'
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                isActive('#')
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}            >
              <Settings className='h-5 w-5' />
              <span className='sr-only'>Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}
