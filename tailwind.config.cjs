module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1', // Indigo Glow
          600: '#6366f1'
        },
        success: '#22C55E',
        accent: '#60A5FA',
        background: '#020617', // Deep Midnight
        'card-bg': '#0f172a', // Dark Navy
        foreground: '#e6e6e6',
        'muted-foreground': '#94a3b8'
      }
    }
  },
  plugins: []
};
