import { atom } from "recoil";

interface User{
    userId: string
    userName: string,
    email:string,
}

interface Note{
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

export const notesAtom = atom<Note[]>({
    key: 'notesAtom',
    default: [{
        noteId: '',
        noteInfo: ''
    }]
})