// Product image URLs (Unsplash – commodity/agricultural placeholders)
const cocoaPowderImage = 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80' // Cocoa beans/powder
const clovesImage = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80' // Spices
const cocopeatImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80' // Soil/Organic
const spicesImage = 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80' // Garden/Spices
const cassavaImage = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80' // Agriculture
const vanillaImage = 'https://images.unsplash.com/photo-1582218155981-0675ea108dca?w=600&q=80' // Vanilla/Spices
const pepperImage = 'https://images.unsplash.com/photo-1621217646581-bcbe05ff19ee?w=600&q=80' // Black Pepper

export interface ProductVariant {
  name: string
  price: string
  dimensions?: string
  specification?: string
}

export interface Product {
  id: number
  slug: string
  name: string
  categories: string[]
  price: string
  image: string
  video?: string
  variants?: ProductVariant[]
}

export const ALL_PRODUCTS: Product[] = [
  // Cocoa Powder
  {
    id: 1,
    slug: 'natural-cocoa-powder-v10',
    name: 'Natural Cocoa Powder V10',
    categories: ['New Arrivals', 'Cocoa Powder', 'Export Quality'],
    price: 'Contact for Quote',
    image: cocoaPowderImage,
    variants: [
      { name: 'Bulk 25kg Bag', price: 'Negotiable', specification: 'Fat 10-12%, pH 5.0-6.0' },
      { name: 'Retail 1kg Pack', price: 'Negotiable', specification: 'Premium Grade' }
    ]
  },
  {
    id: 2,
    slug: 'alkalized-cocoa-powder-dark',
    name: 'Alkalized Cocoa Powder Dark',
    categories: ['Cocoa Powder', 'Export Quality'],
    price: 'Contact for Quote',
    image: cocoaPowderImage,
    variants: [
      { name: 'Bulk 25kg Bag', price: 'Negotiable', specification: 'Fat 10-12%, pH 7.0-8.0' }
    ]
  },

  // Indonesian Cloves
  {
    id: 3,
    slug: 'premium-indonesian-cloves-lal-pari',
    name: 'Premium Indonesian Cloves (Lal Pari)',
    categories: ['New Arrivals', 'Indonesian Cloves', 'Spices & Herbs'],
    price: 'Contact for Quote',
    image: clovesImage,
    variants: [
      { name: 'Grade A (Lal Pari)', price: 'Market Price', specification: 'Moisture <12%, Eugenol >17%' },
      { name: 'Standard Grade', price: 'Market Price', specification: 'Moisture <13%' }
    ]
  },

  // Cocopeat Media
  {
    id: 4,
    slug: 'cocopeat-block-5kg-low-ec',
    name: 'Cocopeat Block 5kg (Low EC)',
    categories: ['Cocopeat Media', 'Sustainable Growing'],
    price: 'Contact for Quote',
    image: cocopeatImage,
    variants: [
      { name: 'Low EC (< 0.5 ms/cm)', price: 'Bulk pricing', specification: 'Washed' },
      { name: 'High EC (> 1.0 ms/cm)', price: 'Bulk pricing', specification: 'Unwashed' }
    ]
  },
  {
    id: 5,
    slug: 'cocopeat-briquettes-650g',
    name: 'Cocopeat Briquettes 650g',
    categories: ['Cocopeat Media', 'Sustainable Growing'],
    price: 'Contact for Quote',
    image: cocopeatImage
  },

  // Spices & Herbs
  {
    id: 6,
    slug: 'vanilla-planifolia-beans-gourmet',
    name: 'Vanilla Planifolia Beans Gourmet',
    categories: ['Spices & Herbs', 'Export Quality'],
    price: 'Contact for Quote',
    image: vanillaImage,
    variants: [
      { name: 'Grade A (16cm+)', price: 'Market Price', specification: 'Moisture 30-35%' },
      { name: 'Grade B (13-15cm)', price: 'Market Price', specification: 'Moisture 20-25%' }
    ]
  },
  {
    id: 7,
    slug: 'lampung-black-pepper-b1',
    name: 'Lampung Black Pepper B1',
    categories: ['Spices & Herbs', 'Export Quality'],
    price: 'Contact for Quote',
    image: pepperImage,
    variants: [
      { name: 'Whole Black Pepper', price: 'Market Price', specification: 'Density 550g/l' }
    ]
  },
  {
    id: 8,
    slug: 'muntok-white-pepper-premium',
    name: 'Muntok White Pepper Premium',
    categories: ['Spices & Herbs', 'Export Quality'],
    price: 'Contact for Quote',
    image: pepperImage,
    variants: [
      { name: 'Grade A', price: 'Market Price', specification: 'Moisture <13.5%' }
    ]
  },

  // Essential Oils
  {
    id: 9,
    slug: 'clove-leaf-oil-eugenol-80',
    name: 'Clove Leaf Oil (Eugenol 80%)',
    categories: ['Essential Oils', 'Export Quality'],
    price: 'Contact for Quote',
    image: spicesImage
  },
  {
    id: 10,
    slug: 'patchouli-oil-sumatra',
    name: 'Patchouli Oil (Sumatra)',
    categories: ['Essential Oils', 'Export Quality'],
    price: 'Contact for Quote',
    image: spicesImage
  },

  // Export Quality Others
  {
    id: 11,
    slug: 'modified-cassava-flour-mocaf',
    name: 'Modified Cassava Flour (MOCAF)',
    categories: ['Export Quality'],
    price: 'Contact for Quote',
    image: cassavaImage,
    variants: [
      { name: 'Food Grade', price: 'Bulk pricing', specification: 'Gluten Free' }
    ]
  },
  {
    id: 12,
    slug: 'organic-coconut-sugar',
    name: 'Organic Coconut Sugar (Granule)',
    categories: ['Export Quality', 'Sustainable Growing'],
    price: 'Contact for Quote',
    image: cocopeatImage,
    variants: [
      { name: 'Mesh 16', price: 'Negotiable', specification: 'Organic Certified' }
    ]
  }
]
