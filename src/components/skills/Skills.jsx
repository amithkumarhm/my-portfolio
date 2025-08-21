// Skills.jsx
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    FaReact,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaJava,
    FaDocker,
    FaGitAlt,
    FaDatabase
} from 'react-icons/fa';
import {
    SiSpringboot,
    SiJenkins,
    SiApachecassandra,
    SiApachekafka,
    SiBootstrap,
    SiMysql
} from 'react-icons/si';
import './Skills.css';

const Skills = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    const skills = [
        { name: "ReactJS", category: "Frontend", icon: <FaReact className="skill-icon" /> },
        {
            name: "HTML/CSS",
            category: "Frontend",
            icon: (
                <div className="combined-icons">
                    <FaHtml5 className="skill-icon" />
                    <FaCss3Alt className="skill-icon" />
                </div>
            )
        },
        { name: "JavaScript", category: "Frontend", icon: <FaJs className="skill-icon" /> },
        { name: "Java", category: "Backend", icon: <FaJava className="skill-icon" /> },
        { name: "Spring Boot", category: "Backend", icon: <SiSpringboot className="skill-icon" /> },
        { name: "Jenkins", category: "DevOps", icon: <SiJenkins className="skill-icon" /> },
        { name: "Docker", category: "DevOps", icon: <FaDocker className="skill-icon" /> },
        { name: "MySQL", category: "Database", icon: <SiMysql className="skill-icon" /> },
        { name: "Cassandra", category: "Database", icon: <SiApachecassandra className="skill-icon" /> },
        { name: "Microservices", category: "Architecture", icon: <FaDatabase className="skill-icon" /> },
        { name: "Monolithic", category: "Architecture", icon: <FaDatabase className="skill-icon" /> },
        { name: "Apache Kafka", category: "Messaging", icon: <SiApachekafka className="skill-icon" /> },
        { name: "REST APIs", category: "Backend", icon: <FaDatabase className="skill-icon" /> },
        { name: "Spring Security", category: "Security", icon: <SiSpringboot className="skill-icon" /> },
        { name: "Bootstrap", category: "Frontend", icon: <SiBootstrap className="skill-icon" /> },
        { name: "Git & Github", category: "Version Control", icon: <FaGitAlt className="skill-icon" /> },
        { name: "CI/CD", category: "DevOps", icon: <SiJenkins className="skill-icon" /> }
    ];

    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    return (
        <section id="skills" className="skills-section" ref={ref}>
            <div className="skills-container">
                <motion.div
                    className="skills-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={controls}
                    variants={{
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                        hidden: { opacity: 0, y: -20 }
                    }}
                >
                    <h2>My Skills</h2>
                    <p>Technologies I work with</p>
                </motion.div>

                <div className="skills-grid">
                    {Object.entries(skillsByCategory).map(([category, skills], index) => (
                        <motion.div
                            key={category}
                            className="skill-category"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50 }}
                            animate={inView ? {
                                opacity: 1,
                                x: 0,
                                y: 0,
                                transition: {
                                    delay: index * 0.2,
                                    duration: 0.8,
                                    type: "spring",
                                    damping: 10,
                                    stiffness: 100
                                }
                            } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileHover={{
                                y: -10,
                                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
                                borderColor: "rgba(0, 170, 255, 0.3)"
                            }}
                        >
                            <h3>{category}</h3>
                            <div className="skills-list">
                                {skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skillIndex}
                                        className="skill-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.2 + skillIndex * 0.05
                                        }}
                                    >
                                        <div className="skill-content">
                                            {skill.icon}
                                            <span className="skill-name">{skill.name}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;