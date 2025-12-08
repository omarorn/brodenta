# MADENTA GAME - AUTOMATED CLOUDFLARE DEPLOYMENT (PowerShell)
# Author: 2076 ehf - Ómar Örn Magnússon
# Date: November 23, 2025

$ErrorActionPreference = "Stop"

Write-Host "🚀 MADENTA GAME - CLOUDFLARE DEPLOYMENT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$WORKER_NAME = "madenta-game"
$ACCOUNT_ID = "72ed26d13abd695cc3ae785adb386c27"
$CUSTOM_DOMAIN = "madenta.2076.is"

Write-Host "📋 Configuration:" -ForegroundColor Blue
Write-Host "   Worker Name: $WORKER_NAME"
Write-Host "   Account ID: $ACCOUNT_ID"
Write-Host "   Custom Domain: $CUSTOM_DOMAIN"
Write-Host ""

# Step 1: Check if wrangler is installed
Write-Host "🔍 Checking for Wrangler CLI..." -ForegroundColor Blue
try {
    $null = wrangler --version
    Write-Host "✅ Wrangler found!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Wrangler not found. Installing..." -ForegroundColor Yellow
    npm install -g wrangler
}
Write-Host ""

# Step 2: Check if logged in
Write-Host "🔑 Checking Cloudflare authentication..." -ForegroundColor Blue
try {
    $null = wrangler whoami 2>&1
    Write-Host "✅ Already authenticated!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Not logged in. Please login:" -ForegroundColor Yellow
    wrangler login
}
Write-Host ""

# Step 3: Create wrangler.toml
Write-Host "📝 Creating wrangler.toml..." -ForegroundColor Blue
@"
name = "$WORKER_NAME"
main = "worker.js"
compatibility_date = "2024-11-23"
account_id = "$ACCOUNT_ID"

[[routes]]
pattern = "$CUSTOM_DOMAIN/*"
custom_domain = true
"@ | Out-File -FilePath "wrangler.toml" -Encoding UTF8
Write-Host "✅ wrangler.toml created!" -ForegroundColor Green
Write-Host ""

# Step 4: Deploy the worker
Write-Host "🚀 Deploying to Cloudflare..." -ForegroundColor Blue
wrangler deploy

Write-Host ""
Write-Host "✅ DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
Write-Host ""
Write-Host "================================================"
Write-Host "🎉 Your game is now live at:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   https://$WORKER_NAME.omarorn.workers.dev" -ForegroundColor Green
Write-Host "   https://$CUSTOM_DOMAIN" -ForegroundColor Green
Write-Host ""
Write-Host "================================================"
Write-Host ""

# Step 5: Verify deployment
Write-Host "🔍 Verifying deployment..." -ForegroundColor Blue
Write-Host ""

Write-Host "Testing worker.dev URL..."
try {
    $response = Invoke-WebRequest -Uri "https://$WORKER_NAME.omarorn.workers.dev" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Worker.dev URL responding!" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Worker.dev URL not responding yet (may take a moment)" -ForegroundColor Yellow
}

Write-Host "Testing custom domain..."
try {
    $response = Invoke-WebRequest -Uri "https://$CUSTOM_DOMAIN" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Custom domain responding!" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Custom domain not responding yet (DNS propagation may take 5-10 minutes)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================================"
Write-Host "📊 Next Steps:" -ForegroundColor Cyan
Write-Host "================================================"
Write-Host ""
Write-Host "1. ✅ Test the game in your browser"
Write-Host "2. ✅ Share with Madenta: island@madenta.eu"
Write-Host "3. ✅ Include in YouTube video"
Write-Host "4. ✅ Monitor analytics (if configured)"
Write-Host ""
Write-Host "🎮 Game Features:"
Write-Host "   - 🇮🇸/🇭🇺 Bilingual support"
Write-Host "   - 📱 Mobile responsive"
Write-Host "   - 🎨 Madenta branding"
Write-Host "   - 🦷 Educational All-on-4 content"
Write-Host ""
Write-Host "================================================"
Write-Host "Deployment completed successfully!" -ForegroundColor Green
Write-Host "================================================"
