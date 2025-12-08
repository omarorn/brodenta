#!/bin/bash

# MADENTA GAME - AUTOMATED CLOUDFLARE DEPLOYMENT
# Author: 2076 ehf - Ómar Örn Magnússon
# Date: November 23, 2025

set -e  # Exit on error

echo "🚀 MADENTA GAME - CLOUDFLARE DEPLOYMENT"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
WORKER_NAME="madenta-game"
ACCOUNT_ID="72ed26d13abd695cc3ae785adb386c27"
CUSTOM_DOMAIN="madenta.2076.is"

echo -e "${BLUE}📋 Configuration:${NC}"
echo "   Worker Name: $WORKER_NAME"
echo "   Account ID: $ACCOUNT_ID"
echo "   Custom Domain: $CUSTOM_DOMAIN"
echo ""

# Step 1: Check if wrangler is installed
echo -e "${BLUE}🔍 Checking for Wrangler CLI...${NC}"
if ! command -v wrangler &> /dev/null; then
    echo -e "${YELLOW}⚠️  Wrangler not found. Installing...${NC}"
    npm install -g wrangler
else
    echo -e "${GREEN}✅ Wrangler found!${NC}"
fi
echo ""

# Step 2: Check if logged in
echo -e "${BLUE}🔑 Checking Cloudflare authentication...${NC}"
if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in. Please login:${NC}"
    wrangler login
else
    echo -e "${GREEN}✅ Already authenticated!${NC}"
fi
echo ""

# Step 3: Create wrangler.toml if it doesn't exist
echo -e "${BLUE}📝 Creating wrangler.toml...${NC}"
cat > wrangler.toml << EOL
name = "${WORKER_NAME}"
main = "worker.js"
compatibility_date = "2024-11-23"
account_id = "${ACCOUNT_ID}"

[[routes]]
pattern = "${CUSTOM_DOMAIN}/*"
custom_domain = true
EOL
echo -e "${GREEN}✅ wrangler.toml created!${NC}"
echo ""

# Step 4: Deploy the worker
echo -e "${BLUE}🚀 Deploying to Cloudflare...${NC}"
wrangler deploy

echo ""
echo -e "${GREEN}✅ DEPLOYMENT SUCCESSFUL!${NC}"
echo ""
echo "================================================"
echo "🎉 Your game is now live at:"
echo ""
echo -e "   ${GREEN}https://${WORKER_NAME}.omarorn.workers.dev${NC}"
echo -e "   ${GREEN}https://${CUSTOM_DOMAIN}${NC}"
echo ""
echo "================================================"
echo ""

# Step 5: Verify deployment
echo -e "${BLUE}🔍 Verifying deployment...${NC}"
echo ""

# Test worker.dev URL
echo "Testing worker.dev URL..."
if curl -s -o /dev/null -w "%{http_code}" "https://${WORKER_NAME}.omarorn.workers.dev" | grep -q "200"; then
    echo -e "${GREEN}✅ Worker.dev URL responding!${NC}"
else
    echo -e "${YELLOW}⚠️  Worker.dev URL not responding yet (may take a moment)${NC}"
fi

# Test custom domain (may not work immediately due to DNS)
echo "Testing custom domain..."
if curl -s -o /dev/null -w "%{http_code}" "https://${CUSTOM_DOMAIN}" | grep -q "200"; then
    echo -e "${GREEN}✅ Custom domain responding!${NC}"
else
    echo -e "${YELLOW}⚠️  Custom domain not responding yet (DNS propagation may take 5-10 minutes)${NC}"
fi

echo ""
echo "================================================"
echo "📊 Next Steps:"
echo "================================================"
echo ""
echo "1. ✅ Test the game in your browser"
echo "2. ✅ Share with Madenta: island@madenta.eu"
echo "3. ✅ Include in YouTube video"
echo "4. ✅ Monitor analytics (if configured)"
echo ""
echo "🎮 Game Features:"
echo "   - 🇮🇸/🇭🇺 Bilingual support"
echo "   - 📱 Mobile responsive"
echo "   - 🎨 Madenta branding"
echo "   - 🦷 Educational All-on-4 content"
echo ""
echo "================================================"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo "================================================"
