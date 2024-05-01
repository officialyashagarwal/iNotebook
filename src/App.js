import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import './App.css';
import Navbar from "./compnents/Navbar";
import About from "./compnents/About";
import Home from "./compnents/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./compnents/Alert";
import Login from "./compnents/Login";
import Signup from "./compnents/Signup";


function App() {
  const [alert, setAlert] = useState(null);
  function showAlert(type, message){
    setAlert({
      type : type,
      message : message
    })
    setTimeout(() => {
      setAlert(null);
    }, 1900);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <Alert Alert = {alert}/>
          <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home showAlert = {showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert = {showAlert}/>}/>
            <Route exact path="/signup" element={<Signup showAlert = {showAlert}/>}/>
          </Routes>
         </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
