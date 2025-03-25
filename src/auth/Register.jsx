import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Register = () => {
    const [numero_control, setNumeroControl] = useState('');
    const [nombre_completo, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    const handleSignUp = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            Swal.fire({
                title: "Oh no!",
                text: "Las contraseñas no coinciden",
                icon: "error",
            });
        } else if (password.length < 6) {
            Swal.fire({
                title: "Oh no!",
                text: "La contraseña debe tener al menos 6 caracteres",
                icon: "error",
            });
        } else {
            const registrationData = {
                numero_control,
                nombre_completo,
                email,
                password,
                phone_number
            };

            try {
                console.log('Sending registration data:', registrationData);
                const response = await fetch('http://127.0.0.1:5000/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(registrationData),
                });

                console.log('Response status:', response.status);
                if (response.status === 201) {  // Verifica si el status es 201
                    Swal.fire({
                        text: "Registro exitoso, tu cuenta ha sido creada correctamente",
                        icon: "success",
                    });
                    navigate('/login');
                } else {
                    const errorData = await response.json();
                    console.log('Error data:', errorData);
                    Swal.fire({
                        text: errorData.message || 'Hubo un problema con tu registro',
                        icon: "error",
                    });
                }
            } catch (error) {
                console.error('Error en la conexión al servidor:', error);
                Swal.fire({
                    text: 'Error en la conexión al servidor',
                    icon: "error",
                });
            }
        }
    };

    const generateEmail = (numero_control) => {
        return 'L' + numero_control + '@zacatepec.tecnm.mx';
    };

    const handleNumeroControl = (value) => {
        setNumeroControl(value);
        setEmail(generateEmail(value));
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <img className="w-35 mb-8" src="/summer_tec.svg" alt="logo" />

                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Crea una cuenta</h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
                            <div>
                                <label htmlFor="controlNumber" className="block mb-2 text-sm font-medium text-gray-900">
                                    Número de control
                                </label>
                                <input type="text" name="controlNumber" id="controlNumber"
                                       className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5"
                                       value={numero_control} onChange={(e) => handleNumeroControl(e.target.value)} required
                                       pattern="\d*" inputMode="numeric"
                                />
                            </div>
                            <div>
                                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">
                                    Nombre completo
                                </label>
                                <input type="text" name="fullName" id="fullName"
                                       className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5"
                                       value={nombre_completo} onChange={(e) => setNombreCompleto(e.target.value)} required
                                       pattern="^[A-Za-zÀ-ÿ\s]+$" title="Solo letras y espacios"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Contraseña
                                </label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5"
                                       value={password} onChange={(e) => setPassword(e.target.value)} required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
                                    Confirma tu contraseña
                                </label>
                                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••"
                                       className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5"
                                       value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">
                                    Número de teléfono
                                </label>
                                <input type="text" name="phoneNumber" id="phoneNumber"
                                       className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5"
                                       value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} required
                                       pattern="\d*" inputMode="numeric"
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox"
                                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                           required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500">
                                        Acepto los <a className="font-medium text-primary-600 hover:underline" href="#">
                                        Términos y Condiciones</a>
                                    </label>
                                </div>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                Crear cuenta
                            </button>
                            <p className="text-sm text-gray-500">
                                ¿Ya tienes una cuenta? <a href="/login" className="text-blue-600 hover:underline">
                                Inicia sesión</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;