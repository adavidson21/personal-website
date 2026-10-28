module.exports = {
  content: ["./index.html", "./notes/**/*.html"],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF5F2',
        surface: '#FFFBF9',
        ink: '#3B2F33',
        muted: '#6F5D63',
        burgundy: { DEFAULT: '#82263C', light: '#A04F6C' },
        oak: '#8B6340',
        slate: '#4F6B78',
        sage: { DEFAULT: '#8B9E8B', deep: '#5E735E', faint: '#EEF1EE' },
        line: '#EADCD9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 25px 50px -12px rgba(130, 38, 60, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      },
    },
  },
};
