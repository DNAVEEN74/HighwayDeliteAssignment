import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import cors from 'cors';
import {connectDb} from './db';
import {authenticateJWT} from './middlewares/authenticateJWT';
import googleAuth from './routes/google_OAuth';
import noteRoutes from './routes/noteRoutes';
import otpRoutes from './routes/nodeMail';

export enum ResponseStatus{
  Success = 200,
  Error = 401
}

const allowedOrigins: string[] = ['https://highway-delite-assignment-161k.vercel.app','http://localhost:5173'];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void ) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  exposedHeaders: ['Content-Disposition'],
};

connectDb();
const app = express();
app.use(express.json());
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(passport.initialize());

app.use('/auth', googleAuth);
app.use('/note', noteRoutes);
app.use('/otp', otpRoutes);

app.get('/profile', authenticateJWT, (req: Request, res: Response) => {
  const { userId, userName, email } = req.user as {
    userId: string;
    userName: string;
    email: string;
  };

  res.status(ResponseStatus.Success).json({
    userId,
    userName,
    email
  });
});

app.listen(3000, () => {
  console.log('Server running');
});