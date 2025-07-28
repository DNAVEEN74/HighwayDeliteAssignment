import { atom } from "recoil";

export interface SignUp {
    userName: string,
    dateOfBirth: string,
    email: string,
    otp: string
}

export interface SignIn {
    email: string,
    otp: string
}

export const signUpAtom = atom<SignUp>({
    key: 'signUpAtom',
    default: {
        userName: '',
        dateOfBirth: '',
        email: '',
        otp:''
    }
})

export const signInAtom = atom<SignIn>({
    key: 'signInAtom',
    default: {
        email: '',
        otp: ''
    }
})