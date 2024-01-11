import React from "react";
const SearchBar = (props) => {
  //   let context = useContext(noteContex);
  //   let { note, searchNotes, getNotes, notes } = context;
  //   let searchTitle = "";
  //   console.log("notes", notes);
  //   let [title, setTitle] = useState([]);
  //   let location = useLocation();

  //   useEffect(() => {}, [location]);
  //     useEffect(() => {
  //     getNotes();
  //   }, [notes]);

  //   let i = 0;

  //   while (i < note.length) {
  //     let alltitle = note[i].title.toLowerCase();
  //     //  console.log("alltitle",alltitle)
  //     if (!title.includes(alltitle)) {
  //       title.push(alltitle);
  //     }
  //     i++;
  //   }
  //   console.log("note.title", title);
  //   console.log("note", note);
  //   function onchange(e) {
  //     e.preventDefault();
  //     searchTitle = e.target.value;
  //     if (!(searchTitle === "")) {
  //       if (title.includes(searchTitle)) {
  //         console.log("searchTitle", searchTitle);
  //         let newNote = note.filter(
  //           (note) => note.title.toLowerCase().trim() === searchTitle
  //         );
  //         searchNotes(newNote);
  //       } else {
  //         searchNotes(notes);
  //       }
  //     } else {
  //       console.log("Helo i am null");
  //       searchNotes(notes);
  //     }
  //   }

  return (
    <div>
      <form className="d-flex input-group-sm">
        <input
          className="form-control me-2 "
          type="search"
          placeholder="Search Notes"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => {
            props.setSearchText(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
