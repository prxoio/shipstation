'use client'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useState, useEffect } from 'react'
import { IOrder } from '@/interfaces/IOrder'
import { reformatDate, formatCurrency } from '@/components/formatting'
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
          console.log('Failed to fetch orders:', response.statusText)
        }
      } catch (error) {
        console.log('Error fetching orders:', error)
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
                        <span className='font-medium'>
                          {order.customer.first_name || 'No Name'}
                        </span>
                        <span> </span>{' '}
                        <span className='font-medium'>
                          {order.customer.last_name || 'No Name'}
                        </span>
                        <span> </span>{' '}
                        <span className='hidden text-sm text-muted-foreground md:inline'>
                          {order.customer.email || 'No email'}
                        </span>
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
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
