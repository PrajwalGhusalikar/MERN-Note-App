import React, { useContext, useEffect } from "react";
import noteContex from "../contex/NoteContex";

const About = () => {
  const a = useContext(noteContex);
  // useEffect(()=>{
  //         a.update()
  //     },[]
  //     // eslint-disable-next-line
  // )
  return (
    <div>
      This is about
      {/* about {a.state?.name} and {a.state?.roll} */}
    </div>
  );
};

export default About;
