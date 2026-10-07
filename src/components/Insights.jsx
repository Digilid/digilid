import React, { useState } from 'react';
import RedPixel from './RedPixel';
import { insights } from '../data/insights';
import { ArrowUpRight, Clock, Calendar, X } from 'lucide-react';

export default function Insights() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="insights" className="section section-insights" aria-label="Editorial Insights">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-wrap">
          <div className="section-meta-row">
            <span className="meta-num">[06]</span>
            <span className="meta-tag">
              <RedPixel size="sm" /> Studio Dispatches & Essays
            </span>
          </div>

          <div className="insights-header-flex">
            <h2 className="heading-xl">
              Thinking behind<br />
              the work<span className="title-red-pixel">.</span>
            </h2>
            <p className="body-lead insights-sub">
              Our perspectives on brand architecture, the psychology of design restraint, and the future of kinetic studio practice.
            </p>
          </div>

          <div className="section-rule-bar" />
        </div>

        {/* Editorial Articles Grid */}
        <div className="insights-grid">
          {insights.map((post) => (
            <article
              key={post.id}
              className="insight-card"
              onClick={() => setSelectedArticle(post)}
              data-cursor="view"
            >
              <div className="insight-media-wrap">
                <img src={post.image} alt={post.title} className="insight-img" loading="lazy" />
                <span className="insight-cat-badge">{post.category}</span>
              </div>

              <div className="insight-content">
                <div className="insight-meta-info">
                  <span className="meta-date"><Calendar size={13} /> {post.date}</span>
                  <span className="meta-divider">•</span>
                  <span className="meta-time"><Clock size={13} /> {post.readTime}</span>
                </div>

                <h3 className="heading-md insight-title">
                  {post.title}
                </h3>

                <p className="body-regular insight-summary">
                  {post.summary}
                </p>

                <div className="insight-footer-link">
                  <span className="read-essay-text">Read Perspective</span>
                  <ArrowUpRight size={16} className="insight-arrow" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="modal-backdrop" onClick={() => setSelectedArticle(null)} role="dialog" aria-modal="true">
          <div className="modal-drawer essay-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-meta">
                <span className="meta-num">[{selectedArticle.id} // PERSPECTIVE]</span>
                <span className="meta-tag">
                  <RedPixel size="sm" /> {selectedArticle.category}
                </span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close Essay"
              >
                <X size={22} />
              </button>
            </div>

            <div className="modal-body essay-body">
              <div className="essay-header">
                <span className="essay-meta-line">{selectedArticle.date} • {selectedArticle.readTime}</span>
                <h2 className="heading-xl essay-main-title">{selectedArticle.title}</h2>
              </div>

              <div className="essay-cover-wrap">
                <img src={selectedArticle.image} alt={selectedArticle.title} className="essay-cover" />
              </div>

              <div className="essay-content-text">
                <p className="body-lead essay-lead">{selectedArticle.summary}</p>
                <hr className="essay-divider" />
                <p className="body-regular">{selectedArticle.excerpt}</p>
                <p className="body-regular">
                  At Digilid, our studio methodology is rooted in the belief that great brands do not happen by accident. They are forged through intentionality, sharp critical thinking, and the bravery to strip away the superfluous until only pure signal remains.
                </p>
                <blockquote className="essay-quote">
                  “Clarity is not merely aesthetic—it is a competitive moat. When you understand your brand's core truth, every design decision becomes effortless.”
                </blockquote>
                <p className="body-regular">
                  Whether crafting a dynamic identity for a Series B technology company or designing an editorial platform for an architectural firm, we consistently find that the most impactful work comes from acute observation and profound creative discipline.
                </p>
              </div>

              <div className="essay-author-box">
                <div className="author-details">
                  <span className="author-name">Digilid Editorial Desk</span>
                  <span className="author-role">Published by Studio Strategy Group</span>
                </div>
                <RedPixel size="md" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
