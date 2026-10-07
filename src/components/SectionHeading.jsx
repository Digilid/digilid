import React from 'react';
import RedPixel from './RedPixel';

export default function SectionHeading({
  number,
  category,
  title,
  subtitle,
  align = 'left',
  theme = 'light'
}) {
  return (
    <div className={`section-header-wrap ${align === 'center' ? 'text-center' : ''}`}>
      {/* Top Editorial Meta Line */}
      <div className="section-meta-row">
        {number && <span className="meta-num">[{number}]</span>}
        {category && (
          <span className="meta-tag">
            <RedPixel size="sm" />
            {category}
          </span>
        )}
      </div>

      {/* Main Editorial Title */}
      <h2 className="heading-xl section-title">
        {title}
      </h2>

      {/* Optional Editorial Subtitle */}
      {subtitle && (
        <p className="section-subtitle body-lead">
          {subtitle}
        </p>
      )}

      {/* Editorial Rule Divider */}
      <div className="section-rule-bar" />
    </div>
  );
}
