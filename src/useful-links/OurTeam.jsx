import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'swiper/css';
import 'swiper/css/pagination';
// Team member data
const teamMembers = [
    {
        id: 1,
        name: 'Dr. Alejandro Martínez',
        title: 'Director Académico',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        description: 'Lidera la estrategia educativa de SummerTec con más de 15 años de experiencia en innovación académica.',
        social: {
            linkedin: '#',
            twitter: '#',
            email: 'alejandro.martinez@teczacatepec.edu.mx'
        }
    },
    {
        id: 2,
        name: 'Ing. Sofía Ramírez',
        title: 'Desarrolladora Principal',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        description: 'Arquitecta de software con especialización en plataformas educativas y experiencia de usuario.',
        social: {
            linkedin: '#',
            github: '#',
            email: 'sofia.ramirez@teczacatepec.edu.mx'
        }
    },
    {
        id: 3,
        name: 'Lic. Carlos Jiménez',
        title: 'Diseñador UX/UI',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        description: 'Especialista en diseño centrado en el usuario y sistemas de diseño para educación digital.',
        social: {
            linkedin: '#',
            twitter: '#',
            email: 'carlos.jimenez@teczacatepec.edu.mx'
        }
    },
    {
        id: 4,
        name: 'Mtro. Daniela López',
        title: 'Coordinadora Académica',
        image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        description: 'Gestiona la integración de los cursos de verano y la experiencia docente en la plataforma.',
        social: {
            linkedin: '#',
            email: 'daniela.lopez@teczacatepec.edu.mx'
        }
    }
];

// Team Card Component
const TeamCard = ({ member }) => {
    return (
        <div className="my-2 px-2 h-full">
            {/* Main Card - flex-col and h-full ensure card stretches properly */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 flex flex-col h-full">
                {/* Image container with fixed aspect ratio (3:4 for portrait) */}
                <div className="relative h-64 w-full overflow-hidden"> {/* Fixed height, full width */}
                    <img
                        src={member.image}
                        alt={member.name}
                        className="" /* object-cover maintains aspect ratio */
                        style={{ objectPosition: 'top center' }} /* Focus on faces */
                    />
                </div>

                {/* Content section */}
                <div className="p-4 md:p-6 flex-1 flex flex-col">
                    <div className="mb-3 md:mb-4">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800">{member.name}</h3>
                        <p className="text-blue-600 text-sm md:text-base font-medium">{member.title}</p>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 flex-1">
                        {member.description}
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-3">
                        {member.social.linkedin && (
                            <a href={member.social.linkedin} className="text-blue-700 hover:text-blue-900 transition-colors">
                                <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                        )}
                        {member.social.twitter && (
                            <a href={member.social.twitter} className="text-blue-400 hover:text-blue-600 transition-colors">
                                <FaTwitter className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                        )}
                        {member.social.github && (
                            <a href={member.social.github} className="text-gray-700 hover:text-black transition-colors">
                                <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                        )}
                        <a href={`mailto:${member.social.email}`} className="text-gray-500 hover:text-blue-600 transition-colors">
                            <FaEnvelope className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Component
const OurTeam = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Conoce a Nuestro Equipo</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        El talento y dedicación detrás de SummerTec, comprometidos con transformar tu experiencia educativa
                    </p>
                </div>

                {/* Team Carousel */}
                <div className=" p-4">
                    <Slider
dots={true}
                        infinite={false}
                        speed={500}
                        slidesToShow={3} // Show 3 cards at a time
                        slidesToScroll={1}
                        responsive={[
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 2,
                                }
                            },
                            {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 1,
                                }
                            }
                        ]}
                    >
                        {teamMembers.map(member => (
                            <div key={member.id} className="px-2"> {/* Add padding between slides */}
                                <TeamCard member={member} />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-semibold text-blue-800 mb-4">¿Quieres unirte a nuestro equipo?</h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Siempre estamos buscando talento apasionado por la educación y la tecnología. Envíanos tu CV y cuéntanos cómo puedes contribuir.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
                            Contactar al equipo de RH
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurTeam;