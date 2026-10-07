import React, { useState } from 'react';
import RedPixel from './RedPixel';
import { services } from '../data/services';
import { ArrowUpRight, Check, Plus, Minus } from 'lucide-react';

export default function Services() {
  const [activeService, setActiveService] = useState('01');

  const toggleService = (id) => {
    setActiveService(activeService === id ? null : id);
  };

  return (
    <section id="services" className="section section-dark section-services-clean" aria-label="Capabilities & Services">
      <div className="container relative-z">
        {/* Section Header */}
        <div className="section-header-compact">
          <div className="section-meta-pill dark-pill">
            <RedPixel size="sm" animate />
            <span>PRACTICE CAPABILITIES // DISCIPLINARY SYNERGY</span>
          </div>

          <div className="services-headline-flex">
            <h2 className="heading-xl">
              End-to-end craft<span className="title-red-pixel">.</span>
            </h2>
            <p className="body-lead services-sub-clean">
              From market diagnosis to final digital implementation, we engineer unified brand ecosystems designed for clarity and market authority.
            </p>
          </div>
        </div>

        {/* Clean Interactive Services Accordion */}
        <div className="services-accordion-list">
          {services.map((item) => {
            const isOpen = activeService === item.id;
            return (
              <div
                key={item.id}
                className={`service-card-row ${isOpen ? 'is-open' : ''}`}
                onClick={() => toggleService(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') toggleService(item.id); }}
              >
                <div className="service-row-header">
                  <div className="service-id-badge">
                    <span className="service-idx-num">{item.id}</span>
                    <span className="service-accent-pill">{item.accent}</span>
                  </div>

                  <div className="service-title-cell">
                    <h3 className="heading-lg service-row-title">{item.title}</h3>
                    <span className="service-row-cat">{item.category}</span>
                  </div>

                  <div className="service-toggle-icon">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </div>

                {/* Animated Drawer */}
                {isOpen && (
                  <div className="service-drawer-content">
                    <div className="service-drawer-grid">
                      <div className="service-desc-box">
                        <p className="body-lead service-lead-p">{item.description}</p>
                      </div>

                      <div className="service-caps-box">
                        <span className="caps-header">Core Focus Areas:</span>
                        <div className="caps-pill-wrap">
                          {item.capabilities.map((cap, i) => (
                            <span key={i} className="cap-pill-item">
                              <Check size={12} className="cap-check" />
                              <span>{cap}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Compact Bottom Action */}
        <div className="services-footer-banner">
          <div className="footer-banner-left">
            <span className="banner-title">BESPOKE ENGAGEMENT SCOPES</span>
            <p className="banner-desc">Full brand creation, sprint sprints, and fractional design leadership.</p>
          </div>
          <a href="#contact" className="btn btn-signal">
            <span>Inquire for Scope</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
