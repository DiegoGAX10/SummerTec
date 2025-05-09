import React from 'react';
import { FaUsers, FaLock, FaRocket, FaUserFriends } from 'react-icons/fa';

// About Us Page
export const SobreNosotros = () => {
    return (
        <div className="page-container bg-gray-50 min-h-screen py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-blue-800 mb-4">Sobre Nosotros</h1>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:shadow-xl">
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        SummerTec nace de la pasión por la tecnología y la educación. Somos un equipo comprometido con
                        brindar experiencias de aprendizaje innovadoras y accesibles para estudiantes y docentes del
                        Instituto Tecnológico de Zacatepec.
                    </p>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        Nuestra plataforma está diseñada para simplificar la gestión de cursos de verano,
                        conectando estudiantes con las mejores oportunidades de crecimiento académico.
                    </p>

                    <div className="mt-10">
                        <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
                            <FaUsers className="mr-3 text-blue-600" size={24} />
                            Nuestros Valores
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {['Innovación', 'Accesibilidad', 'Calidad Educativa', 'Compromiso'].map((value, index) => (
                                <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center">
                                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                                    <span className="text-gray-800 font-medium">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
/*
// Privacy Policy Page
export const PrivacyPolicy = () => {
    return (
        <div className="page-container bg-gray-50 min-h-screen py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-blue-800 mb-4">Política de Privacidad</h1>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start mb-8">
                        <FaLock className="text-blue-600 mt-1 mr-4 flex-shrink-0" size={28} />
                        <div>
                            <h2 className="text-2xl font-bold text-blue-700 mb-4">Descargo de Responsabilidad</h2>
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                El Instituto Tecnológico de Zacatepec y SummerTec no se hacen responsables por:
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg mb-8 shadow-inner">
                        <ul className="space-y-3">
                            {[
                                'Cualquier filtración de información personal',
                                'Uso indebido de datos por parte de terceros',
                                'Consecuencias derivadas de la compartición voluntaria de información',
                                'Posibles brechas de seguridad más allá de nuestro control directo'
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-5 h-5 rounded-full bg-blue-600 flex-shrink-0 mt-1 mr-3 flex items-center justify-center text-white text-xs font-bold">
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Los usuarios son responsables de:</h3>
                    <ul className="space-y-3 mb-8 pl-4">
                        {[
                            'Proteger su información personal',
                            'Mantener la confidencialidad de sus credenciales',
                            'Usar la plataforma de manera responsable'
                        ].map((item, index) => (
                            <li key={index} className="flex items-center">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg shadow-sm">
                        <p className="text-yellow-800 font-medium">
                            Se recomienda leer detenidamente los términos de uso y tomar precauciones
                            adicionales para proteger su información personal.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
*/
// Our Mission Page
export const OurMission = () => {
    return (
        <div className="page-container bg-gray-50 min-h-screen py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-blue-800 mb-4">Nuestra Misión</h1>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center justify-center mb-16">
                        <FaRocket className="text-blue-600 mr-4" size={36} />
                        <p className="text-xl text-gray-700 italic leading-relaxed">
                            "Democratizar el acceso a la educación tecnológica, proporcionando una plataforma
                            innovadora que facilite la gestión de cursos de verano en el Instituto Tecnológico de Zacatepec."
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 mt-10">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-md transform transition-transform duration-300 hover:-translate-y-1">
                            <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b border-blue-200 pb-3">Objetivos</h2>
                            <ul className="space-y-5">
                                {[
                                    'Simplificar la inscripción a cursos',
                                    'Ofrecer experiencias de aprendizaje de calidad',
                                    'Promover la innovación educativa',
                                    'Impulsar el desarrollo tecnológico'
                                ].map((objective, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0 mr-3 flex items-center justify-center text-white text-xs font-bold">
                                            {index + 1}
                                        </div>
                                        <span className="text-gray-800">{objective}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-md transform transition-transform duration-300 hover:-translate-y-1">
                            <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b border-blue-200 pb-3">Visión</h2>
                            <p className="text-gray-800 leading-relaxed mb-8">
                                Ser la plataforma líder en gestión de cursos de verano,
                                conectando estudiantes con oportunidades de crecimiento
                                académico y profesional a través de tecnología innovadora y accesible.
                            </p>
                            <div className="mt-8 flex justify-center">
                                <div className="w-20 h-20 rounded-full bg-blue-600 opacity-10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Our Team Page
export const OurTeam = () => {
    const teamMembers = [
        {
            name: "Luis Vargas",
            role: "Desarrollador Líder",
            description: "Experto en desarrollo web y coordinador del proyecto SummerTec."
        },
        {
            name: "Jose Aldo Salazar Neri",
            role: "Diseñador UX/UI",
            description: "Responsable de la experiencia de usuario y diseño de interfaces."
        },
        {
            name: "Eric Benitez Castillo",
            role: "Especialista en Backend",
            description: "Arquitecto de sistemas y desarrollador de infraestructura backend."
        },
        {
            name: "Kenia Flores",
            role: "Gestora de Proyectos",
            description: "Coordina la planificación y ejecución de los objetivos de SummerTec."
        },
        {
            name: "Diego Antelmo Gallegos",
            role: "Desarrollador Frontend",
            description: "Experto en desarrollo de interfaces de usuario y experiencia de usuario."
        }
    ];

    return (
        <div className="page-container bg-gray-50 min-h-screen py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-blue-800 mb-4">Nuestro Equipo</h1>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
                    <div className="flex items-center justify-center mb-8">
                        <FaUserFriends className="text-blue-600 mr-3" size={24} />
                        <p className="text-xl text-gray-600">Conoce a las personas detrás de SummerTec</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="h-28 bg-gradient-to-r from-blue-500 to-blue-700"></div>
                            <div className="relative px-6 pb-8">
                                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                                    <div className="w-28 h-28 bg-white rounded-full p-2 shadow-lg">
                                        <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-3xl font-bold text-blue-700">{member.name.charAt(0)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-16 text-center">
                                    <h2 className="text-xl font-bold text-blue-800 mb-2">{member.name}</h2>
                                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                                    <p className="text-gray-600">{member.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};