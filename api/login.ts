import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;

    // Trim whitespace to prevent common copy-paste issues
    const cleanUsername = (username || '').trim();
    const cleanPassword = (password || '').trim();

    // Map of valid users to their password environment variables or hardcoded values
    // We prioritize environment variables for security
    const VALID_USERS: Record<string, string | undefined> = {
        'rioanggara': process.env.ADMIN_PASSWORD,
        'brifki': process.env.BRIFKI_PASSWORD || 'bebirifki67',
        'rifki': process.env.BRIFKI_PASSWORD || 'bebirifki67' // Alias for brifki
    };

    const targetPassword = VALID_USERS[cleanUsername];

    if (!targetPassword && cleanUsername === 'rioanggara') {
        console.error('[AUTH_ERROR] ADMIN_PASSWORD environment variable is missing for rioanggara.');
        return res.status(500).json({
            error: 'Server configuration error: ADMIN_PASSWORD is not set.',
            details: 'Please ensure ADMIN_PASSWORD is set in Vercel Environment Variables.'
        });
    }

    if (targetPassword && cleanPassword === targetPassword) {
        console.log(`[AUTH_SUCCESS] User ${cleanUsername} logged in successfully.`);
        return res.status(200).json({
            success: true,
            token: 'naturra_admin_session_' + Date.now(),
            user: { username: cleanUsername }
        });
    }

    console.warn(`[AUTH_FAILURE] Invalid login attempt for username: "${cleanUsername}"`);
    return res.status(401).json({ error: 'Invalid username or password. Please check your credentials.' });
}
