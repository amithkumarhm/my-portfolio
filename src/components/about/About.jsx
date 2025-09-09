import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [titleText, setTitleText] = useState('');
    const [aboutText1, setAboutText1] = useState('');
    const [aboutText2, setAboutText2] = useState('');
    const [showButtons, setShowButtons] = useState(false);

    const fullTitle = "About Me...";
    const fullText1 = "I'm Amith Kumar H M, a passionate and results-driven Full Stack Developer from K R Pete, Mandya District, Karnataka, India. I hold a Bachelor's degree in Computer Science and Engineering from Navkis College of Engineering, Hassan. Alongside my professional career, I've also worked as a freelancer, gaining practical experience across different projects and client needs.";
    const fullText2 = "In addition to coding, I'm a dedicated sportsman with a strong interest in badminton, which keeps me active, focused, and motivated.";

    useEffect(() => {
        if (inView) {
            // Animate title
            let i = 0;
            const titleInterval = setInterval(() => {
                setTitleText(fullTitle.substring(0, i));
                i++;
                if (i > fullTitle.length) {
                    clearInterval(titleInterval);
                    // Start first paragraph after title completes
                    animateParagraph(fullText1, setAboutText1, () => {
                        // Start second paragraph after first completes
                        animateParagraph(fullText2, setAboutText2, () => {
                            setShowButtons(true);
                        });
                    });
                }
            }, 60);
        }
    }, [inView]);

    const animateParagraph = (text, setText, callback) => {
        let j = 0;
        const interval = setInterval(() => {
            setText(text.substring(0, j));
            j++;
            if (j > text.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 15);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/resume/Amith Kumar H M - CV (PDF).pdf';
        link.download = 'Amith Kumar H M - CV (PDF).pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="about" className="about-section" ref={ref}>
            <motion.div
                className="about-container"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <motion.h2
                    className="about-heading"
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1, duration: 0.6 }}
                >
                    {titleText}
                    {titleText.length < fullTitle.length && (
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="cursor"
                        >
                            |
                        </motion.span>
                    )}
                </motion.h2>

                <div className="about-content">
                    <motion.p
                        className="about-text"
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {aboutText1}
                        {aboutText1.length < fullText1.length && (
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="cursor"
                            >
                                |
                            </motion.span>
                        )}
                    </motion.p>

                    <motion.p
                        className="about-text"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        {aboutText2}
                        {aboutText2.length < fullText2.length && (
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="cursor"
                            >
                                |
                            </motion.span>
                        )}
                    </motion.p>
                </div>

                {showButtons && (
                    <motion.div
                        className="action-buttons"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <motion.button
                            onClick={handleDownload}
                            className="resume-button"
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 5px 15px rgba(0, 170, 255, 0.3)",
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Download CV
                        </motion.button>
                        <motion.a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=amithkumarhm10@gmail.com&su=SUBJECT&body=BODY"
                            target="_blank"
                            rel="noopener"
                            className="hire-button"
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 5px 15px rgba(255, 71, 87, 0.3)",
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Contact me!
                        </motion.a>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default About;