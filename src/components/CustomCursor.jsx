import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState(''); // '' | 'hover' | 'view' | 'start'
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Dynamic element detection on hover
    const handleElementHover = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const mode = target.getAttribute('data-cursor');
        setCursorMode(mode);
      } else if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
        setCursorMode('hover');
      } else {
        setCursorMode('');
      }
    };

    window.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible]);

  // Smooth lerp follower
  useEffect(() => {
    if (isTouch) return;
    let animationFrameId;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animateFollower = () => {
      setFollowerPos((prev) => ({
        x: lerp(prev.x, position.x, 0.18),
        y: lerp(prev.y, position.y, 0.18)
      }));
      animationFrameId = requestAnimationFrame(animateFollower);
    };

    animationFrameId = requestAnimationFrame(animateFollower);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        className="cursor-dot"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          opacity: cursorMode === 'view' ? 0 : 1
        }}
      />

      {/* Smooth geometric follower */}
      <div
        className={`cursor-follower ${
          cursorMode === 'hover'
            ? 'hovering'
            : cursorMode === 'view'
            ? 'view-mode'
            : cursorMode === 'start'
            ? 'cta-mode'
            : ''
        }`}
        style={{
          transform: `translate3d(${followerPos.x}px, ${followerPos.y}px, 0) translate(-50%, -50%)`
        }}
      >
        {cursorMode === 'view' && <span>View</span>}
        {cursorMode === 'start' && <span>Start</span>}
      </div>
    </>
  );
}
