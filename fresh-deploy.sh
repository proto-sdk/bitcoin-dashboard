#!/bin/bash

echo "🔧 Bitcoin Dashboard - Fresh Deploy Script"
echo "=========================================="

echo ""
echo "📋 Pre-deployment Checklist:"
echo "   ✅ GitHub repository created at: https://github.com/proto-sdk/bitcoin-dashboard"
echo "   ✅ Personal Access Token generated"
echo "   ✅ Repository is PUBLIC and EMPTY (no README, .gitignore, license)"
echo ""

read -p "Have you completed the checklist above? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "❌ Please complete the checklist first:"
    echo "   1. Go to https://github.com/proto-sdk"
    echo "   2. Click 'New repository'"
    echo "   3. Name: bitcoin-dashboard"
    echo "   4. Make it Public"
    echo "   5. Don't initialize with any files"
    echo "   6. Create repository"
    echo ""
    echo "   Then create Personal Access Token:"
    echo "   1. Go to https://github.com/settings/tokens"
    echo "   2. Generate new token (classic)"
    echo "   3. Select 'repo' scope"
    echo "   4. Copy the token"
    echo ""
    exit 1
fi

echo ""
read -p "Enter your GitHub username for proto-sdk account: " username
read -p "Enter your Personal Access Token (starts with ghp_): " token

echo ""
echo "🔧 Configuring remote repository..."
git remote set-url origin https://$username:$token@github.com/proto-sdk/bitcoin-dashboard.git

echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Repository deployed to GitHub"
    echo ""
    echo "🌐 Next: Enable GitHub Pages"
    echo "   1. Go to: https://github.com/proto-sdk/bitcoin-dashboard"
    echo "   2. Click Settings → Pages"
    echo "   3. Source: Deploy from a branch"
    echo "   4. Branch: main, Folder: / (root)"
    echo "   5. Save"
    echo ""
    echo "📊 Your dashboard will be live at:"
    echo "   https://proto-sdk.github.io/bitcoin-dashboard"
    echo ""
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "   - Repository doesn't exist"
    echo "   - Wrong username or token"
    echo "   - Repository was initialized with files"
    echo ""
    echo "🔧 Try:"
    echo "   git push -u origin main --force"
    echo ""
fi
