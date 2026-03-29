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
    "slug": "future-sustainable-cocoa-indonesia",
    "title": "The Future of Sustainable Cocoa Sourcing in Indonesia",
    "category": "Cocoa Insights",
    "excerpt": "Indonesia is the third-largest cocoa producer. Explore how Naturra Extal is leading the way in sustainable sourcing and quality control.",
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
    "date": "2025-10-15",
    "author": "Moh Rifki",
    "status": "synced"
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
