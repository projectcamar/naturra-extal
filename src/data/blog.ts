export interface BlogPost {
  id: number
  slug: string
  title: string
  category: string
  excerpt: string
  image: string
  date: string
  author?: string
  status?: 'draft' | 'synced'

  // Custom content (optional) - takes priority over AI-generated content
  customContent?: {
    introduction?: string // Rich HTML content
    keyPoints?: string[] // Key takeaways/bullets
    language?: 'id' | 'en' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko' // Explicit content language
    sections?: Array<{
      heading: string
      content: string // Rich HTML content
      image?: string
      imageAlt?: string
      imageSearchQuery?: string
      productId?: number
    }>
    conclusion?: string // Rich HTML content
  }
}

export const BLOG_POSTS: BlogPost[] = [
  {
    "id": 1,
    "slug": "the-future-of-sustainable-cocoa-sourcing-in-indonesia",
    "title": "Sustainable Cocoa Sourcing",
    "category": "Cocoa Insights",
    "excerpt": "Discover the future of sustainable cocoa sourcing in Indonesia",
    "image": "https://images.unsplash.com/photo-1714102367897-4a19259feb75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwY29jb2ElMjBmYXJtZXIlMjBzdXN0YWluYWJsZSUyMGZhcm1pbmd8ZW58MHwwfHx8MTc3NDc1ODU4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    "date": "2025-10-15",
    "author": "Moh Rifki",
    "status": "draft",
    "customContent": {
      "introduction": "As the global demand for high-quality cocoa continues to rise, Indonesia is poised to play a significant role in meeting this demand while promoting sustainable cocoa sourcing practices. With its rich soil and favorable climate, Indonesia is home to some of the world's most renowned cocoa-producing regions. In this article, we will explore the future of sustainable cocoa sourcing in Indonesia and how Naturra Extal is committed to supporting environmentally friendly and socially responsible cocoa production.",
      "keyPoints": [
        "Indonesia's cocoa industry is expected to grow significantly in the next few years",
        "Sustainable cocoa sourcing practices are essential for the long-term viability of the industry",
        "Naturra Extal is committed to supporting environmentally friendly and socially responsible cocoa production"
      ],
      "language": "en",
      "sections": [
        {
          "heading": "The Importance of Sustainable Cocoa Sourcing",
          "content": "Sustainable cocoa sourcing is crucial for the long-term viability of the cocoa industry. Not only does it help to conserve the environment, but it also improves the livelihoods of cocoa farmers and their communities. <strong>Naturra Extal</strong> is dedicated to promoting sustainable cocoa sourcing practices throughout its supply chain, from seed to shelf. By working directly with farmers and providing them with training and support, we are able to ensure that our cocoa is sourced in a responsible and environmentally friendly manner.",
          "imageSearchQuery": "cocoa farm sustainability",
          "image": "https://images.unsplash.com/photo-1653481006616-aab561a77a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxjb2NvYSUyMGZhcm0lMjBzdXN0YWluYWJpbGl0eXxlbnwwfDB8fHwxNzc0NzU4NTg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "imageAlt": "cocoa farm sustainability"
        },
        {
          "heading": "Challenges Facing the Cocoa Industry",
          "content": "Despite the growing demand for sustainable cocoa, the industry still faces several challenges. <em>Deforestation</em>, <em>climate change</em>, and <em>poverty</em> are just a few of the issues that cocoa farmers and communities are struggling with. To address these challenges, Naturra Extal is working with local organizations and stakeholders to develop and implement sustainable cocoa production practices that not only benefit the environment but also improve the livelihoods of cocoa farmers and their communities."
        },
        {
          "heading": "Naturra Extal's Commitment to Sustainable Cocoa",
          "content": "At Naturra Extal, we are committed to sourcing our cocoa from sustainable and responsible sources. We believe that by working together with farmers, communities, and other stakeholders, we can create a more sustainable and equitable cocoa industry. Our <strong>Natural Cocoa Powder V10</strong> (product ID: 1) is a testament to our commitment to sustainability, with its high-quality and rich flavor profile that is sure to meet the demands of even the most discerning manufacturers and food & beverage industries.",
          "productId": 1
        },
        {
          "heading": "The Future of Sustainable Cocoa Sourcing",
          "content": "As the global demand for sustainable cocoa continues to grow, Indonesia is well-positioned to play a significant role in meeting this demand. With its rich soil and favorable climate, Indonesia has the potential to become a leader in sustainable cocoa production. At Naturra Extal, we are committed to supporting the growth and development of the Indonesian cocoa industry, while promoting sustainable and responsible cocoa sourcing practices that benefit both the environment and local communities. Our <strong>Alkalized Cocoa Powder Dark</strong> (product ID: 2) is another example of our commitment to sustainability and quality.",
          "productId": 2
        }
      ],
      "conclusion": "In conclusion, the future of sustainable cocoa sourcing in Indonesia is bright. With the growing demand for sustainable cocoa and the commitment of companies like Naturra Extal to promoting environmentally friendly and socially responsible cocoa production, the Indonesian cocoa industry is poised for significant growth and development. As a leading player in the global cocoa market, Naturra Extal is dedicated to supporting the growth and development of the Indonesian cocoa industry, while promoting sustainable and responsible cocoa sourcing practices that benefit both the environment and local communities."
    }
  },
  {
    "id": 2,
    "slug": "cloves-gold-standard-global-spices",
    "title": "Why Indonesian Cloves (Cengkeh) are the Global Gold Standard",
    "category": "Spice Trade",
    "excerpt": "Discover the unique aromatic profile and high eugenol content that make Indonesian cloves the most sought-after in the world market.",
    "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200",
    "date": "2025-10-14",
    "author": "Moh Rifki",
    "status": "synced"
  },
  {
    "id": 3,
    "slug": "cocopeat-sustainable-horticulture-revolution",
    "title": "How Cocopeat is Revolutionizing Sustainable Horticulture",
    "category": "Eco-Media",
    "excerpt": "Learn how this coconut-derived growing medium is becoming the preferred choice for eco-conscious farmers and landscapers worldwide.",
    "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=1200",
    "date": "2025-10-13",
    "author": "Moh Rifki",
    "status": "synced"
  },
  {
    "id": 4,
    "slug": "exporting-cocoa-powder-quality-standards",
    "title": "Essential Quality Standards for Exporting Premium Cocoa Powder",
    "category": "Quality Control",
    "excerpt": "Navigating HS 1805 and 1806: A comprehensive guide to the technical specifications required for international cocoa powder trade.",
    "image": "https://images.unsplash.com/photo-1613919920110-394ffdc5bfaa?auto=format&fit=crop&q=80&w=1200",
    "date": "2025-10-12",
    "author": "Moh Rifki",
    "status": "synced"
  },
  {
    "id": 5,
    "slug": "bridging-the-gap-indonesian-farmers-global-market",
    "title": "Bridging the Gap: Connecting Indonesian Farmers to Global Markets",
    "category": "Corporate Story",
    "excerpt": "At Naturra Extal, we cut out the middlemen to ensure fair compensation for farmers and the highest quality for our international clients.",
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
    "date": "2025-10-11",
    "author": "Moh Rifki",
    "status": "synced"
  },
  {
    "id": 6,
    "slug": "navigating-commodity-export-logistics-indonesia",
    "title": "Navigating Commodity Export Logistics from Indonesia",
    "category": "Export Guide",
    "excerpt": "From farm gate to container loading, learn the intricacies of shipping agricultural products across continents safely and efficiently.",
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
    "date": "2025-10-10",
    "author": "Moh Rifki",
    "status": "synced"
  },
  {
    "id": 7,
    "slug": "sulawesi-cocoa-rich-heritage",
    "title": "Sulawesi Cocoa: A Rich Heritage of Indonesian Flavor",
    "category": "Cocoa Insights",
    "excerpt": "Explore why the volcanic soil of Sulawesi produces some of the most complex and flavorful cocoa beans available today.",
    "image": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1200",
    "date": "2025-10-09",
    "author": "Moh Rifki",
    "status": "synced"
  },
  {
    "id": 8,
    "slug": "cengkeh-aromatic-excellence",
    "title": "Cengkeh: The Aromatic Excellence of the Spice Islands",
    "category": "Spice Trade",
    "excerpt": "A deep dive into the harvesting and sun-drying process that preserves the intense aroma of Indonesian cloves.",
    "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200",
    "date": "2025-10-08",
    "author": "Moh Rifki",
    "status": "synced"
  },
  {
    "id": 9,
    "slug": "cocopeat-processing-surabaya",
    "title": "Precision Cocopeat Processing: Quality Control in Surabaya",
    "category": "Eco-Media",
    "excerpt": "How our processing facilities in Surabaya ensure optimal EC levels and moisture content for world-class cocopeat blocks.",
    "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=1200",
    "date": "2025-10-07",
    "author": "Moh Rifki",
    "status": "synced"
  },
  {
    "id": 10,
    "slug": "international-trade-trends-2025",
    "title": "International Commodity Trade Trends to Watch in 2025",
    "category": "Market Trends",
    "excerpt": "Stay ahead of the market with our insights into global demand for cocoa, spices, and sustainable agricultural inputs.",
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
    "date": "2025-10-06",
    "author": "Moh Rifki",
    "status": "synced"
  }
];

export const getAllBlogPosts = () => BLOG_POSTS;

export const getPostBySlug = (slug: string) => BLOG_POSTS.find(p => p.slug === slug);

export const getPostsByPage = (page: number, limit: number = 6) => {
  const start = (page - 1) * limit;
  return BLOG_POSTS.slice(start, start + limit);
};

export const getTotalPages = (limit: number = 6) => {
  return Math.ceil(BLOG_POSTS.length / limit);
};
