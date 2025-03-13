import { useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const Login = ({ navigation }) => {
    const [controlNumber, setControlNumber] = useState('');
    const [password, setPassword] = useState('');

    const generateEmail = (controlNumber) => {
        return `L${controlNumber}@zacatepec.tecnm.mx`;
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const email = generateEmail(controlNumber);
            const response = await axios.post('http://', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                const { localId } = response.data;

                // Guarda el UID en AsyncStorage
                await AsyncStorage.setItem('userUID', localId);
                Alert.alert('Inicio de sesión exitoso');

                // Navega al Main y resetea el historial
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Main' }],
                    })
                );
            } else {
                Alert.alert('Error de autenticación', 'No se pudo iniciar sesión. Intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            if (error.response && error.response.status === 401) {
                Alert.alert('Error', 'Número de control o contraseña incorrectos');
            } else {
                Alert.alert('Error', 'Ocurrió un error en el servidor');
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
                            Inicia sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="controlNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Número de control
                                </label>
                                <input type="text" name="controlNumber" id="controlNumber"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       value={controlNumber} onChange={(e) => setControlNumber(e.target.value)} required
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

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox"
                                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                           required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                        Acepto los <a
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        href="#">Términos y Condiciones</a>
                                    </label>
                                </div>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-[var(--primary-color)] cursor-pointer hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Iniciar sesión
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Aún no tienes cuenta? <a href="/register"
                                                          className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Regístrate aquí
                            </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;