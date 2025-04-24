import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Ajustes() {
    const [nombrgite, setNombre] = useState("");
    const [nuevoNombre, setNuevoNombre] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        setNombre(storedName || "");
        setNuevoNombre(storedName || "");
    }, []);

    const handleCambiarNombre = () => {
        if (nuevoNombre.trim() !== "") {
            localStorage.setItem("username", nuevoNombre.trim());
            setNombre(nuevoNombre.trim());
            alert("Nombre actualizado correctamente.");
        }
    };

    const handleEliminarCuenta = () => {
        if (window.confirm("¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible.")) {
            localStorage.clear();
            navigate("/");
        }
    };

    return (
        <div className="ml-5 p-6 max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Ajustes</h1>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Cambiar nombre</h2>
                <input
                    type="text"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                />
                <button
                    onClick={handleCambiarNombre}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Guardar cambios
                </button>
            </div>

            <hr className="my-6" />

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-red-600">Eliminar cuenta</h2>
                <p className="text-sm text-gray-600 mb-2">
                    Esta acción eliminará tus datos locales y cerrará sesión.
                </p>
                <button
                    onClick={handleEliminarCuenta}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Eliminar cuenta
                </button>
            </div>
        </div>
    );
}
