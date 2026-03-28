// Video imports
import kabinetDapurVideo from '../assets/Kabinet-Industrial-Dapur.mp4'
import kabinetLemariVideo from '../assets/kabinet-lemari-industrial.mp4'
import kursiBarStallVideo from '../assets/kursi-bar-stall-chair.mp4'
import kursiBarstoolVideo from '../assets/kursi-barstool.mp4'
import mejaMakanVideo from '../assets/meja-makan-industrial.mp4'
import hollowlineDisplayRackVideo from '../assets/hollowline-display-rack.mp4'
import benchCornerLoungeVideo from '../assets/Bench-corner-kursi-sudut-kursi-santai.mp4'
import industrialDaybedVideo from '../assets/industrial-daybed.mp4'
import loungeSetCoffeeTableVideo from '../assets/longue-set-coffee-table.mp4'
import industrialHangingShelfVideo from '../assets/rak-gantung-industrial.mp4'
import rakDisplayPartisiVideo from '../assets/rak-display-partisi-industrial-besi.mp4'

// Product image URLs (Unsplash – commodity/agricultural placeholders)
const frameLoftBookshelfImage = 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80'
const balconyBarTableImage = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80'
const loungeSetCoffeeTableImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80'
const benchCornerImage = 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80'
const daybedBoneOnlyImage = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80'
const mejaMakanImage = 'https://images.unsplash.com/photo-1582218155981-0675ea108dca?w=600&q=80'
const mejaMakanSetImage = 'https://images.unsplash.com/photo-1621217646581-bcbe05ff19ee?w=600&q=80'
const barChairImage = 'https://images.unsplash.com/photo-1548848222-777651a084eb?w=600&q=80'
const kursiBarStallImage = 'https://images.unsplash.com/photo-1499558913904-206263eb210b?w=600&q=80'
const steelframeOutdoorBarSetImage = 'https://images.unsplash.com/photo-1596541223130-5d5644a5a6fc?w=600&q=80'
const kabinetDapurImage = 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80'
const kabinetLemariImage = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80'
const hollowlineDisplayRackImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80'
const rakDisplayPartisiImage = 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80'
const rakGantungIndustrialImage = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80'
const gantunganBajuImage = 'https://images.unsplash.com/photo-1582218155981-0675ea108dca?w=600&q=80'
const mejaKerjaImage = 'https://images.unsplash.com/photo-1621217646581-bcbe05ff19ee?w=600&q=80'

export interface ProductVariant {
  name: string
  price: string
  dimensions?: string
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
  // New Arrivals
  {
    id: 1,
    slug: 'frame-loft-bookshelf',
    name: 'Frame Loft Bookshelf',
    categories: ['New Arrivals', 'Storage'],
    price: 'Rp3.500.000',
    image: frameLoftBookshelfImage
  },
  {
    id: 2,
    slug: 'balcony-bar-table',
    name: 'Balcony Bar Table',
    categories: ['New Arrivals', 'Bar Set', 'Outdoor'],
    price: 'Rp350.000',
    image: balconyBarTableImage
  },

  // Lounge Set
  {
    id: 3,
    slug: 'lounge-set-coffee-table',
    name: 'Lounge Set Coffee Table',
    categories: ['Lounge Set', 'Tables'],
    price: 'Rp2.000.000',
    image: loungeSetCoffeeTableImage,
    video: loungeSetCoffeeTableVideo
  },
  {
    id: 17,
    slug: 'bench-corner-lounge',
    name: 'Bench Corner Lounge',
    categories: ['Lounge Set', 'Sofa Bench'],
    price: 'Rp3.500.000',
    image: benchCornerImage,
    video: benchCornerLoungeVideo,
    variants: [
      { name: '200x50x50', price: 'Rp3.500.000', dimensions: '200x50x50' },
      { name: '150x50x50', price: 'Rp2.800.000', dimensions: '150x50x50' }
    ]
  },

  // Daybed
  {
    id: 16,
    slug: 'industrial-daybed-frame',
    name: 'Industrial Daybed Frame',
    categories: ['Daybed'],
    price: 'Rp3.200.000',
    image: daybedBoneOnlyImage,
    video: industrialDaybedVideo
  },

