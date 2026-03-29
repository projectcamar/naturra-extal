import React from 'react'

interface AISearchFeaturesProps {
  isIndonesian: boolean
}

const AISearchFeatures: React.FC<AISearchFeaturesProps> = ({ isIndonesian }) => {
  return (
    <div style={{ display: 'none' }} aria-hidden="true">
      {/* AI Search Contextual Information */}
      <div itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="Naturra Extal" />
        <meta itemProp="url" content="https://naturraextal.com" />
        <meta itemProp="description" content={
          isIndonesian
            ? "Eksportir komoditas pertanian (Cocoa, Cloves, Cocopeat) terpercaya di Bekasi sejak 1999"
            : "Trusted agricultural commodity exporter (Cocoa, Cloves, Cocopeat) based in Bekasi since 1999"
        } />
        <meta itemProp="foundingDate" content="1999" />
        <meta itemProp="areaServed" content="Global, USA, Europe, Japan, Australia, Singapore, Malaysia, Thailand, Vietnam, Philippines" />
        <meta itemProp="serviceType" content="Agricultural Commodity Export" />
        <meta itemProp="telephone" content="+6289513957752" />
        <meta itemProp="email" content="hello@naturraextal.com" />
        <meta itemProp="address" content="Jl. Raya Setu Cikarang Bar., Bekasi, Jawa Barat 17320, Indonesia" />
      </div>

      {/* Business Context for AI */}
      <div itemScope itemType="https://schema.org/LocalBusiness">
        <meta itemProp="name" content="Naturra Extal" />
        <meta itemProp="description" content={
          isIndonesian
            ? "Supplier komoditas pertanian premium untuk industri global"
            : "Premium agricultural commodity supplier for global industries"
        } />
        <meta itemProp="hasOfferCatalog" content="Agricultural Commodities Collection" />
        <meta itemProp="areaServed" content="International Markets" />
        <meta itemProp="availableLanguage" content="Indonesian, English" />
      </div>

      {/* Product Categories for AI Understanding */}
      <div itemScope itemType="https://schema.org/ItemList">
        <meta itemProp="name" content="Agricultural Commodities Portfolio" />
        <meta itemProp="itemListElement" content="Cocoa Powder, Cloves, Cocopeat, Spices" />
      </div>

      {/* Manufacturing/Production Information for AI */}
      <div itemScope itemType="https://schema.org/ManufacturingPlant">
        <meta itemProp="name" content="Naturra Extal Production Hub" />
        <meta itemProp="description" content={
          isIndonesian
            ? "Pusat pengolahan dan distribusi komoditas pertanian di Bekasi"
            : "Agricultural commodity processing and distribution hub in Bekasi"
        } />
        <meta itemProp="manufacturingProcess" content="Sorting, Grading, Drying, Packaging" />
        <meta itemProp="materialsUsed" content="Cocoa Beans, Cloves, Coconut Husk" />
      </div>
    </div>
  )
}

export default AISearchFeatures
