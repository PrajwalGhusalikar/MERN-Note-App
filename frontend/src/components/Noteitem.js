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
      {/* <div className="row  mt-2">
        <div className="col">
          <div
            className="card text-light shadow-1g p-3 mb-3   rounded"
            style={{
              background:
                "linear-gradient(to top left, #b0c4de 0%, #6495ed 100%)",
              maxWidth: "15rem",
            }}
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
      </div> */}

      <div
        className=" card my-3 mt-0 "
        style={{
          color: "black",
          backgroundColor: "#FFE4B5",
        }}
      >
        <div
          className="toast-header"
          style={{ color: "black", backgroundColor: "#FFB6C1" }}
        >
          {/* <img src="..." className="rounded me-2" alt="..." /> */}

          <strong className="me-auto"> {note.title}</strong>
          <small
            className="text-muted  d-none d-sm-block d-md-block"
            style={{ color: "black" }}
          >
            {" "}
            Added On: {note.date.slice(0, splitDate)}
          </small>
          <button
            type="button"
            className="btn-close"
            style={{ color: "red", backgroundColor: "red" }}
            aria-label="Close"
            onClick={deleteNoteClick}
          ></button>

          <i
            className="fa-regular fa-pen-to-square btn btn-sm fs-4 mx-2 text-success"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
        <div className="toast-body">{note.description}</div>

        <div className="d-flex justify-content-between justify-content-md-end">
          <small
            className="text-secondary d-block text-start d-sm-none d-md-none mx-2 py-1"
            style={{ color: "black" }}
          >
            {" "}
            Added On: {note.date.slice(0, splitDate)}
          </small>
          <div
            className=""
            style={{
              backgroundColor: "red",
              width: "90px",
              textAlign: "center",
              borderRadius: "5px 5px 0px 0px",
              background: "#E9967A",
            }}
          >
            {note.tag}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
