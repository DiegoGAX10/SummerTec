import Hero from "./Hero.jsx";
import Header from "./Header.jsx";
import Features from "./Features.jsx";
import Footer from "./Footer.jsx";
import React from "react";

export default function Landing() {
    return (
        <div>
            <Header/>
            <main>
                <Hero/>
                <Features/>
                {/* Se pueden agregar más secciones aquí */}
            </main>
            <Footer/>
        </div>
    )
        ;
}