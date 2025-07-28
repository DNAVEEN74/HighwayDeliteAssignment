import { SignIn } from '../components/signIn';
import { SignUp } from '../components/signUp';
import '../styles/register.css';

interface CompType {
    comp: string
}

export function RegisterPage ( {comp} : CompType ) {

    return (
        <div className="registerPage">
            <div className="registerleftContainer">
                { comp === 'SignUp' ? <SignUp /> : <SignIn />}
            </div>
            <div className="registerRightContainer">

            </div>
        </div>
    )
}