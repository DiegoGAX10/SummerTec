import React from 'react';
import { FaBullseye, FaUsers, FaLightbulb, FaHandshake } from 'react-icons/fa';

const Mission = () => {
    const missionItems = [
        {
            icon: <FaBullseye className="w-8 h-8" />,
            title: "Misión",
            description: "Facilitar la gestión académica durante el periodo de verano mediante una plataforma intuitiva que optimice los procesos de inscripción, seguimiento y evaluación para estudiantes y docentes del Tecnológico de Zacatepec."
        },
        {
            icon: <FaUsers className="w-8 h-8" />,
            title: "Visión",
            description: "Ser el sistema de referencia para la administración de cursos de verano en instituciones educativas tecnológicas, reconocido por su eficiencia, accesibilidad y contribución al éxito académico."
        },
        {
            icon: <FaLightbulb className="w-8 h-8" />,
            title: "Valores",
            description: (
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Innovación educativa</li>
                    <li>Transparencia en los procesos</li>
                    <li>Accesibilidad tecnológica</li>
                    <li>Excelencia académica</li>
                    <li>Compromiso institucional</li>
                </ul>
            )
        },
        {
            icon: <FaHandshake className="w-8 h-8" />,
            title: "Compromiso",
            description: "Garantizar una experiencia de usuario excepcional, manteniendo los más altos estándares de seguridad de datos y continuas mejoras basadas en la retroalimentación de nuestra comunidad académica."
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Nuestra Misión</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        En SummerTec nos guían principios fundamentales que orientan cada aspecto de nuestra plataforma
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                    {missionItems.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            width="40%"
                        />
                    ))}
                </div>

                <div className="mt-16 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-2/3 md:pr-8">
                            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Impacto Institucional</h3>
                            <p className="text-gray-600 mb-6">
                                SummerTec transforma la experiencia educativa durante el verano, reduciendo tiempos de gestión en un 60% y aumentando la satisfacción de estudiantes y docentes mediante procesos digitalizados y accesibles desde cualquier dispositivo.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">+95% satisfacción</span>
                                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">60% más eficiente</span>
                                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Acceso 24/7</span>
                            </div>
                        </div>
                        <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center">
                            <div className="bg-blue-100 rounded-lg p-6 text-center w-full max-w-xs">
                                <div className="text-4xl font-bold text-blue-800 mb-2">100%</div>
                                <div className="text-blue-600 font-medium">Comprometidos con la excelencia académica</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );




};

const FeatureCard = ({ icon, title, description, width = null }) => {
    return (
        <div
            className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center ${
                width ? '' : 'w-full'
            }`}
            style={width ? { width } : {}}
        >
            <div className="text-blue-600 mb-4 flex justify-center">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};




export default Mission;