# alexisdavidson.org

Source for [alexisdavidson.org](https://alexisdavidson.org), served by GitHub Pages.

Everything is served from this repo: no CDNs, third-party scripts, trackers, or cookies. The page's Content-Security-Policy blocks anything from another origin, so the brand library is copied in rather than linked (see below).

Build everything (field notes, `site.css`, asset stamps) with:

```
npm install   # once per clone
npm run build
npm run check # what CI runs
```

`site.css` is compiled Tailwind, so rebuild after changing classes in `index.html` or `input.css`. `npm run build` ends with `scripts/stamp-assets.sh`, which adds a content hash to the `site.css`, `site.js`, `brand/theme.js` and `brand/tokens.css` links (`site.css?v=1a2b3c4d`). Without it, a phone that installed the site, or any browser with an old copy cached, can load new HTML with the old stylesheet and show unstyled buttons and giant icons. CI and the pre-commit hook fail if a stamp is out of date.

## Brand library

The fonts (Inter Tight and Figtree, OFL), the shared colors and the light/dark toggle come from my brand
library ([tools.alexisdavidson.org/brand/](https://tools.alexisdavidson.org/brand/), source in
personal-tools/brand), the same one LifeKit uses. `brand/` is a copy of it, because this site's CSP only allows its
own origin. The page loads `brand/theme.js` and `brand/tokens.css` (fonts and color tokens only; the site's
components stay in Tailwind). To update it, with personal-tools checked out next to this repo:

```
node ../personal-tools/brand/scripts/sync.mjs brand
scripts/stamp-assets.sh
```

## Look

The site shares its look with [Hints](https://hints.alexisdavidson.org): cream paper, white rounded cards with a soft shadow, a wine band for the header and footer, burgundy for actions, and gold accents. Headings are Inter Tight with a gold squiggle under them (`.section-title`, drawn from `images/squiggle.svg`); everything else is Figtree. The reusable pieces in `input.css` are `.soft-card`, `.pill`, `.label-bar`, `.hero` and `.hero-btn`.

## Light and dark

The site follows the device's light or dark setting until you use the round toggle in the top right corner (`brand/theme.js`, the same toggle as tools.alexisdavidson.org; the choice is saved per browser). Colors are CSS variables: the shared ones from `brand/tokens.css` and the site's own (oak, slate, sage, burgundy-light) in `input.css`. `tailwind.config.js` wraps them in `color-mix` so Tailwind classes like `bg-surface` or `text-ink/60` switch on their own. Illustrations draw with fixed hex colors; `input.css` maps their paper and line neutrals to dark versions (the cats' cream fur, `#F5F2EB` and `#E5DEC9`, is left alone). A new illustration that uses only those neutrals and the theme classes darkens without changes.

## Signature color and icons

Burgundy is the signature color: `#7A1B36` in light mode and `#E59AAE` in dark (`--accent` in the brand tokens). It marks buttons, links, pills, and hover states; the header and footer use the deeper wine `#4A0E22` (`--hero`).

`favicon.svg` (a bold Bricolage Grotesque A with a pink period on a burgundy tile, like the headings) and `icon-maskable.svg` (full-bleed version with the mark inside Android's safe zone) are the sources. After changing either, run `scripts/build-icons.sh` to export `favicon.ico` (16, 32, 48 px), `apple-touch-icon.png` (180 px, square for iOS), `icon-192.png`, `icon-512.png`, and `icon-maskable-512.png`. Android picks its icons from `site.webmanifest`. New pages need the five `<link>` tags under `<title>`, as in `_notes/_layout.html`.

## Field notes

Notes are Markdown files in `_notes/`. GitHub Pages skips folders that start with `_`, so the sources aren't served (they are still public in the repo, drafts included).

1. Copy `_notes/_example.md` to `_notes/your-note-name.md` (lowercase, dashes). The file name becomes the URL: `/notes/your-note-name.html`.
2. Fill in the front matter (`title`, `summary`, `label`, `date`; optional `draft: true` and `updated`) and write below it.
3. Commit it. On `main`, the Build and check Action (`.github/workflows/https-check.yml`) runs `npm run build`, commits the generated pages, and redeploys, so you can add a note from the GitHub app, github.dev, or LifeKit's Field Notes app without building locally. Running `npm run build` yourself first is fine too.

`scripts/build-notes.mjs` turns each published note into `notes/your-note-name.html` (from `_notes/_layout.html`), lists the latest 4 in the Field notes section of `index.html` (between the `FIELD NOTES` markers; the section disappears when there are no notes), builds `notes/index.html` with all of them, and writes the Atom feed `feed.xml`. Deleting a note, renaming it, or setting it back to a draft removes its page on the next build. Don't edit generated pages; edit the `.md` file or the layout.

The build fails on a missing field, a bad date, an `http://` link, or an em dash. Put note images in `images/notes/`.

## HTTPS safeguards

`scripts/check-https.sh` fails if any served file references `http://`, if a page's Content-Security-Policy is missing `default-src 'self'` or `upgrade-insecure-requests` (or allows `http:` or `*`), or if `CNAME` changes. It runs on every push and PR via `.github/workflows/https-check.yml`.

To also run it before each commit, enable the hook once per clone:

```
git config core.hooksPath .githooks
```
