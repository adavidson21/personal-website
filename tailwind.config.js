module.exports = {
  content: ["./index.html", "./notes/**/*.html"],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F6F2',
        surface: '#FDFCFA',
        ink: '#2F2B2A',
        muted: '#625D59',
        burgundy: { DEFAULT: '#82263C', light: '#A04F6C' },
        oak: '#8B6340',
        slate: '#4F6B78',
        sage: { DEFAULT: '#8B9E8B', deep: '#5E735E', faint: '#EEF1EE' },
        line: '#E5E0D8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 25px 50px -12px rgba(47, 43, 42, 0.14), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      },
    },
  },
};
