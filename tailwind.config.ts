import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        ink: 'hsl(var(--ink))',
        night: 'hsl(var(--night))',
        panel: 'hsl(var(--panel))',
        blush: 'hsl(var(--blush))',
        pink: 'hsl(var(--pink))',
        hot: 'hsl(var(--hot))',
        lavender: 'hsl(var(--lavender))',
        cream: 'hsl(var(--cream))',
        sunset: 'hsl(var(--sunset))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        display: ['Avantt', 'Archivo', 'Helvetica Neue', 'sans-serif'],
        sans: ['"Monument Grotesk"', 'Avantt', 'Helvetica Neue', 'sans-serif'],
        mono: ['"Monument Grotesk"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.065em',
        label: '0.18em',
      },
      boxShadow: {
        glow: '0 0 60px -12px hsl(var(--hot) / 0.55)',
        card: '0 30px 80px -40px rgba(4, 5, 12, 0.9)',
      },
      backgroundImage: {
        'sunset-fade':
          'linear-gradient(122deg, hsl(var(--lavender) / 0.9) 0%, hsl(var(--pink)) 45%, hsl(var(--sunset)) 100%)',
        'night-fade':
          'linear-gradient(160deg, hsl(var(--ink)) 0%, hsl(var(--night)) 48%, hsl(var(--panel) / 0.7) 100%)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'marquee-reverse': {
          from: { transform: 'translate3d(-50%,0,0)' },
          to: { transform: 'translate3d(0,0,0)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(120%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'marquee-slow': 'marquee 58s linear infinite',
        'marquee-reverse': 'marquee-reverse 46s linear infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'rise-in': 'rise-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-up': 'fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
