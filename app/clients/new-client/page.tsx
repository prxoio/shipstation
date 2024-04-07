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

export default function NewClient() {
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
          <div className='hidden items-center gap-2 md:ml-auto md:flex'>
            <Button variant='outline' size='sm'>
              Discard
            </Button>
            <Button size='sm'>Save Product</Button>
          </div>
        </div>
        <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
          <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
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
                      defaultValue='Shop Name'
                    />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='url'>URL (myshopify.com)</Label>
                    <Input
                      id='url'
                      type='text'
                      className='w-full'
                      defaultValue='shopname.myshopify.com'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>
                  Add the SKUs that you will ship on behalf of this store
                </CardDescription>
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
            </Card>
          </div>
          <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
            <Card className='py-1'>
              <CardHeader>
                <CardTitle>Client Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6'>
                  <div className='grid gap-3'>
                    <Label htmlFor='status'>Status</Label>
                    <Select>
                      <SelectTrigger id='status' aria-label='Select status'>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='published'>Active</SelectItem>
                        <SelectItem value='archived'>Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className='overflow-hidden'>
              <CardHeader>
                <CardTitle>Store Logo</CardTitle>
                <CardDescription>
                  Add the Store Logo. Upload a 200px square (.png, .jpg, .jpeg)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-2'>
                  <Image
                    alt='Product image'
                    className='aspect-square w-full rounded-md object-cover'
                    height='300'
                    src='/avatar.jpeg'
                    width='300'
                  />
                  <div className='flex h-20 mt-4'>
                    <button className='flex w-full items-center justify-center rounded-md border border-dashed'>
                      <Upload className='h-4 w-4 text-muted-foreground' />
                      <span className='sr-only'>Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 md:hidden'>
          <Button variant='outline' size='sm'>
            Discard
          </Button>
          <Button size='sm'>Save Product</Button>
        </div>
      </div>
    </main>
  )
}
