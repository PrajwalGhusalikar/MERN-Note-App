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

  let splitDate = note.date.indexOf("T");
  return (
    <div>
      <div className="row  mt-2">
        <div className="col">
          <div
            className="card text-light shadow-1g p-3 mb-3   rounded"
            style={{ background: "linear-gradient(to bottom, #66ccff 0%, #ff6699 100%)", maxWidth: "15rem" }}
          >
            <div className="card-body">
              <span className="position-absolute top-0 end-0  badge rounded-pill bg-danger">
                <span className="visually">{note.tag}</span>
              </span>
              <h5 className="card-title" style={{ color: "yellow" }}>
                {" "}
                {note.title}
              </h5>
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
            <p className="card-text text-dark">
              {" "}
              Added On: {note.date.slice(0, splitDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
