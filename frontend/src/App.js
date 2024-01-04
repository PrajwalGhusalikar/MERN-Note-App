import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./contex/NoteState";
import Alert from "./components/Alert";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useState } from "react";
function App() {
  let [alert,setAlert]= useState(null)
  const showAlert =(message,type)=>{
    setAlert({
          message: message,
          type:type
    })

    setTimeout(()=>{
      setAlert(null)
    },3000)
  }
    return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
              <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
