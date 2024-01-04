import React from "react";
import Notes from "./Note";
import AddNotes from "./AddNotes";
const Home= (props)=> {
  let showAlert = props.showAlert
  return (
  
    <div>
     <AddNotes showAlert={showAlert}/>
     <Notes showAlert={showAlert}></Notes>
    </div>
  );
}

export default Home;
