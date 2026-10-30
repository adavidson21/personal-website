// Light/dark toggle, the same as on tools.alexisdavidson.org. Load it in <head> without defer:
// it applies the saved choice before the page paints (data-theme="light|dark" on <html>; no attribute
// means follow the device), then adds the round button in the top right corner. Its styles are in
// input.css (.theme-toggle), since this site's Content-Security-Policy allows no injected styles.
(function () {
  var KEY = "theme", root = document.documentElement;
  var media = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : { matches: false };

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var saved = get();
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;

  function isDark() { return root.dataset.theme ? root.dataset.theme === "dark" : media.matches; }

  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  var btn;
  function paint() {
    if (!btn) return;
    var dark = isDark();
    btn.innerHTML = dark ? MOON : SUN;
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    btn.title = dark ? "Light mode" : "Dark mode";
  }

  function mount() {
    if (document.querySelector(".theme-toggle")) return;
    btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.onclick = function () {
      root.dataset.theme = isDark() ? "light" : "dark";
      set(root.dataset.theme);
      paint();
    };
    paint();
    document.body.appendChild(btn);
  }

  if (media.addEventListener) media.addEventListener("change", paint);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
