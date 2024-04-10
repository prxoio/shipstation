'use client'
import Image from 'next/image'
import { File, ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react'

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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCallback, useEffect, useState } from 'react'
import { IOrder } from '@/interfaces/IOrder'
import { EditClient } from '@/components/dashboard/edit-client'
import Link from 'next/link'
import { auth } from '@/lib/firebase'
import ClientDialog from '@/components/client-dialog'

interface Clients {
  businessName: string
  url: string
  uid: string
  clientId: string
}
export default function Dashboard() {
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null)

  const handleOrdersFetched = useCallback((order: IOrder) => {
    setCurrentOrder(order)
    // Handle the fetched orders here
    console.log('Orders in parent component:', order)
  }, [])

  const [refresh, setRefresh] = useState(0)
  const [clients, setClients] = useState<Clients[] | null>(null)
  const uid = auth.currentUser?.uid // Get the current user's UID

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`/api/clients/get?uid=${uid}`)
        if (!response.ok) {
          throw new Error('Failed to fetch clients')
        }
        const data = await response.json()
        setClients(data) // Update state with fetched clients
      } catch (error: any) {
        console.error(error.message)
        // Optionally, handle errors in state/UI as needed
      }
    }

    fetchClients()
  }, [uid, refresh]) // Dependency array ensures this effect runs when `uid` changes

  const deleteClient = async (
    uid: string | number | boolean,
    url: string | number | boolean
  ) => {
    try {
      const response = await fetch(
        `/api/clients/delete?uid=${encodeURIComponent(uid)}&url=${encodeURIComponent(
          url
        )}`,
        {
          method: 'DELETE',
        }
      )
      const data = await response.json()
      console.log(data)
      setRefresh((prev) => prev + 1)
      // Handle response data...
    } catch (error) {
      console.error('Failed to delete client:', error)
      // Handle error...
    }
  }

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <Tabs defaultValue='all'>
        <div className='flex items-center'>
          <TabsList>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='active'>Active</TabsTrigger>
            <TabsTrigger value='draft'>Inactive</TabsTrigger>
          </TabsList>
          <div className='ml-auto flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='h-8 gap-1'>
                  <ListFilter className='h-3.5 w-3.5' />
                  <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size='sm' variant='outline' className='h-8 gap-1'>
              <File className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Export
              </span>
            </Button>
            <Button size='sm' className='h-8 gap-1'>
              <PlusCircle className='h-3.5 w-3.5' />
              <Link href='/clients/new-client'>
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                  Add Client
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <TabsContent value='all'>
          <Card>
            <CardHeader>
              <CardTitle>Clients</CardTitle>
              <CardDescription>
                Manage your clients and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='hidden w-[100px] sm:table-cell'>
                      <span className='sr-only'>Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className='hidden md:table-cell'>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Total Orders
                    </TableHead>
                    <TableHead>
                      <span className='sr-only'>Actions</span>
                    </TableHead>
                    <TableHead>
                      <span className='sr-only'>Activate</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients &&
                    clients.map((client) => (
                      <TableRow key={client.url}>
                        <TableCell className='hidden sm:table-cell'>
                          <Image
                            alt='Client image'
                            className='aspect-square rounded-md object-cover'
                            height='64'
                            src='/avatar.jpeg'
                            width='64'
                          />
                        </TableCell>
                        <TableCell className='font-medium'>
                          {client.businessName}
                        </TableCell>

                        <TableCell className='hidden md:table-cell'>
                          {client.url}
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline'>Active</Badge>
                        </TableCell>
                        <TableCell className='hidden md:table-cell'>4</TableCell>
                        <TableCell>
                          <ClientDialog
                            name={client.businessName}
                            url={client.url}
                            uid={client.uid}
                            clientId={client.clientId}
                          />
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup='true'
                                size='icon'
                                variant='ghost'
                              >
                                <MoreHorizontal className='h-4 w-4' />
                                <span className='sr-only'>Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onSelect={() => deleteClient(client.uid, client.url)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className='text-xs text-muted-foreground'>
                Showing <strong>x</strong> of <strong>x</strong> clients
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
