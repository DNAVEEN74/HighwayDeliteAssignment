import { useEffect } from "react";
import { AppBar } from "../components/appBar";
import '../styles/dashboard.css'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";

export function Dashboard () {
    const navigate = useNavigate();
    const [userData, setUserData] = useRecoilState(userAtom);

    useEffect(() => {
        const fetch = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('authToken', token);
            toast.success(` successful with Google!`);
            navigate('/Dashboard'); 
        }
        }
        fetch();
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('authToken')
            const response = await axios.get('http://localhost:3000/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.data;
            if (response.status === 200) {
                setUserData({
                    userId: data.userId,
                    userName: data.userName,
                    email: data.email
                })
            }
        }
        fetchUserProfile();
    }, [])

    return (
        <>
        <AppBar userName={userData.userName} />
        <div className="dashboardContainer">
            <div className="dashboardTitleBar">
                <div className="myNoteText">
                    My Notes
                </div>
                <button className="newNoteButton">
                    New Note
                </button>
            </div>
            {/* <div className="noteContainer">
                {arr.map((note, index) => (<NotesContainer key={index} information={note.info} />))}
            </div> */}
        </div>
        </>
    )
}