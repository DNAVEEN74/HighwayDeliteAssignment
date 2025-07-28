import { Trash2 } from 'lucide-react';
import '../styles/noteContainer.css';

interface NotesContainerProps {
    information: string;
}

export function NotesContainer({ information }: NotesContainerProps) {
    return (
        <div className="noteBoxContainer">
            <div className="noteInfo">
                {information}
            </div>
            <Trash2 />
        </div>
    )
}