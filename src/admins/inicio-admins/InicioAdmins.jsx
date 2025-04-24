import React, {useEffect, useState} from 'react';
import MateriasGrid from './../../components/global/MateriasGrid.jsx';
import Toggle from "../../admins/inicio-admins/components/Toggle.jsx";
import SearchBox from "../../components/global/SearchBox.jsx";


import {HiOfficeBuilding} from "react-icons/hi"; // Import your desired icon
import {PiDotsThreeFill} from "react-icons/pi";
import { SlChemistry } from "react-icons/sl";



import Dropdown from "../../components/global/Dropdown.jsx";
import axios from "axios";
import Swal from "sweetalert2"; // Adjust the import path as necessary




import Constants from "../../utils/constants/Constants.jsx";



export default function InicioAdmins() {
    const handleSelect = (item) => {
        console.log('Selected item:', item);
        // Handle the selected item (e.g., navigate, filter data, etc.)
    };

    const [materias, setMaterias] = useState([]);

    const token = localStorage.getItem('authToken');

// Function to fetch materias
    const getMaterias = async () => {
        try {
            const response = await axios.get("https://summer-tec-backend.onrender.com/materias_propuestas/materias_propuestas", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Materias recibidas:', response.data);
            setMaterias(response.data); // Set the fetched data to state

        } catch (error) {
            console.error('Error al obtener materias:', error);
            Swal.fire({
                title: "Error",
                text: "No se pudieron obtener las materias.",
                icon: "error",
            });
        }
    };

// useEffect to fetch data when the component mounts
    useEffect(() => {
        getMaterias(); // Call the function to fetch materias
    }, []); // Empty dependency array means this runs once when the component mounts





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
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>


            <div className="flex  items-center flex-col">
                <Toggle/>

                <SearchBox/>

                <div className="flex justify-around mb-3 w-full">
                    <p className="text-lg font-bold">{materias.length} resultados</p>

                    <div className="flex flex-row gap-4 justify-center items-center">
                        <p className="text-lg font-bold">Filtrar por: </p>
                        <Dropdown
                            buttonLabel="Carrera"
                            items={Constants.carreras}
                            onSelect={handleSelect}

                            buttonIcon={SlChemistry}
                        />
                        <Dropdown
                            buttonLabel="Edificio"
                            items={Constants.edificios}
                            onSelect={handleSelect}
                            buttonIcon={HiOfficeBuilding
                            }
                        />              <Dropdown
                        buttonLabel="Créditos"
                        items={Constants.creditos}
                        onSelect={handleSelect}
                        buttonIcon={PiDotsThreeFill}
                    />
                    </div>
                </div>
            </div>

            <MateriasGrid materias={materias}/>
        </div>
    );
}
