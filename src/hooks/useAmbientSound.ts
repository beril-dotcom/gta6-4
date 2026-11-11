import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A soft, sun-bleached ambient chord generated in the browser.
 * Audio only starts after an explicit user gesture.
 */
export function useAmbientSound() {
  const [enabled, setEnabled] = useState(false);
  const [starting, setStarting] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const stop = useCallback(() => {
    const ctx = contextRef.current;
    const master = gainRef.current;

    if (ctx && master) {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0.0001, now + 0.6);
      window.setTimeout(() => {
        void ctx.close();
        if (contextRef.current === ctx) {
          contextRef.current = null;
          gainRef.current = null;
        }
      }, 900);
    }
    setEnabled(false);
  }, []);

  const start = useCallback(async () => {
    if (starting) return;
    setStarting(true);

    try {
      const existing = contextRef.current;
      if (existing) {
        await existing.resume();
        gainRef.current?.gain.linearRampToValueAtTime(
          0.05,
          existing.currentTime + 1.2,
        );
        setEnabled(true);
        return;
      }

      const AudioCtx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      contextRef.current = ctx;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, ctx.currentTime);
      master.connect(ctx.destination);
      gainRef.current = master;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 760;
      filter.Q.value = 0.7;
      filter.connect(master);

      const voices = [110, 164.81, 220, 277.18];
      voices.forEach((frequency, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.value = frequency;
        osc.detune.value = i % 2 === 0 ? -6 : 7;

        const voiceGain = ctx.createGain();
        voiceGain.gain.value = 0.2 / (i + 1);

        osc.connect(voiceGain);
        voiceGain.connect(filter);
        osc.start();
      });

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07;
      const lfoDepth = ctx.createGain();
      lfoDepth.gain.value = 260;
      lfo.connect(lfoDepth);
      lfoDepth.connect(filter.frequency);
      lfo.start();

      await ctx.resume();
      master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2.4);
      setEnabled(true);
    } catch {
      setEnabled(false);
    } finally {
      setStarting(false);
    }
  }, [starting]);

  const toggle = useCallback(() => {
    if (enabled) {
      stop();
      return;
    }
    void start();
  }, [enabled, start, stop]);

  useEffect(() => {
    return () => {
      void contextRef.current?.close();
      contextRef.current = null;
      gainRef.current = null;
    };
  }, []);

  return { enabled, starting, toggle };
}
