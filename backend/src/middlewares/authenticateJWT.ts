import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseStatus } from '../server';

export function authenticateJWT (req: Request, res: Response, next: NextFunction) {
  const authHeader: any = req.headers.authorization;
  const token: string = authHeader.split(' ')[1];

  if (!token) {
    return res.status(ResponseStatus.Error).json({ message: 'Missing token' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwtSecret as string);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(ResponseStatus.Error).json({ message: 'Invalid token' });
  }
}