import React, { useState, useContext } from "react";
import noteContex from "../contex/NoteContex";
let isValid = false;
let isTitleValid = false;
let isDescriptionValid = false;

const AddNotes = (props) => {
  const contex = useContext(noteContex);
  const { addNote } = contex;
  let defaultNoteValue = {
    title: "",
    description: "",
    tag: "Default",
  };
  const [note, setNote] = useState(defaultNoteValue);

  function resetForm() {
    isValid = false;
    isTitleValid = false;
    isDescriptionValid = false;
    setNote(defaultNoteValue);
    document.querySelector(".error-title").innerHTML = "";
    document.querySelector(".error-des").innerHTML = "";
  }
  const onClick = (e) => {
    e.preventDefault();
    addNote(note.title.trim(), note.description.trim(), note.tag.trim());
    props.showAlert("Note Added Successfully", "success");
    resetForm();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    checkFormValidation(e);
  };

  const checkFormValidation = (e) => {
    if (e.target.name === "title") {
      if (e.target.value.trim().length > 4 && e.target.value !== null) {
        isTitleValid = true;
        document.querySelector(".error-title").innerHTML = "Looks Good";
        document.querySelector(".error-title").style = "color:green";
      } else {
        isTitleValid = false;
        document.querySelector(".error-title").innerHTML =
          "enter minimun 5 charecter";
        document.querySelector(".error-title").style = "color:red";
      }
    }
    if (e.target.name === "description") {
      if (e.target.value.trim().length > 4 && e.target.value !== null) {
        isDescriptionValid = true;
        document.querySelector(".error-des").innerHTML = "Looks Good";
        document.querySelector(".error-des").style = "color:green";
      } else {
        isDescriptionValid = false;
        document.querySelector(".error-des").innerHTML =
          "enter minimun 5 charecter";
        document.querySelector(".error-des").style = "color:red";
      }
    }
    isValid = isDescriptionValid && isTitleValid ? true : false;
  };

  return (
    <div>
      <h2 className="pt-2" style={{ fontFamily: "revert" }}>
        <u>
          {" "}
          <a
            className="btn btn-warning "
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Add a Note <i className="fa-solid fa-plus"></i>
          </a>
        </u>
      </h2>
      <div className="container collapse" id="collapseExample">
        <form onSubmit={onClick}>
          <div className="mb-3 my-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
              value={note.title}
              minLength={5}
              required
            />
            <p className="error-title"></p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              rows={4}
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
              minLength={5}
              required
            />
            <p className="error-des"></p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
              required
            />
          </div>

          <div className="container">
            <button
              type="submit"
              className={`btn btn-primary ${isValid ? "active" : "disabled"}`}
            >
              Submit
            </button>
            <button
              type="submit"
              onClick={() => resetForm()}
              className={`btn btn-danger mx-2}`}
              style={{ marginLeft: "10px" }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
