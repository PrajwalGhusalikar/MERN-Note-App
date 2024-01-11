import React, { useContext } from "react";

import noteContex from "../contex/NoteContex";
const Noteitem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContex);
  const { deleteNote } = context;

  function deleteNoteClick() {
    deleteNote(note._id);
    props.showAlert("Note Deleted Succesfully", "success");
  }
  return (
    <div>
      <div className="row mt-2">
        <div className="col">
          <div
            className="card text-light shadow-1g p-3 mb-5 rounded"
            style={{ backgroundColor: "#001a33" }}
          >
            <div className="card-body">
              
              <span className="position-absolute top-0 end-0  badge rounded-pill bg-danger">
              
                <span className="visually">{note.tag}</span>
              </span>
              <h5 className="card-title"> {note.title}</h5>
              <p className="card-text">{note.description}</p>

              <button
                onClick={() => {
                  updateNote(note);
                }}
                className="btn btn-success btn-sm "
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </button>

              <button
                onClick={deleteNoteClick}
                className="btn btn-danger btn-sm mx-2"
              >
                <i className="fa-solid fa-trash "></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
