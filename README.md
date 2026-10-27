# alexisdavidson.org

Source for [alexisdavidson.org](https://alexisdavidson.org), served by GitHub Pages.

Everything is served from this repo: no CDNs, third-party scripts, trackers, or cookies. The font (Inter, OFL) is in `fonts/`, and the page's Content-Security-Policy blocks anything from another origin.

`site.css` is compiled Tailwind. After changing classes in `index.html`, rebuild it:

```
npx tailwindcss@3.4.17 -c tailwind.config.js -i input.css -o site.css --minify
```
