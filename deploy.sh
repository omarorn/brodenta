#!/bin/bash

# MADENTA Game Deployment Script
# Usage: ./deploy.sh

echo "🎮 MADENTA: All-on-4 Reynslan - Deployment"
echo "=========================================="
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler not found. Installing..."
    npm install -g wrangler
fi

echo "✅ Wrangler found"
echo ""

# Login check
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "⚠️  Not logged in. Opening browser for authentication..."
    wrangler login
fi

echo "✅ Authenticated"
echo ""

# Deploy
echo "🚀 Deploying to Cloudflare Pages..."
wrangler pages deploy . --project-name=madenta-game

echo ""
echo "=========================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "📍 Your game is live at:"
echo "   https://madenta-game.pages.dev"
echo ""
echo "🔧 Next steps:"
echo "   1. Go to Cloudflare Dashboard"
echo "   2. Pages → madenta-game → Custom domains"
echo "   3. Add: madenta.2076.is"
echo ""
echo "🎬 Ready for YouTube content!"
echo "=========================================="
