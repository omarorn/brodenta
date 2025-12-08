# 🚀 MADENTA GAME - MCP DEPLOYMENT GUIDE

## ✅ MCP STATUS CHECK

**Account Verified:**
- Account ID: `72ed26d13abd695cc3ae785adb386c27`
- Account Name: Omarorn@gmail.com's Account
- Active Workers: 19 existing workers
- MCP Connection: ✅ Active

---

## 📦 DEPLOYMENT OPTIONS

### **Option 1: Wrangler CLI (RECOMMENDED)**

Since MCP cannot upload Worker code directly, use Wrangler CLI:

```bash
# 1. Navigate to project directory
cd /path/to/madenta-game

# 2. Login to Cloudflare (if not already)
npx wrangler login

# 3. Deploy the worker
npx wrangler deploy worker.js --name madenta-game

# 4. Set custom domain (optional)
# Go to: dash.cloudflare.com → Workers & Pages → madenta-game → Settings → Domains
# Add: madenta.2076.is
```

**Expected Output:**
```
✅ Uploaded madenta-game (2.3 KB)
✅ Published madenta-game (0.03 sec)
   https://madenta-game.omarorn.workers.dev
```

---

### **Option 2: Cloudflare Dashboard**

1. Go to: https://dash.cloudflare.com/72ed26d13abd695cc3ae785adb386c27/workers-and-pages
2. Click **"Create Application"** → **"Create Worker"**
3. Name: `madenta-game`
4. Click **"Deploy"**
5. Click **"Edit Code"**
6. Paste contents of `worker.js`
7. Click **"Save and Deploy"**
8. Go to **Settings → Domains & Routes**
9. Add custom domain: `madenta.2076.is`

---

### **Option 3: Cloudflare Pages (For Full HTML)**

If you want to deploy the complete bilingual HTML:

```bash
# 1. Create a Pages project
npx wrangler pages project create madenta-game

# 2. Deploy the HTML file
npx wrangler pages deploy /mnt/user-data/outputs/madenta-game --project-name madenta-game

# 3. Add custom domain
# Dashboard → Pages → madenta-game → Custom domains → Add domain
```

---

## 🔧 WRANGLER.TOML CONFIGURATION

Create `wrangler.toml` in project root:

```toml
name = "madenta-game"
main = "worker.js"
compatibility_date = "2024-11-23"
account_id = "72ed26d13abd695cc3ae785adb386c27"

[site]
bucket = "./public"

[[routes]]
pattern = "madenta.2076.is/*"
zone_name = "2076.is"
```

---

## 🌐 CUSTOM DOMAIN SETUP

### **DNS Configuration (via Cloudflare Dashboard)**

1. Go to: https://dash.cloudflare.com → Select domain `2076.is`
2. Navigate to **DNS → Records**
3. Add CNAME record:
   - **Type:** CNAME
   - **Name:** madenta
   - **Target:** madenta-game.omarorn.workers.dev
   - **Proxy status:** ✅ Proxied
   - **TTL:** Auto

**Result:** https://madenta.2076.is will serve the game

---

## 📊 DEPLOYMENT VERIFICATION

After deployment, test these URLs:

1. **Worker URL:**  
   https://madenta-game.omarorn.workers.dev

2. **Custom Domain:**  
   https://madenta.2076.is

3. **Language Toggle:**  
   Click 🇮🇸/🇭🇺 buttons to switch

4. **Mobile Test:**  
   Open on phone to verify responsive design

---

## 🎯 POST-DEPLOYMENT CHECKLIST

- [ ] Game loads on both worker.dev and custom domain
- [ ] Language toggle works (IS ↔ HU)
- [ ] Mobile responsive
- [ ] No console errors
- [ ] OG meta tags display correctly on social media
- [ ] Analytics tracking (if added)

---

## 🔄 UPDATE WORKFLOW

To update the game after changes:

```bash
# Edit worker.js locally
nano worker.js

# Redeploy
npx wrangler deploy worker.js --name madenta-game

# Or for Pages:
npx wrangler pages deploy /path/to/updated/files --project-name madenta-game
```

---

## 🛠️ TROUBLESHOOTING

### **Issue: "Module not found"**
**Solution:** Ensure `worker.js` has proper ES6 export syntax

### **Issue: "Custom domain not resolving"**
**Solution:** 
1. Check DNS propagation: `dig madenta.2076.is`
2. Verify CNAME points to `madenta-game.omarorn.workers.dev`
3. Wait 5-10 minutes for DNS propagation

### **Issue: "403 Forbidden"**
**Solution:** Check Worker routes in dashboard

---

## 📈 ANALYTICS SETUP (OPTIONAL)

Add to worker.js:

```javascript
export default {
  async fetch(request, env, ctx) {
    // Your existing code...
    
    // Track visit
    ctx.waitUntil(
      fetch('https://analytics-endpoint.com/track', {
        method: 'POST',
        body: JSON.stringify({
          url: request.url,
          timestamp: Date.now(),
          userAgent: request.headers.get('User-Agent')
        })
      })
    );
    
    return response;
  }
}
```

---

## 🎬 NEXT STEPS AFTER DEPLOYMENT

1. ✅ Test game thoroughly
2. ✅ Share link with Madenta: https://madenta.2076.is
3. ✅ Include in email pitch to island@madenta.eu
4. ✅ Record YouTube video with live demo
5. ✅ Monitor analytics for engagement

---

## 📞 SUPPORT

**Issues?** Contact:
- **Cloudflare Support:** https://dash.cloudflare.com/support
- **2076 ehf:** omar@2076.is
- **Wrangler Docs:** https://developers.cloudflare.com/workers/wrangler/

---

**Deployment created by:** 2076 ehf - Invisible Systems  
**Date:** November 23, 2025  
**Project:** MADENTA All-on-4 Educational Game  
**MCP Status:** ✅ Connected to Account `72ed26d13abd695cc3ae785adb386c27`
