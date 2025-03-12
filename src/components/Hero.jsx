import React from 'react';
import './Hero.css';
import heroImage from '../assets/tec.jpg';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-overlay">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Gestión Inteligente para
                            <span className="hero-subtitle">Grupos de Verano</span>
                        </h1>
                        <p className="hero-description">
                            Un sistema diseñado para facilitar la inscripción,
                            administración y validación de grupos de verano en el
                            Tecnológico de Zacatepec
                        </p>
                        <button className="cta-button">
                            <a href="/register">Comienza ahora</a>
                            </button>
                    </div>
                </div>
            </div>
            <div className="hero-image-container">
                <img src={heroImage} alt="Instituto Tecnológico de Zacatepec" className="hero-image" />
            </div>
        </section>
    );
};

export default Hero;