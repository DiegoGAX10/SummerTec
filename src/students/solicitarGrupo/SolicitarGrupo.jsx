import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Constants from "../../utils/constants/Constants.jsx";

export default function SolicitarGrupo() {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    const userEmail = localStorage.getItem('userEmail');

    const [matSelec, setMatSelec] = useState('');
    const [carrera, setCarrera] = useState(null);
    const [materiasClave, setMateriasClave] = useState([]);
    const [profesores, setProfesores] = useState([]);

    // Información de la materia
    const [creditos, setCreditos] = useState("");
    const [hrsSemana, setHrsSemana] = useState("");
    const [claveMateria, setClaveMateria] = useState("");

    // Opciones de solicitud
    const [turno, setTurno] = useState("Matutino");
    const [trabajaLocal, setTrabajaLocal] = useState("Sí");
    const [profesor, setProfesor] = useState("");
    const [correoProfesor, setCorreoProfesor] = useState("");

    const navigate = useNavigate();
    const baseurl = import.meta.env.VITE_BASE_URL;

    // Obtener materias por clave de carrera
    async function getMateriasByClave() {
        if (!carrera || !carrera.clave) return; // Prevenir peticiones vacías

        try {
            const response = await axios.get(`${baseurl}/materias/materias_by_clave_carrera/${carrera.clave}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMateriasClave(response.data);
            console.log("Materias obtenidas:", JSON.stringify(response.data, null, 2));

        } catch (error) {
            console.error('Error al obtener materias:', error);
            setMateriasClave([]);

            if (error.response && error.response.status === 404) {
                await Swal.fire({
                    title: "Sin materias registradas",
                    html: `No se encontraron materias para <strong>${carrera.label}</strong>`,
                    icon: "info"
                });
            } else if (error.response && error.response.status === 400) {
                await Swal.fire({
                    title: "Error",
                    html: `No se encontraron materias para <strong>${carrera.label}</strong>`,
                    icon: "info"
                });
            } else {
                await Swal.fire({
                    title: "Error",
                    text: "No se pudieron obtener las materias.",
                    icon: "error"
                });
            }
        }
    }

    // Obtener profesores por clave de carrera
    async function getProfesoresByCarrera() {
        if (!carrera || !carrera.clave) return;

        try {
            const response = await axios.get(`${baseurl}/docente/get_by_clave/${carrera.clave}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProfesores(response.data);
            console.log("Profesores obtenidos:", JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error('Error al obtener profesores:', error);
            setProfesores([]);

            if (error.response && error.response.status === 404) {
                console.log("No hay profesores para esta carrera");
                // No mostramos alerta para no saturar al usuario
            } else {
                await Swal.fire({
                    title: "Error",
                    text: "No se pudieron obtener los profesores.",
                    icon: "error"
                });
            }
        }
    }

    // Manejar envío del formulario
    async function handleSubmit(e) {
        e.preventDefault();

        if (!carrera || !matSelec) {
            Swal.fire({
                title: "Error",
                text: "Debes seleccionar una carrera y una materia",
                icon: "error"
            });
            return;
        }

        const data = {
            "clave_carrera": carrera.clave,
            "materia_id": matSelec.clave_materia,
            "turno": turno.toUpperCase(),
            "user_id": userEmail,
        };

        // Si se sugiere un profesor externo, agregar su correo
        if (trabajaLocal === "No" && correoProfesor) {
            data.docente = correoProfesor;
        } else if (profesor) {
            // Si es un profesor interno, usar su email
            data.docente = profesor;
        }

        console.log("Datos a enviar:", JSON.stringify(data, null, 2));

        try {
            const response = await fetch(`${baseurl}/materias_propuestas/create_materia_propuesta`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                Swal.fire({
                    title: "Oh no, ha sucedido un error!",
                    text: result.error || "Error desconocido",
                    icon: "error",
                });
            } else {
                Swal.fire({
                    text: result.message || "Registro exitoso, tu grupo ha sido solicitado",
                    icon: "success",
                });
                navigate('/estudiante/inicio');
            }
        } catch (error) {
            Swal.fire({
                title: "Oh no, ha sucedido un error!",
                text: error.message || String(error),
                icon: "error",
            });
        }
    }

    // Actualizar materias y profesores cuando cambie la carrera
    useEffect(() => {
        if (carrera) {
            getMateriasByClave();
            getProfesoresByCarrera();
        }
    }, [carrera]);

    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold">Solicitar Grupo</h2>
                <p className="text-gray-700">{userEmail}</p>

                <form onSubmit={handleSubmit}>
                    <label className="block mt-4">Escoge tu carrera</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={carrera?.label || ""}
                        required
                        onChange={(e) => {
                            const selectedCarrera = Constants.carreras.find((c) => c.label === e.target.value);
                            console.log("Selected carrera:", selectedCarrera);
                            setCarrera(selectedCarrera);

                            // Reset all dependent fields
                            setMatSelec('');
                            setCreditos('');
                            setHrsSemana('');
                            setClaveMateria('');
                            setProfesor('');
                            setCorreoProfesor('');
                        }}
                    >
                        <option value="" disabled>-- Selecciona tu carrera --</option>
                        {Constants.carreras.map((carrera, index) => (
                            <option key={index} value={carrera.label}>
                                {carrera.label}
                            </option>
                        ))}
                    </select>

                    <label className="block mt-4">Elige una materia</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={matSelec?.nombre_materia || ""}
                        required
                        onChange={(e) => {
                            const selectedMateria = materiasClave.find((m) => m.nombre_materia === e.target.value);
                            console.log("Selected Materia:", selectedMateria);
                            setMatSelec(selectedMateria);

                            if (selectedMateria) {
                                setCreditos(selectedMateria.creditos);
                                setHrsSemana(selectedMateria.horas_semana);
                                setClaveMateria(selectedMateria.clave_materia);
                            }
                        }}
                    >
                        <option value="" disabled>-- Selecciona una materia --</option>
                        {materiasClave.map((materia) => (
                            <option key={materia.clave_materia} value={materia.nombre_materia}>
                                {materia.nombre_materia}
                            </option>
                        ))}
                    </select>

                    {matSelec && (
                        <div>
                            <p className="mt-2 text-sm text-gray-600">
                                <strong>Grupo:</strong> Sin Asignar
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Créditos:</strong> {creditos}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Aula:</strong> Sin Asignar
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Hrs/Semana:</strong> {hrsSemana}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Clave:</strong> {claveMateria}
                            </p>
                        </div>
                    )}

                    <label className="block mt-4">Elige un turno:</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={turno}
                        onChange={(e) => setTurno(e.target.value)}
                    >
                        <option value="Matutino">Matutino</option>
                        <option value="Vespertino">Vespertino</option>
                    </select>

                    <label className="block mt-4">¿Tu profesor trabaja en la institución?</label>
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="profesor"
                                value="Sí"
                                className="mr-2"
                                checked={trabajaLocal === "Sí"}
                                onChange={() => setTrabajaLocal("Sí")}
                            />
                            Sí
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="profesor"
                                value="No"
                                className="mr-2"
                                checked={trabajaLocal === "No"}
                                onChange={() => setTrabajaLocal("No")}
                            />
                            No
                        </label>
                    </div>

                    {trabajaLocal === "Sí" ? (
                        <div>
                            <label className="block mt-4">Selecciona un profesor</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={profesor}
                                onChange={(e) => setProfesor(e.target.value)}
                            >
                                <option value="">-- Selecciona un profesor --</option>
                                {profesores.map((prof, index) => (
                                    <option key={index} value={prof.email}>
                                        {prof.nombre_completo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div>
                            <label className="block mt-4">Nombre del profesor externo</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={profesor}
                                onChange={(e) => setProfesor(e.target.value)}
                                placeholder="Nombre del profesor"
                            />

                            <label className="block mt-4">Correo del profesor externo</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded"
                                value={correoProfesor}
                                onChange={(e) => setCorreoProfesor(e.target.value)}
                                placeholder="Correo electrónico"
                                required={trabajaLocal === "No"}
                            />
                        </div>
                    )}

                    <button type="submit"
                            className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition mt-4">
                        Solicitar grupo
                    </button>
                </form>
            </div>
        </div>
    );
}