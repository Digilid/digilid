import React, { useState, useEffect, useRef } from 'react';
import RedPixel from './RedPixel';
import { Quote, ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Methodology() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const counterRefs = useRef([]);

  const steps = [
    {
      num: '01',
      title: 'Discover & Map',
      tag: 'CATEGORY DIAGNOSTIC',
      desc: 'We immerse ourselves in your market ecosystem, analyzing customer friction, founder vision, and category whitespace to uncover unmapped leverage.'
    },
    {
      num: '02',
      title: 'Position & Strategize',
      tag: 'NORTH STAR BLUEPRINT',
      desc: 'We crystallize your brand positioning, core narrative architecture, and value proposition into an uncompromising strategic framework.'
    },
    {
      num: '03',
      title: 'Design & Engineer',
      tag: 'SYSTEM CRAFT',
      desc: 'We transform strategy into arresting visual systems, kinetic typography, and fluid interactive digital platforms built to outperform.'
    },
    {
      num: '04',
      title: 'Launch & Scale',
      tag: 'MARKET MOMENTUM',
      desc: 'We deploy across physical and digital arenas with disciplined precision, driving sustained brand equity and commercial impact.'
    }
  ];

  const metrics = [
    { value: 185, prefix: '+', suffix: '%', label: 'Average Valuation Lift', sub: 'Across Series A–C portfolios' },
    { value: 48, prefix: '', suffix: '+', label: 'Design & Tech Awards', sub: 'Awwwards, FWA & Red Dot' },
    { value: 99, prefix: '', suffix: '.8%', label: 'Platform Performance', sub: 'Lighthouse & Core Web Vitals' },
    { value: 100, prefix: '', suffix: '%', label: 'Partner Immersion', sub: 'Direct principal collaboration' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      counterRefs.current.forEach((el, idx) => {
        if (!el) return;
        const targetValue = metrics[idx].value;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetValue,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.val);
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTest = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTest = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const currentTest = testimonials[activeTestimonial];

  return (
    <section id="methodology" className="section section-methodology-clean" ref={sectionRef} aria-label="Methodology and Impact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-compact">
          <div className="section-meta-pill">
            <RedPixel size="sm" animate />
            <span>RIGOROUS METHODOLOGY // VERIFIED IMPACT</span>
          </div>

          <div className="methodology-headline-flex">
            <h2 className="heading-xl">
              Precision in process,<br />
              power in result<span className="title-red-pixel">.</span>
            </h2>
            <p className="body-lead methodology-sub">
              Our 4-phase framework strips away ambiguity to produce iconic brand systems that command attention and drive measurable business traction.
            </p>
          </div>
        </div>

        {/* 4-Step Interactive Process Cards */}
        <div className="methodology-steps-grid">
          {steps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                key={step.num}
                className={`step-card-item ${isCurrent ? 'is-active-step' : ''}`}
                onClick={() => setActiveStep(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setActiveStep(idx); }}
              >
                <div className="step-card-header">
                  <span className="step-number">{step.num}</span>
                  {isCurrent && <RedPixel size="sm" animate />}
                </div>

                <div className="step-card-content">
                  <span className="step-tag-text">{step.tag}</span>
                  <h3 className="heading-md step-card-title">{step.title}</h3>
                  <p className="body-small step-card-desc">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Numbers & Testimonial Combined Row */}
        <div className="impact-proof-grid">
          {/* Animated Metrics Box */}
          <div className="metrics-box-clean">
            <div className="metrics-box-title">
              <Sparkles size={16} className="text-signal" />
              <span>MEASURABLE BRAND PERFORMANCE</span>
            </div>

            <div className="metrics-inner-grid">
              {metrics.map((m, i) => (
                <div key={i} className="metric-cell-clean">
                  <div className="metric-number-clean">
                    <span>{m.prefix}</span>
                    <span ref={(el) => (counterRefs.current[i] = el)}>0</span>
                    <span>{m.suffix}</span>
                  </div>
                  <h4 className="metric-heading">{m.label}</h4>
                  <p className="metric-sub-detail">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Testimonial Spotlight */}
          <div className="testimonial-spotlight-card">
            <div className="test-card-top">
              <Quote size={28} className="text-signal" />
              <div className="test-type-badge">
                <RedPixel size="sm" />
                <span>{currentTest.projectType}</span>
              </div>
            </div>

            <blockquote className="test-quote-clean">
              “{currentTest.quote}”
            </blockquote>

            <div className="test-author-bottom">
              <div>
                <h4 className="author-name-clean">{currentTest.author}</h4>
                <p className="author-role-clean">{currentTest.title}, <span className="author-co">{currentTest.company}</span></p>
              </div>

              <div className="test-nav-controls">
                <button className="test-arrow-btn" onClick={prevTest} aria-label="Previous Testimonial">
                  <ChevronLeft size={18} />
                </button>
                <span className="test-count-indicator">0{activeTestimonial + 1}/0{testimonials.length}</span>
                <button className="test-arrow-btn" onClick={nextTest} aria-label="Next Testimonial">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
