import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects, site, type Project } from '@/lib/site';
import { Reveal } from '@/components/Reveal';

type WorkProps = {
  onSelect: (project: Project) => void;
};

export function Work({ onSelect }: WorkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<{ id: string; x: number; y: number } | null>(
    null,
  );

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPreview((current) =>
      current
        ? { ...current, x: event.clientX - rect.left, y: event.clientY - rect.top }
        : current,
    );
  };

  const hovered = preview ? projects.find((item) => item.slug === preview.id) : null;

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="edge">
        <Reveal className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label mb-6 flex items-center gap-3 text-hot">
              <span className="h-1.5 w-1.5 rounded-full bg-hot" />
              01 — Selected work
            </p>
            <h2 className="display max-w-2xl text-[clamp(2.75rem,6.4vw,6rem)] text-blush">
              Six worlds,
              <br />
              <span className="text-blush/40">no filler.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-blush/60 md:pb-2">
            Campaigns, identities and interactive worlds made with studios,
            houses and founders who wanted something with a pulse. Hover a line
            to peek, click for the whole story.
          </p>
        </Reveal>

        <Reveal>
          <div
            ref={containerRef}
            className="relative"
            onPointerMove={handleMove}
            onPointerLeave={() => setPreview(null)}
          >
            <div className="border-t border-blush/15">
              {projects.map((project) => (
                <button
                  key={project.slug}
                  type="button"
                  data-cursor="View"
                  onClick={() => onSelect(project)}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== 'mouse') return;
                    const rect = containerRef.current?.getBoundingClientRect();
                    if (!rect) return;
                    setPreview({
                      id: project.slug,
                      x: event.clientX - rect.left,
                      y: event.clientY - rect.top,
                    });
                  }}
                  className="work-row group grid w-full grid-cols-[2.5rem_1fr_2.5rem] items-center gap-3 border-b border-blush/15 py-6 text-left transition-colors duration-500 md:grid-cols-[4rem_1fr_12rem_6rem_3.5rem] md:gap-6 md:py-8"
                >
                  <span className="label text-blush/40 transition-colors duration-500 group-hover:text-hot">
                    {project.index}
                  </span>

                  <span className="flex flex-col gap-2">
                    <span className="row-title font-display text-[clamp(1.75rem,3.6vw,3.4rem)] uppercase leading-[0.95] tracking-tightest text-blush transition-colors duration-500">
                      {project.title}
                    </span>
                    <span className="text-xs text-blush/45 md:hidden">
                      {project.category} — {project.year}
                    </span>
                  </span>

                  <span className="hidden text-sm text-blush/55 md:block">
                    {project.category}
                  </span>
                  <span className="label hidden text-blush/40 md:block">
                    {project.year}
                  </span>

                  <span className="flex justify-end">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blush/20 text-blush/70 transition-all duration-500 group-hover:border-hot group-hover:bg-hot group-hover:text-ink">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {preview ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute z-20 hidden md:block"
                style={{
                  left: preview.x,
                  top: preview.y,
                  width: '22rem',
                  opacity: hovered ? 1 : 0,
                  transform: hovered
                    ? 'translate(-50%, -50%) scale(1) rotate(-2deg)'
                    : 'translate(-50%, -40%) scale(0.92) rotate(-3deg)',
                  transition:
                    'opacity 300ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <div className="overflow-hidden rounded-2xl border border-blush/15 bg-night shadow-card">
                  <img
                    src={hovered?.image ?? projects[0].image}
                    alt=""
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="label text-blush/70">
                      {hovered?.client ?? projects[0].client}
                    </span>
                    <span className="label text-hot">
                      {hovered?.year ?? projects[0].year}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="label text-blush/35">2024 — 2026 / Selected six of forty-eight</p>
          <a
            href={`mailto:${site.email}?subject=Full%20portfolio`}
            data-cursor="Ask"
            className="link-underline label text-blush/70"
          >
            Request the full index
          </a>
        </Reveal>
      </div>
    </section>
  );
}
