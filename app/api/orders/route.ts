// pages/api/orders.ts
import dbConnect from '@/lib/mongodb'
import { Order } from '@/lib/mongoose/order-schema'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  await dbConnect()

  try {
    const url = new URL(request.url)
    const uid = url.searchParams.get('uid')

    if (!uid) {
      return new NextResponse(
        JSON.stringify({ error: 'UID must be provided as a query parameter.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // get orders by uid using order model
    const orders = await Order.find({ uid })
    return new NextResponse(JSON.stringify(orders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Failed to retrieve orders:', error)
    return new NextResponse(JSON.stringify({ error: 'Failed to retrieve orders' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
