import React, {useState} from 'react';
import {Link, Routes, Route, Navigate} from 'react-router-dom';
import InicioAdmins from './inicio-admins/InicioAdmins.jsx';
import {MdGroups, MdAddBox, MdNotifications, MdSettings, MdLogout} from "react-icons/md";
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {IoHome} from "react-icons/io5";
import MisGrupos from "../students/misGrupos/MisGrupos.jsx";
import SolicitarGrupo from "../students/solicitarGrupo/SolicitarGrupo.jsx";
import Notificaciones from "../students/notificaciones/Notificaciones.jsx";
import Ajustes from "../students/ajustes/Ajustes.jsx";

export default function Students() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        {
            label: 'Inicio',
            icon: <IoHome size={24}/>,
            path: '/admins/inicio',
            color: 'text-[var(--primary-color)]'
        },
        {
            label: 'Mis grupos',
            icon: <MdGroups size={24}/>,
            path: '',
            color: 'text-[var(--primary-color)]'
        },
        {
            label: 'Solicitar grupo',
            icon: <MdAddBox size={24}/>,
            path: '',
            color: 'text-[var(--primary-color)]'
        },
        {
            label: 'Notificaciones',
            icon: <MdNotifications size={24}/>,
            path: '',
            color: 'text-[var(--primary-color)]'
        },
        {
            label: 'Ajustes',
            icon: <MdSettings size={24}/>,
            path: '',
            color: 'text-[var(--primary-color)]'
        },
        {
            label: 'Cerrar sesión',
            icon: <MdLogout size={24}/>,
            onClick: () => console.log('CERRANDO SESIÓN'),
            isButton: true,
            color: 'text-red-500'
        }
    ];

    return (
        <div className="h-screen bg-white flex">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-white text-[var(--primary-color)] shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
                {/* Toggle Button */}
                <div className="flex justify-end p-4">
                    <button onClick={toggleSidebar}
                            className="cursor-pointer flex items-center justify-center rounded-full bg-[var(--primary-color)] text-white p-2 hover:bg-[#163560] transition-colors duration-200">
                        {isOpen ? <FiChevronLeft size={20} className="text-white"/> :
                            <FiChevronRight size={20} className="text-white"/>}
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex flex-col space-y-2 px-4 pt-6">
                    {menuItems.map((item, index) => (
                        item.isButton ? (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className={`flex items-center rounded-lg p-3 ${isOpen ? 'justify-start space-x-4' : 'justify-center'} hover:bg-[var(--primary-color)]/10 transition-colors duration-200`}
                            >
                                <span className={`${item.color}`}>{item.icon}</span>
                                <span
                                    className={`${isOpen ? 'opacity-100' : 'opacity-0 w-0'} ${item.color} font-medium transition-opacity duration-200`}>
                                    {item.label}
                                </span>
                            </button>
                        ) : (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex items-center rounded-lg p-3 ${isOpen ? 'justify-start space-x-4' : 'justify-center'} hover:bg-[var(--primary-color)]/10 transition-colors duration-200`}
                            >
                                <span className={`${item.color}`}>{item.icon}</span>
                                <span
                                    className={`${isOpen ? 'opacity-100' : 'opacity-0 w-0'} ${item.color} font-medium transition-opacity duration-200`}>
                                    {item.label}
                                </span>
                            </Link>
                        )
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <Routes>
                <Route path="inicio" element={<InicioAdmins />} />
                <Route path="*" element={<Navigate to="inicio" replace />} />
            </Routes>
        </div>
    );
}
