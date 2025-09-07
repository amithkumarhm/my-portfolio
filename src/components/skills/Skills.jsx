import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Skills.css';

const Skills = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    const skills = [
        {
            name: "HTML",
            icon: "/src/assets/logos/html.png",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
            color: "#E34F26"
        },
        {
            name: "CSS",
            icon: "/src/assets/logos/css.png",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
            color: "#1572B6"
        },
        {
            name: "Bootstrap CSS",
            icon: "/src/assets/logos/bootstrap_css.png",
            url: "https://getbootstrap.com/",
            color: "#7952B3"
        },
        {
            name: "JavaScript",
            icon: "/src/assets/logos/javascript.png",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            color: "#F7DF1E"
        },
        {
            name: "ReactJS",
            icon: "/src/assets/logos/reactjs.png",
            url: "https://reactjs.org/",
            color: "#61DAFB"
        },
        {
            name: "Python",
            icon: "/src/assets/logos/python.png",
            url: "https://www.python.org/",
            color: "#3776AB"
        },
        {
            name: "Java",
            icon: "/src/assets/logos/java.png",
            url: "https://www.java.com/",
            color: "#007396"
        },
        {
            name: "Spring Framework",
            icon: "/src/assets/logos/spring_framework.png",
            url: "https://spring.io/",
            color: "#6DB33F"
        },
        {
            name: "REST APIs",
            icon: "/src/assets/logos/restapi.png",
            url: "https://restfulapi.net/",
            color: "#FF6B6B"
        },
        {
            name: "Jenkins",
            icon: "/src/assets/logos/jenkins.png",
            url: "https://www.jenkins.io/",
            color: "#D24939"
        },
        {
            name: "Docker",
            icon: "/src/assets/logos/docker.png",
            url: "https://www.docker.com/",
            color: "#2496ED"
        },
        {
            name: "DevOps",
            icon: "/src/assets/logos/devops.png",
            url: "https://aws.amazon.com/devops/what-is-devops/",
            color: "#FF6B6B"
        },
        {
            name: "MySQL",
            icon: "/src/assets/logos/mysql.png",
            url: "https://www.mysql.com/",
            color: "#4479A1"
        },
        {
            name: "Cassandra",
            icon: "/src/assets/logos/cassandra.png",
            url: "https://cassandra.apache.org/",
            color: "#1287B1"
        },
        {
            name: "Microservices",
            icon: "/src/assets/logos/microservices.png",
            url: "https://microservices.io/",
            color: "#FF9E0F"
        },
        {
            name: "Apache Kafka",
            icon: "/src/assets/logos/apache_kafka.png",
            url: "https://kafka.apache.org/",
            color: "#231F20"
        },
        {
            name: "GitHub",
            icon: "/src/assets/logos/github.png",
            url: "https://github.com/",
            color: "#181717"
        },
        {
            name: "Git",
            icon: "/src/assets/logos/git.png",
            url: "https://git-scm.com/",
            color: "#F05032"
        },
        {
            name: "Maven",
            icon: "/src/assets/logos/maven.png",
            url: "https://maven.apache.org/",
            color: "#C71A36"
        },
        {
            name: "Kubernetes",
            icon: "/src/assets/logos/kubernetes.png",
            url: "https://kubernetes.io/",
            color: "#326CE5"
        },
        {
            name: "AWS",
            icon: "/src/assets/logos/aws.png",
            url: "https://aws.amazon.com/",
            color: "#FF9900"
        }
    ];

    // Arrange skills in inverted triangle pattern (4 rows)
    const rowCounts = [6, 6, 5, 5]; // Number of icons in each row
    const skillRows = [];

    let skillIndex = 0;
    for (let i = 0; i < rowCounts.length; i++) {
        const rowSkills = [];
        for (let j = 0; j < rowCounts[i] && skillIndex < skills.length; j++) {
            rowSkills.push(skills[skillIndex]);
            skillIndex++;
        }
        skillRows.push(rowSkills);
    }

    const handleSkillClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <section id="skills" className="skills-section" ref={ref}>
            <div className="skills-container">
                <motion.div
                    className="skills-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <h2>My Skills</h2>
                    <p>Technologies I work with</p>
                </motion.div>

                <div className="skills-pyramid">
                    {skillRows.map((row, rowIndex) => (
                        <motion.div
                            key={rowIndex}
                            className="skill-row"
                            initial={{ opacity: 0, y: -50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: rowIndex * 0.1, duration: 0.5 }}
                        >
                            {row.map((skill, skillIndex) => (
                                <motion.div
                                    key={skillIndex}
                                    className="skill-item-container"
                                    whileHover={{ scale: 1.2, y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="skill-tooltip">{skill.name}</div>
                                    <motion.div
                                        className="skill-icon-wrapper"
                                        onClick={() => handleSkillClick(skill.url)}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{
                                            delay: rowIndex * 0.1 + skillIndex * 0.05,
                                            duration: 0.5
                                        }}
                                        whileHover={{
                                            scale: 1.2,
                                            boxShadow: `0 0 15px ${skill.color}`
                                        }}
                                    >
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            className="skill-icon-img"
                                        />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;