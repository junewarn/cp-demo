import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cp-primary': '#E91E8C',
        'cp-primary-light': '#F8BBD0',
        'cp-primary-dark': '#AD1457',
        'cp-accent': '#FF6B9D',
        'cp-gold': '#FFD700',
        'cp-platinum': '#C0C0C0',
        'sp-bestie': '#4D96FF',
        'sp-bestie-light': '#E3F2FD',
        'sp-bestie-border': '#90CAF9',
        'sp-soulmate': '#9B59B6',
        'sp-soulmate-light': '#F3E5F5',
        'sp-soulmate-border': '#CE93D8',
        'sp-homie': '#FF8C00',
        'sp-homie-light': '#FFF3E0',
        'sp-homie-border': '#FFCC80',
        'cp-space-dark': '#1a0a2e',
        'cp-space-mid': '#2d1b4e',
        'cp-space-warm': '#4a1942',
        'cp-space-end': '#6b1d52',
        'cert-lv3': '#B3E5FC',
        'cert-lv4': '#F8BBD0',
        'cert-lv5': '#FFE082',
        'cert-lv6': '#CE93D8',
        'cert-lv7': '#EF9A9A',
        'btn-crystal': 'rgba(255, 255, 255, 0.15)',
        'btn-crystal-border': 'rgba(255, 255, 255, 0.25)',
        'btn-gold-border': '#FFD700',
      },
      maxWidth: {
        mobile: '390px',
      },
      animation: {
        sweep: 'sweep 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'heart-beat': 'heart-beat 1.5s ease-in-out infinite',
        'scroll-up': 'scroll-up 0.6s ease-in-out',
        'slide-left': 'slide-left 8s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
        'rainbow-shift': 'rainbow-shift 4s linear infinite',
        'heart-pulse': 'heart-pulse 1.5s ease-in-out infinite',
        'wing-float': 'wing-float 2s ease-in-out infinite',
        'sparkle-char': 'sparkle-char 0.6s ease-out',
        'star-twinkle': 'star-twinkle 2s ease-in-out infinite',
        'gift-scroll-vertical': 'gift-scroll-vertical 3s linear infinite',
        'curtain-wave': 'curtain-wave 4s ease-in-out infinite',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'heart-beat': {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.15)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.1)' },
          '60%': { transform: 'scale(1)' },
        },
        'scroll-up': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'rainbow-shift': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        'heart-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
        },
        'wing-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-4px) rotate(2deg)' },
        },
        'sparkle-char': {
          '0%': { opacity: '0', transform: 'scale(0.5) translateY(10px)' },
          '60%': { opacity: '1', transform: 'scale(1.1) translateY(-2px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.5)' },
        },
        'gift-scroll-vertical': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'curtain-wave': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'cp-space-stars':
          'linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 30%, #4a1942 60%, #6b1d52 100%)',
        'cp-space-curtain':
          'linear-gradient(180deg, rgba(255,182,193,0.15), rgba(255,105,180,0.08))',
        'cp-golden-column':
          'linear-gradient(180deg, #FFD700 0%, #C9A96E 40%, #A68A4F 60%, #C9A96E 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
