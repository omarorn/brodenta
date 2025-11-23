# 🚀 DEPLOYMENT GUIDE
## MADENTA: BROFORCE – The Tooth Cartel Saga

Complete deployment instructions for Cloudflare Pages + Workers.

---

## ✅ PREREQUISITES

1. **Cloudflare Account** (free tier works)
2. **Node.js** >= 18.0.0
3. **Git** installed
4. **Wrangler CLI** (will be installed with npm)

---

## 📦 STEP 1: SETUP

```bash
# Clone the repository
git clone https://github.com/2076-ehf/madenta-broforce.git
cd madenta-broforce

# Install dependencies
npm install

# Login to Cloudflare
npx wrangler login
```

---

## 🗄️ STEP 2: CREATE CLOUDFLARE RESOURCES

### A) Create KV Namespaces

```bash
# Create leaderboard namespace
npx wrangler kv:namespace create "LEADERBOARD"

# Create game state namespace
npx wrangler kv:namespace create "GAME_STATE"

# Note the IDs returned - you'll need them for wrangler.toml
```

### B) Update wrangler.toml

Replace placeholder IDs in `wrangler.toml` with the actual IDs from step A:

```toml
[[kv_namespaces]]
binding = "LEADERBOARD"
id = "YOUR_LEADERBOARD_ID_HERE"  # ← Replace this

[[kv_namespaces]]
binding = "GAME_STATE"
id = "YOUR_GAME_STATE_ID_HERE"   # ← Replace this
```

### C) Create R2 Bucket (Optional - for future asset hosting)

```bash
npx wrangler r2 bucket create madenta-assets
```

---

## 🌐 STEP 3: DEPLOY TO CLOUDFLARE PAGES

```bash
# Deploy the game (static site)
npm run deploy

# Follow the prompts:
# 1. Select/create project name: madenta-broforce
# 2. Production branch: main
```

Your game will be live at: `https://madenta-broforce.pages.dev`

---

## ⚙️ STEP 4: DEPLOY WORKERS API

```bash
# Deploy the API endpoints
npm run deploy:workers
```

This deploys:
- `/api/leaderboard` - High scores
- `/api/villain-dialogue` - AI-generated villain lines
- `/api/game-state` - Save/load game progress
- `/api/health` - Service status check

---

## 🌍 STEP 5: CUSTOM DOMAIN (Optional)

### Via Cloudflare Dashboard:

1. Go to **Pages** > **madenta-broforce**
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Enter: `madenta.2076.is` (or your domain)
5. Follow DNS instructions

### Via CLI:

```bash
# Add custom domain
npx wrangler pages domain add madenta.2076.is
```

---

## 🧪 STEP 6: TEST DEPLOYMENT

```bash
# Test the game
curl https://madenta-broforce.pages.dev

# Test API health
curl https://madenta-api.YOUR-SUBDOMAIN.workers.dev/api/health

# Test leaderboard
curl https://madenta-api.YOUR-SUBDOMAIN.workers.dev/api/leaderboard
```

---

## 🔄 CONTINUOUS DEPLOYMENT

### Automatic Deployments (Recommended)

1. Push code to GitHub
2. Connect repository to Cloudflare Pages:
   - Dashboard > Pages > Connect to Git
   - Select repository
   - Build settings: None (static site)
   - Output directory: `public`

Every push to `main` branch auto-deploys!

### Manual Deployments

```bash
# Deploy latest changes
npm run deploy

# Deploy workers
npm run deploy:workers
```

---

## 📊 MONITORING

### View Logs

```bash
# Tail Workers logs
npx wrangler tail madenta-api

# View deployment history
npx wrangler pages deployments list
```

### Analytics

Check Cloudflare Dashboard:
- Pages > madenta-broforce > Analytics
- Workers > madenta-api > Metrics

---

## 🐛 TROUBLESHOOTING

### Issue: "KV namespace not found"
**Solution:** Update wrangler.toml with correct KV namespace IDs

### Issue: "CORS errors in browser"
**Solution:** Workers API already has CORS headers - check browser console for actual error

### Issue: "Game doesn't load"
**Solution:** 
1. Check browser console for errors
2. Verify Phaser CDN is accessible
3. Clear browser cache

### Issue: "API returns 500"
**Solution:**
1. Check wrangler tail for error logs
2. Verify KV namespaces are created
3. Check environment bindings in wrangler.toml

---

## 🔐 SECURITY

### Environment Variables

For sensitive data, use Cloudflare secrets:

```bash
# Add secret to Workers
npx wrangler secret put API_KEY --name madenta-api
```

### Rate Limiting

Already configured in wrangler.toml:
- CPU limit: 50ms per request
- Automatic DDoS protection via Cloudflare

---

## 💰 COST ESTIMATE

**Cloudflare Free Tier includes:**
- 100,000 requests/day (Pages)
- 100,000 requests/day (Workers)
- Unlimited bandwidth
- Free SSL

**Estimated monthly cost:** $0 for most indie games

**If you exceed free tier:**
- Workers: $5/month for 10M requests
- KV: $0.50/GB stored
- R2: $0.015/GB stored

---

## 📱 MOBILE OPTIMIZATION

The game is playable on mobile but for best experience:

1. Add touch controls (future update)
2. Adjust viewport in index.html
3. Test on real devices

---

## 🎯 NEXT STEPS

After successful deployment:

1. ✅ Share game link: `https://madenta.2076.is`
2. ✅ Monitor analytics
3. ✅ Gather player feedback
4. ✅ Iterate on gameplay
5. ✅ Add new levels/heroes

---

## 📞 SUPPORT

**Issues?** Contact:
- Email: omar@vertis.is
- GitHub: https://github.com/2076-ehf/madenta-broforce/issues

---

**Built by 2076 ehf with invisible systems that make deployment effortless.**

🦷⚡ MADENTA: BROFORCE
