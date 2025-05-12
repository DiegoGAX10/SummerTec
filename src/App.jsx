import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Landing from './components/Landing.jsx';
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import './App.css';
import Inicio from "./students/inicio/Inicio.jsx";
import SolicitarGrupo from "./students/registergroup/formRegistro.jsx";
import AsignarGrupo from './admin/asignargrupo.jsx';
import Horarios from './admin/horarios.jsx';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/landing" />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Inicio />} />
                <Route path="/formRegistro" element={<SolicitarGrupo />} />
                <Route path='/AsignarGrupo' element={<AsignarGrupo/>}/>
                <Route path='/horarios' element={<Horarios/>}/>
            </Routes>
        </Router>
    );
}

export default App;
