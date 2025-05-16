import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MateriasGrid from './../../components/global/MateriasGrid.jsx';
import axios from "axios";
import { FaBookOpen } from "react-icons/fa";

export default function MisGrupos() {
    const token = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    const baseurl = import.meta.env.VITE_BASE_URL;
    const [materiasFiltradas, setMateriasFiltradas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMisGrupos = async () => {
        setLoading(true);
        try {
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

            // Get the data, ensuring it's an array
            const materiasData = Array.isArray(response.data) ? response.data : [];

            // Format the data to match the structure expected by MateriasGrid
            // This transformation is critical to match the format used in InicioEstudiantes.jsx
            const formattedMaterias = materiasData.map(materia => ({
                horas_semana: materia.horas_semana,
                creditos: typeof materia.creditos === 'string' ? parseInt(materia.creditos) : materia.creditos,
                cupo: materia.cupo || 0,
                turno: materia.turno,
                id_materia: materia.id_materia_propuesta,
                profesor: materia.profesor,
                nombre_materia: materia.nombre_materia,
                clave_materia: materia.clave_materia,
                clave_carrera: materia.clave_carrera,
                creado_por: materia.nombre_usuario, // Using nombre_usuario as creado_por
                aula: null, // Add if available
                edificio: materia.edificio,
                status: materia.status
            }));

            setMateriasFiltradas(formattedMaterias);
            setError(null);
            console.log("Materias formateadas:", formattedMaterias);
        } catch (error) {
            console.error("Error al cargar materias:", error);
            if (error.response?.data?.error === "No estas inscrito en esta materia") {
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

    useEffect(() => {
        if (userEmail) {
            getMisGrupos();
        } else {
            setError('No se encontró información del usuario');
            setLoading(false);
        }
    }, [userEmail]);

    const handleBaja = async (idMateriaPropuesta) => {
        try {
            // Aseguramos que tenemos el ID del estudiante
            if (!userEmail) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo identificar al estudiante. Por favor, inicie sesión nuevamente.",
                    icon: "error"
                });
                return;
            }

            console.log("Intentando dar de baja:", {
                estudiante_id: userEmail,
                materia_propuesta_id: idMateriaPropuesta
            });

            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Serás eliminado de esta materia",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            });

            if (result.isConfirmed) {
                const response = await axios({
                    method: 'delete',
                    url: `${baseurl}/estudiante/baja/`,
                    data: {
                        estudiante_id: userEmail,
                        materia_propuesta_id: idMateriaPropuesta
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                });

                if (response.status === 200) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "Has sido eliminado de la materia exitosamente",
                        icon: "success"
                    });

                    getMisGrupos(); // Refresh the list
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.data.message || "No se pudo eliminar de la materia",
                        icon: "error"
                    });
                }
            }
        } catch (error) {
            console.error("Error en la baja:", error);
            let mensajeError = "Ocurrió un error al eliminar la inscripción";

            if (error.response?.data) {
                if (typeof error.response.data === 'string') {
                    mensajeError = error.response.data;
                } else if (error.response.data.message) {
                    mensajeError = error.response.data.message;
                } else if (error.response.data.error) {
                    mensajeError = error.response.data.error;
                } else if (error.response.data.detail) {
                    mensajeError = error.response.data.detail;
                }
            }

            Swal.fire({
                title: "Error",
                text: mensajeError,
                icon: "error"
            });
        }
    };

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
                    estudianteId={userEmail}
                />
            ) : (
                <div className="bg-white rounded-lg shadow-md text-center py-16 px-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No tienes grupos inscritos</h2>
                    <p className="text-gray-600 mb-6">Aún no te has inscrito a ningún grupo de materias. Dirígete a la página principal para ver las materias disponibles.</p>
                    <a
                        href="/estudiante/inicio"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Ver materias disponibles
                    </a>
                </div>
            )}
        </div>
    );
}