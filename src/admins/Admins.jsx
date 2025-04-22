import React, {useState} from 'react';
import {Link, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import InicioAdmins from './inicio-admins/InicioAdmins.jsx';
import {MdGroups, MdAddBox, MdNotifications, MdSettings, MdLogout} from "react-icons/md";
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {IoHome} from "react-icons/io5";
import MisGruposAdmins from './mis-grupos-admins/MisGruposAdmins.jsx';
import logout from "../auth/utils/logout.js";
import Sidebar from "../components/global/Sidebar.jsx";

import SolicitarGrupoAdmins from "./solicitar-grupo-admins/SolicitarGrupoAdmins.jsx";
import NotificacionesAdmins from "./notificaciones-admins/NotificacionesAdmins.jsx";
import AjustesAdmins from "./ajustes-admins/AjustesAdmins.jsx";
export default function Students() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        logout(navigate);
    };

    const userType = localStorage.getItem('userType');



    return (
        <div className="h-screen bg-white flex">
            {/* Sidebar */}

          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} userType={userType} />


            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 p-8 ${isOpen ? 'ml-64' : 'ml-20'}`}>
                <Routes>

                    <Route path="/inicio" element={<InicioAdmins/>}/>
                    <Route path="*" element={<Navigate to="inicio" replace/>}/>
                    <Route path="mis-grupos" element={<MisGruposAdmins />} />
                    <Route path="solicitar-grupo" element={<SolicitarGrupoAdmins />} />
                    <Route path="notificaciones" element={<NotificacionesAdmins />} />
                    <Route path="ajustes" element={<AjustesAdmins />} />

                </Routes>
            </div>

        </div>
    );
}
