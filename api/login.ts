import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;

    // Trim whitespace to prevent common copy-paste issues
    const cleanUsername = (username || '').trim();
    const cleanPassword = (password || '').trim();

    const ADMIN_USERNAME = 'rioanggara';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_PASSWORD) {
        console.error('[AUTH_ERROR] ADMIN_PASSWORD environment variable is missing in Vercel settings.');
        return res.status(500).json({
            error: 'Server configuration error: ADMIN_PASSWORD is not set.',
            details: 'Please ensure ADMIN_PASSWORD is set in Vercel Environment Variables and that you have REDEPLOYED the project.'
        });
    }

    if (cleanUsername === ADMIN_USERNAME && cleanPassword === ADMIN_PASSWORD) {
        console.log(`[AUTH_SUCCESS] User ${cleanUsername} logged in successfully.`);
        return res.status(200).json({
            success: true,
            token: 'naturra_admin_session_' + Date.now(),
            user: { username: ADMIN_USERNAME }
        });
    }

    console.warn(`[AUTH_FAILURE] Invalid login attempt for username: "${cleanUsername}"`);
    return res.status(401).json({ error: 'Invalid username or password. Please check your credentials and ensure no extra spaces were added.' });
}
