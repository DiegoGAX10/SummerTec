import React, {useEffect, useState} from "react";

import Constants from "../../utils/constants/Constants.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import {SlChemistry} from "react-icons/sl";
import Dropdown from "../../components/global/Dropdown.jsx";
import {useNavigate} from 'react-router-dom';


export default function SolicitarGrupo() {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    const userEmail = localStorage.getItem('userEmail');

    const [matSelec, setMatSelec] = useState('');
    const [carrera, setCarrera] = useState();
    const [materiaId, setMateriaId] = useState([]);


    const [turno, setTurno] = useState("Matutino");
    const [trabajaLocal, setTrabajaLocal] = useState("Sí");
    const [profesor, setProfesor] = useState("");
    const [correoProfesor, setCorreoProfesor] = useState("");


    //Informacion de la materia
    const [creditos, setCreditos] = useState("");
    const [hrsSemana, setHrsSemana] = useState("");
    const [claveMateria, setClaveMateria] = useState([]);


    const navigate = useNavigate();


    const [materiasClave, setMateriasClave] = useState([]);


    async function getMateriasByClave() {
        if (!carrera || !carrera.clave) return; // prevent empty requests

        try {
            const response = await axios.get(`http://localhost:5000/materias/materias_by_clave_carrera/${carrera.clave}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMateriasClave(response.data);
            await console.log(JSON.stringify(response, null, 2))

        } catch (error) {
            console.error('Error al obtener materias:', error);
            setMateriasClave([]);



            if (error.response && error.response.status === 404) {
                await Swal.fire({
                    title: "Sin materias registradas",
                    html: `No se encontraron materias para <strong>${carrera.label}</strong>`,
                    icon: "info"
                });
            }else if(error.response && error.response.status === 400){
                await Swal.fire({
                    title: "Error",
                    html: `No se encontraron materias para <strong>${carrera.label}</strong>`,
                    icon: "info"
                });
            }
            else {
                await Swal.fire({
                    title: "Error", text: "No se pudieron obtener las materias.", icon: "error"
                });
            }
        }
    }


    async function handleSubmit() {
        const data = {
            "clave_carrera": carrera.clave,
            "materia_id": matSelec.clave_materia,
            "turno": turno.toUpperCase(),
            "user_id": userEmail,
        };

        console.log(JSON.stringify(data, null, 2));

        try {
            const response = await fetch("http://127.0.0.1:5000/materias_propuestas/create_materia_propuesta", {
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



    // Trigger when `carrera` changes
    useEffect(() => {
        getMateriasByClave();
    }, [carrera]);


    return (<div className="flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold">Solicitar Grupo</h2>
            <p className="text-gray-700">Nombre usuario</p>

            <form action={handleSubmit}>

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


                    }}

                >
                    <option value="" disabled>-- Selecciona tu carrera --</option>
                    {Constants.carreras.map((carrera, index) => (<option key={index} value={carrera.label}>
                        {carrera.label}
                    </option>))}
                </select>

                <label className="block mt-4">Elige una materia</label>
                <select
                    className="w-full p-2 border rounded"
                    value={matSelec?.nombre_materia || ""}
                    required
                    onChange={(e) => {

                        var selectedMateria = materiasClave.find((m) => m.nombre_materia === e.target.value);
                        console.log("Selected Materia:", selectedMateria); // Log the selected materia
                        setMatSelec(selectedMateria);


                        setCreditos(selectedMateria.creditos);
                        setHrsSemana(selectedMateria.horas_semana);
                        setClaveMateria(selectedMateria.clave_materia);


                    }}
                >
                    <option value="" disabled>-- Selecciona una materia --</option>
                    {materiasClave.map((materia) => (<option key={materia.clave} value={materia.nombre_materia}>
                        {materia.nombre_materia}
                    </option>))}
                </select>

                {matSelec&&(<div>
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
                </div>)}

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

                {trabajaLocal === "No" && (<div>
                    <label className="block mt-4">Agrega el correo del profesor</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={correoProfesor}
                        onChange={(e) => setCorreoProfesor(e.target.value)}
                        placeholder="Correo electrónico"
                    />
                </div>)}

                <button type="submit"
                        className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition mt-4">
                    Solicitar grupo
                </button>
            </form>
        </div>
    </div>);
}