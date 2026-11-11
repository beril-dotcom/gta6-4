import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

type NavProps = {
  soundEnabled: boolean;
  soundStarting: boolean;
  onToggleSound: () => void;
};

export function Nav({ soundEnabled, soundStarting, onToggleSound }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('work');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);

      const ids = ['work', 'about', 'playground', 'contact'];
      let current = '';
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;
        if (element.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = id;
        }
      });
      if (current) setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[80] transition-all duration-500',
          scrolled
            ? 'border-b border-blush/10 bg-ink/70 py-4 backdrop-blur-xl'
            : 'border-b border-transparent py-6',
        )}
      >
        <div className="edge flex items-center justify-between gap-6">
          <a
            href="#top"
            data-cursor="Top"
            className="group flex items-baseline gap-3"
            aria-label={`${site.name} — back to top`}
          >
            <span className="font-display text-xl uppercase leading-none tracking-tightest text-blush transition-colors duration-300 group-hover:text-hot md:text-2xl">
              {site.name}
            </span>
            <span className="label hidden text-blush/40 sm:inline">
              Art direction
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-blush/12 bg-ink/30 px-2 py-1.5 backdrop-blur-md md:flex"
          >
            {site.nav.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = active === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor="Go"
                  className={cn(
                    'group relative rounded-full px-4 py-2 text-sm transition-colors duration-300',
                    isActive
                      ? 'bg-blush/10 text-blush'
                      : 'text-blush/55 hover:text-blush',
                  )}
                >
                  <span className="label mr-2 text-[0.58rem] text-blush/35">
                    {item.index}
                  </span>
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={onToggleSound}
              aria-pressed={soundEnabled}
              className="hidden h-10 items-center gap-2 rounded-full border border-blush/15 px-4 text-blush/70 transition-colors duration-300 hover:border-hot/60 hover:text-blush sm:flex"
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
              <span className="label">
                {soundStarting ? 'Warming up' : soundEnabled ? 'Sound on' : 'Sound off'}
              </span>
            </button>

            <a
              href="#contact"
              data-cursor="Talk"
              className="group hidden h-10 items-center gap-3 rounded-full bg-blush px-5 text-ink transition-colors duration-300 hover:bg-hot md:flex"
            >
              <span className="label">Let&apos;s talk</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-blush/15 text-blush transition-colors hover:border-hot/60 md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-[90] flex flex-col bg-ink transition-opacity duration-500 md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="edge flex items-center justify-between py-6">
          <span className="font-display text-xl uppercase tracking-tightest text-blush">
            {site.name}
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blush/15 text-blush"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav aria-label="Mobile" className="edge flex flex-1 flex-col justify-center">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-blush/10 py-4"
            >
              <span className="display text-5xl text-blush">{item.label}</span>
              <span className="label text-hot">{item.index}</span>
            </a>
          ))}
        </nav>

        <div className="edge flex items-center justify-between pb-8">
          <a href={`mailto:${site.email}`} className="label text-blush/70">
            {site.email}
          </a>
          <button
            type="button"
            onClick={onToggleSound}
            className="flex items-center gap-2 rounded-full border border-blush/20 px-4 py-2 text-blush/80"
          >
            {soundEnabled ? (
              <Volume2 className="h-3.5 w-3.5" />
            ) : (
              <VolumeX className="h-3.5 w-3.5" />
            )}
            <span className="label">{soundEnabled ? 'Sound on' : 'Sound off'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
