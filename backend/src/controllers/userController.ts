import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/express';

const prisma = new PrismaClient();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ 
        status: 'error',
        message: 'Email and password are required' 
      });
      return;
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ 
        status: 'error',
        message: 'Email already registered' 
      });
      return;
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      status: 'success',
      data: { user: { id: user.id, email: user.email }, token }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ 
        status: 'error',
        message: 'Email and password are required' 
      });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ 
        status: 'error',
        message: 'Email not registered' 
      });
      return;
    }

    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ 
        status: 'error',
        message: 'Incorrect password' 
      });
      return;
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      status: 'success',
      data: { user: { id: user.id, email: user.email }, token }
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ 
        status: 'error',
        message: 'Not authenticated' 
      });
      return;
    }

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, email: true, createdAt: true, updatedAt: true }
    });

    if (!profile) {
      res.status(404).json({ 
        status: 'error',
        message: 'User profile not found' 
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: { user: profile }
    });
  } catch (error) {
    next(error);
  }
};