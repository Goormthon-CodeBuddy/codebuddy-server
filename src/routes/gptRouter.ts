import { NextFunction } from 'express';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/gpt',
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: 'Hello from GPT'
        });
    }
);

export { router as gptRouter };