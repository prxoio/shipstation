// This file should still be placed within /pages/api or /api for Vercel to treat it as an API route.
// The structure here leans towards a more general serverless function approach.
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

// Initialize your MongoDB connection
dbConnect();

// Define your Mongoose model outside the handler if it's shared across requests
const clientSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  clientId: { type: String, required: true },
  businessName: { type: String, required: true },
  url: { type: String, required: true },
});

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);

// Since you're handling a `POST` method, define it as such.
export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return new NextResponse(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  try {
    // Parse the JSON body from the request
    const body = await request.json();
    const newClient = new Client(body);
    const savedClient = await newClient.save();
    
    // Respond with the saved client
    return new NextResponse(JSON.stringify(savedClient), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
