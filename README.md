# Sunil Kumar Agasti — Portfolio

Senior Frontend Engineer · React · TypeScript · GraphQL · Accessibility · AI developer tooling

**Live:** https://sunil-agasti.github.io/

A static, dependency-free site (no build step) with six case studies — IT-Dashboard, AST2 Diagnostics Console (old + new), GetSupport UI, AST2 Provisioning UI, AST2 Web Admin and AST2 Diagnostics Flow Automation. Each one has an overview, functional and non-functional requirements, an animated HLD diagram, LLD, UI system design, tech stack and my role.

All screenshots use **demo data only**. Confidential projects are labelled as such and have no public code.

## Features

- **Themes** — light by default; dark mode via the sun/moon toggle (`aria-pressed`), saved in `localStorage`. An inline `<head>` script applies the theme before first paint, so there is no flash. The switch uses the View Transitions API (circular reveal), with a fallback. Screenshots that have `-light` / `-dark` variants swap with the theme.
- **i18n** — English, Español, Français, हिन्दी, తెలుగు, ଓଡ଼ିଆ. The dictionary is in `assets/i18n.js` (`data-i18n` / `data-i18n-attr`). It sets `<html lang>` and `dir`, remembers the choice, and respects `?lang=xx`. Indic webfonts load only when needed. The CSS uses logical properties, so RTL needs only a new dictionary entry. Long technical text stays in English and is marked `lang="en"`.
- **Accessibility (WCAG 2.2 AA)** — skip link, landmarks, one `h1` and a logical heading order, visible focus rings, and keyboard support for everything: tabs (arrow keys, Home and End), galleries, a `<dialog>` lightbox (focus trap, Esc, arrow keys, focus returns to the opener), a mobile menu (Esc closes it) and `<details>` disclosures. Caption changes are announced through `aria-live`. The marquee has a pause button. `prefers-reduced-motion` turns off every animation. Text reflows at 200% zoom, touch targets are at least 24 px, and the site works in forced-colors mode. axe-core reports no violations in either theme.
- **Motion** — sticky, scroll-scrubbed hero, a drifting mesh gradient, scroll reveals, laptop frames that tilt into view (`animation-timeline: view()` with an IntersectionObserver fallback), cursor-following spotlight cards, magnetic buttons, count-up stats, staggered chips and HLD arrows that draw in. Only `transform` and `opacity` are animated.
- **Other** — SEO and Open Graph meta, JSON-LD `Person` schema, an inline SVG favicon, a print stylesheet (expands every tab), lazy-loaded images, a back-to-top button, scroll-spy navigation and a reading-progress bar. Works down to 360 px wide.

## Files

```
index.html               page shell and static sections
assets/css/site.css      design tokens (light/dark), layout, motion, print
assets/js/site.js        PROJECT_GALLERIES (screenshot lists) + all behaviour
assets/js/projects.js    case-study content (PROJECTS array)
assets/i18n.js           translations + i18n helper
assets/shots/<project>/  screenshots (demo data)
```

**Add or replace screenshots:** edit the `PROJECT_GALLERIES` object at the top of `assets/js/site.js`. Use `{ src, cap }` for a single image, or `{ light, dark, cap }` for a theme-aware pair. A project with an empty list shows a "Screens coming soon" UI mock.

## Run locally

It's plain static files, so either option works:

```bash
open index.html                      # opens straight from file://
python3 -m http.server 8000          # or serve it, then visit http://localhost:8000
```

## Publish

GitHub Pages: Settings → Pages → Deploy from branch → `main` / root.
