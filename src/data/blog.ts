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
    "status": "synced",
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
  },
  {
    "id": 11,
    "slug": "exporting-skipjack-tuna-tips",
    "title": "Exporting Skipjack Tuna",
    "category": "Tips and Trick",
    "excerpt": "Maximizing profit in skipjack tuna export with expert tips",
    "image": "https://images.unsplash.com/photo-1647964147585-623a38bfae15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxmcm96ZW4lMjBza2lwamFjayUyMHR1bmExMCUyMG9uJTIwYSUyMHBhbGxldHxlbnwwfDB8fHwxNzc0NzU4NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "date": "2026-03-29 11:30",
    "author": "Angga",
    "status": "synced",
    "customContent": {
      "introduction": "Skipjack tuna is one of the most widely consumed fish species globally, with a significant demand in international markets. As an exporter, understanding the intricacies of the skipjack tuna export process is crucial for maximizing profits. In this article, we will delve into the world of skipjack tuna export, highlighting key considerations and expert tips for a successful export journey.",
      "keyPoints": [
        "Understanding skipjack tuna market trends",
        "Ensuring compliance with export regulations",
        "Implementing effective quality control measures"
      ],
      "language": "en",
      "sections": [
        {
          "heading": "Why Skipjack Tuna Export is Important?",
          "content": "Skipjack tuna is a highly sought-after commodity, with a growing demand in countries such as Japan, the United States, and the European Union. The global skipjack tuna market is projected to continue its upward trend, driven by increasing consumer preference for sustainable and healthy seafood options. As a result, exporters who can capitalize on this trend stand to gain significant profits. <br> At Naturra Extal, we recognize the importance of skipjack tuna export and offer a range of services to support exporters in navigating the complex global market.",
          "imageSearchQuery": "skipjack tuna fishing industry",
          "image": "https://images.unsplash.com/photo-1766998112558-c8632e66cc49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxza2lwamFjayUyMHR1bmElMjBmaXNoaW5nJTIwaW5kdXN0cnl8ZW58MHwwfHx8MTc3NDc1ODY2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
          "imageAlt": "skipjack tuna fishing industry"
        },
        {
          "heading": "Practical Guide to Skipjack Tuna Export",
          "content": "To succeed in the skipjack tuna export market, it is essential to have a thorough understanding of the export process. This includes knowledge of export regulations, quality control measures, and market trends. <br> Here are some practical tips for exporters: <strong>conduct thorough market research</strong>, <em>ensure compliance with export regulations</em>, and <strong>implement effective quality control measures</strong>. By following these tips, exporters can minimize risks and maximize profits in the competitive skipjack tuna export market."
        },
        {
          "heading": "Naturra Extal Solutions for Skipjack Tuna Export",
          "content": "At Naturra Extal, we offer a range of solutions to support skipjack tuna exporters. Our team of experts provides guidance on export regulations, quality control measures, and market trends, ensuring that our clients are well-equipped to navigate the complex global market. We also offer direct partnerships with farmers and manufacturers, providing our clients with access to high-quality skipjack tuna products. Contact us today to learn more about our skipjack tuna export solutions and how we can support your business.",
          "productId": 11
        },
        {
          "heading": "Next Steps for Skipjack Tuna Exporters",
          "content": "If you are interested in exporting skipjack tuna, there are several next steps you can take. <strong>Research the market</strong> and understand the current trends and demand for skipjack tuna. <em>Ensure compliance</em> with export regulations and implement effective quality control measures. Finally, <strong>contact Naturra Extal</strong> to learn more about our skipjack tuna export solutions and how we can support your business.",
          "productId": 4
        }
      ],
      "conclusion": "Exporting skipjack tuna can be a lucrative business, but it requires careful planning and execution. By understanding the intricacies of the skipjack tuna export process and implementing effective quality control measures, exporters can minimize risks and maximize profits. At Naturra Extal, we are committed to supporting skipjack tuna exporters and providing them with the tools and expertise they need to succeed in the global market."
    }
  },
  {
    "id": 12,
    "slug": "strategi-sukses-dalam-bisnis-komoditas",
    "title": "Strategi Sukses",
    "category": "Tips and Trick",
    "excerpt": "Temukan strategi sukses dalam bisnis komoditas dengan Naturra Extal",
    "image": "https://images.unsplash.com/photo-1618022424528-f8a918320658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwZW50cmVwcmVuZXVyJTIwaW4lMjBjb2ZmZWUlMjBzaG9wfGVufDB8MHx8fDE3NzQ3ODk1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "date": "2026-03-29 20:05",
    "author": "Angga",
    "status": "synced",
    "customContent": {
      "introduction": "Dalam dunia bisnis komoditas, strategi yang tepat dapat membuat perbedaan besar antara sukses dan gagal. Naturra Extal, sebagai perusahaan perdagangan komoditas premium di Indonesia, memahami pentingnya strategi yang efektif. Dalam artikel ini, kita akan membahas beberapa strategi sukses yang dapat diterapkan dalam bisnis komoditas.",
      "keyPoints": [
        "Mengenal pasar dan konsumen",
        "Membangun jaringan yang kuat",
        "Mengembangkan produk yang berkualitas"
      ],
      "language": "id",
      "sections": [
        {
          "heading": "Mengenal Pasar dan Konsumen",
          "content": "Mengenal pasar dan konsumen adalah kunci sukses dalam bisnis komoditas. Naturra Extal memiliki pengalaman luas dalam melayani pelanggan dari berbagai industri, termasuk makanan dan minuman, serta pertanian. Dengan memahami kebutuhan dan preferensi konsumen, kita dapat mengembangkan produk yang tepat dan efektif.",
          "imageSearchQuery": "market research and analysis",
          "image": "https://images.unsplash.com/photo-1761735486587-bcac08b15c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxtYXJrZXQlMjByZXNlYXJjaCUyMGFuZCUyMGFuYWx5c2lzfGVufDB8MHx8fDE3NzQ3ODk1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "imageAlt": "market research and analysis"
        },
        {
          "heading": "Membangun Jaringan yang Kuat",
          "content": "Membangun jaringan yang kuat dengan petani, supplier, and pelanggan adalah sangat penting dalam bisnis komoditas. Naturra Extal telah membangun jaringan yang luas and kuat dengan mitra bisnis di seluruh Indonesia, sehingga kita dapat menyediakan produk yang berkualitas dan harga yang kompetitif."
        },
        {
          "heading": "Mengembangkan Produk yang Berkualitas",
          "content": "Mengembangkan produk yang berkualitas adalah prioritas utama dalam bisnis komoditas. Naturra Extal menawarkan berbagai produk komoditas, termasuk <strong>Cocoa Powder</strong>, <strong>Spices</strong>, dan <strong>Cocopeat</strong>, yang diproduksi dengan menggunakan teknologi yang canggih dan proses yang ketat. Dengan demikian, kita dapat memastikan bahwa produk yang kita tawarkan adalah yang terbaik dan paling berkualitas.",
          "productId": 1
        },
        {
          "heading": "Langkah Selanjutnya",
          "content": "Jika Anda ingin sukses dalam bisnis komoditas, maka Anda perlu memahami strategi yang efektif dan menerapkannya dalam bisnis Anda. Dengan memilih Naturra Extal sebagai mitra bisnis, Anda dapat memanfaatkan pengalaman dan keahlian kita dalam bisnis komoditas. <br>Hubungi kami sekarang juga untuk mengetahui lebih lanjut tentang produk dan jasa yang kita tawarkan.",
          "productId": 5
        }
      ],
      "conclusion": "Dalam kesimpulan, strategi sukses dalam bisnis komoditas memerlukan pengertian yang mendalam tentang pasar, konsumen, dan produk. Dengan menerapkan strategi yang efektif dan memilih mitra bisnis yang tepat, Anda dapat meningkatkan kesempatan sukses dalam bisnis komoditas. Naturra Extal siap membantu Anda dalam menerapkan strategi sukses dan mencapai tujuan bisnis Anda."
    }
  },
  {
    "id": 13,
    "slug": "kopi-berkualitas-indonesia",
    "title": "Kopi Berkualitas",
    "category": "Tips and Trick",
    "excerpt": "Tips memilih kopi berkualitas untuk pengalaman rasa terbaik",
    "image": "https://images.unsplash.com/photo-1619615174792-a5edcfeafdfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxrb3BpJTIwYXJhYmlrYSUyMGRpJTIwdGFuYWh8ZW58MHwwfHx8MTc3NDc5MDk1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    "date": "2026-03-29 20:29",
    "author": "Angga",
    "status": "synced",
    "customContent": {
      "introduction": "Kopi adalah salah satu minuman yang paling populer di dunia, dan Indonesia adalah salah satu produsen kopi terbesar. Namun, memilih kopi yang berkualitas tidaklah mudah. Dalam artikel ini, kita akan membahas beberapa tips untuk memilih kopi yang berkualitas dan menikmati pengalaman rasa terbaik.",
      "keyPoints": [
        "Pilih kopi arabika untuk rasa yang lebih kompleks",
        "Perhatikan asal usul kopi untuk mengetahui kualitasnya",
        "Simpan kopi dengan benar untuk menjaga kesegarannya"
      ],
      "language": "id",
      "sections": [
        {
          "heading": "Mengapa Kopi Arabika Lebih Baik?",
          "content": "Kopi arabika dikenal memiliki rasa yang lebih kompleks dan halus dibandingkan dengan kopi robusta. Hal ini karena kopi arabika memiliki kadar asam yang lebih tinggi dan rasa yang lebih beragam. Jika Anda ingin menikmati kopi yang berkualitas, pilihlah kopi arabika.",
          "imageSearchQuery": "kopi arabika di tanah",
          "image": "https://images.unsplash.com/photo-1619615174792-a5edcfeafdfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxrb3BpJTIwYXJhYmlrYSUyMGRpJTIwdGFuYWh8ZW58MHwwfHx8MTc3NDc5MDk1OXww&ixlib=rb-4.1.0&q=80&w=1080",
          "imageAlt": "kopi arabika di tanah"
        },
        {
          "heading": "Tips Memilih Kopi yang Berkualitas",
          "content": "Untuk memilih kopi yang berkualitas, perhatikan asal usul kopi. Pastikan kopi tersebut berasal dari daerah yang terkenal dengan kopi berkualitas, seperti Sumatra atau Sulawesi. Selain itu, perhatikan juga tanggal kedaluwarsa kopi dan simpan kopi dengan benar untuk menjaga kesegarannya."
        },
        {
          "heading": "Naturra Extal: Solusi untuk Kopi Berkualitas",
          "content": "Naturra Extal adalah perusahaan yang menyediakan kopi berkualitas dari Indonesia. Kami memiliki direktori petani yang luas dan memastikan bahwa kopi kami dipanen dan diproses dengan benar. Dengan Naturra Extal, Anda dapat menikmati kopi berkualitas tanpa harus repot mencari sendiri.",
          "productId": 11
        },
        {
          "heading": "Langkah Selanjutnya",
          "content": "Jika Anda ingin menikmati kopi berkualitas, mulailah dengan memilih kopi arabika dan memperhatikan asal usul kopi. Kemudian, simpan kopi dengan benar dan nikmati pengalaman rasa terbaik. Dengan Naturra Extal, Anda dapat menikmati kopi berkualitas dengan mudah dan nyaman."
        }
      ],
      "conclusion": "Dengan memilih kopi yang berkualitas dan memperhatikan asal usul kopi, Anda dapat menikmati pengalaman rasa terbaik. Naturra Extal adalah solusi untuk kopi berkualitas, dengan direktori petani yang luas dan proses pengolahan yang benar. Mulailah menikmati kopi berkualitas hari ini juga!"
    }
  },
  {
    "id": 14,
    "slug": "mengenal-babak-dalam-pertanian",
    "title": "Mengenal Babak dalam Pertanian",
    "category": "Tips and Trick",
    "excerpt": "Babak dalam pertanian: Tips dan trik untuk meningkatkan hasil panen",
    "image": "https://images.unsplash.com/photo-1674974423490-05f3b30a83ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHx0YW5hbWFuJTIwcGFkaSUyMGRpJTIwc2F3YWh8ZW58MHwwfHx8MTc3NDc5MTkwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "date": "2026-03-29 20:44",
    "author": "Angga",
    "status": "synced",
    "customContent": {
      "introduction": "Dalam dunia pertanian, babak adalah salah satu faktor penting yang mempengaruhi hasil panen. Babak yang tepat dapat meningkatkan kualitas dan kuantitas hasil panen. Namun, banyak petani yang masih belum memahami tentang babak dan cara menggunakannya dengan efektif. Dalam artikel ini, kita akan membahas tentang babak dalam pertanian dan tips serta trik untuk menggunakannya dengan baik.",
      "keyPoints": [
        "Mengenal babak dan fungsinya dalam pertanian",
        "Cara menentukan babak yang tepat untuk tanaman",
        "Tips dan trik untuk meningkatkan hasil panen dengan babak"
      ],
      "language": "id",
      "sections": [
        {
          "heading": "Apa itu Babak dalam Pertanian?",
          "content": "Babak dalam pertanian adalah proses pengelolaan tanah dan tanaman untuk meningkatkan hasil panen. Babak meliputi kegiatan seperti pengolahan tanah, penanaman, pemeliharaan, dan pemanenan. Dengan babak yang tepat, petani dapat meningkatkan kualitas dan kuantitas hasil panen, serta mengurangi biaya produksi.",
          "imageSearchQuery": "petani mengolah tanah",
          "image": "https://images.unsplash.com/photo-1676772694558-01b3f76a1797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxwZXRhbmklMjBtZW5nb2xhaCUyMHRhbmFofGVufDB8MHx8fDE3NzQ3OTE5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "imageAlt": "petani mengolah tanah"
        },
        {
          "heading": "Cara Menentukan Babak yang Tepat",
          "content": "Menentukan babak yang tepat untuk tanaman memerlukan pengetahuan tentang jenis tanaman, iklim, dan kondisi tanah. Petani perlu mempertimbangkan faktor-faktor seperti musim tanam, jarak tanam, dan kebutuhan nutrisi tanaman. Dengan demikian, petani dapat menentukan babak yang tepat untuk tanaman dan meningkatkan hasil panen."
        },
        {
          "heading": "Tips dan Trik untuk Meningkatkan Hasil Panen dengan Babak",
          "content": "Berikut beberapa tips dan trik untuk meningkatkan hasil panen dengan babak: <br> 1. <strong>Pengolahan tanah yang baik</strong> sebelum menanam dapat meningkatkan kualitas tanah dan hasil panen. <br> 2. <em>Pemeliharaan tanaman yang teratur</em> dapat mengurangi biaya produksi dan meningkatkan hasil panen. <br> 3. <strong>Pemanenan yang tepat waktu</strong> dapat meningkatkan kualitas hasil panen dan mengurangi kerusakan tanaman.",
          "productId": 4
        },
        {
          "heading": "Naturra Extal: Solusi untuk Pertanian yang Berkelanjutan",
          "content": "Naturra Extal adalah perusahaan yang bergerak di bidang pertanian dan menyediakan solusi untuk pertanian yang berkelanjutan. Dengan produk-produk seperti cocopeat dan cocoa powder, Naturra Extal dapat membantu petani meningkatkan hasil panen dan mengurangi biaya produksi.",
          "productId": 5
        }
      ],
      "conclusion": "Dalam kesimpulan, babak dalam pertanian adalah faktor penting yang mempengaruhi hasil panen. Dengan memahami tentang babak dan cara menggunakannya dengan efektif, petani dapat meningkatkan kualitas dan kuantitas hasil panen. Naturra Extal adalah solusi untuk pertanian yang berkelanjutan dan dapat membantu petani meningkatkan hasil panen dan mengurangi biaya produksi."
    }
  },
  {
    "id": 15,
    "slug": "tips-for-finding-reliable-suppliers",
    "title": "Finding Reliable Suppliers",
    "category": "Tips and Trick",
    "excerpt": "Discover how to find trustworthy suppliers for your business",
    "image": "https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMHNoYWtpbmclMjBoYW5kcyUyMGluJTIwYSUyMHdhcmVob3VzZXxlbnwwfDB8fHwxNzc0NzkyMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "date": "2026-03-29 20:52",
    "author": "Angga",
    "status": "synced",
    "customContent": {
      "introduction": "In the world of international trade, finding a reliable supplier is crucial for the success of your business. A trustworthy supplier can provide you with high-quality products, competitive pricing, and timely delivery. At Naturra Extal, we understand the importance of building strong relationships with our suppliers and partners. In this article, we will share some valuable tips and tricks for finding reliable suppliers for your business.",
      "keyPoints": [
        "Research and due diligence",
        "Evaluate supplier credentials",
        "Assess product quality and pricing",
        "Consider logistics and transportation"
      ],
      "language": "en",
      "sections": [
        {
          "heading": "Why Supplier Research is Important?",
          "content": "Conducting thorough research on potential suppliers is essential to ensure that you find a reliable partner for your business. This involves evaluating their credentials, such as their business license, certifications, and reputation in the industry. You can also check online reviews, ask for referrals, and contact their previous customers to get an idea of their performance.",
          "imageSearchQuery": "person researching on a laptop",
          "image": "https://images.unsplash.com/photo-1715866715756-40d1f973bf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjByZXNlYXJjaGluZyUyMG9uJTIwYSUyMGxhcHRvcHxlbnwwfDB8fHwxNzc0NzkyMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "imageAlt": "person researching on a laptop"
        },
        {
          "heading": "Practical Guide to Evaluating Suppliers",
          "content": "When evaluating suppliers, there are several factors to consider. These include the quality of their products, pricing, and delivery times. You should also assess their communication skills, responsiveness, and willingness to adapt to your needs. At Naturra Extal, we prioritize building strong relationships with our suppliers and partners, which enables us to provide our customers with the best possible products and services."
        },
        {
          "heading": "Naturra Extal Solutions",
          "content": "At Naturra Extal, we offer a range of high-quality products, including <strong>Natural Cocoa Powder V10</strong> and <strong>Premium Indonesian Cloves Lal Pari</strong>. Our products are sourced directly from farmers and producers, ensuring that they meet the highest standards of quality and sustainability. We also provide our customers with competitive pricing, timely delivery, and excellent customer service.",
          "productId": 3
        },
        {
          "heading": "Next Steps",
          "content": "If you are looking for a reliable supplier for your business, we invite you to get in touch with us. Our team at Naturra Extal is dedicated to providing our customers with the best possible products and services. We look forward to building a strong and successful partnership with you.",
          "productId": 1
        }
      ],
      "conclusion": "Finding a reliable supplier is a critical step in building a successful business. By conducting thorough research, evaluating supplier credentials, and assessing product quality and pricing, you can find a trustworthy partner for your business. At Naturra Extal, we are committed to providing our customers with high-quality products, competitive pricing, and excellent customer service. Contact us today to learn more about our products and services."
    }
  },
  {
    "id": 16,
    "slug": "robusta-kuat",
    "title": "Robusta Kuat",
    "category": "Tips and Trick",
    "excerpt": "Tips memilih biji kopi robusta berkualitas",
    "image": "https://images.unsplash.com/photo-1615273831852-0157b5fd484b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxiaWppJTIwa29waSUyMHJvYnVzdGElMjBoaWphdXxlbnwwfDB8fHwxNzc0NzkzNzk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "date": "2026-03-29 21:01",
    "author": "Angga",
    "status": "synced",
    "customContent": {
      "introduction": "Kopi robusta dikenal karena rasanya yang kuat dan pahit. Namun, untuk mendapatkan kopi robusta yang berkualitas, dibutuhkan pemilihan biji yang tepat. Pada artikel ini, kita akan membahas beberapa tips memilih biji kopi robusta yang robusta dan berkualitas.",
      "keyPoints": [
        "Pilih biji kopi robusta yang segar",
        "Perhatikan ukuran dan bentuk biji",
        "Cari biji kopi robusta yang memiliki kadar air rendah"
      ],
      "language": "id",
      "sections": [
        {
          "heading": "Mengapa Robusta Kuat?",
          "content": "Kopi robusta dikenal karena rasanya yang kuat dan pahit. Hal ini disebabkan oleh kandungan kafein yang lebih tinggi dibandingkan dengan kopi arabika. Selain itu, kopi robusta juga memiliki rasa yang lebih berat dan lebih sedikit asam.",
          "imageSearchQuery": "kopi robusta di gelas",
          "image": "https://images.unsplash.com/photo-1699848011190-73a1d429cf5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxrb3BpJTIwcm9idXN0YSUyMGRpJTIwZ2VsYXN8ZW58MHwwfHx8MTc3NDc5Mzc5NXww&ixlib=rb-4.1.0&q=80&w=1080",
          "imageAlt": "kopi robusta di gelas"
        },
        {
          "heading": "Panduan Praktis Memilih Biji Kopi Robusta",
          "content": "Untuk mendapatkan kopi robusta yang berkualitas, dibutuhkan pemilihan biji yang tepat. Berikut beberapa tips memilih biji kopi robusta: <br> - Pilih biji kopi robusta yang segar <br> - Perhatikan ukuran dan bentuk biji <br> - Cari biji kopi robusta yang memiliki kadar air rendah"
        },
        {
          "heading": "Naturra Extal Solusi",
          "content": "Naturra Extal menyediakan biji kopi robusta berkualitas yang dipilih langsung dari petani. Kami memiliki komitmen untuk menyediakan produk yang berkualitas dan berkelanjutan. Dengan memilih Naturra Extal, Anda dapat mendapatkan kopi robusta yang kuat dan berkualitas.",
          "productId": 1
        },
        {
          "heading": "Langkah Selanjutnya",
          "content": "Jika Anda ingin mendapatkan kopi robusta yang berkualitas, segera hubungi kami. Kami siap membantu Anda dalam memilih biji kopi robusta yang tepat dan menyediakan produk yang berkualitas.",
          "productId": 1
        }
      ],
      "conclusion": "Dengan memilih biji kopi robusta yang tepat dan berkualitas, Anda dapat mendapatkan kopi robusta yang kuat dan enak. Naturra Extal siap membantu Anda dalam memilih biji kopi robusta yang berkualitas dan menyediakan produk yang berkelanjutan."
    }
  },
  {
    "id": 17,
    "slug": "tips-mengoptimalkan-kualitas-bubuk-kakao",
    "title": "Tips Mengoptimalkan Kualitas Bubuk Kakao",
    "category": "Tips and Trick",
    "excerpt": "Tips untuk meningkatkan kualitas bubuk kakao Anda",
    "image": "https://images.unsplash.com/photo-1690983322622-765f664952e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwcXVhbGl0eSUyMGNvY29hJTIwcG93ZGVyJTIwb24lMjB3b29kZW4lMjBzcG9vbnxlbnwwfDB8fHwxNzc0Nzk0Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "date": "2026-03-29 21:24",
    "author": "Angga",
    "status": "synced",
    "customContent": {
      "introduction": "Bubuk kakao merupakan salah satu komoditas yang paling diminati di dunia. Namun, kualitas bubuk kakao dapat menurun jika tidak ditangani dengan benar. Berikut beberapa tips untuk mengoptimalkan kualitas bubuk kakao Anda.",
      "keyPoints": [
        "Pilih biji kakao berkualitas tinggi",
        "Simpan bubuk kakao di tempat yang kering",
        "Gunakan metode pengolahan yang tepat"
      ],
      "language": "id",
      "sections": [
        {
          "heading": "Mengapa Kualitas Bubuk Kakao Penting?",
          "content": "Kualitas bubuk kakao sangat penting karena dapat mempengaruhi rasa dan aroma produk akhir. Bubuk kakao yang berkualitas tinggi dapat memberikan rasa yang kaya dan aroma yang kuat, sedangkan bubuk kakao yang berkualitas rendah dapat memberikan rasa yang hambar dan aroma yang lemah.",
          "imageSearchQuery": "bubuk kakao premium",
          "image": "https://images.unsplash.com/photo-1619615174792-a5edcfeafdfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxidWJ1ayUyMGtha2FvJTIwcHJlbWl1bXxlbnwwfDB8fHwxNzc0Nzk0MjkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
          "imageAlt": "bubuk kakao premium"
        },
        {
          "heading": "Tips Mengoptimalkan Kualitas Bubuk Kakao",
          "content": "Berikut beberapa tips untuk mengoptimalkan kualitas bubuk kakao: <strong>pilih biji kakao berkualitas tinggi</strong>, <em>simpan bubuk kakao di tempat yang kering</em>, dan <strong>gunakan metode pengolahan yang tepat</strong>. Dengan mengikuti tips ini, Anda dapat meningkatkan kualitas bubuk kakao Anda dan memberikan produk akhir yang lebih baik."
        },
        {
          "heading": "Solusi Naturra Extal",
          "content": "Naturra Extal menawarkan solusi untuk meningkatkan kualitas bubuk kakao Anda. Kami menyediakan biji kakao berkualitas tinggi dan metode pengolahan yang tepat untuk membantu Anda mengoptimalkan kualitas bubuk kakao Anda. <br> Dengan menggunakan produk kami, Anda dapat meningkatkan kualitas bubuk kakao Anda dan memberikan produk akhir yang lebih baik. Kami juga menawarkan <strong>Produk Bubuk Kakao V10</strong> yang merupakan salah satu produk unggulan kami.",
          "productId": 1
        },
        {
          "heading": "Langkah Selanjutnya",
          "content": "Jika Anda ingin meningkatkan kualitas bubuk kakao Anda, hubungi kami untuk mendapatkan informasi lebih lanjut tentang produk dan solusi kami. Kami siap membantu Anda mengoptimalkan kualitas bubuk kakao Anda dan memberikan produk akhir yang lebih baik.",
          "productId": 2
        }
      ],
      "conclusion": "Dengan mengikuti tips dan menggunakan solusi Naturra Extal, Anda dapat meningkatkan kualitas bubuk kakao Anda dan memberikan produk akhir yang lebih baik. Kami berharap artikel ini dapat membantu Anda mengoptimalkan kualitas bubuk kakao Anda dan meningkatkan bisnis Anda."
    }
  },
  {
    "id": 18,
    "slug": "tips-meningkatkan-kualitas-komoditas",
    "title": "Meningkatkan Kualitas",
    "category": "Tips and Trick",
    "excerpt": "Tips meningkatkan kualitas komoditas untuk industri makanan dan minuman",
    "image": "https://images.unsplash.com/photo-1759689975472-c302b63b3b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwcXVhbGl0eSUyMGZvb2QlMjBpbmdyZWRpZW50cyUyMG9uJTIwd29vZGVuJTIwdGFibGV8ZW58MHwwfHx8MTc3NDc5NDQxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    "date": "2026-03-29 21:26",
    "author": "Angga",
    "status": "synced",
    "customContent": {
      "introduction": "Kualitas komoditas sangat penting dalam industri makanan dan minuman. Dalam artikel ini, kita akan membahas beberapa tips untuk meningkatkan kualitas komoditas Anda. <strong>Naturra Extal</strong> sebagai perusahaan komoditas terkemuka di Indonesia, berkomitmen untuk menyediakan komoditas berkualitas tinggi untuk pelanggan kami.",
      "keyPoints": [
        "Pemilihan bahan baku yang tepat",
        "Proses pengolahan yang baik",
        "Pengawasan kualitas yang ketat"
      ],
      "language": "id",
      "sections": [
        {
          "heading": "Mengapa Kualitas Penting?",
          "content": "Kualitas komoditas sangat berpengaruh pada hasil akhir produk. <em>Bahan baku yang berkualitas</em> akan menghasilkan produk yang lebih baik dan lebih sehat. Oleh karena itu, penting untuk memilih bahan baku yang tepat dan melakukan proses pengolahan yang baik.",
          "imageSearchQuery": "bahan baku makanan berkualitas",
          "image": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxiYWhhbiUyMGJha3UlMjBtYWthbmFuJTIwYmVya3VhbGl0YXN8ZW58MHwwfHx8MTc3NDc5NDQwOHww&ixlib=rb-4.1.0&q=80&w=1080",
          "imageAlt": "bahan baku makanan berkualitas"
        },
        {
          "heading": "Tips Meningkatkan Kualitas",
          "content": "Berikut beberapa tips untuk meningkatkan kualitas komoditas Anda: <br> 1. Pilih bahan baku yang segar dan berkualitas. <br> 2. Lakukan proses pengolahan yang baik dan higienis. <br> 3. Lakukan pengawasan kualitas yang ketat pada setiap tahap produksi."
        },
        {
          "heading": "Solusi Naturra Extal",
          "content": "Naturra Extal menyediakan komoditas berkualitas tinggi untuk industri makanan dan minuman. Kami memiliki <strong>produk unggulan</strong> seperti Natural Cocoa Powder V10 (produk id 1) yang diproses dengan baik dan memiliki kualitas yang tinggi.",
          "productId": 1
        },
        {
          "heading": "Langkah Selanjutnya",
          "content": "Jika Anda ingin meningkatkan kualitas komoditas Anda, hubungi kami untuk mendapatkan informasi lebih lanjut tentang produk dan layanan kami. Kami siap membantu Anda untuk meningkatkan kualitas produk Anda."
        }
      ],
      "conclusion": "Dalam meningkatkan kualitas komoditas, penting untuk memilih bahan baku yang tepat, melakukan proses pengolahan yang baik, dan melakukan pengawasan kualitas yang ketat. Dengan demikian, Anda dapat meningkatkan kualitas produk Anda dan memenuhi kebutuhan pelanggan Anda."
    }
  },
  {
    "id": 19,
    "slug": "tips-memilih-biji-kakao-berkualitas",
    "title": "Biji Kakao Berkualitas",
    "category": "Tips and Trick",
    "excerpt": "Tips memilih biji kakao berkualitas untuk hasil olahan terbaik",
    "image": "https://images.unsplash.com/photo-1585428522589-592f41523318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwcXVhbGl0eSUyMGNvY29hJTIwYmVhbnMlMjBvbiUyMHdvb2RlbiUyMHRhYmxlfGVufDB8MHx8fDE3NzQ3OTg3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "date": "2026-03-29 22:39",
    "author": "Angga",
    "status": "synced",
    "customContent": {
      "introduction": "Biji kakao merupakan bahan baku utama dalam produksi cokelat. Oleh karena itu, penting untuk memilih biji kakao yang berkualitas tinggi. Dalam artikel ini, kita akan membahas beberapa tips untuk memilih biji kakao yang tepat untuk kebutuhan Anda.",
      "keyPoints": [
        "Pilih biji kakao yang segar dan bersih",
        "Perhatikan warna dan ukuran biji kakao",
        "Cek kelembaban biji kakao"
      ],
      "language": "id",
      "sections": [
        {
          "heading": "Mengapa Kualitas Biji Kakao Penting?",
          "content": "Kualitas biji kakao sangat berpengaruh pada hasil olahan cokelat. Biji kakao yang berkualitas tinggi akan menghasilkan cokelat dengan rasa yang kaya dan aroma yang kuat. Oleh karena itu, penting untuk memilih biji kakao yang tepat untuk kebutuhan Anda. <br> Naturra Extal, sebagai penyedia biji kakao berkualitas, menawarkan biji kakao yang dipilih dengan teliti dan diproses dengan baik untuk menghasilkan kualitas terbaik.",
          "imageSearchQuery": "proses pengolahan biji kakao",
          "image": "https://images.unsplash.com/photo-1619615174792-a5edcfeafdfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxwcm9zZXMlMjBwZW5nb2xhaGFuJTIwYmlqaSUyMGtha2FvfGVufDB8MHx8fDE3NzQ3OTg3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "imageAlt": "proses pengolahan biji kakao"
        },
        {
          "heading": "Tips Memilih Biji Kakao Berkualitas",
          "content": "Berikut beberapa tips untuk memilih biji kakao yang berkualitas: <br> - Pilih biji kakao yang segar dan bersih <br> - Perhatikan warna dan ukuran biji kakao <br> - Cek kelembaban biji kakao <br> Dengan memperhatikan beberapa tips di atas, Anda dapat memilih biji kakao yang tepat untuk kebutuhan Anda."
        },
        {
          "heading": "Naturra Extal Solusi Biji Kakao Berkualitas",
          "content": "Naturra Extal menawarkan biji kakao berkualitas yang dipilih dengan teliti dan diproses dengan baik. Kami memiliki pengalaman yang luas dalam menyediakan biji kakao untuk berbagai kebutuhan, dari industri makanan hingga pengguna rumahan. <br> Dengan memilih Naturra Extal, Anda dapat yakin bahwa Anda mendapatkan biji kakao yang berkualitas tinggi dan sesuai dengan kebutuhan Anda. Silakan hubungi kami untuk informasi lebih lanjut tentang produk kami, seperti <strong>Organic Coconut Sugar Granule</strong> (produk id: 12).",
          "productId": 12
        }
      ],
      "conclusion": "Dengan memilih biji kakao yang berkualitas tinggi, Anda dapat menghasilkan cokelat dengan rasa yang kaya dan aroma yang kuat. Naturra Extal menawarkan biji kakao berkualitas yang dipilih dengan teliti dan diproses dengan baik untuk menghasilkan kualitas terbaik. Silakan hubungi kami untuk informasi lebih lanjut tentang produk kami."
    }
  },
  {
    "id": 20,
    "slug": "tips-mengolah-koko",
    "title": "Tips Mengolah Koko",
    "category": "Tips and Trick",
    "excerpt": "Tips dan trik mengolah koko untuk mendapatkan hasil terbaik",
    "image": "https://images.unsplash.com/photo-1585428522589-592f41523318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwcXVhbGl0eSUyMGNvY29hJTIwYmVhbnMlMjBvbiUyMHdvb2RlbiUyMHRhYmxlfGVufDB8MHx8fDE3NzQ3OTg3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "date": "2026-03-29 23:00",
    "author": "Angga",
    "status": "draft",
    "customContent": {
      "introduction": "Koko adalah salah satu komoditas yang paling penting di Indonesia, namun banyak orang yang masih belum tahu cara mengolahnya dengan benar. Dalam artikel ini, kita akan membahas beberapa tips dan trik mengolah koko untuk mendapatkan hasil terbaik.",
      "keyPoints": [
        "Pemilihan bahan baku yang berkualitas",
        "Proses pengolahan yang tepat",
        "Penyimpanan yang baik"
      ],
      "language": "id",
      "sections": [
        {
          "heading": "Pemilihan Bahan Baku",
          "content": "Pemilihan bahan baku yang berkualitas adalah langkah pertama dalam mengolah koko. Pastikan Anda memilih biji koko yang segar dan memiliki kualitas yang baik. <strong>Biji koko yang berkualitas</strong> akan memiliki warna yang merata dan tidak memiliki bau yang tidak sedap.",
          "imageSearchQuery": "cocoa beans selection",
          "image": "https://images.unsplash.com/photo-1447753072467-2f56032d1d48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzU2ODd8MHwxfHNlYXJjaHwxfHxjb2NvYSUyMGJlYW5zJTIwc2VsZWN0aW9ufGVufDB8MHx8fDE3NzQ4MDAwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "imageAlt": "cocoa beans selection"
        },
        {
          "heading": "Proses Pengolahan",
          "content": "Proses pengolahan koko yang tepat sangat penting untuk mendapatkan hasil yang baik. <em>Proses pengolahan</em> harus dilakukan dengan hati-hati dan teliti untuk menghindari kerusakan pada biji koko. Pastikan Anda mengikuti prosedur yang benar dan menggunakan peralatan yang bersih."
        },
        {
          "heading": "Naturra Extal Solutions",
          "content": "Naturra Extal adalah perusahaan yang bergerak di bidang komoditas koko dan memiliki pengalaman yang luas dalam mengolah koko. Kami menawarkan <strong>Natural Cocoa Powder V10</strong> yang diproduksi dengan menggunakan biji koko yang berkualitas dan proses pengolahan yang tepat. Dengan menggunakan produk kami, Anda dapat mendapatkan hasil yang terbaik untuk bisnis Anda.",
          "productId": 1
        },
        {
          "heading": "Tips dan Trik Tambahan",
          "content": "Berikut beberapa tips dan trik tambahan yang dapat Anda gunakan dalam mengolah koko: <br> - Pastikan Anda menyimpan biji koko dalam tempat yang kering dan sejuk. <br> - Jangan mencuci biji koko sebelum mengolahnya. <br> - Gunakan peralatan yang bersih dan steril untuk menghindari kontaminasi.",
          "productId": 12
        }
      ],
      "conclusion": "Dengan mengikuti tips dan trik yang telah kami bagikan, Anda dapat mendapatkan hasil yang terbaik dalam mengolah koko. Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau memerlukan bantuan lebih lanjut. Naturra Extal siap membantu Anda dalam mengembangkan bisnis koko Anda."
    }
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
