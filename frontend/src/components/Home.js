import React from "react";
import Notes from "./Note";
import AddNotes from "./AddNotes";
import SearchBar from "./SearchBar";
const Home = (props) => {
  let showAlert = props.showAlert;
  let searchText = props.searchText;
  let setSearchText = props.setSearchText;
  return (
    <div>
      <div className="d-sm-none">   <SearchBar setSearchText={setSearchText} /></div>
    
      <AddNotes showAlert={showAlert} />
      <Notes showAlert={showAlert} searchText={searchText}></Notes>
    </div>
  );
};

export default Home;
