module.exports = {
  content: ["./index.html", "./notes/**/*.html"],
  theme: {
    extend: {
      colors: {
        ivory: '#F4F1EA',
        surface: '#FBF9F5',
        ink: '#2A2627',
        muted: '#675F5A',
        burgundy: { DEFAULT: '#82263C', light: '#A04F6C' },
        oak: '#8B6340',
        slate: '#4F6B78',
        sage: { DEFAULT: '#8B9E8B', deep: '#5E735E', faint: '#EEF1EE' },
        line: '#DCD4C6',
        panel: '#ECE7DD',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 25px 50px -12px rgba(47, 43, 42, 0.14), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      },
    },
  },
};
