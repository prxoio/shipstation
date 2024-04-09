// /pages/api/clients/delete.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

// Ensure dbConnect is called asynchronously within the handler
dbConnect();

const clientSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  clientId: { type: String, required: true },
  businessName: { type: String, required: true },
  url: { type: String, required: true },
});

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);

export async function DELETE(request: NextRequest) {
  if (request.method !== 'DELETE') {
    return new NextResponse(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const url = new URL(request.url);
  const uid = url.searchParams.get('uid');
  const clientUrl = url.searchParams.get('url');

  if (!uid || !clientUrl) {
    return new NextResponse(JSON.stringify({ error: 'UID and URL must be provided as query parameters' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    // Use the `deleteMany` method to remove all documents matching the criteria
    const result = await Client.deleteMany({ uid: uid, url: clientUrl });
    if (result.deletedCount === 0) {
      return new NextResponse(JSON.stringify({ message: 'No documents found with the provided UID and URL' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new NextResponse(JSON.stringify({ message: 'Client deleted successfully' }), {
      status: 200,
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
