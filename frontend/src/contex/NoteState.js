import noteContex from "./NoteContex";

import { useState } from "react";

const url = "https://noteapp2-b4en.onrender.com";

const NoteState = (props) => {
  const notes = [];
  const [note, setNote] = useState(notes);
  //Fetch all notes
  const getNotes = async () => {
    const response = await fetch(`${url}/note/fetchnotes`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const notes = await response.json();
    setNote(notes);
  };

  //display search notes

  const searchNotes=(newnotes)=>{
    setNote(newnotes)
  }

  //add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${url}/note/createnotes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const singleCreteNoteResponse = await response.json();

    if (singleCreteNoteResponse.success) {
      setNote(note.concat(singleCreteNoteResponse.notes));
    }
    if (singleCreteNoteResponse.errors?.length) {
      alert(singleCreteNoteResponse.errors[0].msg);
    }
  };

  //delete a note

  const deleteNote = async (id) => {
    const response = await fetch(`${url}/note/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    const newNote = note.filter((note) => note._id !== id);

    setNote(newNote);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${url}/note/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    let json = await response.json;

    let newNote = JSON.parse(JSON.stringify(note));

    //logic to edit in client
    for (let i = 0; i < newNote.length; i++) {
      const element = newNote[i];
      if (element._id === id) {
        newNote[i].title = title;
        newNote[i].description = description;
        newNote[i].tag = tag;
        break;
      }
    }
    setNote(newNote);
  };

  return (
    <noteContex.Provider
      value={{ note, addNote, deleteNote, getNotes, editNote , searchNotes}}
    >
      {props.children}
    </noteContex.Provider>
  );
};
export default NoteState;
