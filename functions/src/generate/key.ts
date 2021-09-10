import { Request, Response, Router } from 'express';
import { v4, v5 } from 'uuid';

export const getKey = (req: Request, res: Response) => {
  const status = 500;
  res.status(status);
  return res.json({
    keyV4: v4(),
    keyV5: v5('hello', '1b671a64-40d5-491e-99b0-da01ff1f3341'),
  });
};

export const getValue = (req: Request, res: Response) => {
  const status = 500;
  res.status(status);
  return res.json({
    keyV4: 'HAHAHAHA'
  });
};

export const router = Router();
router.get('/v1', getKey)
router.get('/v2', getValue)
