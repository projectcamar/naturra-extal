import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { Diamond, DollarSign, Globe, Wrench } from 'lucide-react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { generateFAQSchema, generateLocalBusinessStructuredData } from '../utils/structuredData'
import { getFAQBySlug } from '../data/faq'
// Premium Agricultural Commodity Images
const heroImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80'
const showroomImage = 'https://images.unsplash.com/photo-1516053303028-569806443c52?w=1200'
import logoILW from '../assets/LOGO-ILW-800.png'
import logoSVLK from '../assets/SVLK-LOGO-INDONESIA.png'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import './About.css'

type AboutTranslation = {
  meta: { title: string; description: string; keywords: string }
  hero: { title: string; imageAlt: string; imageTitle: string }
  message: { title: string; paragraphs: string[]; imageAlt: string }
  showrooms: {
    title: string
    intro: string
    description: string
    workshopHeading: string
    button: string
    workshopLabel: string
  }
  whyChoose: {
    title: string
    items: Array<{ title: string; description: string }>
  }
  certifications: {
    title: string
    subtitle: string
    items: Array<{ name: string; description: string; imageAlt: string }>
  }
}

const ABOUT_TRANSLATIONS: Record<LanguageCode, AboutTranslation> = {
  en: {
    meta: {
      title: 'About Naturra Extal: Premium Indonesian Agricultural Commodities Since 1999',
      description:
        'Who is Naturra Extal? Trusted exporter of premium Indonesian agricultural commodities since 1999. Specialists in Cocoa Powder, Indonesian Cloves, and Cocopeat Media for global markets. Why choose Naturra? 25 years of experience, direct factory sourcing, export-quality certification, and global supply chain expertise.',
      keywords:
        'about Naturra Extal, agricultural commodities exporter, cocoa powder supplier, indonesian cloves exporter, cocopeat block manufacturer'
    },
    hero: {
      title: 'About Us',
      imageAlt:
        'About Naturra Extal - Premium Agricultural Commodities Exporter Since 1999',
      imageTitle: 'Naturra Extal - 25+ Years of Excellence in Agricultural Commodity Export'
    },
    message: {
      title: 'Message from Naturra',
      paragraphs: [
        "Since 1999, Naturra Extal has been Indonesia's premier exporter specializing in premium agricultural commodities. With 25 years of experience, we've successfully fulfilled bulk orders for businesses across the globe, including major markets in the USA, Europe, Japan, and the Middle East—making us the best partner for your commodity needs.",
        'Our network spans the lush agricultural regions of Indonesia, sourcing only the finest Cocoa, Cloves, and raw materials for Cocopeat. Each product undergoes rigorous quality control to ensure it meets international export standards.',
        'We specialize in bulk supply and customized logistics to meet our clients\' specific requirements. Whether you need industrial-grade cocoa powder, hand-picked cloves, or sustainable growing media, our team delivers exactly what your industry requires.'
      ],
      imageAlt: 'Naturra Extal Agricultural Facility'
    },
    showrooms: {
      title: 'Our Facility',
      intro:
        'Visit our industrial facility in Bekasi to explore our processing capabilities and discuss your bulk order needs:',
      description:
        'Our facility offers a complete processing and logistics hub dedicated to export-quality agricultural commodities. Our experienced team can discuss your specifications and help you find the most efficient supply solutions for your global business.',
      workshopHeading: 'Processing Facility Bekasi',
      button: 'View Location',
      workshopLabel: 'Facility Bekasi:'
    },
    whyChoose: {
      title: 'Why Choose Naturra?',
      items: [
        {
          title: 'Export Quality',
          description: '25 years of experience with top-tier processing techniques and export-grade agricultural standards.'
        },
        {
          title: 'Direct Source Pricing',
          description: 'We source directly from farmers and manage our own processing—eliminating middlemen for the best value.'
        },
        {
          title: 'Custom Logistics',
          description:
            "We provide flexible shipping and packaging solutions. We'll bring the best of Indonesia to your international doorstep."
        },
        {
          title: 'Global Supply Network',
          description:
            'Serving bulk buyers worldwide across the food, beverage, and horticultural industries with consistent premium supply.'
        }
      ]
    },
    certifications: {
      title: 'Certified Sustainability',
      subtitle:
        'Every Naturra Extal shipment follows strict agricultural protocols and sustainable farming practices that meet international export regulations.',
      items: [
        {
          name: 'Global GAP Standards',
          description:
            'Our sourcing partners are verified for Good Agricultural Practices, ensuring safety and quality for every shipment.',
          imageAlt: 'Global GAP certification badge'
        },
        {
          name: 'SVLK Legal Sourcing',
          description:
            'Official sustainability certification that guarantees traceability and responsible environmental practices across our supply chain.',
          imageAlt: 'Sustainability certification badge'
        }
      ]
    }
  },
  id: {
    meta: {
      title: 'Tentang Naturra Extal: Eksportir Komoditas Pertanian Indonesia Sejak 1999',
      description:
        'Siapa Naturra Extal? Eksportir komoditas pertanian Indonesia terpercaya sejak 1999. Spesialis Bubuk Kakao, Cengkeh, dan Cocopeat untuk pasar global. Kenapa memilih Naturra? Pengalaman 25 tahun, sumber langsung dari petani, sertifikasi kualitas ekspor, dan keahlian rantai pasok global.',
      keywords:
        'tentang Naturra Extal, eksportir komoditas pertanian, supplier bubuk kakao, eksportir cengkeh indonesia, produsen cocopeat block'
    },
    hero: {
      title: 'Tentang Kami',
      imageAlt:
        'Tentang Naturra Extal - Eksportir Komoditas Pertanian Premium Sejak 1999',
      imageTitle: 'Tentang Naturra Extal - 25+ Tahun Pengalaman Ekspor Komoditas Pertanian'
    },
    message: {
      title: 'Pesan dari Naturra',
      paragraphs: [
        'Sejak 1999, Naturra Extal telah menjadi eksportir terkemuka di Indonesia yang berspesialisasi dalam komoditas pertanian premium. Dengan pengalaman 25 tahun, kami telah melayani berbagai pesanan curah untuk bisnis di seluruh dunia.',
        'Jaringan kami meliputi wilayah pertanian subur di Indonesia, memasok Kakao, Cengkeh, dan bahan baku Cocopeat terbaik. Setiap produk melewati kontrol kualitas ketat untuk memastikan standar ekspor internasional terpenuhi.',
        'Kami menerima permintaan curah dan kebutuhan logistik khusus untuk memenuhi spesifikasi klien. Baik Anda membutuhkan bubuk kakao grade industri, cengkeh pilihan, maupun media tanam berkelanjutan, tim kami mampu memberikan persis apa yang bisnis Anda butuhkan.'
      ],
      imageAlt: 'Fasilitas Pertanian Naturra Extal'
    },
    showrooms: {
      title: 'Fasilitas Kami',
      intro:
        'Kunjungi fasilitas industri kami di Bekasi untuk melihat kapabilitas pemrosesan dan diskusikan kebutuhan pesanan curah Anda:',
      description:
        'Fasilitas kami dilengkapi pusat pemrosesan dan logistik lengkap untuk komoditas pertanian kualitas ekspor. Tim berpengalaman siap membantu menemukan solusi pasokan terbaik untuk bisnis global Anda.',
      workshopHeading: 'Fasilitas Pemrosesan Bekasi',
      button: 'Lihat Lokasi',
      workshopLabel: 'Fasilitas Bekasi:'
    },
    whyChoose: {
      title: 'Mengapa Pilih Naturra?',
      items: [
        {
          title: 'Kualitas Ekspor',
          description: '25 tahun pengalaman dengan teknik pemrosesan tingkat tinggi dan standar komoditas internasional.'
        },
        {
          title: 'Harga Sumber Langsung',
          description: 'Kami mengambil langsung dari petani dan mengelola pemrosesan sendiri—tanpa tengkulak untuk nilai terbaik.'
        },
        {
          title: 'Logistik Kustom',
          description: 'Kami menyediakan solusi pengiriman dan pengemasan fleksibel. Kami bawa hasil bumi terbaik Indonesia ke pintu Anda.'
        },
        {
          title: 'Jaringan Pasokan Global',
          description: 'Melayani pembeli curah di seluruh dunia untuk industri makanan, minuman, dan hortikultura secara konsisten.'
        }
      ]
    },
    certifications: {
      title: 'Keberlanjutan Terverifikasi',
      subtitle:
        'Setiap pengiriman Naturra Extal mengikuti protokol pertanian ketat dan praktik tani berkelanjutan yang memenuhi regulasi ekspor.',
      items: [
        {
          name: 'Standar Global GAP',
          description:
            'Mitra sumber kami diverifikasi untuk Praktik Pertanian yang Baik, memastikan keamanan dan kualitas setiap pengiriman.',
          imageAlt: 'Logo Global GAP'
        },
        {
          name: 'Legal Wood & Sustainability Sourcing',
          description:
            'Sertifikasi keberlanjutan resmi yang menjamin keterlacakan dan praktik lingkungan bertanggung jawab di rantai pasok kami.',
          imageAlt: 'Logo Sertifikasi Keberlanjutan'
        }
      ]
    }
  },
  ar: {
    meta: {
      title: 'حول Naturra Extal: مصدر متميز للسلع الزراعية الإندونيسية منذ عام 1999',
      description:
        'من هي Naturra Extal؟ مصدر موثوق للسلع الزراعية الإندونيسية المتميزة منذ عام 1999. متخصصون في مسحوق الكاكاو، والقرنفل الإندونيسي، ووسط كوكوبيت للأسواق العالمية. لماذا تختار Naturra؟ 25 عامًا من الخبرة، توريد مباشر من المصنع، شهادة جودة التصدير، وخبرة في سلسلة التوريد العالمية.',
      keywords:
        'حول Naturra Extal, مصدر سلع زراعية, مورد مسحوق كاكاو, مصدر قرنفل إندونيسي, مصنع قوالب كوكوبيت'
    },
    hero: {
      title: 'من نحن',
      imageAlt: 'حول Naturra Extal - مصدر متميز للسلع الزراعية منذ عام 1999',
      imageTitle: 'Naturra Extal - أكثر من 25 عامًا من التميز في تصدير السلع الزراعية'
    },
    message: {
      title: 'رسالة من Naturra',
      paragraphs: [
        'منذ عام 1999، تعد Naturra Extal المصدر الرائد في إندونيسيا المتخصص في السلع الزراعية المتميزة. مع 25 عامًا من الخبرة، نجحنا في تلبية الطلبات الكبيرة للشركات في جميع أنحاء العالم، بما في ذلك الأسواق الرئيسية في الولايات المتحدة وأوروبا واليابان والشرق الأوسط - مما يجعلنا الشريك الأفضل لاحتياجاتك من السلع.',
        'تمتد شبكتنا عبر المناطق الزراعية الخصبة في إندونيسيا، حيث نوفر أجود أنواع الكاكاو والقرنفل والمواد الخام للكوكوبيت. يخضع كل منتج لرقابة صارمة على الجودة لضمان تلبية معايير التصدير الدولية.',
        'نحن متخصصون في التوريد بالجملة والخدمات اللوجستية المخصصة لتلبية المتطلبات المحددة لعملائنا. سواء كنت بحاجة إلى مسحوق كاكاو من الدرجة الصناعية، أو قرنفل منتقى يدويًا، أو وسائط زراعية مستدامة، فإن فريقنا يقدم بالضبط ما تتطلبه صناعتك.'
      ],
      imageAlt: 'مرفق Naturra Extal الزراعي'
    },
    showrooms: {
      title: 'مرفقنا',
      intro:
        'زر مرفقنا الصناعي في بيكاسي لاستكشاف قدراتنا في المعالجة ومناقشة احتياجات طلباتك بالجملة:',
      description:
        'يوفر مرفقنا مركزًا متكاملاً للمعالجة والخدمات اللوجستية مخصصًا للسلع الزراعية عالية الجودة للتصدير. يمكن لفريقنا الخبير مناقشة مواصفاتك ومساعدتك في العثور على أكثر حلول التوريد كفاءة لعملك العالمي.',
      workshopHeading: 'مرفق المعالجة في بيكاسي',
      button: 'عرض الموقع',
      workshopLabel: 'مرفق بيكاسي:'
    },
    whyChoose: {
      title: 'لماذا تختار Naturra؟',
      items: [
        {
          title: 'جودة التصدير',
          description: '25 عامًا من الخبرة في تقنيات المعالجة عالية المستوى ومعايير السلع الزراعية المخصصة للتصدير.'
        },
        {
          title: 'تسعير المصدر المباشر',
          description: 'نحصل على المواد مباشرة من المزارعين وندير المعالجة الخاصة بنا - مما يلغي الوسائط للحصول على أفضل قيمة.'
        },
        {
          title: 'لوجستيات مخصصة',
          description: 'نحن نقدم حلول شحن وتغليف مرنة. سنجلب أفضل ما في إندونيسيا إلى عتبة داركم الدولية.'
        },
        {
          title: 'شبكة توريد عالمية',
          description: 'خدمة المشترين بالجملة في جميع أنحاء العالم عبر صناعات الأغذية والمشروبات والبستنة بإمدادات متميزة ومتسقة.'
        }
      ]
    },
    certifications: {
      title: 'الاستدامة المعتمدة',
      subtitle:
        'تتبع كل شحنة من Naturra Extal بروتوكولات زراعية صارمة وممارسات زراعية مستدامة تلبي لوائح التصدير الدولية.',
      items: [
        {
          name: 'معايير Global GAP',
          description: 'يتم التحقق من شركائنا في التوريد للممارسات الزراعية الجيدة، مما يضمن السلامة والجودة لكل شحنة.',
          imageAlt: 'شارة شهادة Global GAP'
        },
        {
          name: 'توريد قانوني ومستدام',
          description: 'شهادة استدامة رسمية تضمن إمكانية التتبع والممارسات البيئية المسؤولة عبر سلسلة التوريد الخاصة بنا.',
          imageAlt: 'شارة شهادة الاستدامة'
        }
      ]
    }
  },
  zh: {
    meta: {
      title: '关于 Naturra Extal：自1999年起的优质印尼农业大宗商品出口商',
      description:
        'Naturra Extal 是谁？自1999年以来值得信赖的印尼优质农业大宗商品出口商。专注于为全球市场提供可可粉、印尼丁香和椰糠基质。选择 Naturra 的理由：25年行业经验、工厂直接货源、出口质量认证以及全球供应链专业知识。',
      keywords:
        '关于 Naturra Extal, 农业大宗商品出口商, 可可粉供应商, 印尼丁香出口商, 椰糠块制造商'
    },
    hero: {
      title: '关于我们',
      imageAlt: '关于 Naturra Extal - 自1999年起的优质农业大宗商品出口商',
      imageTitle: 'Naturra Extal - 超过25年的农业大宗商品出口卓越经验'
    },
    message: {
      title: '来自 Naturra 的寄语',
      paragraphs: [
        '自1999年以来，Naturra Extal 一直是印尼领先的优质农业大宗商品出口商。凭借25年的经验，我们已成功为全球各地的企业完成大宗订单，包括美国、欧洲、日本和中东等主要市场，是您大宗商品需求的理想合作伙伴。',
        '我们的网络覆盖印尼肥沃的农业产区，搜寻最优质的可可、丁香和椰糠原料。每件产品都经过严格的质量控制，以确保符合国际出口标准。',
        '我们专注于大宗供应和定制化物流方案，以满足客户的特定需求。无论您需要工业级可可粉、精选丁香还是可持续生长的培养基，我们的团队都能精确呈现您的业务所需。'
      ],
      imageAlt: 'Naturra Extal 农业设施'
    },
    showrooms: {
      title: '我们的设施',
      intro: '欢迎到访我们位于贝卡西的工业设施，了解我们的加工能力并讨论您的大宗订单需求：',
      description:
        '我们的设施配备完善的加工与物流中心，专注打造出口级的农业大宗商品。经验丰富的团队乐于了解您的规格要求，为您的全球业务寻找最高效的供应方案。',
      workshopHeading: '贝卡西加工设施',
      button: '查看位置',
      workshopLabel: '贝卡西设施：'
    },
    whyChoose: {
      title: '为什么选择 Naturra？',
      items: [
        {
          title: '出口品质',
          description: '25年行业经验，采用顶级加工技术与出口级农业标准。'
        },
        {
          title: '直接货源价格',
          description: '我们直接从农民手中采购并自主管理加工——无中间商成本，保障最优质的价格。'
        },
        {
          title: '定制物流',
          description: '我们提供灵活的运输和包装方案。我们将把印尼最优质的产品送到您的国际家门口。'
        },
        {
          title: '全球供应网络',
          description: '为全球食品、饮料和园艺行业的大宗买家提供持续的高端供应。'
        }
      ]
    },
    certifications: {
      title: '认证可持续性',
      subtitle: 'Naturra Extal 的每一批货物均遵循严格的农业规程和符合国际出口法规的可持续耕作方式。',
      items: [
        {
          name: 'Global GAP 标准',
          description: '我们的采购伙伴均经过良好农业操作规范验证，确保每一批货物的安全与品质。',
          imageAlt: 'Global GAP 认证徽章'
        },
        {
          name: '合法与可持续采购',
          description: '官方可持续性认证，保障我们供应链的可追溯性与环境责任实践。',
          imageAlt: '可持续性认证徽章'
        }
      ]
    }
  },
  ja: {
    meta: {
      title: 'Naturra Extal について：1999年創業のインドネシア産高級農業大宗商品輸出商',
      description:
        'Naturra Extal とは？1999年創業、信頼のインドネシア産高級農業大宗商品輸出商。世界市場向けにココアパウダー、インドネシア産クローブ、ココピート基質を専門に提供。Naturra を選ぶ理由：25年の経験、工場直接仕入れ、輸出品質認証、グローバルなサプライチェーンの専門知識。',
      keywords:
        'Naturra Extal について, 農業大宗商品輸出商, ココアパウダー供給元, インドネシア産クローブ輸出商, ココピートブロック製造元'
    },
    hero: {
      title: '私たちについて',
      imageAlt: 'Naturra Extal について - 1999年創業の高級農業大宗商品輸出商',
      imageTitle: 'Naturra Extal - 農業大宗商品輸出における25年以上の卓越した経験'
    },
    message: {
      title: 'Naturra からのメッセージ',
      paragraphs: [
        '1999年以来、Naturra Extal はインドネシアを代表する高級農業大宗商品の輸出商です。25年の経験を持ち、米国、欧州、日本、中東を含む主要なグローバル市場でバルク注文を成功させてきました。お客様の商品ニーズにおける最適なパートナーです。',
        '私たちのネットワークはインドネシアの肥沃な農業地帯に広がり、最高級のココア、クローブ、ココピート原料を仕入れています。すべての製品は、国際的な輸出基準を満たすよう、厳格な品質管理を経て出荷されます。',
        'お客様の特定の要件に応えるため、バルク供給とカスタマイズされた物流を専門としています。工業用グレードのココアパウダー、厳選されたクローブ、サステナブルな栽培基質など、お客様の業界が求めるものを正確にお届けします。'
      ],
      imageAlt: 'Naturra Extal 農業施設'
    },
    showrooms: {
      title: '私たちの施設',
      intro: 'ベカシの工業施設にぜひお越しください。加工能力をご覧いただき、バルク注文についてご相談ください。',
      description:
        '施設には、輸出品質の農業大宗商品を専門に扱う加工・物流拠点が整っており、経験豊富なチームが世界的なビジネスに最適な提案をいたします。',
      workshopHeading: 'ベカシ加工施設',
      button: '場所を見る',
      workshopLabel: 'ベカシ施設：'
    },
    whyChoose: {
      title: 'Naturra が选ばれる理由',
      items: [
        {
          title: '輸出クオリティ',
          description: '25年の経験と最高水準の加工技術、輸出グレードの農業基準を維持しています。'
        },
        {
          title: '直接仕入れ価格',
          description: '農家から直接仕入れ、自社で加工管理を行うため、中間コストがなく高品質な商品を適正価格で提供します。'
        },
        {
          title: 'カスタム物流',
          description: '柔軟な配送・梱包ソリューションを提供します。インドネシアの最高な産物を世界のお客様の元へ届けます。'
        },
        {
          title: '世界的な供給網',
          description: '食品、飲料、園芸業界における世界中のバルクバイヤーに対し、安定した高級供給を行っています。'
        }
      ]
    },
    certifications: {
      title: '認証済みサステナビリティ',
      subtitle:
        'Naturra Extal の出荷はすべて、国際的な輸出規制を満たす厳格な農業プロトコルと持続可能な農法に基づいています。',
      items: [
        {
          name: 'Global GAP 基準',
          description: 'すべての出荷において安全性と品質を保証するため、供給パートナーは適正農業規範（GAP）の検証を受けています。',
          imageAlt: 'Global GAP 認証バッジ'
        },
        {
          name: '合法的かつ持続可能な調達',
          description: 'サプライチェーンにおけるトレーサビリティと責任ある環境慣行を保証する公式のサステナビリティ認証を受けています。',
          imageAlt: 'サステナビリティ認証バッジ'
        }
      ]
    }
  },
  es: {
    meta: {
      title: 'Sobre Naturra Extal: Exportador de Materias Primas Agrícolas de Indonesia desde 1999',
      description:
        '¿Quién es Naturra Extal? Exportador de confianza de materias primas agrícolas de Indonesia desde 1999. Especialistas en cacao en polvo, clavos de olor y sustrato de cocopeat para mercados globales. ¿Por qué elegir Naturra? 25 años de experiencia, abastecimiento directo de fábrica, certificación de calidad de exportación y experiencia en la cadena de suministro global.',
      keywords:
        'sobre Naturra Extal, exportador de materias primas agrícolas, proveedor de cacao en polvo, exportador de clavos de olor, fabricante de bloques de cocopeat'
    },
    hero: {
      title: 'Sobre nosotros',
      imageAlt: 'Sobre Naturra Extal - Exportador de materias primas agrícolas premium desde 1999',
      imageTitle: 'Naturra Extal - Más de 25 años de excelencia en la exportación de materias primas agrícolas'
    },
    message: {
      title: 'Mensaje de Naturra',
      paragraphs: [
        'Desde 1999, Naturra Extal es el principal exportador de Indonesia especializado en materias primas agrícolas premium. Con 25 años de experiencia, hemos cumplido con éxito pedidos al por mayor para empresas de todo el mundo, incluidos los principales mercados de EE. UU., Europa, Japón y Oriente Medio, lo que nos convierte en el mejor socio para sus necesidades de materias primas.',
        'Nuestra red cubre las exuberantes regiones agrícolas de Indonesia, obteniendo solo el mejor cacao, clavos de olor y materias primas para cocopeat. Cada producto se somete a un riguroso control de calidad para garantizar que cumple con los estándares internacionales de exportación.',
        'Nos especializamos en el suministro al por mayor y logística personalizada para satisfacer los requisitos específicos de nuestros clientes. Ya sea que necesite cacao en polvo de grado industrial, clavos de olor seleccionados a mano o sustratos de cultivo sostenibles, nuestro equipo ofrece exactamente lo que su industria requiere.'
      ],
      imageAlt: 'Instalación agrícola de Naturra Extal'
    },
    showrooms: {
      title: 'Nuestra instalación',
      intro:
        'Visite nuestra instalación industrial en Bekasi para conocer nuestras capacidades de procesamiento y analizar sus necesidades de pedidos al por mayor:',
      description:
        'Nuestra instalación ofrece un centro completo de procesamiento y logística dedicado a materias primas agrícolas de calidad de exportación. Nuestro experimentado equipo puede analizar sus especificaciones y ayudarlo a encontrar las soluciones de suministro más eficientes para su negocio global.',
      workshopHeading: 'Planta de procesamiento Bekasi',
      button: 'Ver ubicación',
      workshopLabel: 'Planta Bekasi:'
    },
    whyChoose: {
      title: '¿Por qué elegir Naturra?',
      items: [
        {
          title: 'Calidad de exportación',
          description: '25 años de experiencia con técnicas de procesamiento de primer nivel y estándares agrícolas de grado de exportación.'
        },
        {
          title: 'Precio de origen directo',
          description: 'Abastecemos directamente de los agricultores y gestionamos nuestro propio procesamiento, eliminando intermediarios para obtener el mejor valor.'
        },
        {
          title: 'Logística personalizada',
          description: 'Ofrecemos soluciones flexibles de envío y embalaje. Llevaremos lo mejor de Indonesia a su puerta internacional.'
        },
        {
          title: 'Red de suministro global',
          description: 'Atendemos a compradores al por mayor en todo el mundo en las industrias de alimentos, bebidas y horticultura con un suministro premium constante.'
        }
      ]
    },
    certifications: {
      title: 'Sostenibilidad certificada',
      subtitle:
        'Cada envío de Naturra Extal sigue estrictos protocolos agrícolas y prácticas de cultivo sostenibles que cumplen con las regulaciones internacionales de exportación.',
      items: [
        {
          name: 'Estándares Global GAP',
          description: 'Nuestros socios de abastecimiento están verificados para Buenas Prácticas Agrícolas, garantizando la seguridad y calidad de cada envío.',
          imageAlt: 'Insignia de certificación Global GAP'
        },
        {
          name: 'Abastecimiento legal y sostenible',
          description: 'Certificación oficial de sostenibilidad que garantiza la trazabilidad y las prácticas ambientales responsables en toda nuestra cadena de suministro.',
          imageAlt: 'Insignia de certificación de sostenibilidad'
        }
      ]
    }
  },
  fr: {
    meta: {
      title: 'À propos de Naturra Extal : Exportateur de matières premières agricoles indonésiennes depuis 1999',
      description:
        'Qui est Naturra Extal ? Exportateur de confiance de matières premières agricoles indonésiennes depuis 1999. Spécialistes du cacao en poudre, clous de girofle indonésiens et substrat cocopeat pour les marchés mondiaux. Pourquoi choisir Naturra ? 25 ans d’expérience, approvisionnement direct usine, certification qualité export et expertise en supply chain mondiale.',
      keywords:
        'à propos de Naturra Extal, exportateur de matières premières agricoles, fournisseur de cacao en poudre, exportateur de clous de girofle indonésien, fabricant de blocs de cocopeat'
    },
    hero: {
      title: 'À propos de nous',
      imageAlt: 'À propos de Naturra Extal - Exportateur de matières premières agricoles premium depuis 1999',
      imageTitle: 'Naturra Extal - Plus de 25 ans d’excellence dans l’exportation de matières premières agricoles'
    },
    message: {
      title: 'Message de Naturra',
      paragraphs: [
        "Depuis 1999, Naturra Extal est le principal exportateur d'Indonésie spécialisé dans les matières premières agricoles haut de gamme. Avec 25 ans d'expérience, nous avons servi avec succès des commandes en gros pour des entreprises du monde entier, y compris sur les marchés majeurs des États-Unis, de l'Europe, du Japon et du Moyen-Orient, ce qui fait de nous le meilleur partenaire pour vos besoins en matières premières.",
        'Notre réseau couvre Java, Sumatra et Sulawesi, produisant les meilleurs produits agricoles. Notre poudre de cacao, nos clous de girofle et notre cocopeat répondent aux normes internationales grâce à un contrôle qualité strict.',
        "Nous sommes spécialisés dans la fourniture en gros et la logistique personnalisée pour nos clients. Que vous ayez besoin de cacao industriel, de clous de girofle sélectionnés ou de cocopeat durable, notre équipe livre exactement ce dont votre industrie a besoin."
      ],
      imageAlt: 'Installation agricole de Naturra Extal'
    },
    showrooms: {
      title: 'Notre installation',
      intro:
        'Visitez notre installation industrielle à Bekasi pour découvrir nos capacités de traitement et discuter de vos besoins en commandes groupées :',
      description:
        'Notre installation offre un centre complet de traitement et de logistique dédié aux matières premières agricoles de qualité export. Notre équipe expérimentée peut analyser vos spécifications et vous aider à trouver les solutions d’approvisionnement les plus efficaces pour votre activité mondiale.',
      workshopHeading: 'Usine de traitement de Bekasi',
      button: 'Voir l’emplacement',
      workshopLabel: 'Usine de Bekasi :'
    },
    whyChoose: {
      title: 'Pourquoi choisir Naturra ?',
      items: [
        {
          title: 'Qualité export',
          description: '25 ans d’expérience, techniques de traitement haut de gamme et normes agricoles de grade export.'
        },
        {
          title: 'Prix direct source',
          description: 'Nous nous approvisionnons directement auprès des agriculteurs et gérons notre propre traitement—aucun intermédiaire pour une meilleure valeur.'
        },
        {
          title: 'Logistique personnalisée',
          description: 'Nous offrons des solutions flexibles d’expédition et d’emballage. Nous apportons le meilleur de l’Indonésie à votre porte internationale.'
        },
        {
          title: 'Réseau d’approvisionnement mondial',
          description: 'Nous servons les acheteurs en gros du monde entier dans les industries de l’alimentation, des boissons et de l’horticulture avec un approvisionnement premium constant.'
        }
      ]
    },
    certifications: {
      title: 'Durabilité certifiée',
      subtitle:
        'Chaque expédition de Naturra Extal suit des protocoles agricoles stricts et des pratiques agricoles durables conformes aux réglementations internationales d’exportation.',
      items: [
        {
          name: 'Normes Global GAP',
          description: 'Nos partenaires d’approvisionnement sont vérifiés pour leurs bonnes pratiques agricoles, garantissant la sécurité et la qualité de chaque expédition.',
          imageAlt: 'Badge Global GAP'
        },
        {
          name: 'Sourcing légal et durable',
          description: 'Certification officielle de durabilité garantissant la traçabilité et des pratiques environnementales responsables sur toute notre supply chain.',
          imageAlt: 'Badge de certification de durabilité'
        }
      ]
    }
  },
  ko: {
    meta: {
      title: 'Naturra Extal 소개: 1999년부터 인도네시아산 프리미엄 농산물 수출',
      description:
        'Naturra Extal은 어떤 곳인가요? 1999년부터 운영된 신뢰받는 인도네시아 프리미엄 농산물 수출업체입니다. 글로벌 시장을 위한 코코아 분말, 인도네시아산 정향, 코코피트 배지를 전문으로 취급합니다. Naturra를 선택해야 하는 이유: 25년의 경험, 농장 및 공장 직접 소싱, 수출 품질 인증 및 글로벌 공급망 전문성.',
      keywords:
        'Naturra Extal 소개, 농산물 수출업체, 코코아 분말 공급업체, 인도네시아 정향 수출, 코코피트 블록 제조'
    },
    hero: {
      title: '회사 소개',
      imageAlt: 'Naturra Extal 소개 - 1999년부터 운영 중인 프리미엄 농산물 수출업체',
      imageTitle: 'Naturra Extal - 25년 이상 농산물 수출 분야의 우수성 보유'
    },
    message: {
      title: 'Naturra의 메시지',
      paragraphs: [
        '1999년 이래 Naturra Extal은 인도네시아를 대표하는 프리미엄 농산물 수출업체로 성장했습니다. 25년의 경험을 통해 미국, 유럽, 일본, 중동 등 주요 글로벌 시장의 기업들에 대량 주문을 성공적으로 공급해 왔으며, 귀사의 원자재 요구사항을 위한 최적의 파트너가 되었습니다.',
        '우리는 인도네시아 전역의 비옥한 농업 지역 네트워크를 통해 최고급 코코아, 정향 및 코코피트 원료를 확보하고 있습니다. 모든 제품은 국제 수출 표준을 충족하도록 엄격한 품질 관리를 거칩니다.',
        '우리는 고객의 특정 요구사항을 충족하기 위한 벌크 공급 및 맞춤형 물류 솔루션을 전문으로 합니다. 산업용 등급의 코코아 분말, 엄선된 정향, 또는 지속 가능한 재배 배지 등 귀사에서 필요로 하는 최적의 솔루션을 제공합니다.'
      ],
      imageAlt: 'Naturra Extal 농업 시설'
    },
    showrooms: {
      title: '우리의 시설',
      intro: '베카시 공방을 방문하여 당사의 가공 역량을 확인하고 대량 주문 상담을 받아보세요.',
      description:
        '당사 시설은 수출 품질의 농산물 전문 가공 및 물류 허브를 갖추고 있습니다. 숙련된 팀이 귀사의 사양을 검토하고 글로벌 비즈니스를 위한 가장 효율적인 공급 솔루션을 제안해 드립니다.',
      workshopHeading: '베카시 가공 시설',
      button: '위치 확인',
      workshopLabel: '베카시 시설:'
    },
    whyChoose: {
      title: 'Naturra를 선택해야 하는 이유',
      items: [
        {
          title: '수출 등급 품질',
          description: '25년의 노하우와 최상급 가공 기술, 국제 수출용 농산물 표준을 준수합니다.'
        },
        {
          title: '생산지 직거래 가격',
          description: '농가에서 직접 수확하고 공장에서 직접 가공하여 유통 단계를 줄임으로써 최상의 가치를 제공합니다.'
        },
        {
          title: '고객 맞춤 물류',
          description: '유연한 배송 및 포장 솔루션을 제공합니다. 인도네시아 최고의 수확물을 전 세계 고객님의 문 앞까지 전달합니다.'
        },
        {
          title: '글로벌 공급 네트워크',
          description: '전 세계 식음료 및 원예 산업의 대량 구매 고객들에게 일관된 품질의 프리미엄 제품을 공급하고 있습니다.'
        }
      ]
    },
    certifications: {
      title: '인증된 지속가능성',
      subtitle: 'Naturra Extal의 모든 출하물은 국제 수출 규정을 충족하는 엄격한 농업 프로토콜과 지속 가능한 농법을 따릅니다.',
      items: [
        {
          name: 'Global GAP 표준',
          description: '당사의 소싱 파트너는 우수 농산물 관리 기준(GAP) 인증을 받아 모든 제품의 안전과 품질을 보장합니다.',
          imageAlt: 'Global GAP 인증 배지'
        },
        {
          name: '법적 및 지속 가능한 조싱',
          description: '공식 지속가능성 인증을 통해 공급망 전체의 추적 가능성과 환경적 책임을 보증합니다.',
          imageAlt: '지속가능성 인증 배지'
        }
      ]
    }
  }
}

