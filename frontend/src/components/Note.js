import React, { useContext, useState, useEffect, useRef } from "react";

import noteContex from "../contex/NoteContex";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

let isValid = false;
const Note = (props) => {
  const context = useContext(noteContex);
  const { note, getNotes, editNote } = context;
  let showAlert = props.showAlert;
  let navigate = useNavigate();
  let searchText = props.searchText;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [notes, setNotes] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const onClick = (e) => {
    editNote(notes.id, notes.etitle, notes.edescription, notes.etag);
    props.showAlert("Note Edited Successfully", "success");
    refClose.current.click();
  };

  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });

    checkFormValidation(e);
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNotes({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const checkFormValidation = (e) => {
    if (e.target.value.length > 4) {
      isValid = true;
    } else {
      isValid = false;
    }
  };

  return (
    <div>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              background:
                " linear-gradient(to top left, #053e51 0%, #191e46 100%)",
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 my-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={notes.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={notes.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={notes.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                onClick={onClick}
                className={`btn btn-primary ${isValid ? "active" : "disabled"}`}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <div className="container">
          <h2 className="text-white mb-3">
            <u>My Notes:</u>
          </h2>
        </div>
        {note.length === 0 ? (
          <h3 className="text-danger">Currently, No notes are available</h3>
        ) : (
          ""
        )}
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {note
            ?.filter(
              (note) =>
                note.title.toLowerCase().includes(searchText) ||
                note.title.includes(searchText)
            )
            .map((note) => {
              return (
                <Noteitem
                  key={note._id}
                  updateNote={updateNote}
                  showAlert={showAlert}
                  note={note}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Note;
