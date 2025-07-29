import { useEffect, useState } from "react";
import { AppBar } from "../components/appBar";
import '../styles/dashboard.css'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { fetchNotesSelector, userAtom, type Note } from "../atoms/userAtom";
import { NotesContainer } from "../components/notesContainer";
import { useRecoilRefresher_UNSTABLE } from "recoil";

export function Dashboard () {
    const navigate = useNavigate();
    const [userData, setUserData] = useRecoilState(userAtom);
    const notesArray = useRecoilValueLoadable(fetchNotesSelector);
    const refreshNotes = useRecoilRefresher_UNSTABLE(fetchNotesSelector);
    const [newNote, setNewNote] = useState(false)
    const [noteText, setNoteText] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if(!token) {
            navigate('/SignUp');
        }
    },[])

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
            const response = await axios.get('https://highwaydeliteassignment.onrender.com/profile', {
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

    const handleNewNoteChange = (e: any) => {
        return setNoteText(e.target.value);
    };

    const handleAddNewNote = async () => {
        const token = localStorage.getItem("authToken");

        if (!noteText.trim()) {
            toast.error("Note should be filled");
            return;
        }

            const response = await axios.post("https://highwaydeliteassignment.onrender.com/note/createnote",
                {
                    notes: noteText
                },
                { headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            if (response.status === 200) {
                toast.success("Note added successfully!");
                setNoteText("");
                setNewNote(false);
                refreshNotes();
            } else {
                toast.error("Something went wrong while adding the note.");
            }
    };

    return (
        <>
        <AppBar userName={userData.userName} />
        <div className="dashboardContainer">
            <div className="dashboardTitleBar">
                <div className="myNoteText">
                    My Notes
                </div>
                <button className="noteButton" onClick={() => setNewNote(!newNote)}>
                    {newNote ? "Cancel" : "New Note"}
                </button>
            </div>
            {newNote ? 
            <div className="newNoteContainer">
                <input className="newNoteInputField" value={noteText} type="text" placeholder="Enter your note" onChange={handleNewNoteChange}/>
                <button className="newNoteAddButton" onClick={handleAddNewNote} >Add</button>
            </div> : <></>}
            <div className="noteContainer">
                {notesArray.state === "loading" && <p>Loading notes...</p>}
                {notesArray.state === "hasError" && <p>Error loading notes.</p>}
                {notesArray.state === "hasValue" &&
                    notesArray.contents.map((note: Note, index: number) => (
                    <NotesContainer key={index} noteId={note.noteId} information={note.noteInfo} />
                    ))
                }
            </div>
        </div>
        </>
    )
}