# alexisdavidson.org

Source for [alexisdavidson.org](https://alexisdavidson.org), served by GitHub Pages.

Everything is served from this repo: no CDNs, third-party scripts, trackers, or cookies. The page's Content-Security-Policy blocks anything from another origin, so the brand library is copied in rather than linked (see below).

`site.css` is compiled Tailwind. After changing classes in `index.html`, rebuild it:

```
npx tailwindcss@3.4.17 -c tailwind.config.js -i input.css -o site.css --minify
scripts/stamp-assets.sh
```

`stamp-assets.sh` adds a content hash to the `site.css`, `site.js`, `brand/theme.js` and `brand/tokens.css` links (`site.css?v=1a2b3c4d`). Without it, a phone that installed the site, or any browser with an old copy cached, can load new HTML with the old stylesheet and show unstyled buttons and giant icons. CI and the pre-commit hook fail if a stamp is out of date. Run it after editing any of those three files.

## Brand library

The fonts (Bricolage Grotesque and Figtree, OFL), the shared colors and the light/dark toggle come from my brand
library ([tools.alexisdavidson.org/brand/](https://tools.alexisdavidson.org/brand/), source in
personal-tools/brand), the same one LifeKit uses. `brand/` is a copy of it, because this site's CSP only allows its
own origin. The page loads `brand/theme.js` and `brand/tokens.css` (fonts and color tokens only; the site's
components stay in Tailwind). To update it, with personal-tools checked out next to this repo:

```
node ../personal-tools/brand/scripts/sync.mjs brand
scripts/stamp-assets.sh
```

## Look

The site shares its look with [Hints](https://hints.alexisdavidson.org): cream paper, white rounded cards with a soft shadow, a wine band for the header and footer, burgundy for actions, and gold accents. Headings are Bricolage Grotesque with a gold squiggle under them (`.section-title`, drawn from `images/squiggle.svg`); everything else is Figtree. The reusable pieces in `input.css` are `.soft-card`, `.pill`, `.label-bar`, `.hero` and `.hero-btn`.

## Light and dark

The site follows the device's light or dark setting until you use the round toggle in the top right corner (`brand/theme.js`, the same toggle as tools.alexisdavidson.org; the choice is saved per browser). Colors are CSS variables: the shared ones from `brand/tokens.css` and the site's own (oak, slate, sage, burgundy-light) in `input.css`. `tailwind.config.js` wraps them in `color-mix` so Tailwind classes like `bg-surface` or `text-ink/60` switch on their own. Illustrations draw with fixed hex colors; `input.css` maps their paper and line neutrals to dark versions (the cats' cream fur, `#F5F2EB` and `#E5DEC9`, is left alone). A new illustration that uses only those neutrals and the theme classes darkens without changes.

## Signature color and icons

Burgundy is the signature color: `#7A1B36` in light mode and `#E59AAE` in dark (`--accent` in the brand tokens). It marks buttons, links, pills, and hover states; the header and footer use the deeper wine `#4A0E22` (`--hero`).

`favicon.svg` (a bold Bricolage Grotesque A with a pink period on a burgundy tile, like the headings) and `icon-maskable.svg` (full-bleed version with the mark inside Android's safe zone) are the sources. After changing either, run `scripts/build-icons.sh` to export `favicon.ico` (16, 32, 48 px), `apple-touch-icon.png` (180 px, square for iOS), `icon-192.png`, `icon-512.png`, and `icon-maskable-512.png`. Android picks its icons from `site.webmanifest`. New pages need the five `<link>` tags under `<title>`, as in `notes/_template.html`.

## Adding a field note

1. Copy `notes/_template.html` to `notes/your-note-name.html` and fill in the bracketed parts.
2. In `index.html`, find the `FIELD NOTES` comment. The first time, delete the two `REMOVE TO ENABLE` lines to show the section.
3. Copy one `<article class="note-card">` per note and update its link, label, title, and summary.
4. Rebuild `site.css` with the command above.

## HTTPS safeguards

`scripts/check-https.sh` fails if any served file references `http://`, if a page's Content-Security-Policy is missing `default-src 'self'` or `upgrade-insecure-requests` (or allows `http:` or `*`), or if `CNAME` changes. It runs on every push and PR via `.github/workflows/https-check.yml`.

To also run it before each commit, enable the hook once per clone:

```
git config core.hooksPath .githooks
```
