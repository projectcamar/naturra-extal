import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './NaturraFooter.css'

const SEO_LINKS = [
    "Blog Archive",
    "Tips Memilih Furniture Industrial untuk Cafe Modern",
    "Keunggulan Furniture Besi Custom vs Ready Stock",
    "Inspirasi Desain Interior Industrial Minimalis 2025",
    "Cara Merawat Furniture Besi Agar Tetap Awet dan Berkualitas",
    "Tren Furniture Cafe dan Restoran Tahun 2025",
    "Mengapa Memilih Furniture Lokal Buatan Indonesia",
    "Desain Meja Bar Industrial untuk Ruang Terbatas",
    "Kombinasi Kayu dan Besi untuk Furniture Modern",
    "Furniture Outdoor Tahan Cuaca untuk Area Teras",
    "Panduan Budget Furniture Cafe untuk Pemula",
    "Finishing Furniture Besi: Powder Coating vs Cat Biasa",
    "7 Kesalahan Umum Saat Membeli Furniture Industrial",
    "Sofa Cafe Industrial Minimalis untuk Konsep Modern",
    "Meja Bar Industrial untuk Cafe dan Restoran",
    "Kursi Bar Industrial dengan Desain Modern",
    "Rak Display Industrial untuk Retail dan Cafe",
    "Meja Makan Industrial untuk Restoran Modern",
    "Furniture Outdoor Industrial Tahan Cuaca",
    "Daybed Industrial untuk Area Lounge Modern",
    "Meja Kerja Industrial untuk Kantor Modern",
    "Rak Buku Industrial untuk Perpustakaan Modern",
    "Furniture Industrial Custom untuk Hotel",
    "Furniture Industrial Murah untuk Startup",
    "Furniture Industrial Bekasi Terpercaya",
    "Furniture Industrial Custom Design",
    "Furniture Industrial Harga Pabrik",
    "Furniture Industrial Garansi Kualitas",
    "Furniture Industrial Workshop Bekasi",
    "Furniture Industrial Material Berkualitas",
    "Furniture Industrial Finishing Powder Coating",
    "Furniture Industrial Layanan Profesional",
    "Furniture Industrial Pengalaman 25 Tahun",
    "Furniture Industrial 1000 Klien Puas",
    "Furniture Industrial Custom Design Terpercaya",
    "Inspirasi Desain Kafe Industrial Minimalis: 7 Furniture Wajib Punya",
    "Harga Furniture Industrial Terbaru 2025 (Lengkap untuk Kafe & Kantor)",
    "Panduan Lengkap Memilih Furniture Industrial untuk Restoran",
    "7 Model Meja Industrial Terlaris untuk Kantor Modern",
    "Tren Desain Interior Industrial Scandinavian 2025",
    "Hollowline Display Rack: Solusi Storage Industrial Modern Terbaik",
    "Display Shelf Rack Industrial untuk Retail dan Cafe Modern",
    "Stall Chair Design: Inspirasi Kursi Bar Industrial Terbaik",
    "Meja Cafe Murah Harga Terbaru 2025 - Kualitas Premium",
    "Kursi Bar Cafe Murah Bekasi Ready Stock - Harga Terjangkau",
    "Furniture Cafe Murah Bekasi Harga Pabrik - Workshop Langsung",
    "Meja Makan Cafe Industrial Minimalis Murah - Set dengan Kursi",
    "Display Rack Cafe Murah Industrial Besi - Hollowline Model",
    "Bar Set Cafe Murah Outdoor Industrial - Steelframe Model",
    "Furniture Industrial Harga Murah Jakarta Bekasi - Pengalaman 25 Tahun",
    "Meja Kerja Cafe Murah Industrial dengan Rak Buku - Multifungsi",
    "Kitchen Cabinet Cafe Murah Industrial Besi - Custom Design",
    "Outdoor Furniture Cafe Murah Tahan Cuaca - Industrial Style",
    "Jual Meja Kafe Industrial Modern - Harga Terbaik 2025",
    "Meja Kafe Bulat Industrial - Desain Unik untuk Cafe Modern",
    "Meja Kursi Kafe Set Industrial - Solusi Lengkap Cafe",
    "Model Kursi Meja Kafe Industrial - Inspirasi Terbaru",
    "Harga Bikin Meja Kafe Murah - Custom Design Terjangkau",
    "Meja dan Kursi untuk Kafe Murah Tapi Bagus - Rekomendasi Terbaik",
    "Meja Kursi Kafe Murah - Solusi Budget Terbatas",
    "Furniture Kafe Industrial - Panduan Lengkap Pemilihan",
    "Furnitur untuk Kafe - Tips Memilih yang Tepat",
    "Furniture Kafe 2 Lantai Sederhana Modern - Inspirasi Desain",
    "Furniture Kafe Buku - Konsep Cafe Literasi Modern",
    "Furniture untuk Kafe Bergaya Industrial Vintage - Panduan Lengkap",
    "Kafe dengan Furniture Paling Unik - Inspirasi Kreatif",
    "Perhitungan Furniture Kafe - Panduan Budget dan Layout",
    "Industrial Cafe Furniture - Tren Terbaru 2025",
    "Furniture Besi Custom Bekasi: Workshop Terpercaya dengan Pengalaman 25 Tahun",
    "Industrial Furniture Bekasi: Harga Pabrik, Kualitas Premium, Workshop Langsung",
    "Furniture Cafe Industrial Bekasi: Desain Custom Modern untuk Bisnis F&B",
    "Workshop Furniture Besi Bekasi: Produksi Langsung, Custom Design, Harga Kompetitif",
    "Jual Furniture Industrial Jakarta Bekasi Terlengkap - Harga Pabrik",
    "Meja Makan Besi Custom Bekasi: Industrial Minimalis untuk Cafe & Restoran",
    "Meja Cafe Industrial Besi Custom Bekasi - Melayani Jabodetabek",
    "Furniture Besi Hotel Custom: Desain Eksklusif, Kualitas Premium",
    "Bikin Furniture Besi Custom Jabodetabek Berkualitas - Workshop Naturra Extal",
    "Furniture Besi untuk Restoran: Solusi Industrial Modern Berkualitas",
    "Inspirasi Furniture Industrial untuk Cafe Kecil: Desain Minimalis Maksimal",
    "Desain Interior Industrial Besi dan Kayu: Kombinasi Harmonis Modern",
    "Meja Bar Industrial Minimalis: Desain Compact untuk Cafe Modern",
    "Desain Ruang Makan Industrial dengan Furniture Besi: Panduan Lengkap",
    "Contoh Furniture Cafe Industrial Buatan Lokal Indonesia Berkualitas",
    "Furniture Besi Cocok untuk Konsep Vintage Cafe: Tips Styling",
    "Desain Meja Industrial Besi Hollow Modern: Model Terbaru 2025",
    "Koleksi Furniture Industrial Terbaru 2025 dari Naturra Extal",
    "Apa Itu Furniture Industrial? Panduan Lengkap untuk Pemula",
    "Kenapa Furniture Besi Lebih Awet dari Kayu? Perbandingan Lengkap",
    "Perbandingan Furniture Besi vs Kayu untuk Cafe & Restoran",
    "Cara Merawat Furniture Besi Supaya Gak Berkarat dan Tetap Awet",
    "Proses Pembuatan Furniture Besi Custom di Workshop: Behind The Scene",
    "Tips Memilih Furniture Besi untuk Restoran: Panduan Profesional",
    "Trend Desain Industrial 2025: Furniture Modern untuk Bisnis",
    "Jenis Finishing Furniture Besi: Powder Coating, Cat Duco, Elektrostatic",
    "Furniture Industrial Bekasi Barat: Custom Berkualitas untuk Cafe & Restoran",
    "Furniture Cafe Bekasi Timur: Melayani Jatiasih, Pekayon, Aren Jaya",
    "Furniture Besi Bekasi Selatan: Kayuringin, Margajaya, Jakasetia",
    "Furniture Industrial Bekasi Utara: Harapan Indah, Summarecon, Pejuang",
    "Furniture Cafe Cikarang Barat: Lippo Cikarang, Cibatu, Telaga Murni",
    "Furniture Restoran Cikarang Utara: Karang Asih, Simpangan, Sukamaju",
    "Furniture Industrial Cikarang Selatan: Jababeka, Greenland, Pasirsari",
    "Furniture Hotel Cikarang Timur: Serang Baru, Karangreja, Jayamukti",
    "Furniture Cafe Cikarang Pusat: Taman Galaxy, Lemahabang, Hegarmukti",
    "Furniture Industrial Tambun Selatan: Sertajaya, Mangunjaya, Lambangjaya",
    "Furniture Custom Tambun Utara: Satria Jaya, Karang Satria, Wanasari",
    "Furniture Cafe Pondok Gede: Jatiwaringin, Jatibening, Jatiraden",
    "Furniture Restoran Mustika Jaya: Mustikasari, Pedurenan, Cimuning",
    "Furniture Industrial Rawalumbu: Bojong Rawalumbu, Sepanjang Jaya",
    "Furniture Cafe Medan Satria: Kali Baru, Pejuang, Harapan Baru",
    "Furniture Cafe Summarecon Bekasi: Premium Mall Area - Custom Design",
    "Furniture Industrial Harapan Indah: Residential & Commercial Area",
    "Furniture Cafe Grand Galaxy City Bekasi: Superblok F&B Area",
    "Furniture Restoran Galaxy Bekasi: Mall Tenant & Foodcourt Specialist",
    "Furniture Industrial Kemang Pratama Bekasi: Premium Residential Area",
    "Furniture Industrial Jababeka Cikarang: Kawasan Pabrik & Corporate",
    "Furniture Cafe Lippo Cikarang: Mall & Commercial District",
    "Furniture Industrial Deltamas Cikarang: Mixed-Use Development",
    "Furniture Cafe EJIP Cikarang: East Jakarta Industrial Park Area",
    "Furniture Restoran Greenland Cikarang: Commercial & Residential",
    "Furniture Cafe Kota Harapan Indah Bekasi: Cluster Commercial Area",
    "Furniture Industrial Margahayu Bekasi Timur: Residential & F&B",
    "Furniture Cafe Kaliabang Bekasi Utara Tengah: Area Komersial",
    "Furniture Restoran Kayuringin Jaya Bekasi Selatan: F&B Specialist",
    "Furniture Cafe Pekayon Jaya Bekasi Selatan: Commercial District",
    "Furniture Industrial Jakasampurna Bekasi Barat: Custom Workshop",
    "Furniture Cafe Kranji Bekasi Barat: Pinggir Jakarta Border",
    "Furniture Restoran Bintara Bekasi Barat: Commercial Area",
    "Furniture Industrial Karawang: Workshop Terdekat dari Bekasi",
    "Furniture Cafe Cibitung Bekasi: Kawasan Industri & Pabrik",
    "Furniture Industrial Setu Bekasi: Workshop Langsung - Harga Pabrik",
    "Furniture Cafe Metland Transyogi Cileungsi: Commercial Area",
    "Furniture Industrial Jakarta Timur: Perbatasan Bekasi - Fast Delivery",
    "Furniture Cafe Jakarta Pusat: CBD & Office Building Specialist",
    "Furniture Restoran Jakarta Selatan: Premium F&B Area",
    "Furniture Cafe Depok: Workshop Terdekat dari Bekasi",
    "Furniture Industrial Bogor: Workshop Bekasi Melayani Area Bogor",
    "Rahasia Cafe Hits di Jakarta, Bandung, Bali: Furniture Industrial yang Bikin Pelanggan Betah",
    "Cafe 24 Jam Jakarta & Bekasi: Furniture Tahan Lama untuk Operasional Non-Stop",
    "Cafe Alam: Outdoor Furniture Industrial Tahan Cuaca Tropis Indonesia",
    "Cafe Sekitar Saya: Strategi Furniture untuk Menarik Pelanggan Lokal",
    "Nama Cafe Unik: Branding dengan Furniture Industrial untuk Konsep Kuat",
    "Cafe BSD Serpong: Furniture Industrial untuk Area Premium & Modern",
    "Cafe Sentul Bogor: Furniture Konsep Alam-Industrial Tropical Modern",
    "Cafe Depok Margonda UI: Furniture Student-Friendly dengan Budget Terjangkau",
    "Cafe Jakarta Selatan Kemang SCBD: Furniture Premium Industrial Chic",
    "Cafe Bandung Dago Riau: Furniture Instagrammable yang Bikin Hits",
    "Cafe Bali Canggu Seminyak: Furniture Tropical Industrial Beach Vibes",
    "Cafe Surabaya Galaxy Pakuwon: Furniture Modern Spacious & Comfortable",
    "Cafe Jogja Prawirotaman Malioboro: Furniture Vintage Industrial Heritage",
    "Cafe Malang Batu: Furniture Mountain View Industrial dengan Pemandangan",
    "Cafe Bogor Puncak: Furniture Sejuk Highland Industrial Cool Climate",
    "Cafe Medan: Furniture Spacious untuk Culture Nongkrong Sumatera",
    "Cafe Semarang: Furniture Compact Efficient untuk Mall & Ruko",
    "Cafe Makassar: Furniture Coastal Industrial Sulawesi Beach Style",
    "Cafe Terdekat dari Saya: Furniture Strategy Menjadi Pilihan Lokal Pertama",
    "Menu Cafe & Furniture: Bagaimana Furniture Mendukung Pengalaman Kuliner",
    "The Cafe Konsep Minimalis: Furniture \"Less is More\" yang Powerful",
    "Jasa Furniture Industrial Minimalis Murah Bekasi - Berkualitas Premium",
    "Jual Meja Cafe Modern Minimalis Murah - Berkualitas Jakarta Bekasi",
    "Kursi Resto Modern Minimalis Murah - Berkualitas Harga Terbaik 2025",
    "Furniture Cafe Minimalis Modern Murah - Jasa Custom Berkualitas",
    "Meja Resto Industrial Modern Minimalis Murah - Berkualitas Premium",
    "Jasa Bikin Furniture Cafe Custom Minimalis Murah Bekasi - Workshop Langsung",
    "Furniture Resto Modern Minimalis Murah - Jual Berkualitas Harga Terbaik",
    "Display Rack Cafe Modern Minimalis Murah - Berkualitas Industrial",
    "Bar Set Cafe Modern Minimalis Murah - Jasa Custom Berkualitas",
    "Kitchen Cabinet Resto Modern Minimalis Murah - Berkualitas Custom",
    "Jual Furniture Industrial Modern Minimalis Murah Jakarta Bekasi",
    "Meja Kursi Cafe Modern Minimalis Murah - Set Berkualitas Harga Terbaik",
    "Jasa Furniture Resto Custom Modern Minimalis Murah - Berkualitas",
    "Outdoor Furniture Cafe Modern Minimalis Murah - Berkualitas Tahan Cuaca",
    "Rak Display Resto Modern Minimalis Murah - Jual Berkualitas Industrial",
    "Meja Kerja Cafe Modern Minimalis Murah - Berkualitas Multifungsi",
    "Jasa Buat Furniture Cafe Custom Modern Minimalis Murah Bekasi",
    "Kursi Bar Cafe Modern Minimalis Murah - Jual Berkualitas Industrial",
    "Furniture Kantin Industrial Modern Minimalis Murah - Berkualitas",
    "Meja Makan Resto Modern Minimalis Murah - Set Berkualitas Lengkap",
    "Jasa Furniture Hotel Custom Modern Minimalis Murah - Berkualitas Premium",
    "Rak Buku Cafe Modern Minimalis Murah - Jual Berkualitas Industrial",
    "Daybed Cafe Modern Minimalis Murah - Berkualitas Lounge Area",
    "Jasa Furniture Kantor Industrial Modern Minimalis Murah - Berkualitas",
    "Sofa Bench Cafe Modern Minimalis Murah - Jual Berkualitas Industrial",
    "Meja Coffee Cafe Modern Minimalis Murah - Berkualitas Industrial",
    "Jasa Furniture Cafe Custom Minimalis Modern Murah Bekasi Jakarta",
    "Furniture Mall Cafe Resto Modern Minimalis Murah - Berkualitas",
    "Rak Gantung Cafe Modern Minimalis Murah - Jual Berkualitas Industrial",
    "Jasa Furniture Besi Custom Modern Minimalis Murah Jabodetabek",
    "Indonesian Industrial Furniture Export: Quality Meets Global Standards",
    "Custom Metal Furniture Manufacturer Indonesia - Export Worldwide",
    "Wholesale Industrial Furniture Indonesia - Bulk Orders & Export",
    "Indonesian Furniture Factory: Custom Commercial Furniture Export",
    "Metal Furniture Supplier Indonesia - Export to Hotels & Restaurants",
    "Indonesia Industrial Furniture Manufacturer - OEM & ODM Export",
    "Export Quality Restaurant Furniture - Indonesia Manufacturer",
    "Indonesian Furniture Exporter Bekasi - Factory Direct Pricing",
    "Custom Hospitality Furniture Indonesia - Export Hotels Worldwide",
    "Industrial Metal Furniture Indonesia - Powder Coating Export",
    "Indonesia Furniture Manufacturer - Container Pricing & Export",
    "Cafe Furniture Manufacturer Indonesia - Export International",
    "Indonesian Steel Furniture Supplier - Export Quality Assurance",
    "Outdoor Furniture Manufacturer Indonesia - Weather Resistant Export",
    "Furniture Factory Bekasi Indonesia - Export for International Buyers",
    "Indonesian Furniture Exporter - FOB & CIF Pricing International",
    "Commercial Furniture Supplier Indonesia - Export Documentation",
    "Indonesia Metal Furniture Factory - Custom Design Export",
    "Wholesale Restaurant Furniture Indonesia - Bulk Order Export",
    "Indonesian Furniture Manufacturer - Sustainable Export Quality",
    "Furniture Outdoor Industrial - Beli di Bekasi Jakarta",
    "Patio Furniture Industrial Custom di Bekasi - Harga Terbaik",
    "Beli Heavy Duty Commercial Outdoor Furniture di Bekasi",
    "Custom Patio Furniture Besi Industrial Jakarta - Desain Khusus",
    "Cafe Patio Outdoor Furniture Industrial Bekasi - Inspirasi Desain",
    "Gaya Patio Industrial - Furniture Outdoor Inspirasi Desain 2025",
    "Patio Jakarta - Furniture Industrial Custom untuk Area Outdoor",
    "Patio Bekasi - Furniture Outdoor Industrial dari Workshop Lokal",
    "Inspirasi Furniture Outdoor Industrial untuk Patio Cafe",
    "Cafe Patio Furniture Besi Industrial Murah Jakarta",
    "Furniture Outdoor Tahan Hujan Industrial Bekasi - Kualitas Premium",
    "Custom Patio Set Besi Industrial Jakarta Bekasi - Desain Khusus",
    "Gaya Industrial Modern - Furniture Outdoor Patio Inspirasi",
    "Furniture Outdoor Commercial Heavy Duty Bekasi - Tahan Lama",
    "Tips Memilih Patio Furniture Industrial Outdoor - Panduan Lengkap",
    "Industrial Outdoor Furniture Indonesia - Export Quality",
    "Patio Furniture Manufacturer Indonesia - Custom Export",
    "Buy Heavy Duty Commercial Outdoor Furniture from Indonesia",
    "Custom Patio Furniture Indonesia - Export Manufacturer",
    "Cafe Patio Outdoor Furniture - Industrial Style Indonesia",
    "Industrial Patio Furniture - Style & Inspiration Design",
    "Outdoor Furniture Indonesia - Weather Resistant for Tropical Climate",
    "Commercial Outdoor Furniture Indonesia - Bulk Order Export",
    "Patio Furniture Set Indonesia - Custom Manufacturer",
    "Industrial Metal Outdoor Furniture Indonesia - Powder Coating",
    "Cafe Outdoor Furniture Indonesia - Export Manufacturer",
    "Patio Furniture Inspiration - Industrial Design Trends 2025",
    "Outdoor Furniture Manufacturer Indonesia - Factory Direct",
    "Heavy Duty Outdoor Furniture Indonesia - Export Quality",
    "Custom Outdoor Furniture Indonesia - Design & Manufacturing",
    "Industrial Dining Tables Export Quality from Indonesia",
    "Metal Bar Stools Indonesia - Manufacturer & Exporter",
    "Industrial Lounge Furniture Indonesia - Export Quality",
    "Industrial Storage Solutions - Metal Shelving Export",
    "Custom Metal Furniture Manufacturing in Indonesia",
    "Industrial Kitchen Cabinets - Commercial Export",
    "Outdoor Bar Sets - Weather Resistant from Indonesia",
    "Industrial Daybed Frames - Metal Furniture Export",
    "Metal Display Racks - Retail Furniture from Indonesia",
    "Industrial Work Tables - Office Furniture Export",
    "Metal Coat Racks - Commercial Furniture Indonesia",
    "Industrial Bookshelf - Metal Frame Export from Indonesia",
    "Balcony Furniture - Space-Saving Designs from Indonesia",
    "Steel Frame Furniture Manufacturer in Indonesia",
    "Industrial Bench Seating - Commercial Furniture",
    "Hospitality Furniture Supplier Indonesia - Export",
    "Restaurant Furniture Indonesia - Wholesale Export",
    "Cafe Furniture Wholesale - Indonesia Manufacturer",
    "Industrial Furniture for Hotels - Contract Furniture",
    "Powder Coating Metal Furniture - Professional Finishing",
    "Custom Order Process for International Buyers",
    "مصنع الأثاث المعدني المخصص - طلبات حسب الطلب من إندونيسيا",
    "印尼工业家具出口商 - 定制制造商直销",
    "パティオ家具メーカー - インドネシアからの輸出",
    "Fabricante de Muebles de Estantería - Producción Interna en Indonesia",
    "Exportateur de Mobilier Sur Mesure - Fabricant Indonésien",
    "산업용 랙 제조업체 - 인도네시아 수출 전문",
    "مصدر أثاث الباحات - طلبات مخصصة من إندونيسيا",
    "内部定制家具制造商 - 印尼一站式生产",
    "ディスプレイラックメーカー - インドネシア輸出専門",
    "Soluciones Completas de Mobiliario - Exportador de Indonesia",
    "Panduan Pengadaan Furniture Industrial untuk Proyek Pemerintah & Fasilitas Publik",
    "Strategi Pengadaan Furniture Cafe & Restoran di Jabodetabek",
    "Custom Order Furniture Kolam Renang & Fasilitas Hotel",
    "Pengadaan Furniture Kantor Modern di Jakarta, Bekasi, dan Bandung",
    "Panduan Lengkap Custom Order Furniture Industrial untuk Proyek Jabodetabek",
    "如何为咖啡厅选择工业风家具：完整选购指南2025",
    "定制工业家具的优势与选择指南：为什么选择定制家具",
    "工业风铁艺家具保养完整指南：让您的家具历久如新",
    "نصائح لاختيار أثاث صناعي لمقهى عصري",
    "定制工业家具相比成品家具的优势：为何选择定制",
    "産業風家具を使ったモダンなインテリアデザインのインスピレーション",
    "Cómo Mantener Muebles Metálicos Industriales Duraderos y de Calidad",
    "Tendances du Mobilier pour Cafés et Restaurants en 2025",
    "현대 카페용 공업용 가구의 장점: 왜 공업용 가구를 선택해야 하는가",
    "Indonesian Industrial Furniture Exporter Manufacturer - SVLK Certified Non-Illegal Logging",
    "印尼工业家具出口制造商 - SVLK认证非非法采伐",
    "インドネシア産業家具輸出メーカー - SVLK認証非違法伐採",
    "Exportateur Fabricant de Mobilier Industriel Indonésien - Certifié SVLK Non-Exploitation Forestière Illégale",
    "Indonesian Furniture Manufacturer Export - Sustainable Wood Sourcing with SVLK Certification",
    "印尼家具制造商出口 - SVLK认证的可持续木材采购",
    "インドネシア家具メーカー輸出 - SVLK認証による持続可能な木材調達",
    "Fabricant de Mobilier Indonésien Export - Approvisionnement en Bois Durable avec Certification SVLK",
    "Panduan Memilih Furnitur Komersial di Seluruh Jabodetabek",
    "Naturra Extal: Your SVLK-Certified Furniture Solution",
    "Furniture Cafe Berkualitas",
    "Mengapa Memilih Naturra Extal untuk Furniture Komersial Anda?",
    "Furniture Industri di Indonesia: Tren & Strategi Bisnis",
    "مانجالا ليفينج هي الحل الأفضل",
    "Tips Memilih Furniture Teak",
    "新加坡咖啡馆露台家具教育",
    "Hollowline Indonesia Berkualitas",
    "Meubles Indonésiens",
    "Meubles Industriels",
    "Meubles industriels pour cafés",
    "Jual Meja Cafe Industrial untuk Coffee Shop di Bekasi",
    "Jasa Custom Order Furniture Besi di Bekasi & Jakarta",
    "Panduan Memilih Furniture Cafe Industrial Tahan Lama & Hemat",
    "Naturra Extal: Indonesia's Leading Furniture Manufacturer & Exporter",
    "How to Choose the Best Indonesian Furniture Manufacturer",
    "Wujudkan Impian Furnitur Anda!",
    "Cara Memilih Furniture Industrial untuk Cafe",
    "Wujudkan Furniture Impian Anda!",
    "Pilih Produsen Mebel Indonesia Terbaik",
    "How to Choose the Best Indonesian Furniture Manufacturer",
    "Industrial Bar Chair Tips",
    "Industrial Bar Tables",
    "Hollow Steel Bar Guide",
    "Cafe Terbaik di Sekitar Jakarta",
    "Meja Hollow Galvanis Jakarta",
    "Meja Pipeline Industri",
    "Furniture Teakwood Bekasi",
    "Furniture Cafe Terbaik",
    "Supplier Furniture Cafe dengan Produk Lengkap",
    "Furniture Industri Indonesia: Panduan Lengkap untuk Bisnis Anda",
    "Indonesia Industrial Furniture: A Complete Guide",
    "Indonesia Industrial Furniture: Complete Guide & Design Tips",
    "Industrial Furniture Indonesia: Complete Guide & Design Tips",
    "Lounge Set Furniture Guide",
    "Bar Set Design Tips for Commercial Spaces",
    "How to Export Furniture from Indonesia to Worldwide",
    "Industrial Furniture Manufacturer From Indonesia",
    "Top Indonesia Custom Furniture Makers for Your Business",
    "Complete Guide to Interior Contractors and Furniture Manufacturing",
    "Wholesale Indonesia Furniture",
    "Coffee Shop Wood",
    "Kayu Terbaik untuk Coffee Shop: Pilihan Material yang Tepat",
    "Pilihan Kayu Terbaik",
    "Tips Pilih Supplier Furniture Kafe",
    "Guía para escalar socialmente",
    "Dokumen Wajib Impor Furniture dari Indonesia 2026",
    "Dokumen Ekspor Bersertifikat BNSP: Panduan Lengkap"
]

