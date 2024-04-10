import dbConnect from '@/lib/mongodb'
import { Order } from '@/lib/mongoose/order-schema'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  await dbConnect()

  try {
    const data = await request.json()
    const requestUrl = new URL(request.url)
    const uid = requestUrl.searchParams.get('uid')
    const clientId = requestUrl.searchParams.get('client_id')

    const url = new URL(data.order_status_url)
    const storeName = url.hostname.split('.')[0]

    if (!storeName) {
      return new NextResponse(JSON.stringify({ error: 'user (uid) is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const newOrder = new Order({
      ...data,
      storeName,
      uid,
      clientId,
    })
    await newOrder.save()

    return new NextResponse(
      JSON.stringify({ message: 'Order saved successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new NextResponse(JSON.stringify({ error: 'Failed to process webhook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
