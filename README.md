HEAD
# valentines

# Valentine Proposal Web App

Simple static pages to ask Will you be my Valentine's Day

How to run locally

- Using VS Code Live Server: open the workspace and click Live Server.
- Or using a simple static server from Node: run

```bash
npx http-server .
```

Or use Python 3 built-in server:

```bash
python -m http.server 8080
```

Notes on the No button avoidance

- The No button listens for mousemove and touchstart events.
- When the pointer gets within 80 pixels of the button center the script moves the button to a random position inside the visible viewport.
- The code clamps positions with a 16 pixel padding so the button never goes off-screen.
- On first evasive move the button is switched to fixed positioning so it can roam freely.

Files

- `index.html` - landing page with Yes and No buttons
- `celebration.html` - celebration page with confetti
- `styles.css` - styles and simple animations
- `app.js` - all JavaScript logic
e877613 (Initial Valentine app)
