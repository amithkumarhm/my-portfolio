// Stats.jsx
import React, { useEffect, useState } from 'react';
import './Stats.css';

const targetCounts = {
    years: 2,
    projects: 10,
    tech: 10,
    clients: 10
};

const Stats = ({ inView }) => {
    const [counts, setCounts] = useState({ years: 0, projects: 0, tech: 0, clients: 0 });

    useEffect(() => {
        if (!inView) return;

        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        const increment = targetCounts.years / (duration / 16);

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setCounts({
                years: Math.floor(progress * targetCounts.years),
                projects: Math.floor(progress * targetCounts.projects),
                tech: Math.floor(progress * targetCounts.tech),
                clients: Math.floor(progress * targetCounts.clients)
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [inView]);

    return (
        <div className="hero-stats">
            <div>
                <h3>{counts.years}+</h3>
                <p>Years of experience</p>
            </div>
            <div>
                <h3>{counts.projects}+</h3>
                <p>Projects completed</p>
            </div>
            <div>
                <h3>{counts.tech}+</h3>
                <p>Technologies mastered</p>
            </div>
            <div>
                <h3>{counts.clients}+</h3>
                <p>Satisfied Clients</p>
            </div>
        </div>
    );
};

export default Stats;