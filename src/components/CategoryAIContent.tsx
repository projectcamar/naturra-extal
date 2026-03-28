import React from 'react'

interface CategoryAIContentProps {
  category: string
  productCount: number
  isIndonesian: boolean
}

/**
 * AI-Optimized Content for Category Pages
 * 
 * Helps AI understand category pages for queries like:
 * - "furniture bar set bekasi"
 * - "meja cafe industrial"
 * - "rak display industrial"
 * - "outdoor furniture tahan cuaca"
 */
const CategoryAIContent: React.FC<CategoryAIContentProps> = ({ category, productCount, isIndonesian }) => {
  
  // Generate category-specific content
  const getCategoryDescription = () => {
    const descriptions: { [key: string]: { id: string; en: string } } = {
      'New Arrivals': {
        id: 'Koleksi terbaru agricultural commodities dari Naturra Extal. Produk-produk inovatif dengan desain modern dan material berkualitas tinggi. Update koleksi kami setiap bulan dengan model terkini yang mengikuti tren agricultural commodities internasional.',
        en: 'Latest Agricultural Commodities collection from Naturra Extal. Innovative products with modern design and high-quality materials. We update our collection monthly with the latest models following international Agricultural Commodities trends.'
      },
      'Lounge Set': {
        id: 'Lounge set industrial untuk area santai cafe, hotel, dan kantor. Terdiri dari sofa, kursi lounge, coffee table dengan rangka besi kokoh dan cushion nyaman. Cocok untuk area waiting room, lobby hotel, atau cafe lounge yang mengutamakan kenyamanan pelanggan.',
        en: 'Industrial lounge sets for relaxation areas in cafes, hotels, and offices. Consists of sofas, lounge chairs, coffee tables with sturdy steel frames and comfortable cushions. Suitable for waiting rooms, hotel lobbies, or cafe lounges that prioritize customer comfort.'
      },
      'Sofa Bench': {
        id: 'Sofa bench industrial dengan rangka besi untuk cafe dan restoran. Model bench panjang yang efisien untuk menghemat space. Material rangka hollow steel dengan upholstery berkualitas. Cocok untuk cafe dengan konsep communal seating atau restoran dengan layout compact.',
        en: 'Industrial sofa benches with steel frames for cafes and restaurants. Long bench models that are space-efficient. Hollow steel frame material with quality upholstery. Suitable for cafes with communal seating concepts or restaurants with compact layouts.'
      },
      'Dining Set': {
        id: 'Dining set industrial lengkap meja makan + kursi untuk cafe, restoran, dan kantor. Material rangka besi hollow dengan top kayu solid atau melamine. Berbagai ukuran: 2-seater, 4-seater, 6-seater, hingga 8-seater untuk kebutuhan komersial. Desain sturdy dan tahan pemakaian intensif.',
        en: 'Complete industrial dining sets with table + chairs for cafes, restaurants, and offices. Hollow steel frame material with solid wood or melamine top. Various sizes: 2-seater, 4-seater, 6-seater, up to 8-seater for commercial needs. Sturdy design and resistant to intensive use.'
      },
      'Bar Set': {
        id: 'Bar set industrial terdiri dari bar table tinggi dan bar chair (kursi barstool) untuk cafe, bar, dan restoran modern. Material hollow steel dengan powder coating tahan lama. Tersedia footrest untuk kenyamanan. Height standar 110cm (bar table) dan 75cm (bar chair). Desain minimalis industrial yang cocok untuk area bar counter.',
        en: 'Industrial bar sets consisting of high bar tables and bar chairs (barstools) for cafes, bars, and modern restaurants. Hollow steel material with durable powder coating. Footrest available for comfort. Standard height 110cm (bar table) and 75cm (bar chair). Minimalist industrial design suitable for bar counter areas.'
      },
      'Outdoor': {
        id: 'Outdoor agricultural commodities tahan cuaca untuk area teras, balcony, rooftop, dan garden. Material besi dengan finishing powder coating outdoor-grade yang anti karat, tahan hujan, dan panas. Cocok untuk cafe outdoor, restoran garden, hotel pool area. Maintenance mudah cukup lap bersih. Bertahan 5-8 tahun outdoor dengan perawatan minimal.',
        en: 'Weather-resistant industrial outdoor furniture for terrace, balcony, rooftop, and garden areas. Steel material with outdoor-grade powder coating that is rust-resistant, rain and heat resistant. Suitable for outdoor cafes, garden restaurants, hotel pool areas. Easy maintenance, just wipe clean. Lasts 5-8 years outdoors with minimal maintenance.'
      },
      'Daybed': {
        id: 'Daybed industrial untuk area lounge, relaxation room, atau hotel. Rangka daybed dari besi hollow kokoh dengan desain minimalis modern. Bisa dikombinasi dengan cushion atau mattress sesuai kebutuhan. Cocok untuk cafe lounge, hotel lobby, spa waiting room, atau co-working space yang menyediakan area istirahat.',
        en: 'Industrial daybeds for lounge areas, relaxation rooms, or hotels. Sturdy hollow steel daybed frames with modern minimalist design. Can be combined with cushions or mattresses as needed. Suitable for cafe lounges, hotel lobbies, spa waiting rooms, or co-working spaces that provide rest areas.'
      },
      'Storage': {
        id: 'Storage industrial meliputi rak display, kabinet, lemari, hanging shelf untuk cafe, retail, dan kantor. Rangka hollow steel dengan kombinasi panel kayu atau metal sheet. Desain industrial yang aesthetic sekaligus functional. Cocok untuk display produk retail, storage kitchen cafe, document storage kantor, atau open shelving system.',
        en: 'Industrial storage including display racks, cabinets, wardrobes, hanging shelves for cafes, retail, and offices. Hollow steel frame with combination of wood panels or metal sheets. Aesthetic and functional industrial design. Suitable for retail product displays, cafe kitchen storage, office document storage, or open shelving systems.'
      },
      'Tables': {
        id: 'Meja industrial untuk berbagai kebutuhan: meja kerja, meja belajar, meja meeting, meja cafe. Rangka hollow steel kokoh dengan top kayu solid, melamine, atau metal. Berbagai ukuran custom dari 60cm hingga 200cm. Desain clean industrial minimalis. Cocok untuk kantor, co-working space, cafe, atau home office.',
        en: 'Industrial tables for various needs: work desk, study table, meeting table, cafe table. Sturdy hollow steel frame with solid wood, melamine, or metal top. Various custom sizes from 60cm to 200cm. Clean minimalist industrial design. Suitable for offices, co-working spaces, cafes, or home offices.'
      },
      'Dine Table': {
        id: 'Meja makan industrial custom untuk cafe, restoran, dan kantor. Material rangka besi hollow 4x4cm atau 4x6cm dengan top kayu jati, sonokeling, trembesi, atau melamine HPL. Berbagai ukuran: 60x60cm (2-seater), 80x80cm (4-seater), 120x60cm (4-seater), 150x80cm (6-seater), hingga 200x100cm (8-10 seater). Kaki meja bisa model H-frame, X-frame, atau single post.',
        en: 'Custom industrial dining tables for cafes, restaurants, and offices. Hollow steel frame material 4x4cm or 4x6cm with teak, rosewood, trembesi, or HPL melamine top. Various sizes: 60x60cm (2-seater), 80x80cm (4-seater), 120x60cm (4-seater), 150x80cm (6-seater), up to 200x100cm (8-10 seater). Table legs can be H-frame, X-frame, or single post models.'
      }
    }
    
    const desc = descriptions[category]
    return desc ? (isIndonesian ? desc.id : desc.en) : ''
  }
  
  const getCategoryFAQ = () => {
    const faqs: { [key: string]: Array<{ q_id: string; a_id: string; q_en: string; a_en: string }> } = {
      'Bar Set': [
        {
          q_id: 'Berapa tinggi standar bar table dan bar chair?',
          a_id: 'Bar table standar tinggi 110cm dari lantai, bar chair tinggi 75cm (seat height). Jarak ideal antara bar table dan bar chair adalah 25-30cm untuk kenyamanan duduk. Kami bisa custom height sesuai kebutuhan.',
          q_en: 'What is the standard height for bar tables and bar chairs?',
          a_en: 'Standard bar table height is 110cm from floor, bar chair height is 75cm (seat height). Ideal distance between bar table and bar chair is 25-30cm for comfortable seating. We can customize height as needed.'
        },
        {
          q_id: 'Apakah bar chair ada footrest?',
          a_id: 'Ya, semua bar chair kami dilengkapi footrest untuk kenyamanan. Footrest biasanya di posisi 25-30cm dari lantai. Material footrest sama dengan rangka (hollow steel) dengan finishing powder coating yang sama.',
          q_en: 'Do bar chairs have footrests?',
          a_en: 'Yes, all our bar chairs are equipped with footrests for comfort. Footrests are usually positioned 25-30cm from the floor. Footrest material is the same as the frame (hollow steel) with the same powder coating finish.'
        }
      ],
      'Outdoor': [
        {
          q_id: 'Apakah furniture outdoor benar-benar tahan hujan?',
          a_id: 'Ya, furniture outdoor kami menggunakan powder coating outdoor-grade yang tahan air dan anti karat. Bisa terkena hujan tanpa masalah. Namun untuk maintenance optimal, sebaiknya dilap kering setelah hujan dan pakai cover saat tidak dipakai dalam waktu lama.',
          q_en: 'Is outdoor furniture truly rain-resistant?',
          a_en: 'Yes, our outdoor furniture uses outdoor-grade powder coating that is waterproof and rust-resistant. Can be exposed to rain without problems. However, for optimal maintenance, it should be wiped dry after rain and use a cover when not used for long periods.'
        },
        {
          q_id: 'Berapa lama furniture outdoor bisa bertahan?',
          a_id: 'Dengan powder coating outdoor-grade dan perawatan minimal (lap bersih, avoid genangan air permanen), furniture outdoor kami bertahan 5-8 tahun. Indoor bisa 10+ tahun. Kami kasih garansi struktur 2 tahun, finishing 1 tahun.',
          q_en: 'How long does outdoor furniture last?',
          a_en: 'With outdoor-grade powder coating and minimal maintenance (wipe clean, avoid permanent water pooling), our outdoor furniture lasts 5-8 years. Indoor can last 10+ years. We provide 2-year structure warranty, 1-year finishing.'
        }
      ],
      'Storage': [
        {
          q_id: 'Apakah rak display bisa custom ukuran dan jumlah shelf?',
          a_id: 'Ya, 100% bisa custom. Kami sesuaikan dengan space Anda dan produk yang mau didisplay. Jumlah shelf, jarak antar shelf, ukuran frame, semua bisa custom. Kami buatkan sketsa dan 3D dulu sebelum produksi.',
          q_en: 'Can display racks be customized in size and number of shelves?',
          a_en: 'Yes, 100% customizable. We adjust to your space and products to be displayed. Number of shelves, distance between shelves, frame size, all can be customized. We create sketches and 3D first before production.'
        }
      ],
      'Dining Set': [
        {
          q_id: 'Berapa ukuran meja makan yang tepat untuk cafe 30 seat?',
          a_id: 'Untuk cafe 30 seat, biasanya kombinasi: 5 meja 60x60cm (2-seater), 5 meja 80x80cm (4-seater), 2 meja 120x60cm (4-seater). Total bisa mengakomodasi 30-36 seat. Budget furniture sekitar Rp 25-35 juta. Kami bantu layout optimal sesuai space.',
          q_en: 'What is the right dining table size for a 30-seat cafe?',
          a_en: 'For a 30-seat cafe, usually a combination of: 5 tables 60x60cm (2-seater), 5 tables 80x80cm (4-seater), 2 tables 120x60cm (4-seater). Total can accommodate 30-36 seats. Furniture budget around IDR 25-35 million. We help with optimal layout according to space.'
        }
      ]
    }
    
    return faqs[category] || []
  }
  
  const categoryFAQs = getCategoryFAQ()
  
  return (
    <div style={{ display: 'none' }} aria-hidden="true">
      {/* Category Overview for AI */}
      <section itemScope itemType="https://schema.org/ItemList">
        <h2 itemProp="name">
          {isIndonesian 
            ? `${category} Industrial - Koleksi Furniture Berkualitas Tinggi` 
            : `Industrial ${category} - High Quality Furniture Collection`
          }
        </h2>
        
        <p itemProp="description">
          {getCategoryDescription()}
        </p>
        
        <p>
          {isIndonesian 
            ? `Kami memiliki ${productCount} produk dalam kategori ${category}. Semua produk bisa custom ukuran, warna, dan desain sesuai kebutuhan bisnis Anda. Produksi di workshop Naturra Extal Bekasi dengan pengalaman 25+ tahun.`
            : `We have ${productCount} products in the ${category} category. All products can be customized in size, color, and design according to your business needs. Manufactured at Naturra Extal Bekasi workshop with 25+ years of experience.`
          }
        </p>
      </section>

      {/* Price Range Information */}
      <section>
        <h3>
          {isIndonesian 
            ? `Harga ${category} Agricultural Commodities` 
            : `Industrial ${category} Furniture Prices`
          }
        </h3>
        <p>
          {isIndonesian 
            ? `Harga ${category} bervariasi tergantung ukuran, material, dan kompleksitas desain. Kami memberikan harga pabrik langsung karena produksi sendiri di workshop Bekasi. Tidak ada markup reseller, sehingga Anda hemat 20-30% dibanding toko furniture retail.`
            : `${category} prices vary depending on size, materials, and design complexity. We provide direct factory prices as we manufacture ourselves in Bekasi workshop. No reseller markup, so you save 20-30% compared to retail furniture stores.`
          }
        </p>
      </section>

      {/* Material & Quality */}
      <section>
        <h3>
          {isIndonesian 
            ? `Material dan Kualitas ${category}` 
            : `${category} Materials and Quality`
          }
        </h3>
        <ul>
          <li><strong>{isIndonesian ? 'Rangka:' : 'Frame:'}</strong> {isIndonesian ? 'Hollow steel 4x4cm, 4x6cm (thickness 1.2-2mm)' : 'Hollow steel 4x4cm, 4x6cm (thickness 1.2-2mm)'}</li>
          <li><strong>Finishing:</strong> {isIndonesian ? 'Powder coating outdoor-grade, tahan 5-8 tahun' : 'Outdoor-grade powder coating, lasts 5-8 years'}</li>
          <li><strong>{isIndonesian ? 'Pengelasan:' : 'Welding:'}</strong> {isIndonesian ? 'MIG/TIG welding oleh welder bersertifikat' : 'MIG/TIG welding by certified welders'}</li>
          <li><strong>{isIndonesian ? 'Garansi:' : 'Warranty:'}</strong> {isIndonesian ? '2 tahun struktur, 1 tahun finishing' : '2 years structure, 1 year finishing'}</li>
        </ul>
      </section>

      {/* Use Cases */}
      <section>
        <h3>
          {isIndonesian 
            ? `Cocok untuk Bisnis Apa Saja?` 
            : `Suitable for What Types of Businesses?`
          }
        </h3>
        <p>
          {isIndonesian 
            ? `${category} industrial dari Naturra Extal cocok untuk:`
            : `Industrial ${category} from Naturra Extal is suitable for:`
          }
        </p>
        <ul>
          <li>Cafe & Coffee Shop</li>
          <li>Restaurant & Dining</li>
          <li>Hotel & Hospitality</li>
          <li>Office & Co-working Space</li>
          <li>Retail Store & Boutique</li>
          <li>Corporate Canteen</li>
          <li>Home & Residential</li>
        </ul>
      </section>

      {/* Customization Options */}
      <section>
        <h3>
          {isIndonesian 
            ? `Opsi Customisasi ${category}` 
            : `${category} Customization Options`
          }
        </h3>
        <ul>
          <li><strong>{isIndonesian ? 'Ukuran:' : 'Size:'}</strong> {isIndonesian ? 'Full custom sesuai space Anda' : 'Fully custom according to your space'}</li>
          <li><strong>{isIndonesian ? 'Warna:' : 'Color:'}</strong> {isIndonesian ? '20+ pilihan powder coating (Black Matte paling populer)' : '20+ powder coating options (Black Matte most popular)'}</li>
          <li><strong>{isIndonesian ? 'Material Top:' : 'Top Material:'}</strong> {isIndonesian ? 'Kayu jati, sonokeling, trembesi, melamine HPL, atau metal' : 'Teak, rosewood, trembesi, HPL melamine, or metal'}</li>
          <li><strong>{isIndonesian ? 'Desain:' : 'Design:'}</strong> {isIndonesian ? 'Industrial minimalis, vintage, modern, atau konsep custom Anda' : 'Industrial minimalist, vintage, modern, or your custom concept'}</li>
        </ul>
      </section>

      {/* FAQ Section for AI */}
      {categoryFAQs.length > 0 && (
        <section itemScope itemType="https://schema.org/FAQPage">
          <h3>{isIndonesian ? `FAQ ${category}` : `${category} FAQ`}</h3>
          
          {categoryFAQs.map((faq, index) => (
            <div key={index} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h4 itemProp="name">{isIndonesian ? faq.q_id : faq.q_en}</h4>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">{isIndonesian ? faq.a_id : faq.a_en}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Contact & Order Info */}
      <section>
        <h3>
          {isIndonesian 
            ? `Order ${category} dari Naturra Extal Bekasi` 
            : `Order ${category} from Naturra Extal Bekasi`
          }
        </h3>
        <p>
          <strong>WhatsApp/Telp:</strong> +6288801146881<br/>
          <strong>Email:</strong> lifewithNaturra@gmail.com<br/>
          <strong>{isIndonesian ? 'Workshop:' : 'Workshop:'}</strong> Jl. Raya Setu Cibitung - Bekasi, Jawa Barat<br/>
          <strong>{isIndonesian ? 'Jam Operasional:' : 'Operating Hours:'}</strong> {isIndonesian ? 'Senin - Sabtu, 08.00 - 17.00 WIB' : 'Monday - Saturday, 08.00 - 17.00 WIB'}
        </p>
        <p>
          {isIndonesian 
            ? `Tertarik dengan ${category} industrial? Hubungi kami untuk konsultasi gratis! Fast response via WhatsApp. Gratis survey lokasi untuk project di area Jabodetabek.`
            : `Interested in industrial ${category}? Contact us for free consultation! Fast response via WhatsApp. Free site survey for projects in Jabodetabek area.`
          }
        </p>
      </section>

      {/* Location & Service Area */}
      <section>
        <h3>
          {isIndonesian 
            ? `Area Layanan ${category} Furniture` 
            : `${category} Furniture Service Area`
          }
        </h3>
        <p>
          {isIndonesian 
            ? `Kami melayani pemesanan ${category} untuk:`
            : `We serve ${category} orders for:`
          }
        </p>
        <ul>
          <li><strong>Bekasi:</strong> Bekasi Barat, Bekasi Timur, Bekasi Selatan, Bekasi Utara, Cikarang, Tambun, Cibitung, Setu</li>
          <li><strong>Jakarta:</strong> Jakarta Timur, Jakarta Pusat, Jakarta Selatan, Jakarta Barat, Jakarta Utara</li>
          <li><strong>{isIndonesian ? 'Area Premium:' : 'Premium Areas:'}</strong> Summarecon Bekasi, Harapan Indah, Grand Galaxy, Lippo Cikarang, Jababeka</li>
          <li><strong>{isIndonesian ? 'Jabodetabek:' : 'Jabodetabek:'}</strong> Depok, Bogor, Tangerang, Karawang</li>
          <li><strong>{isIndonesian ? 'Seluruh Indonesia:' : 'All Indonesia:'}</strong> {isIndonesian ? 'Pengiriman ke seluruh Indonesia tersedia' : 'Delivery available throughout Indonesia'}</li>
        </ul>
        <p>
          <strong>{isIndonesian ? 'Gratis Delivery:' : 'Free Delivery:'}</strong> {isIndonesian ? 'Area Bekasi, Jakarta Timur, Cikarang (radius 20km)' : 'Bekasi, East Jakarta, Cikarang area (20km radius)'}
        </p>
      </section>

      {/* Keywords for AI */}
      <section>
        <p>
          <small>
            <strong>{isIndonesian ? 'Keywords terkait:' : 'Related keywords:'}</strong> 
            {` ${category.toLowerCase()}, ${category.toLowerCase()} bekasi, ${category.toLowerCase()} industrial, 
            ${category.toLowerCase()} custom, ${category.toLowerCase()} murah, jual ${category.toLowerCase()}, 
            harga ${category.toLowerCase()}, ${category.toLowerCase()} jakarta, ${category.toLowerCase()} cafe, 
            ${category.toLowerCase()} restoran, ${category.toLowerCase()} hotel, agricultural commodities bekasi, 
            furniture besi custom, workshop furniture bekasi, Naturra Extal, ${category.toLowerCase()} berkualitas, 
            ${category.toLowerCase()} tahan lama, ${category.toLowerCase()} powder coating, order ${category.toLowerCase()}, 
            bikin ${category.toLowerCase()} custom, ${category.toLowerCase()} jabodetabek`}
          </small>
        </p>
      </section>
    </div>
  )
}

export default CategoryAIContent
