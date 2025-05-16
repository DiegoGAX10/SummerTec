import React, {useEffect, useState} from 'react';
import MateriasGrid from './../../components/global/MateriasGrid.jsx';
import Toggle from "../../admins/inicio-admins/components/Toggle.jsx";
import SearchBox from "../../components/global/SearchBox.jsx";

import {HiOfficeBuilding} from "react-icons/hi";
import {PiDotsThreeFill} from "react-icons/pi";
import { SlChemistry } from "react-icons/sl";

import Dropdown from "../../components/global/Dropdown.jsx";
import axios from "axios";
import Swal from "sweetalert2";

import Constants from "../../utils/constants/Constants.jsx";

export default function InicioEstudiantes() {
    const baseurl = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('authToken');

    // States for materials and filtering
    const [materias, setMaterias] = useState([]);
    const [filteredMaterias, setFilteredMaterias] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);

    // Filter states
    const [carreraFilter, setCarreraFilter] = useState(null);
    const [edificioFilter, setEdificioFilter] = useState(null);
    const [creditosFilter, setCreditosFilter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Function to fetch materias
    const getMaterias = async () => {
        try {
            const response = await axios.get(`${baseurl}/materias_propuestas/materias_propuestas`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Materias recibidas:', response.data);

            // Ensure all data is properly formatted
            const formattedMaterias = response.data.map(materia => ({
                ...materia,
                // Ensure creditos is a number
                creditos: materia.creditos !== undefined ?
                    (typeof materia.creditos === 'string' ? parseInt(materia.creditos) : materia.creditos)
                    : null
            }));

            setMaterias(formattedMaterias);
            setFilteredMaterias(formattedMaterias); // Initialize filtered materias with all materias

        } catch (error) {
            console.error('Error al obtener materias:', error);
            Swal.fire({
                title: "Error",
                text: "No se pudieron obtener las materias.",
                icon: "error",
            });
        }
    };

    // Handle filter selection for each dropdown
    const handleCarreraSelect = (item) => {
        setCarreraFilter(item);
        setFilterApplied(true);
    };

    const handleEdificioSelect = (item) => {
        setEdificioFilter(item);
        setFilterApplied(true);
    };

    const handleCreditosSelect = (item) => {
        setCreditosFilter(item);
        setFilterApplied(true);
    };

    // Handle search input
    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term) {
            setFilterApplied(true);
        }
    };

    // Apply filters whenever filter states change
    useEffect(() => {
        let result = materias;

        // Apply career filter
        if (carreraFilter) {
            result = result.filter(materia =>
                materia.clave_carrera === carreraFilter.clave
            );
        }

        // Apply building filter
        if (edificioFilter && edificioFilter.value) {
            result = result.filter(materia =>
                materia.edificio === edificioFilter.value
            );
        }

        // Apply credits filter
        if (creditosFilter && creditosFilter.value) {
            // Convert the filter value to a number
            const creditsValue = parseInt(creditosFilter.value);

            console.log('Filtering by credits:', creditsValue);

            result = result.filter(materia => {
                // Ensure we have valid data to compare
                if (!materia.creditos && materia.creditos !== 0) {
                    console.log('Materia without credits:', materia);
                    return false;
                }

                // Convert materia.creditos to number if it's a string
                const materiaCreditos = typeof materia.creditos === 'string'
                    ? parseInt(materia.creditos)
                    : materia.creditos;

                console.log(`Comparing materia ${materia.nombre_materia} credits:`, materiaCreditos, '===', creditsValue);

                return materiaCreditos === creditsValue;
            });
        }

        // Apply search term filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(materia =>
                materia.nombre_materia?.toLowerCase().includes(term) ||
                materia.docente?.toLowerCase().includes(term) ||
                materia.clave_materia?.toLowerCase().includes(term)
            );
        }

        setFilteredMaterias(result);

        // Check if filters are applied and no results found
        if (filterApplied && result.length === 0) {
            Swal.fire({
                title: "Sin resultados",
                text: "No se encontraron materias con los filtros aplicados.",
                icon: "info",
                confirmButtonText: "Entendido"
            });
        }
    }, [carreraFilter, edificioFilter, creditosFilter, searchTerm, materias, filterApplied]);

    // Fetch data when component mounts
    useEffect(() => {
        getMaterias();
    }, []);

    // Function to clear all filters
    const clearFilters = () => {
        setCarreraFilter(null);
        setEdificioFilter(null);
        setCreditosFilter(null);
        setSearchTerm('');
        setFilterApplied(false);
    };

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

            <div className="flex items-center flex-col">
                <Toggle/>

                <SearchBox onSearch={handleSearch} value={searchTerm} />

                <div className="flex justify-between mb-3 w-full px-4">
                    <p className="text-lg font-bold">{filteredMaterias.length} resultados</p>

                    <div className="flex flex-row gap-4 justify-center items-center">
                        <p className="text-lg font-bold">Filtrar por: </p>
                        <Dropdown
                            buttonLabel="Carrera"
                            items={Constants.carreras}
                            onSelect={handleCarreraSelect}
                            buttonIcon={SlChemistry}
                            selectedItem={carreraFilter}
                        />
                        <Dropdown
                            buttonLabel="Edificio"
                            items={Constants.edificios}
                            onSelect={handleEdificioSelect}
                            buttonIcon={HiOfficeBuilding}
                            selectedItem={edificioFilter}
                        />
                        <Dropdown
                            buttonLabel="Créditos"
                            items={Constants.creditos}
                            onSelect={handleCreditosSelect}
                            buttonIcon={PiDotsThreeFill}
                            selectedItem={creditosFilter}
                        />
                        {(carreraFilter || edificioFilter || creditosFilter || searchTerm) && (
                            <button
                                onClick={clearFilters}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <MateriasGrid materias={filteredMaterias}/>
        </div>
    );
}