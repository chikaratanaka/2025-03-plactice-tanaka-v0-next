import { prisma } from '@/prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        //DBからTodo一覧を取得
        const todos = await prisma.todo.findMany();
        return res.status(200).json(todos);
    }

    if (req.method === 'POST') {
        //新規Todoを追加
        const { text } = req.body;
        const newTodo = await prisma.todo.create({
            data: { text, completed: false },
        });
        return res.status(201).json(newTodo);
    }

    if (req.method === 'DELETE') {
        //指定したTodoを削除
        const { id } = req.body;
        await prisma.todo.delete({
            where: { id: Number(id) },
        });
        return res.status(200).json({ message: 'Deleted successfully' });
    }

    if (req.method === 'PATCH') {
        //Todoの完了状態を更新
        const { id, completed } = req.body;
        const updatedTodo = await prisma.todo.update({
            where: { id: Number(id) },
            data: { completed },
        });
        return res.status(200).json(updatedTodo);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
