import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './LoadingSpinner.css';
import bgImage from '../../assets/images/bg.jpg';

const LoadingSpinner = () => {
    const words = ["Hello", "Welcome", "to my", "Portfolio..."];
    const [currentWordIndex, setCurrentWordIndex] = useState(-1);
    const [showSpinner, setShowSpinner] = useState(true);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let idx = -1;
        const revealNext = () => {
            idx += 1;
            setCurrentWordIndex(idx);
            if (idx >= words.length - 1) {
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(() => setShowSpinner(false), 600);
                }, 900);
            }
        };

        const initialTimer = setTimeout(revealNext, 200);
        const interval = setInterval(() => {
            if (idx < words.length - 1) revealNext();
            if (idx >= words.length - 1) clearInterval(interval);
        }, 900);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    if (!showSpinner) return null;

    return (
        <motion.div
            className="loading-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: isComplete ? 0 : 1 }}
            transition={{ duration: 0.55 }}
        >
            <div className="loading-bg" style={{ backgroundImage: `url(${bgImage})` }} />
            <div className="loading-overlay-dark" />

            <div className="loading-content">
                <div className="words-stack">
                    {words.map((word, index) => {
                        const visible = index <= currentWordIndex;
                        return (
                            <motion.div
                                key={index}
                                className="word-line"
                                initial={{ opacity: 0, x: -120 }}
                                animate={visible ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            >
                                {word}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="horizontal-loader-container">
                    <motion.div
                        className="horizontal-loader"
                        animate={{
                            left: ["0%", "100%"] // Move from left to right and back
                        }}
                        transition={{
                            repeat: Infinity, // Infinite loop
                            duration: 0.8, // Speed of animation
                            ease: "easeInOut",
                            times: [0, 0.5, 0] // Time distribution for each keyframe
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingSpinner;