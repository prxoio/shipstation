// pages/api/webhook.ts
import dbConnect from '@/lib/mongodb';
import { Order } from '@/lib/mongoose/order-schema'; // Correct import of the compiled model
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const data = await request.json();
    const url = new URL(data.order_status_url);
    const storeName = url.hostname.split('.')[0]; // Extract 'manufi'

    // Create a new document with the extracted storeName and other data
    const newOrder = new Order({
      ...data,
      storeName,
    });
    await newOrder.save();

    return new NextResponse(JSON.stringify({ message: 'Order saved successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to process webhook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
