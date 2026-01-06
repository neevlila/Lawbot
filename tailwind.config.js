/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern Dark Theme (Discord/GitHub inspired)
        'dark-bg': '#0d1117',           // GitHub dark
        'dark-surface': '#161b22',      // GitHub dark surface
        'dark-card': '#21262d',         // GitHub dark card
        'dark-border': '#30363d',       // GitHub dark border
        'dark-text': '#f0f6fc',         // GitHub dark text
        'dark-text-secondary': '#8b949e',
        'dark-accent': '#58a6ff',       // GitHub blue
        'dark-accent-hover': '#1f6feb',
        'dark-success': '#3fb950',      // GitHub green
        'dark-warning': '#d29922',      // GitHub yellow
        'dark-error': '#f85149',        // GitHub red

        // Modern Light Theme (Clean & Professional)
        'light-bg': '#ffffff',
        'light-surface': '#f6f8fa',     // GitHub light surface
        'light-card': '#ffffff',
        'light-border': '#d0d7de',      // GitHub light border
        'light-text': '#24292f',        // GitHub light text
        'light-text-secondary': '#656d76',
        'light-accent': '#0969da',      // GitHub blue
        'light-accent-hover': '#0550ae',
        'light-success': '#1a7f37',     // GitHub green
        'light-warning': '#9a6700',     // GitHub yellow
        'light-error': '#cf222e',       // GitHub red
      },
      animation: {
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
      },
      keyframes: {
        'gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-success': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-warning': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'gradient-dark': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
