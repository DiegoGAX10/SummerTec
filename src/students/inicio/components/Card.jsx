import { GraduationCap } from 'lucide-react';
import { useState } from 'react';



function Card({ nombre, aula, horas_semanales, creditos, horario, profesor, cupo, estado }) {
    const [isModalOpen, setIsModalOpen] = useState(false);  // State for controlling modal visibility

    // Define the color mapping
    const estadoColors = {
        "En proceso": "bg-yellow-500 ",
        "Grupo asignado": "bg-green-500 ",
        "Sin respuesta": "bg-red-500 ",
    };

    // Get the appropriate color classes based on the estado value
    const buttonColorClasses = estadoColors[estado] || "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300";

    const openModal = () => setIsModalOpen(true);  // Open modal
    const closeModal = () => setIsModalOpen(false); // Close modal

    return (
        <div className="p-4 max-w-sm">
            <div className="flex rounded-lg h-full gap-2 p-6 flex-col shadow-md">
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)] text-white flex-shrink-0">
                        <GraduationCap className="w-5 h-5" />
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
                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)] text-white flex-shrink-0">
                                    <GraduationCap className="w-5 h-5" />
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
                            <p className="text-gray-500 text-lg">
                                <span className="font-semibold">Horario:</span> {horario}
                            </p>
                            <p className="text-gray-500 text-lg">
                                <span className="font-semibold">Profesor:</span> {profesor}
                            </p>
                            <p className="text-gray-500 text-lg">
                                <span className="font-semibold">Cupo:</span> {cupo}
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
                                <div className="flex justify-center">
                                    <button
                                        className="text-center text-white bg-[var(--primary-color)] hover:bg-blue-950  font-medium rounded-lg text-sm px-4 py-2.5  cursor-pointer"
                                    >
                                        Unirme
                                    </button>


                                </div>
                            </div>

                        </div>
                        <div className="flex justify-end mt-4">

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Card;
