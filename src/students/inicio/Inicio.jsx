import React from 'react';

import Sidebar from './components/Sidebar.jsx';
import { SideBarItem } from './components/Sidebar.jsx';
import { User, CirclePlus, Bell, Settings, LogOut } from 'lucide-react';

export default function Inicio() {

    return (
        <Sidebar>
            <SideBarItem
                icon={<User size={40} />}
                text="Inicio"
                active={true}
                alert={false}
                link="/inicio"

            />
            <SideBarItem
                icon={<CirclePlus size={40} />}
                text="Solicitar grupo"
                active={false}
                alert={true}
                link="/solicitar-grupo"

            />
            <SideBarItem
                icon={<Bell size={40} />}
                text="Notificaciones"
                active={false}
                alert={false}
                link="/notificaciones"

            />
            <SideBarItem
                icon={<Settings size={40} />}
                text="Ajustes"
                active={false}
                alert={true}
                link="/ajustes"

            />
            <SideBarItem
                icon={<LogOut size={40} color="#FF0000" />}
                text="Cerrar sesión"
                active={false}
                alert={false}

            />
        </Sidebar>
    );
}