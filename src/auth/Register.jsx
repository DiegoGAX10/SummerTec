import React, { useState } from 'react';
import { Alert } from 'react';

const Register = ({ navigation }) => {
    const [numero_control, setNumeroControl] = useState('');
    const [nombre_completo, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone_number, setPhoneNumber] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            Alert.alert('', 'Las contraseñas no coinciden');
        } else if (password.length < 6) {
            Alert.alert('', 'La contraseña debe tener al menos 6 caracteres');
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
                if (response.ok) {
                    Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada correctamente');
                    navigation.navigate('Login');
                } else {
                    const errorData = await response.json();
                    console.log('Error data:', errorData);
                    Alert.alert('Error en el registro', errorData.message || 'Hubo un problema con tu registro');
                }
            } catch (error) {
                console.error('Error en la conexión al servidor:', error);
                Alert.alert('Error', 'Error en la conexión al servidor');
            }
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <img className="w-35 mb-8" src="/summer_tec.svg" alt="logo" />

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Crea una cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
                            <div>
                                <label htmlFor="controlNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Número de control
                                </label>
                                <input type="text" name="controlNumber" id="controlNumber"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       value={numero_control} onChange={(e) => setNumeroControl(e.target.value)} required
                                       pattern="\d*" inputMode="numeric"
                                />
                            </div>
                            <div>
                                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nombre completo
                                </label>
                                <input type="text" name="fullName" id="fullName"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       value={nombre_completo} onChange={(e) => setNombreCompleto(e.target.value)} required
                                       pattern="^[A-Za-zÀ-ÿ\s]+$" title="Solo letras y espacios"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Correo electrónico
                                </label>
                                <input type="email" name="email" id="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       value={email} onChange={(e) => setEmail(e.target.value)} required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Contraseña
                                </label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       value={password} onChange={(e) => setPassword(e.target.value)} required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirma tu contraseña
                                </label>
                                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Número de teléfono
                                </label>
                                <input type="text" name="phoneNumber" id="phoneNumber"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} required
                                       pattern="\d*" inputMode="numeric"
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox"
                                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                           required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                        Acepto los <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                                        Términos y Condiciones</a>
                                    </label>
                                </div>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-[var(--primary-color)] cursor-pointer hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Crear cuenta
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Ya tienes una cuenta? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
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