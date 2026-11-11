import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches;
    if (!finePointer) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let frame = 0;

    document.body.classList.add('has-custom-cursor');

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }

      const element = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cursor]',
      );
      if (element) {
        setActive(true);
        setLabel(element.dataset.cursor ?? '');
      } else {
        setActive(false);
        setLabel('');
      }
    };

    const render = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    window.addEventListener('pointermove', onMove, { passive: true });

    const onLeave = () => setVisible(false);
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 z-[92] hidden transition-opacity duration-300 md:block',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div
        ref={ringRef}
        className={cn(
          'absolute left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300',
          active
            ? 'h-[5.25rem] w-[5.25rem] border-hot bg-hot'
            : 'h-9 w-9 border-blush/45 bg-transparent',
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <span
          className={cn(
            'label font-medium text-ink transition-opacity duration-200',
            active ? 'opacity-100' : 'opacity-0',
          )}
        >
          {label}
        </span>
      </div>
      <div
        ref={dotRef}
        className={cn(
          'absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-hot transition-opacity duration-200',
          active ? 'opacity-0' : 'opacity-100',
        )}
      />
    </div>
  );
}
