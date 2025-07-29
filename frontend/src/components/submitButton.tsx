import { useRecoilValue } from "recoil"
import { signInAtom, signUpAtom } from "../atoms/registerAtom"
import '../styles/submitButton.css';

interface ISubmitButton {
    type: string
}

export function SubmitButton ({type}: ISubmitButton) {
    const signUpData = useRecoilValue(signUpAtom);
    const signInData = useRecoilValue(signInAtom);

    const handleSubmit = () => {
        console.log(signInData);
        console.log(signUpData);
    }

    return (
        <>
        <button className="signUp_In_Button" onClick={handleSubmit} >{type}</button>
        </>
    )
}