  // Dining Set
  {
    id: 4,
    slug: 'bandung-pipe-dining-table',
    name: 'Bandung Pipe Dining Table',
    categories: ['Dining Set', 'Dine Table'],
    price: 'Rp2.800.000',
    image: mejaMakanImage,
    variants: [
      { name: 'Meja Saja', price: 'Rp2.800.000', dimensions: '120x60x75' },
      { name: 'Meja + 2 Kursi', price: 'Rp3.600.000', dimensions: '120x60x75' },
      { name: 'Meja 150x80x120', price: 'Rp3.800.000', dimensions: '150x80x120' }
    ]
  },
  {
    id: 5,
    slug: 'dining-set-with-2-chairs',
    name: 'Dining Set with 2 Chairs',
    categories: ['Dining Set', 'Dine Table'],
    price: 'Rp4.000.000',
    image: mejaMakanSetImage,
    video: mejaMakanVideo
  },

  // Bar Set
  {
    id: 6,
    slug: 'beam-industrial-bar-chair',
    name: 'Beam Industrial Bar Chair',
    categories: ['Bar Set'],
    price: 'Rp450.000',
    image: barChairImage,
    video: kursiBarstoolVideo
  },
  {
    id: 7,
    slug: 'bar-stall-chair',
    name: 'Bar Stall Chair',
    categories: ['Bar Set'],
    price: 'Rp450.000',
    image: kursiBarStallImage,
    video: kursiBarStallVideo
  },
  {
    id: 8,
    slug: 'steelframe-outdoor-bar-set',
    name: 'Steelframe Outdoor Bar Set',
    categories: ['Bar Set', 'Outdoor'],
    price: 'Rp8.150.000',
    image: steelframeOutdoorBarSetImage
  },

  // Storage
  {
    id: 9,
    slug: 'industrial-kitchen-cabinet',
    name: 'Industrial Kitchen Cabinet',
    categories: ['Storage'],
    price: 'Rp6.500.000',
    image: kabinetDapurImage,
    video: kabinetDapurVideo,
    variants: [
      { name: '280x40x110', price: 'Rp6.500.000', dimensions: '280x40x110' },
      { name: '200x40x110', price: 'Rp5.800.000', dimensions: '200x40x110' },
      { name: '150x40x90', price: 'Rp4.500.000', dimensions: '150x40x90' }
    ]
  },
  {
    id: 10,
    slug: 'kabinet-lemari-industrial',
    name: 'Kabinet Lemari Industrial',
    categories: ['Storage'],
    price: 'Rp4.500.000',
    image: kabinetLemariImage,
    video: kabinetLemariVideo
  },
  {
    id: 11,
    slug: 'hollowline-display-rack',
    name: 'Hollowline Display Rack',
    categories: ['Storage'],
    price: 'Rp3.700.000',
    image: hollowlineDisplayRackImage,
    video: hollowlineDisplayRackVideo
  },
  {
    id: 12,
    slug: 'ladder-frame-display-stand',
    name: 'Ladder Frame Display Stand',
    categories: ['Storage'],
    price: 'Rp3.700.000',
    image: rakDisplayPartisiImage,
    video: rakDisplayPartisiVideo
  },
  {
    id: 13,
    slug: 'industrial-hanging-shelf',
    name: 'Industrial Hanging Shelf',
    categories: ['Storage'],
    price: 'Rp1.800.000',
    image: rakGantungIndustrialImage,
    video: industrialHangingShelfVideo,
    variants: [
      { name: '180x30x90', price: 'Rp1.800.000', dimensions: '180x30x90' },
      { name: '120x30x90', price: 'Rp1.200.000', dimensions: '120x30x90' },
      { name: '120x20x60', price: 'Rp850.000', dimensions: '120x20x60' },
      { name: '120x20x90', price: 'Rp950.000', dimensions: '120x20x90' },
      { name: '120x30x60', price: 'Rp950.000', dimensions: '120x30x60' },
      { name: '150x20x60', price: 'Rp950.000', dimensions: '150x20x60' },
      { name: '150x20x90', price: 'Rp1.050.000', dimensions: '150x20x90' },
      { name: '180x20x60', price: 'Rp1.300.000', dimensions: '180x20x60' },
      { name: '180x20x90', price: 'Rp1.600.000', dimensions: '180x20x90' },
      { name: '180x30x60', price: 'Rp1.600.000', dimensions: '180x30x60' }
    ]
  },
  {
    id: 14,
    slug: 'industrial-coat-rack',
    name: 'Industrial Coat Rack',
    categories: ['Storage'],
    price: 'Rp2.500.000',
    image: gantunganBajuImage
  },

  // Tables
  {
    id: 15,
    slug: 'meja-kerja-industrial',
    name: 'Meja Kerja Industrial',
    categories: ['Tables'],
    price: 'Rp2.800.000',
    image: mejaKerjaImage,
    variants: [
      { name: '120x60x90', price: 'Rp2.800.000', dimensions: '120x60x90' },
      { name: '140x60x90', price: 'Rp3.200.000', dimensions: '140x60x90' }
    ]
  },
]
