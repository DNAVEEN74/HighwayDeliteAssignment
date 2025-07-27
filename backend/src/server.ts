import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(passport.initialize());

interface User {
  id: string;
  name: string;
  email?: string;
  picture?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: User) => void
    ) => {
      const user: User = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        picture: profile.photos?.[0]?.value,
      };

      return done(null, user);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),
  (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign(user, process.env.JWT_SECRET || '', {
      expiresIn: '1h',
    });

    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  }
);

app.get('/profile', authenticateJWT, (req: Request, res: Response) => {
  res.json(req.user);
});

function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      req.user = decoded as User;
      next();
    });
  } else {
    res.status(401).json({ message: 'Missing token' });
  }
}

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});