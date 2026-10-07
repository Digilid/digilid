import React, { useState, useEffect, useRef } from 'react';
import RedPixel from './RedPixel';
import { metrics, testimonials } from '../data/testimonials';
import { Quote, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Metric counter animations
      countersRef.current.forEach((el, idx) => {
        if (!el) return;
        const targetValue = metrics[idx].value;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetValue,
          duration: 2,
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

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section id="results" className="section section-dark section-results" ref={sectionRef} aria-label="Results & Testimonials">
      <div className="editorial-grid-bg" />

      <div className="container relative-z">
        {/* Section Header */}
        <div className="section-header-wrap">
          <div className="section-meta-row">
            <span className="meta-num">[05]</span>
            <span className="meta-tag">
              <RedPixel size="sm" /> Business Impact & Proof
            </span>
          </div>

          <div className="results-header-flex">
            <h2 className="heading-xl">
              Work that moves<br />
              businesses forward<span className="title-red-pixel">.</span>
            </h2>
            <p className="body-lead results-sub">
              True creative excellence is measured by business traction. We build brand equity that drives valuation, talent attraction, and category leadership.
            </p>
          </div>

          <div className="section-rule-bar" />
        </div>

        {/* Animated Impact Metrics Grid */}
        <div className="metrics-grid">
          {metrics.map((item, idx) => (
            <div key={idx} className="metric-box">
              <div className="metric-number-row">
                <span className="metric-prefix">{item.prefix}</span>
                <span
                  className="metric-counter"
                  ref={(el) => (countersRef.current[idx] = el)}
                >
                  0
                </span>
                <span className="metric-suffix">{item.suffix}</span>
              </div>
              <h3 className="heading-sm metric-label">{item.label}</h3>
              <p className="body-small metric-detail">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Editorial Testimonial Carousel / Card */}
        <div className="testimonial-editorial-container">
          <div className="testimonial-card">
            <div className="testimonial-top">
              <Quote className="quote-icon" size={32} />
              <div className="testimonial-badge">
                <RedPixel size="sm" />
                <span>{current.projectType}</span>
              </div>
            </div>

            <blockquote className="testimonial-quote">
              “{current.quote}”
            </blockquote>

            <div className="testimonial-author-row">
              <div className="author-info">
                <h4 className="author-name">{current.author}</h4>
                <p className="author-role">
                  {current.title}, <span className="author-company">{current.company}</span>
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="testimonial-nav-controls">
                <span className="testimonial-counter">
                  0{activeIndex + 1} / 0{testimonials.length}
                </span>
                <div className="nav-buttons">
                  <button
                    className="test-btn-prev"
                    onClick={prevTestimonial}
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    className="test-btn-next"
                    onClick={nextTestimonial}
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
