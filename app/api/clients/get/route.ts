import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import mongoose from 'mongoose'

dbConnect()

const clientSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  clientId: { type: String, required: true },
  businessName: { type: String, required: true },
  url: { type: String, required: true },
})

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema)

export async function GET(request: NextRequest) {
  if (request.method !== 'GET') {
    return new NextResponse(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
    })
  }

  const url = new URL(request.url)
  const uid = url.searchParams.get('uid')

  if (!uid) {
    return new NextResponse(
      JSON.stringify({ error: 'UID is required as a query parameter' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  try {
    const clients = await Client.find({ uid: uid })
    return new NextResponse(JSON.stringify(clients), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
