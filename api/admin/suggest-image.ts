import type { VercelRequest, VercelResponse } from '@vercel/node';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function fetchUnsplashImage(query: string): Promise<string | null> {
    if (!UNSPLASH_ACCESS_KEY) return null;

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`, {
            headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        });

        if (!response.ok) return null;

        const data = await response.json();
        return data.results?.[0]?.urls?.regular || null;
    } catch (error) {
        console.error('Unsplash fetch error:', error);
        return null;
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { title, excerpt, model = 'llama-3.3-70b-versatile', context = 'main cover image' } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title/Heading is required' });
        }

        // Determine which API to use based on model
        const isOpenRouter = model.includes('/');
        const apiUrl = isOpenRouter ? OPENROUTER_API_URL : GROQ_API_URL;
        const apiKey = isOpenRouter ? OPENROUTER_API_KEY : GROQ_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: `API key not configured for ${isOpenRouter ? 'OpenRouter' : 'Groq'}`
            });
        }

        // Step 1: Generate a high-quality Unsplash search query using AI
        const aiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert at choosing the perfect image search query for blog posts. Respond with ONLY the search query in English. Tends toward specific, high-quality architectural or product photography terms. No quotes, no preamble.'
                    },
                    {
                        role: 'user',
                        content: `Context: ${context}\nArticle/Section Heading: ${title}\nContent Snippet: ${excerpt || ''}\n\nProvide a specific English search query for Unsplash (e.g. "cocoa beans plantation", "traditional spices market", "natural cocopeat blocks", "indonesian agriculture harvest"). Ensure the query is relevant to the specific context provided.`
                    }
                ],
                temperature: 0.5,
                max_tokens: 50
            }),
        });

        if (!aiResponse.ok) {
            throw new Error('AI query generation failed');
        }

        const aiData = await aiResponse.json();
        const searchQuery = aiData.choices[0]?.message?.content?.trim().replace(/^"|"$/g, '') || title;

        // Step 2: Fetch the image from Unsplash
        const imageUrl = await fetchUnsplashImage(searchQuery);

        return res.status(200).json({
            success: true,
            image: imageUrl,
            searchQuery: searchQuery
        });

    } catch (error) {
        console.error('Suggest image error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
