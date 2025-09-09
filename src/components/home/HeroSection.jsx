import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './HeroSection.css';
import profileImage from '../../assets/images/profileImage1.png';
import Stats from './Stats';

const roles = [
    "I'm a Fullstack Developer",
    "I'm also a Photographer",
    "I'm a Sportsman"
];

const HeroSection = () => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    // Memoized typing effect
    const typeText = useCallback(() => {
        if (!inView) return;

        const typingSpeed = isDeleting ? 50 : 100;
        const fullText = roles[currentRoleIndex];

        const type = setTimeout(() => {
            setTypedText(prev =>
                isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
            );

            if (!isDeleting && typedText === fullText) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && typedText === '') {
                setIsDeleting(false);
                setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            }
        }, typingSpeed);

        return () => clearTimeout(type);
    }, [typedText, isDeleting, currentRoleIndex, inView]);

    useEffect(() => {
        typeText();
    }, [typeText]);

    return (
        <section id="home" className="hero-section" ref={ref}>
            <motion.div
                className="hero-content-container"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7 }}
            >
                <div className="hero-left">
                    <motion.img
                        src={profileImage}
                        alt="Profile"
                        className="profile-image"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        loading="eager"
                    />
                </div>

                <div className="hero-right">
                    <div className="hero-content">
                        <motion.h4
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1, duration: 0.4 }}
                        >
                            Hello :)
                        </motion.h4>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            I'm, Amith Kumar H M
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            style={{ minHeight: '3rem' }}
                        >
                            <span className="typing-text">{typedText}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.4 }}
                        >
                            I believe in writing clean, maintainable code and collaborating effectively with cross-functional teams. I take pride in being a fast learner, a team player, and someone who remains calm and focused under pressure.
                        </motion.p>
                    </div>

                    <Stats inView={inView} />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;