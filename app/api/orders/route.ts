// pages/api/orders.ts
import dbConnect from '@/lib/mongodb';
import { Order } from '@/lib/mongoose/order-schema'; // Import the Order model
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        // Construct a URL object from the request URL string
        const url = new URL(request.url);
        // Extract 'uid' from the query parameters instead of 'storeName'
        const uid = url.searchParams.get('uid');

        if (!uid) {
            return new NextResponse(JSON.stringify({ error: 'UID must be provided as a query parameter.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Query orders by uid using the Order model
        const orders = await Order.find({ uid }); // Adjust the field to match your schema if necessary
        return new NextResponse(JSON.stringify(orders), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to retrieve orders:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to retrieve orders' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
