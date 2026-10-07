import React from 'react';

export default function RedPixel({ size = 'md', className = '', animate = false }) {
  const sizeClasses = {
    sm: 'red-pixel-sm',
    md: '',
    lg: 'red-pixel-lg'
  };

  return (
    <span
      className={`red-pixel ${sizeClasses[size] || ''} ${animate ? 'pixel-pulse' : ''} ${className}`}
      aria-hidden="true"
    />
  );
}
