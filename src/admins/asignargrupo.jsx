import React, { useState, useEffect } from "react";
import grupos from "./grupos.json";
import edificios from "./edificios.json";

const gruposJSON = grupos.grupos || grupos?.default?.grupos || [];
const edificiosJSON = edificios.edificios || [];

export default function AsignarGrupoAula({ onClose, edificioActual, horarioEdicion, onGuardar }) {
    const [grupoSelec, setGrupoSelec] = useState(
        horarioEdicion
            ? gruposJSON.find(g => g.materia.nombre === horarioEdicion.nombre) || gruposJSON[0]
            : gruposJSON[0]
    );

    const [edificioSelec, setEdificioSelec] = useState(
        horarioEdicion ? horarioEdicion.idEdificio : (edificioActual || edificiosJSON[0]?.nombre || "")
    );

    const [salonSelec, setSalonSelec] = useState(horarioEdicion ? horarioEdicion.idAula : null);
    const [turno, setTurno] = useState(horarioEdicion?.turno || "Matutino");

    const salones = edificiosJSON.find(e => e.nombre === edificioSelec)?.aulas || [];

    useEffect(() => {
        if (edificioActual && !horarioEdicion) {
            setEdificioSelec(edificioActual);
        }
    }, [edificioActual, horarioEdicion]);

    function handleGuardar() {
        const horario = calcularHorario(grupoSelec.materia.creditos, turno);
        const [hora_inicio, hora_fin] = horario.split(' - ').map(t => parseInt(t));

        const edificioObj = edificiosJSON.find(e => e.nombre === edificioSelec);
        const edificio_id = edificioObj ? edificioObj.id : 0;

        const diasSemana = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];
        const horarios = diasSemana.map(dia => ({
            aula_id: parseInt(salonSelec),
            edificio_id: edificio_id,
            dia: dia,
            inicio: `${hora_inicio.toString().padStart(2, '0')}:00`,
            fin: `${hora_fin.toString().padStart(2, '0')}:00`,
            materia_propuesta_id: grupoSelec.materia.clave,
            id_horario: horarioEdicion?.idHorario || Date.now()
        }));


        diasSemana.forEach((dia, index) => {
            const horarioDia = {
                horarios: [horarios[index]]
            };
            console.log(`Horario para ${dia}:`, JSON.stringify(horarioDia, null, 2));
        });


        const todosHorarios = {
            horarios: horarios
        };
        console.log("Todos los horarios:", JSON.stringify(todosHorarios, null, 2));


        const data = {
            idHorario: horarioEdicion?.idHorario || Date.now(),
            id_materiaPropuesta: grupoSelec.materia.clave,
            nombre: grupoSelec.materia.nombre,
            idAula: salonSelec,
            hora_inicio,
            hora_fin: hora_fin,
            idEdificio: edificioSelec,
            dia_semana: horarioEdicion?.dia_semana || 1,
            turno,
            horarios: horarios
        };

        onGuardar(data);
        onClose();
    }

    function calcularHorario(creditos, turno) {
        const horasTotales = creditos * 15;
        const diasTotales = 20;
        const horasDiarias = Math.floor(horasTotales / diasTotales);
        const inicio = turno === "Matutino" ? 7 : 12;
        const fin = inicio + horasDiarias;
        return `${inicio} - ${fin}`;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                        {horarioEdicion ? "Editar asignación" : "Asignar aula"}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <label className="block mt-4">Elige un grupo</label>
                <select
                    className="w-full p-2 border rounded"
                    value={grupoSelec?.materia?.nombre || ""}
                    onChange={(e) => setGrupoSelec(gruposJSON.find(g => g.materia.nombre === e.target.value))}
                >
                    {gruposJSON.map((g, index) => (
                        <option key={index} value={g.materia.nombre}>
                            {g.materia.nombre}
                        </option>
                    ))}
                </select>

                {grupoSelec && (
                    <div className="mt-4 text-sm text-gray-600">
                        <p><strong>Clave:</strong> {grupoSelec.materia.clave}</p>
                        <p><strong>Créditos:</strong> {grupoSelec.materia.creditos}</p>
                        <p><strong>Horas por semana:</strong> {grupoSelec.materia.horas}</p>
                    </div>
                )}

                <label className="block mt-4">Elige un edificio</label>
                <select
                    className="w-full p-2 border rounded"
                    value={edificioSelec}
                    onChange={(e) => setEdificioSelec(e.target.value)}
                >
                    {edificiosJSON.map((e, index) => (
                        <option key={index} value={e.nombre}>
                            {e.nombre}
                        </option>
                    ))}
                </select>

                <label className="block mt-4">Elige un aula</label>
                <select
                    className="w-full p-2 border rounded"
                    value={salonSelec || ""}
                    onChange={(e) => setSalonSelec(e.target.value)}
                >
                    <option value="" disabled>Selecciona un aula</option>
                    {salones.map((s, index) => (
                        <option key={index} value={s.salon}>
                            Salón {s.salon}
                        </option>
                    ))}
                </select>

                <label className="block mt-4">Selecciona el turno</label>
                <select
                    className="w-full p-2 border rounded"
                    value={turno}
                    onChange={(e) => setTurno(e.target.value)}
                >
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                </select>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleGuardar}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        {horarioEdicion ? "Guardar cambios" : "Asignar Aula"}
                    </button>
                </div>
            </div>
        </div>
    );
}