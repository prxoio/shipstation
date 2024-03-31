// pages/api/webhook.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Ensure the request has a body
        if (!req.body) {
            return new NextResponse(JSON.stringify({ error: 'No payload provided' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Parse the JSON body from the request
        const data = await req.json();
        
        // Log the received data
        console.log('Received webhook:', JSON.stringify(data, null, 2));
        
        // Respond to the request indicating success
        return new NextResponse(JSON.stringify({ message: 'Webhook received successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error processing webhook', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to process webhook' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
