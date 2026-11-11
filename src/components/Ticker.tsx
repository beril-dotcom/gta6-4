import { Asterisk } from 'lucide-react';
import { cn } from '@/lib/utils';

type TickerProps = {
  items: string[];
  reverse?: boolean;
  tone?: 'pink' | 'dark' | 'outline';
  className?: string;
};

export function Ticker({ items, reverse, tone = 'pink', className }: TickerProps) {
  return (
    <div
      className={cn(
        'marquee-paused relative flex overflow-hidden border-y py-4',
        tone === 'pink' && 'border-hot/30 bg-hot text-ink',
        tone === 'dark' && 'border-blush/10 bg-night text-blush',
        tone === 'outline' && 'border-blush/10 bg-ink text-blush',
        className,
      )}
    >
      <div className={cn('marquee-track', reverse && 'marquee-track--reverse')}>
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex items-center"
            aria-hidden={group === 1}
          >
            {items.map((item) => (
              <span key={`${group}-${item}`} className="flex items-center">
                <span className="whitespace-nowrap px-2 font-display text-[clamp(1.15rem,2.1vw,1.9rem)] uppercase leading-none tracking-tightest">
                  {item}
                </span>
                <Asterisk
                  className={cn(
                    'mx-4 h-4 w-4 shrink-0 md:mx-6',
                    tone === 'pink' ? 'text-ink/60' : 'text-hot',
                  )}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
