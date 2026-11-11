'use client';

import { useEffect, useRef } from 'react';

const PUPIL_TRAVEL_X = 16;
const PUPIL_TRAVEL_Y = 20;
const MOBILE_ORBIT_MS = 7042;

export default function FooterBackground() {
  const imageRef = useRef<HTMLImageElement>(null);
  const leftPupilRef = useRef<SVGGElement>(null);
  const rightPupilRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const image = imageRef.current!;
    const mobile = window.matchMedia('(max-width: 700px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let orbitStart = 0;
    let disposed = false;

    const setPupils = (x: number, y: number) => {
      const transform = `translate(${x.toFixed(2)} ${y.toFixed(2)})`;
      leftPupilRef.current?.setAttribute('transform', transform);
      rightPupilRef.current?.setAttribute('transform', transform);
    };

    const followPointer = (event: PointerEvent) => {
      if (mobile.matches) return;
      const rect = image.getBoundingClientRect();
      const scale = Math.max(rect.width / 1920, rect.height / 1080);
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2 + (516 - 540) * scale;
      const dx = event.clientX - eyeX;
      const dy = event.clientY - eyeY;
      const distance = Math.hypot(dx, dy);

      if (distance < 8) return;

      const strength = Math.min(1, distance / (160 * scale));
      setPupils(
        (dx / distance) * PUPIL_TRAVEL_X * strength,
        (dy / distance) * PUPIL_TRAVEL_Y * strength,
      );
    };

    const animateMobileGaze = (now: number) => {
      animationFrame = 0;
      if (disposed || !mobile.matches || reducedMotion.matches) return;
      if (!orbitStart) orbitStart = now;
      const angle = ((now - orbitStart) / MOBILE_ORBIT_MS) * Math.PI * 2;
      setPupils(Math.cos(angle) * PUPIL_TRAVEL_X, Math.sin(angle) * PUPIL_TRAVEL_Y);
      animationFrame = requestAnimationFrame(animateMobileGaze);
    };

    const updateMotion = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (mobile.matches) {
        orbitStart = 0;
        if (!reducedMotion.matches) animationFrame = requestAnimationFrame(animateMobileGaze);
        else setPupils(0, 0);
      } else {
        setPupils(0, 0);
      }
    };

    window.addEventListener('pointermove', followPointer, { passive: true });
    mobile.addEventListener('change', updateMotion);
    reducedMotion.addEventListener('change', updateMotion);
    updateMotion();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('pointermove', followPointer);
      mobile.removeEventListener('change', updateMotion);
      reducedMotion.removeEventListener('change', updateMotion);
    };
  }, []);

  return (
    <div className="footer-background" aria-hidden="true">
      <img ref={imageRef} className="mascot-art" src="/astronaut-resin.png" alt="" />
      <svg
        className="mascot-gaze"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g ref={leftPupilRef}>
          <ellipse cx="896" cy="516" rx="18" ry="29" fill="#111322" />
          <ellipse cx="890" cy="507" rx="5" ry="7" fill="#fff7ff" opacity=".8" />
          <ellipse cx="903" cy="522" rx="2.5" ry="3" fill="#78e5ef" opacity=".8" />
        </g>
        <g ref={rightPupilRef}>
          <ellipse cx="1024" cy="516" rx="18" ry="29" fill="#111322" />
          <ellipse cx="1018" cy="507" rx="5" ry="7" fill="#fff7ff" opacity=".8" />
          <ellipse cx="1031" cy="522" rx="2.5" ry="3" fill="#78e5ef" opacity=".8" />
        </g>
      </svg>
    </div>
  );
}
