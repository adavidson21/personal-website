module.exports = {
  content: ["./index.html", "./notes/**/*.html"],
  theme: {
    extend: {
      // Colors are CSS variables (input.css), so dark mode only changes the variables.
      colors: {
        ivory: 'rgb(var(--c-ivory) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        burgundy: { DEFAULT: 'rgb(var(--c-burgundy) / <alpha-value>)', light: 'rgb(var(--c-burgundy-light) / <alpha-value>)' },
        oak: 'rgb(var(--c-oak) / <alpha-value>)',
        slate: 'rgb(var(--c-slate) / <alpha-value>)',
        sage: { DEFAULT: 'rgb(var(--c-sage) / <alpha-value>)', deep: 'rgb(var(--c-sage-deep) / <alpha-value>)', faint: 'rgb(var(--c-sage-faint) / <alpha-value>)' },
        line: 'rgb(var(--c-line) / <alpha-value>)',
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
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
