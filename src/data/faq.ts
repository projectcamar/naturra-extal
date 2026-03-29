// FAQ Data for SEO - Structured Data for Google Rich Results
export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  slug: string
  title: string
  faqs: FAQItem[]
}

// FAQ untuk Educational Content - High Intent SEO for Agricultural Commodities
export const FAQ_DATA: FAQCategory[] = [
  {
    slug: 'commodity-export-bekasi',
    title: 'FAQ Ekspor Komoditas Pertanian Bekasi',
    faqs: [
      {
        question: 'Komoditas apa saja yang diekspor oleh Naturra Extal dari Bekasi?',
        answer: 'Naturra Extal mengkhususkan diri dalam ekspor Bubuk Kakao (Cocoa Powder), Cengkeh (Cloves), dan Cocopeat. Kami mengelola rantai pasok dari petani di Sulawesi dan Sumatra hingga proses akhir di fasilitas industri kami di Bekasi sebelum dikirim ke pasar global.'
      },
      {
        question: 'Bagaimana standar kualitas Bubuk Kakao Naturra Extal?',
        answer: 'Bubuk Kakao kami memenuhi standar internasional untuk kategori HS 1805 dan 1806. Kami menyediakan varian Natural dan Alkalized dengan kadar lemak 10-12% (High Fat tersedia sesuai pesanan). Setiap batch disertai dengan COA (Certificate of Analysis) yang mencakup uji pH, kehalusan partikel, dan profil mikrobiologis.'
      },
      {
        question: 'Berapa kapasitas produksi dan ekspor bulanan?',
        answer: 'Fasilitas kami di Bekasi memiliki kapasitas pemrosesan dan pengemasan hingga 150-200 metrik ton per bulan untuk Bubuk Kakao dan 50 metrik ton untuk Cengkeh kering. Kami melayani pengiriman FCL (Full Container Load) 20ft dan 40ft ke seluruh dunia.'
      },
      {
        question: 'Apa keunggulan Cengkeh (Cloves) asal Indonesia dari Naturra Extal?',
        answer: 'Cengkeh kami berasal dari perkebunan rakyat di Sulawesi Utara (Lal Pari Grade) yang dikenal memiliki kadar eugenol tinggi (>70%) dan aroma yang sangat kuat. Proses penjemuran matahari yang terkontrol memastikan kadar air tetap di bawah 12% dan tingkat kotoran (impurity) di bawah 1%.'
      },
      {
        question: 'Apakah Naturra Extal menyediakan Cocopeat dalam bentuk blok?',
        answer: 'Ya, kami menyediakan Cocopeat dalam bentuk 5kg Low EC Blocks. Cocopeat kami telah melalui proses pencucian (washing) untuk menurunkan kadar salinitas, menjadikannya media tanam ideal untuk hortikultura dan pertanian berkelanjutan di Eropa dan Asia Timur.'
      },
      {
        question: 'Berapa lead-time pengiriman untuk pesanan internasional?',
        answer: 'Waktu tunggu standar (lead-time) adalah 14 hingga 21 hari kerja dari konfirmasi pembayaran hingga barang siap di pelabuhan (Jakarta/Surabaya), tergantung pada volume pesanan dan ketersediaan slot kapal global.'
      },
      {
        question: 'Dokumen apa saja yang disediakan untuk transaksi ekspor?',
        answer: 'Kami menyediakan dokumen lengkap termasuk Invoice, Packing List, Bill of Lading (B/L), Certificate of Origin (COO), Phytosanitary Certificate, dan Fumigation Certificate sesuai dengan regulasi negara tujuan.'
      },
      {
        question: 'Dapatkah saya mengunjungi fasilitas Naturra Extal di Bekasi?',
        answer: 'Tentu. Kami menyambut calon pembeli internasional dan mitra dagang untuk mengunjungi fasilitas industri kami di Bekasi melalui janji temu. Anda dapat melihat proses kontrol kualitas dan pengemasan kami secara langsung.'
      }
    ]
  },
  {
    slug: 'cocoa-powder-export-guide',
    title: 'FAQ Panduan Ekspor Bubuk Kakao',
    faqs: [
      {
        question: 'Apa perbedaan Bubuk Kakao Natural dan Alkalized?',
        answer: 'Bubuk Kakao Natural diproses langsung dari biji kakao tanpa penyesuaian pH, mempertahankan rasa buah dan keasaman alami. Bubuk Kakao Alkalized (Dutch-processed) melalui proses netralisasi untuk warna yang lebih gelap, rasa yang lebih lembut, dan kelarutan yang lebih baik dalam air.'
      },
      {
        question: 'Mengapa memilih Bubuk Kakao asal Indonesia?',
        answer: 'Indonesia adalah salah satu produsen kakao terbesar di dunia. Biji kakao Indonesia dikenal memiliki titik leleh yang tinggi dan profil rasa yang kuat, sangat ideal untuk industri manufaktur cokelat dan minuman di seluruh dunia.'
      }
    ]
  }
]

export const getFAQBySlug = (slug: string): FAQCategory | undefined => {
  return FAQ_DATA.find(faq => faq.slug === slug)
}
