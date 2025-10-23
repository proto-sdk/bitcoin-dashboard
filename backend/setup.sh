#!/bin/bash

# Proto Dashboard Backend Setup Script

echo "🚀 Proto Dashboard Backend Setup"
echo "=================================="
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists. Do you want to overwrite it? (y/n)"
    read -r response
    if [ "$response" != "y" ]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

# Get GitHub token
echo "📝 Enter your GitHub Personal Access Token:"
echo "(Get one from: https://github.com/settings/tokens)"
read -r GITHUB_TOKEN

# Get username
echo ""
echo "👤 Enter admin username (default: admin):"
read -r AUTH_USERNAME
AUTH_USERNAME=${AUTH_USERNAME:-admin}

# Get password
echo ""
echo "🔐 Enter admin password:"
read -s AUTH_PASSWORD
echo ""

# Generate password hash
AUTH_PASSWORD_HASH=$(node -e "console.log(require('crypto').createHash('sha256').update('$AUTH_PASSWORD').digest('hex'))")

# Generate session secret
SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Get port
echo ""
echo "🌐 Enter server port (default: 3000):"
read -r PORT
PORT=${PORT:-3000}

# Get CORS origin
echo ""
echo "🔗 Enter CORS origin (default: * for all origins):"
echo "(In production, set this to your frontend URL, e.g., https://your-domain.com)"
read -r CORS_ORIGIN
CORS_ORIGIN=${CORS_ORIGIN:-*}

# Create .env file
cat > .env << ENVEOF
# Backend Server Configuration
# Generated on $(date)

# Server port
PORT=$PORT

# GitHub Personal Access Token
GITHUB_TOKEN=$GITHUB_TOKEN

# Authentication credentials
AUTH_USERNAME=$AUTH_USERNAME
AUTH_PASSWORD_HASH=$AUTH_PASSWORD_HASH

# Session secret
SESSION_SECRET=$SESSION_SECRET

# CORS origin
CORS_ORIGIN=$CORS_ORIGIN

# Node environment
NODE_ENV=development
ENVEOF

echo ""
echo "✅ Configuration saved to .env"
echo ""
echo "📋 Your credentials:"
echo "   Username: $AUTH_USERNAME"
echo "   Password: $AUTH_PASSWORD"
echo ""
echo "🚀 To start the server, run:"
echo "   npm start"
echo ""
echo "🔒 Keep your .env file secure and never commit it to Git!"
