import React, { useState, useRef, useEffect } from 'react';
import RedPixel from './RedPixel';
import { projects } from '../data/projects';
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Portfolio({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sliderRef = useRef(null);

  const filters = ['All', 'Brand Identity', 'Digital Experience', 'Motion'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  const updateScrollState = () => {
    const el = sliderRef.current;
    if (!el) return;
    const atStart = el.scrollLeft <= 5;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [filteredProjects]);

  const scrollSlider = (direction) => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.portfolio-slider-card')?.offsetWidth || 300;
    const gap = 24;
    const scrollAmount = direction === 'next' ? (cardWidth + gap) : -(cardWidth + gap);

    el.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section id="portfolio" className="section section-portfolio" aria-label="Selected Work">
      <div className="container">
        {/* Clean Header Row */}
        <div className="portfolio-header-bar">
          <div>
            <div className="section-meta-pill">
              <RedPixel size="sm" animate />
              <span>SELECTED COMMISSIONS // 2025–2026</span>
            </div>
            <h2 className="heading-xl portfolio-title-clean">
              Featured Work<span className="title-red-pixel">.</span>
            </h2>
          </div>

          <div className="portfolio-header-controls">
            {/* Interactive Category Filter Pills */}
            <div className="portfolio-filter-group">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${activeFilter === f ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveFilter(f);
                    if (sliderRef.current) {
                      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Slider Navigation Arrows */}
            <div className="portfolio-slider-nav">
              <button
                type="button"
                className={`slider-arrow-btn ${!canScrollLeft ? 'is-disabled' : ''}`}
                onClick={() => scrollSlider('prev')}
                disabled={!canScrollLeft}
                aria-label="Previous projects"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                className={`slider-arrow-btn ${!canScrollRight ? 'is-disabled' : ''}`}
                onClick={() => scrollSlider('next')}
                disabled={!canScrollRight}
                aria-label="Next projects"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Single-Row Horizontal Slider Showcase */}
        <div className="portfolio-slider-wrapper">
          <div className="portfolio-slider-track" ref={sliderRef}>
            {filteredProjects.map((project) => {
              const isHovered = hoveredProjectId === project.id;
              return (
                <article
                  key={project.id}
                  className={`portfolio-slider-card ${isHovered ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  onClick={() => onSelectProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') onSelectProject(project); }}
                >
                  {/* Media Wrapper */}
                  <div className="clean-media-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="clean-card-img"
                      loading="lazy"
                    />
                    <div className="clean-card-gradient" />

                    {/* Corner Red Indicator */}
                    <div className="clean-corner-badge">
                      <RedPixel size="sm" />
                      <span>{project.year}</span>
                    </div>

                    {/* Hover Floating Action */}
                    <div className="clean-floating-action">
                      <span>View</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  {/* Info Metadata */}
                  <div className="clean-card-meta">
                    <div className="card-info-main">
                      <span className="clean-category-label">{project.category}</span>
                      <h3 className="clean-project-title">{project.title}</h3>
                      <p className="clean-summary-text">{project.summary}</p>
                    </div>

                    <div className="clean-impact-pill">
                      <Sparkles size={12} className="sparkle-icon" />
                      <span>{project.impact}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
