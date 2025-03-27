import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Landing from './components/Landing.jsx';
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import './App.css';
import Students from "./students/Students.jsx";


import Admins from "./admins/Admins.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/landing"/>}/>
                <Route path="/landing" element={<Landing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/students/*" element={<Students/>}/>

                <Route path="/admins/*" element={<Admins/>}/>

            </Routes>
        </Router>
    );
}

export default App;
