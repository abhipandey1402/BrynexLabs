import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#050505',
          secondary: '#0A0A0A',
          tertiary: '#111111',
          card: '#0D0D0D',
          'card-hover': '#141414',
        },
        foreground: {
          DEFAULT: '#F5F5F5',
          secondary: '#A3A3A3',
          muted: '#737373',
        },
        accent: {
          DEFAULT: '#C2410C',
          light: '#EA580C',
          lighter: '#F59E0B',
          dark: '#9A3412',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.06)',
          hover: 'rgba(255, 255, 255, 0.12)',
          accent: 'rgba(194, 65, 12, 0.3)',
          'accent-hover': 'rgba(194, 65, 12, 0.5)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1600px', // Widened to match Aeos Labs style
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 40px rgba(194, 65, 12, 0.1)',
        'glow-strong': '0 0 60px rgba(194, 65, 12, 0.2)',
        'button': '0 0 20px rgba(194, 65, 12, 0.3)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #C2410C 0%, #EA580C 50%, #F59E0B 100%)',
        'accent-gradient-subtle': 'linear-gradient(135deg, rgba(194, 65, 12, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)',
        'accent-glow': 'radial-gradient(ellipse at center, rgba(194, 65, 12, 0.15) 0%, rgba(234, 88, 12, 0.08) 40%, transparent 70%)',
        'accent-glow-strong': 'radial-gradient(ellipse at center, rgba(194, 65, 12, 0.25) 0%, rgba(234, 88, 12, 0.12) 40%, transparent 70%)',
        'hero-glow': 'radial-gradient(600px circle at 50% 30%, rgba(194, 65, 12, 0.12) 0%, rgba(234, 88, 12, 0.06) 40%, transparent 70%)',
        'nav-gradient': 'linear-gradient(180deg, rgba(194, 65, 12, 0.08) 0%, transparent 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
