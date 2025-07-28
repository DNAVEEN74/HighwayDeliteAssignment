import { useRecoilState } from "recoil";
import { signInAtom, type SignIn } from "../atoms/registerAtom";
import InputBox from "./inputBox";

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
        <div className="signInContainer">
            <h2 className="signInHeader">Sign in</h2>
            <p className="signInsubHeader"></p>
            { inputFields.map((field, index) => ( 
                            <InputBox 
                            key={index} 
                            title={field.title} 
                            placeholder={field.placeholder} 
                            name={field.name} 
                            value={signInData[field.name]} 
                            onChange={handleChange} />))}
        </div>
    )
}