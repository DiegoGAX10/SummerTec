import React from 'react';
import { FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaRegSmile } from 'react-icons/fa';

const features = [
    {
        icon: <FaUsers className="w-8 h-8" />,
        title: "Para Estudiantes",
        description: "Acceso sencillo a todos los cursos de verano disponibles y gestión de tu inscripción."
    },
    {
        icon: <FaChalkboardTeacher className="w-8 h-8" />,
        title: "Para Docentes",
        description: "Herramientas para organizar y administrar tus cursos de manera eficiente."
    },
    {
        icon: <FaCalendarAlt className="w-8 h-8" />,
        title: "Organización",
        description: "Calendarios integrados y sistemas de notificaciones para no perder ningún detalle."
    },
    {
        icon: <FaRegSmile className="w-8 h-8" />,
        title: "Experiencia Simple",
        description: "Interfaz intuitiva diseñada para una experiencia sin complicaciones."
    }
];

const AboutUs = () => {



    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Sobre SummerTec</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        SummerTec es una plataforma diseñada para facilitar la gestión de cursos de verano del Tecnológico de Zacatepec.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                    {features.map((feature, index) => (
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
                    <h3 className="text-2xl font-semibold text-blue-800 mb-4">Nuestro Objetivo</h3>
                    <p className="text-gray-600 mb-6">
                        Brindar una experiencia sencilla, organizada y eficiente tanto para estudiantes como para docentes en el proceso de inscripción y gestión de cursos de verano.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Facilidad de uso</span>
                        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Organización</span>
                        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Eficiencia</span>
                        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Accesibilidad</span>
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





export default AboutUs;