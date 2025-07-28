import { useRecoilState } from "recoil";
import { signUpAtom } from "../atoms/registerAtom";
import type { SignUp } from '../atoms/registerAtom'
import InputBox from "./inputBox";
import { SubmitButton } from "./submitButton";

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
        <div className="signUpContainer">
            <h2 className="signUpHeader">Sign up</h2>
            <p className="signUpSubHeader">Sign up to enjoy the features of NoteMaster</p>
            { inputFields.map((field, index) => ( 
                <InputBox 
                key={index} 
                title={field.title} 
                placeholder={field.placeholder} 
                name={field.name} 
                value={signUpData[field.name]} 
                onChange={handleChange} />))}
            <SubmitButton />
        </div>
    )
}