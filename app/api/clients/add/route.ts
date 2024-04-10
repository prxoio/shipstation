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

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return new NextResponse(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
    })
  }

  try {
    const body = await request.json()
    const newClient = new Client(body)
    const savedClient = await newClient.save()

    return new NextResponse(JSON.stringify(savedClient), {
      status: 201,
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
