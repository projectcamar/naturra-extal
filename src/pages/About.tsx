import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { Diamond, DollarSign, Globe, Wrench } from 'lucide-react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { generateFAQSchema, generateLocalBusinessStructuredData } from '../utils/structuredData'
import { getFAQBySlug } from '../data/faq'
import heroImage from '../assets/main-hero-image.webp'
import showroomImage from '../assets/Bench-corner-kursi-sudut-kursi-santai.webp'
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
      title: 'About Mangala Living: Custom Industrial Furniture Workshop Bekasi Since 1999 - 1000+ Projects',
      description:
        'Who is Mangala Living? Trusted custom steel furniture workshop in Bekasi since 1999 with 1000+ completed projects. Specialists in industrial furniture for cafes, restaurants, hotels—premium materials, powder-coating finish, factory-direct prices. Why choose Mangala? 25 years of experience, 800 m² modern workshop, free design consultation, 2-year warranty, serving Greater Jakarta.',
      keywords:
        'about mangala living, trusted furniture workshop bekasi, industrial furniture bekasi since 1999, custom steel furniture manufacturer, cafe furniture bekasi'
    },
    hero: {
      title: 'About Us',
      imageAlt:
        'About Mangala Living - Workshop Furniture Industrial Bekasi Since 1999 - Premium Quality Manufacturer',
      imageTitle: 'About Mangala Living - Industrial Furniture Manufacturer with 25+ Years Experience'
    },
    message: {
      title: 'Message from Mangala',
      paragraphs: [
        "Since 1999, Mangala Living has been Indonesia's premier manufacturer specializing in custom industrial scandinavian furniture. With 25 years of experience, we've proudly served over 1,000 orders from businesses across Indonesia, Jabodetabek, Jakarta, and major international markets including the USA, Japan, Australia, Singapore, Malaysia, Thailand, Vietnam, and the Philippines—making us the best partner for commercial furniture solutions.",
        'Our network spans the entire Indonesian archipelago, providing top-tier furniture solutions for coffee shops, restaurants, offices, hotels, co-working spaces, and retail projects. Each piece is crafted with precision manufacturing techniques and obsessive attention to detail.',
        'We fully embrace custom requests and collaborate closely with clients to bring their vision to life. Whether you need industrial dining sets, bar furniture, shelving systems, or unique bespoke pieces, our skilled craftsmen deliver exactly what your business requires.'
      ],
      imageAlt: 'Mangala Living Workshop'
    },
    showrooms: {
      title: 'Our Workshop',
      intro:
        'Visit our workshop in Bekasi to explore our industrial scandinavian furniture collection and discuss your custom order needs:',
      description:
        'Our workshop offers a complete manufacturing facility dedicated to custom industrial furniture. The experienced team can discuss your requirements and help you find the most suitable solutions for your coffee shop, restaurant, hotel, or office.',
      workshopHeading: 'Workshop Bekasi',
      button: 'Visit Workshop',
      workshopLabel: 'Workshop Bekasi:'
    },
    whyChoose: {
      title: 'Why Choose MANGALA?',
      items: [
        {
          title: 'Premium Quality',
          description: '25 years of experience with top-tier manufacturing techniques and industrial-grade materials.'
        },
        {
          title: 'Factory Direct Pricing',
          description: 'We produce everything in-house—no middlemen, only the best value for premium industrial furniture.'
        },
        {
          title: 'Fully Customizable',
          description:
            "We welcome every custom request. Share your vision and we'll bring it to life for your business."
        },
        {
          title: 'Nationwide Network',
          description:
            'Serving 1000+ businesses across Indonesia, Greater Jakarta, and key international markets including cafés, restaurants, hotels, and offices.'
        }
      ]
    },
    certifications: {
      title: 'Certified Sustainable Wood',
      subtitle:
        'Every Mangala Living project uses timber from audited partners that meet Indonesian forestry regulations and export documentation standards.',
      items: [
        {
          name: 'Legal Wood Sourcing (ILW)',
          description:
            'Verified suppliers provide complete legality documents and sustainable harvesting proof for every shipment we accept.',
          imageAlt: 'Legal Wood sourcing badge'
        },
        {
          name: 'SVLK Verified Supply Chain',
          description:
            'Official Sistem Verifikasi Legalitas Kayu certification that guarantees traceability, responsible logging, and export-ready compliance.',
          imageAlt: 'SVLK certification badge'
        }
      ]
    }
  },
  id: {
    meta: {
      title: 'Tentang Mangala Living: Workshop Furniture Besi Bekasi Sejak 1999 - 1000+ Project',
      description:
        'Siapa Mangala Living? Workshop furniture besi custom Bekasi terpercaya sejak 1999 dengan 1000+ project completed. Spesialis furniture industrial untuk cafe, restoran, hotel—material premium, finishing powder coating, harga pabrik langsung. Kenapa memilih Mangala? Pengalaman 25 tahun, workshop modern 800 m2, konsultasi desain gratis, garansi 2 tahun, melayani Jabodetabek.',
      keywords:
        'tentang mangala living, workshop furniture bekasi, furniture industrial bekasi, produsen furniture besi, custom furniture bekasi'
    },
    hero: {
      title: 'Tentang Kami',
      imageAlt:
        'Tentang Mangala Living - Workshop Furniture Industrial Bekasi Sejak 1999 - Produsen Premium',
      imageTitle: 'Tentang Mangala Living - Produsen Furniture Industrial Berpengalaman 25+ Tahun'
    },
    message: {
      title: 'Pesan dari Mangala',
      paragraphs: [
        'Sejak 1999, Mangala Living telah menjadi produsen furniture industrial scandinavian premium terkemuka di Indonesia. Dengan pengalaman 25 tahun, kami telah melayani lebih dari 1.000 pesanan dari bisnis di seluruh Indonesia, menjadikan kami pilihan terbaik untuk solusi furniture komersial.',
        'Jaringan kami meliputi seluruh kepulauan Indonesia, menyediakan solusi furniture berkualitas tinggi untuk cafe, restoran, kantor, hotel, co-working space, dan retail. Setiap produk dibuat dengan teknik manufaktur presisi dan perhatian terhadap detail.',
        'Kami menerima full custom request dan bekerja erat dengan klien untuk mewujudkan visi mereka. Baik Anda membutuhkan dining set industrial, furniture bar, sistem rak, maupun custom piece unik, pengrajin ahli kami mampu menciptakan persis apa yang bisnis Anda butuhkan.'
      ],
      imageAlt: 'Workshop Mangala Living'
    },
    showrooms: {
      title: 'Workshop Kami',
      intro:
        'Kunjungi workshop kami di Bekasi untuk melihat koleksi furniture industrial scandinavian dan diskusikan kebutuhan custom order Anda:',
      description:
        'Workshop kami dilengkapi fasilitas manufaktur lengkap untuk menciptakan furniture industrial custom. Tim berpengalaman siap mendiskusikan kebutuhan Anda dan membantu menemukan solusi terbaik untuk cafe, restoran, hotel, atau kantor Anda.',
      workshopHeading: 'Workshop Bekasi',
      button: 'Kunjungi Workshop',
      workshopLabel: 'Workshop Bekasi:'
    },
    whyChoose: {
      title: 'Mengapa Pilih MANGALA?',
      items: [
        {
          title: 'Kualitas Premium',
          description: '25 tahun pengalaman dengan teknik manufaktur berkualitas tinggi dan material industrial grade.'
        },
        {
          title: 'Harga Pabrik Langsung',
          description: 'Semua produk diproduksi in-house—tanpa tengkulak, hanya harga terbaik untuk furniture industrial berkualitas.'
        },
        {
          title: 'Sepenuhnya Custom',
          description: 'Kami menerima semua custom request. Ceritakan visi Anda dan kami wujudkan untuk bisnis Anda.'
        },
        {
          title: 'Jaringan Nasional',
          description: 'Melayani 1000+ bisnis di seluruh Indonesia hingga pasar internasional: cafe, restoran, hotel, kantor.'
        }
      ]
    },
    certifications: {
      title: 'Sertifikasi Kayu Legal',
      subtitle:
        'Setiap proyek Mangala Living menggunakan kayu dari mitra yang diaudit dan memenuhi regulasi kehutanan Indonesia beserta kelengkapan dokumen ekspor.',
      items: [
        {
          name: 'Legal Wood Sourcing (ILW)',
          description:
            'Pemasok terverifikasi memberikan dokumen legalitas lengkap dan bukti penebangan berkelanjutan untuk setiap pengiriman.',
          imageAlt: 'Logo Legal Wood'
        },
        {
          name: 'Rantai Pasok Tersertifikasi SVLK',
          description:
            'Sertifikasi Sistem Verifikasi Legalitas Kayu resmi yang menjamin keterlacakan, praktik logging bertanggung jawab, dan kesiapan dokumen ekspor.',
          imageAlt: 'Logo Sertifikasi SVLK'
        }
      ]
    }
  },
  ar: {
    meta: {
      title: 'نبذة عن Mangala Living: ورشة الأثاث الصناعي المخصص في بيكاسي منذ 1999 - أكثر من 1000 مشروع',
      description:
        'من هي Mangala Living؟ ورشة أثاث فولاذي مخصص موثوقة في بيكاسي منذ 1999 مع أكثر من 1000 مشروع منجز. متخصصون في الأثاث الصناعي للمقاهي والمطاعم والفنادق—مواد عالية الجودة، تشطيب بالبودرة، وأسعار المصنع. لماذا تختار Mangala؟ خبرة 25 سنة، ورشة حديثة بمساحة 800 م²، استشارة تصميم مجانية، ضمان لمدة عامين، نخدم منطقة جاكرتا الكبرى.',
      keywords:
        'Mangala Living, ورشة أثاث بيكاسي, أثاث صناعي مخصص, أثاث للمقاهي, ورشة أثاث منذ 1999, ضمان أثاث صناعي'
    },
    hero: {
      title: 'من نحن',
      imageAlt: 'نبذة عن Mangala Living - ورشة الأثاث الصناعي في بيكاسي منذ 1999 - جودة متميزة',
      imageTitle: 'نبذة عن Mangala Living - مصنع أثاث صناعي بخبرة تتجاوز 25 عامًا'
    },
    message: {
      title: 'رسالة من Mangala',
      paragraphs: [
        'منذ عام 1999، تعد Mangala Living الشركة الرائدة في إندونيسيا في تصنيع الأثاث الصناعي الاسكندنافي المخصص. بفضل خبرة تمتد 25 عامًا، نفخر بخدمة أكثر من 1,000 طلب من مختلف الأنشطة التجارية داخل إندونيسيا، ما يجعلنا الشريك الأفضل لحلول الأثاث التجاري.',
        'يشمل نطاق عملنا أنحاء الأرخبيل الإندونيسي، حيث نوفر حلول أثاث عالية الجودة للمقاهي والمطاعم والمكاتب والفنادق ومساحات العمل المشتركة ومتاجر التجزئة. كل قطعة نصنعها باستخدام تقنيات تصنيع دقيقة واهتمام كبير بالتفاصيل.',
        'نستقبل جميع الطلبات المخصصة ونعمل جنبًا إلى جنب مع عملائنا لتحويل رؤيتهم إلى حقيقة. سواء احتجت طقم طاولات صناعية أو أثاثًا للحانات أو أنظمة عرض أو قطعًا فريدة، فإن حرفيينا يصنعون ما يلائم نشاطك التجاري تمامًا.'
      ],
      imageAlt: 'ورشة Mangala Living'
    },
    showrooms: {
      title: 'ورشتنا',
      intro:
        'زر ورشتنا في بيكاسي للاطلاع على مجموعتنا من الأثاث الصناعي الاسكندنافي ولمناقشة احتياجاتك من الطلبات المخصصة:',
      description:
        'ورشتنا مجهزة بمرافق تصنيع متكاملة لصناعة الأثاث الصناعي المخصص. يمكن لفريقنا الخبير مناقشة احتياجاتك ومساعدتك في إيجاد الحل الأمثل لمقهىك أو مطعمك أو مكتبك.',
      workshopHeading: 'ورشة بيكاسي',
      button: 'زر الورشة',
      workshopLabel: 'ورشة بيكاسي:'
    },
    whyChoose: {
      title: 'لماذا تختار MANGALA؟',
      items: [
        {
          title: 'جودة متميزة',
          description: '25 عامًا من الخبرة باستخدام تقنيات تصنيع رفيعة المستوى ومواد صناعية متينة.'
        },
        {
          title: 'تسعير مباشر من المصنع',
          description: 'جميع منتجاتنا مصنّعة داخليًا—من دون وسطاء، ما يعني أفضل سعر لأثاث صناعي عالي الجودة.'
        },
        {
          title: 'قابل للتخصيص بالكامل',
          description: 'نرحب بكافة الطلبات المخصصة. شاركنا رؤيتك وسنحوّلها إلى واقع لنشاطك التجاري.'
        },
        {
          title: 'شبكة تغطي أنحاء البلاد',
          description: 'خدمة لأكثر من 1000 نشاط داخل إندونيسيا والأسواق الدولية، من المقاهي والمطاعم إلى الفنادق والمكاتب.'
        }
      ]
    },
    certifications: {
      title: 'اعتماد الأخشاب المستدامة',
      subtitle:
        'يستخدم كل مشروع من Mangala Living خشبًا من شركاء مدققين يلتزمون بلوائح الغابات الإندونيسية ومتطلبات التصدير.',
      items: [
        {
          name: 'توريد Legal Wood (ILW)',
          description:
            'يقدم المورّدون المعتمدون مستندات قانونية كاملة وإثبات حصاد مستدام لكل شحنة نستلمها.',
          imageAlt: 'شارة توريد Legal Wood'
        },
        {
          name: 'سلسلة توريد معتمدة SVLK',
          description:
            'شهادة نظام التحقق من شرعية الأخشاب (SVLK) الرسمية التي تضمن إمكانية التتبع، وممارسات قطع مسؤولة، واستعدادًا كاملاً للتصدير.',
          imageAlt: 'شارة اعتماد SVLK'
        }
      ]
    }
  },
  zh: {
    meta: {
      title: '关于 Mangala Living：自1999年起的贝卡西工业风定制家具工坊 - 超过1000个项目',
      description:
        'Mangala Living 是谁？创立于1999年的贝卡西定制钢制家具工坊，已完成1000多个项目。专注于为咖啡馆、餐厅、酒店提供工业风家具——高端材料、静电喷涂工艺、工厂直供价格。选择 Mangala 的理由：25年经验、800平方米现代化工坊、免费设计咨询、2年质保、服务雅加达大都会。',
      keywords:
        'Mangala Living, 贝卡西家具工坊, 工业风定制家具, 咖啡馆家具, 25年家具经验, 免费设计咨询'
    },
    hero: {
      title: '关于我们',
      imageAlt: '关于 Mangala Living - 自1999年来自贝卡西的工业风家具工坊 - 高端品质制造商',
      imageTitle: '关于 Mangala Living - 拥有25年以上经验的工业家具制造商'
    },
    message: {
      title: '来自 Mangala 的寄语',
      paragraphs: [
        '自1999年以来，Mangala Living 一直是印尼领先的工业风斯堪的纳维亚家具制造商。凭借25年的经验，我们已为印尼及国际市场（包括美国、日本、澳大利亚、新加坡、马来西亚、泰国、越南、菲律宾）完成超过1000个项目，是商业家具解决方案的理想合作伙伴。',
        '我们的服务网络覆盖整个印尼群岛，为咖啡馆、餐厅、办公室、酒店、联合办公空间和零售项目提供高品质家具。每一件作品都以精密的制造技术与对细节的专注打造。',
        '我们全面接受定制需求，并与客户紧密合作，将他们的构想变为现实。无论是工业风餐桌椅、吧台家具、陈列系统还是独特的定制作品，我们的工匠都能精确呈现您的业务所需。'
      ],
      imageAlt: 'Mangala Living 工坊'
    },
    showrooms: {
      title: '我们的工坊',
      intro:
        '欢迎到访贝卡西工坊，亲身体验我们的工业风斯堪的纳维亚家具，并与我们讨论您的定制需求：',
      description:
        '工坊配备完善的生产设施，专注打造工业风定制家具。经验丰富的团队乐于了解您的需求，为咖啡馆、餐厅或办公室找到最合适的解决方案。',
      workshopHeading: '贝卡西工坊',
      button: '参观工坊',
      workshopLabel: '贝卡西工坊：'
    },
    whyChoose: {
      title: '为什么选择 MANGALA？',
      items: [
        {
          title: '卓越品质',
          description: '25年行业经验，采用顶级制造技术与工业级材料。'
        },
        {
          title: '工厂直供价格',
          description: '全部产品自有生产，无中间商成本，保障高品质家具的优质价格。'
        },
        {
          title: '完全可定制',
          description: '我们欢迎所有定制需求。分享您的想法，我们将为您的业务实现。'
        },
        {
          title: '覆盖全国的服务网络',
          description: '服务印尼各地及主要国际市场的1000+企业：咖啡馆、餐厅、酒店、办公空间等。'
        }
      ]
    },
    certifications: {
      title: '认证可持续木材',
      subtitle: '每一个 Mangala Living 项目都使用经过审计的合作伙伴所提供的木材，符合印尼林业法规和出口文件标准。',
      items: [
        {
          name: 'Legal Wood 合法木材体系 (ILW)',
          description: '经认证的供应商为每一批木材提供完整合法文件与可持续采伐证明，确保原料可追溯。',
          imageAlt: 'Legal Wood 认证徽章'
        },
        {
          name: 'SVLK 验证供应链',
          description: '官方木材合法性验证体系，保障可追溯性、负责采伐以及满足出口要求。',
          imageAlt: 'SVLK 认证徽章'
        }
      ]
    }
  },
  ja: {
    meta: {
      title: 'Mangala Living について：1999年創業のベカシ工業系カスタム家具工房 - 1000件超の実績',
      description:
        'Mangala Living とは？1999年創業、1000件以上の実績を誇るベカシのカスタムスチール家具工房。カフェ・レストラン・ホテル向けの工業系家具を専門に、ハイグレード素材とパウダーコーティング仕上げ、工場直販価格で提供。Mangala を選ぶ理由：25年の経験、800㎡の最新工房、無料デザイン相談、2年保証、ジャカルタ首都圏にサービス提供。',
      keywords:
        'Mangala Living, ベカシ 家具工房, 工業系 カスタム家具, カフェ用家具, 1999年 創業工房, 無料デザイン相談'
    },
    hero: {
      title: '私たちについて',
      imageAlt:
        'Mangala Living について - 1999年創業のベカシ工業系家具工房 - 高品質メーカー',
      imageTitle: 'Mangala Living について - 25年以上の経験を持つ工業家具メーカー'
    },
    message: {
      title: 'Mangala からのメッセージ',
      paragraphs: [
        '1999年以来、Mangala Living はインドネシアを代表する工業系スカンジナビアン家具のカスタムメーカーです。25年の経験を持ち、国内外（米国、日本、オーストラリア、シンガポール、マレーシア、タイ、ベトナム、フィリピン）で1000件以上の案件を手掛け、商業用家具の最適なパートナーとして信頼を得てきました。',
        '私たちのネットワークはインドネシア全土に広がり、カフェ、レストラン、オフィス、ホテル、コワーキングスペース、小売店向けに高品質な家具ソリューションを提供しています。すべての製品を精密な製造技術と細部へのこだわりで仕上げています。',
        '全てのカスタムリクエストに対応し、お客様と共にビジョンを具現化します。工業風ダイニングセット、バー用家具、ディスプレイシステム、唯一無二の特注品まで、熟練のクラフトマンがビジネスニーズに寄り添った家具を製作します。'
      ],
      imageAlt: 'Mangala Living ワークショップ'
    },
    showrooms: {
      title: '私たちの工房',
      intro:
        'ベカシの工房にぜひお越しください。工業系スカンジナビアン家具のコレクションをご覧いただき、カスタムオーダーについてご相談ください。',
      description:
        '工房にはカスタム工業家具を製作するための設備が整っており、経験豊富なチームがカフェ、レストラン、ホテル、オフィスに最適なソリューションをご提案します。',
      workshopHeading: 'ベカシ工房',
      button: '工房を訪ねる',
      workshopLabel: 'ベカシ工房：'
    },
    whyChoose: {
      title: 'MANGALA が選ばれる理由',
      items: [
        {
          title: 'プレミアムクオリティ',
          description: '25年の経験と最高水準の製造技術、工業グレードの素材を使用しています。'
        },
        {
          title: '工場直販価格',
          description: 'すべて自社で製造するため中間コストがなく、高品質な家具を適正価格で提供します。'
        },
        {
          title: '完全カスタム対応',
          description: '全てのカスタムリクエストに応じます。ビジョンを共有いただければ、ビジネスに合わせて形にします。'
        },
        {
          title: '全国へ広がるサービス',
          description: 'インドネシア全国および主要国際市場で1000件以上の案件を手掛け、カフェ・レストラン・ホテル・オフィスをサポートしています。'
        }
      ]
    },
    certifications: {
      title: '認証済みサステナブルウッド',
      subtitle:
        'Mangala Living の家具はすべて、インドネシアの森林規制と輸出書類基準を満たす監査済みパートナーから仕入れた木材を使用しています。',
      items: [
        {
          name: 'Legal Wood ソーシング (ILW)',
          description:
            '認定サプライヤーが各ロットに対し、完全な合法性書類と持続可能な伐採証明を提供し、素材の追跡性を確保します。',
          imageAlt: 'Legal Wood 認証バッジ'
        },
        {
          name: 'SVLK 承認サプライチェーン',
          description:
            'インドネシア公式の木材合法性検証制度で、トレーサビリティと責任ある伐採、輸出要件への準拠を保証します。',
          imageAlt: 'SVLK 認証バッジ'
        }
      ]
    }
  },
  es: {
    meta: {
      title: 'Sobre Mangala Living: Taller de muebles industriales a medida en Bekasi desde 1999 - Más de 1000 proyectos',
      description:
        '¿Quién es Mangala Living? Taller de muebles de acero a medida en Bekasi desde 1999 con más de 1000 proyectos finalizados. Especialistas en muebles industriales para cafés, restaurantes y hoteles—materiales premium, acabado powder coating, precios directos de fábrica. ¿Por qué elegir Mangala? 25 años de experiencia, taller moderno de 800 m², asesoría de diseño gratuita, garantía de 2 años, servicio en Yakarta y alrededores.',
      keywords:
        'Mangala Living, taller de muebles Bekasi, muebles industriales a medida, muebles para café, taller desde 1999'
    },
    hero: {
      title: 'Sobre nosotros',
      imageAlt:
        'Sobre Mangala Living - Taller de muebles industriales en Bekasi desde 1999 - Fabricante de alta calidad',
      imageTitle: 'Sobre Mangala Living - Fabricante de muebles industriales con 25 años de experiencia'
    },
    message: {
      title: 'Mensaje de Mangala',
      paragraphs: [
        'Desde 1999, Mangala Living es el fabricante líder en Indonesia especializado en mobiliario industrial de estilo escandinavo a medida. Con 25 años de experiencia y más de 1.000 pedidos atendidos en Indonesia y mercados internacionales (Estados Unidos, Japón, Australia, Singapur, Malasia, Tailandia, Vietnam, Filipinas), somos el socio ideal para soluciones de mobiliario comercial.',
        'Nuestra red cubre todo el archipiélago indonesio, ofreciendo soluciones de alta calidad para cafés, restaurantes, oficinas, hoteles, espacios de coworking y comercios. Cada pieza se fabrica con técnicas precisas y máximo cuidado en cada detalle.',
        'Aceptamos pedidos totalmente personalizados y trabajamos codo a codo con nuestros clientes para materializar sus ideas. Ya necesites juegos de comedor industriales, mobiliario para barra, sistemas de exhibición o piezas únicas, nuestros artesanos crearán exactamente lo que necesita tu negocio.'
      ],
      imageAlt: 'Taller de Mangala Living'
    },
    showrooms: {
      title: 'Nuestro taller',
      intro:
        'Visita nuestro taller en Bekasi para conocer nuestra colección de mobiliario industrial escandinavo y conversar sobre tus necesidades de pedido a medida:',
      description:
        'Nuestro taller cuenta con instalaciones completas para fabricar muebles industriales personalizados. El equipo, con amplia experiencia, puede analizar tus requerimientos y ayudarte a encontrar la mejor solución para tu café, restaurante, hotel u oficina.',
      workshopHeading: 'Taller de Bekasi',
      button: 'Visitar el taller',
      workshopLabel: 'Taller de Bekasi:'
    },
    whyChoose: {
      title: '¿Por qué elegir MANGALA?',
      items: [
        {
          title: 'Calidad premium',
          description: '25 años de experiencia con técnicas de fabricación de alta calidad y materiales de grado industrial.'
        },
        {
          title: 'Precio directo de fábrica',
          description:
            'Fabricamos todo internamente—sin intermediarios, ofreciendo el mejor precio para muebles industriales de alta calidad.'
        },
        {
          title: 'Personalización total',
          description:
            'Aceptamos cualquier solicitud personalizada. Cuéntanos tu visión y la haremos realidad para tu negocio.'
        },
        {
          title: 'Red nacional e internacional',
          description:
            'Atendemos a más de 1000 negocios en toda Indonesia y en mercados internacionales clave: cafés, restaurantes, hoteles y oficinas.'
        }
      ]
    },
    certifications: {
      title: 'Madera sostenible certificada',
      subtitle:
        'Cada proyecto de Mangala Living utiliza madera proveniente de socios auditados que cumplen la normativa forestal de Indonesia y los requisitos documentales de exportación.',
      items: [
        {
          name: 'Legal Wood Sourcing (ILW)',
          description:
            'Los proveedores verificados entregan documentación legal completa y evidencia de tala sostenible para cada lote que recibimos.',
          imageAlt: 'Insignia de Legal Wood'
        },
        {
          name: 'Cadena de suministro verificada SVLK',
          description:
            'Certificación oficial del Sistema de Verificación de Legalidad de la Madera que garantiza trazabilidad, tala responsable y cumplimiento para exportación.',
          imageAlt: 'Insignia de certificación SVLK'
        }
      ]
    }
  },
  fr: {
    meta: {
      title: 'À propos de Mangala Living : Atelier de mobilier industriel sur mesure à Bekasi depuis 1999 - Plus de 1000 projets',
      description:
        'Qui est Mangala Living ? Atelier de mobilier acier sur mesure à Bekasi depuis 1999, avec plus de 1000 projets réalisés. Spécialistes du mobilier industriel pour cafés, restaurants et hôtels—matériaux premium, finition powder coating, prix direct usine. Pourquoi choisir Mangala ? 25 ans d’expérience, atelier moderne de 800 m², consultation design gratuite, garantie 2 ans, service dans la région de Jakarta.',
      keywords:
        'Mangala Living, atelier de mobilier Bekasi, mobilier industriel sur mesure, mobilier pour cafés, atelier depuis 1999'
    },
    hero: {
      title: 'À propos de nous',
      imageAlt:
        'À propos de Mangala Living - Atelier de mobilier industriel à Bekasi depuis 1999 - Fabricant de haute qualité',
      imageTitle:
        'À propos de Mangala Living - Fabricant de mobilier industriel avec plus de 25 ans d’expérience'
    },
    message: {
      title: 'Message de Mangala',
      paragraphs: [
        'Depuis 1999, Mangala Living est le fabricant de référence en Indonésie spécialisé dans le mobilier industriel scandinave sur mesure. Forts de 25 ans d’expérience et de plus de 1 000 projets livrés en Indonésie et sur les marchés internationaux (États-Unis, Japon, Australie, Singapour, Malaisie, Thaïlande, Vietnam, Philippines), nous sommes le partenaire idéal pour vos besoins en mobilier professionnel.',
        'Notre réseau couvre l’ensemble de l’archipel indonésien, fournissant des solutions haut de gamme aux cafés, restaurants, bureaux, hôtels, espaces de coworking et commerces. Chaque pièce est fabriquée avec des techniques précises et une attention méticuleuse aux détails.',
        'Nous acceptons toutes les demandes personnalisées et collaborons étroitement avec nos clients pour concrétiser leur vision. Qu’il s’agisse de tables industrielles, de mobilier de bar, de systèmes de rayonnage ou de pièces uniques, nos artisans créent exactement ce dont votre entreprise a besoin.'
      ],
      imageAlt: 'Atelier Mangala Living'
    },
    showrooms: {
      title: 'Notre atelier',
      intro:
        'Visitez notre atelier de Bekasi pour découvrir notre collection de mobilier industriel scandinave et discuter de vos besoins sur mesure :',
      description:
        'Notre atelier dispose d’installations complètes pour créer des meubles industriels personnalisés. Notre équipe expérimentée peut analyser vos besoins et vous aider à trouver la solution idéale pour votre café, restaurant, hôtel ou bureau.',
      workshopHeading: 'Atelier de Bekasi',
      button: 'Visiter l’atelier',
      workshopLabel: 'Atelier de Bekasi :'
    },
    whyChoose: {
      title: 'Pourquoi choisir MANGALA ?',
      items: [
        {
          title: 'Qualité premium',
          description:
            '25 ans d’expérience, des techniques de fabrication de haut niveau et l’utilisation de matériaux industriels durables.'
        },
        {
          title: 'Prix direct usine',
          description:
            'Nous produisons tout en interne—aucun intermédiaire, ce qui garantit les meilleurs tarifs pour du mobilier industriel de qualité.'
        },
        {
          title: 'Entièrement personnalisable',
          description:
            'Nous répondons à toutes les demandes sur mesure. Faites-nous part de votre vision et nous la réaliserons pour votre entreprise.'
        },
        {
          title: 'Réseau national',
          description:
            'Plus de 1000 entreprises accompagnées en Indonésie et sur les principaux marchés internationaux : cafés, restaurants, hôtels, bureaux.'
        }
      ]
    },
    certifications: {
      title: 'Bois durable certifié',
      subtitle:
        'Chaque projet Mangala Living utilise du bois issu de partenaires audités respectant la réglementation forestière indonésienne et les exigences documentaires d’exportation.',
      items: [
        {
          name: 'Approvisionnement Legal Wood (ILW)',
          description:
            'Nos fournisseurs vérifiés fournissent des dossiers de légalité complets et des preuves de coupe durable pour chaque lot livré.',
          imageAlt: 'Badge Legal Wood'
        },
        {
          name: 'Chaîne d’approvisionnement certifiée SVLK',
          description:
            'Certification officielle du Sistem Verifikasi Legalitas Kayu garantissant la traçabilité, l’exploitation responsable et la conformité pour l’export.',
          imageAlt: 'Badge de certification SVLK'
        }
      ]
    }
  },
  ko: {
    meta: {
      title: 'Mangala Living 소개: 1999년부터 베카시에서 맞춤 산업용 가구 제작 - 1000건 이상의 프로젝트',
      description:
        'Mangala Living은 어떤 곳인가요? 1999년부터 운영된 베카시의 맞춤 철제 가구 공방으로, 1000건 이상의 프로젝트를 수행했습니다. 카페·레스토랑·호텔을 위한 산업풍 가구를 전문으로 하며, 프리미엄 소재와 파우더 코팅, 공장 직판가를 제공합니다. Mangala를 선택해야 하는 이유: 25년 경험, 800㎡ 규모의 현대식 공방, 무료 디자인 상담, 2년 보증, 자카르타 수도권 서비스.',
      keywords:
        'Mangala Living, 베카시 맞춤 가구 공방, 산업풍 맞춤 가구, 카페 가구, 1999년 설립 공방, 무료 디자인 상담'
    },
    hero: {
      title: '회사 소개',
      imageAlt: 'Mangala Living 소개 - 1999년부터 베카시에서 운영 중인 산업용 맞춤 가구 공방 - 프리미엄 제조업체',
      imageTitle: 'Mangala Living 소개 - 25년 이상 경력을 보유한 산업 가구 제조사'
    },
    message: {
      title: 'Mangala의 메시지',
      paragraphs: [
        '1999년 이래 Mangala Living은 인도네시아 대표 산업풍 스칸디나비아 가구 제작사로 성장했습니다. 25년의 경험과 1000건 이상의 프로젝트를 통해, 인도네시아 전역과 국제 시장(미국, 일본, 호주, 싱가포르, 말레이시아, 태국, 베트남, 필리핀)에 상업용 가구 솔루션을 제공해 왔습니다.',
        '우리는 인도네시아 전역의 커피숍, 레스토랑, 오피스, 호텔, 코워킹 스페이스, 리테일 공간에 맞춤형 고품질 가구를 공급하고 있습니다. 모든 제품은 정밀한 제작 기술과 디테일에 대한 집념으로 완성됩니다.',
        '모든 맞춤 요청을 적극 수용하며 고객과 함께 비전을 실현합니다. 산업풍 다이닝 세트, 바 가구, 진열 시스템, 독창적인 커스텀 제품까지—숙련된 장인이 사업에 꼭 맞는 솔루션을 제공합니다.'
      ],
      imageAlt: 'Mangala Living 공방'
    },
    showrooms: {
      title: '우리의 공방',
      intro:
        '베카시 공방을 방문하여 산업풍 스칸디나비아 가구 컬렉션을 체험하고, 맞춤 주문에 대한 상담을 받아보세요.',
      description:
        '공방에는 산업용 맞춤 가구를 생산하기 위한 장비가 갖춰져 있으며, 경험 많은 팀이 카페·레스토랑·호텔·오피스에 가장 적합한 솔루션을 함께 고민해 드립니다.',
      workshopHeading: '베카시 공방',
      button: '공방 방문하기',
      workshopLabel: '베카시 공방:'
    },
    whyChoose: {
      title: 'MANGALA를 선택해야 하는 이유',
      items: [
        {
          title: '프리미엄 품질',
          description: '25년의 노하우와 최고 수준의 제작 기술, 그리고 산업용 등급의 소재를 사용합니다.'
        },
        {
          title: '공장 직판 가격',
          description:
            '모든 제품을 자체 제작하여 중간 마진이 없습니다. 합리적인 가격으로 고품질 가구를 제공합니다.'
        },
        {
          title: '완벽한 맞춤 제작',
          description: '모든 커스텀 요청을 적극 수용합니다. 비전을 공유해 주시면 비즈니스에 맞춰 구현해 드립니다.'
        },
        {
          title: '전국적 네트워크',
          description:
            '인도네시아 및 주요 국제 시장에서 1000건 이상의 프로젝트를 수행하며, 카페·레스토랑·호텔·오피스를 지원합니다.'
        }
      ]
    },
    certifications: {
      title: '인증된 지속가능 목재',
      subtitle:
        'Mangala Living의 모든 제품은 인도네시아 산림 규정과 수출 서류 요건을 충족하는 감사 완료 파트너로부터 공급된 목재를 사용합니다.',
      items: [
        {
          name: 'Legal Wood 소싱 (ILW)',
          description:
            '검증된 공급업체가 각 선적마다 완전한 합법성 서류와 지속 가능한 벌채 증빙을 제공하여 원자재 추적성을 보장합니다.',
          imageAlt: 'Legal Wood 인증 배지'
        },
        {
          name: 'SVLK 인증 공급망',
          description:
            'Sistem Verifikasi Legalitas Kayu 공식 인증으로, 책임 있는 벌채와 추적 가능성, 수출 규정 준수를 보증합니다.',
          imageAlt: 'SVLK 인증 배지'
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
  const faqData = getFAQBySlug('furniture-besi-custom-bekasi')
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
              <p className="footer-phone">+6288801146881</p>
            </div>
          </div>

          <p className="showrooms-description">{translations.showrooms.description}</p>

          <div style={{ margin: '30px auto', maxWidth: 900 }}>
            <div
              style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 8 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4698705313735!2d107.04449967316903!3d-6.3331217619628015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699155096769b1%3A0x32e8009b574bfb5e!2sMangala%20Living%20(Workshop)!5e0!3m2!1sen!2sid!4v1761932272164!5m2!1sen!2sid"
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
                title="Mangala Living Workshop Map"
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

