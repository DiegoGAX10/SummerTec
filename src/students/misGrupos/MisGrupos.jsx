import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function MisGrupos() {
    const [grupos, setGrupos] = useState([]);
    const token = localStorage.getItem("authToken");

    // Function to fetch the groups the user has requested to join
    const fetchGrupos = async () => {
        try {
            const response = await fetch(`http://localhost:5000/inscritos/materia_propuesta_id`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setGrupos(data); // Set the fetched groups to state
            } else {
                const error = await response.json();
                Swal.fire({
                    text: error.error || "Error fetching groups",
                    icon: "error",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: `${error}`,
                icon: "error",
            });
        }
    };

    // Fetch groups when the component mounts
    useEffect(() => {
        fetchGrupos();
    }, []);

    return (
        <div className="ml-5">
            <h1 className="text-2xl font-bold mb-4">MIS GRUPOS</h1>
            {grupos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {grupos.map((grupo) => (
                        <div
                            key={grupo.id_materia}
                            className="p-4 border rounded-lg shadow-md bg-white"
                        >
                            <h2 className="text-lg font-semibold">{grupo.nombre_materia}</h2>
                            <p className="text-gray-600">Profesor: {grupo.profesor}</p>
                            <p className="text-gray-600">Cupo: {grupo.cupo}</p>
                            <p className="text-gray-600">Estado: {grupo.status}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No has solicitado unirte a ningún grupo.</p>
            )}
        </div>
    );
}