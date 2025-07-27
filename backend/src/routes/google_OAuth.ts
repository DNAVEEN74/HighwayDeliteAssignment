import { Router, Request, Response, NextFunction } from "express";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { User } from "../db";
import { ResponseStatus } from "../server";

declare global {
  namespace Express {
    interface Request {
      token?: string;
    }
  }
}

export interface UserInterface {
  googleId: string;
  userName: string;
  email?: string;
}

const router = Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:3000/auth/noteMaster/callback',
      passReqToCallback: true,
    },
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
      const secretKey = process.env.JWT_SECRET;
      const existingUser = await User.findOne({googleId: profile.id});

      if(existingUser) {
        const token = jwt.sign({ user: existingUser }, secretKey as string);
        req.token = token;
        return done(null, { user: existingUser})
      }

      const newUser = await User.create({
        googleId: profile.id,
        userName: profile.displayName,
        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined
      })

      const token = jwt.sign({user: newUser}, secretKey as string);
      req.token = token;
      return done(null, {user: newUser})
    }
  )
);

router.get('/google', passport.authenticate('google',
  { scope: ['profile', 'email'], })
);

router.get('/noteMaster/callback', passport.authenticate('google', { session: false, failureRedirect: '/',}),
  (req: Request, res: Response) => {
    const user = req.user;
    const token = req.token;

    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  }
);

module.exports = router;