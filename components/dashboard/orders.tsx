'use client'

import { File, ListFilter } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { useState, useEffect } from 'react'
import { IOrder } from '@/interfaces/IOrder'
import { reformatDate, reformatTime, formatCurrency } from '@/components/formatting'
import { auth } from '@/lib/firebase'

interface OrderTableProps {
  onOrdersFetched: (order: IOrder) => void
  onOrdersArray: (orders: IOrder[]) => void
}

export default function OrderTable({
  onOrdersFetched,
  onOrdersArray,
}: OrderTableProps) {
  const [orders, setOrders] = useState<IOrder[]>([])
  const storeName = 'manufi'
  const pollingInterval = 5000
  const uid = auth?.currentUser?.uid || 'unknown'

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders?uid=${uid}`)
        if (response.ok) {
          const data = await response.json()
          setOrders(data)
          onOrdersArray(data)
          console.log('Fetched orders:', data)
        } else {
          console.error('Failed to fetch orders:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }

    fetchOrders()

    const intervalId = setInterval(fetchOrders, pollingInterval)

    return () => clearInterval(intervalId)
  }, [uid])

  const handleRowClick = (order: IOrder) => {
    onOrdersFetched(order)
  }

  return (
    <Tabs defaultValue='week'>
      <div className='flex items-center'>
        <TabsList>
          <TabsTrigger value='week'>Week</TabsTrigger>
          <TabsTrigger value='month'>Month</TabsTrigger>
          <TabsTrigger value='year'>Year</TabsTrigger>
        </TabsList>
        <div className='ml-auto flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-7 gap-1 text-sm'>
                <ListFilter className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only'>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size='sm' variant='outline' className='h-7 gap-1 text-sm'>
            <File className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only'>Export</span>
          </Button>
        </div>
      </div>
      <TabsContent value='week'>
        <Card>
          <CardHeader className='px-7'>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className='hidden sm:table-cell'>Type</TableHead>
                  <TableHead className='hidden sm:table-cell'>Status</TableHead>
                  <TableHead className='hidden md:table-cell'>Date</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders &&
                  orders.map((order) => (
                    <TableRow key={order.id} onClick={() => handleRowClick(order)}>
                      <TableCell>
                        <div className='font-medium'>
                          {order.customer.first_name || 'No Name'}
                        </div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          {order.customer.email || 'No email'}
                        </div>
                      </TableCell>
                      <TableCell className='hidden sm:table-cell'>Sale</TableCell>
                      <TableCell className='hidden sm:table-cell'>
                        <Badge className='text-xs' variant='secondary'>
                          {order.financial_status.toUpperCase() || 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        {reformatDate(order.created_at) || 'Unknown'}
                      </TableCell>
                      <TableCell className='text-right'>
                        {formatCurrency(
                          order.current_total_price,
                          order.current_total_price_set.shop_money.currency_code
                        ) || 'null'}
                      </TableCell>
                    </TableRow>
                  ))}{' '}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
