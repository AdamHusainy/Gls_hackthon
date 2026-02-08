import React from 'react';
import './Footer.css';
import { FaYoutube, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer-wrapper">
            <div className="footer-container">
                {/* Top Section: Logo & Socials */}
                <div className="footer-top">
                    <div className="footer-logo">
                        <span className="logo-text">
                            <span className="logo-icon">ii</span> preplaced
                        </span>
                        <p className="footer-tagline">
                            Get started by booking a free trial session with the mentor of your choice.
                        </p>
                    </div>
                    <div className="footer-socials">
                        <a href="#" className="social-icon"><FaYoutube /></a>
                        <a href="#" className="social-icon"><FaLinkedinIn /></a>
                        <a href="#" className="social-icon"><FaInstagram /></a>
                    </div>
                </div>

                {/* Middle Section: Links Grid */}
                <div className="footer-links-grid">
                    <div className="footer-col">
                        <h4>Engineering</h4>
                        <ul>
                            <li>Frontend Developer</li>
                            <li>Backend Developer</li>
                            <li>Full Stack Devleoper</li>
                            <li>DevOps / SRE</li>
                            <li>Cybersecurity</li>
                            <li>QA / Automation</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Data Science</h4>
                        <ul>
                            <li>Data Engineer</li>
                            <li>Data Scientist</li>
                            <li>Data Analyst</li>
                            <li>Big Data</li>
                            <li>AI / ML</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Business</h4>
                        <ul>
                            <li>Sales</li>
                            <li>Marketing</li>
                            <li>Business Analyst</li>
                            <li>Finance</li>
                            <li>HR / Behavioural</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Product</h4>
                        <ul>
                            <li>Product Manager</li>
                            <li>UI/UX Designer</li>
                            <li>Project Manager</li>
                            <li>Program Manager</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li>Live Events</li>
                            <li>Stories</li>
                            <li>Ask Mentor</li>
                            <li>Support</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Info */}
                <div className="footer-bottom">
                    <div className="footer-bottom-row">
                        <span>Copyright ©2024 Preplaced.in</span>
                        <span>mentee-support@preplaced.in</span>
                    </div>
                    <div className="footer-bottom-row footer-bottom-info">
                        <div className="address-info">
                            <p>Preplaced Education Private Limited</p>
                            <p>Iblur Village, Bangalore - 560103</p>
                            <p>GSTIN- 29AAKCP9555E1ZV</p>
                        </div>
                        <div className="policy-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Refund Policy</a>
                            <a href="#">Terms & Conditions</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
