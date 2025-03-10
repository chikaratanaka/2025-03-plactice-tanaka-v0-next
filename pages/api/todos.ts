import { prisma } from '@/prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await prisma.todo.create({
        data: {
            text: 'Learn how to use Prisma with Next.js',
            completed: false, 
        }
    });

    const todos = await prisma.todo.findMany({ take: 10 });

    return res.status(200).json({ todos });
}
