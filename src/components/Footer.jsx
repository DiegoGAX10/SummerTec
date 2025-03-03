import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section about">
                        <h3>Summer Tec</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec risus feugiat lectus risus sed ullamcorper. Auctor semper fermentum.
                        </p>
                        <p>
                            volutpat integer vel. In rhoncus elementum nunc, malesuada mi sed. Nibh est sit lobortis id semper.
                        </p>
                        <div className="social-icons">
                            <a href="#" className="social-icon">
                                <FaFacebook />
                            </a>
                            <a href="#" className="social-icon">
                                <FaTwitter />
                            </a>
                            <a href="#" className="social-icon">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section links">
                        <h3>Useful Links</h3>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Our Mission</a></li>
                            <li><a href="#">Our Team</a></li>
                        </ul>
                    </div>

                    <div className="footer-section address">
                        <h3>Address</h3>
                        <div className="map-container">
                            <img
                                alt="Mapa de ubicación"
                                className="map-image"
                            />
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