const About: React.FC = () => {
  const location = useLocation()

  const [language, setLanguage] = useState<LanguageCode>(() => {
    return getCurrentLanguage(location.pathname, location.search)
  })

  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname, location.search)
    if (currentLang !== language) {
      setLanguage(currentLang)
    }
  }, [location.pathname, location.search, language])

  // IP detection for first visit (only if no stored preference)
  useEffect(() => {
    const stored = getStoredLanguage()
    const urlLang = getCurrentLanguage(location.pathname, location.search)

    if (stored || urlLang !== 'en') {
      return
    }

    const detectIP = async () => {
      const ipLang = await detectLanguageFromIP()
      if (ipLang && !stored) {
        setLanguage(ipLang)
      }
    }

    detectIP()
  }, [])

  const translations = ABOUT_TRANSLATIONS[language] ?? ABOUT_TRANSLATIONS.en
  const isIndonesian = language === 'id'

  const localBusinessSchema = generateLocalBusinessStructuredData()
  const faqData = getFAQBySlug('commodity-export-bekasi')
  const faqSchema = faqData ? generateFAQSchema(faqData.faqs) : null

  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  return (
    <div className="about-page">
      <Helmet
        htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': language }}
      >
        <title>{translations.meta.title}</title>
        <meta name="description" content={translations.meta.description} />
        <meta name="keywords" content={translations.meta.keywords} />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link
            key={`about-hreflang-${alternate.hrefLang}`}
            rel="alternate"
            hrefLang={alternate.hrefLang}
            href={alternate.href}
          />
        ))}
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:title" content={translations.meta.title} />
        <meta property="og:description" content={translations.meta.description} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <Header isIndonesian={isIndonesian} language={language} />

      <section className="about-hero">
        <div className="about-hero-image">
          <img
            src={heroImage}
            alt={translations.hero.imageAlt}
            title={translations.hero.imageTitle}
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
            itemProp="image"
            data-image-type="about-hero"
            data-category="about"
          />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-content">
          <h1 className="about-hero-title">{translations.hero.title}</h1>
        </div>
      </section>

      <section className="about-message-section">
        <div className="about-message-container">
          <div className="about-message-content">
            <div className="about-message-text">
              <h2 className="about-message-title">{translations.message.title}</h2>
              <div className="about-message-body">
                {translations.message.paragraphs.map((paragraph, index) => (
                  <p className="about-message-paragraph" key={`message-paragraph-${index}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="about-message-image-wrapper">
              <img src={showroomImage} alt={translations.message.imageAlt} className="about-message-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="showrooms-section">
        <div className="showrooms-container">
          <h2 className="showrooms-title">{translations.showrooms.title}</h2>
          <p className="showrooms-intro">{translations.showrooms.intro}</p>

          <div className="showrooms-locations">
            <div className="showroom-location">
              <h3>{translations.showrooms.workshopHeading}</h3>
              <p>
                <a href="https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9" target="_blank" rel="noopener noreferrer">
                  Jl. Raya Setu Cibitung - Bekasi, Telajung, Kec. Cikarang Bar., Kabupaten Bekasi, Jawa Barat 17320
                </a>
              </p>
              <p className="footer-phone">+6289513957752</p>
            </div>
          </div>

          <p className="showrooms-description">{translations.showrooms.description}</p>

          <div style={{ margin: '30px auto', maxWidth: 900 }}>
            <div
              style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 8 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4698705313735!2d107.04449967316903!3d-6.3331217619628015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699155096769b1%3A0x32e8009b574bfb5e!2sNaturra%20Living%20(Workshop)!5e0!3m2!1sen!2sid!4v1761932272164!5m2!1sen!2sid"
                width="600"
                height="450"
                style={{
                  border: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Naturra Extal Facility Map"
              ></iframe>
            </div>
          </div>

          <div className="showrooms-buttons">
            <a
              href="https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9"
              target="_blank"
              rel="noopener noreferrer"
              className="showroom-btn"
            >
              {translations.showrooms.button}
            </a>
          </div>
        </div>
      </section>

      <section className="certifications-section">
        <div className="certifications-container">
          <h2 className="certifications-title">{translations.certifications.title}</h2>
          <p className="certifications-subtitle">{translations.certifications.subtitle}</p>

          <div className="certifications-grid">
            {translations.certifications.items.map((item, index) => (
              <div className="certification-card" key={item.name}>
                <div className="certification-logo">
                  <img
                    src={index === 0 ? logoILW : logoSVLK}
                    alt={item.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width="180"
                    height="180"
                  />
                </div>
                <div className="certification-content">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why-choose-section">
        <div className="why-choose-container">
          <h2 className="why-choose-title">{translations.whyChoose.title}</h2>

          <div className="why-choose-grid">
            {translations.whyChoose.items.map((item) => (
              <div className="why-choose-item" key={item.title}>
                <div className="why-choose-icon">
                  {item.title === translations.whyChoose.items[0].title && <Diamond size={48} strokeWidth={1.5} />}
                  {item.title === translations.whyChoose.items[1].title && <DollarSign size={48} strokeWidth={1.5} />}
                  {item.title === translations.whyChoose.items[2].title && <Wrench size={48} strokeWidth={1.5} />}
                  {item.title === translations.whyChoose.items[3].title && <Globe size={48} strokeWidth={1.5} />}
                </div>
                <h3 className="why-choose-item-title">{item.title}</h3>
                <p className="why-choose-item-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer isIndonesian={isIndonesian} language={language} />
    </div>
  )
}

export default About


