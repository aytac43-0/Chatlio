module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        success: '#22C55E',
        accent: '#60A5FA',
        darkText: '#0F172A',
        lightBg: '#F8FAFC',
        darkBg: '#020617'
      }
    }
  },
  plugins: []
};
