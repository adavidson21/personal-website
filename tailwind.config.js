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
        hero: { DEFAULT: 'rgb(var(--c-hero) / <alpha-value>)', ink: 'rgb(var(--c-hero-ink) / <alpha-value>)', muted: 'rgb(var(--c-hero-muted) / <alpha-value>)' },
        gold: { DEFAULT: 'rgb(var(--c-gold) / <alpha-value>)', ink: 'rgb(var(--c-gold-ink) / <alpha-value>)' },
        soft: { DEFAULT: 'rgb(var(--c-soft) / <alpha-value>)', ink: 'rgb(var(--c-soft-ink) / <alpha-value>)' },
      },
      fontFamily: {
        // Same pair as Hints: Bricolage Grotesque for headings and big numbers, Figtree for the rest.
        sans: ['Figtree', '"Segoe UI Variable Text"', '"Segoe UI"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Figtree', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: 'var(--shadow)',
        lift: 'var(--shadow-lift)',
      },
    },
  },
};
