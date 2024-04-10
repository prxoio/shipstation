import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    if (!req.body) {
      return new NextResponse(JSON.stringify({ error: 'No payload provided' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const data = await req.json()

    console.log('Received webhook:', JSON.stringify(data, null, 2))

    return new NextResponse(
      JSON.stringify({ message: 'Webhook received successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error processing webhook', error)
    return new NextResponse(JSON.stringify({ error: 'Failed to process webhook' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
