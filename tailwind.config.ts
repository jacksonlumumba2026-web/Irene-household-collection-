import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E8CA6B',
          dark: '#A8842A',
        },
        beige: {
          DEFAULT: '#F3EBDD',
          dark: '#E5D6BC',
        },
        mist: '#F5F5F4',
      },
      fontFamily: {
        heading: ['var(--font-outfit)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        accent: ['var(--font-poppins)', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 30px 80px -20px rgba(17,17,17,0.25)',
        gold: '0 8px 30px -4px rgba(212,175,55,0.45)',
        glass: '0 8px 32px rgba(0,0,0,0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'zoom-slow': 'zoomSlow 20s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        zoomSlow: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
