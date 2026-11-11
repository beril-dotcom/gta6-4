import { useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { site } from '@/lib/site';

type FooterProps = {
  soundEnabled: boolean;
  onToggleSound: () => void;
};

function useNiceClock() {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const update = () => setTime(formatter.format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return time;
}

export function Footer({ soundEnabled, onToggleSound }: FooterProps) {
  const time = useNiceClock();

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-blush/10">
      <img
        src="/media/footer.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #0c0d1b 0%, rgba(12,13,27,0.72) 28%, rgba(12,13,27,0.55) 60%, rgba(12,13,27,0.92) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(100% 70% at 80% 20%, rgba(255,122,168,0.22), transparent 60%)',
        }}
      />

      <div className="edge relative flex min-h-[88svh] flex-col justify-between gap-16 pb-8 pt-24 md:pt-28">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <p className="label flex items-center gap-3 text-hot">
            <span className="h-1.5 w-1.5 rounded-full bg-hot" />
            04 — Contact
          </p>
          <p className="label max-w-[16rem] text-right text-blush/50">
            Currently booking Q1 2027 — one or two projects at a time
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="display text-[clamp(3rem,9.5vw,8.5rem)] text-blush">
              Let&apos;s make
              <br />
              <span
                className="bg-sunset-fade bg-clip-text text-transparent"
                style={{ WebkitTextFillColor: 'transparent' }}
              >
                something loud.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4 lg:items-end">
            <a
              href={`mailto:${site.email}`}
              data-cursor="Email"
              className="group flex w-full items-center justify-between gap-4 rounded-full bg-blush px-6 py-4 text-ink transition-colors duration-300 hover:bg-hot sm:w-auto"
            >
              <span className="text-sm font-medium sm:text-base">{site.email}</span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline label text-blush/60 transition-colors hover:text-blush"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-blush/15 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="label text-blush/40">
                © {new Date().getFullYear()} {site.name}
              </span>
              <span className="label text-blush/40">{site.coordinates}</span>
              <span className="label text-blush/40">
                Nice — {time} CET
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onToggleSound}
                className="flex items-center gap-2 rounded-full border border-blush/20 px-4 py-2 text-blush/70 transition-colors hover:border-hot/60 hover:text-blush"
              >
                {soundEnabled ? (
                  <Volume2 className="h-3.5 w-3.5" />
                ) : (
                  <VolumeX className="h-3.5 w-3.5" />
                )}
                <span className="label">
                  {soundEnabled ? 'Ambient on' : 'Ambient off'}
                </span>
              </button>

              <a
                href="#top"
                aria-label="Back to top"
                data-cursor="Top"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-blush/20 text-blush/70 transition-colors hover:border-hot hover:text-hot"
              >
                <ArrowUp className="h-4 w-4" />
              </a>
            </div>
          </div>

          <p className="max-w-2xl text-xs leading-relaxed text-blush/25">
            A fictional portfolio concept, art-directed in the spirit of a
            neon-soaked open world. All imagery is original AI artwork created
            for this study.
          </p>
        </div>
      </div>
    </footer>
  );
}
