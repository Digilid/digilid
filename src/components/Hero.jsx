import React, { useEffect, useRef, useState } from 'react';
import RedPixel from './RedPixel';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const metricsRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Interactive Particle Grid Canvas with Magnetic Red Pixel Physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const cols = Math.max(8, Math.floor(width / 80));
    const rows = Math.max(6, Math.floor(height / 80));
    const particles = [];

    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        particles.push({
          originX: (i / cols) * width,
          originY: (j / rows) * height,
          x: (i / cols) * width,
          y: (j / rows) * height,
          vx: 0,
          vy: 0,
          isRed: (i + j) % 9 === 0
        });
      }
    }

    let mouse = { x: -1000, y: -1000 };

    const handleCanvasMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      setMousePos({ x: Math.round(mouse.x), y: Math.round(mouse.y) });
    };

    window.addEventListener('mousemove', handleCanvasMouse);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 130;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 1.8;
          p.vy -= Math.sin(angle) * force * 1.8;
        }

        p.vx += (p.originX - p.x) * 0.06;
        p.vy += (p.originY - p.y) * 0.06;
        p.vx *= 0.85;
        p.vy *= 0.85;

        p.x += p.vx;
        p.y += p.vy;

        if (p.isRed) {
          ctx.fillStyle = '#EE2E2D';
          ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
        } else {
          ctx.fillStyle = 'rgba(122, 116, 108, 0.2)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        if (dist < 90) {
          ctx.strokeStyle = `rgba(238, 46, 45, ${0.35 * (1 - dist / 90)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleCanvasMouse);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo(
        subtextRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(
        metricsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section creative-hero-clean" ref={heroRef} aria-label="Hero Section">
      {/* Background Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="hero-interactive-canvas" aria-hidden="true" />

      {/* Subtle Background Glow Accent */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      <div className="container hero-container">
        {/* Clean, Bold Headline */}
        <div className="hero-headline-wrap" ref={titleRef}>
          <h1 className="heading-display hero-title-clean">
            Designing brands<br />
            that <span className="hero-text-gradient">command attention</span>
            <span className="title-red-pixel">.</span>
          </h1>
        </div>

        {/* Supporting Copy & Action Area */}
        <div className="hero-main-body">
          <div className="hero-lead-col">
            <p className="body-lead hero-lead-text" ref={subtextRef}>
              We partner with visionary founders to build category-defining brand identities, dynamic motion, and high-performance digital flagships that create lasting business value.
            </p>

            {/* Quick Actions */}
            <div className="hero-actions-row" ref={ctaRef}>
              <a
                href="#portfolio"
                className="btn btn-primary"
                onClick={(e) => scrollToSection(e, 'portfolio')}
              >
                <span>Explore Work</span>
                <ArrowUpRight size={18} />
              </a>

              <a
                href="#contact"
                className="btn btn-secondary"
                onClick={(e) => scrollToSection(e, 'contact')}
              >
                <span>Start a Project</span>
                <RedPixel size="sm" />
              </a>
            </div>
          </div>

          {/* Clean Metric Highlights Bar */}
          <div className="hero-metrics-strip" ref={metricsRef}>
            <div className="hero-metric-item">
              <span className="hero-metric-val">48+</span>
              <span className="hero-metric-lbl">Design & Craft Honors</span>
            </div>
            <div className="hero-metric-sep" />
            <div className="hero-metric-item">
              <span className="hero-metric-val">99.8%</span>
              <span className="hero-metric-lbl">Performance Score</span>
            </div>
            <div className="hero-metric-sep" />
            <div className="hero-metric-item">
              <span className="hero-metric-val">+185%</span>
              <span className="hero-metric-lbl">Avg. Client Value Increase</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
