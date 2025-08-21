// Layout.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import bgImage from '../../assets/images/bg.jpg';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import LoadingSpinner from './LoadingSpinner';

const Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const particlesInit = async (main) => {
        await loadSlim(main);
    };

    useEffect(() => {
        // Total loading time: 4 words * 0.5s each = 2s
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* 🔹 Background Image Layer */}
            <div
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundColor: 'black',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    filter: 'blur(10px)',
                    backgroundSize: 'cover',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: -3,
                }}
            />

            {/* 🔹 Optional Dark Overlay for Contrast */}
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

            {/* 🔹 Particles Layer */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    fullScreen: { enable: true, zIndex: -1 },
                    background: { color: { value: 'transparent' } },
                    particles: {
                        number: { value: 120, density: { enable: true, area: 800 } },
                        color: { value: '#ffffff' },
                        links: {
                            enable: true,
                            color: '#ffffff',
                            distance: 120,
                            opacity: 0.6,
                            width: 1,
                        },
                        move: { enable: true, speed: 1.2 },
                        size: { value: 3 },
                        opacity: { value: 0.5 },
                    },
                    interactivity: {
                        events: {
                            onHover: { enable: true, mode: 'repulse' },
                            onClick: { enable: true, mode: 'push' },
                            resize: true,
                        },
                        modes: {
                            repulse: { distance: 100 },
                            push: { quantity: 4 },
                        },
                    },
                    detectRetina: true,
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