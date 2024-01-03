import React, { useState, useContext } from "react";
import noteContex from "../contex/NoteContex";
let isValid = false;
let isTitleValid = false;
let isDescriptionValid = false;

const AddNotes = () => {
  const contex = useContext(noteContex);
  const { addNote } = contex;
  let defaultNoteValue = {
    title: "",
    description: "",
    tag: "default",
  };
  const [note, setNote] = useState(defaultNoteValue);


 function resetForm(){
     isValid = false;
isTitleValid = false;
isDescriptionValid = false;
setNote(defaultNoteValue);
document.querySelector(".error-title").innerHTML = "";
document.querySelector(".error-des").innerHTML =""
  }
  const onClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    resetForm()
   
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

    console.log(
      "isDescriptionValid",
      isDescriptionValid,
      "isTitleValid",
      isTitleValid
    );
  };

  return (
    <div>
      <h1>Add Notes</h1>
      <div className="container">
        <form>
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
            />
            <p className="error-title"></p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
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
            />
          </div>

          <button
            type="submit"
            onClick={onClick}
            className={`btn btn-primary ${isValid ? "active" : "disabled"}`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
