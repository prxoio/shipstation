'use client'

import Image from 'next/image'
import { ChevronLeft, PlusCircle, Upload } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import { SwitchForm } from '@/components/catch-all'
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
        console.error('Form submission error:', errorDetails)
        throw new Error(`Form submission failed: ${errorDetails}`)
      }
    } catch (error) {
      console.error(error)
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
                {/* Store Details Card */}
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
            {/* <Card>
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <div className='flex justify-between items-center'>
                  <CardDescription>
                    Add the SKUs that you will ship on behalf of this store
                  </CardDescription>
                  <div className='flex items-center space-x-2'>
                    <Switch id='airplane-mode' />
                    <Label htmlFor='airplane-mode'>Catch All</Label>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[50%]'>SKU</TableHead>
                      <TableHead className='w-[20%] pl-8'>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='font-semibold'>GGPC-001</TableCell>
                      <TableCell>
                        <ToggleGroup
                          type='single'
                          defaultValue='active'
                          variant='outline'
                        >
                          <ToggleGroupItem value='active'>Active</ToggleGroupItem>
                          <ToggleGroupItem value='inactive'>
                            Inactive
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-semibold'>GGPC-002</TableCell>
                      <TableCell>
                        <ToggleGroup
                          type='single'
                          defaultValue='active'
                          variant='outline'
                        >
                          <ToggleGroupItem value='active'>Active</ToggleGroupItem>
                          <ToggleGroupItem value='inactive'>
                            Inactive
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className='justify-center border-t p-4'>
                <Button size='sm' variant='ghost' className='gap-1'>
                  <PlusCircle className='h-3.5 w-3.5' />
                  Add Variant
                </Button>
              </CardFooter>
            </Card> */}
          </div>
        </div>
      </div>
    </main>
  )
}
