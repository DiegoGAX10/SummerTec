import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginEstudiante = () => {


  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_BASE_URL;


  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");


  const generateEmailEstudiante = (controlNumber) => {
    return `L${controlNumber}@zacatepec.tecnm.mx`;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const isStudent = /^\d+$/.test(identifier); // Checks if it's all digits
      const email = isStudent ? generateEmailEstudiante(identifier) : identifier;

      const response = await axios.post(`${baseurl}/auth/login`, {
        email: email,
        password: password,
      });

      const { access_token, user } = response.data;

      localStorage.setItem("authToken", access_token);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userType", user.role.toLowerCase());
      localStorage.setItem("full_name", user.nombre_completo);
      localStorage.setItem("role", user.role);
      console.log(response.data);


      Swal.fire({
        title: "Sesión Iniciada",
        text: `Bienvenido ${user.nombre_completo}`,
        icon: "success",
      });

      navigate(isStudent ? `/estudiante` : `/admin`);
    } catch (error) {


      Swal.fire({
        title: "Error",
        text: "Credenciales incorrectas",
        icon: "error",
      });
    }
  };

  return (
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <img className="w-35 mb-8" src="/summer_tec.svg" alt="logo" />

          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                Ingresa tus credenciales
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
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

                <div className="flex flex-col space-y-2">
                 <div>
                   <label
                       htmlFor="password"
                       className="block mb-2 text-sm font-medium text-gray-900"
                   >
                     Contraseña
                   </label>
                   <input
                       type="password"
                       id="password"
                       placeholder="••••••••"
                       className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                   />

                 </div>

                  <div className="flex flex-row justify-end items-end ">
                    <a href="/recover-password" className="text-sm text-blue-600 hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                </div>

                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Iniciar sesión
                </button>
                <p className="text-sm text-gray-500">
                  ¿Aún no tienes cuenta?{" "}
                  <a href="/register" className="text-blue-600 hover:underline">
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

export default LoginEstudiante;