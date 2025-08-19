# Bitcoin Dashboard Deployment Guide

## 🔑 Step 1: Create Personal Access Token

1. **Go to GitHub Settings:**
   - Visit: https://github.com/settings/tokens
   - Click "Generate new token (classic)"

2. **Configure Token:**
   - Note: "Bitcoin Dashboard Deployment"
   - Expiration: 90 days
   - Scopes: ✅ Check "repo" (Full control of private repositories)
   - Click "Generate token"

3. **Copy Token:**
   - Copy the token (starts with `ghp_`)
   - Save it somewhere safe (you won't see it again!)

## 📤 Step 2: Push to GitHub

Run these commands in Terminal:

```bash
cd /Users/hmoses/bitcoin-dashboard-proto

# Add the deploy script to git
git add deploy.sh
git commit -m "Add deployment script"

# Push to GitHub (you'll be prompted for credentials)
git push -u origin main
```

**When prompted:**
- Username: `your-github-username` 
- Password: `paste-your-personal-access-token-here`

## 🌐 Step 3: Enable GitHub Pages

1. **Go to Repository:**
   - Visit: https://github.com/proto-sdk/bitcoin-dashboard

2. **Open Settings:**
   - Click the "Settings" tab (far right)

3. **Configure Pages:**
   - Scroll down to "Pages" section (left sidebar)
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"
   - Click "Save"

4. **Wait for Deployment:**
   - GitHub will show: "Your site is ready to be published at..."
   - Wait 2-3 minutes for deployment

## 📊 Step 4: Test Your Dashboard

Your dashboard will be live at:
**https://proto-sdk.github.io/bitcoin-dashboard**

## 📝 Step 5: Embedding Options

### Option A: JavaScript Widget (Best)
```html
<div id="bitcoin-stats"></div>
<script src="https://proto-sdk.github.io/bitcoin-dashboard/widget.js"></script>
```

### Option B: Direct Link
```markdown
[📊 View Live Bitcoin Network Statistics](https://proto-sdk.github.io/bitcoin-dashboard)
```

### Option C: Compact Embed
```html
<object data="https://proto-sdk.github.io/bitcoin-dashboard/compact.html" 
        width="100%" height="200px" type="text/html">
  <a href="https://proto-sdk.github.io/bitcoin-dashboard">Bitcoin Stats</a>
</object>
```

### Option D: Static Data (Fallback)
```markdown
**Current Bitcoin Network Statistics:**
- Hash Rate: ~500+ EH/s
- Estimated Miners: ~500,000+ devices  
- Block Height: 870,000+
- [View Live Data →](https://proto-sdk.github.io/bitcoin-dashboard)
```

## 🎯 For Your A+ Paper

Add this to your Bitcoin mining paper:

```markdown
## Current Network Statistics

The Bitcoin network currently operates with the following real-time metrics:

<div id="bitcoin-stats"></div>
<script src="https://proto-sdk.github.io/bitcoin-dashboard/widget.js"></script>

As demonstrated by the live data above, the Bitcoin network hash rate of approximately **500+ EH/s** represents the collective computational power of an estimated **500,000+ active mining devices** worldwide. This massive distributed network secures transactions worth over **$1.9 trillion** in total market capitalization.

*Data updates automatically every 5 minutes from multiple reliable sources including CoinGecko, Blockchain.info, and Blockstream APIs.*
```

## 🔧 Troubleshooting

If you encounter issues:
1. **Authentication Error:** Double-check your Personal Access Token
2. **Repository Not Found:** Ensure the repository exists at github.com/proto-sdk/bitcoin-dashboard
3. **Pages Not Working:** Wait 5-10 minutes after enabling Pages
4. **Widget Not Loading:** Try the direct link or static options

---

**Ready to deploy? Follow steps 1-2 above to get started!**
