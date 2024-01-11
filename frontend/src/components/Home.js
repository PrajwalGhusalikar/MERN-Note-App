import React from "react";
import Notes from "./Note";
import AddNotes from "./AddNotes";
const Home = (props) => {
  let showAlert = props.showAlert;
  let searchText = props.searchText;
  return (
    <div>
      <AddNotes showAlert={showAlert} />
      <Notes showAlert={showAlert} searchText={searchText}></Notes>
    </div>
  );
};

export default Home;
