import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from 'lucide-react'

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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'
import { IOrder } from '@/interfaces/IOrder'
import { formatCurrency, reformatDate } from '@/components/formatting'
import Link from 'next/link'
import PdfGeneratorComponent from '../pdf/GeneratePDFPostageLabel'

interface OrderDetailProps {
  order: IOrder | null
}

export default function OrderDetail({ order }: OrderDetailProps) {
  const todayDate = new Date().toISOString().split('T')[0]

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='flex flex-row items-start bg-muted/50'>
        <div className='grid gap-0.5'>
          <CardTitle className='group flex items-center gap-2 text-lg'>
            Order ID: #{order?.order_number ?? 'N/A'}
            <Button
              size='icon'
              variant='outline'
              className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
            >
              <Copy className='h-3 w-3' />
              <span className='sr-only'>Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>
            Date: {reformatDate(order?.created_at as string) ?? 'null'}
          </CardDescription>
        </div>
        <div className='ml-auto flex items-center gap-1'>
          <Button size='sm' variant='outline' className='h-8 gap-1'>
            <Truck className='h-3.5 w-3.5' />
            {order?.order_status_url && (
              <Link href={order.order_status_url}>
                {' '}
                <span className='lg:sr-only xl:not-sr-only xl:whitespace-nowrap'>
                  Track Order{' '}
                </span>
              </Link>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='icon' variant='outline' className='h-8 w-8'>
                <MoreVertical className='h-3.5 w-3.5' />
                <span className='sr-only'>More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {order && (
        <CardContent className='p-6 text-sm'>
          <div className='grid gap-3'>
            <div className='font-semibold'>Order Details</div>
            <ul className='grid gap-3'>
              {order?.line_items.map((item, index) => (
                <li key={index} className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>
                    {item.name} x <span>{item.current_quantity}</span>
                  </span>
                  <span>
                    {formatCurrency(
                      item.price_set.shop_money.amount,
                      item.price_set.shop_money.currency_code
                    ) || 'null'}
                  </span>
                </li>
              ))}
            </ul>
            <Separator className='my-2' />
            <ul className='grid gap-3'>
              <li className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Subtotal</span>
                <span>
                  {formatCurrency(
                    order?.subtotal_price_set.shop_money.amount as string,
                    order?.subtotal_price_set.shop_money.currency_code
                  ) || 'null'}
                </span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Shipping</span>
                <span>
                  {formatCurrency(
                    order?.total_shipping_price_set.shop_money.amount as string,
                    order?.total_shipping_price_set.shop_money.currency_code
                  ) || 'null'}
                </span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Tax</span>
                <span>
                  {formatCurrency(
                    order?.total_tax_set.shop_money.amount as string,
                    order?.total_tax_set.shop_money.currency_code
                  ) || 'null'}
                  0
                </span>
              </li>
              <li className='flex items-center justify-between font-semibold'>
                <span className='text-muted-foreground'>Total</span>
                <span>
                  {formatCurrency(
                    order?.total_price_set.shop_money.amount as string,
                    order?.total_price_set.shop_money.currency_code
                  ) || 'null'}
                </span>
              </li>
            </ul>
          </div>
          <Separator className='my-4' />
          <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-3'>
              <div className='font-semibold'>Shipping Information</div>
              <address className='grid gap-0.5 not-italic text-muted-foreground'>
                <span>
                  {order?.shipping_address.first_name}{' '}
                  {order?.shipping_address.last_name}
                </span>
                <span>{order?.shipping_address.address1}</span>
                <span>{order?.shipping_address.address2}</span>
                <span>{order?.shipping_address.city}</span>
                <span>{order?.shipping_address.country}</span>
                <span>{order?.shipping_address.zip}</span>
              </address>
            </div>
            <div className='grid auto-rows-max gap-3'>
              <div className='font-semibold'>Billing Information</div>
              <address className='grid gap-0.5 not-italic text-muted-foreground'>
                <span>
                  {order?.billing_address.first_name}{' '}
                  {order?.billing_address.last_name}
                </span>
                <span>{order?.billing_address.address1}</span>
                <span>{order?.billing_address.address2}</span>
                <span>{order?.billing_address.city}</span>
                <span>{order?.billing_address.country}</span>
                <span>{order?.billing_address.zip}</span>
              </address>
            </div>
          </div>
          <Separator className='my-4' />
          <div className='grid gap-3'>
            <div className='font-semibold'>Customer Information</div>
            <dl className='grid gap-3'>
              <div className='flex items-center justify-between'>
                <dt className='text-muted-foreground'>Customer</dt>
                <dd>
                  {order?.customer.first_name} {order?.customer.last_name}
                </dd>
              </div>
              <div className='flex items-center justify-between'>
                <dt className='text-muted-foreground'>Email</dt>
                <dd>
                  <a href='mailto:'>{order?.customer.email || 'N/A'}</a>
                </dd>
              </div>
              <div className='flex items-center justify-between'>
                <dt className='text-muted-foreground'>Phone</dt>
                <dd>
                  <a href='tel:'>{order?.customer.phone || 'N/A'}</a>
                </dd>
              </div>
            </dl>
          </div>
          <Separator className='my-4' />
          <div className='grid gap-3'>
            <div className='font-semibold'>Payment Information</div>
            <dl className='grid gap-3'>
              <div className='flex items-center justify-between'>
                <dt className='flex items-center gap-1 text-muted-foreground'>
                  <CreditCard className='h-4 w-4' />
                  {order?.payment_gateway_names.map((gateway, index) => (
                    <span key={index}>{gateway.toLocaleUpperCase()}</span>
                  ))}
                </dt>
                <dd>*{order?.confirmation_number}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      )}
      <CardFooter className='flex justify-between flex-row items-center border-t bg-muted/50 px-6 py-3'>
        <div className='text-xs text-muted-foreground'>
          Updated <time dateTime='2023-11-23'>Just Now</time>
        </div>

        {order && (
          <PdfGeneratorComponent
            postcode={order.shipping_address.zip || 'XX01 1XX'}
            courierType={'PRIVATE COURIER'}
            shippingUnits={'1'}
            address={
              `${order.shipping_address.first_name || ''} ${
                order.shipping_address.last_name || ''
              }\n` +
              `${order.shipping_address.address1 || ''}\n` +
              `${order.shipping_address.address2 || ''}\n` +
              `${order.shipping_address.city || ''}\n` +
              `${order.shipping_address.zip || ''}`
            }
            jobId={order.confirmation_number}
            orderId={'ORDER #' + order.order_number.toString()}
            orderDate={'ORDER ' + order.created_at.split('T')[0]}
            dispatchDate={'DISPATCH ' + todayDate}
            deliveryDate={' '}
            note={'DELIVERY NOTE:'}
            itemName={order.line_items[0].name}
            gs1={order.confirmation_number}
            code={order.confirmation_number}
          />
        )}
      </CardFooter>
    </Card>
  )
}
