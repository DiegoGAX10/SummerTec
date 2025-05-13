// Debugging version - Add to the top of your file
import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import logout from "./utils/logout.js";

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [debugInfo, setDebugInfo] = useState({
        baseUrl: "Checking...", token: "Checking...", tokenUrl: "Checking...", email: "Checking..."
    });





    const {tokenUrl} = useParams(); // Get token from URL
    const bearerToken = localStorage.getItem("authToken");
    const baseurl = import.meta.env.VITE_BASE_URL || "ENV_VARIABLE_MISSING";
    const navigate = useNavigate();
    const email = localStorage.getItem("userEmail");

    // Debug info
    useEffect(() => {
        setDebugInfo({
            baseUrl: baseurl,
            token: bearerToken ? "Present" : "Missing",
            tokenUrl: tokenUrl || "Missing",
            email: email || "Missing"
        });

        // Print debug info to console
        console.log("Debug Info:", {
            baseUrl: baseurl,
            token: bearerToken ? "Present (length: " + bearerToken.length + ")" : "Missing",
            tokenUrl: tokenUrl || "Missing",
            email: email || "Missing"
        });

        // Check if we have an authentication method
        if (!bearerToken && !tokenUrl) {
            console.error("No authentication method available. Need either bearerToken or tokenUrl.");
        }
    }, [baseurl, bearerToken, tokenUrl, email]);

    const changePasswordAuthenticated = async () => {
        console.log("Attempting authenticated password change");
        try {
            const data = {
                "new_password": newPassword,
                "email": email
            };

            console.log("Sending request to:", `${baseurl}/auth/reset-password-auth`);
            console.log(JSON.stringify(data));

            const response = await axios.post(`${baseurl}/auth/reset-password-auth`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${bearerToken}`
                }
            });

            console.log("Response received:", response);
            return response;
        } catch (error) {
            console.error("Error in changePasswordAuthenticated:", error);

            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                // Return a more specific error message based on status
                throw new Error(`Server error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`);
            } else if (error.request) {
                console.error("No response received:", error.request);
                throw new Error("No response from server. Please check your connection and try again.");
            } else {
                console.error("Error message:", error.message);
                throw error;
            }
        }
    };


    const changePasswordFromUrl = async () => {
        console.log("Attempting URL token password change");
        try {
            console.log("Sending request to:", `${baseurl}/auth/reset-password/${tokenUrl}`);

            const response = await axios.post(`${baseurl}/auth/reset-password/${tokenUrl}`, {
                new_password: newPassword,
            });

            console.log("Response received:", response);
            return response;
        } catch (error) {
            console.error("Error in changePasswordFromUrl:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
            throw error;
        }
    }







    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");
        setIsLoading(true);

        try {
            if (newPassword !== confirmPassword) {
                console.log("Passwords don't match");
                Swal.fire({
                    title: "Error", text: "Las contraseñas no coinciden.", icon: "error",
                });
                return;
            }

            if (newPassword.length < 8) {
                console.log("Password too short");
                Swal.fire({
                    title: "Error", text: "La contraseña debe tener al menos 8 caracteres.", icon: "warning",
                });
                return;
            }


            console.log("Validation passed, attempting to change password");
            let response;

            if (bearerToken) {
                console.log("Using authenticated method");
                response = await changePasswordAuthenticated();
            } else if (tokenUrl) {
                console.log("Using URL token method");
                response = await changePasswordFromUrl();
            } else {
                console.error("No authentication method available");
                throw new Error("No authentication method available");
            }

            console.log("Processing response:", response);


            if (response && response.data && response.data.success) {
                console.log("Password changed successfully");
                Swal.fire({
                    title: "Éxito", text: "¡Contraseña actualizada correctamente!", icon: "success",
                }).then(() => {
                    // If user was authenticated, log them out
                    if (bearerToken) {
                        console.log("Logging out authenticated user");
                        try {
                            logout(navigate);
                        } catch (logoutError) {
                            console.error("Error during logout:", logoutError);
                        }
                    }
                    console.log("Navigating to login page");
                    navigate("/login");
                });
            } else {
                const errorMessage = response?.data?.message || "Error al cambiar la contraseña.";
                console.error("Error from server:", errorMessage);
                Swal.fire({
                    title: "Error", text: errorMessage, icon: "error",
                });
            }
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || "Algo salió mal al procesar su solicitud.",
                icon: "error",
            });
        } finally {
            setIsLoading(false);
            console.log("Form submission completed");
        }
    };

    return (<section className="">
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
                                disabled={isLoading}
                            >
                                {isLoading ? "Procesando..." : "Cambiar contraseña"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>);
};

export default ChangePassword;