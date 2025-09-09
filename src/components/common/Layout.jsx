import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import LoadingSpinner from './LoadingSpinner';
import { useTheme } from './ThemeContext';

const Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const { isDarkMode } = useTheme();

    const particlesInit = useCallback(async (main) => {
        await loadSlim(main);
    }, []);

    useEffect(() => {
        // Simulate content loading
        const timer = setTimeout(() => {
            setIsContentLoaded(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isContentLoaded) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 3450);
            return () => clearTimeout(timer);
        }
    }, [isContentLoaded]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Dark Overlay for Contrast */}
            <div
                style={{
                    backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.73)' : 'rgba(255, 255, 255, 0.9)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -2,
                }}
            />

            {/* Particles Layer - Optimized for performance */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    fullScreen: { enable: false, zIndex: -1 },
                    background: { color: { value: 'transparent' } },
                    fpsLimit: 30,
                    particles: {
                        number: {
                            value: window.innerWidth > 768 ? 50 : 30,
                            density: {
                                enable: true,
                                area: 800,
                            }
                        },
                        color: { value: isDarkMode ? '#ffffff' : '#000000' },
                        links: {
                            enable: window.innerWidth > 768,
                            color: isDarkMode ? '#ffffff' : '#000000',
                            distance: 150,
                            opacity: 0.4,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 0.5,
                            outModes: {
                                default: "out"
                            }
                        },
                        size: { value: 2 },
                        opacity: { value: 0.2 },
                    },
                    interactivity: {
                        events: {
                            onHover: {
                                enable: window.innerWidth > 768,
                                mode: 'grab',
                            },
                            onClick: { enable: false },
                            resize: true,
                        },
                        modes: {
                            grab: { distance: 100 },
                        },
                    },
                    detectRetina: true,
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

            {/* Content Layer */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Header />
                <main>{children}</main>
                <Footer id="contact" />
            </div>
        </div>
    );
};

export default Layout;