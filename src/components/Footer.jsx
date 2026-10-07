import React from 'react';
import RedPixel from './RedPixel';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="clean-studio-footer" role="contentinfo">
      <div className="container">
        <div className="footer-clean-top">
          {/* Brand & Mission */}
          <div className="footer-brand-cell">
            <div className="brand-logo footer-logo">
              <span className="logo-text">DIGILID</span>
              <RedPixel size="md" animate />
            </div>
            <p className="footer-tagline">
              Strategy-first creative atelier engineering distinctive brand identities, kinetic motion, and high-performance digital flagships.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="footer-links-cell">
            <span className="footer-col-title">Navigation</span>
            <ul className="footer-nav-list">
              <li><a href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>Home</a></li>
              <li><a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')}>Selected Work</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Capabilities</a></li>
              <li><a href="#methodology" onClick={(e) => scrollToSection(e, 'methodology')}>Methodology</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
            </ul>
          </div>

          {/* Studio Locations */}
          <div className="footer-links-cell">
            <span className="footer-col-title">Locations</span>
            <div className="footer-loc-item">
              <strong>Zurich</strong>
              <span>Talstrasse 62, 8001</span>
            </div>
            <div className="footer-loc-item mt-2">
              <strong>London</strong>
              <span>Clerkenwell Close, EC1R</span>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="footer-links-cell">
            <span className="footer-col-title">Connect</span>
            <a href="mailto:hello@digilid.com" className="footer-email-link">
              hello@digilid.com
            </a>
            <div className="footer-social-row">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-a">Instagram <ArrowUpRight size={12} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-a">LinkedIn <ArrowUpRight size={12} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-a">X (Twitter) <ArrowUpRight size={12} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="footer-clean-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} Digilid Studio Ltd. All rights reserved. Precision brand craft.
          </span>

          <button className="footer-scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
