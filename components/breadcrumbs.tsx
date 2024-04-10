'use client'

import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { usePathname } from 'next/navigation'
import React from 'react'

export default function Breadcrumbs() {
  const pathname = usePathname()

  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbSegments = segments.map((segment, index) => {
    const title = segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

    const href = '/' + segments.slice(0, index + 1).join('/')

    return { title, href }
  })
  return (
    <Breadcrumb className='hidden md:flex'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/'>Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbSegments.map((segment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index < breadcrumbSegments.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link href={segment.href}>{segment.title}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{segment.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
