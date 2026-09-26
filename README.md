# Khant Thu Aung — Portfolio

A responsive, static portfolio for GitHub Pages. No build step or dependencies required.

## Preview locally

Run `python3 -m http.server 8000` in this directory and open http://localhost:8000.

## Customize

Edit `index.html` for biography, project descriptions, and links. Edit `styles.css` for colors and layout. Project descriptions and the traffic evaluation chart reference the public project documentation and reports. Fonts load from Google Fonts, with local sans-serif fallbacks.

## Publish

Commit and push to the branch configured in the repository's GitHub Pages settings. Serve from the repository root. This project requires no build command.

After changing `styles.css` or `script.js`, update its `?v=` value in `index.html` (for example, to the first 12 characters of the file’s SHA-256 hash). This makes browsers request the updated CSS after deployment.

## Themes

CSS custom properties define editorial dark mode and muted mint light mode. The initial theme follows the system preference; the header toggle saves an explicit choice in browser storage. The small head script applies the theme before rendering to avoid a flash of the wrong palette.
