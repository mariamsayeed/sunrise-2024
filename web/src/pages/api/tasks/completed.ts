import { completeTask, getCompletedTasks } from '@/modules/taskManager';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(req.method === 'GET') {
        const completedTasks = getCompletedTasks();
        return res.status(200).json(completedTasks);
    }
    if(req.method === 'PUT') {
        const { taskTitle } = req.body;
        completeTask(taskTitle);
        return res.status(200).json({ message: 'Task completed successfully' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}