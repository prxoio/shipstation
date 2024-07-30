'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { IOrder } from '@/interfaces/IOrder'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '../ui/label'
import Link from 'next/link'

interface OrderStatsProps {
  orders: IOrder[]
}

export default function OrderStats({ orders }: OrderStatsProps) {
  function calculateAndFormatTotalRevenue(orders: any[], days: number) {
    const currentDate = new Date().getTime()

    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.created_at).getTime()
      const timeDiff = currentDate - orderDate
      const daysAgo = timeDiff / (1000 * 60 * 60 * 24)
      return daysAgo <= days
    })

    const totalAmount = filteredOrders.reduce(
      (sum, order) => sum + parseFloat(order.total_price_set.shop_money.amount),
      0
    )
    const currencyCode = orders[0]?.currency ?? 'USD'

    const formattedTotalRevenue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(totalAmount)

    return formattedTotalRevenue
  }

  function calculateAndFormatAverageOrderValue(orders: any[], days: number) {
    const currentDate = new Date().getTime()

    const filteredOrders = orders.filter(
      (order: { created_at: string | number | Date }) => {
        const orderDate = new Date(order.created_at).getTime()
        const timeDiff = currentDate - orderDate
        const daysAgo = timeDiff / (1000 * 60 * 60 * 24)
        return daysAgo <= days
      }
    )

    const totalAmount = filteredOrders.reduce(
      (sum, order) => sum + parseFloat(order.total_price_set.shop_money.amount),
      0
    )

    const averageOrderValue =
      filteredOrders.length > 0 ? totalAmount / filteredOrders.length : 0

    const currencyCode = orders[0]?.currency ?? 'USD'

    const formattedAverageOrderValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(averageOrderValue)

    return formattedAverageOrderValue
  }

  return (
    <>
      <Card className='sm:col-span-2'>
        <CardHeader className='pb-3'>
          <CardTitle>Your Orders</CardTitle>
          <CardDescription className='max-w-lg text-balance leading-relaxed'>
            Welcome To Your Central Shipping Dashboard.
          </CardDescription>
        </CardHeader>
        <CardFooter className='pt-4'>
          <Link href='/clients' passHref>
            <Button>Add New Client</Button>
          </Link>
        </CardFooter>
      </Card>
      {orders[0] ? (
        <Card>
          <CardHeader className='py-5'>
            {' '}
            <CardTitle className='text-md'>Total Orders</CardTitle>
            <Tabs defaultValue='1m' className='w-[100%]'>
              <TabsContent value='7d'>
                {orders[0] && (
                  <CardTitle className='text-3xl pt-0'>
                    {calculateAndFormatTotalRevenue(orders, 7)}
                  </CardTitle>
                )}{' '}
                <CardDescription className='pt-0.5'>
                  {' '}
                  <span className='text-xs text-muted-foreground'>Last 7 Days</span>
                </CardDescription>
              </TabsContent>
              <TabsContent value='1m'>
                {' '}
                {orders[0] && (
                  <CardTitle className='text-3xl'>
                    {calculateAndFormatTotalRevenue(orders, 30)}
                  </CardTitle>
                )}{' '}
                <CardDescription className='pt-0.5'>
                  {' '}
                  <span className='text-xs text-muted-foreground'>Last 30 Days</span>
                </CardDescription>
              </TabsContent>
              <TabsContent value='1y'>
                {' '}
                {orders[0] && (
                  <CardTitle className='text-3xl'>
                    {calculateAndFormatTotalRevenue(orders, 365)}
                  </CardTitle>
                )}{' '}
                <CardDescription className='pt-0.5'>
                  {' '}
                  <span className='text-xs text-muted-foreground'>
                    Last 365 Days
                  </span>
                </CardDescription>
              </TabsContent>
              <TabsList className='grid w-[100%] grid-cols-3 h-8 mt-2 mb-0'>
                <TabsTrigger className='text-xs py-1' value='7d'>
                  7D
                </TabsTrigger>
                <TabsTrigger className='text-xs py-1' value='1m'>
                  1M
                </TabsTrigger>
                <TabsTrigger className='text-xs py-1' value='1y'>
                  1Y
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
        </Card>
      ) : (
        <OrderSkeleton />
      )}
      {orders[0] ? (
        <Card>
          <CardHeader className='py-5'>
            {' '}
            <CardTitle className='text-md'>Average Order Value</CardTitle>
            <Tabs defaultValue='1y' className='w-[100%]'>
              <TabsContent value='7d'>
                {orders[0] && (
                  <CardTitle className='text-3xl pt-0'>
                    {calculateAndFormatAverageOrderValue(orders, 7)}
                    <Label className='ml-2'>AOV</Label>{' '}
                  </CardTitle>
                )}{' '}
                <CardDescription className='pt-0.5'>
                  {' '}
                  <span className='text-xs text-muted-foreground'>Last 7 Days</span>
                </CardDescription>
              </TabsContent>
              <TabsContent value='1m'>
                {' '}
                {orders[0] && (
                  <CardTitle className='text-3xl'>
                    {calculateAndFormatAverageOrderValue(orders, 30)}
                    <Label className='ml-2'>AOV</Label>{' '}
                  </CardTitle>
                )}{' '}
                <CardDescription className='pt-0.5'>
                  {' '}
                  <span className='text-xs text-muted-foreground'>Last 30 Days</span>
                </CardDescription>
              </TabsContent>
              <TabsContent value='1y'>
                {' '}
                {orders[0] && (
                  <CardTitle className='text-3xl'>
                    {calculateAndFormatAverageOrderValue(orders, 365)}
                    <Label className='ml-2'>AOV</Label>{' '}
                  </CardTitle>
                )}{' '}
                <CardDescription className='pt-0.5'>
                  {' '}
                  <span className='text-xs text-muted-foreground'>
                    Last 365 Days
                  </span>
                </CardDescription>
              </TabsContent>
              <TabsList className='grid w-[100%] grid-cols-3 h-8 mt-2 mb-0'>
                <TabsTrigger className='text-xs py-1' value='7d'>
                  7D
                </TabsTrigger>
                <TabsTrigger className='text-xs py-1' value='1m'>
                  1M
                </TabsTrigger>
                <TabsTrigger className='text-xs py-1' value='1y'>
                  1Y
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
        </Card>
      ) : (
        <OrderSkeleton />
      )}
    </>
  )
}

function OrderSkeleton() {
  return (
    <>
      <Card>
        <CardHeader className='py-5'>
          <Skeleton className='mb-2 w-[70%] h-[20px] rounded-lg' />
          <Skeleton className='w-[85%] h-[40px] rounded-lg' />
          <Skeleton className='w-[40%] h-[15px] rounded-lg' />
          <Skeleton className='w-[100%] h-[30px] rounded-lg' />
        </CardHeader>
      </Card>
    </>
  )
}
