# Proto API PR Dashboard

A secure, real-time dashboard for monitoring Pull Requests in the Proto API repository with backend authentication.

## 🎯 Features

- **Secure Authentication**: Username/password login with session management
- **Backend Proxy**: GitHub PAT stored securely server-side, never exposed to browser
- **Real-time Updates**: Auto-refresh every 15 minutes with manual refresh option
- **Advanced Filtering**: Filter PRs by author, title, and status (Open/Closed/Merged)
- **Statistics**: Visual PR statistics with percentages
- **Responsive Design**: Works on desktop and mobile devices
- **Live Timestamps**: Real-time "updated X minutes ago" badges

## 🏗️ Architecture

### Two Deployment Options:

#### Option 1: Secure Backend + Frontend (Recommended for Production)
```
Frontend (index-secure.html) → Backend Server (Node.js) → GitHub API
                                      ↓
                                  .env (PAT stored here)
```

**Security Benefits:**
- ✅ GitHub PAT never exposed to browser
- ✅ Authentication required to access dashboard
- ✅ Session-based access control
- ✅ CORS and security headers configured

#### Option 2: Simple Frontend Only (Development/Local Use)
```
Frontend (index.html) → config.js (local only) → GitHub API
```

**Use Case:**
- Local development
- Single-user access
- No server hosting required

## 🚀 Quick Start

### Option 1: Secure Backend Setup (Recommended)

#### 1. Backend Setup

```bash
cd backend

# Run the setup script
./setup.sh

# Or manually create .env file:
cp .env.example .env
# Edit .env and set your values

# Start the server
npm start
```

The server will run on `http://localhost:3000`

**Default credentials:**
- Username: `admin`
- Password: `admin123` (change this in production!)

#### 2. Frontend Setup

Open `index-secure.html` in your browser. The frontend is configured to connect to `http://localhost:3000` by default.

To change the backend URL, edit this line in `index-secure.html`:
```javascript
const API_BASE_URL = 'http://localhost:3000';  // Change to your backend URL
```

#### 3. Login

1. Open `index-secure.html` in your browser
2. Enter your username and password
3. Click "Login"
4. The dashboard will load and display PRs

### Option 2: Simple Frontend Setup (Local Development)

#### 1. Create config.js

```bash
cp config.example.js config.js
```

#### 2. Add Your GitHub Token

Edit `config.js` and replace `YOUR_GITHUB_TOKEN` with your Personal Access Token:

```javascript
window.config = {
    githubToken: 'ghp_your_actual_token_here'
};
```

#### 3. Open Dashboard

Open `index.html` in your browser. The dashboard will load PRs automatically.

## 🔐 Security

### Backend Security Features

- **Authentication**: Session-based authentication with secure tokens
- **Password Hashing**: SHA256 password hashing (use bcrypt in production)
- **Session Management**: 24-hour session expiration
- **CORS Protection**: Configurable CORS origin
- **Security Headers**: CSP, X-Frame-Options, HSTS
- **No Dependencies**: Zero external dependencies, uses only Node.js built-in modules

### Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use strong passwords** - Change default password immediately
3. **Use HTTPS in production** - Deploy behind reverse proxy with SSL
4. **Restrict CORS origin** - Set to your frontend domain in production
5. **Rotate GitHub tokens** - Regularly update your PAT
6. **Monitor access logs** - Implement logging in production

## 📝 Configuration

### Backend Environment Variables

```env
PORT=3000                          # Server port
GITHUB_TOKEN=ghp_xxx               # Your GitHub Personal Access Token
AUTH_USERNAME=admin                # Admin username
AUTH_PASSWORD_HASH=xxx             # SHA256 hash of password
SESSION_SECRET=xxx                 # Random session secret
CORS_ORIGIN=*                      # CORS origin (* for all, or specific domain)
NODE_ENV=development               # Environment (development/production)
```

### Generate Password Hash

```bash
cd backend
npm run hash-password your_password_here
```

## 🌐 Deployment

### Backend Deployment Options

#### 1. Heroku

