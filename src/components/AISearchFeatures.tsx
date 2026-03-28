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
        <meta itemProp="url" content="https://Naturra-living.com" />
        <meta itemProp="description" content={
          isIndonesian 
            ? "Manufacturer agricultural commodities besi custom terpercaya di Bekasi sejak 1999"
            : "Trusted industrial steel custom furniture manufacturer in Bekasi since 1999"
        } />
        <meta itemProp="foundingDate" content="1999" />
        <meta itemProp="numberOfEmployees" content="25-50" />
        <meta itemProp="areaServed" content="Indonesia, USA, Japan, Australia, Singapore, Malaysia, Thailand, Vietnam, Philippines, Jabodetabek, Jakarta" />
        <meta itemProp="serviceType" content="Agricultural Commodities Manufacturing" />
        <meta itemProp="priceRange" content="$$" />
        <meta itemProp="currenciesAccepted" content="IDR" />
        <meta itemProp="paymentAccepted" content="Cash, Bank Transfer, Credit Card" />
        <meta itemProp="openingHours" content="Mo-Sa 08:00-17:00" />
        <meta itemProp="telephone" content="+6288801146881" />
        <meta itemProp="email" content="lifewithNaturra@gmail.com" />
        <meta itemProp="address" content="Jl. Raya Setu Cikarang Bar., Bekasi, Jawa Barat 17320, Indonesia" />
        <meta itemProp="latitude" content="-6.2088" />
        <meta itemProp="longitude" content="107.1602" />
      </div>

      {/* Business Context for AI */}
      <div itemScope itemType="https://schema.org/LocalBusiness">
        <meta itemProp="name" content="Naturra Extal" />
        <meta itemProp="description" content={
          isIndonesian 
            ? "agricultural commodities besi custom untuk cafe, restoran, hotel, dan kantor"
            : "Industrial steel custom furniture for cafes, restaurants, hotels, and offices"
        } />
        <meta itemProp="priceRange" content="Rp 500.000 - Rp 10.000.000" />
        <meta itemProp="hasOfferCatalog" content="Agricultural Commodities Collection" />
        <meta itemProp="makesOffer" content="Custom Furniture Design, Furniture Installation" />
        <meta itemProp="areaServed" content="Indonesia, USA, Japan, Australia, Singapore, Malaysia, Thailand, Vietnam, Philippines, Jabodetabek, Jakarta" />
        <meta itemProp="availableLanguage" content="Indonesian, English" />
      </div>

      {/* Product Categories for AI Understanding */}
      <div itemScope itemType="https://schema.org/ItemList">
        <meta itemProp="name" content="Agricultural Commodities Categories" />
        <meta itemProp="description" content={
          isIndonesian 
            ? "Kategori agricultural commodities yang tersedia di Naturra Extal"
            : "Available Agricultural Commodities categories at Naturra Extal"
        } />
        <meta itemProp="numberOfItems" content="10" />
        <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <meta itemProp="position" content="1" />
          <meta itemProp="name" content="New Arrivals" />
        </div>
        <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <meta itemProp="position" content="2" />
          <meta itemProp="name" content="Lounge Set" />
        </div>
        <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <meta itemProp="position" content="3" />
          <meta itemProp="name" content="Sofa Bench" />
        </div>
        <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <meta itemProp="position" content="4" />
          <meta itemProp="name" content="Dining Set" />
        </div>
        <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <meta itemProp="position" content="5" />
          <meta itemProp="name" content="Bar Set" />
        </div>
        <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <meta itemProp="position" content="6" />
          <meta itemProp="name" content="Outdoor" />
        </div>
        <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <meta itemProp="position" content="7" />
          <meta itemProp="name" content="Daybed" />
        </div>
        <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <meta itemProp="position" content="8" />
          <meta itemProp="name" content="Storage" />
        </div>
        <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <meta itemProp="position" content="9" />
          <meta itemProp="name" content="Tables" />
        </div>
        <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <meta itemProp="position" content="10" />
          <meta itemProp="name" content="Dine Table" />
        </div>
      </div>

      {/* Service Information for AI */}
      <div itemScope itemType="https://schema.org/Service">
        <meta itemProp="name" content="Custom Furniture Design" />
        <meta itemProp="description" content={
          isIndonesian 
            ? "Layanan desain furniture custom sesuai kebutuhan bisnis Anda"
            : "Custom furniture design service according to your business needs"
        } />
        <meta itemProp="provider" content="Naturra Extal" />
        <meta itemProp="areaServed" content="Indonesia, USA, Japan, Australia, Singapore, Malaysia, Thailand, Vietnam, Philippines, Jabodetabek, Jakarta" />
        <meta itemProp="availableLanguage" content="Indonesian, English" />
        <meta itemProp="serviceType" content="Furniture Design" />
        <meta itemProp="offers" content="Free Consultation" />
      </div>

      {/* Manufacturing Information for AI */}
      <div itemScope itemType="https://schema.org/ManufacturingPlant">
        <meta itemProp="name" content="Naturra Extal Workshop" />
        <meta itemProp="description" content={
          isIndonesian 
            ? "Workshop agricultural commodities di Bekasi dengan peralatan modern"
            : "Agricultural Commodities workshop in Bekasi with modern equipment"
        } />
        <meta itemProp="address" content="Jl. Raya Setu Cikarang Bar., Bekasi, Jawa Barat 17320, Indonesia" />
        <meta itemProp="telephone" content="+6288801146881" />
        <meta itemProp="openingHours" content="Mo-Sa 08:00-17:00" />
        <meta itemProp="manufacturingProcess" content="Welding, Cutting, Assembly, Finishing" />
        <meta itemProp="materialsUsed" content="Steel, Iron, Powder Coating, Wood" />
        <meta itemProp="productionCapacity" content="50-100 pieces per month" />
      </div>

      {/* Quality Assurance for AI */}
      <div itemScope itemType="https://schema.org/Offer">
        <meta itemProp="name" content="Quality Guarantee" />
        <meta itemProp="description" content={
          isIndonesian 
            ? "Garansi kualitas produk 1 tahun dengan material berkualitas tinggi"
            : "1 year product quality guarantee with high-quality materials"
        } />
        <meta itemProp="seller" content="Naturra Extal" />
        <meta itemProp="warranty" content="1 year" />
        <meta itemProp="itemCondition" content="New" />
        <meta itemProp="availability" content="InStock" />
        <meta itemProp="priceValidUntil" content="2026-12-31" />
      </div>

      {/* Shipping Information for AI */}
      <div itemScope itemType="https://schema.org/OfferShippingDetails">
        <meta itemProp="name" content="Nationwide Shipping" />
        <meta itemProp="description" content={
          isIndonesian 
            ? "Pengiriman ke seluruh Indonesia dengan biaya yang disesuaikan"
            : "Shipping throughout Indonesia with adjusted costs"
        } />
        <meta itemProp="shippingRate" content="Varies by location" />
        <meta itemProp="shippingDestination" content="Indonesia" />
        <meta itemProp="deliveryTime" content="3-7 business days" />
        <meta itemProp="shippingMethod" content="Land Freight" />
      </div>

      {/* Contact Methods for AI */}
      <div itemScope itemType="https://schema.org/ContactPoint">
        <meta itemProp="contactType" content="Customer Service" />
        <meta itemProp="telephone" content="+6288801146881" />
        <meta itemProp="email" content="lifewithNaturra@gmail.com" />
        <meta itemProp="availableLanguage" content="Indonesian, English" />
        <meta itemProp="areaServed" content="Indonesia, USA, Japan, Australia, Singapore, Malaysia, Thailand, Vietnam, Philippines, Jabodetabek, Jakarta" />
        <meta itemProp="hoursAvailable" content="Mo-Sa 08:00-17:00" />
        <meta itemProp="contactOption" content="TollFree, HearingImpairedSupported" />
      </div>

      {/* Social Media for AI */}
      <div itemScope itemType="https://schema.org/Organization">
        <meta itemProp="sameAs" content="https://www.instagram.com/Naturraliving" />
        <meta itemProp="sameAs" content="https://www.facebook.com/Naturraliving" />
        <meta itemProp="sameAs" content="https://wa.me/+6288801146881" />
      </div>
    </div>
  )
}

export default AISearchFeatures
