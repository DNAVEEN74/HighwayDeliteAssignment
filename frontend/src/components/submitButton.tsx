import { atom, useRecoilState, useRecoilValue } from "recoil"
import { signInAtom, signUpAtom } from "../atoms/registerAtom"
import '../styles/submitButton.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

interface ISubmitButton {
    from: string
}

const buttonTypeAtom = atom({
    key: 'buttonTypeAtom',
    default: 'Get OTP'
})

export function SubmitButton ({from}: ISubmitButton) {
    const [buttonType, setButtonType] = useRecoilState(buttonTypeAtom);
    const [email, setEmail] = useState<string>('');
    const signUpData = useRecoilValue(signUpAtom);
    const signInData = useRecoilValue(signInAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if (from === 'SignUp') {
            setEmail(signUpData.email);
        } else if (from === 'SignIn') {
            setEmail(signInData.email);
        }
    }, [from, signUpData.email, signInData.email]);


    const uploadToken = (token: string) => {
        const locaStorage = localStorage;
        locaStorage.setItem('authToken', token);
    }

    const handleSubmit = async () => {
        if(buttonType === 'Get OTP') {

            try {
                const response = await axios.post(`http://localhost:3000/otp/send`, { email: email});
                if(response.status === 401) {
                return toast.success(response.data.message);
                } else if (response.status === 200) {
                    toast.success(response.data.message);
                    return setButtonType(from);
                }
            } catch (err: any) {
                toast.error(err.response?.data?.message || "Something went wrong");
            }

        } else if ( buttonType === 'SignUp') {
            
            try {
                const response = await axios.post(`http://localhost:3000/otp/verify`, {
                    userName: signUpData.userName,
                    dateOfBirth: signUpData.dateOfBirth,
                    email: signUpData.email,
                    otp: signUpData.otp
                })

                if(response.status === 200) { 
                    toast.success(response.data.message);
                    uploadToken(response.data.token);
                    navigate('/Dashboard')
                } else if (response.status === 401) {
                    toast.error(response.data.message);
                }
            } catch ( err: any) {
                toast.error(err.response?.data?.message || "Something went wrong");
            }

        } else if ( buttonType === 'SignIn') {
            
            try {
                const response = await axios.post(`http://localhost:3000/otp/verify`,{
                    email: signInData.email,
                    otp: signInData.otp
                })

                if(response.status === 200) { 
                    toast.success(response.data.message);
                    uploadToken(response.data.token);
                    navigate('/Dashboard')
                } else if (response.status === 401) {
                    toast.error(response.data.message);
                }
            } catch (err: any) {
                toast.error(err.response?.data?.message || "Something went wrong");
            }
        }
    }

    return (
        <>
        <button className="signUp_In_Button" onClick={handleSubmit} >{buttonType}</button>
        </>
    )
}