import React from 'react';
import RedPixel from './RedPixel';
import { ArrowUpRight, Mail } from 'lucide-react';

export default function FinalCTA() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section section-final-cta" aria-label="Start a Project CTA">
      <div className="container">
        <div className="final-cta-card">
          <div className="final-cta-meta">
            <span className="meta-num">[07 // ENGAGEMENT]</span>
            <span className="meta-tag">
              <RedPixel size="sm" animate />
              Initiate Dialogue
            </span>
          </div>

          <h2 className="heading-display final-cta-title">
            Have an idea<br />
            worth moving<span className="title-red-pixel">?</span>
          </h2>

          <p className="body-lead final-cta-sub">
            We partner with a limited roster of visionary brands each quarter to guarantee intimate executive immersion and uncompromising craft.
          </p>

          <div className="final-cta-actions">
            <a
              href="#contact"
              className="btn btn-signal btn-lg"
              data-cursor="start"
              onClick={scrollToContact}
            >
              <span>Start a Project</span>
              <ArrowUpRight size={20} strokeWidth={2.5} />
            </a>

            <a
              href="mailto:hello@digilid.com"
              className="btn btn-secondary btn-lg"
            >
              <Mail size={18} />
              <span>Direct Studio Email</span>
            </a>
          </div>

          <div className="final-cta-footer-note">
            <span className="note-text">Studio Response Window: Within 24 Business Hours</span>
            <div className="note-dots">
              <span className="dot-active" />
              <span className="dot-label">Zurich // London Studio Hubs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
