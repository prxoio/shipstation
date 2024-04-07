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
  // Split the pathname into segments and filter out empty segments (due to leading/trailing slashes)
  const segments = pathname.split('/').filter(Boolean)

  // Optional: Map segments to user-friendly names or handle special cases
  const breadcrumbSegments = segments.map((segment, index) => {
    // Here, you can implement logic to convert segments into more readable strings
    // For example, converting 'user-profile' to 'User Profile', or fetching a title from a map
    const title = segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) // Simple conversion: dashes to spaces, capitalize

    const href = '/' + segments.slice(0, index + 1).join('/') // Reconstruct the href for the current segment

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
