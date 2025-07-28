import { ListTodo, CircleUserRound } from 'lucide-react';
import '../styles/appBar.css'

export function AppBar () {
    return (
        <div className="appBarContainer">
            <div className="appBarLeftContainer">
                <ListTodo />
                <h4 className='appBarLogo'>NoteMaster</h4>
            </div>
            <div className="appBarRightContainer">
                <h4 className='appBarUserTitle'>Hello, Naveen</h4>
                <CircleUserRound />
            </div>
        </div>
    )
}