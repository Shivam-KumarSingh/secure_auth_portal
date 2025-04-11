import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../types/express';

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};