```bash
cd backend
heroku create your-app-name
heroku config:set GITHUB_TOKEN=your_token
heroku config:set AUTH_USERNAME=admin
heroku config:set AUTH_PASSWORD_HASH=your_hash
heroku config:set SESSION_SECRET=your_secret
heroku config:set CORS_ORIGIN=https://your-frontend.com
git subtree push --prefix backend heroku main
```

#### 2. DigitalOcean App Platform

1. Create new app from GitHub repository
2. Set root directory to `backend`
3. Configure environment variables in app settings
4. Deploy

#### 3. AWS EC2 / VPS

```bash
# On your server
git clone your-repo
cd proto-github-dashboard/backend
npm install -g pm2
cp .env.example .env
# Edit .env with your values
pm2 start server.js --name proto-dashboard
pm2 save
pm2 startup
```

#### 4. Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/ .
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t proto-dashboard-backend .
docker run -p 3000:3000 --env-file .env proto-dashboard-backend
```

### Frontend Deployment

#### GitHub Pages (for index-secure.html)

```bash
git add index-secure.html
git commit -m "Add secure dashboard frontend"
git push origin main
```

Access at: `https://your-username.github.io/your-repo/index-secure.html`

**Note**: Update `API_BASE_URL` in `index-secure.html` to point to your deployed backend.

## 🛠️ Development

### Project Structure

```
proto-github-dashboard/
├── backend/
│   ├── server.js           # Backend server (pure Node.js)
│   ├── package.json        # Package configuration
│   ├── .env.example        # Environment variables template
│   ├── .env                # Your environment variables (git-ignored)
│   ├── setup.sh            # Setup script
│   └── README.md           # Backend documentation
├── assets/
│   └── images/             # Logo and favicon
├── index.html              # Simple frontend (config.js)
├── index-secure.html       # Secure frontend (backend auth)
├── config.example.js       # Config template
├── config.js               # Your config (git-ignored)
├── manifest.json           # PWA manifest
└── README.md               # This file
```

### API Endpoints

#### Backend API

```
GET  /health                  # Health check
POST /api/auth/login          # Login (returns session token)
POST /api/auth/logout         # Logout (invalidates session)
GET  /api/github/prs          # Get PRs (requires authentication)
```

### Testing

```bash
# Test backend
cd backend

# Health check
curl http://localhost:3000/health

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get PRs (replace TOKEN with token from login)
curl http://localhost:3000/api/github/prs \
  -H "Authorization: Bearer TOKEN"
```

## 📊 Dashboard Features

### Filtering

- **Author Filter**: Search by GitHub username
- **Title Filter**: Search by PR title
- **Status Filter**: Filter by Open, Closed, or Merged status

### Statistics

- **Open PRs**: Percentage of open pull requests
- **Closed PRs**: Percentage of closed (not merged) pull requests
- **Merged PRs**: Percentage of merged pull requests

### Auto-Refresh

- Automatically refreshes every 15 minutes
- Manual refresh button available
- Countdown timer shows time until next refresh

## 🐛 Troubleshooting

### Backend won't start

- Check if port 3000 is already in use: `lsof -ti:3000`
- Verify Node.js version: `node --version` (should be >= 14.0.0)
- Check `.env` file exists and has correct values

### Authentication fails

- Verify password hash is correct
- Check `AUTH_USERNAME` and `AUTH_PASSWORD_HASH` in `.env`
- Generate new hash: `npm run hash-password your_password`

### GitHub API errors

- Verify `GITHUB_TOKEN` is valid
- Check token hasn't expired
- Ensure token has `repo` scope
- Check rate limits: https://api.github.com/rate_limit

### CORS errors

- Set `CORS_ORIGIN` to match your frontend URL
- In development, use `*` or specific localhost URL
- In production, use your domain: `https://your-domain.com`

### Frontend can't connect to backend

- Verify backend is running: `curl http://localhost:3000/health`
- Check `API_BASE_URL` in `index-secure.html` matches backend URL
- Check browser console for errors

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs
3. Check browser console for errors
4. Open an issue on GitHub

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

---

**Security Note**: This dashboard is designed for internal use. Always use HTTPS in production and implement additional security measures as needed for your organization.
