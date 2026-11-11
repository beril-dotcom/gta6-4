import { useCallback, useEffect, useState } from 'react';
import { Cursor } from '@/components/Cursor';
import { Intro } from '@/components/Intro';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Ticker } from '@/components/Ticker';
import { Work } from '@/components/Work';
import { About } from '@/components/About';
import { Playground } from '@/components/Playground';
import { Footer } from '@/components/Footer';
import { ProjectDialog } from '@/components/ProjectDialog';
import { useAmbientSound } from '@/hooks/useAmbientSound';
import { projects, site, tickerItems, type Project } from '@/lib/site';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[85] h-[2px] bg-transparent"
    >
      <div
        className="h-full bg-hot"
        style={{ width: `${progress * 100}%`, transition: 'width 90ms linear' }}
      />
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState<Project | null>(null);
  const sound = useAmbientSound();

  const closeProject = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const index = projects.findIndex((item) => item.slug === selected.slug);
    document.title = `${selected.title} — ${site.name}`;
    return () => {
      if (index >= 0) {
        document.title = `${site.name} — Art Director & Interactive Designer`;
      }
    };
  }, [selected]);

  return (
    <div className="grain relative min-h-screen bg-background">
      <Intro />
      <Cursor />
      <ScrollProgress />

      <Nav
        soundEnabled={sound.enabled}
        soundStarting={sound.starting}
        onToggleSound={sound.toggle}
      />

      <main>
        <Hero
          soundEnabled={sound.enabled}
          onToggleSound={sound.toggle}
        />

        <Ticker items={tickerItems} />

        <Work onSelect={setSelected} />

        <About />

        <Ticker
          items={[
            'Vice City',
            'World building',
            'Chrome & salt',
            'Available 2027',
          ]}
          reverse
          tone="dark"
          className="border-y-0"
        />

        <Playground />

        <Footer
          soundEnabled={sound.enabled}
          onToggleSound={sound.toggle}
        />
      </main>

      <ProjectDialog
        project={selected}
        onClose={closeProject}
        onNext={setSelected}
      />
    </div>
  );
}
