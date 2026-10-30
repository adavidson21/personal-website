# alexisdavidson.org

Source for [alexisdavidson.org](https://alexisdavidson.org), served by GitHub Pages.

Everything is served from this repo: no CDNs, third-party scripts, trackers, or cookies. The font (Inter, OFL) is in `fonts/`, and the page's Content-Security-Policy blocks anything from another origin.

`site.css` is compiled Tailwind. After changing classes in `index.html`, rebuild it:

```
npx tailwindcss@3.4.17 -c tailwind.config.js -i input.css -o site.css --minify
```

## Light and dark

The site follows the device's light or dark setting until you use the round toggle in the top right corner (`theme.js`, the same toggle as tools.alexisdavidson.org; the choice is saved per browser). Colors are CSS variables in `input.css`, so Tailwind classes like `bg-surface` or `text-ink` switch on their own. Illustrations draw with fixed hex colors; `input.css` maps their paper and line neutrals to dark versions (the cats' cream fur, `#F5F2EB` and `#E5DEC9`, is left alone). A new illustration that uses only those neutrals and the theme classes darkens without changes.

## Tab icon

`favicon.svg` is the source (serif A with the oak period on the ink tile). `favicon.ico` (16, 32, 48 px) and `apple-touch-icon.png` (180 px, square for iOS) are exported from it. New pages need the three `<link>` tags under `<title>`, as in `notes/_template.html`.

## Adding a field note

1. Copy `notes/_template.html` to `notes/your-note-name.html` and fill in the bracketed parts.
2. In `index.html`, find the `FIELD NOTES` comment. The first time, delete the two `REMOVE TO ENABLE` lines to show the section.
3. Copy one `<article class="note-card">` per note and update its link, label, title, and summary.
4. Rebuild `site.css` with the command above.
