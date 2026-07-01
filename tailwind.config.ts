import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c2d7ff',
          300: '#a3c4ff',
          400: '#85b0ff',
          500: '#669cff',
          600: '#4878ff',
          700: '#2a54ff',
          800: '#0a2dff',
          900: '#001bcc',
        },
        secondary: {
          50: '#f0fffe',
          100: '#e0fffd',
          200: '#c0fffb',
          300: '#a1fff9',
          400: '#81fff7',
          500: '#62fff5',
          600: '#42fff3',
          700: '#23fff1',
          800: '#00d9cc',
          900: '#008080',
        },
        accent: {
          50: '#fff5f0',
          100: '#ffeae0',
          200: '#ffd4c0',
          300: '#ffbfa1',
          400: '#ff9966',
          500: '#ff7f4d',
          600: '#ff6633',
          700: '#ff4d1a',
          800: '#ff3300',
          900: '#cc2600',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
