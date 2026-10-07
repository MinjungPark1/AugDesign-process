# AugDesign — Project process journals

The home page offers two project buttons:

- **Project 1 process:** the existing Uber Redesign journal.
- **Project 2 process:** First Shift / Shiftwise, including the interactive iPhone demo, at `project2/index.html`.

## Publish with GitHub Pages

Keep `index.html`, `style.css`, `app.js`, `.nojekyll`, and the entire `project2` folder at the repository root. In **Settings → Pages**, use **Deploy from a branch**, `main`, and `/(root)`. No build command is required.

## Update Project 2

Edit the presentation files inside `project2`. The phone demo lives inside `project2/shiftwise`; keep that folder intact. Its fictional changes are saved in browser storage. It is a copy of the supplied demo, not an automatically synchronized external embed.

## Preview locally

From the repository directory, run `python3 -m http.server 8000` and open `http://localhost:8000/`. A web server is needed for JSON and JavaScript modules.
