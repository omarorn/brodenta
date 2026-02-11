# Project Overview: brodenta (Madenta BROFORCE)

## Purpose
Educational/entertainment browser game about dental implant procedures (All-on-4) for Madenta dental clinic in Budapest. A Broforce-inspired dental action platformer featuring Dr. David Farkas and the Madenta team. Built as a pitch demo and marketing tool for Icelandic patients considering dental tourism to Budapest.

## Tech Stack
- Vanilla JavaScript (Canvas API for 2D rendering)
- Phaser 3 (game engine, declared as dependency)
- Cloudflare Pages for hosting
- Cloudflare Workers (portal-worker.js, api.js)
- Wrangler for deployment
- Single HTML file + game.js (no build step)

## Key Files
- `public/index.html` — Main game HTML
- `public/game.js` — Core game logic
- `portal-worker.js` — Cloudflare Worker entry point
- `api.js` — API worker
- `broforce-worker.js` — Game-specific worker
- `wrangler.toml` — Cloudflare deployment config
- `index-bilingual-complete.html` — Bilingual version of game
- `index-pixel-ultimate.html` — Pixel art styled variant
- `BROFORCE-COMPLETE-DOCS.md` — Full game documentation
- `PITCH.md` — Pitch materials for Madenta
- `CONSPIRACY-CUTSCENE.md` — Game narrative/cutscene docs

## Build/Run Commands
- `npm run dev` — Local dev server on port 8788 (wrangler pages dev)
- `npm run deploy` — Deploy to Cloudflare Pages (madenta-broforce)
- `npm run deploy:workers` — Deploy API worker
- `npm run preview` — Preview via wrangler
- No build step required (static site)

## Notes
- This repo has an unusual structure with git internal files mixed in at root level
- Multiple HTML variants exist (bilingual, pixel-art, advanced)
- Game teaches about peri-implantitis, bone grafting, debris management, All-on-4 procedure
- Branding uses Madenta Green (#10b981 emerald)
- Mobile-ready with touch controls
- Lightweight (~45KB uncompressed)
- Homepage: madenta.2076.is
- Part of the 2076 ehf ecosystem
