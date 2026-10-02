# AGENTS.md

## Project overview
Static website (no build step, no backend, no dependencies). Three files serve everything:
- `index.html` — markup
- `script.js` — interactive style-switching logic
- `styles.css` — all styling

## Running locally
Served via `docker-compose.base44.yml` using nginx:alpine on host port 3000.
No environment variables or secrets required.

## Verify
`curl -s http://localhost:3000 | grep -q "Web design styles"` confirms the page loads.
