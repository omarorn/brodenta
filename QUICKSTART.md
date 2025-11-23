# ⚡ QUICK START
## Get MADENTA: BROFORCE running in 5 minutes

---

## 🚀 FASTEST PATH TO DEPLOYMENT

```bash
# 1. Install dependencies
npm install

# 2. Login to Cloudflare
npx wrangler login

# 3. Create KV namespaces
npx wrangler kv:namespace create "LEADERBOARD"
npx wrangler kv:namespace create "GAME_STATE"

# 4. Update wrangler.toml with the IDs from step 3
# (Replace placeholder IDs in the [[kv_namespaces]] sections)

# 5. Deploy!
npm run deploy
npm run deploy:workers
```

**Done!** Your game is live at `https://madenta-broforce.pages.dev`

---

## 🎮 TEST LOCALLY FIRST

```bash
# Run development server
npm run dev

# Open browser
http://localhost:8788

# Play the game!
# Use Arrow keys, Z to shoot, X for ultimate, 1-7 to switch heroes
```

---

## 📝 MINIMAL SETUP CHECKLIST

- [ ] Node.js 18+ installed
- [ ] Run `npm install`
- [ ] Run `npx wrangler login`
- [ ] Create 2 KV namespaces
- [ ] Update `wrangler.toml` with KV IDs
- [ ] Run `npm run deploy`
- [ ] Run `npm run deploy:workers`
- [ ] Test at your Pages URL

---

## 🎯 KEY FILES TO KNOW

| File | What It Does |
|------|--------------|
| `public/index.html` | Game UI and loader |
| `public/game.js` | Complete game engine (all heroes, combat, enemies) |
| `workers/api.js` | Leaderboard and API endpoints |
| `wrangler.toml` | Cloudflare configuration |
| `package.json` | npm scripts and dependencies |

---

## 🆘 TROUBLESHOOTING

**Game won't load?**
- Check browser console for errors
- Verify Phaser CDN is accessible
- Try clearing browser cache

**Deployment fails?**
- Make sure you're logged in: `npx wrangler whoami`
- Check KV namespace IDs in wrangler.toml
- Verify you have Cloudflare permissions

**KV errors?**
- Create namespaces: `npx wrangler kv:namespace create "LEADERBOARD"`
- Update wrangler.toml with actual IDs
- Redeploy workers

---

## 🎮 CONTROLS REMINDER

```
←→     Move
↑      Jump
Z      Shoot
X      Ultimate (when charged)
C      Special ability
1-7    Switch hero
R      Restart (game over)
```

---

## 📞 NEED HELP?

- **Email:** omar@vertis.is
- **Docs:** Read README.md for full details
- **Deployment:** Check docs/DEPLOYMENT.md

---

**Built by 2076 ehf**

🦷⚡ MADENTA: BROFORCE
