# alexisdavidson.org

Source for [alexisdavidson.org](https://alexisdavidson.org), served by GitHub Pages.

Everything is served from this repo: no CDNs, third-party scripts, trackers, or cookies. The font (Inter, OFL) is in `fonts/`, and the page's Content-Security-Policy blocks anything from another origin.

`site.css` is compiled Tailwind. After changing classes in `index.html`, rebuild it:

```
npx tailwindcss@3.4.17 -c tailwind.config.js -i input.css -o site.css --minify
```

## Adding a field note

1. Copy `notes/_template.html` to `notes/your-note-name.html` and fill in the bracketed parts.
2. In `index.html`, find the `FIELD NOTES` comment. The first time, delete the two `REMOVE TO ENABLE` lines to show the section.
3. Copy one `<article class="note-card">` per note and update its link, label, title, and summary.
4. Rebuild `site.css` with the command above.
