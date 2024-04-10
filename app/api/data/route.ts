import dbConnect from '@/lib/mongodb'
import mongoose, { Document, Model } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

interface IData extends Document {
  message: string
}

const dataSchema = new mongoose.Schema<IData>({
  message: { type: String, required: true },
})

const Data: Model<IData> =
  mongoose.models.Data || mongoose.model<IData>('Data', dataSchema)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  if (req.method === 'GET') {
    try {
      const data = await Data.find({})
      res.status(200).json(data)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } else if (req.method === 'POST') {
    try {
      const newData = new Data(req.body)
      const savedData = await newData.save()
      res.status(201).json(savedData)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
