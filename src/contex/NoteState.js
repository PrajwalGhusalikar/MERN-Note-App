import Alert from "../components/Alert";
import noteContex from "./NoteContex";

import { useState } from "react";

const url = "http://localhost:5000";

const NoteState = (props) => {
  const notes = [];
  const [note, setNote] = useState(notes);
  //Fetch all notes
  const getNotes = async () => {
    const response = await fetch(`${url}/note/fetchnotes`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4NWVlNzE3NmVmYmEyZWMwMmI5YzcxIn0sImlhdCI6MTcwMzM1NjIyOH0.ZSgiIfTvRz_ekiR8GyYl9tLis8VBgvLN397AQPSrsyg",
      },
    });
    const notes = await response.json();
    // console.log("notes", notes);
    setNote(notes);
  };

  //add a note
  const addNote = async (title, description, tag) => {
 
      // console.log("new note");
      const response = await fetch(`${url}/note/createnotes`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4NWVlNzE3NmVmYmEyZWMwMmI5YzcxIn0sImlhdCI6MTcwMzM1NjIyOH0.ZSgiIfTvRz_ekiR8GyYl9tLis8VBgvLN397AQPSrsyg",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const singleCreteNoteResponse = await response.json();

      // console.log("json add", singleCreteNoteResponse);
      if(singleCreteNoteResponse.success) {
        setNote(note.concat(singleCreteNoteResponse.notes));
        setTimeout(()=>{
         alert("note has been added")
        },2000)
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4NWVlNzE3NmVmYmEyZWMwMmI5YzcxIn0sImlhdCI6MTcwMzM1NjIyOH0.ZSgiIfTvRz_ekiR8GyYl9tLis8VBgvLN397AQPSrsyg",
      },
    });
    const json = await response.json();
    // console.log("delete works " + id);
    console.log(json)
    const newNote = note.filter(note => 
     note._id !== id
    );

    setNote(newNote);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${url}/note/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4NWVlNzE3NmVmYmEyZWMwMmI5YzcxIn0sImlhdCI6MTcwMzM1NjIyOH0.ZSgiIfTvRz_ekiR8GyYl9tLis8VBgvLN397AQPSrsyg",
      },
      body: JSON.stringify({ title, description, tag }),
    });
       let json = await response.json
       console.log(json)
       let newNote= JSON.parse(JSON.stringify(note))
 console.log("edited title", title)
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
    console.log("newNote",newNote)
    setNote(newNote)
  };

  // const update=()=>{
  //    setTimeout(() =>{
  //     setState({
  //         "name" : "Pratik",
  //         "roll":"0"
  //     })
  //     console.log("state",state)
  //    }, 2000);
  // }

  return (
    
    <noteContex.Provider value={{ note, addNote, deleteNote, getNotes,editNote }}>
      {props.children}
      
    </noteContex.Provider>
  );
};
export default NoteState;
