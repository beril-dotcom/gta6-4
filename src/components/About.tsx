import { ArrowUpRight, Check } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { site } from '@/lib/site';

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-blush/10 bg-night py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--hot) / 0.35), transparent 65%)',
        }}
      />

      <div className="edge relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="label mb-6 flex items-center gap-3 text-hot">
                <span className="h-1.5 w-1.5 rounded-full bg-hot" />
                02 — About
              </p>
              <h2 className="display text-[clamp(2.15rem,4.6vw,3.75rem)] text-blush">
                Raised in France.
                <br />
                <span className="text-blush/40">Designing worldwide.</span>
              </h2>

              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 rounded-full border border-blush/15 bg-ink/40 px-4 py-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-hot opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-hot" />
                  </span>
                  <span className="label text-blush/70">
                    Booking select projects — 2027
                  </span>
                </div>
                <p className="max-w-[16rem] text-sm leading-relaxed text-blush/50">
                  {site.location}. Working with teams in Paris, New York, Berlin
                  and wherever the brief lands.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <p className="text-balance font-display text-[clamp(1.6rem,3.1vw,2.85rem)] leading-[1.15] tracking-[-0.02em] text-blush">
              I&apos;m Léo — an art director and interactive designer who makes
              the internet feel a little more like{' '}
              <span className="text-hot">a place</span>. Big type, honest
              motion, and just enough <span className="text-lavender">3D</span>{' '}
              to forget you&apos;re in a browser.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <figure className="group relative overflow-hidden rounded-2xl border border-blush/10 bg-ink">
              <img
                src="/media/project-4.webp"
                alt="Casa Marea — a pool at dusk overlooking the bay"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5">
                <div>
                  <p className="label text-hot">Casa Marea</p>
                  <p className="mt-2 font-display text-xl leading-none tracking-tightest text-blush">
                    Hospitality, lit like a film still
                  </p>
                </div>
                <span className="label text-blush/50">2025 — Art direction</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Reveal delay={60}>
              <p className="text-sm leading-relaxed text-blush/60">
                For ten years I&apos;ve worked with studios, agencies and
                founders who would rather be remembered than ranked. I lead
                projects from the first sketch to the final shader: strategy,
                design, motion, and the code that flips it all live.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-sm leading-relaxed text-blush/60">
                The work leans on typography, light and a certain temperature —
                sunsets, chrome, salt on the lens. Before going independent I
                directed interactive campaigns for fashion and hospitality
                houses across Europe.
              </p>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <dl className="mt-12 grid grid-cols-3 gap-4 border-y border-blush/10 py-8">
              {site.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <dt className="stat-value text-blush">{stat.value}</dt>
                  <dd className="label text-blush/40">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={60} className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <p className="label mb-5 text-blush/40">What I do</p>
              <ul className="flex flex-col gap-3">
                {site.services.map((service) => (
                  <li
                    key={service}
                    className="flex items-center gap-3 text-sm text-blush/75"
                  >
                    <Check className="h-3.5 w-3.5 text-hot" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-blush/10 bg-ink/40 p-6">
              <p className="font-display text-xl leading-snug tracking-tightest text-blush">
                &ldquo;A site that feels cared for. And a friend who replies.&rdquo;
              </p>
              <a
                href={`mailto:${site.email}`}
                data-cursor="Say hi"
                className="group inline-flex items-center gap-3 text-sm text-blush/70 transition-colors hover:text-hot"
              >
                <span className="link-underline">Start a conversation</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
