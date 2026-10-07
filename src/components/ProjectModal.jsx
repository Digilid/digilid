import React, { useEffect } from 'react';
import RedPixel from './RedPixel';
import { X, ArrowUpRight, CheckCircle, Layers, Calendar, UserCheck } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="meta-num">[{project.id} // CASE STUDY]</span>
            <span className="meta-tag">
              <RedPixel size="sm" /> {project.category}
            </span>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Case Study"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="modal-body">
          <div className="modal-hero-banner">
            <img src={project.image} alt={project.title} className="modal-main-img" />
            <div className="modal-title-overlay">
              <h2 className="heading-xl modal-title">{project.title}</h2>
              <span className="modal-client">{project.client} — {project.year}</span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="modal-stats-grid">
            <div className="modal-stat-item">
              <span className="stat-label"><Calendar size={14} /> Timeline / Year</span>
              <span className="stat-val">{project.year}</span>
            </div>
            <div className="modal-stat-item">
              <span className="stat-label"><UserCheck size={14} /> Client</span>
              <span className="stat-val">{project.client}</span>
            </div>
            <div className="modal-stat-item">
              <span className="stat-label"><Layers size={14} /> Disciplines</span>
              <span className="stat-val">{project.category}</span>
            </div>
          </div>

          {/* Editorial Overview & Challenge/Solution */}
          <div className="modal-text-section">
            <h3 className="heading-md">Project Overview</h3>
            <p className="body-lead">{project.summary}</p>
          </div>

          <div className="modal-split-grid">
            <div className="modal-block">
              <h4 className="modal-block-title">The Strategic Challenge</h4>
              <p className="body-regular">{project.challenge}</p>
            </div>
            <div className="modal-block">
              <h4 className="modal-block-title">The Creative Solution</h4>
              <p className="body-regular">{project.solution}</p>
            </div>
          </div>

          {/* Deliverables List */}
          <div className="modal-deliverables-box">
            <h4 className="modal-block-title">
              <RedPixel size="sm" /> Key Deliverables & Systems Built
            </h4>
            <div className="modal-deliv-grid">
              {project.deliverables.map((del, i) => (
                <div key={i} className="deliv-badge">
                  <CheckCircle size={14} className="deliv-icon" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Callout */}
          <div className="modal-impact-callout">
            <span className="impact-label">COMMERCIAL & BRAND IMPACT</span>
            <p className="impact-quote">{project.impact}</p>
          </div>

          {/* Gallery Showcase */}
          <div className="modal-gallery-grid">
            {project.gallery && project.gallery.map((imgUrl, idx) => (
              <div key={idx} className="gallery-item">
                <img src={imgUrl} alt={`${project.title} detail ${idx + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          {/* Modal Footer CTA */}
          <div className="modal-footer-cta">
            <div>
              <h4 className="heading-sm">Ready to build something iconic?</h4>
              <p className="body-small">Let's discuss how Digilid can elevate your brand architecture.</p>
            </div>
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={() => {
                onClose();
                const contactEl = document.getElementById('contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Start Your Project</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
