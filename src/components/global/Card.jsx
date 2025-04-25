import {GraduationCap} from 'lucide-react';
import React, {useEffect, useState} from 'react';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {MdGroupAdd} from "react-icons/md";
import Swal from "sweetalert2";
import Constants from "../../utils/constants/Constants.jsx";
import axios from "axios";

function Card({nombre, aula, horas_semanales, creditos, horario, profesor, cupo, estado, id_materia}) {

    const token = localStorage.getItem('authToken');

    const [isModalOpen, setIsModalOpen] = useState(false);  // State for controlling modal visibility

    // State for controlling modal visibility
    const [isEditable, setIsEditable] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const userType = localStorage.getItem('userType');
    const baseurl = import.meta.env.VITE_BASE_URL;

    // Trigger when `carrera` changes
    useEffect(() => {
        console.log('userType:', userType);
        if (userType === 'admin') {
            setCanEdit(true);
        }
    },);


    const names = Constants.names;


    const handleDelete = async (id_materia) => {
        try {
            const response = await fetch(`${baseurl}/materias_propuestas/delete_materias_propuestas/${id_materia}`, {
                method: 'DELETE', headers: {
                    'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                Swal.fire({
                    text: "La materia fue eliminada correctamente", icon: "success",
                }).then(() => {
                    setIsModalOpen(false);
                    window.location.reload(); // Recarga la página una vez que el usuario cierra el alert
                });
            } else {
                const error = await response.json();
                Swal.fire({
                    text: error.message || "Error al eliminar la materia", icon: "error",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error", text: `${error}`, icon: "error",
            });
        }
    };


    // Define the color mapping
    const estadoColors = {
        "PENDIENTE": "bg-yellow-500 ", "APROBADO": "bg-green-500 ", "Sin respuesta": "bg-red-500 ",
    };

    // Get the appropriate color classes based on the estado value
    const buttonColorClasses = estadoColors[estado] || "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300";

    const openModal = () => setIsModalOpen(true);  // Open modal
    const closeModal = () => setIsModalOpen(false); // Close modal

    const handleInscribir = async (id_materia) => {
        try {
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
                estudiante_id: estudianteEmail, // Usa el email completo como identificador
                materia_propuesta_id: id_materia
            };

            console.log("Enviando datos:", datos);

            // Realizar la solicitud principal
            const response = await axios({
                method: 'post',
                url: 'http://localhost:5000/estudiante/inscribir/',
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
        }
    };

    function handleHorario(horario) {

        return (isEditable && canEdit) ? (<div className="flex flex-row gap-3">
            <label className="text-gray-500 text-lg font-semibold">Horario:</label>
            <select name="selectHorario" id="selectHorario"
                    className="p-2 border rounded">

                <option value="MATUTINO">Matutino</option>
                <option value="VESPERTINO">Vespertino</option>
            </select>
        </div>) : (<p className="text-gray-500 text-lg">
            <span className="font-semibold">Horario:</span> {horario}
        </p>)

    }

    const [cupoState, setCupoState] = useState(cupo); // or whatever default number you want


    function handleCupo(cupo) {
        return (
            (isEditable && canEdit) ? (
                <div className="flex flex-row gap-3 ">
                    <label className="text-gray-500 text-lg font-semibold">Cupo:</label>
                    <input
                        type="number"
                        value={cupoState}
                        onChange={(e) => setCupoState(e.target.value)}
                        className="appearance-auto p-2 border rounded w-24"
                    />

                </div>
            ) : (<p className="text-gray-500 text-lg">
                <span className="font-semibold">Cupo:</span> {cupo}
            </p>)
        );
    }


    function handleProfesor(profesor) {
        return (
            (isEditable && canEdit) ? (
                <div className="flex flex-row gap-3">
                    <label className="text-gray-500 text-lg font-semibold">Profesor:</label>
                    <select name="selectProfesor" id="selectHorario"
                            className="p-2 border rounded">

                        <option value={profesor}> {profesor}</option>

                        {names.map(name => (
                            <option value={name}>{name}</option>
                        ))}
                    </select>
                </div>

            ) : (<p className="text-gray-500 text-lg">
                <span className="font-semibold">Profesor:</span> {profesor}
            </p>)

        );
    }


    function handleButtons(id_materia) {
        return (
            <div className="flex justify-center gap-2">
                {(canEdit ) ? (
                    <>
                        <button
                            className="flex items-center gap-2 text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-4 py-2.5 cursor-pointer"
                            onClick={() => setIsEditable(prev => !prev)}
                        >
                            <FiEdit />
                            Editar
                        </button>

                        <button
                            className="flex items-center gap-2 text-white bg-red-800 hover:bg-red-900 font-medium rounded-lg text-sm px-4 py-2.5 cursor-pointer"
                            onClick={() => handleDelete(id_materia)}
                        >
                            <FiTrash />
                            Borrar
                        </button>

                        {isEditable && (
                            <button
                                type="submit"
                                className="flex items-center gap-2 text-white bg-green-800 hover:bg-green-900 font-medium rounded-lg text-sm px-4 py-2.5 cursor-pointer"
                            >
                                Guardar
                            </button>
                        )}
                    </>
                ) : (
                    <button
                        type="button"
                        className="flex items-center gap-2 text-white bg-[var(--primary-color)] hover:bg-[#163560] font-medium rounded-lg text-sm px-4 py-2.5 cursor-pointer"
                        onClick={() => handleInscribir(id_materia)}
                    >
                        Solicitar unirme
                    </button>
                )}
            </div>
        );
    }


    return (<div className="p-4 max-w-sm">
        <div className="flex rounded-lg h-full gap-2 p-6 flex-col shadow-md" style={{width: '320px'}}>
            <div className="flex items-center mb-3">
                <div
                    className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)] text-white flex-shrink-0">
                    <GraduationCap className="w-5 h-5"/>
                </div>
                <h2 className="text-black text-xl font-semibold">{nombre}</h2>
            </div>
            <div>
                <h3 className="text-gray-500 font-light text-lg border-b border-gray-300">
                    Aula: {aula}
                </h3>
            </div>

            <div className="flex flex-col gap-3 flex-grow">
                {/* Estado  */}
                <div
                    href="#"
                    className={`text-white ${buttonColorClasses} font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 w-35`}
                >
                    {estado}
                </div>

                {/* Learn More Button */}
                <div className="flex justify-center">
                    <button
                        onClick={openModal}
                        className="text-center text-white bg-[var(--neutral-gray)] hover:bg-gray-600  font-medium rounded-lg text-sm px-4 py-2.5  cursor-pointer"
                    >
                        Ver más
                    </button>


                </div>
            </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-20 z-50 shadow-xl">
                <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)] text-white flex-shrink-0">
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


                        {handleHorario(horario)}


                        {handleProfesor(profesor)}


                        {handleCupo(cupo)}


                        <p className="text-gray-500 text-lg">
                            <span className="font-semibold">id_materia:</span> {id_materia}
                        </p>


                        <div className="flex flex-col gap-3 flex-grow">
                            {/* Estado  */}
                            <div
                                href="#"
                                className={`text-white ${buttonColorClasses} font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 w-35`}
                            >
                                {estado}
                            </div>

                            {/* Learn More Button */}

                            {handleButtons(id_materia)}

                        </div>

                    </div>


                </div>
            </div>)}
    </div>);
}

export default Card;
