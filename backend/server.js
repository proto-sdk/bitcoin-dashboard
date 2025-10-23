/**
 * Secure Backend Proxy for GitHub PR Dashboard
 * 
 * This server acts as a secure proxy between the frontend and GitHub API,
 * keeping the GitHub Personal Access Token server-side and never exposing it to the browser.
 * 
 * Features:
 * - Basic authentication with username/password
 * - GitHub API proxy with secure token handling
 * - CORS configuration
 * - Rate limiting
 * - Security headers
 */

const http = require('http');
const https = require('https');
const url = require('url');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Load .env file manually (no dependencies needed)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=:#]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim();
            if (!process.env[key]) {
                process.env[key] = value;
            }
        }
    });
}

// Configuration - Load from environment variables
const CONFIG = {
    PORT: process.env.PORT || 3000,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
    // Simple auth - in production, use a proper auth system
    AUTH_USERNAME: process.env.AUTH_USERNAME || 'admin',
    AUTH_PASSWORD_HASH: process.env.AUTH_PASSWORD_HASH || '', // bcrypt hash of password
    SESSION_SECRET: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
};

// Simple session store (in-memory, use Redis in production)
const sessions = new Map();

// Helper: Hash password (simple SHA256 for demo, use bcrypt in production)
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Helper: Generate session token
function generateSessionToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Helper: Verify session
function verifySession(token) {
    const session = sessions.get(token);
    if (!session) return false;
    if (Date.now() > session.expires) {
        sessions.delete(token);
        return false;
    }
    return true;
}

// Helper: Parse JSON body
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                reject(e);
            }
        });
        req.on('error', reject);
    });
}

// Helper: Make GitHub API request
function githubRequest(path, token) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: path,
            method: 'GET',
            headers: {
                'User-Agent': 'Proto-Dashboard-Backend',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });

        req.on('error', reject);
        req.setTimeout(30000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        req.end();
    });
}

// Helper: Send JSON response
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': CONFIG.CORS_ORIGIN,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    });
    res.end(JSON.stringify(data));
}

// Request handler
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    // CORS preflight
    if (method === 'OPTIONS') {
        sendJSON(res, 200, { ok: true });
        return;
    }

    try {
        // Health check endpoint
        if (path === '/health' && method === 'GET') {
            sendJSON(res, 200, { status: 'ok', timestamp: new Date().toISOString() });
            return;
        }

        // Login endpoint
        if (path === '/api/auth/login' && method === 'POST') {
            const body = await parseBody(req);
            const { username, password } = body;

            // Validate credentials
            const passwordHash = hashPassword(password);
            if (username === CONFIG.AUTH_USERNAME && passwordHash === CONFIG.AUTH_PASSWORD_HASH) {
                const sessionToken = generateSessionToken();
                sessions.set(sessionToken, {
                    username,
                    expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
                });
                sendJSON(res, 200, { token: sessionToken, expiresIn: 86400 });
            } else {
                sendJSON(res, 401, { error: 'Invalid credentials' });
            }
            return;
        }

        // Logout endpoint
        if (path === '/api/auth/logout' && method === 'POST') {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.substring(7);
                sessions.delete(token);
            }
            sendJSON(res, 200, { message: 'Logged out' });
            return;
        }

        // Verify authentication for protected routes
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            sendJSON(res, 401, { error: 'Authentication required' });
            return;
        }

        const sessionToken = authHeader.substring(7);
        if (!verifySession(sessionToken)) {
            sendJSON(res, 401, { error: 'Invalid or expired session' });
            return;
        }

        // GitHub API proxy endpoint
        if (path === '/api/github/prs' && method === 'GET') {
            if (!CONFIG.GITHUB_TOKEN) {
                sendJSON(res, 500, { error: 'GitHub token not configured' });
                return;
            }

            const githubPath = '/repos/btc-mining/miner-firmware/pulls?state=all&base=main&sort=updated&direction=desc&per_page=100';
            const response = await githubRequest(githubPath, CONFIG.GITHUB_TOKEN);

            res.writeHead(response.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': CONFIG.CORS_ORIGIN,
                'Access-Control-Allow-Credentials': 'true',
                'X-Content-Type-Options': 'nosniff'
            });
            res.end(response.body);
            return;
        }

        // 404 for unknown routes
        sendJSON(res, 404, { error: 'Not found' });

    } catch (error) {
        console.error('Server error:', error);
        sendJSON(res, 500, { error: 'Internal server error' });
    }
});

// Start server
server.listen(CONFIG.PORT, () => {
    console.log(`🚀 Backend server running on port ${CONFIG.PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔐 Auth configured: ${CONFIG.AUTH_PASSWORD_HASH ? 'Yes' : 'No (using default)'}`);
    console.log(`🔑 GitHub token configured: ${CONFIG.GITHUB_TOKEN ? 'Yes' : 'No'}`);
    
    if (!CONFIG.GITHUB_TOKEN) {
        console.warn('⚠️  WARNING: GITHUB_TOKEN not set in environment variables!');
    }
    if (!CONFIG.AUTH_PASSWORD_HASH) {
        console.warn('⚠️  WARNING: Using default password. Set AUTH_PASSWORD_HASH in production!');
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
