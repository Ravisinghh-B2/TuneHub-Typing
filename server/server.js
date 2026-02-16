require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../')));
app.use(cors({
    origin: 'https://tunehub-typing.vercel.app',
    credentials: true
}));

// Mock Database (Replace with real DB in production)
const users = [];

// Helper to find or create user
const findOrCreateUser = (provider, profile) => {
    let user = users.find(u => u.provider === provider && u.providerId === profile.id);
    if (!user) {
        user = {
            id: Date.now().toString(),
            provider,
            providerId: profile.id,
            email: profile.email,
            name: profile.name,
            avatar: profile.avatar,
            createdAt: new Date()
        };
        users.push(user);
    }
    return user;
};

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// DEV MODE: Mock Login if credentials are not set
const isDevMode = process.env.GOOGLE_CLIENT_ID === 'your_google_client_id';

if (isDevMode) {
    console.log('⚠️  DEV MODE ENABLED: OAuth credentials missing. Using Mock Login.');

    // Mock Google Login
    app.get('/auth/google', (req, res) => {
        const mockUser = findOrCreateUser('google', {
            id: 'mock-google-id',
            email: 'dev@example.com',
            name: 'Dev User',
            avatar: 'https://ui-avatars.com/api/?name=Dev+User&background=random'
        });
        const token = generateToken(mockUser);
        res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.redirect('/#pageAccount');
    });

    // Mock GitHub Login
    app.get('/auth/github', (req, res) => {
        const mockUser = findOrCreateUser('github', {
            id: 'mock-github-id',
            email: 'dev@github.com',
            name: 'GitHub Dev',
            avatar: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
        });
        const token = generateToken(mockUser);
        res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.redirect('/#pageAccount');
    });
}

/* ==========================================
   GOOGLE OAUTH
   ========================================== */
if (!isDevMode) {
    app.get('/auth/google', (req, res) => {
        const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const options = {
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            client_id: process.env.GOOGLE_CLIENT_ID,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ].join(' ')
        };
        const qs = new URLSearchParams(options);
        res.redirect(`${rootUrl}?${qs.toString()}`);
    });

    app.get('/auth/google/callback', async (req, res) => {
        const code = req.query.code;
        try {
            // Exchange code for tokens
            const { data } = await axios.post('https://oauth2.googleapis.com/token', {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code'
            });

            const { access_token, id_token } = data;

            // Get user info
            const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                headers: { Authorization: `Bearer ${access_token}` }
            });

            // Find or create user
            const user = findOrCreateUser('google', {
                id: profile.id,
                email: profile.email,
                name: profile.name,
                avatar: profile.picture
            });

            // Generate Session Token
            const token = generateToken(user);

            // Set Cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.redirect('/#pageAccount'); // Redirect to frontend
        } catch (error) {
            console.error('Google Auth Error:', error.response?.data || error.message);
            res.redirect('/?error=google_auth_failed');
        }
    });

    /* ==========================================
       GITHUB OAUTH
       ========================================== */
    app.get('/auth/github', (req, res) => {
        const rootUrl = 'https://github.com/login/oauth/authorize';
        const options = {
            client_id: process.env.GITHUB_CLIENT_ID,
            redirect_uri: process.env.GITHUB_REDIRECT_URI,
            scope: 'user:email'
        };
        const qs = new URLSearchParams(options);
        res.redirect(`${rootUrl}?${qs.toString()}`);
    });

    app.get('/auth/github/callback', async (req, res) => {
        const code = req.query.code;
        try {
            // Exchange code for token
            const { data } = await axios.post('https://github.com/login/oauth/access_token', {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
                redirect_uri: process.env.GITHUB_REDIRECT_URI
            }, {
                headers: { Accept: 'application/json' }
            });

            const { access_token } = data;

            // Get User Info
            const { data: userProfile } = await axios.get('https://api.github.com/user', {
                headers: { Authorization: `Bearer ${access_token}` }
            });

            // Get User Email (GitHub emails can be private)
            const { data: emails } = await axios.get('https://api.github.com/user/emails', {
                headers: { Authorization: `Bearer ${access_token}` }
            });
            const primaryEmail = emails.find(e => e.primary && e.verified)?.email || emails[0].email;

            // Find or create user
            const user = findOrCreateUser('github', {
                id: userProfile.id.toString(),
                email: primaryEmail,
                name: userProfile.name || userProfile.login,
                avatar: userProfile.avatar_url
            });

            // Generate Session Token
            const token = generateToken(user);

            // Set Cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.redirect('/#pageAccount');
        } catch (error) {
            console.error('GitHub Auth Error:', error.response?.data || error.message);
            res.redirect('/?error=github_auth_failed');
        }
    });
}

/* ==========================================
   AUTH CHECK & LOGOUT
   ========================================== */
app.get('/auth/me', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ user: decoded }); // In real app, fetch fresh data from DB
    } catch (err) {
        res.clearCookie('token');
        res.status(401).json({ message: "Unauthorized" });
    }
});

app.post('/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
