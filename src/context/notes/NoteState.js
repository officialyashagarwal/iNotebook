import React, { useState } from "react";

import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = [];

    const [notes,setNotes] = useState(notesInitial);

    const getNotes = async() => {
        const url = `http://localhost:5000/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method:"GET",
            headers :{
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
        });

        const json = await response.json();

        console.log(json)
        setNotes(json)
    }



    const addNote = async (title, descryption, tag) => {
        const url = `http://localhost:5000/api/notes/addnote`;
        const response = await fetch(url, {
            method:"POST",
            headers :{
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('jwttoken')
            },
            body : JSON.stringify({title, descryption, tag})
        });
        const json = await response.json();
        console.log(json);

        const newNote = {
            _id: "324214124",
           title: title,
           descryption:descryption,
           tag : tag
        };
        setNotes(notes.concat(newNote));
    }

    const editNote =  async(id, title, descryption,tag) => {
        // APi Call
        const url = `http://localhost:5000/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method:"PUT",
            headers :{
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('jwttoken')
            },
            body : JSON.stringify({title, descryption, tag})
        });
        const json = await response.json();
        console.log(json);

        // Logic to edit in client
        const newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            if(newNotes[index]._id === id){
                newNotes[index].title = title;
                newNotes[index].descryption = descryption;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);

    }

    const deleteNote = async (id) => {
        // Api Call
        const url = `http://localhost:5000/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method:"DELETE",
            headers :{
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('jwttoken')
            }
        });
        const json = await response.json();
        console.log(json);

        const newNotes = notes.filter((note) => {return note._id !== id});
        setNotes(newNotes);
    }


    return (
    <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;