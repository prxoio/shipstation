// pages/api/webhook.ts
import dbConnect from '@/lib/mongodb';
import { Order } from '@/lib/mongoose/order-schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const data = await request.json();
    
    // Extract store name from the order_status_url
    const url = new URL(data.order_status_url);
    const storeName = url.hostname.split('.')[0]; // Extracts 'manufi' from 'manufi.myshopify.com'

    // Include the storeName in the order data
    const orderData = {
      ...data,
      storeName, // Add the storeName to the order document
    };

    // Create and save the new order with the storeName included
    const newOrder = new Order(orderData);
    await newOrder.save();

    return new NextResponse(JSON.stringify({ message: 'Order saved successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to process webhook' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
