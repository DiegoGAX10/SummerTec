import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import Inicio from './students/inicio/Inicio.jsx'; // Import the new page component
import SolicitarGrupo from "./students/solicitar_grupo/SolicitarGrupo.jsx";
import Notificaciones from "./students/notificaciones/Notificaciones.jsx";






function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Hero />
                                <Features />
                            </>
                        } />
                        <Route path="/home-page" element={<Inicio/>} />



                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;