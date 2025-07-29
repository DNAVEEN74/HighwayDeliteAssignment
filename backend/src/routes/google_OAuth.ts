import { Router, Request, Response, NextFunction } from "express";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { User } from "../db";

declare global {
  namespace Express {
    interface Request {
      token?: string;
    }
  }
}

export interface UserInterface {
  userName: string;
  email?: string;
}

const router = Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL:`https://highwaydeliteassignment.onrender.com/auth/noteMaster/callback`,
      passReqToCallback: true,
    },
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
      const secretKey = process.env.JWT_SECRET;

      try {
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined;
        const existingUser = await User.findOne({email: email});

        if(existingUser) {
          const token = jwt.sign({ userId: existingUser._id, userName: existingUser.userName, email: existingUser.email }, secretKey as string);
          return done(null, { user: existingUser, token });
        }
      } catch (err) {
        return done(err);
      }

      const newUser = await User.create({
        userName: profile.displayName,
        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined
      })

      const token = jwt.sign({userId: newUser._id, userName: newUser.userName, email: newUser.email}, secretKey as string);
      return done(null, { user: newUser, token });
    }
  )
);

router.get('/google', passport.authenticate('google',
  { scope: ['profile', 'email'], })
);

router.get('/noteMaster/callback', passport.authenticate('google', { session: false, failureRedirect: '/',}),
  (req: Request, res: Response) => {
    const { token } = req.user as { user: any, token: string };

    res.redirect(`https://highway-delite-assignment-161k.vercel.app/Dashboard?token=${token}`);
  }
);

export default router;