const NaturraFooter: React.FC = () => {
    const [subName, setSubName] = useState('')
    const [subEmail, setSubEmail] = useState('')
    const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!subName || !subEmail) return

        setSubStatus('loading')
        // Simulate API call
        setTimeout(() => {
            setSubStatus('success')
            setSubName('')
            setSubEmail('')
        }, 1000)
    }

    return (
        <footer className="naturra-footer">
            <div className="naturra-footer__main">
                {/* Brand Column */}
                <div className="naturra-footer__brand">
                    <div className="naturra-footer__brand-logo">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="22" fill="#004D2C" />
                            <path d="M24 8C24 8 16 14 16 22C16 26 18 30 22 32L22 38H26L26 32C30 30 32 26 32 22C32 14 24 8 24 8Z" fill="#fff" opacity="0.9" />
                            <path d="M24 12C24 12 19 17 19 23C19 26 20.5 28.5 23 30L23 36H25L25 30C27.5 28.5 29 26 29 23C29 17 24 12 24 12Z" fill="#004D2C" opacity="0.4" />
                            <circle cx="24" cy="20" r="2.5" fill="#fff" />
                        </svg>
                        <span className="naturra-footer__brand-name">NATURRA EXTAL</span>
                    </div>
                    <p className="naturra-footer__brand-desc">
                        Leaders in Indonesian agricultural commodity trading. We connect premium Indonesian farmers with global markets, specializing in cocoa, cloves, and cocopeat.
                    </p>
                    <span className="naturra-footer__brand-legal">CV Naturra Extal International</span>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="naturra-footer__col-title">Company</h4>
                    <div className="naturra-footer__col-links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/custom-order">Custom Order</Link>
                        <Link to="/partnership">Partnership</Link>
                    </div>
                </div>

                {/* Products */}
                <div>
                    <h4 className="naturra-footer__col-title">Our Products</h4>
                    <div className="naturra-footer__col-links">
                        <Link to="/products">Cocoa Powder</Link>
                        <Link to="/products">Cengkeh (Cloves)</Link>
                        <Link to="/products">Cocopeat</Link>
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="naturra-footer__col-title">Contact Us</h4>
                    <div className="naturra-footer__contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <a href="mailto:naturraextal@gmail.com">naturraextal@gmail.com</a>
                    </div>
                    <div className="naturra-footer__contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <a href="https://wa.me/628951395752" target="_blank" rel="noopener noreferrer">+62 895-1395-7752</a>
                    </div>
                    <div className="naturra-footer__contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>Indonesia</span>
                    </div>
                </div>

                {/* Newsletter Subscribe */}
                <div className="naturra-footer__subscribe">
                    <h4 className="naturra-footer__col-title">Newsletter</h4>
                    <p className="naturra-footer__subscribe-desc">Subscribe to receive market updates and exclusive offers on our commodities.</p>
                    <form className="naturra-footer__form" onSubmit={handleSubscribe}>
                        <div className="naturra-footer__form-group">
                            <input
                                type="text"
                                placeholder="First Name"
                                required
                                value={subName}
                                onChange={e => setSubName(e.target.value)}
                            />
                        </div>
                        <div className="naturra-footer__form-group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                value={subEmail}
                                onChange={e => setSubEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" disabled={subStatus === 'loading'} className={`naturra-footer__submit ${subStatus}`}>
                            {subStatus === 'loading' ? 'Subscribing...' : subStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
                        </button>
                    </form>
                </div>
            </div>

            {/* SEO Archive Accordion */}
            <div className="naturra-footer__seo">
                <div className="naturra-footer__seo-inner">
                    <details className="naturra-footer__seo-details">
                        <summary>Explore Our Blog Archive & Industry Resources</summary>
                        <div className="naturra-footer__seo-grid">
                            {SEO_LINKS.map((link, idx) => (
                                <Link key={idx} to={`/blog?tag=${encodeURIComponent(link)}`} className="naturra-footer__seo-link">
                                    {link}
                                </Link>
                            ))}
                        </div>
                    </details>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="naturra-footer__bottom">
                <span className="naturra-footer__copyright">
                    © {new Date().getFullYear()} CV Naturra Extal International. All rights reserved.
                </span>
                <div className="naturra-footer__bottom-links">
                    <Link to="/terms-of-service">Terms of Service</Link>
                    <Link to="/shipping">Shipping Info</Link>
                    <Link to="/image-license">Image License</Link>
                </div>
            </div>
        </footer>
    )
}

export default NaturraFooter
