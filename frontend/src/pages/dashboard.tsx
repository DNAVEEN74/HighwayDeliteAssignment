import { useEffect } from "react";
import { AppBar } from "../components/appBar";
import { NotesContainer } from "../components/notesContainer";
import '../styles/dashboard.css'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export function Dashboard () {
    const navigate = useNavigate();

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

    const arr = [
        { info: 'jdsfjsafodsjclkdsjoisjdcsmdlkcm'},
        { info: 'jdsjfosjfoijclksdjcsm kjom ldsvcjsd'}
    ]

    return (
        <>
        <AppBar />
        <div className="dashboardContainer">
            <div className="dashboardTitleBar">
                <div className="myNoteText">
                    My Notes
                </div>
                <button className="newNoteButton">
                    New Note
                </button>
            </div>
            <div className="noteContainer">
                {arr.map((note, index) => (<NotesContainer key={index} information={note.info} />))}
            </div>
        </div>
        </>
    )
}