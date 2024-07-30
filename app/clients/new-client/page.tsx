'use client'

import { ChevronLeft } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { v4 as uuidv4 } from 'uuid'

export default function NewClient() {
  const [businessName, setBusinessName] = useState('')
  const [url, setUrl] = useState('')
  const [uid, setUid] = useState('')

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid)
      } else {
        console.log('No authenticated user. Redirecting...')
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const clientId = uuidv4()

    const formData = {
      uid,
      clientId,
      businessName,
      url,
    }

    try {
      const response = await fetch('/api/clients/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/clients')
      } else {
        const errorDetails = await response.text()
        console.log('Form submission error:', errorDetails)
        throw new Error(`Form submission failed: ${errorDetails}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-8'>
      <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='icon' className='h-7 w-7'>
            <Link href='/clients'>
              <ChevronLeft className='h-4 w-4' />
              <span className='sr-only'>Back</span>
            </Link>
          </Button>
          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
            New Client
          </h1>
          <Badge variant='outline' className='ml-auto sm:ml-0'>
            In Progress
          </Badge>
        </div>
        <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-1 lg:gap-8'>
          <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Store Details</CardTitle>
                  <CardDescription>Enter the client details below</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-6'>
                    <div className='grid gap-3'>
                      <Label htmlFor='name'>Business Name</Label>
                      <Input
                        id='name'
                        type='text'
                        className='w-full'
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </div>
                    <div className='grid gap-3'>
                      <Label htmlFor='url'>URL (myshopify.com)</Label>
                      <Input
                        id='url'
                        type='text'
                        className='w-full'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className='flex justify-end gap-2 mt-4'>
                <Button type='submit'>Save Client</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
