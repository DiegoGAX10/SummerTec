import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import './App.css';
import Inicio from './students/inicio/Inicio.jsx';
import { SobreNosotros, PrivacyPolicy, OurMission, OurTeam } from './components/AboutPages.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/landing" />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Inicio />} />
                <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
                <Route path="/nuestra-mision" element={<OurMission />} />
                <Route path="/nuestro-equipo" element={<OurTeam />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
}

export default App;