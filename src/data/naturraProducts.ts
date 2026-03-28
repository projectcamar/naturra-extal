export interface NaturraProduct {
    id: string
    name: string
    category: string
    badge: string
    image: string
    description: string
    specs: string[]
    hsCode?: string
}

export const NATURRA_PRODUCTS: NaturraProduct[] = [
    // === COCOA PRODUCTS ===
    {
        id: 'cocoa-powder-pure',
        name: 'Cocoa Powder Pure',
        category: 'cocoa',
        badge: 'HS 1805.00.0',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
        description: 'Premium Indonesian pure cocoa powder with rich chocolate flavor and deep color. Ideal for confectionery, bakery, and beverage applications.',
        specs: ['Pure Cocoa', 'Natural Color', 'Premium Grade'],
        hsCode: '1805.00.0',
    },
    {
        id: 'cocoa-powder-sweetened',
        name: 'Cocoa Powder Sweetened',
        category: 'cocoa',
        badge: 'HS 1806.00.0',
        image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80',
        description: 'Sweetened cocoa powder blend ready for hot chocolate, desserts, and food manufacturing. Balanced sweetness with authentic cocoa taste.',
        specs: ['Sweetened', 'Ready-Mix', 'Export Grade'],
        hsCode: '1806.00.0',
    },
    {
        id: 'cocoa-beans-raw',
        name: 'Cocoa Beans (Raw)',
        category: 'cocoa',
        badge: 'Raw Beans',
        image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80',
        description: 'Hand-selected raw cocoa beans from Sulawesi and Sumatra. Sun-dried and fermented for optimal flavor development.',
        specs: ['Fermented', 'Sun-Dried', 'Sulawesi Origin'],
    },
    {
        id: 'cocoa-butter',
        name: 'Cocoa Butter',
        category: 'cocoa',
        badge: 'Premium',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&q=80',
        description: 'High-quality cocoa butter extracted from premium Indonesian cocoa beans. Used in chocolate production, cosmetics, and pharmaceuticals.',
        specs: ['Food Grade', 'Deodorized', 'Natural'],
    },

    // === CLOVES ===
    {
        id: 'cloves-whole',
        name: 'Cengkeh (Whole Cloves)',
        category: 'cloves',
        badge: 'Premium Grade',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
        description: 'Premium hand-picked whole cloves from Maluku and North Sulawesi. Exceptional essential oil content and intense aromatic quality.',
        specs: ['Hand-Picked', 'High Oil Content', 'Maluku Origin'],
    },
    {
        id: 'cloves-stems',
        name: 'Clove Stems',
        category: 'cloves',
        badge: 'Industrial',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
        description: 'Clove stems for essential oil extraction and industrial applications. Cost-effective source of eugenol and other valuable compounds.',
        specs: ['Oil Extraction', 'Bulk Available', 'Industrial Use'],
    },
    {
        id: 'clove-oil',
        name: 'Clove Essential Oil',
        category: 'cloves',
        badge: 'Essential Oil',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
        description: 'Pure clove essential oil with high eugenol content. Used in pharmaceuticals, food flavoring, aromatherapy, and dental products.',
        specs: ['High Eugenol', 'Pharmaceutical Grade', 'Natural'],
    },

    // === COCOPEAT ===
    {
        id: 'cocopeat-block',
        name: 'Cocopeat Block (5kg)',
        category: 'cocopeat',
        badge: 'Eco-Friendly',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
        description: 'Compressed cocopeat blocks for horticultural use. Excellent water retention, natural pH, and eco-friendly growing medium sourced from Surabaya.',
        specs: ['Compressed', '5kg Block', 'Low EC'],
    },
    {
        id: 'cocopeat-loose',
        name: 'Cocopeat Loose',
        category: 'cocopeat',
        badge: 'Bulk',
        image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=600&q=80',
        description: 'Loose cocopeat in bulk packaging for large-scale agricultural applications. Washed and buffered for optimal plant growth support.',
        specs: ['Washed', 'Buffered', 'Bulk Pack'],
    },
]
