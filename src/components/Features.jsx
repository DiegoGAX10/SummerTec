import React from 'react';
import { FaSearch, FaCalendarAlt, FaUsers, FaCheckCircle } from 'react-icons/fa';
import './Features.css';

const Features = () => {
    return (
        <section className="features-section">
            <div className="container">
                <div className="features-header">
                    <h2>Conoce los beneficios</h2>
                    <div className="arrow-down">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40 60L20 35L28 35L28 20L52 20L52 35L60 35L40 60Z" fill="#1d3a6c"/>
                        </svg>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaSearch />
                        </div>
                        <h3>Encuentra y Únete a un Grupo</h3>
                        <p>Explora los cursos de verano disponibles y regístrate en el que más te interese de manera rápida y sencilla.</p>
                    </div>

                    <div className="feature-card highlighted">
                        <div className="feature-icon">
                            <FaCalendarAlt />
                        </div>
                        <h3>Organiza tu Propio Grupo</h3>
                        <p>Crea y administra un grupo de verano, sugiere profesores y gestiona la inscripción de otros estudiantes.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaUsers />
                        </div>
                        <h3>Profesores en un Solo Lugar</h3>
                        <p>Consulta la lista de profesores disponibles, revisa su información y elige quién impartirá tu curso de verano.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaCheckCircle />
                        </div>
                        <h3>Validación Eficiente y Segura</h3>
                        <p>Los administradores validan que los estudiantes y profesores interactúen de manera eficiente, asegurando la calidad académica.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;