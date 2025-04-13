import data from "./data.json";
import Card from "./../../students/inicio/components/Card.jsx";
import SearchBox from "../../components/SearchBox.jsx";
import Dropdown from "../../components/Dropdown.jsx";
import Toggle from "./components/Toggle.jsx";

export default function InicioAdmins() {
  return (
    <div>
      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
          {/* Modal Title */}
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Hello!</h3>

          {/* Modal Content */}
          <p className="text-gray-600 mb-6">
            Press ESC key or click the button below to close
          </p>

          {/* Modal Action */}
          <div className="modal-action">
            <form method="dialog">
              {/* Close Button */}
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="flex  items-center flex-col">
        <Toggle />

        <SearchBox />

        <div className="flex justify-around mb-3 w-full">
          <p className="text-lg font-bold">{data.cursos.length} resultados</p>

          <div className="flex flex-row gap-4 justify-center items-center">
            <p className="text-lg font-bold">Filtrar por: </p>
            <Dropdown />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-10">
        {data.cursos.map((curso, index) => (
          <Card
            key={index}
            nombre={curso.nombre}
            aula={curso.aula}
            estado={curso.estado}
            horas_semanales={curso.horas_semanales}
            creditos={curso.creditos}
            horario={curso.horario}
            profesor={curso.profesor}
            cupo={curso.cupo}
          />
        ))}
      </div>
    </div>
  );
}
