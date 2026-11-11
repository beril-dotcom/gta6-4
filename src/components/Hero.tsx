import { useEffect, useRef } from 'react';
import { ArrowDown, Volume2, VolumeX } from 'lucide-react';
import { site } from '@/lib/site';

type HeroProps = {
  soundEnabled: boolean;
  onToggleSound: () => void;
};

export function Hero({ soundEnabled, onToggleSound }: HeroProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduceMotion) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY, window.innerHeight);
        if (imageRef.current) {
          imageRef.current.style.transform = `translate3d(0, ${offset * 0.18}px, 0) scale(1.04)`;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-32 md:pt-36"
    >
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src="/media/hero.jpg"
          alt="Vice City coastline at sunset, seen from a rooftop terrace"
          className="h-full w-full object-cover object-[62%_center] will-change-transform"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(12,13,27,0.55) 0%, rgba(12,13,27,0.06) 26%, rgba(12,13,27,0.1) 52%, rgba(12,13,27,0.72) 78%, #0c0d1b 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              'radial-gradient(120% 80% at 15% 100%, rgba(12,13,27,0.9) 0%, transparent 60%), linear-gradient(90deg, rgba(12,13,27,0.5) 0%, transparent 45%)',
          }}
        />
      </div>

      <div className="edge relative z-10 flex items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <p className="label text-blush/70">Art direction — Interactive — Motion</p>
          <p className="max-w-xs text-sm leading-relaxed text-blush/60">
            Portfolio of {site.name}, building sun-soaked digital worlds from the
            French Riviera.
          </p>
        </div>

        <div className="hidden flex-col items-end gap-3 sm:flex">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
              <defs>
                <path
                  id="badge-circle"
                  d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="fill-blush/70 text-[8.6px] uppercase tracking-[0.28em]">
                <textPath href="#badge-circle">
                  Available for projects — 2027 —
                </textPath>
              </text>
            </svg>
            <ArrowDown className="h-5 w-5 text-hot" />
          </div>
        </div>
      </div>

      <div className="edge relative z-10 mt-auto pb-8 md:pb-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3 rounded-full border border-blush/20 bg-ink/35 py-1 pl-1 pr-4 backdrop-blur-md">
            <button
              type="button"
              onClick={onToggleSound}
              className="flex h-8 items-center gap-2 rounded-full bg-hot px-3 text-ink transition-colors duration-300 hover:bg-pink"
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
              <span className="label font-medium">
                {soundEnabled ? 'Mute' : 'Click for sound'}
              </span>
            </button>
            <span className="hidden text-xs text-blush/60 sm:inline">
              {soundEnabled ? 'Ambient channel live' : 'An ambient channel awaits'}
            </span>
          </div>

          <p className="label hidden text-blush/50 md:block">
            {site.coordinates}
          </p>
        </div>

        <h1 className="hero-title text-blush">
          <span className="mr-[0.12em]">Léo</span>
          <span>Parpeix</span>
        </h1>

        <div className="mt-8 grid gap-6 border-t border-blush/15 pt-6 md:grid-cols-12 md:items-start">
          <div className="md:col-span-4">
            <p className="font-display text-xl leading-tight text-blush md:text-2xl">
              {site.role}
            </p>
          </div>
          <div className="md:col-span-5">
            <p className="max-w-md text-sm leading-relaxed text-blush/65">
              I build worlds in type, motion and light — websites with heat, a
              pulse and a point of view. Ten years of shipping the loud stuff
              quietly.
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
            <a
              href="#work"
              data-cursor="Scroll"
              className="group inline-flex items-center gap-3 text-blush/80 transition-colors hover:text-hot"
            >
              <span className="label">Selected work</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-blush/25 transition-colors group-hover:border-hot">
                <ArrowDown className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
