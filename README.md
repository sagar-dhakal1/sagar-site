# Sagar — Personal Website (Static)

Plain HTML/CSS/JS. Drop into GitHub and turn on Pages.

## Run locally
Just open `index.html` in a browser. Or:

```
python3 -m http.server 8080
```

## Deploy to GitHub Pages
1. Create a new repo on GitHub.
2. Upload every file (including `.nojekyll`).
3. Settings → Pages → Source: `main` branch, `/` folder.
4. Done — your site will be live at `https://<username>.github.io/<repo>/`.

## Files
- `index.html` — Home (hero + knowledge garden + quotes)
- `about.html`, `projects.html`, `experience.html`, `books.html`, `research.html`, `learning.html`, `contact.html`
- `styles.css` — all styling
- `script.js` — ticker drift, knowledge garden, quote rotator, mobile menu
