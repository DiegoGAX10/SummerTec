import Card from './components/Card.jsx';
import data from "./data.json";
function Inicio() {

    
    return (
        <div>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={() => document.getElementById('my_modal_1').showModal()}
            >
                Open Modal
            </button>

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
            <div className="flex flex-wrap justify-center mt-10">

                {data.cursos.map((curso, index) => (
                    <Card key={index}
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

export default Inicio;
/*
https://tailwindflex.com/@noob_dev/products-card-grid
*/