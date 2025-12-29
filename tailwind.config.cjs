module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        success: '#22C55E',
        accent: '#60A5FA',
        background: '#F8FAFC',
        foreground: '#0F172A',
        'background-dark': '#020617'
      }
    }
  },
  plugins: []
};
