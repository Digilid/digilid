import React, { useEffect, useRef, useState } from 'react';
import RedPixel from './RedPixel';
import { processSteps } from '../data/process';
import { Check, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const processRef = useRef(null);
  const progressBarRef = useRef(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate progress line width across the process section scroll
      ScrollTrigger.create({
        trigger: processRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: true,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${self.progress * 100}%`;
          }
          const step = Math.min(
            Math.floor(self.progress * processSteps.length),
            processSteps.length - 1
          );
          setActiveStepIndex(step);
        }
      });
    }, processRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="section section-process" ref={processRef} aria-label="Studio Methodology">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-wrap">
          <div className="section-meta-row">
            <span className="meta-num">[03]</span>
            <span className="meta-tag">
              <RedPixel size="sm" /> Methodology & Execution
            </span>
          </div>

          <div className="process-header-grid">
            <h2 className="heading-xl">
              How we move<br />
              ideas forward<span className="title-red-pixel">.</span>
            </h2>
            <p className="body-lead process-lead">
              A structured, rigorous 6-phase journey engineered to eliminate guesswork, accelerate momentum, and deliver unforgettable creative output.
            </p>
          </div>

          <div className="section-rule-bar" />
        </div>

        {/* Global Progress Track */}
        <div className="process-progress-container">
          <div className="process-track-bg">
            <div className="process-track-fill" ref={progressBarRef} />
          </div>
          <div className="process-steps-indicator">
            {processSteps.map((step, idx) => (
              <button
                key={step.step}
                className={`step-indicator-node ${idx <= activeStepIndex ? 'is-active' : ''}`}
                onClick={() => setActiveStepIndex(idx)}
                aria-label={`Jump to Step ${step.step}: ${step.name}`}
              >
                <span className="node-num">{step.step}</span>
                <span className="node-name">{step.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid of Process Cards */}
        <div className="process-cards-grid">
          {processSteps.map((item, index) => {
            const isCurrent = index === activeStepIndex;
            return (
              <div
                key={item.step}
                className={`process-card ${isCurrent ? 'is-highlighted' : ''}`}
                onClick={() => setActiveStepIndex(index)}
              >
                <div className="process-card-top">
                  <span className="process-step-badge">{item.step}</span>
                  {isCurrent && <RedPixel size="sm" animate />}
                </div>

                <div className="process-card-body">
                  <h3 className="heading-md process-step-name">{item.name}</h3>
                  <span className="process-step-tagline">{item.tagline}</span>
                  <p className="body-regular process-step-desc">{item.description}</p>
                </div>

                <div className="process-card-footer">
                  <span className="process-action-label">EXECUTION KEY:</span>
                  <p className="process-action-text">{item.keyAction}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
