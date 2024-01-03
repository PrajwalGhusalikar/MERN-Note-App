import React, { useContext } from "react";

import noteContex from "../contex/NoteContex";
const Noteitem = (props) => {
const {note,updateNote} = props
const context = useContext(noteContex)
const {deleteNote} = context
  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="card text-dark bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title"> {note.title}</h5>
              <p className="card-text">{note.description}</p>
              
              <button onClick={()=>{updateNote(note)}} className="btn btn-success btn-sm ">
                <i className="fa-regular fa-pen-to-square"></i>
              </button>

              <button onClick={()=>{deleteNote(note._id)}} className="btn btn-danger btn-sm mx-2">
                <i className="fa-solid fa-trash " ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
