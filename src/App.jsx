import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, Link} from "react-router-dom";
import Landing from './components/Landing.jsx';
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import './App.css';
import Students from "./students/Students.jsx";


import Admins from "./admins/Admins.jsx";
import RecoverPassword from "./auth/RecoverPassword.jsx";
import ChangePassword from "./auth/ChangePassword.jsx";


import AboutUs from "./useful-links/AboutUs.jsx";


import PrivacyPolicy from "./useful-links/PrivacyPolicy.jsx";
import Mission from "./useful-links/Mission.jsx";
import OurTeam from "./useful-links/OurTeam.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/landing"/>}/>
                <Route path="/landing" element={<Landing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/recover-password" element={<RecoverPassword/>}/>
                <Route path="/change-password/:tokenUrl" element={<ChangePassword/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/estudiante/*" element={<Students/>}/>


                <Route path="/sobre-nosotros" element={<AboutUs/>}/>
                <Route path="/nuestra-mision" element={<Mission/>}/>
                <Route path="/nuestro-equipo" element={<OurTeam/>}/>
                <Route path="/politica-de-privacidad" element={<PrivacyPolicy/>}/>






                <Route path="/admin/*" element={<Admins/>}/>

            </Routes>
        </Router>
    );
}

export default App;
