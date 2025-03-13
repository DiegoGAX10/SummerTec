import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';
import logoImage from '../assets/Summer-tec.svg';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Buscando:', searchTerm);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="header">
            <div className="container header-container">
                {/* Logo */}
                <div className="logo-container">
                    <img src={logoImage} alt="SummerTec Logo" className="logo" />
                </div>

                {/* Mobile Menu Toggle */}
                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Navegación para escritorio y móvil */}
                <div className={`nav-container ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    {/* Buscador */}
                    <form className="search-form" onSubmit={handleSearchSubmit}>
                        <div className="search-container">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Busca un grupo"
                                className="search-input"
                            />
                            <button type="submit" className="search-button">
                                <FaSearch className="search-icon" />
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </header>
    );
};

export default Header;