import nodemailer from 'nodemailer';
import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { ResponseStatus } from '../server';
import { User, OtpField } from '../db';
import Jwt  from 'jsonwebtoken';

const router = Router();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTPEmail = async (to: string, otp: string) => {
  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your OTP Code',
    html: `<p>Your OTP is: <b>${otp}</b></p>`
  });
};

router.post('/send', async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if(!email) return res.status(ResponseStatus.Error).json({ message: "Email is missing"});

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiredAt = Date.now() + 5 * 60 * 1000;
    
    const otpUpload = await OtpField.create({ email, otp, expiredAt });
    await otpUpload.save();
    await sendOTPEmail(email, otp);

    res.status(ResponseStatus.Success).json({ message: 'OTP sent to your email' });
})

router.post('/verify', async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, password, email, otp } = req.body;
    const userName = firstName +' '+ lastName;
    const otpData = await OtpField.findOne({ email });
    const secretKey = process.env.JWT_SECRET;

    if (!otpData) return res.status(ResponseStatus.Error).json({ message: 'No OTP sent to this email' });
    if (otpData.otp !== otp) return res.status(ResponseStatus.Error).json({ message: 'Invalid OTP' });
    if (Date.now() > otpData.expiredAt) {
        await OtpField.deleteOne({ email });
        return res.status(ResponseStatus.Error).json({ message: 'OTP expired' });
    }
    
    const existingUser = await User.findOne({userName: userName, email: email});
    
    if(existingUser) {
        await OtpField.deleteOne({email: email});

        const isPasswordValid = await bcrypt.compare(password, existingUser.password as string);
        if(!isPasswordValid) return res.status(ResponseStatus.Error).json({message: 'Invalid Password'})

        const token = Jwt.sign({userId: existingUser._id, userName: userName, email: email}, secretKey as string);
        return res.status(ResponseStatus.Success).json({
            message: 'OTP verified successfully',
            token: token
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        userName: userName,
        email: email,
        password: hashedPassword
    })

    await newUser.save();
    await OtpField.deleteOne({email: email});

    const token = Jwt.sign({userId: newUser._id, userName: newUser.userName, email: newUser.email}, secretKey as string);
    return res.status(ResponseStatus.Success).json({
        message: 'OTP verified successfully',
        token: token
    });
})

module.exports = router;