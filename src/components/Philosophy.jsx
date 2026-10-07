import React, { useEffect, useRef } from 'react';
import RedPixel from './RedPixel';
import { Eye, Brain, Sparkles, MoveRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  const statementsRef = useRef([]);

  const coreValues = [
    { name: 'Curiosity', desc: 'Relentless questioning of the obvious to find unmapped territory.' },
    { name: 'Creativity', desc: 'Original thinking executed with uncompromising visual rigor.' },
    { name: 'Purpose', desc: 'Every design choice, grid line, and word exists with distinct intent.' },
    { name: 'Integrity', desc: 'Unvarnished strategic counsel, transparent collaboration, and enduring craft.' },
    { name: 'Collaboration', desc: 'Co-creating alongside visionary founders as unified strategic partners.' }
  ];

  const pillars = [
    {
      num: '01',
      title: 'We Observe.',
      icon: Eye,
      text: 'We dive deep into category blind spots, customer psychology, and cultural momentum. We listen intently before proposing solutions.'
    },
    {
      num: '02',
      title: 'We Think.',
      icon: Brain,
      text: 'We distill complex business challenges into crystalline brand strategy, sharp positioning matrices, and unfair competitive advantages.'
    },
    {
      num: '03',
      title: 'We Create.',
      icon: Sparkles,
      text: 'We transform strategy into arresting visual systems, kinetic typography, and fluid digital platforms designed to lead their space.'
    },
    {
      num: '04',
      title: 'We Move.',
      icon: MoveRight,
      text: 'We mobilize brands across digital, spatial, and physical arenas with dynamic momentum, driving sustained, measurable business impact.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate philosophy pillar cards on scroll
      statementsRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Animate large brand statement lines
      gsap.fromTo(
        '.philosophy-statement-line',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.philosophy-statement-wrap',
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      className="section section-philosophy"
      ref={sectionRef}
      aria-label="Philosophy & About Section"
    >
      <div className="container">
        {/* Editorial Section Header */}
        <div className="section-header-wrap">
          <div className="section-meta-row">
            <span className="meta-num">[01]</span>
            <span className="meta-tag">
              <RedPixel size="sm" /> Studio Philosophy & Origin
            </span>
          </div>

          <h2 className="heading-xl philosophy-title">
            Curious by nature.<br />
            Creative by instinct<span className="title-red-pixel">.</span>
          </h2>

          <div className="section-rule-bar" />
        </div>

        {/* Narrative & Story Split */}
        <div className="philosophy-story-grid">
          <div className="story-left-col">
            <h3 className="heading-md story-lead-title">
              Every brand has a story waiting to be discovered. We uncover it, shape it into something memorable, and move with purpose.
            </h3>
            <div className="story-badge-row">
              <div className="story-badge">
                <span className="badge-label">MISSION</span>
                <p className="badge-text">
                  To help ambitious brands find clarity, create with purpose, and grow with measurable cultural and commercial impact.
                </p>
              </div>
              <div className="story-badge">
                <span className="badge-label">VISION</span>
                <p className="badge-text">
                  To stand as a global creative studio renowned for intellectual curiosity, uncompromising originality, and meaningful work.
                </p>
              </div>
            </div>
          </div>

          <div className="story-right-col">
            <p className="body-regular">
              We reject the superficial templates and noisy churn of typical digital agencies. True brand equity is not built through cookie-cutter formulas—it requires acute observation, strategic restraint, and visceral creative execution.
            </p>
            <p className="body-regular">
              Operating at the intersection of strategic consulting, architectural brand design, and kinetic engineering, Digilid partners with founders who demand to lead their categories rather than merely compete.
            </p>

            {/* Core Values Tag Cloud */}
            <div className="values-box">
              <span className="values-header">
                <RedPixel size="sm" /> CORE STUDIO VALUES
              </span>
              <div className="values-pill-grid">
                {coreValues.map((val) => (
                  <div key={val.name} className="value-pill">
                    <span className="value-name">{val.name}</span>
                    <span className="value-desc">{val.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The 4-Pillar Movement Matrix */}
        <div className="philosophy-statement-wrap">
          <div className="pillars-grid">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.num}
                  className="pillar-card"
                  ref={(el) => (statementsRef.current[idx] = el)}
                >
                  <div className="pillar-top">
                    <span className="pillar-num">{pillar.num}</span>
                    <IconComp className="pillar-icon" size={22} strokeWidth={1.75} />
                  </div>
                  <h4 className="pillar-title">{pillar.title}</h4>
                  <p className="pillar-text">{pillar.text}</p>
                  <div className="pillar-red-corner" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
