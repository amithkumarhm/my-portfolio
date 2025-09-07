import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import bgImage from '../../assets/images/bg.jpg';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import LoadingSpinner from './LoadingSpinner';

const Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    const particlesInit = useCallback(async (main) => {
        await loadSlim(main);
    }, []);

    useEffect(() => {
        // Preload background image and wait for content to load
        const img = new Image();
        img.src = bgImage;
        img.onload = () => {
            // Simulate content loading
            setTimeout(() => {
                setIsContentLoaded(true);
            }, 1000);
        };
    }, []);

    useEffect(() => {
        if (isContentLoaded) {
            // Add a small delay for smooth transition
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [isContentLoaded]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* 🔹 Background Image Layer - Optimized for performance */}
            <div
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundColor: 'black',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: -3,
                    filter: "blur(2px)",
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                }}
            />

            {/* 🔹 Dark Overlay for Contrast */}
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.73)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -2,
                }}
            />

            {/* 🔹 Particles Layer - Reduced for mobile performance */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    fullScreen: { enable: false, zIndex: -1 },
                    background: { color: { value: 'transparent' } },
                    particles: {
                        number: {
                            value: 75, // Reduced for mobile
                            density: {
                                enable: true,
                                area: 600,
                            }
                        },
                        color: { value: '#ffffff' },
                        links: {
                            enable: window.innerWidth > 768, // Disable links on mobile
                            color: '#ffffff',
                            distance: 120,
                            opacity: 0.4,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 0.6, // Slower for better performance
                            outModes: {
                                default: "out"
                            }
                        },
                        size: { value: 2 },
                        opacity: { value: 0.3 },
                    },
                    interactivity: {
                        events: {
                            onHover: {
                                enable: window.innerWidth > 768, // Disable on mobile
                                mode: 'repulse',
                            },
                            onClick: { enable: false }, // Disable click for performance
                            resize: true,
                        },
                        modes: {
                            repulse: { distance: 60 },
                        },
                    },
                    detectRetina: true,
                    responsive: [
                        {
                            maxWidth: 768,
                            options: {
                                particles: {
                                    number: {
                                        value: 50 // Very few particles on mobile
                                    },
                                    move: {
                                        speed: 0.3 // Slower on mobile
                                    }
                                }
                            }
                        }
                    ]
                }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1
                }}
            />

            {/* 🔹 Content Layer */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Header />
                <main>{children}</main>
                <Footer id="contact" />
            </div>
        </div>
    );
};

export default Layout;