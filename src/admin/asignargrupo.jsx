import React, { useState } from "react";
import grupos from "./grupos.json";
import edificios from "./edificios.json";

const gruposJSON = grupos.grupos || grupos?.default?.grupos || [];
const edificiosJSON = edificios.edificios || [];

export default function AsignarGrupoAula() {
  const [grupoSelec, setGrupoSelec] = useState(gruposJSON[0] || {});
  const [edificioSelec, setEdificioSelec] = useState(
    edificiosJSON.length > 0 ? Object.keys(edificiosJSON[0])[0] : ""
  );
  const [salonSelec, setSalonSelec] = useState(null);


  const salones =
    edificiosJSON.find((e) => Object.keys(e)[0] === edificioSelec)?.[edificioSelec] || [];

  function muestraDatos() {
    const horario = calcularHorario(grupoSelec.materia.creditos, turno);
    const data = {
      grupo: grupoSelec.materia.nombre,
      clave: grupoSelec.materia.clave,
      creditos: grupoSelec.materia.creditos,
      turno,
      horario,
      edificio: edificioSelec,
      salon: salonSelec,
    };
    console.log("Grupo asignado:", JSON.stringify(data, null, 2));
  }

  const [turno, setTurno] = useState("Matutino");
  function calcularHorario(creditos, turno) {
    const horasTotales = creditos * 15;
    const diasTotales = 20;
    const horasDiarias = Math.floor(horasTotales / diasTotales);
    const inicio = turno === "Matutino" ? 7 : 12;
    const fin = inicio + horasDiarias;
    return `${inicio}:00 - ${fin}:00`;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold">Asignar aula</h2>

        <label className="block mt-4">Elige un grupo</label>
        <select
          className="w-full p-2 border rounded"
          value={grupoSelec?.materia?.nombre || ""}
          onChange={(e) =>
            setGrupoSelec(gruposJSON.find((g) => g.materia.nombre === e.target.value))
          }
        >
          {gruposJSON.map((g, index) => (
            <option key={index} value={g.materia.nombre}>
              {g.materia.nombre}
            </option>
          ))}
        </select>

        {grupoSelec && (
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Clave:</strong> {grupoSelec?.materia?.clave}</p>
            <p><strong>Créditos:</strong> {grupoSelec?.materia?.creditos}</p>
            <p><strong>Horas por semana:</strong> {grupoSelec?.materia?.horas}</p>
            <p><strong>Profesor:</strong> {grupoSelec?.profesor}</p>
            <p><strong>Correo:</strong> {grupoSelec?.correoProfesor}</p>
          </div>
        )}

        <label className="block mt-4">Elige un edificio</label>
        <select
          className="w-full p-2 border rounded"
          value={edificioSelec}
          onChange={(e) => setEdificioSelec(e.target.value)}
        >
          {edificiosJSON.map((e, index) => {
            const nombre = Object.keys(e)[0];
            return (
              <option key={index} value={nombre}>
                {nombre}
              </option>
            );
          })}
        </select>

        <label className="block mt-4">Elige un aula</label>
        <select
          className="w-full p-2 border rounded"
          value={salonSelec || ""}
          onChange={(e) => setSalonSelec(e.target.value)}
        >
          <option value="" disabled>
            Selecciona un aula
          </option>
          {salones.map((s, index) => (
            <option key={index} value={s.salon}>
              Salón {s.salon}
            </option>
          ))}
        </select>
        <label className="block mt-4">Selecciona el turno</label>
        <select className="w-full p-2 border rounded"
          value={turno}
          onChange={(e) => setTurno(e.target.value)}
        >
          <option value="Matutino">Matutino</option>
          <option value="Vespertino">Vespertino</option>
        </select>
        <button
          onClick={muestraDatos}
          className="w-full bg-blue-600 text-white p-2 rounded mt-4"
        >
          Asignar Aula
        </button>
      </div>
    </div>
  );
}
