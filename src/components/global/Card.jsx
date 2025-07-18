import { GraduationCap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { MdGroupAdd } from "react-icons/md";
import Swal from "sweetalert2";
import Constants from "../../utils/constants/Constants.jsx";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner.jsx";

function Card({ nombre, aula, horas_semanales, creditos, horario, profesor, cupo, estado, id_materia, esMiGrupo = false, onBaja }) {

    // State management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInteresadosModalOpen, setIsInteresadosModalOpen] = useState(false);
    const [interesados, setInteresados] = useState([]);
    const [isLoadingInteresados, setIsLoadingInteresados] = useState(false);
    const [addAlumnoModalOpen, setAddAlumnoModalOpen] = useState(false);
    const [newEstudianteEmail, setNewEstudianteEmail] = useState('');
    const [isAddingAlumno, setIsAddingAlumno] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [inscritosCount, setInscritosCount] = useState(0);


    const [loading, setLoading] = useState(false); // Set to false initially


    // Edited form values
    const [formValues, setFormValues] = useState({
        turno: horario,
        cupo: cupo,
        docente: profesor
    });

    // Authentication and constants
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    const baseurl = import.meta.env.VITE_BASE_URL;

    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        const fetchDocentes = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const claveCarrera = localStorage.getItem('claveCarrera'); // Asumiendo que la tienes almacenada
                const response = await axios.get(`${baseurl}/get_by_clave/${claveCarrera}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

                if (response.status === 200) {
                    setDocentes(response.data);
                }
            } catch (error) {
                console.error("Error al cargar docentes:", error);
            }
        };

        fetchDocentes();

        // Cargar el conteo de estudiantes inscritos al iniciar el componente
        fetchInscritosCount();
    }, []);

    // Función para obtener el número de estudiantes inscritos
    const fetchInscritosCount = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `${baseurl}/estudiante/inscritos/${id_materia}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.status === 200) {
                setInscritosCount(response.data.length);
            }
        } catch (error) {
            console.error('Error al obtener conteo de inscritos:', error);
            setInscritosCount(0);
        }
    };

    // Check if user can edit or coordinator
    useEffect(() => {
        if (userType === 'admin' || userType === 'coordinador') {
            setCanEdit(true);
        }
    }, [userType]);

    // Modal controls
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Form change handlers
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    // Save changes function
    const handleSaveChanges = async () => {
        try {
            const response = await axios({
                method: 'put',
                url: `${baseurl}/materias_propuestas/update_materias_propuestas/${id_materia}`,
                data: {
                    turno: formValues.turno,
                    cupo: formValues.cupo,
                    docente: formValues.docente // ahora es el email
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });


            if (response.status === 200) {
                Swal.fire({
                    title: "Éxito",
                    text: "Materia actualizada correctamente",
                    icon: "success"
                }).then(() => {
                    setIsEditable(false);
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.data.message || "No se pudo actualizar la materia",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error('Error al actualizar materia:', error);

            let mensajeError = "Ocurrió un error al actualizar la materia";

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

    // Delete materia
    const handleDelete = async () => {
        try {
            const confirmResult = await Swal.fire({
                title: "¿Estás seguro?",
                text: "La materia será eliminada permanentemente",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            });

            if (confirmResult.isConfirmed) {
                const response = await fetch(`${baseurl}/materias_propuestas/delete_materias_propuestas/${id_materia}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    Swal.fire({
                        text: "La materia fue eliminada correctamente",
                        icon: "success",
                    }).then(() => {
                        setIsModalOpen(false);
                        window.location.reload();
                    });
                } else {
                    const error = await response.json();
                    Swal.fire({
                        text: error.message || "Error al eliminar la materia",
                        icon: "error",
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: `${error}`,
                icon: "error",
            });
        }
    };

    // Get interested students
    const getInteresados = async () => {
        try {
            setIsLoadingInteresados(true);
            const response = await axios({
                method: 'get',
                url: `${baseurl}/estudiante/inscritos/${id_materia}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.status === 200) {
                setInteresados(response.data);
                setInscritosCount(response.data.length); // Actualizar conteo de inscritos
                setIsInteresadosModalOpen(true);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron obtener los interesados",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error('Error al obtener interesados:', error);

            let mensajeError = "Ocurrió un error al obtener los interesados";

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
                icon: "error",
            });
        } finally {
            setIsLoadingInteresados(false);
        }
    };

    // Remove student from course
    const handleEliminarEstudiante = async (estudianteId) => {
        try {
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "El estudiante será eliminado de esta materia",
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
                        estudiante_id: estudianteId,
                        materia_propuesta_id: id_materia
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
                        text: "El estudiante ha sido eliminado de la materia",
                        icon: "success"
                    });

                    // Update interested students list
                    getInteresados();
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.data.message || "No se pudo eliminar al estudiante",
                        icon: "error"
                    });
                }
            }
        } catch (error) {
            console.error('Error al eliminar estudiante:', error);

            let mensajeError = "Ocurrió un error al eliminar al estudiante";

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

    // Add student to course
    const handleAddAlumno = async (e) => {
        e.preventDefault();

        if (!newEstudianteEmail) {
            Swal.fire({
                title: "Error",
                text: "Por favor, ingresa el email del estudiante",
                icon: "error"
            });
            return;
        }

        try {
            setIsAddingAlumno(true);

            const response = await axios({
                method: 'post',
                url: `${baseurl}/estudiante/inscribir/`,
                data: {
                    estudiante_id: newEstudianteEmail,
                    materia_propuesta_id: id_materia
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: "Éxito",
                    text: "Estudiante añadido correctamente",
                    icon: "success"
                });

                // Clear form and close modal
                setNewEstudianteEmail('');
                setAddAlumnoModalOpen(false);

                // Update interested students list
                getInteresados();
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.data.message || "No se pudo añadir al estudiante",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error('Error al añadir estudiante:', error);

            let mensajeError = "Ocurrió un error al añadir al estudiante";

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
        } finally {
            setIsAddingAlumno(false);
        }
    };

    // Se inscribe el estudiante
    const handleInscribir = async (id_materia) => {
        try {
            setLoading(true);
            // Obtener el token y el email del estudiante
            const token = localStorage.getItem('authToken');
            const estudianteEmail = localStorage.getItem('userEmail');

            if (!token) {
                Swal.fire({
                    title: "Error",
                    text: "No hay token de autenticación. Por favor inicie sesión nuevamente.",
                    icon: "error",
                });
                return;
            }

            if (!estudianteEmail) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo identificar al estudiante.",
                    icon: "error",
                });
                return;
            }

            // Preparar los datos para la solicitud
            const datos = {
                estudiante_id: estudianteEmail,
                materia_propuesta_id: id_materia
            };

            console.log("Enviando datos:", datos);

            // Realizar la solicitud principal
            const response = await axios({
                method: 'post',
                url: `${baseurl}/estudiante/inscribir/`,
                data: datos,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: "Éxito",
                    text: "Inscripción realizada correctamente",
                    icon: "success",
                }).then(() => {
                    window.location.reload();
                });
            } else {
                // Handle other success status codes
                Swal.fire({
                    title: "Información",
                    text: response.data.message || "Operación completada con estado inesperado",
                    icon: "info",
                });
            }
        } catch (error) {
            console.error('Error al realizar la inscripción:', error);

            let mensajeError = "Ocurrió un error al procesar la solicitud";

            if (error.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.error('Respuesta del servidor:', error.response.data);

                // Intenta obtener el mensaje de error de diferentes formas posibles
                if (error.response.data) {
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

                // Si no se ha encontrado un mensaje específico, usa el código de estado
                if (mensajeError === "Ocurrió un error al procesar la solicitud") {
                    mensajeError = `Error ${error.response.status}: ${error.response.statusText}`;
                }
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                mensajeError = "No se pudo conectar con el servidor. Verifique su conexión.";
            } else {
                // Algo sucedió en la configuración de la solicitud que desencadenó un error
                mensajeError = error.message;
            }

            Swal.fire({
                title: "Error",
                text: mensajeError,
                icon: "error",
            });
        }finally {
            setLoading(false); // Hide spinner once the request finishes
        }
    };


    // Render editable or static fields
    const renderHorario = () => {
        return (isEditable && canEdit) ? (
            <div className="flex flex-row gap-3">
                <label className="text-gray-500 text-lg font-semibold">Horario:</label>
                <select
                    name="turno"
                    value={formValues.turno}
                    onChange={handleFormChange}
                    className="p-2 border rounded"
                >
                    <option value="MATUTINO">Matutino</option>
                    <option value="VESPERTINO">Vespertino</option>
                </select>
            </div>
        ) : (
            <p className="text-gray-500 text-lg">
                <span className="font-semibold">Horario:</span> {horario}
            </p>
        );
    };

    // Formatear número con ceros a la izquierda
    const formatearNumero = (num) => {
        return num.toString().padStart(2, '0');
    };

    const renderCupo = () => {
        return (isEditable && canEdit) ? (
            <div className="flex flex-row gap-3">
                <label className="text-gray-500 text-lg font-semibold">Cupo:</label>
                <input
                    type="number"
                    name="cupo"
                    value={formValues.cupo}
                    onChange={handleFormChange}
                    className="appearance-auto p-2 border rounded w-24"
                />
                <span className="text-gray-500 text-lg">
                    (Actualmente: {formatearNumero(inscritosCount)}/{cupo})
                </span>
            </div>
        ) : (
            <p className="text-gray-500 text-lg">
                <span className="font-semibold">Cupo:</span> {formatearNumero(inscritosCount)}/{cupo}
            </p>
        );
    };

    const renderProfesor = () => {
        return (isEditable && canEdit) ? (
            <div className="flex flex-row gap-3">
                <label className="text-gray-500 text-lg font-semibold">Profesor:</label>
                <select
                    name="docente"
                    value={formValues.docente}
                    onChange={handleFormChange}
                    className="p-2 border rounded"
                >
                    <option value="">Seleccione un docente</option>
                    {docentes.map(doc => (
                        <option key={doc.email} value={doc.email}>
                            {doc.nombre_completo}
                        </option>
                    ))}
                </select>
            </div>
        ) : (
            <p className="text-gray-500 text-lg">
                <span className="font-semibold">Profesor:</span> {profesor}
            </p>
        );
    };

    // Define the color mapping for status
    const estadoColors = {
        "PENDIENTE": "bg-yellow-500",
        "APROBADO": "bg-green-500",
        "Sin respuesta": "bg-red-500",
    };
    const buttonColorClasses = estadoColors[estado] || "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300";

    // Render action buttons
    const renderButtons = () => {
        if (canEdit) {
            return (
                <div className="flex justify-center gap-2 flex-wrap">
                    <button
                        className="flex items-center gap-2 text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-4 py-2.5"
                        onClick={() => setIsEditable(prev => !prev)}
                    >
                        <FiEdit />
                        {isEditable ? 'Cancelar' : 'Editar'}
                    </button>

                    <button
                        className="flex items-center gap-2 text-white bg-red-800 hover:bg-red-900 font-medium rounded-lg text-sm px-4 py-2.5"
                        onClick={handleDelete}
                    >
                        <FiTrash />
                        Borrar
                    </button>

                    <button
                        className="flex items-center gap-2 text-white bg-blue-800 hover:bg-blue-900 font-medium rounded-lg text-sm px-4 py-2.5"
                        onClick={getInteresados}
                    >
                        <MdGroupAdd />
                        Ver interesados
                    </button>

                    {isEditable && (
                        <button
                            onClick={handleSaveChanges}
                            className="flex items-center gap-2 text-white bg-green-800 hover:bg-green-900 font-medium rounded-lg text-sm px-4 py-2.5"
                        >
                            Guardar
                        </button>
                    )}
                </div>
            );
        } else if (esMiGrupo) {
            return (
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2.5"
                        onClick={() => onBaja?.(id_materia)}
                    >
                        <FiTrash />
                        Darse de baja
                    </button>
                </div>
            );
        } else {
            return (
                <div className="flex justify-center">
                    {loading? (   <LoadingSpinner />):
                        (<button
                        type="button"
                        className="flex items-center gap-2 text-white bg-[var(--primary-color)] hover:bg-[#163560] font-medium rounded-lg text-sm px-4 py-2.5"
                        onClick={() => handleInscribir(id_materia)}
                    >
                        Solicitar unirme
                    </button>)}
                </div>
            );
        }
    };


    return (
        <div className="p-4 max-w-sm">
            {/* Card */}
            <div className="flex rounded-lg h-full gap-2 p-6 flex-col shadow-md" style={{width: '320px'}}>
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)] text-white flex-shrink-0">
                        <GraduationCap className="w-5 h-5"/>
                    </div>
                    <h2 className="text-black text-xl font-semibold">{nombre}</h2>
                </div>
                <div>
                    <h3 className="text-gray-500 font-light text-lg border-b border-gray-300">
                        Aula: {aula}
                    </h3>
                </div>

                <div className="mt-2">
                    <p className="text-gray-500 text-md">
                        <span className="font-semibold">Cupo:</span> {formatearNumero(inscritosCount)}/{cupo}
                    </p>
                </div>

                <div className="flex flex-col gap-3 flex-grow">
                    {/* Status */}
                    <div
                        className={`text-white ${buttonColorClasses} font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 w-35`}
                    >
                        {estado}
                    </div>

                    {/* View More Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={openModal}
                            className="text-center text-white bg-[var(--neutral-gray)] hover:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2.5 cursor-pointer"
                        >
                            Ver más
                        </button>
                    </div>
                </div>
            </div>

            {/* Information Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-20 z-50 shadow-xl">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)] text-white flex-shrink-0">
                                    <GraduationCap className="w-5 h-5"/>
                                </div>
                                <h2 className="text-[var(--primary-color)] text-xl font-semibold">{nombre}</h2>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 text-3xl hover:text-gray-700 cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-500 text-lg border-b border-gray-300">
                                <span className="font-semibold">Aula:</span> {aula}
                            </p>
                            <p className="text-gray-500 text-lg">
                                <span className="font-semibold">Estado:</span> {estado}
                            </p>
                            <p className="text-gray-500 text-lg">
                                <span className="font-semibold">Horas semanales:</span> {horas_semanales}
                            </p>
                            <p className="text-gray-500 text-lg">
                                <span className="font-semibold">Créditos:</span> {creditos}
                            </p>

                            {renderHorario()}
                            {renderProfesor()}
                            {renderCupo()}

                            <p className="text-gray-500 text-lg">
                                <span className="font-semibold">id_materia:</span> {id_materia}
                            </p>

                            <div className="flex flex-col gap-3 flex-grow">
                                {/* Status */}
                                <div
                                    className={`text-white ${buttonColorClasses} font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 w-35`}
                                >
                                    {estado}
                                </div>

                                {/* Action buttons */}
                                {renderButtons()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Interested Students Modal */}
            {isInteresadosModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-20 z-50 shadow-xl">
                    <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Lista de interesados</h2>
                            <button
                                onClick={() => setIsInteresadosModalOpen(false)}
                                className="text-gray-500 text-3xl hover:text-gray-700 cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>

                        {isLoadingInteresados ? (
                            <div className="flex justify-center items-center h-40">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-color)]"></div>
                            </div>
                        ) : (
                            <>
                                {interesados.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white">
                                            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                            <tr>
                                                <th className="py-3 px-6 text-left">Nombre</th>
                                                <th className="py-3 px-6 text-left">Email</th>
                                                <th className="py-3 px-6 text-left">Carrera</th>
                                                <th className="py-3 px-6 text-left">Fecha de registro</th>
                                                <th className="py-3 px-6 text-left">Acción</th>
                                            </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-sm">
                                            {interesados.map((estudiante, index) => (
                                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                                    <td className="py-3 px-6 text-left">{estudiante.nombre_completo}</td>
                                                    <td className="py-3 px-6 text-left">{estudiante.email}</td>
                                                    <td className="py-3 px-6 text-left">{estudiante.carrera}</td>
                                                    <td className="py-3 px-6 text-left">{estudiante.fecha_inscripcion}</td>
                                                    <td className="py-3 px-6 text-center">
                                                        <button
                                                            className="text-red-500 hover:text-red-700"
                                                            title="Eliminar estudiante"
                                                            onClick={() => handleEliminarEstudiante(estudiante.email)}
                                                        >
                                                            <FiTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500">No hay estudiantes interesados en esta materia.</p>
                                    </div>
                                )}

                                <div className="mt-6 flex justify-between">
                                    <button
                                        className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-6 py-2.5"
                                        onClick={() => setAddAlumnoModalOpen(true)}
                                    >
                                        <MdGroupAdd className="w-5 h-5" />
                                        Añadir alumno
                                    </button>
                                    <button
                                        className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-6 py-2.5"
                                        onClick={() => setIsInteresadosModalOpen(false)}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}


            {/* Modal para añadir un alumno */}
            {addAlumnoModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-20 z-50 shadow-xl">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Añadir alumno</h2>
                            <button
                                onClick={() => setAddAlumnoModalOpen(false)}
                                className="text-gray-500 text-3xl hover:text-gray-700 cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleAddAlumno}>
                            <div className="mb-4">
                                <label htmlFor="estudianteEmail" className="block text-gray-700 text-sm font-bold mb-2">
                                    Email del estudiante:
                                </label>
                                <input
                                    type="email"
                                    id="estudianteEmail"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder=""
                                    value={newEstudianteEmail}
                                    onChange={(e) => setNewEstudianteEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg"
                                    onClick={() => setAddAlumnoModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
                                    disabled={isAddingAlumno}
                                >
                                    {isAddingAlumno ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></div>
                                            Añadiendo...
                                        </div>
                                    ) : (
                                        'Añadir'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>);
}

export default Card;