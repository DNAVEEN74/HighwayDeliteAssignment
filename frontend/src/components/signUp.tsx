import { useRecoilState } from "recoil";
import { signUpAtom } from "../atoms/registerAtom";
import type { SignUp } from '../atoms/registerAtom'
import InputBox from "./inputBox";
import { SubmitButton } from "./submitButton";
import React from "react";
import Header from "./header";
import SubHeading from "./subHeading";
import BottomWarning from "./bottomWarning";
import '../styles/signup.css'
import { GoogleAuthButton } from "./googleAuthButton";

interface SignUpFields {
  name: keyof SignUp;
  title: string;
  placeholder: string;
}

export function SignUp () {
    const [signUpData, setSignUpData] = useRecoilState(signUpAtom);

    const inputFields: SignUpFields[] = [
        { name: 'userName', title: 'userName', placeholder: 'Your Name' },
        {name: 'dateOfBirth', title: 'dateOfBirth', placeholder: 'Date of Birth'},
        { name: 'email', title: 'Email', placeholder: 'Enter your email address' },
        { name: 'otp', title: 'otp', placeholder: 'Enter otp' }
    ];

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setSignUpData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="SignUpOuterContainer">
            <div className="signUpContainer">
                <Header title={'SignUp'} />
                <SubHeading subHeading={"Sign up to enjoy the features of NoteMaster"} />
                {inputFields.map((field, index) => (
                    <InputBox
                        key={index}
                        title={field.title}
                        placeholder={field.placeholder}
                        name={field.name}
                        value={signUpData[field.name]}
                        onChange={handleChange}
                    />
                ))}
                <SubmitButton from={'SignUp'} />
                <BottomWarning text={"Already have an account?"} hyperText={'SignIn'} />
                <p style={{
                    fontFamily:'sans-serif',
                    marginTop:'1px',
                    marginBottom:'1px',
                    alignSelf:'center'
                }} >or</p>
                <GoogleAuthButton type={'SignUp'} />
            </div>
        </div>
    )
}