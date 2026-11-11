import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { projects, site, type Project } from '@/lib/site';

type ProjectDialogProps = {
  project: Project | null;
  onClose: () => void;
  onNext: (project: Project) => void;
};

export function ProjectDialog({ project, onClose, onNext }: ProjectDialogProps) {
  useEffect(() => {
    if (!project) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/80 p-0 backdrop-blur-md md:items-center md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <button
        type="button"
        aria-label="Close project"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
        tabIndex={-1}
      />

      <div className="relative z-10 my-0 w-full max-w-5xl animate-in fade-in-0 zoom-in-95 duration-500 ease-out md:my-4">
        <div className="overflow-hidden border border-blush/15 bg-night shadow-card md:rounded-3xl">
          <div className="relative">
            <img
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              className="h-[40vh] w-full object-cover md:h-[46vh]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/10 to-transparent" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close project"
              autoFocus
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-blush/25 bg-ink/50 text-blush backdrop-blur-md transition-colors hover:border-hot hover:text-hot"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-6 p-5 md:p-8">
              <div>
                <p className="label mb-3 text-hot">
                  {project.index} — {project.category}
                </p>
                <h3
                  id="project-title"
                  className="display text-[clamp(2.25rem,6vw,4.5rem)] text-blush"
                >
                  {project.title}
                </h3>
              </div>
              <span className="label hidden shrink-0 pb-2 text-blush/60 sm:block">
                {project.year}
              </span>
            </div>
          </div>

          <div className="grid gap-8 p-5 md:grid-cols-12 md:p-8">
            <div className="md:col-span-7">
              <p className="font-display text-xl leading-snug text-blush md:text-2xl">
                {project.brief}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-blush/60">
                {project.description}
              </p>
            </div>

            <div className="md:col-span-5">
              <dl className="divide-y divide-blush/10 border-y border-blush/10">
                {project.credits.map((credit) => (
                  <div
                    key={credit.label}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt className="label text-blush/40">{credit.label}</dt>
                    <dd className="text-right text-sm text-blush/80">
                      {credit.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  `Case study — ${project.title}`,
                )}`}
                className="group mt-5 flex items-center justify-between gap-4 rounded-full bg-blush px-5 py-3 text-ink transition-colors hover:bg-hot"
              >
                <span className="label">Request the case study</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNext(next)}
            className="group flex w-full items-center justify-between gap-4 border-t border-blush/10 px-5 py-5 text-left transition-colors hover:bg-ink/60 md:px-8"
          >
            <span>
              <span className="label block text-blush/40">Next project</span>
              <span className="mt-2 block font-display text-xl uppercase tracking-tightest text-blush transition-colors group-hover:text-hot md:text-2xl">
                {next.title}
              </span>
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blush/20 text-blush transition-colors group-hover:border-hot group-hover:text-hot">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
