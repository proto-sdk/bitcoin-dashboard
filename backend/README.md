# Proto Dashboard Backend

Secure backend proxy server for the Proto API PR Dashboard. This server keeps your GitHub Personal Access Token secure by handling all GitHub API requests server-side.

## Features

- 🔐 **Secure Authentication**: Username/password authentication with session management
- 🛡️ **Token Protection**: GitHub PAT never exposed to the browser
- 🚀 **GitHub API Proxy**: Proxies requests to GitHub API with proper authentication
- 🔒 **Security Headers**: CORS, CSP, and other security headers configured
- ⚡ **Lightweight**: Zero external dependencies, uses only Node.js built-in modules

## Prerequisites

- Node.js 14.0.0 or higher
- GitHub Personal Access Token with `repo` access

## Setup

### 1. Install Dependencies

This server uses only Node.js built-in modules, so no npm install is required!

### 2. Configure Environment Variables

Create a `.env` file (or set environment variables):

```bash
cp .env.example .env
```

Edit `.env` and set your values:

```env
PORT=3000
GITHUB_TOKEN=your_github_token_here
AUTH_USERNAME=admin
AUTH_PASSWORD_HASH=your_password_hash_here
SESSION_SECRET=your_random_secret_here
CORS_ORIGIN=http://localhost:8000
NODE_ENV=development
```

### 3. Generate Password Hash

Run this command to generate a password hash:

```bash
npm run hash-password your_password_here
```

Copy the output and set it as `AUTH_PASSWORD_HASH` in your `.env` file.

### 4. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

## API Endpoints

### Health Check
```
GET /health
```
Returns server status.

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "your_password"
}
```
Returns a session token.

### Logout
```
POST /api/auth/logout
Authorization: Bearer <session_token>
```
Invalidates the session token.

### Get Pull Requests
```
GET /api/github/prs
Authorization: Bearer <session_token>
```
Returns pull requests from the configured GitHub repository.

## Security Considerations

### Production Deployment

1. **Use HTTPS**: Always deploy behind HTTPS in production
2. **Set CORS_ORIGIN**: Restrict to your frontend domain
3. **Strong Password**: Use a strong password and secure hash
4. **Environment Variables**: Never commit `.env` file
5. **Session Storage**: Consider using Redis for session storage in production
6. **Rate Limiting**: Add rate limiting for production use
7. **Logging**: Implement proper logging and monitoring

### Environment Variables

- `GITHUB_TOKEN`: Your GitHub Personal Access Token (keep secret!)
- `AUTH_PASSWORD_HASH`: SHA256 hash of your password
- `SESSION_SECRET`: Random string for session encryption
- `CORS_ORIGIN`: Frontend URL (use specific domain in production)

## Deployment Options

### Option 1: Heroku

```bash
heroku create your-app-name
heroku config:set GITHUB_TOKEN=your_token
heroku config:set AUTH_USERNAME=admin
heroku config:set AUTH_PASSWORD_HASH=your_hash
heroku config:set SESSION_SECRET=your_secret
heroku config:set CORS_ORIGIN=https://your-frontend.com
git push heroku main
```

### Option 2: DigitalOcean App Platform

1. Create a new app from GitHub repository
2. Set environment variables in the app settings
3. Deploy

### Option 3: AWS EC2 / VPS

1. SSH into your server
2. Clone the repository
3. Create `.env` file with your configuration
4. Install PM2: `npm install -g pm2`
5. Start server: `pm2 start server.js --name proto-dashboard`
6. Setup nginx as reverse proxy with SSL

### Option 4: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/ .
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t proto-dashboard-backend .
docker run -p 3000:3000 --env-file .env proto-dashboard-backend
```

## Development

### Running Locally

```bash
npm run dev
```

### Testing Endpoints

```bash
# Health check
curl http://localhost:3000/health

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_password"}'

# Get PRs (replace TOKEN with the token from login response)
curl http://localhost:3000/api/github/prs \
  -H "Authorization: Bearer TOKEN"
```

## Troubleshooting

### Server won't start
- Check that PORT is not already in use
- Verify Node.js version: `node --version` (should be >= 14.0.0)

### Authentication fails
- Verify password hash is correct
- Check that AUTH_USERNAME matches

### GitHub API errors
- Verify GITHUB_TOKEN is valid and has correct permissions
- Check token hasn't expired
- Ensure token has `repo` scope

### CORS errors
- Set CORS_ORIGIN to match your frontend URL
- In development, use `*` or specific localhost URL

## License

MIT
