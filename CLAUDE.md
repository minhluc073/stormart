# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is a static, no-build mobile web app front-end based on the "Jobko" HTML template by Themesflat, being repurposed here as an e-commerce/marketplace app (buyers and sellers, products, addresses, checkout-adjacent settings). There is no `package.json`, bundler, or task runner in the repo — pages are plain HTML files that reference shared CSS/JS/font assets via relative paths, and are meant to be opened directly or served as static files.

Branding is inconsistent across files (leftover from the source template): `_manifest.json` calls it "jobko app" / "enfro nft app", `<title>` tags say "Jobko - Job Finder Mobile App", but the actual page content (`userApp/*.html`) is a shopping app (products, sellers, addresses, currency). Don't be surprised by this mismatch — prefer the actual page content over the title/manifest text when inferring intent, and ask before "fixing" branding strings since it may be intentional leftover text not yet updated.

## Repo structure

- `index.html` — a home-page shell at the repo root (uses root-relative asset paths like `css/`, `js/`, `images/`).
- `userApp/*.html` — the buyer-facing app screens (sign-in/up, home, product detail, addresses, profile/settings, currency, language, etc.). These use `../`-relative asset paths since they live one directory down.
- `sellerApp/`, `New folder/` — currently empty; placeholders for not-yet-built sections. Don't assume seller-side pages exist yet.
- `css/` — compiled/vendor CSS: `styles.css` (+ `styles.css.map`) is the compiled output of `scss/`; the rest (`bootstrap.min.css`, `swiper-bundle.min.css`, `nouislider.min.css`, `jqueryui.min.css`, `bootstrap-select.min.css`, `bootstrap-touchspin.min.css`) are third-party vendor libraries — do not hand-edit vendor files.
- `scss/` — the Sass source for `css/styles.css`, organized as:
  - `app.scss` — entry point, `@use`s `abstracts`, `base`, and `components` in order.
  - `abstracts/` — `_variable.scss` (CSS custom properties: colors, shadows, gradients), `_mixin.scss`, `_index.scss` (forwards).
  - `_base.scss` — resets.
  - `components/` — one partial per UI area (`_header.scss`, `_footer.scss`, `_account.scss`, `_profile.scss`, `_product-detail.scss`, `_main.scss`), aggregated via `_index.scss`.
  - **No Sass compiler is checked into this repo.** If you edit `scss/`, you must compile it yourself (e.g. `sass scss/app.scss css/styles.css` if the Dart Sass CLI is available) and keep `css/styles.css` in sync — nothing does this automatically on save.
- `js/` — vendor libraries (`jquery.min.js`, `bootstrap.min.js`, `swiper-bundle.min.js`, `nouislider.min.js`, etc.) plus:
  - `main.js` — an IIFE housing all custom page behavior (password show/hide, OTP input, back-button handling, datepicker, active-state toggling, dark-theme toggle, sticky header, touch-spin, toast messages, secondary modals, counters, file inputs, preloader). Each behavior is a named function invoked from a single init block at the bottom — when adding new interactive behavior, follow this pattern (self-contained function, called from the bottom init list) rather than scattering new `$(document).ready` blocks.
  - `init.js` — registers `/serviceWorker.js` (note: this path doesn't match the actual `_service-worker.js` filename at the repo root — the registration will silently fail as written).
- `fonts/` — `fonts.css` (web fonts) and `font-icons.css` + `icomoon.*` (the icon font).
- `icon/` — a small set of standalone SVGs plus `sprite.svg`, referenced via `<use href="...icon/sprite.svg#name">` (see `userApp/*.html`).
- `images/` — static image assets (logos, avatars, flags, UI icons).
- `_manifest.json` — PWA manifest (linked from every page's `<head>` as `<link rel="manifest" href="_manifest.json">`, with `../_manifest.json` from `userApp/`).
- `_service-worker.js` — offline-cache service worker; only caches `./`, `./index.html`, `./css/styles.css`, `./js/main.js` (registration currently broken, see above).

## Working in this codebase

- There is no build, lint, or test tooling configured (no `package.json`, no linter config, no test runner). Verify changes by opening the HTML file directly in a browser or serving the directory with any static file server.
- Every page duplicates its own `<head>` (font/CSS links, manifest link, favicon) rather than sharing a template/include mechanism — when changing a global asset reference (e.g. a CSS file link), update it across `index.html` and every file in `userApp/`.
- Path conventions differ by directory depth: root-level `index.html` uses paths relative to repo root (`css/...`, `images/...`); everything under `userApp/` uses `../` to reach the same shared assets. Keep this in mind when copying markup between the two.
- jQuery + Bootstrap 5 (via `data-bs-*` attributes, e.g. `data-bs-toggle="offcanvas"` / `data-bs-toggle="modal"`) are the primary interaction mechanisms; Swiper is used for carousels, noUiSlider for range sliders.

run scss sass scss/app.scss css/styles.css --watch