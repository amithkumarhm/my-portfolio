import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Footer.css';
import ScrollToTop from './ScrollToTop';

const Footer = ({ id }) => {
    return (
        <footer id={id} className="footer">
            <div className="footer-content">
                <motion.div
                    className="footer-heading"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Let's Build Something Together</h2>
                </motion.div>

                <motion.div
                    className="social-links"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="social-icons">
                        <motion.a
                            href="https://www.linkedin.com/in/amith-kumar-h-m-0b63532b2/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaLinkedin className="icon linkedin" />
                        </motion.a>
                        <motion.a
                            href="https://github.com/amithkumarhm"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaGithub className="icon github" />
                        </motion.a>
                        <motion.a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=amithkumarhm10@gmail.com&su=SUBJECT&body=BODY"
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaEnvelope className="icon email" />
                        </motion.a>
                        <motion.a
                            href="https://www.instagram.com/photography.byamith/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaInstagram className="icon instagram" />
                        </motion.a>
                        <motion.a
                            href="https://www.facebook.com/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaFacebook className="icon facebook" />
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div
                    className="copyright"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <p>© {new Date().getFullYear()} Amith Kumar H M. All rights reserved.</p>
                </motion.div>
            </div>
            <ScrollToTop />
        </footer>
    );
};

export default Footer;