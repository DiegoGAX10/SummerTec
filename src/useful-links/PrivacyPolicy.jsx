import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const PrivacyPolicy = () => {
    const [activeSections, setActiveSections] = useState({});

    const toggleSection = (sectionId) => {
        setActiveSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const policySections = [
        {
            id: 'introduction',
            title: '1. Introducción',
            content: (
                <div className="space-y-4">
                    <p>SummerTec, plataforma del Tecnológico de Zacatepec, se compromete a proteger la privacidad de los usuarios de acuerdo con la legislación mexicana en materia de protección de datos personales.</p>
                    <p>Esta política describe cómo recopilamos, usamos y protegemos la información que nos proporcionas al utilizar nuestros servicios.</p>
                </div>
            )
        },
        {
            id: 'data-collection',
            title: '2. Datos que Recopilamos',
            content: (
                <div className="space-y-4">
                    <h4 className="font-semibold text-blue-700">Información personal que podemos recopilar:</h4>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Nombre completo</li>
                        <li>Número de matrícula o identificación</li>
                        <li>Correo electrónico institucional</li>
                        <li>Información académica relevante</li>
                        <li>Datos de contacto</li>
                    </ul>
                    <p className="text-sm text-gray-500">Solo recopilamos datos necesarios para los fines educativos y administrativos de la institución.</p>
                </div>
            )
        },
        {
            id: 'data-use',
            title: '3. Uso de la Información',
            content: (
                <div className="space-y-4">
                    <p>La información recopilada se utiliza para:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Gestión de inscripciones a cursos de verano</li>
                        <li>Comunicación institucional</li>
                        <li>Procesos académicos y administrativos</li>
                        <li>Mejora de nuestros servicios educativos</li>
                        <li>Cumplimiento de obligaciones legales</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'data-protection',
            title: '4. Protección de Datos',
            content: (
                <div className="space-y-4">
                    <p>Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tus datos personales contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.</p>
                    <p>Entre estas medidas se incluyen:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Encriptación de datos sensibles</li>
                        <li>Control de acceso restringido</li>
                        <li>Protecciones contra software malicioso</li>
                        <li>Procedimientos para responder a incidentes de seguridad</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'rights',
            title: '5. Tus Derechos ARCO',
            content: (
                <div className="space-y-4">
                    <p>De acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, tienes derecho a:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Acceso:</strong> Conocer qué datos personales tenemos de ti</li>
                        <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos</li>
                        <li><strong>Cancelación:</strong> Pedir la eliminación de tus datos cuando ya no sean necesarios</li>
                        <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos para fines específicos</li>
                    </ul>
                    <p>Para ejercer estos derechos, envía una solicitud al correo: <span className="text-blue-600">proteccion.datos@teczacatepec.edu.mx</span></p>
                </div>
            )
        },
        {
            id: 'changes',
            title: '6. Cambios a esta Política',
            content: (
                <div className="space-y-4">
                    <p>Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio será publicado en esta plataforma y, si los cambios son significativos, te notificaremos por correo electrónico.</p>
                    <p className="text-sm text-gray-500">Última actualización: {new Date().toLocaleDateString('es-MX')}</p>
                </div>
            )
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Política de Privacidad</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600">
                        Conoce cómo protegemos y manejamos tu información personal en SummerTec
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {policySections.map((section) => (
                        <div key={section.id} className="border-b border-gray-200 last:border-b-0">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-blue-50 transition-colors duration-200"
                                aria-expanded={activeSections[section.id]}
                            >
                                <span className="text-lg font-semibold text-blue-800">{section.title}</span>
                                {activeSections[section.id] ? (
                                    <FaChevronDown className="text-blue-600" />
                                ) : (
                                    <FaChevronRight className="text-blue-600" />
                                )}
                            </button>
                            <div
                                className={`px-6 pb-4 pt-2 ${activeSections[section.id] ? 'block' : 'hidden'}`}
                                aria-hidden={!activeSections[section.id]}
                            >
                                <div className="text-gray-600">{section.content}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>Si tienes dudas sobre esta política, contacta a nuestro Oficial de Protección de Datos.</p>
                    <p className="mt-2">
                        <a href="mailto:proteccion.datos@teczacatepec.edu.mx" className="text-blue-600 hover:underline">
                            proteccion.datos@teczacatepec.edu.mx
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PrivacyPolicy;