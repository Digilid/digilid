import React, { useState, useEffect } from 'react';
import RedPixel from './RedPixel';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`main-navbar ${isScrolled ? 'is-scrolled' : ''}`}
        role="banner"
      >
        <div className="navbar-inner container">
          {/* Logo / Wordmark */}
          <a
            href="#hero"
            className="brand-logo"
            onClick={(e) => scrollToSection(e, 'hero')}
            aria-label="Digilid Home"
          >
            <span className="logo-text">DIGILID</span>
            <RedPixel size="md" animate />
          </a>

          {/* Clean Desktop Nav */}
          <nav className="desktop-nav" role="navigation" aria-label="Main Navigation">
            <ul className="nav-links">
              <li>
                <a
                  href="#portfolio"
                  className="nav-link"
                  onClick={(e) => scrollToSection(e, 'portfolio')}
                >
                  Work
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="nav-link"
                  onClick={(e) => scrollToSection(e, 'services')}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#methodology"
                  className="nav-link"
                  onClick={(e) => scrollToSection(e, 'methodology')}
                >
                  Methodology
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="nav-link"
                  onClick={(e) => scrollToSection(e, 'contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Desktop CTA Button */}
          <div className="navbar-actions">
            <a
              href="#contact"
              className="btn btn-primary btn-nav"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              <span>Initiate Brief</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Mobile Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'is-active' : ''}`}>
        <div className="mobile-menu-inner container">
          <div className="mobile-menu-header">
            <div className="brand-logo">
              <span className="logo-text">DIGILID</span>
              <RedPixel size="md" />
            </div>
            <button
              className="mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-menu-content">
            <ul className="mobile-nav-list">
              <li>
                <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')}>
                  Featured Work
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#methodology" onClick={(e) => scrollToSection(e, 'methodology')}>
                  Methodology & Impact
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
                  Start a Project
                </a>
              </li>
            </ul>

            <div className="mobile-menu-footer">
              <a
                href="#contact"
                className="btn btn-signal btn-full"
                onClick={(e) => scrollToSection(e, 'contact')}
              >
                <span>Start a Project</span>
                <ArrowUpRight size={18} />
              </a>

              <div className="mobile-contact-info">
                <span className="mobile-studio-email">hello@digilid.com</span>
                <span className="mobile-studio-loc">Zurich — London</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
