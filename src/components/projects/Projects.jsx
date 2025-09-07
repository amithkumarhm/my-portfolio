import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [flippedCards, setFlippedCards] = useState({});

    const projects = [
        {
            title: "Cyber Attack Detection",
            tools: "Python, Machine Learning, Jupyter Notebook",
            description: "Utilizing machine learning techniques to detect and analyze various cybersecurity attacks.",
            responsibilities: [
                "Cleaned and pre-processed cybersecurity datasets",
                "Developed and evaluated machine learning models for attack detection",
                "Conducted statistical analysis and created visual reports",
                "Used Matplotlib, Seaborn, and Pandas for data visualization"
            ],
            githubUrl: "https://github.com/yourusername/cybersecurity-ml",
            liveUrl: "https://your-cybersecurity-demo.com",
            image: "https://images.unsplash.com/photo-1544890225-2f3faec4cd60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Book My Show Web App",
            tools: "React.js, Java, Spring, MySQL",
            description: "A comprehensive movie booking application that allows users to browse movies, select seats, and book tickets online seamlessly.",
            responsibilities: [
                "Developed the front-end using React, delivering a responsive and user-friendly interface",
                "Integrated the backend with Java and Spring, implementing RESTful APIs",
                "Managed the database using MySQL, ensuring efficient data storage and retrieval",
                "Employed Spring Security for authentication and authorization"
            ],
            githubUrl: "https://github.com/yourusername/book-my-show",
            liveUrl: "https://your-bookmyshow-demo.com",
            image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "QVC",
            tools: "Java 17, Spring Boot 3, Cassandra, Docker, Kubernetes",
            description: "Migration of a flagship retail product from monolithic to Microservices architecture with Cassandra NoSQL backend for scalability.",
            responsibilities: [
                "Developed Spring Boot REST APIs using Spring Data JPA",
                "Containerized and orchestrated microservices using Docker and Kubernetes",
                "Optimized REST API performance using Apache JMeter",
                "Managed CI/CD pipelines on Jenkins and production deployments"
            ],
            githubUrl: "https://github.com/yourusername/pdal-migration",
            liveUrl: "https://your-pdal-demo.com",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }

    ];

    const handleCardClick = (index, side) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleCardFlip = (index) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <section id="projects" className="projects-section" ref={ref}>
            <div className="projects-container">
                <motion.div
                    className="projects-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <h2>My Projects</h2>
                    <p>Some of my notable work</p>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card-container"
                            onClick={(e) => {
                                // Check if click is on buttons (they'll handle their own logic)
                                if (!e.target.closest('.project-button')) {
                                    handleCardFlip(index);
                                }
                            }}
                        >
                            <motion.div
                                className="project-card"
                                initial={{ opacity: 0, y: 50 }}
                                animate={inView ? {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        delay: index * 0.2,
                                        duration: 0.8,
                                        type: "spring",
                                        damping: 10,
                                        stiffness: 100
                                    }
                                } : {}}
                                whileHover={{
                                    rotateY: flippedCards[index] ? 0 : 5,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className={`card-inner ${flippedCards[index] ? 'flipped' : ''}`}>
                                    {/* Front of the card */}
                                    <div className="card-front">
                                        <div
                                            className="project-image"
                                            style={{
                                                backgroundImage: `url(${project.image})`
                                            }}
                                        >
                                            <div className="project-overlay">
                                                <h3>{project.title}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back of the card */}
                                    <div className="card-back">
                                        <div className="project-details">
                                            <h3>{project.title}</h3>
                                            <div className="project-tools">
                                                <span>Tools:</span> {project.tools}
                                            </div>
                                            <p className="project-description">{project.description}</p>
                                            <div className="project-responsibilities">
                                                <h4>Key Contributions:</h4>
                                                <ul>
                                                    {project.responsibilities.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="project-buttons">
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-button"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <FaGithub /> Source Code
                                                </a>
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-button"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <FaExternalLinkAlt /> Live Demo
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;