#!/bin/bash

echo "🚀 Bitcoin Dashboard Deployment Script"
echo "======================================"

echo ""
echo "📁 Current directory: $(pwd)"
echo "📂 Repository status:"
git status --short

echo ""
echo "🔗 Remote repository:"
git remote -v

echo ""
echo "📤 Ready to push to GitHub!"
echo ""
echo "⚠️  AUTHENTICATION REQUIRED:"
echo "   When prompted for username: enter your GitHub username"
echo "   When prompted for password: use your Personal Access Token"
echo ""
echo "🔑 Need a Personal Access Token?"
echo "   1. Go to: https://github.com/settings/tokens"
echo "   2. Click 'Generate new token (classic)'"
echo "   3. Select 'repo' scope"
echo "   4. Copy the token (starts with ghp_)"
echo ""

read -p "Press Enter to continue with git push..."

echo "🚀 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Code pushed to GitHub"
    echo ""
    echo "🌐 Next steps:"
    echo "   1. Go to: https://github.com/proto-sdk/bitcoin-dashboard"
    echo "   2. Click 'Settings' tab"
    echo "   3. Scroll to 'Pages' section"
    echo "   4. Source: Deploy from a branch"
    echo "   5. Branch: main"
    echo "   6. Folder: / (root)"
    echo "   7. Click 'Save'"
    echo ""
    echo "📊 Your dashboard will be live at:"
    echo "   https://proto-sdk.github.io/bitcoin-dashboard"
    echo ""
else
    echo ""
    echo "❌ Push failed. Please check your authentication."
    echo ""
    echo "🔧 Troubleshooting:"
    echo "   - Make sure you're using your Personal Access Token as password"
    echo "   - Check that the repository exists: https://github.com/proto-sdk/bitcoin-dashboard"
    echo "   - Verify your GitHub username is correct"
fi
