import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MateriasGrid from './../../components/global/MateriasGrid.jsx';
import axios from "axios";
import { FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";

export default function MisGrupos() {
    const token = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    const baseurl = import.meta.env.VITE_BASE_URL;
    const [materiasFiltradas, setMateriasFiltradas] = useState([]);
    const [materiasCreadas, setMateriasCreadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingCreadas, setLoadingCreadas] = useState(true);
    const [error, setError] = useState(null);
    const [errorCreadas, setErrorCreadas] = useState(null);
    const [activeTab, setActiveTab] = useState('inscritas');

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


    const getMisGruposCreados = async () => {
        setLoadingCreadas(true);
        try {
            const response = await axios.get(
                `${baseurl}/estudiante/mis-grupos-creados?estudiante_id=${encodeURIComponent(userEmail)}`,
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

            // Format the data for display
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
                creado_por: materia.nombre_usuario,
                aula: materia.aula,
                edificio: materia.edificio,
                status: materia.status,
                inscritos: materia.inscritos || 0 // Número de estudiantes inscritos
            }));

            setMateriasCreadas(formattedMaterias);
            setErrorCreadas(null);
            console.log("Materias creadas:", formattedMaterias);
        } catch (error) {
            console.error("Error al cargar materias creadas:", error);
            if (error.response?.status === 404 || error.response?.data?.error === "No has creado grupos") {
                setMateriasCreadas([]);
                setErrorCreadas("No has creado grupos");
            } else {
                setErrorCreadas('No se pudieron cargar los grupos creados: ' + (error.response?.data?.error || error.message));
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron obtener los grupos creados.",
                    icon: "error",
                });
            }
        } finally {
            setLoadingCreadas(false);
        }
    };

    useEffect(() => {
        if (userEmail) {
            getMisGrupos();
            getMisGruposCreados();
        } else {
            setError('No se encontró información del usuario');
            setErrorCreadas('No se encontró información del usuario');
            setLoading(false);
            setLoadingCreadas(false);
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

    const handleBorrarGrupo = async (idMateriaPropuesta) => {
        try {
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Este grupo será eliminado permanentemente. Todos los estudiantes inscritos serán dados de baja automáticamente.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar grupo",
                cancelButtonText: "Cancelar"
            });

            if (result.isConfirmed) {
                const response = await axios({
                    method: 'delete',
                    url: `${baseurl}/estudiante/borrar-grupo/`,
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
                        text: "El grupo ha sido eliminado exitosamente",
                        icon: "success"
                    });

                    getMisGruposCreados(); // Refresh the list
                    getMisGrupos(); // También actualizamos la lista de grupos inscritos por si estaba inscrito en su propio grupo
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.data.message || "No se pudo eliminar el grupo",
                        icon: "error"
                    });
                }
            }
        } catch (error) {
            console.error("Error al borrar grupo:", error);
            let mensajeError = "Ocurrió un error al eliminar el grupo";

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
        if (activeTab === 'inscritas') {
            getMisGrupos();
        } else {
            getMisGruposCreados();
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    {activeTab === 'inscritas' ? (
                        <FaBookOpen className="text-blue-600 text-2xl mr-3" />
                    ) : (
                        <FaChalkboardTeacher className="text-green-600 text-2xl mr-3" />
                    )}
                    <h1 className="text-2xl font-bold">
                        {activeTab === 'inscritas' ? 'MIS GRUPOS INSCRITOS' : 'MIS GRUPOS CREADOS'}
                    </h1>
                </div>

                <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
                    disabled={activeTab === 'inscritas' ? loading : loadingCreadas}
                >
                    {(activeTab === 'inscritas' ? loading : loadingCreadas) ? 'Cargando...' : 'Actualizar'}
                </button>
            </div>

            {/* Tabs Selector */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    className={`py-2 px-4 font-medium text-sm ${
                        activeTab === 'inscritas'
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('inscritas')}
                >
                    Grupos Inscritos
                </button>
                <button
                    className={`py-2 px-4 font-medium text-sm ${
                        activeTab === 'creados'
                            ? 'border-b-2 border-green-500 text-green-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('creados')}
                >
                    Grupos Creados
                </button>
            </div>

            {/* Content for Grupos Inscritos */}
            {activeTab === 'inscritas' && (
                <>
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
                </>
            )}

            {/* Content for Grupos Creados */}
            {activeTab === 'creados' && (
                <>
                    {loadingCreadas ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                    ) : errorCreadas && errorCreadas !== 'No has creado grupos' ? (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                            <p>{errorCreadas}</p>
                        </div>
                    ) : materiasCreadas.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {materiasCreadas.map((materia) => (
                                <div key={materia.id_materia} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                    <div className="bg-green-50 px-4 py-3 border-b border-gray-200">
                                        <h3 className="text-lg font-bold text-gray-800 truncate">{materia.nombre_materia}</h3>
                                        <p className="text-sm text-gray-600">Clave: {materia.clave_materia}</p>
                                    </div>

                                    <div className="p-4">
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            <div>
                                                <p className="text-xs text-gray-500">Profesor</p>
                                                <p className="text-sm font-medium">{materia.profesor || 'No asignado'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Estudiantes</p>
                                                <p className="text-sm font-medium">{materia.inscritos || 0} / {materia.cupo || 0}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Edificio</p>
                                                <p className="text-sm font-medium">{materia.edificio || 'No asignado'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Aula</p>
                                                <p className="text-sm font-medium">{materia.aula || 'No asignada'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Turno</p>
                                                <p className="text-sm font-medium">{materia.turno || 'No asignado'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Horas/Semana</p>
                                                <p className="text-sm font-medium">{materia.horas_semana || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Créditos</p>
                                                <p className="text-sm font-medium">{materia.creditos || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Estado</p>
                                                <p className={`text-sm font-medium ${
                                                    materia.status === 'Activo' ? 'text-green-600' :
                                                        materia.status === 'Pendiente' ? 'text-amber-600' : 'text-red-600'
                                                }`}>
                                                    {materia.status || 'Desconocido'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <button
                                                onClick={() => handleBorrarGrupo(materia.id_materia)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                                            >
                                                Eliminar Grupo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md text-center py-16 px-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">No has creado grupos</h2>
                            <p className="text-gray-600 mb-6">Aún no has creado ningún grupo de materias. Dirígete a la página de creación de grupos para crear uno nuevo.</p>
                            <a
                                href="/estudiante/crear-grupo"
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Crear un grupo
                            </a>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}