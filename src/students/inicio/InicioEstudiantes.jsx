import React, { useEffect, useState } from 'react';
import MateriasGrid from './../../components/global/MateriasGrid.jsx';
import Toggle from "../../admins/inicio-admins/components/Toggle.jsx";
import SearchBox from "../../components/global/SearchBox.jsx";

import { HiOfficeBuilding } from "react-icons/hi";
import { PiDotsThreeFill } from "react-icons/pi";
import { SlChemistry } from "react-icons/sl";

import Dropdown from "../../components/global/Dropdown.jsx";
import axios from "axios";
import Swal from "sweetalert2";

function InicioEstudiantes() {
    const [materias, setMaterias] = useState([]);
    const [materiasFiltradas, setMateriasFiltradas] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [creditos, setCreditos] = useState([]);
    const [edificios, setEdificios] = useState([]);

    // Estado para filtros activos
    const [filtroCarrera, setFiltroCarrera] = useState(null);
    const [filtroCreditos, setFiltroCreditos] = useState(null);
    const [filtroEdificio, setFiltroEdificio] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    const token = localStorage.getItem('authToken');
    const baseurl = import.meta.env.VITE_BASE_URL;

    // Función para obtener materias
    const getMaterias = async () => {
        try {
            const response = await axios.get(`${baseurl}/materias_propuestas/materias_propuestas`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Materias recibidas:', response.data);
            setMaterias(response.data);
            setMateriasFiltradas(response.data);

        } catch (error) {
            console.error('Error al obtener materias:', error);
            Swal.fire({
                title: "Error",
                text: "No se pudieron obtener las materias.",
                icon: "error",
            });
        }
    };

    // Función para obtener carreras desde la base de datos
    const getCarreras = async () => {
        try {
            const response = await axios.get(`${baseurl}/carreras/getAll`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Carreras recibidas:', response.data);
            // Transformamos la respuesta al formato necesario para el Dropdown
            const carrerasFormateadas = response.data.map(carrera => ({
                id: carrera.clave,
                label: carrera.nombre,
                clave: carrera.clave,
                // Otros campos si son necesarios
            }));
            setCarreras(carrerasFormateadas);

        } catch (error) {
            console.error('Error al obtener carreras:', error);
            // Usamos valores por defecto si falla
            setCarreras([]);
        }
    };

    // Función para obtener los créditos únicos de las materias
    const getCreditos = async () => {
        try {
                const response = await axios.get(`${baseurl}/materias/creditos_disponibles`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            console.log('Créditos recibidos:', response.data);
            // Transformamos la respuesta al formato necesario para el Dropdown
            const creditosFormateados = response.data.map(credito => ({
                id: credito,
                label: `${credito} créditos`,
                value: credito
            }));
            setCreditos(creditosFormateados);

        } catch (error) {
            console.error('Error al obtener créditos:', error);
            // Si falla, intentamos extraer créditos de las materias cargadas
            const creditosUnicos = [...new Set(materias.map(materia => materia.creditos))];
            const creditosFormateados = creditosUnicos.map(credito => ({
                id: credito,
                label: `${credito} créditos`,
                value: credito
            }));
            setCreditos(creditosFormateados);
        }
    };

    // Función para obtener edificios (si tienes esta información en la BD)
    const getEdificios = async () => {
        try {
            const response = await axios.get(`${baseurl}/edificios/getAll`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Edificios recibidos:', response.data);
            const edificiosFormateados = response.data.map(edificio => ({
                id: edificio.id,
                label: edificio.nombre,
                value: edificio.id
            }));
            setEdificios(edificiosFormateados);

        } catch (error) {
            console.error('Error al obtener edificios:', error);
            // Usamos valores por defecto de Constants.edificios si está disponible
            setEdificios([]);
        }
    };

    // Función para manejar la selección de filtros
    const handleSelect = (item, tipo) => {
        console.log(`Seleccionado ${tipo}:`, item);

        switch (tipo) {
            case "carrera":
                setFiltroCarrera(item);
                break;
            case "creditos":
                setFiltroCreditos(item);
                break;
            case "edificio":
                setFiltroEdificio(item);
                break;
            default:
                break;
        }
    };

    // Función para limpiar un filtro específico
    const limpiarFiltro = (tipo) => {
        switch (tipo) {
            case "carrera":
                setFiltroCarrera(null);
                break;
            case "creditos":
                setFiltroCreditos(null);
                break;
            case "edificio":
                setFiltroEdificio(null);
                break;
            case "todos":
                setFiltroCarrera(null);
                setFiltroCreditos(null);
                setFiltroEdificio(null);
                setBusqueda("");
                setMateriasFiltradas(materias);
                break;
            default:
                break;
        }
    };

    // Función para filtrar materias
    const filtrarMaterias = () => {
        let resultado = [...materias];

        // Filtrar por búsqueda
        if (busqueda) {
            resultado = resultado.filter(materia =>
                materia.nombre_materia.toLowerCase().includes(busqueda.toLowerCase()) ||
                materia.docente_nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
                materia.clave_materia.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        // Filtrar por carrera
        if (filtroCarrera) {
            resultado = resultado.filter(materia =>
                materia.clave_carrera === filtroCarrera.clave
            );
        }

        // Filtrar por créditos
        if (filtroCreditos) {
            resultado = resultado.filter(materia =>
                materia.creditos === filtroCreditos.value
            );
        }

        // Filtrar por edificio
        if (filtroEdificio) {
            resultado = resultado.filter(materia =>
                materia.edificio_id === filtroEdificio.value
            );
        }

        setMateriasFiltradas(resultado);
    };

    // Manejar búsqueda
    const handleSearch = (texto) => {
        setBusqueda(texto);
    };

    // useEffect para cargar datos iniciales
    useEffect(() => {
        getMaterias();
        getCarreras();
        getCreditos();
        getEdificios();
    }, []);

    // useEffect para aplicar filtros cuando cambien
    useEffect(() => {
        filtrarMaterias();
    }, [busqueda, filtroCarrera, filtroCreditos, filtroEdificio, materias]);

    // Verificar si hay filtros activos
    const hayFiltrosActivos = filtroCarrera || filtroCreditos || filtroEdificio || busqueda;

    return (
        <div>
            {/* Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Hello!</h3>
                    <p className="text-gray-600 mb-6">
                        Press ESC key or click the button below to close
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

            <div className="flex items-center flex-col">
                <Toggle />

                <SearchBox onSearch={handleSearch} value={busqueda} />

                <div className="flex justify-between mb-3 w-full px-4">
                    <div className="flex items-center">
                        <p className="text-lg font-bold">{materiasFiltradas.length} resultados</p>

                        {hayFiltrosActivos && (
                            <button
                                onClick={() => limpiarFiltro("todos")}
                                className="ml-3 px-2 py-1 bg-red-100 text-red-600 rounded-md text-sm hover:bg-red-200"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>

                    <div className="flex flex-row gap-4 justify-center items-center">
                        <p className="text-lg font-bold">Filtrar por: </p>

                        <div className="relative">
                            <Dropdown
                                buttonLabel={filtroCarrera ? filtroCarrera.label : "Carrera"}
                                items={carreras}
                                onSelect={(item) => handleSelect(item, "carrera")}
                                buttonIcon={SlChemistry}
                            />
                            {filtroCarrera && (
                                <button
                                    onClick={() => limpiarFiltro("carrera")}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        <div className="relative">
                            <Dropdown
                                buttonLabel={filtroEdificio ? filtroEdificio.label : "Edificio"}
                                items={edificios}
                                onSelect={(item) => handleSelect(item, "edificio")}
                                buttonIcon={HiOfficeBuilding}
                            />
                            {filtroEdificio && (
                                <button
                                    onClick={() => limpiarFiltro("edificio")}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        <div className="relative">
                            <Dropdown
                                buttonLabel={filtroCreditos ? filtroCreditos.label : "Créditos"}
                                items={creditos}
                                onSelect={(item) => handleSelect(item, "creditos")}
                                buttonIcon={PiDotsThreeFill}
                            />
                            {filtroCreditos && (
                                <button
                                    onClick={() => limpiarFiltro("creditos")}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <MateriasGrid materias={materiasFiltradas} />
        </div>
    );
}

export default InicioEstudiantes;