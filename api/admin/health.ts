import type { VercelRequest, VercelResponse } from '@vercel/node';
import { BLOG_POSTS } from '../../src/data/blog';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // This API is used by the admin panel to verify that the deployed site
    // matches the expected content (e.g. post count).

    // We add a cache-busting timestamp and set headers to prevent caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    try {
        const latestPost = BLOG_POSTS.length > 0 ? BLOG_POSTS[BLOG_POSTS.length - 1] : null;

        return res.status(200).json({
            success: true,
            postCount: BLOG_POSTS.length,
            latestPost: latestPost ? {
                id: latestPost.id,
                slug: latestPost.slug,
                date: latestPost.date
            } : null,
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch health status',
            details: error.message
        });
    }
}
