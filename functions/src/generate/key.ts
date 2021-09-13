import { Request, Response, Router } from 'express';
import { v5 } from 'uuid';

// Route Declarations
export const router = Router();

export const getKey = (req: Request, res: Response) => {
  res.statusCode = 200;
  return res.send({
    keyV5: v5('hello', '1b671a64-40d5-491e-99b0-da01ff1f3341'),
  });
};

router.get('/v1', getKey)
