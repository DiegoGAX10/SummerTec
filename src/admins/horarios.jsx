import React, { useState, useEffect } from "react";
import horariosData from "./horario.json";
import edificiosData from "./edificios.json";

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const horas = Array.from({ length: 12 }, (_, i) => i + 7); // 7 a 18

// Colores para los diferentes grupos
const COLORS = [
  'bg-blue-600', 'bg-green-600', 'bg-red-600',
  'bg-purple-600', 'bg-yellow-600', 'bg-pink-600',
  'bg-indigo-600', 'bg-teal-600', 'bg-orange-600'
];

const getColorForGroup = (groupId) => {
  return COLORS[groupId % COLORS.length];
};

const TablaHorario = () => {
  const [edificioSeleccionado, setEdificioSeleccionado] = useState("");
  const [horariosFiltrados, setHorariosFiltrados] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [groupColors, setGroupColors] = useState({});


  useEffect(() => {
    if (edificioSeleccionado) {
      const edificio = edificiosData.edificios.find(e => e.nombre === edificioSeleccionado);
      const aulasDelEdificio = edificio ? edificio.aulas : [];
      setAulas(aulasDelEdificio);

      const horarios = horariosData.horarios.filter(
          (h) => h.idEdificio === edificioSeleccionado
      );
      setHorariosFiltrados(horarios);

      const colores = {};
      horarios.forEach((horario, index) => {
        colores[horario.idHorario] = getColorForGroup(index);
      });
      setGroupColors(colores);
    }
  }, [edificioSeleccionado]);

  const abrirModal = (horario) => {
    setModalData(horario);
  };

  const cerrarModal = () => {
    setModalData(null);
  };

  const renderCelda = (aulaId, hora, renderedCeldas) => {
    if (renderedCeldas.has(`${aulaId}-${hora}`)) {
      return null;
    }

    const horario = horariosFiltrados.find(
        (h) => h.idAula == aulaId && h.hora_inicio === hora
    );

    if (horario) {
      const duracion = horario.hora_fin - horario.hora_inicio;
      const colorClass = groupColors[horario.idHorario] || 'bg-blue-600';

      for (let h = hora; h < hora + duracion; h++) {
        renderedCeldas.add(`${aulaId}-${h}`);
      }

      return (
          <td
              key={`${aulaId}-${hora}`}
              className={`border px-2 py-1 text-center align-top ${colorClass} text-white`}
              rowSpan={duracion}
          >
            <button
                className="w-full text-white text-sm p-1 rounded hover:opacity-90"
                onClick={() => abrirModal(horario)}
            >
              {horario.nombre}
            </button>
          </td>
      );
    }

    return <td key={`${aulaId}-${hora}`} className="border px-2 py-1 bg-gray-50" />;
  };

  return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <select
              className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={edificioSeleccionado}
              onChange={(e) => setEdificioSeleccionado(e.target.value)}
          >
            <option value="">Selecciona edificio</option>
            {edificiosData.edificios.map((edificio, index) => (
                <option key={index} value={edificio.nombre}>
                  {edificio.nombre}
                </option>
            ))}
          </select>

          <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              onClick={() => window.location.href = "./asignargrupo"}
          >
            + Asignar aula
          </button>
        </div>


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="sticky left-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                    Hora
                  </th>
                  {aulas.map((aula, idx) => (
                      <th key={idx} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 min-w-[120px]">
                        Aula {aula.salon}
                      </th>
                  ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {horas.map((hora) => {
                  const renderedCeldas = new Set();
                  return (
                      <tr key={hora} className="hover:bg-gray-50">
                        <td className="sticky left-0 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-white">
                          {hora}:00 - {hora + 1}:00
                        </td>
                        {aulas.map((aula) =>
                            renderCelda(aula.salon, hora, renderedCeldas)
                        )}
                      </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {modalData && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div
                  className={`bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 ${groupColors[modalData.idHorario]?.replace('bg-', 'bg-opacity-20 ') || ''
                  }`}
              >
                <h2 className="text-xl font-bold mb-4">Detalles del Grupo</h2>
                <div className="space-y-2">
                  <p><strong className="w-32 inline-block">ID Horario:</strong> {modalData.idHorario}</p>
                  <p><strong className="w-32 inline-block">Materia:</strong> {modalData.nombre}</p>
                  <p><strong className="w-32 inline-block">Aula:</strong> {modalData.idAula}</p>
                  <p><strong className="w-32 inline-block">Edificio:</strong> {modalData.idEdificio}</p>
                  <p><strong className="w-32 inline-block">Día:</strong> {dias[modalData.dia_semana - 1]}</p>
                  <p><strong className="w-32 inline-block">Horario:</strong> {modalData.hora_inicio}:00 - {modalData.hora_fin}:00</p>
                </div>
                <div className="mt-6 text-right">
                  <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      onClick={cerrarModal}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default TablaHorario;