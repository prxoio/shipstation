'use client'

import OrderTable from '@/components/dashboard/orders'
import OrderDetail from '@/components/dashboard/order-detail'
import { useCallback, useState } from 'react'
import { IOrder } from '@/interfaces/IOrder'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'
import OrderStats from '@/components/dashboard/stats'

export default function Dashboard() {
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null)
  const [allOrders, setAllOrders] = useState<IOrder[]>([])

  const handleOrdersFetched = useCallback((order: IOrder) => {
    setCurrentOrder(order)
    console.log('Orders in parent component:', order)
  }, [])

  const handleOrdersArray = useCallback((orders: IOrder[]) => {
    setAllOrders(orders)
    console.log('Orders in parent component:', orders)
  }, [])

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
          <OrderStats orders={allOrders} />
        </div>

        <OrderTable
          onOrdersFetched={handleOrdersFetched}
          onOrdersArray={handleOrdersArray}
        />
      </div>
      <div>
        {!currentOrder ? (
          <div>
            <Alert className='mb-4'>
              <Terminal className='h-4 w-4' />
              <AlertTitle>Please Select an Order</AlertTitle>
              <AlertDescription>
                Select an order to view more details.
              </AlertDescription>
            </Alert>

            <Skeleton className='w-[100%] h-[100px] rounded-lg' />
            <Skeleton className='mt-4 w-[100%] h-[20px] rounded-lg' />
            <Skeleton className='mt-4 w-[50%] h-[20px] rounded-lg' />
            <Skeleton className='mt-4 w-[100%] h-[160px] rounded-lg' />
            <div className='flex'>
              <Skeleton className='mt-4 mr-4 w-[100%] h-[20px] rounded-lg' />
              <Skeleton className='mt-4 mr-4 w-[50%] h-[20px] rounded-lg' />
              <Skeleton className='mt-4 w-[40%] h-[20px] rounded-lg' />
            </div>
            <div className='flex'>
              <Skeleton className='mt-4 mr-4 w-[20%] h-[20px] rounded-lg' />
              <Skeleton className='mt-4 mr-4 w-[60%] h-[20px] rounded-lg' />
              <Skeleton className='mt-4 w-[40%] h-[20px] rounded-lg' />
            </div>
            <Skeleton className='mt-4 w-[100%] h-[70px] rounded-lg' />
            <Skeleton className='mt-4 w-[100%] h-[35px] rounded-lg' />
          </div>
        ) : (
          <OrderDetail order={currentOrder} />
        )}
      </div>
    </main>
  )
}
