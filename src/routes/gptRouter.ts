import { NextFunction } from 'express';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/chatgpt',
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: 'Hello from GPT'
        });
    }
);

router.post('/api/chatgpt/notification/arrive', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send('ChatGPT 답변이 완료되었습니다.');
});

export { router as gptRouter };