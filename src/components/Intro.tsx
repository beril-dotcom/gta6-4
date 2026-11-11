import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function Intro() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const duration = reduceMotion ? 250 : 900;
    const start = performance.now();
    let frame = 0;

    const tick = (time: number) => {
      const value = Math.min(1, (time - start) / duration);
      setProgress(value);
      if (value < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        window.setTimeout(() => setGone(true), reduceMotion ? 100 : 750);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (gone) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 z-[95] flex flex-col justify-between bg-ink px-[clamp(1.25rem,4.2vw,4.5rem)] py-8 transition-transform duration-700',
        leaving && '-translate-y-full',
      )}
      style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 78% 22%, hsl(var(--hot) / 0.28), transparent 34%), radial-gradient(circle at 12% 82%, hsl(var(--lavender) / 0.16), transparent 40%)',
        }}
      />

      <div className="relative flex items-start justify-between">
        <div className="label text-blush/60">Léo Parpeix</div>
        <div className="label text-blush/60">Portfolio — Vol. 04</div>
      </div>

      <div className="relative flex flex-col items-start gap-4">
        <p className="label text-hot">Loading the world</p>
        <h2 className="display text-[clamp(3rem,11vw,9rem)] text-blush">
          Vice City
        </h2>
      </div>

      <div className="relative">
        <div className="flex items-end justify-between pb-4">
          <p className="label text-blush/50">Art direction / Interactive</p>
          <p className="font-display text-2xl text-blush">
            {String(Math.round(progress * 100)).padStart(3, '0')}
            <span className="ml-1 text-sm text-blush/40">%</span>
          </p>
        </div>
        <div className="h-px w-full bg-blush/15">
          <div
            className="h-px bg-hot transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
