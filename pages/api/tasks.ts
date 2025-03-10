import { prisma } from '@/prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    await prisma.task.create({
        data: {
            title: 'Learn how to use Prisma with Next.js',
        }
    })
    const tasks = await prisma.task.findMany({take: 10})
    return res.status(200).json({ tasks })
}

