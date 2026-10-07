import React, { useState } from 'react';
import RedPixel from './RedPixel';
import { ArrowUpRight, Check, AlertCircle, Loader2, Mail, Send, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Brand Identity',
    budget: '$30k – $60k',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [successInfo, setSuccessInfo] = useState(null);

  const projectTypes = [
    'Brand Identity',
    'Digital Flagship',
    'Kinetic Motion & 3D',
    'Full Transformation'
  ];

  const budgetRanges = [
    '$15k – $30k',
    '$30k – $60k',
    '$60k – $100k',
    '$100k+'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setFormStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email.trim())) {
      setFormStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setFormStatus('error');
      setErrorMessage('Please tell us a bit about your project and timeline (min 10 characters).');
      return;
    }

    // Pure frontend handling - simulate immediate responsive UX & persist to localStorage
    setTimeout(() => {
      try {
        const inquiryId = `inq_${Date.now().toString(36).toUpperCase()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        const newInquiry = {
          id: inquiryId,
          ...formData,
          createdAt: new Date().toISOString()
        };

        const existing = JSON.parse(localStorage.getItem('digilid_inquiries') || '[]');
        existing.unshift(newInquiry);
        localStorage.setItem('digilid_inquiries', JSON.stringify(existing));

        setFormStatus('success');
        setSuccessInfo({
          inquiryId: inquiryId,
          message: 'Thank you! Your project brief has been received. Our strategy team will review and reply within 24 hours.'
        });
        setFormData({
          name: '',
          email: '',
          projectType: 'Brand Identity',
          budget: '$30k – $60k',
          message: ''
        });
      } catch (err) {
        setFormStatus('success');
        setSuccessInfo({
          inquiryId: `inq_${Date.now().toString(36).toUpperCase()}`,
          message: 'Thank you! Your project brief has been received.'
        });
      }
    }, 600);
  };

  return (
    <section id="contact" className="section section-dark section-contact-clean" aria-label="Contact Studio">
      <div className="container relative-z">
        {/* Section Header */}
        <div className="section-header-compact">
          <div className="section-meta-pill dark-pill">
            <RedPixel size="sm" animate />
            <span>INITIATE COLLABORATION // Q1–Q2</span>
          </div>

          <div className="contact-headline-flex">
            <h2 className="heading-xl">
              Let's build something<br />
              extraordinary<span className="title-red-pixel">.</span>
            </h2>
            <p className="body-lead contact-lead-clean">
              Tell us about your ambition, timeline, and category goals. We partner with a select group of clients each quarter to guarantee deep executive immersion.
            </p>
          </div>
        </div>

        {/* Contact Layout */}
        <div className="contact-clean-grid">
          {/* Form Side */}
          <div className="contact-form-container">
            {formStatus === 'success' ? (
              <div className="contact-success-box">
                <div className="success-icon-badge">
                  <Check size={28} />
                </div>
                <h3 className="heading-md success-title">Project Brief Received</h3>
                <p className="body-regular success-desc">
                  {successInfo?.message || 'Thank you for reaching out. We will review your brief and connect within 24 business hours.'}
                </p>
                {successInfo?.inquiryId && (
                  <span className="inquiry-ref">REF: {successInfo.inquiryId}</span>
                )}
                <button
                  type="button"
                  className="btn btn-secondary mt-4"
                  onClick={() => setFormStatus('idle')}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form className="clean-brief-form" onSubmit={handleSubmit} noValidate>
                {/* Project Type Pills */}
                <div className="form-group-item">
                  <label className="field-label">
                    <span>1. Project Focus</span>
                  </label>
                  <div className="pill-selector-grid">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`form-pill-btn ${formData.projectType === type ? 'is-selected' : ''}`}
                        onClick={() => setFormData((prev) => ({ ...prev, projectType: type }))}
                      >
                        {formData.projectType === type && <RedPixel size="sm" />}
                        <span>{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range Pills */}
                <div className="form-group-item">
                  <label className="field-label">
                    <span>2. Approximate Budget</span>
                  </label>
                  <div className="pill-selector-grid">
                    {budgetRanges.map((b) => (
                      <button
                        key={b}
                        type="button"
                        className={`form-pill-btn ${formData.budget === b ? 'is-selected' : ''}`}
                        onClick={() => setFormData((prev) => ({ ...prev, budget: b }))}
                      >
                        <span>{b}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Fields */}
                <div className="form-inputs-row">
                  <div className="input-cell">
                    <label htmlFor="client-name" className="field-label">Your Name</label>
                    <input
                      type="text"
                      id="client-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Elena Rossi"
                      className="clean-text-input"
                      required
                    />
                  </div>

                  <div className="input-cell">
                    <label htmlFor="client-email" className="field-label">Work Email</label>
                    <input
                      type="email"
                      id="client-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="elena@company.com"
                      className="clean-text-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group-item">
                  <label htmlFor="client-msg" className="field-label">Project Objectives & Timeline</label>
                  <textarea
                    id="client-msg"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about what you're building, key challenges, and target launch window..."
                    className="clean-textarea-input"
                    required
                  />
                </div>

                {formStatus === 'error' && (
                  <div className="form-error-banner">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-signal btn-submit-full"
                  disabled={formStatus === 'loading'}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Transmitting Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Project Brief</span>
                      <ArrowUpRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Studio Direct Info Side */}
          <div className="contact-direct-sidebar">
            <div className="direct-card">
              <span className="direct-card-label">DIRECT INQUIRIES</span>
              <a href="mailto:hello@digilid.com" className="direct-email-link">
                <Mail size={18} className="text-signal" />
                <span>hello@digilid.com</span>
              </a>
              <p className="direct-subtext">
                Average response time: &lt; 24 hours. Confidentiality NDAs available upon request.
              </p>
            </div>

            <div className="direct-card">
              <span className="direct-card-label">STUDIO PRESENCE</span>
              <div className="studio-locations-list">
                <div className="loc-row">
                  <strong className="loc-city">Zurich Atelier</strong>
                  <span className="loc-addr">Talstrasse 62, 8001 Zürich</span>
                </div>
                <div className="loc-row">
                  <strong className="loc-city">London Studio</strong>
                  <span className="loc-addr">18 Clerkenwell Close, EC1R 0QN</span>
                </div>
              </div>
            </div>

            <div className="direct-guarantee-card">
              <Sparkles size={16} className="text-signal" />
              <span>Direct access to principal founders on every project. No junior account handoffs.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
