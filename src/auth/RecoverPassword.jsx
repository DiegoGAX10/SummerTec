import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const RecoverPassword = () => {
    const [identifier, setIdentifier] = useState("");
    const baseurl = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const generateEmailEstudiante = (controlNumber) => {
        return `L${controlNumber}@zacatepec.tecnm.mx`;
    };

    const handleRecover = async (e) => {
        e.preventDefault();

        try {
            const isStudent = /^\d+$/.test(identifier);
            const email = isStudent ? generateEmailEstudiante(identifier) : identifier;

            console.log(email);


            const response = await fetch(`${baseurl}/auth/recover-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            console.log(response);

            if (response.status === 200) {
                Swal.fire({
                    title: "Correo Enviado",
                    text: "Revisa tu bandeja de entrada para restablecer tu contraseña.",
                    icon: "success",
                }).then(()=>{
                    navigate("/login");
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo enviar el correo. Verifica tu número de control o correo electrónico.",
                icon: "error",
            });
        }
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <img className="w-35 mb-8" src="/summer_tec.svg" alt="logo" />

                <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 sm:p-8">
                        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                            Recuperar contraseña
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleRecover}>
                            <div>
                                <label
                                    htmlFor="identifier"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Correo o Número de Control
                                </label>
                                <input
                                    type="text"
                                    id="identifier"
                                    className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Enviar enlace de recuperación
                            </button>


                            <p className="text-sm text-gray-500 text-center">
                                <a href="/login" className="text-blue-600 hover:underline">
                                    Volver al inicio de sesión
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecoverPassword;
