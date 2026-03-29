import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { sha } = req.query;

    if (!sha || typeof sha !== 'string') {
        return res.status(400).json({ error: 'Commit SHA is required' });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO || 'projectcamar/naturra-extal';

    if (!GITHUB_TOKEN) {
        return res.status(500).json({
            error: 'GitHub token not configured',
            details: 'Please set GITHUB_TOKEN in Vercel environment variables'
        });
    }

    try {
        const [owner, repo] = GITHUB_REPO.split('/');

        // Fetch check runs for the specific commit
        const checkRunsUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${sha}/check-runs`;
        const response = await fetch(checkRunsUrl, {
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Naturra-Admin-Bot'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch check runs from GitHub: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();

        // Find the Vercel check run
        const vercelCheck = data.check_runs.find((run: any) =>
            run.app?.slug === 'vercel' || run.name.toLowerCase().includes('vercel')
        );

        if (!vercelCheck) {
            return res.status(200).json({
                status: 'queued',
                message: 'Waiting for Vercel to pick up the change...'
            });
        }

        // Map GitHub status to a simpler format
        let status = 'building';
        if (vercelCheck.status === 'completed') {
            status = vercelCheck.conclusion === 'success' ? 'ready' : 'failed';
        } else if (vercelCheck.status === 'in_progress') {
            status = 'building';
        } else if (vercelCheck.status === 'queued') {
            status = 'queued';
        }

        return res.status(200).json({
            status,
            conclusion: vercelCheck.conclusion,
            checkRunUrl: vercelCheck.html_url,
            detailsUrl: vercelCheck.details_url,
            startedAt: vercelCheck.started_at,
            completedAt: vercelCheck.completed_at
        });

    } catch (error: any) {
        console.error('[DEPLOYMENT_STATUS_ERROR]', error);
        return res.status(500).json({
            error: 'Failed to fetch deployment status',
            details: error.message
        });
    }
}
