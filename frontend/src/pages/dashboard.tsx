import { AppBar } from "../components/appBar";
import { NotesContainer } from "../components/notesContainer";
import '../styles/dashboard.css'


export function Dashboard () {

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