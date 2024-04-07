'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import OrderTable from '@/components/dashboard/orders'
import OrderDetail from '@/components/dashboard/order-detail'
import { useCallback, useState } from 'react'
import { IOrder } from '@/interfaces/IOrder'

export default function Dashboard() {

  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null)
  
  const handleOrdersFetched = useCallback((order: IOrder) => {
    setCurrentOrder(order)
    // Handle the fetched orders here
    console.log('Orders in parent component:', order)
  }, [])

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
          <Card className='sm:col-span-2'>
            <CardHeader className='pb-3'>
              <CardTitle>Your Orders</CardTitle>
              <CardDescription className='max-w-lg text-balance leading-relaxed'>
                Introducing Our Dynamic Orders Dashboard for Seamless Management and
                Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>Create New Order</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>This Week</CardDescription>
              <CardTitle className='text-4xl'>$1329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-xs text-muted-foreground'>
                +25% from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={25} aria-label='25% increase' />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>This Month</CardDescription>
              <CardTitle className='text-3xl'>$5,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-xs text-muted-foreground'>
                +10% from last month
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={12} aria-label='12% increase' />
            </CardFooter>
          </Card>
        </div>

        <OrderTable onOrdersFetched={handleOrdersFetched} />
      </div>
      <div>
        <OrderDetail order={currentOrder} />
      </div>
    </main>
  )
}
