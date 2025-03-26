import React, { useState } from "react";
import materiasJson from "./materias.json"; // Ensure this path is correct

const materias = materiasJson.materias; // Access the materias array from the JSON

export default function SolicitarGrupo() {
    const [matSelec, setMatSelec] = useState(materias[0]); // Initialize with the first materia
    const [turno, setTurno] = useState("Matutino");
    const [trabajaLocal, setTrabajaLocal] = useState("Sí");
    const [profesor, setProfesor] = useState("");
    const [correoProfesor, setCorreoProfesor] = useState("");

    function muestraDatos() {
        const data = {
            materia: matSelec,
            turno,
            trabajaLocal,
            profesor,
            correoProfesor: trabajaLocal === "No" ? correoProfesor : "N/A"
        };
        console.log(JSON.stringify(data, null, 2));
    }

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-150">
                <h2 className="text-lg font-semibold">Solicitar Grupo</h2>
                <p className="text-gray-700">Nombre usuario</p>

                <label className="block mt-4">Elige una materia</label>
                <select
                    className="w-full p-2 border rounded"
                    value={matSelec.nombre}
                    onChange={(e) =>
                        setMatSelec(materias.find((m) => m.nombre === e.target.value))
                    }
                >
                    {materias.map((materia) => (
                        <option key={materia.clave} value={materia.nombre}>
                            {materia.nombre}
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

                <button
                    onClick={muestraDatos}
                    className="w-full bg-blue-600 text-white p-2 rounded mt-4"
                >
                    Solicitar Grupo
                </button>
            </div>
        </div>
    );
}