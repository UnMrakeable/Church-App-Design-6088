/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        sacred: {
          50: '#fef7f0',
          100: '#feede1',
          200: '#fcd9c2',
          300: '#f9bfa3',
          400: '#f59e7a',
          500: '#f17851',
          600: '#e85d28',
          700: '#bf4a1f',
          800: '#963716',
          900: '#6d240e',
        },
        peace: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'sans': ['Nunito', 'system-ui', 'sans-serif'],
        'mono': ['Roboto Mono', 'Consolas', 'monospace'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Nunito', 'system-ui', 'sans-serif'],
        'hymn': ['Nunito', 'system-ui', 'sans-serif'],
        'chord': ['Roboto Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      screens: {
        'print': {'raw': 'print'},
      },
    },
  },
  plugins: [],
}