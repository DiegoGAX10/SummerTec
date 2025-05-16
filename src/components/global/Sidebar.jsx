import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdGroups, MdAddBox, MdNotifications, MdSettings, MdLogout } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IoHome } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar, handleLogout, userType }) => {
    const [userData, setUserData] = useState({ name: '', controlNumber: '' });

    useEffect(() => {
        const name = localStorage.getItem('full_name') || 'Usuario';
        setUserData({name});
    }, []);

    const menuItems = [
        {
            label: 'Inicio',
            icon: <IoHome size={24} />,
            path: `/${userType}/inicio`,
            color: 'text-[var(--primary-color)]'
        },
        {
            label: 'Mis grupos',
            icon: <MdGroups size={24} />,
            path: `/${userType}/mis-grupos`,
            color: 'text-[var(--primary-color)]'
        },
        {
            label: 'Solicitar grupo',
            icon: <MdAddBox size={24} />,
            path: `/${userType}/solicitar-grupo`,
            color: 'text-[var(--primary-color)]'
        },
        {
            label: 'Notificaciones',
            icon: <MdNotifications size={24} />,
            path: `/${userType}/notificaciones`,
            color: 'text-[var(--primary-color)]'
        },
        {
            label: 'Ajustes',
            icon: <MdSettings size={24} />,
            path: `/${userType}/ajustes`,
            color: 'text-[var(--primary-color)]'
        },
        {
            label: 'Cerrar sesión',
            icon: <MdLogout size={24} />,
            onClick: handleLogout,
            isButton: true,
            color: 'text-red-500'
        }
    ];

    return (
        <div className={`fixed top-0 left-0 h-full bg-white text-[var(--primary-color)] shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
            {/* User Info */}
            <div className={`py-6 text-center border-b border-gray-200 transition-all duration-300 ${isOpen ? 'px-4' : 'px-2'}`}>
                <div className="flex flex-col items-center">
                    <div className="mb-3">
                        <FaUserCircle size={isOpen ? 48 : 36} className="text-[var(--primary-color)]" />
                    </div>
                    {isOpen ? (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-1 truncate">{userData.name}</h2>
                            {userData.controlNumber && (
                                <p className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{userData.controlNumber}</p>
                            )}
                        </div>
                    ) : (
                        <div className="tooltip relative group">
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                                <span className="text-xs font-bold">{userData.name.charAt(0)}</span>
                            </div>
                            <div className="tooltip-text absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 whitespace-nowrap z-10">
                                {userData.name}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <div className="flex justify-end p-4">
                <button onClick={toggleSidebar} className="cursor-pointer flex items-center justify-center rounded-full bg-[var(--primary-color)] text-white p-2 hover:bg-[#163560] transition-colors duration-200">
                    {isOpen ? <FiChevronLeft size={20} className="text-white" /> : <FiChevronRight size={20} className="text-white" />}
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
                            <span className={`${isOpen ? 'opacity-100' : 'opacity-0 w-0'} ${item.color} font-medium transition-opacity duration-200`}>
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
                            <span className={`${isOpen ? 'opacity-100' : 'opacity-0 w-0'} ${item.color} font-medium transition-opacity duration-200`}>
                                {item.label}
                            </span>
                        </Link>
                    )
                ))}
            </div>
        </div>
    );
};

export default Sidebar;