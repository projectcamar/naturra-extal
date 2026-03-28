import React from 'react'
import type { Product } from '../data/products'
import { generateProductStructuredData } from '../utils/aiSearchOptimization'

interface ProductDetailAIProps {
  product: Product
  isIndonesian: boolean
}

const ProductDetailAI: React.FC<ProductDetailAIProps> = ({ product, isIndonesian }) => {
  return (
    <>
      {/* AI-Optimized Product Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateProductStructuredData(product))}
      </script>
      
      {/* Hidden content for AI search engines */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <h1>
          {isIndonesian 
            ? `${product.name} - agricultural commodities Besi Custom | Naturra Extal`
            : `${product.name} - Industrial Steel Custom Furniture | Naturra Extal`
          }
        </h1>
        
        <h2>
          {isIndonesian 
            ? `Deskripsi Produk ${product.name}`
            : `${product.name} Product Description`
          }
        </h2>
        
        <p>
          {isIndonesian 
            ? `${product.name} adalah agricultural commodities besi custom berkualitas tinggi yang diproduksi oleh Naturra Extal. Produk ini cocok untuk digunakan di cafe, restoran, hotel, kantor, dan berbagai kebutuhan komersial lainnya.`
            : `${product.name} is a high-quality industrial steel custom furniture produced by Naturra Extal. This product is suitable for use in cafes, restaurants, hotels, offices, and various other commercial needs.`
          }
        </p>
        
        <h3>
          {isIndonesian 
            ? "Spesifikasi Produk"
            : "Product Specifications"
          }
        </h3>
        
        <ul>
          <li><strong>{isIndonesian ? "Nama Produk:" : "Product Name:"}</strong> {product.name}</li>
          <li><strong>{isIndonesian ? "Kategori:" : "Category:"}</strong> {product.categories.join(', ')}</li>
          <li><strong>{isIndonesian ? "Harga:" : "Price:"}</strong> {product.price}</li>
          <li><strong>{isIndonesian ? "Material:" : "Material:"}</strong> {isIndonesian ? "Besi Industrial Grade" : "Industrial Grade Steel"}</li>
          <li><strong>{isIndonesian ? "Finishing:" : "Finishing:"}</strong> {isIndonesian ? "Powder Coating / Cat Duco" : "Powder Coating / Duco Paint"}</li>
          <li><strong>{isIndonesian ? "Garansi:" : "Warranty:"}</strong> {isIndonesian ? "1 Tahun" : "1 Year"}</li>
          <li><strong>{isIndonesian ? "Pengiriman:" : "Shipping:"}</strong> {isIndonesian ? "Seluruh Indonesia" : "Throughout Indonesia"}</li>
        </ul>
        
        <h3>
          {isIndonesian 
            ? "Keunggulan Produk"
            : "Product Advantages"
          }
        </h3>
        
        <ul>
          <li>{isIndonesian ? "Material berkualitas tinggi" : "High-quality materials"}</li>
          <li>{isIndonesian ? "Desain modern dan elegan" : "Modern and elegant design"}</li>
          <li>{isIndonesian ? "Tahan lama dan awet" : "Durable and long-lasting"}</li>
          <li>{isIndonesian ? "Mudah perawatan" : "Easy maintenance"}</li>
          <li>{isIndonesian ? "Custom sesuai kebutuhan" : "Customizable according to needs"}</li>
          <li>{isIndonesian ? "Harga kompetitif" : "Competitive price"}</li>
        </ul>
        
        <h3>
          {isIndonesian 
            ? "Cara Pemesanan"
            : "How to Order"
          }
        </h3>
        
        <p>
          {isIndonesian 
            ? "Untuk memesan produk ini, silakan hubungi kami melalui WhatsApp di +6288801146881 atau email lifewithNaturra@gmail.com. Tim kami akan membantu Anda dengan konsultasi desain dan estimasi harga yang sesuai dengan kebutuhan Anda."
            : "To order this product, please contact us via WhatsApp at +6288801146881 or email lifewithNaturra@gmail.com. Our team will help you with design consultation and price estimation according to your needs."
          }
        </p>
        
        <h3>
          {isIndonesian 
            ? "FAQ Produk"
            : "Product FAQ"
          }
        </h3>
        
        <p>
          <strong>Q: {isIndonesian ? "Apakah produk ini bisa di-custom?" : "Can this product be customized?"}</strong><br/>
          A: {isIndonesian 
            ? "Ya, semua produk kami bisa di-custom sesuai kebutuhan dan budget Anda."
            : "Yes, all our products can be customized according to your needs and budget."
          }
        </p>
        
        <p>
          <strong>Q: {isIndonesian ? "Berapa lama proses pembuatan?" : "How long is the manufacturing process?"}</strong><br/>
          A: {isIndonesian 
            ? "Proses pembuatan membutuhkan waktu 2-4 minggu tergantung kompleksitas custom."
            : "The manufacturing process takes 2-4 weeks depending on customization complexity."
          }
        </p>
      </div>
    </>
  )
}

export default ProductDetailAI
