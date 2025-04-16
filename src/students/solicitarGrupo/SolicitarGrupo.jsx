import React, {useEffect, useState} from "react";
import materiasJson from "./materias.json"; // Ensure this path is correct

const materias = materiasJson.materias; // Access the materias array from the JSON

import Constants from "../../utils/constants/Constants.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import { SlChemistry } from "react-icons/sl";
import Dropdown from "../../components/global/Dropdown.jsx";


export default function SolicitarGrupo() {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
//const [claveCarrera, setClaveCarrera] = useState(false);
    const [materiasClave, setMateriasClave] = useState([]);


    async function getMateriasByClave() {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/materias/materias_by_clave_carrera/ISIC-2010-224`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            //console.log(JSON.stringify(response.data, null, 2));

            setMateriasClave(response.data);
            //console.log(JSON.stringify(materiasClave, null, 2));

        } catch (error) {
            console.error('Error al obtener materias:', error);
            await Swal.fire({
                title: "Error",
                text: "No se pudieron obtener las materias.",
                icon: "error",
            });
        }
    }


    useEffect(() => {
        getMateriasByClave(); // Call the function to fetch materias
    }, []); // Empty dependency array means this runs once when the component mounts

    useEffect(() => {
        if (materiasClave.length > 0) {
            console.log("✅ materiasClave actualizadas:", JSON.stringify(materiasClave, null, 2));
        } else {
            console.log("⚠️ materiasClave está vacía");
        }
    }, [materiasClave]);




    const [matSelec, setMatSelec] = useState(materias[0]); // Initialize with the first materia
    const [carrera, setCarrera] = useState();
    const [materiaId, setMateriaId] = useState([]);


    const [turno, setTurno] = useState("Matutino");
    const [trabajaLocal, setTrabajaLocal] = useState("Sí");
    const [profesor, setProfesor] = useState("");
    const [correoProfesor, setCorreoProfesor] = useState("");

    function handleSubmit() {
        /*
                const data = {
                    "materia_id": formData.get("tipo-plato"),
                    "nombre-plato": formData.get("nombre-plato"),
                    "ingredientes": listIngredients,
                };

                {
                    "materia_id": "CDD-2104",
                    "clave_carrera": "ISIC-2010-224",
                    "turno": "VESPERTINO",
                    "status": "PENDIENTE",
                    "id_admin": "b63a9ff7-ae9e-4a4e-8a80-8168b4de02d4"
                }
        */
        const data = {
            //carrera: carrera.label,
            "clave_carrera": carrera.clave,
            "materia_id": matSelec.clave_materia,
            "turno": turno.toUpperCase(),
            [`id_${userType}`]: "",

            trabajaLocal,
            profesor,
            correoProfesor: trabajaLocal === "No" ? correoProfesor : "N/A"
        };
        console.log(JSON.stringify(data, null, 2));
    }


    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold">Solicitar Grupo</h2>
                <p className="text-gray-700">Nombre usuario</p>

                <form action={handleSubmit}>

                    <label className="block mt-4">Escoge tu carrera</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={carrera?.label || ""}

                        required
                        onChange={(e) =>
                            setCarrera(Constants.carreras.find((c) => c.label === e.target.value))
                        }
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
                        onChange={(e) =>
                            setMatSelec(materiasClave.find((m) => m.nombre_materia === e.target.value))
                        }
                    >
                        <option value="" disabled>-- Selecciona una materia --</option>
                        {materiasClave.map((materia) => (
                            <option key={materia.clave} value={materia.nombre_materia}>
                                {materia.nombre_materia}
                            </option>
                        ))}
                    </select>

                    <p className="mt-2 text-sm text-gray-600">Grupo: Sin Asignar</p>
                    <p className="text-sm text-gray-600">Créditos: {matSelec.creditos}</p>
                    <p className="text-sm text-gray-600">Aula: Sin Asignar</p>
                    <p className="text-sm text-gray-600">Hrs/Semana: {matSelec.horas}</p>
                    <p className="text-sm text-gray-600">Clave: {matSelec.clave}</p>

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

                    <div>
                        <label className="block mt-4">Sugerir a un profesor</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={profesor}
                            onChange={(e) => setProfesor(e.target.value)}
                            placeholder="Nombre del profesor"
                        />
                    </div>

                    {trabajaLocal === "No" && (
                        <div>
                            <label className="block mt-4">Agrega el correo del profesor</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded"
                                value={correoProfesor}
                                onChange={(e) => setCorreoProfesor(e.target.value)}
                                placeholder="Correo electrónico"
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