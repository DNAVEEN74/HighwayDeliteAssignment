import { Trash2 } from 'lucide-react';
import '../styles/noteContainer.css';
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { fetchNotesSelector } from '../atoms/userAtom';
import axios from 'axios';
import { toast } from "react-toastify";

interface NotesContainerProps {
    noteId: string,
    information: string;
}

export function NotesContainer({noteId, information }: NotesContainerProps) {
    const refreshNotes = useRecoilRefresher_UNSTABLE(fetchNotesSelector);

    const handleDeleteNote = async (noteId: string) => {
        const token = localStorage.getItem("authToken");

        const response = await axios.delete('https://highwaydeliteassignment.onrender.com/note/deletenote',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    noteId: noteId
                }
            }
        )

        if (response.status === 200) {
            toast.success(response.data.message);
            refreshNotes();
        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className="noteBoxContainer">
            <div className="noteInfo">
                {information}
            </div>
            <Trash2 style={{cursor:'pointer'}} onClick={() => handleDeleteNote(noteId)} />
        </div>
    )
}