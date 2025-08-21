import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    // Close mobile menu on window resize if width >= 992px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992 && menuOpen) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [menuOpen]);

    return (
        <nav className="navbar navbar-expand-lg fixed-top transparent-navbar">
            <div className="container">
                <a className="navbar-brand text-white fw-bold fs-3" href="#">
                    Mr. AK
                </a>
                <button
                    className="navbar-toggler custom-toggler"
                    type="button"
                    onClick={toggleMenu}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Desktop Menu */}
                <div className="collapse navbar-collapse d-none d-lg-flex justify-content-end">
                    <ul className="navbar-nav">
                        {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                            <li className="nav-item" key={index}>
                                <a className="nav-link nav-animate text-white mx-3" href={`#${item.toLowerCase()}`}>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Fullscreen Menu */}
                {menuOpen && (
                    <div className="mobile-center-menu">
                        <ul className="navbar-nav">
                            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                                <li className="nav-item" key={index}>
                                    <a
                                        className="nav-link nav-animate text-white"
                                        href={`#${item.toLowerCase()}`}
                                        onClick={closeMenu}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
