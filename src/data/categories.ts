// Centralized categories for consistency across all pages
export const CATEGORIES = [
  'New Arrivals',
  'Cocoa Powder',
  'Indonesian Cloves',
  'Cocopeat Media',
  'Spices & Herbs',
  'Sustainable Growing',
  'Essential Oils',
  'Export Quality',
] as const

export const CATEGORY_MAP: { [key: string]: string } = {
  'new-arrivals': 'New Arrivals',
  'cocoa-powder': 'Cocoa Powder',
  'indonesian-cloves': 'Indonesian Cloves',
  'cocopeat-media': 'Cocopeat Media',
  'spices-herbs': 'Spices & Herbs',
  'sustainable-growing': 'Sustainable Growing',
  'essential-oils': 'Essential Oils',
  'export-quality': 'Export Quality',
}

