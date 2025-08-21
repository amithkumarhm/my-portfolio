import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Projects.css';

const Projects = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    const projects = [
        {
            title: "Book My Show Web Application",
            tools: "React.js, Java, Spring, MySQL",
            description: "A comprehensive movie booking application that allows users to browse movies, select seats, and book tickets online seamlessly.",
            responsibilities: [
                "Developed the front-end using React, delivering a responsive and user-friendly interface",
                "Integrated the backend with Java and Spring, implementing RESTful APIs",
                "Managed the database using MySQL, ensuring efficient data storage and retrieval",
                "Employed Spring Security for authentication and authorization"
            ]
        },
        {
            title: "PDAL QVC Microservices Migration",
            tools: "Java 17, Spring Boot 3, Cassandra, Docker, Kubernetes",
            description: "Migration of a flagship retail product from monolithic to Microservices architecture with Cassandra NoSQL backend for scalability.",
            responsibilities: [
                "Developed Spring Boot REST APIs using Spring Data JPA",
                "Containerized and orchestrated microservices using Docker and Kubernetes",
                "Optimized REST API performance using Apache JMeter",
                "Managed CI/CD pipelines on Jenkins and production deployments"
            ]
        },
        {
            title: "Cybersecurity Attack Detection",
            tools: "Python, Machine Learning, Jupyter Notebook",
            description: "Utilizing machine learning techniques to detect and analyze various cybersecurity attacks.",
            responsibilities: [
                "Cleaned and pre-processed cybersecurity datasets",
                "Developed and evaluated machine learning models for attack detection",
                "Conducted statistical analysis and created visual reports",
                "Used Matplotlib, Seaborn, and Pandas for data visualization"
            ]
        }
    ];

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    return (
        <section id="projects" className="projects-section" ref={ref}>
            <div className="projects-container">
                <motion.div
                    className="projects-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={controls}
                    variants={{
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                        hidden: { opacity: 0, y: -20 }
                    }}
                >
                    <h2>My Projects</h2>
                    <p>Some of my notable work</p>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card"
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
                            whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)" }}
                        >
                            <div className="project-content">
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
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;