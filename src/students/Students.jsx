// Students.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from './../components/global/Sidebar.jsx'; // Import the Sidebar component
import InicioEstudiantes from "./inicio/./InicioEstudiantes.jsx";
import MisGrupos from "./misGrupos/MisGrupos.jsx";
import SolicitarGrupo from "./solicitarGrupo/SolicitarGrupo.jsx";
import Notificaciones from "./notificaciones/Notificaciones.jsx";
import Ajustes from "./ajustes/Ajustes.jsx";
import logout from "./../auth/utils/logout.js";

export default function Students() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const userType = localStorage.getItem('userType');



    return (
        <div className="h-screen bg-white flex">

            {/* Sidebar */}
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} userType={userType} />
            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 p-8 ${isOpen ? 'ml-64' : 'ml-20'}`}>
                <Routes>
                    <Route path="inicio" element={<InicioEstudiantes />} />
                    <Route path="mis-grupos" element={<MisGrupos />} />
                    <Route path="solicitar-grupo" element={<SolicitarGrupo />} />
                    <Route path="notificaciones" element={<Notificaciones />} />
                    <Route path="ajustes" element={<Ajustes />} />
                    <Route path="*" element={<Navigate to="inicio" replace />} />
                </Routes>
            </div>
        </div>
    );
}