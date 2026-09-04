/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FCF9EE',
          100: '#F7F0D5',
          200: '#EEDDA5',
          300: '#E4C770',
          400: '#D4AF37', // Imperial Gold
          500: '#C59F2A',
          600: '#A6821B',
          700: '#7F6213',
          800: '#5A440C',
          900: '#382A06',
        },
        obsidian: {
          950: '#070708',
          900: '#0C0C0F',
          850: '#111116',
          800: '#17171E',
          750: '#1E1E27',
          700: '#252531',
        },
        champagne: {
          light: '#FBF5EB',
          DEFAULT: '#F3E5AB',
          metallic: '#E5C378',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA7C11 100%)',
        'gold-metallic': 'linear-gradient(90deg, #D4AF37 0%, #FFF3D1 50%, #C59F2A 100%)',
        'dark-royal': 'radial-gradient(ellipse at top, #1A1822 0%, #0C0C0F 60%, #070708 100%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(212, 175, 55, 0.15)',
        'gold-md': '0 0 30px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 0 50px rgba(212, 175, 55, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
