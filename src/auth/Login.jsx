import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [controlNumber, setControlNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const generateEmail = (controlNumber) => {
    return `L${controlNumber}@zacatepec.tecnm.mx`;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
     // const email = generateEmail(controlNumber);

      const response = await axios.post("http://127.0.0.1:5000/auth/login", {
        email: controlNumber,
        password: password,
      });

      if (response.status === 200) {
        const { access_token, user } = response.data;

        console.log(response.data);
        localStorage.setItem("authToken", access_token); // <-- Store the token
        localStorage.setItem("userEmail", user.email); // Optional: store user data
        localStorage.setItem("userType", user.user_type); // Optional: store role
        localStorage.setItem("full_name", user.nombre_completo)
        localStorage.setItem("role", user.role)




        Swal.fire({
          title: "Sesión Iniciada",
          text: `Bienvenido ${user.nombre_completo}`,
          icon: "success",
        });
        navigate(`/${localStorage.getItem("userType")}`);
      } else {
        Swal.fire({
          title: "Error",
          text: "Error de autenticación. Intenta de nuevo.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      if (error.response) {
        if (error.response.status === 401) {
          Swal.fire({
            title: "Oh no!",
            text: "Número de control o contraseña incorrectos",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: `Error en el servidor: ${error.response.status}`,
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error en el servidor",
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img className="w-35 mb-8" src="/summer_tec.svg" alt="logo" />

        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
              Inicia sesión
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="controlNumber"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Número de control
                </label>
                <input
                  type="text"
                  id="controlNumber"
                  className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5"
                  value={controlNumber}
                  onChange={(e) => setControlNumber(e.target.value)}
                  required
                />
              </div>

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

export default Login;
