import { SignIn } from '../components/signIn';
import { SignUp } from '../components/signUp';
import '../styles/register.css';
import righColImg from '../assets/rightCol.jpg';
import { ListTodo } from 'lucide-react';

interface CompType {
    comp: string
}

export function RegisterPage ( {comp} : CompType ) {

    return (
        <div className="registerPage">
            <div className="registerleftContainer">
                <ListTodo className='appLogo' />
                <h4 className="titleHeader">Note Master</h4>
                { comp === 'SignUp' ? <SignUp /> : <SignIn />}
            </div>
            <div className="registerRightContainer">
                <img src={righColImg} alt="Notes Illustration" className="registerImage" />
            </div>
        </div>
    )
}