import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import './Footer.css';
import {FaX} from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section about">
                        <h3>Summer Tec</h3>
                        <p>
                            SummerTec es una plataforma diseñada para facilitar la gestión de cursos de verano del
                            Tecnológico de Zacatepec. Su objetivo principal es brindar una experiencia sencilla,
                            organizada y eficiente tanto para estudiantes como para docentes.
                        </p>

                        <div className="social-icons">
                            <a href="https://www.facebook.com" className="social-icon" target="_blank"
                               rel="noopener noreferrer">
                                <FaFacebook/>
                            </a>
                            <a href="https://www.x.com" className="social-icon">
                                <FaX/>
                            </a>
                            <a href="https://www.instagram.com" className="social-icon">
                                <FaInstagram/>
                            </a>
                        </div>
                    </div>

                    <div className="footer-section links">
                        <h3>Useful Links</h3>
                        <ul>
                            <li><a href="#">Sobre nosotros</a></li>
                            <li><a href="#">Politica de Privacidad</a></li>
                            <li><a href="#">Nuestra Mision</a></li>
                            <li><a href="#">Nuestro Equipo</a></li>
                        </ul>
                    </div>

                    <div className="footer-section address">
                        <h3>Ubicacion</h3>
                        <div className="map-container">
                            <iframe
                                title="Google Map Location"
                                className="map-image"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.7069904699866!2d-99.18822652473533!3d18.681037066991134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce7d18825b5691%3A0x87d826b1a9ae8e87!2sTecnol%C3%B3gico%2027%2C%20Plan%20de%20Ayala%2C%2062780%20Zacatepec%20de%20Hidalgo%2C%20Mor.!5e0!3m2!1ses-419!2smx!4v1710338013767!5m2!1ses-419!2smx"
                                width="100%"
                                height="300"
                                style={{border: 0}}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy;2024 All Right Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;