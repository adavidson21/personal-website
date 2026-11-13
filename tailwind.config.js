// A brand color as a Tailwind color: <alpha-value> is 1 for bg-ink and 0.1 for bg-ink/10.
const v = (name) => `color-mix(in srgb, var(--${name}) calc(<alpha-value> * 100%), transparent)`;

module.exports = {
  content: ["./index.html", "./notes/**/*.html", "./_notes/_layout.html", "./scripts/build-notes.mjs"],
  theme: {
    extend: {
      // Colors are CSS variables, so dark mode only changes the variables. The shared ones come from the brand library
      // (brand/tokens.css); oak, slate, sage and burgundy-light are this site's own (input.css). color-mix keeps
      // Tailwind's opacity modifiers (bg-oak/10) working with plain hex variables.
      colors: {
        ivory: v('bg'),
        surface: v('surface'),
        ink: v('ink'),
        muted: v('muted'),
        burgundy: { DEFAULT: v('accent'), light: v('burgundy-light') },
        oak: v('oak'),
        slate: v('slate'),
        sage: { DEFAULT: v('sage'), deep: v('sage-deep'), faint: v('sage-faint') },
        line: v('line'),
        panel: v('panel'),
        hero: { DEFAULT: v('hero'), ink: v('hero-ink'), muted: v('hero-muted') },
        gold: { DEFAULT: v('gold'), ink: v('gold-ink') },
        soft: { DEFAULT: v('accent-soft'), ink: v('accent-soft-ink') },
      },
      fontFamily: {
        // Same pair as Hints: Inter Tight for headings and big numbers, Figtree for the rest.
        sans: ['Figtree', '"Segoe UI Variable Text"', '"Segoe UI"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Inter Tight"', 'Figtree', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: 'var(--shadow)',
        lift: 'var(--shadow-lift)',
      },
    },
  },
};
