import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'rgb(var(--background) / <alpha-value>)',
          secondary: 'rgb(var(--background-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--background-tertiary) / <alpha-value>)',
          card: 'rgb(var(--background-card) / <alpha-value>)',
          'card-hover': 'rgb(var(--background-card-hover) / <alpha-value>)',
        },
        foreground: {
          DEFAULT: 'rgb(var(--foreground) / <alpha-value>)',
          secondary: 'rgb(var(--foreground-secondary) / <alpha-value>)',
          muted: 'rgb(var(--foreground-muted) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
          lighter: 'var(--accent-lighter)',
          dark: 'var(--accent-dark)',
        },
        border: {
          DEFAULT: 'rgba(var(--border))',
          hover: 'rgba(var(--border-hover))',
          accent: 'rgba(var(--border-accent))',
          'accent-hover': 'rgba(var(--border-accent-hover))',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1600px',
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'glow': '0 0 40px rgba(194, 65, 12, 0.1)',
        'glow-strong': '0 0 60px rgba(194, 65, 12, 0.2)',
        'button': '0 0 20px rgba(194, 65, 12, 0.3)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 50%, var(--accent-lighter) 100%)',
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
