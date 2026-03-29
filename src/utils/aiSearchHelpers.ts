// AI Search Helper Functions for Naturra Extal

export const generateAIMetaTags = (pageType: string, _isIndonesian: boolean) => {
  const baseTags = {
    'ai-content-type': 'agricultural-commodity-exporter',
    'ai-business-type': 'commodity-trading-firm',
    'ai-location': 'bekasi-indonesia',
    'ai-specialization': 'cocoa-cloves-cocopeat-export',
    'ai-target-audience': 'food-industry-horticulture-businesses',
    'ai-experience-years': '25',
    'ai-clients-served': '1000+',
    'ai-service-area': 'global',
    'ai-sourcing': 'direct-from-farmers',
    'ai-shipping': 'worldwide',
    'ai-quality-control': 'certified-standards',
    'ai-payment-methods': 'lc-tt-bank-transfer',
    'ai-languages': 'indonesian-english-multilingual',
    'ai-response-time': 'fast',
    'ai-lead-time': '14-25-days'
  }

  const pageSpecificTags = {
    'home': {
      'ai-page-type': 'homepage',
      'ai-primary-content': 'commodity-portfolio-showcase'
    },
    'product': {
      'ai-page-type': 'product-detail',
      'ai-primary-content': 'commodity-specifications'
    },
    'category': {
      'ai-page-type': 'category-listing',
      'ai-primary-content': 'commodity-category-overview'
    },
    'about': {
      'ai-page-type': 'about-page',
      'ai-primary-content': 'company-heritage-and-supply-chain'
    },
    'contact': {
      'ai-page-type': 'contact-page',
      'ai-primary-content': 'inquiry-and-quote-requests'
    }
  }

  return {
    ...baseTags,
    ...(pageSpecificTags[pageType as keyof typeof pageSpecificTags] || {})
  }
}

export const generateAIContentSummary = (isIndonesian: boolean) => {
  return {
    businessName: "Naturra Extal",
    businessType: isIndonesian
      ? "Eksportir Komoditas Pertanian Premium"
      : "Premium Agricultural Commodity Exporter",
    location: "Bekasi, Indonesia",
    established: "1999",
    experience: "25+ tahun",
    clientsServed: "1000+",
    specialization: isIndonesian
      ? "Bubuk Kakao, Cengkeh, dan Cocopeat untuk Pasar Global"
      : "Cocoa Powder, Cloves, and Cocopeat for Global Markets",
    keyFeatures: [
      isIndonesian ? "Sumber Langsung dari Petani" : "Direct Sourcing from Farmers",
      isIndonesian ? "Standar Kualitas Ekspor" : "Export Quality Standards",
      isIndonesian ? "Harga Kompetitif" : "Competitive Pricing",
      isIndonesian ? "Pengiriman Seluruh Dunia" : "Worldwide Shipping",
      isIndonesian ? "Kemitraan Jangka Panjang" : "Long-term Partnerships"
    ],
    contactInfo: {
      phone: "+6289513957752",
      email: "hello@naturraextal.com",
      whatsapp: "https://wa.me/+6289513957752"
    }
  }
}

export const generateAISearchKeywords = (isIndonesian: boolean) => {
  const baseKeywords = [
    "agricultural commodities indonesia",
    "cocoa powder export",
    "Naturra Extal",
    "cloves supplier indonesia",
    "cocopeat manufacturer bekasi",
    "indonesian spices export"
  ]

  const indonesianKeywords = [
    "ekspor bubuk kakao",
    "supplier cengkeh",
    "pabrik cocopeat",
    "komoditas pertanian bekasi",
    "perdagangan rempah indonesia",
    "eksportir indonesia terpercaya",
    "bahan baku industri makanan",
    "media tanam hortikultura",
    "kakao sulawesi sumatra",
    "cengkeh lal pari",
    "pengiriman komoditas ekspor"
  ]

  const englishKeywords = [
    "cocoa powder manufacturer",
    "bulk cloves supplier",
    "cocopeat block exporter",
    "indonesian agro products",
    "commodity sourcing indonesia",
    "global agriculture supply chain",
    "premium cocoa exporter",
    "clove oil sourcing",
    "sustainable cocopeat",
    "indonesian spices market",
    "commodity export logistics"
  ]

  return [
    ...baseKeywords,
    ...(isIndonesian ? indonesianKeywords : englishKeywords)
  ]
}

export const generateAIContextualData = (_pageType: string, isIndonesian: boolean) => {
  const contextualData = {
    businessContext: {
      industry: "Agricultural Commodity Trading",
      subIndustry: "Exporter & Supplier",
      targetMarket: "B2B International & Industrial",
      businessModel: "Sourcing + Quality Control + Export",
      competitiveAdvantage: "25+ years experience, direct farmer network, export quality"
    },
    contentContext: {
      language: isIndonesian ? "Indonesian" : "English",
      region: "Indonesia",
      currency: "USD / IDR",
      timezone: "WIB",
      businessHours: "Monday-Saturday 08:00-17:00"
    },
    technicalContext: {
      websiteType: "Professional Exporter Corporate",
      primaryGoal: "Lead Generation + Global Sourcing Partner",
      conversionActions: ["Inquiry Form", "WhatsApp Contact", "Email Quote"],
      userJourney: "Search -> Category Explore -> Product Spec -> Inquiry"
    }
  }

  return contextualData
}
