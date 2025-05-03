import axios from "axios";
import Swal from "sweetalert2";
import React, {useEffect, useState} from "react";
import NotificationTile from "./components/NotificationTile.jsx";

export default function NotificacionesAdmins() {
    const baseurl = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('authToken');

    const [notificaciones, setNotificaciones] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCarrera, setSelectedCarrera] = useState("Todas");
    const [selectedTipo, setSelectedTipo] = useState("Todos");
    const [selectedFecha, setSelectedFecha] = useState("Hoy");
    const [sortOrder, setSortOrder] = useState("desc"); // New state for sort order

    const getNotificaciones = async () => {
        try {
            const response = await axios.get(`${baseurl}/notificaciones/get-all-notifications`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Notificaciones recibidas:', response.data);
            setNotificaciones(response.data.notificaciones || []);
        } catch (error) {
            console.error('Error al obtener notificaciones:', error);
            Swal.fire({
                title: "Error",
                text: "No se pudieron obtener las notificaciones.",
                icon: "error",
            });
        }
    };

    useEffect(() => {
        getNotificaciones();
    }, []);

    // Filter logic
    const filteredNotifications = notificaciones.filter(n => {
        const matchesSearch = n.creador_grupo?.toLowerCase().includes(searchText.toLowerCase());
        const matchesTipo = selectedTipo === "Todos" || n.tipo === selectedTipo.toUpperCase().replace(" ", "_");
        const matchesCarrera = selectedCarrera === "Todas" || n.carrera === selectedCarrera;

        const today = new Date().toISOString().slice(0, 10);
        const matchesFecha =
            selectedFecha === "Hoy"
                ? n.hora.slice(0, 10) === today
                : true;

        return matchesSearch && matchesTipo && matchesCarrera && matchesFecha;
    });

    // Sort notifications based on time
    const sortedNotifications = [...filteredNotifications].sort((a, b) => {
        const timeA = new Date(a.hora).getTime();
        const timeB = new Date(b.hora).getTime();
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
    });

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('es-MX', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="p-6 space-y-4">
            {/* Search & Filters */}
            <div className="flex flex-col gap-4 md:flex-row  ">
                <input
                    type="text"
                    placeholder="Busca notificación"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex flex-col">
                    <label className="text-xs text-gray-400 mb-1">Carrera</label>
                    <select
                        value={selectedCarrera}
                        onChange={(e) => setSelectedCarrera(e.target.value)}
                        className="px-4 py-2 rounded bg-gray-700 text-white"
                    >
                        <option>Todas</option>
                        <option>ISC</option>
                        <option>II</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-xs text-gray-400 mb-1">Tipo</label>
                    <select
                        value={selectedTipo}
                        onChange={(e) => setSelectedTipo(e.target.value)}
                        className="px-4 py-2 rounded bg-gray-700 text-white"
                    >
                        <option>Todos</option>
                        <option>Nuevo grupo</option>
                        <option>Grupo cancelado</option>
                    </select>

                </div>


    <div className="flex flex-col">
        <label className="text-xs text-gray-400 mb-1">Fecha</label>
        <select
            value={selectedFecha}
            onChange={(e) => setSelectedFecha(e.target.value)}
            className="px-4 py-2 rounded bg-gray-700 text-white"
        >
            <option>Hoy</option>
            <option>Últimos 3 días</option>
        </select>
    </div>

                {/* New sort order dropdown */}
            <div className="flex flex-col">
                <label className="text-xs text-gray-400 mb-1">Fecha</label>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 rounded bg-gray-700 text-white"
                >
                    <option value="desc">Más recientes primero</option>
                    <option value="asc">Más antiguos primero</option>
                </select>
            </div>
            </div>

            <p className="text-sm text-gray-600">
                {sortedNotifications.length} resultados
            </p>

            {/* Notification List */}
            <div className="space-y-2">
                {sortedNotifications.map((notification, index) => (
                    <NotificationTile
                        key={index}
                        user={notification.creador_grupo}
                        userType={notification.tipo_usuario}
                        type={notification.tipo}
                        time={formatDateTime(notification.hora)}
                        group={notification.materia_propuesta_id}
                    />
                ))}
            </div>
        </div>
    );
}