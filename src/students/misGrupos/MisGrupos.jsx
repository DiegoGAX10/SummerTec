import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MateriasGrid from './../../components/global/MateriasGrid.jsx';
import axios from "axios";
import { FaBookOpen } from "react-icons/fa";

export default function MisGrupos() {
    const token = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    const baseurl = import.meta.env.VITE_BASE_URL;
    const [materias, setMaterias] = useState([]);
    const [materiasFiltradas, setMateriasFiltradas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMisGrupos = async () => {
        setLoading(true);
        try {
            console.log('Obteniendo grupos para:', userEmail);

            // Enviamos el estudiante_id tanto en headers como en parámetros de URL para mayor compatibilidad
            const response = await axios.get(
                `${baseurl}/estudiante/mis-grupos?estudiante_id=${encodeURIComponent(userEmail)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'estudiante_id': userEmail,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Materias inscritas recibidas:', response.data);

            // Asegurarse de que response.data sea un array
            const materiasData = Array.isArray(response.data) ? response.data : [];

            setMaterias(materiasData);
            setMateriasFiltradas(materiasData);
            setError(null);

        } catch (error) {
            console.error('Error al obtener materias inscritas:', error);

            // Mostrar detalles específicos del error para depuración
            if (error.response) {
                console.error('Error de respuesta:', error.response.data);
                console.error('Estado HTTP:', error.response.status);
            }

            // Manejar el caso especial del error "No estas inscrito en esta materia"
            if (error.response?.data?.error === "No estas inscrito en esta materia") {
                setMaterias([]);
                setMateriasFiltradas([]);
                setError(error.response.data.error);
            } else {
                setError('No se pudieron cargar las materias: ' + (error.response?.data?.error || error.message));
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron obtener las materias inscritas.",
                    icon: "error",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // useEffect para cargar datos iniciales
    useEffect(() => {
        if (userEmail) {
            getMisGrupos();
        } else {
            setError('No se encontró información del usuario');
            setLoading(false);
        }
    }, [userEmail]);

    // Función para darse de baja de un grupo
    const handleBaja = async (materiaId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Te darás de baja de este grupo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, darme de baja',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(
                        `${baseurl}/estudiante/baja?estudiante_id=${encodeURIComponent(userEmail)}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            data: {
                                estudiante_id: userEmail,
                                materia_propuesta_id: materiaId
                            }
                        }
                    );

                    if (response.data && response.data.message) {
                        Swal.fire(
                            '¡Baja exitosa!',
                            'Te has dado de baja de este grupo correctamente.',
                            'success'
                        );
                        // Actualizar la lista de materias
                        getMisGrupos();
                    }
                } catch (error) {
                    console.error('Error al darse de baja:', error);
                    Swal.fire(
                        'Error',
                        error.response?.data?.error || 'No se pudo completar la baja',
                        'error'
                    );
                }
            }
        });
    };

    // Función para manejar la actualización de datos
    const handleRefresh = () => {
        getMisGrupos();
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <FaBookOpen className="text-blue-600 text-2xl mr-3" />
                    <h1 className="text-2xl font-bold">MIS GRUPOS</h1>
                </div>

                <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
                    disabled={loading}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-1 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {loading ? 'Cargando...' : 'Actualizar'}
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : error && error !== 'No estas inscrito en esta materia' ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                    <p>{error}</p>
                </div>
            ) : materiasFiltradas.length > 0 ? (
                <MateriasGrid
                    materias={materiasFiltradas}
                    esMiGrupo={true}
                    onBaja={handleBaja}
                />
            ) : (
                <div className="bg-white rounded-lg shadow-md text-center py-16 px-6">
                    <img
                        src="/api/placeholder/150/150"
                        alt="No grupos"
                        className="mx-auto mb-4"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No tienes grupos inscritos</h2>
                    <p className="text-gray-600 mb-6">Aún no te has inscrito a ningún grupo de materias. Dirígete a la página principal para ver las materias disponibles.</p>
                    <a
                        href="/estudiantes/inicio"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Ver materias disponibles
                    </a>
                </div>
            )}
        </div>
    );
}