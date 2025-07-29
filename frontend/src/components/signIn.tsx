import { useRecoilState } from "recoil";
import { signInAtom, type SignIn } from "../atoms/registerAtom";
import InputBox from "./inputBox";
import { SubmitButton } from "./submitButton";
import React from "react";
import BottomWarning from "./bottomWarning";
import SubHeading from "./subHeading";
import Header from "./header";
import '../styles/signin.css'
import { GoogleAuthButton } from "./googleAuthButton";

interface SignInFields {
  name: keyof SignIn;
  title: string;
  placeholder: string;
}

export function SignIn () {
    const [signInData, setSignInData] = useRecoilState(signInAtom);

    const inputFields: SignInFields[] = [
        { name: 'email', title: 'Email', placeholder: 'Enter your email address' },
        { name: 'otp', title: 'otp', placeholder: 'Enter otp' }
    ];

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setSignInData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="SignInOuterContainer">
            <div className="signInContainer">
                <Header title={'SignIn'} />
                <SubHeading subHeading={"Please login to continue to your account"} />
                {inputFields.map((field, index) => (
                <InputBox
                    key={index}
                    title={field.title}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={signInData[field.name]}
                    onChange={handleChange}
                    />))}
                    <SubmitButton from={'SignIn'} />
                    <BottomWarning text={"Need an account?"} hyperText={'SignUp'} />
                    <p style={{
                        fontFamily:'sans-serif',
                        marginTop:'1px',
                        marginBottom:'1px',
                        alignSelf:'center'
                    }} >or</p>
                    <GoogleAuthButton type={'Login'} />
            </div>
        </div>
    )
}