import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NaturraHeader.css'

const NaturraHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/products', label: 'Products' },
  ]

  return (
    <>
      <header className={`naturra-header ${scrolled ? 'scrolled' : ''}`}>
        {/* Top Bar */}
        <div className="naturra-header__topbar">
          <div className="naturra-header__topbar-inner">
            <div className="naturra-header__topbar-left">
              <a href="mailto:naturraextal@gmail.com">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                naturraextal@gmail.com
              </a>
              <a href="https://wa.me/628951395752" target="_blank" rel="noopener noreferrer">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                +62 895-1395-7752
              </a>
            </div>
            <div className="naturra-header__topbar-right">
              <span>CV Naturra Extal International</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="naturra-header__main">
          <Link to="/" className="naturra-header__logo">
            <div className="naturra-header__logo-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" fill="#004D2C"/>
                <path d="M24 8C24 8 16 14 16 22C16 26 18 30 22 32L22 38H26L26 32C30 30 32 26 32 22C32 14 24 8 24 8Z" fill="#fff" opacity="0.9"/>
                <path d="M24 12C24 12 19 17 19 23C19 26 20.5 28.5 23 30L23 36H25L25 30C27.5 28.5 29 26 29 23C29 17 24 12 24 12Z" fill="#004D2C" opacity="0.4"/>
                <circle cx="24" cy="20" r="2.5" fill="#fff"/>
              </svg>
            </div>
            <div className="naturra-header__logo-text">
              <span className="naturra-header__logo-name">NATURRA EXTAL</span>
              <span className="naturra-header__logo-tagline">International Commodity Trading</span>
            </div>
          </Link>

          <nav className="naturra-header__nav">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`naturra-header__nav-link ${isActive(link.to) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href="https://wa.me/628951395752"
            target="_blank"
            rel="noopener noreferrer"
            className="naturra-header__cta"
          >
            Contact Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
          </a>

          <button
            className="naturra-header__mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`naturra-header__mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="naturra-header__mobile-menu-header">
          <Link to="/" className="naturra-header__logo" onClick={() => setMobileOpen(false)}>
            <div className="naturra-header__logo-text">
              <span className="naturra-header__logo-name">NATURRA EXTAL</span>
              <span className="naturra-header__logo-tagline">International Commodity Trading</span>
            </div>
          </Link>
          <button
            className="naturra-header__mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <nav className="naturra-header__mobile-nav">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`naturra-header__mobile-nav-link ${isActive(link.to) ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href="https://wa.me/628951395752"
          target="_blank"
          rel="noopener noreferrer"
          className="naturra-header__mobile-cta"
          onClick={() => setMobileOpen(false)}
        >
          Contact Us via WhatsApp
        </a>
      </div>
    </>
  )
}

export default NaturraHeader
