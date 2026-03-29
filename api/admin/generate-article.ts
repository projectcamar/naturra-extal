import type { VercelRequest, VercelResponse } from '@vercel/node';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface GenerateArticleRequest {
    prompt: string;
    category?: string;
    model?: string; // Model ID from dropdown
    language?: string; // Requested language
}

interface ArticleContent {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    introduction: string;
    keyPoints?: string[];
    language?: string; // AI confirmed language
    imageSearchQuery: string; // Search query for Unsplash
    image?: string; // Final Unsplash image URL
    sections: Array<{
        heading: string;
        content: string;
        imageSearchQuery?: string; // Only for Section 1
        image?: string; // Only for Section 1
        linkedProductId?: number; // Product ID (1-17) to mention
    }>;
    conclusion: string;
}

const SYSTEM_PROMPT = `You are an expert content writer for Naturra Extal, a premium Indonesian commodity trading company specializing in high-quality Cocoa Powder, Spices (Cloves, Pepper, Vanilla), and sustainable Cocopeat media for the global market.
 
Your task is to generate high-quality, SEO-optimized blog articles about agricultural commodities, international trade, sustainable farming, and Indonesian export products.

IMPORTANT: You MUST respond with ONLY a valid JSON object, no additional text before or after. The JSON must follow this exact structure:

{
  "title": "Article title (max 60 characters, SEO-friendly)",
  "slug": "url-friendly-slug-lowercase-with-hyphens",
  "excerpt": "Brief summary (max 160 characters for meta description)",
  "category": "One of: Cocoa Insights, Spice Trade, Eco-Media, Sustainable Agriculture, Export Guide, Quality Control, Market Trends, Tips and Trick",
  "imageSearchQuery": "A relevant English keyword for Unsplash image search (main cover)",
  "introduction": "Engaging opening paragraph (2-3 sentences)",
  "keyPoints": [
    "Key takeaway 1",
    "Key takeaway 2",
    "Key takeaway 3 (max 5 points)"
  ],
  "language": "Language code (id, en, ar, zh, ja, es, fr, ko)",
  "sections": [
    {
      "heading": "Section 1 heading",
      "content": "Section 1 content",
      "imageSearchQuery": "Specific English search query ONLY for Section 1"
    },
    {
      "heading": "Section 2 heading",
      "content": "Section 2 content"
    },
    {
      "heading": "Section 3 heading",
      "content": "Section 3 content",
      "productId": 12 
    },
    {
      "heading": "Section 4 heading",
      "content": "Section 4 content",
      "productId": 5
    }
  ],
  "conclusion": "Compelling closing paragraph"
}

PRODUCT CATALOG (for 'productId'):
Use these IDs to mention products in sections (especially sections 3, 4, etc. for soft selling):
1: Natural Cocoa Powder V10 (Cocoa Powder - Bulk/Retail)
2: Alkalized Cocoa Powder Dark (Cocoa Powder - Dark/Rich)
3: Premium Indonesian Cloves Lal Pari (Spices - Export Grade A)
4: Cocopeat Block 5kg Low EC (Sustainable Growing Media)
5: Cocopeat Briquettes 650g (Sustainable Growing Media)
6: Vanilla Planifolia Beans Gourmet (Spices - Grade A/B)
7: Lampung Black Pepper B1 (Spices - Whole Black Pepper)
8: Muntok White Pepper Premium (Spices - Grade A White Pepper)
9: Clove Leaf Oil Eugenol 80% (Essential Oils)
10: Patchouli Oil Sumatra (Essential Oils)
11: Modified Cassava Flour MOCAF (Food - Gluten Free)
12: Organic Coconut Sugar Granule (Sustainable Sweetener)

IMAGE LIMITATION:
- ONLY generate 'imageSearchQuery' for the MAIN cover and the FIRST section.
- For the SECOND section, do NOT generate 'imageSearchQuery' or 'productId' (keep it as text only).
- For all other sections (Section 3, 4, etc.), do NOT generate 'imageSearchQuery'. Instead, provide a 'productId' that matches the section's topic.
- If a section discuss about cocoa, pick a cocoa product. If it discuss spices, pick cloves or pepper.

LANGUAGE SUPPORT (CRITICAL):
Naturra Extal serves customers in multiple languages.
Supported Languages:
- id: Indonesian (Bahasa Indonesia)
- en: English
- ar: Arabic
- zh: Chinese
- ja: Japanese
- es: Spanish
- fr: French
- ko: Korean

INSTRUCTION: Write the ENTIRE article in the specific language requested by the user. If no language is specified, use Indonesian (id).
If the user provides a 'language' parameter, YOU MUST USE THAT LANGUAGE regardless of the prompt's language.
Example: If prompt is in Indonesian but language="en", write the article in ENGLISH.
Ensure the "language" field in JSON response matches the code (e.g., "en", "id").

IMAGE SUPPORT:
Choose a very specific English search query for the "imageSearchQuery" field. 
Avoid generic words like "furniture". Use specific terms like "industrial restaurant design", "minimalist office desk", "reclaimed wood dining table".

CONTENT GUIDELINES:
- Use professional yet friendly tone
- Include specific details about Naturra Extal: Global commodity reach, sustainable sourcing, direct farmer partnerships
- Mention target customers: manufacturers, food & beverage industries, agricultural retailers, eco-conscious buyers
- Include practical tips and actionable advice
- Use HTML tags for formatting: <strong>, <em>, <br>
- Create 3-5 sections minimum (you can create more if needed)
- Each section should be substantial (150-300 words)
- Focus on export quality, sustainable production, and Indonesian agricultural excellence
- Include relevant keywords naturally

SECTION VARIETY (adapt to language):
You can create as many sections as needed to cover the topic comprehensively. Common section types:
- "Why [Topic] is Important?" / "Mengapa [Topic] Penting?" / "なぜ[Topic]が重要か？"
- "Practical Guide & Best Practices" / "Panduan Praktis & Best Practices"
- "Comparison & Data" / "Perbandingan & Data"
- "Naturra Extal Solutions" / "Solusi Naturra Extal"
- "FAQ" / "よくある質問"
- "Next Steps" / "Langkah Selanjutnya"

Remember: Output ONLY the JSON object, nothing else.`;

