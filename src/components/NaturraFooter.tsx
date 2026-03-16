import React from 'react'
import { Link } from 'react-router-dom'
import './NaturraFooter.css'

const NaturraFooter: React.FC = () => {
    return (
        <footer className="naturra-footer">
            <div className="naturra-footer__main">
                {/* Brand Column */}
                <div className="naturra-footer__brand">
                    <div className="naturra-footer__brand-logo">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="22" fill="#004D2C" />
                            <path d="M24 8C24 8 16 14 16 22C16 26 18 30 22 32L22 38H26L26 32C30 30 32 26 32 22C32 14 24 8 24 8Z" fill="#fff" opacity="0.9" />
                            <path d="M24 12C24 12 19 17 19 23C19 26 20.5 28.5 23 30L23 36H25L25 30C27.5 28.5 29 26 29 23C29 17 24 12 24 12Z" fill="#004D2C" opacity="0.4" />
                            <circle cx="24" cy="20" r="2.5" fill="#fff" />
                        </svg>
                        <span className="naturra-footer__brand-name">NATURRA EXTAL</span>
                    </div>
                    <p className="naturra-footer__brand-desc">
                        Leaders in Indonesian agricultural commodity trading. We connect premium Indonesian farmers with global markets, specializing in cocoa, cloves, and cocopeat.
                    </p>
                    <span className="naturra-footer__brand-legal">CV Naturra Extal International</span>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="naturra-footer__col-title">Company</h4>
                    <div className="naturra-footer__col-links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/products">Products</Link>
                    </div>
                </div>

                {/* Products */}
                <div>
                    <h4 className="naturra-footer__col-title">Our Products</h4>
                    <div className="naturra-footer__col-links">
                        <Link to="/products">Cocoa Powder</Link>
                        <Link to="/products">Cengkeh (Cloves)</Link>
                        <Link to="/products">Cocopeat</Link>
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="naturra-footer__col-title">Contact Us</h4>
                    <div className="naturra-footer__contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <a href="mailto:naturraextal@gmail.com">naturraextal@gmail.com</a>
                    </div>
                    <div className="naturra-footer__contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <a href="https://wa.me/628951395752" target="_blank" rel="noopener noreferrer">+62 895-1395-7752</a>
                    </div>
                    <div className="naturra-footer__contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>Indonesia</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="naturra-footer__bottom">
                <span className="naturra-footer__copyright">
                    © {new Date().getFullYear()} CV Naturra Extal International. All rights reserved.
                </span>
                <div className="naturra-footer__bottom-links">
                    <Link to="/terms-of-service">Terms of Service</Link>
                    <Link to="/shipping-information">Shipping Info</Link>
                </div>
            </div>
        </footer>
    )
}

export default NaturraFooter
