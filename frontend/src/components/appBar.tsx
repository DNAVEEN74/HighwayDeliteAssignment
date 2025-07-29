import { ListTodo, CircleUserRound } from 'lucide-react';
import '../styles/appBar.css'

interface IAppBarProp {
    userName: string
}

export function AppBar ({userName}: IAppBarProp) {
    return (
        <div className="appBarContainer">
            <div className="appBarLeftContainer">
                <ListTodo />
                <h4 className='appBarLogo'>NoteMaster</h4>
            </div>
            <div className="appBarRightContainer">
                <h4 className='appBarUserTitle'>Hello, {userName}</h4>
                <CircleUserRound />
            </div>
        </div>
    )
}