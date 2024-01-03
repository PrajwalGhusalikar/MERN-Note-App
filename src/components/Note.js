import React, { useContext,useState, useEffect, useRef } from "react";

import noteContex from "../contex/NoteContex";
import Noteitem from "./Noteitem";

let isValid = false;
const Note = () => {
  const context = useContext(noteContex);
  const { note, getNotes,editNote } = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
   
  const ref = useRef(null);
  const refClose=useRef(null);
  const [notes, setNotes] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "default",
  });

const onClick = (e) => {
  editNote(notes.id,notes.etitle,notes.edescription,notes.etag)
  refClose.current.click();
};

const onChange = (e) => {
  setNotes({ ...notes, [e.target.name]: e.target.value });
  console.log('obj ' ,{[e.target.name]: e.target.value });
  checkFormValidation(e);
};

const updateNote = (currentNote) => {

  ref.current.click();
  setNotes({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
};

const checkFormValidation = (e) => {
    if (e.target.value.length > 4 ) {
      isValid = true;
    } else {
      isValid = false;
    }
  }

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
          <div className="modal-content">
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
              <button type="button" onClick={onClick}
                  className={`btn btn-primary ${
                    isValid ? "active" : "disabled"
                  }`}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {/* {console.log("key", note._id)} */}
          {note?.map((note) => {
            return (
              <Noteitem key={note._id} updateNote={updateNote} note={note} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Note;
