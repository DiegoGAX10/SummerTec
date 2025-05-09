import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const baseurl = import.meta.env.VITE_BASE_URL;

    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(`TOKEN : ${token}`);

        if (newPassword !== confirmPassword) {
            Swal.fire({
                title: "Error",
                text: "Las contraseñas no coinciden.",
                icon: "error",
            });
            return;
        }

        if (newPassword.length < 8) {
            Swal.fire({
                title: "Error",
                text: "La contraseña debe tener al menos 8 caracteres.",
                icon: "warning",
            });
            return;
        }

        try {
            const response = await axios.post(`${baseurl}/auth/reset-password/${token}`, {
                password: newPassword,
            });

            if (response.data.success) {
                Swal.fire({
                    title: "Éxito",
                    text: "¡Contraseña actualizada correctamente!",
                    icon: "success",
                }).then(() => {
                    navigate("/login");
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.data.message,
                    icon: "error",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || "Algo salió mal.",
                icon: "error",
            });
        }
    };

    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                            Cambiar Contraseña
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">
                                    Nueva contraseña
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    Confirmar contraseña
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Cambiar contraseña
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;
