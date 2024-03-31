// pages/api/orders.ts
import dbConnect from '@/lib/mongodb';
import { Order } from '@/lib/mongoose/order-schema'; // Corrected import for Order model
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const url = new URL(request.url);
        const storeName = url.searchParams.get('storeName');

        if (!storeName) {
            return new NextResponse(JSON.stringify({ error: 'Store name must be provided as a query parameter.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Query orders by store name directly using the Order model
        const orders = await Order.find({ storeName: storeName });
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