/**
 * Fetch a relevant image from Unsplash
 */
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
        const { prompt, category, model = 'llama-3.3-70b-versatile', language }: GenerateArticleRequest = req.body;

        if (!prompt || prompt.trim().length === 0) {
            return res.status(400).json({ error: 'Prompt is required' });
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

        // Prepare headers
        const headers: Record<string, string> = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        };

        // Add OpenRouter-specific headers
        if (isOpenRouter) {
            headers['HTTP-Referer'] = 'https://naturraextal.com';
            headers['X-Title'] = 'Naturra Extal Blog Generator';
        }

        // Call AI API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                model,
                messages: [
                    {
                        role: 'system',
                        content: SYSTEM_PROMPT
                    },
                    {
                        role: 'user',
                        content: `Generate a blog article about: ${prompt}${category ? `\nPreferred category: ${category}` : ''}${language ? `\nTARGET LANGUAGE: ${language} (MUST USE THIS LANGUAGE)` : ''}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 4000,
                ...(isOpenRouter ? {} : { response_format: { type: 'json_object' } })
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('AI API error:', errorData);
            return res.status(response.status).json({
                error: 'AI generation failed',
                details: errorData
            });
        }

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content;

        if (!aiResponse) {
            return res.status(500).json({ error: 'No response from AI' });
        }

        // Parse AI response
        let articleContent: ArticleContent;
        try {
            articleContent = JSON.parse(aiResponse);
        } catch (parseError) {
            console.error('Failed to parse AI response:', aiResponse);
            return res.status(500).json({
                error: 'Invalid AI response format',
                rawResponse: aiResponse
            });
        }

        // Validate required fields
        if (!articleContent.title || !articleContent.slug || !articleContent.introduction) {
            return res.status(500).json({
                error: 'AI response missing required fields',
                received: articleContent
            });
        }

        // Fetch image from Unsplash if search query is provided for cover
        if (articleContent.imageSearchQuery) {
            const imageUrl = await fetchUnsplashImage(articleContent.imageSearchQuery);
            if (imageUrl) {
                articleContent.image = imageUrl;
            }
        }

        // Fetch images for each section if search query is provided
        if (articleContent.sections && articleContent.sections.length > 0) {
            // ONLY Section 1 gets an image search as per requirement
            const section1 = articleContent.sections[0];
            if (section1 && section1.imageSearchQuery) {
                const sectionImageUrl = await fetchUnsplashImage(section1.imageSearchQuery);
                if (sectionImageUrl) {
                    section1.image = sectionImageUrl;
                    (section1 as any).imageAlt = section1.imageSearchQuery;
                }
            }

            // Ensure other sections don't have images (Section 2 is empty, others use productId)
            for (let i = 1; i < articleContent.sections.length; i++) {
                delete articleContent.sections[i].imageSearchQuery;
                delete articleContent.sections[i].image;
            }
        }

        return res.status(200).json({
            success: true,
            article: articleContent
        });

    } catch (error) {
        console.error('Generate article error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
