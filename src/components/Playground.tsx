import { ArrowLeftRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { projects } from '@/lib/site';

const studies = projects.map((project, index) => ({
  ...project,
  size: index % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]',
}));

export function Playground() {
  return (
    <section
      id="playground"
      className="relative overflow-hidden border-t border-blush/10 py-24 md:py-32"
    >
      <div className="edge">
        <Reveal className="mb-12 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label mb-6 flex items-center gap-3 text-hot">
              <span className="h-1.5 w-1.5 rounded-full bg-hot" />
              03 — Playground
            </p>
            <h2 className="display max-w-xl text-[clamp(2.75rem,6vw,5.5rem)] text-blush">
              Off the clock,
              <br />
              <span className="text-blush/40">still on brand.</span>
            </h2>
          </div>
          <div className="flex max-w-xs flex-col gap-4 md:pb-2">
            <p className="text-sm leading-relaxed text-blush/60">
              Personal studies in light, chrome and saltwater. No brief, no
              client, no committee — just a good excuse to push a render until
              it hums.
            </p>
            <span className="label inline-flex items-center gap-2 text-blush/35">
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Hover to hold
            </span>
          </div>
        </Reveal>
      </div>

      <div className="marquee-paused relative flex overflow-hidden pb-4">
        <div className="marquee-track--reverse marquee-track">
          {[0, 1].map((group) => (
            <div key={group} className="flex gap-5 pr-5" aria-hidden={group === 1}>
              {studies.map((study) => (
                <figure
                  key={`${group}-${study.slug}`}
                  className="group relative w-[70vw] shrink-0 overflow-hidden rounded-2xl border border-blush/10 bg-night sm:w-[20rem] md:w-[23rem]"
                >
                  <img
                    src={study.image}
                    alt={`${study.title} — personal study`}
                    loading="lazy"
                    className={`${study.size} w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/20" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <div>
                      <p className="label text-hot">{study.index}</p>
                      <p className="mt-2 font-display text-lg uppercase leading-none tracking-tightest text-blush">
                        {study.title}
                      </p>
                    </div>
                    <span className="label shrink-0 text-blush/50">
                      {study.year}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="edge mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-blush/45">
          Renders, type tests and motion sketches made between projects.
        </p>
        <a
          href="#contact"
          data-cursor="Talk"
          className="link-underline label text-blush/70"
        >
          Commission a study
        </a>
      </div>
    </section>
  );
}
