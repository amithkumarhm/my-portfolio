// LoadingSpinner.jsx
import React, { useState, useEffect } from 'react';
import './LoadingSpinner.css';
import bgImage from '../../assets/images/bg.jpg';

const LoadingSpinner = () => {
    const words = ["Hello!", "Welcome", "to my", "Portfolio"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        // Display each word for 0.5 seconds
        const wordInterval = setInterval(() => {
            setCurrentWordIndex((prev) => {
                if (prev >= words.length - 1) {
                    clearInterval(wordInterval);
                    setShowSpinner(false);
                    return prev;
                }
                return prev + 1;
            });
        }, 500);

        return () => clearInterval(wordInterval);
    }, []);

    if (!showSpinner) {
        return null;
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Background Image Layer with Blur */}
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
                    zIndex: -1,
                }}
            />

            {/* Dark Overlay */}
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.73)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                }}
            />

            {/* Loading Content */}
            <div className="loading-overlay">
                <div className="loading-content">
                    <div className="word-display">
                        {words[currentWordIndex]}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;