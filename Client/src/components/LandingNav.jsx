import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LandingNav = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isNavLinkActive = (path) => {
        return location.pathname === path;
    };

    const renderDesktopNav = () => (
        <div className="container mx-auto flex justify-between items-center p-4">
            <img src="../images/FlexLogo.png" alt="Logo" className='object-scale-down h-16' />
            <ul className="flex space-x-8 items-center">
                <li className={`text-white ${isNavLinkActive('/') ? 'underline underline-offset-8 decoration-orange-500 decoration-4 font-bold' : 'hover:text-gray-300'}`}>
                    <Link to="/">Home</Link>
                </li>
                <li className={`text-white ${isNavLinkActive('/about') ? 'underline underline-offset-8 decoration-orange-500 decoration-4 font-bold' : 'hover:text-gray-300'}`}>
                    <Link to="/about">About</Link>
                </li>
                <li className={`text-white ${isNavLinkActive('/contact') ? 'underline underline-offset-8 decoration-orange-500 decoration-4 font-bold' : 'hover:text-gray-300'}`}>
                    <Link to="/contact">Contact</Link>
                </li>
                <li className={`text-white ${isNavLinkActive('/login') ? 'underline underline-offset-8 decoration-orange-500 decoration-4 font-bold' : 'hover:text-gray-300'}`}>
                    <Link to="/login">Login</Link>
                </li>
                <li className={`text-white ${isNavLinkActive('/signup') ? 'underline underline-offset-8 decoration-orange-500 decoration-4 font-bold' : 'hover:text-gray-300'}`}>
                    <Link to="/signup">Signup</Link>
                </li>
            </ul>
        </div>
    );

    const renderMobileNav = () => (
        <div className="flex items-center p-4">
            <button className="text-white text-3xl hover:text-gray-300" onClick={toggleMenu}>
                ☰
            </button>
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="flex items-start h-full">
                        <div className="bg-zinc-900 h-screen w-48 p-8">
                            <button className="text-white text-2xl hover:text-gray-300" onClick={toggleMenu}>
                                ✕
                            </button>
                            <ul className="mt-6 ml-4 space-y-5">
                                <li className={`text-white ${isNavLinkActive('/') ? 'underline underline-offset-8 decoration-orange-500 decoration-4 font-bold' : 'hover:text-gray-300'}`}>
                                    <Link to="/" onClick={toggleMenu}>Home</Link>
                                </li>
                                <li className={`text-white ${isNavLinkActive('/about') ? 'underline underline-offset-8 decoration-orange-500 decoration-4 font-bold' : 'hover:text-gray-300'}`}>
                                    <Link to="/about" onClick={toggleMenu}>About</Link>
                                </li>
                                <li className={`text-white ${isNavLinkActive('/contact') ? 'underline underline-offset-8 decoration-orange-500 decoration-4 font-bold' : 'hover:text-gray-300'}`}>
                                    <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                                </li>
                                <li className={`text-white ${isNavLinkActive('/login') ? 'underline underline-offset-8 decoration-orange-500 decoration-4 font-bold' : 'hover:text-gray-300'}`}>
                                    <Link to="/login" onClick={toggleMenu}>Login</Link>
                                </li>
                                <li className={`text-white ${isNavLinkActive('/signup') ? 'underline underline-offset-8 decoration-orange-500 decoration-4 font-bold' : 'hover:text-gray-300'}`}>
                                    <Link to="/signup" onClick={toggleMenu}>Signup</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <nav className="absolute top-0 left-0 right-0 bg-transparent z-50">
                {isMobile ? renderMobileNav() : renderDesktopNav()}
        </nav>
    );
};

export default LandingNav;


