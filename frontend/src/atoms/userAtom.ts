import axios from "axios";
import { atom, selector } from "recoil";

interface User{
    userId: string
    userName: string,
    email:string,
}

export interface Note{
    noteId: string,
    noteInfo: string,
}

export const userAtom = atom<User>({
    key: 'userAtom',
    default: {
        userId:'',
        userName: '',
        email: ''
    }
})

export const fetchNotesSelector = selector({
  key: "fetchNotesSelector",
  get: async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("https://highwaydeliteassignment.onrender.com/note/getnote", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const notesData = response.data.notes;

      const formattedNotes = notesData.map((note: any) => ({
        noteId: note._id,
        noteInfo: note.notes,
      }));

      return formattedNotes;
    } catch (err) {
      console.error("Error fetching notes:", err);
      return [];
    }
  },
});