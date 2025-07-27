import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import cors from 'cors';
import {connectDb} from './db';
import {authenticateJWT} from './middlewares/authenticateJWT';
const googleAuth = require("./routes/google_OAuth");
const noteRoutes = require('./routes/noteRoutes')

export enum ResponseStatus{
  Success = 200,
  Error = 401
}

dotenv.config();
const allowedOrigins: string[] = ['http://localhost:5173'];

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

const app = express();
connectDb();
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(passport.initialize());

app.use('/auth', googleAuth);
app.use('/note', noteRoutes);
app.get('/profile', authenticateJWT, (req: Request, res: Response) => {
  res.json(req.user);
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});