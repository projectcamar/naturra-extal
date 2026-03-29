import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { FileText, MessageCircle, Truck, Wrench } from 'lucide-react'
import Footer from '../components/Footer'
import NaturraHeader from '../components/NaturraHeader'
// Premium Agricultural Commodity Images
const heroImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80'
const showroomImage = 'https://images.unsplash.com/photo-1516053303028-569806443c52?w=1200'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import './CustomOrder.css'

type CustomOrderTranslation = {
  meta: { title: string; description: string }
  hero: { title: string; imageAlt: string; imageTitle: string }
  message: { title: string; paragraphs: string[]; imageAlt: string }
  ideas: { title: string; intro: string; description: string }
  process: { title: string; steps: Array<{ title: string; description: string }> }
  cta: {
    title: string
    intro: string
    workshopHeading: string
    workshopLabel: string
    workshopParagraph: string
    button: string
  }
}

const CUSTOM_ORDER_TRANSLATIONS: Record<LanguageCode, CustomOrderTranslation> = {
  en: {
    meta: {
      title: 'Custom Specification - Naturra Extal',
      description:
        'Order custom Agricultural Commodity grading and packaging according to your specific industrial needs. Naturra Extal Bekasi serves made-to-order specifications for global importers and food manufacturers.'
    },
    hero: {
      title: 'Custom Order',
      imageAlt: 'Custom Order Naturra Extal - Bekasi Agricultural Commodities Facility',
      imageTitle: 'Custom Order - Agricultural Commodities Manufacturing'
    },
    message: {
      title: 'Every Business has its own Specs',
      paragraphs: [
        "And often, those specific quality grades cannot be represented by generic bulk products available in the market. That's why we offer customized solutions for those who want specific moisture content, particle size, or custom packaging—closer to the industrial requirements and quality values your business believes in.",
        "We don't just supply commodities. We process them based on a genuine understanding—of your manufacturing pipeline, the target market you want to serve, and the quality standard you want to maintain."
      ],
      imageAlt: 'Custom Commodity Processing Naturra Extal'
    },
    ideas: {
      title: 'Precision Grading and Packaging',
      intro:
        'Just tell us your industrial needs. Need certain mesh size for cocoa powder? A specific moisture content for cloves (Lal Pari standard)? Or Perhaps bespoke 5kg cocopeat bricks with low EC levels? We can calibrate our production and sorting line specifically for your requirements.',
      description:
        'We believe every importer has their own quality standards to maintain their supply chain integrity. Some require organic certification focus, others prioritize chemical composition for manufacturing. At Naturra Extal, meeting these industrial specifications is our core expertise. Our team is accustomed to handling grading requests with precise parameters: from high-fat cocoa alkalization to premium hand-picked cloves sorting and specific cocopeat buffering processes.'
    },
    process: {
      title: 'Real and Reliable Process',
      steps: [
        {
          title: 'Initial Consultation',
          description:
            'Send us your technical requirements—purity levels, moisture content, or specific grades. We help translate your needs into a concrete supply plan.'
        },
        {
          title: 'Quality Grade & Processing',
          description:
            'We recommend the best processing options and determine grading parameters that align with your requirements.'
        },
        {
          title: 'Quality Production',
          description: 'Our experienced processing team works with precision and high sorting standards.'
        },
        {
          title: 'Delivery & Logistics',
          description:
            'Safe shipping and logistics support until the commodities are perfectly delivered to your warehouse.'
        }
      ]
    },
    cta: {
      title: 'Ready to Start?',
      intro:
        "If you're looking for agricultural commodities that reflect your industry's quality, function, and standards, it's time to talk. Visit our facility in Bekasi or contact our team for a consultation:",
      workshopHeading: 'Bekasi Facility',
      workshopLabel: 'Bekasi Facility:',
      workshopParagraph:
        'Our facility is equipped with complete processing equipment for custom Agricultural Commodities. Our experienced team is ready to discuss your needs and help you find the best solution.',
      button: 'Contact Us'
    }
  },
  id: {
    meta: {
      title: 'Kustomisasi Spesifikasi - Naturra Extal',
      description:
        'Pesan grading dan pengemasan komoditas pertanian custom sesuai kebutuhan industri Anda. Fasilitas Naturra Extal Bekasi melayani spesifikasi pesanan untuk importir global dan produsen makanan.'
    },
    hero: {
      title: 'Pesan Custom',
      imageAlt: 'Pesan Custom Naturra Extal - Fasilitas Komoditas Pertanian Bekasi',
      imageTitle: 'Pesan Custom - Pengolahan Komoditas Pertanian'
    },
    message: {
      title: 'Setiap Bisnis Memiliki Spesifikasi Unik',
      paragraphs: [
        'Dan sering kali, tingkat kualitas spesifik tersebut tidak dapat diwakili oleh produk curah umum yang tersedia di pasar. Itulah mengapa kami menawarkan solusi khusus bagi mereka yang menginginkan kadar air tertentu, ukuran partikel, atau pengemasan khusus—lebih dekat dengan persyaratan industri dan nilai kualitas yang diyakini bisnis Anda.',
        'Kami tidak sekadar memasok komoditas. Kami memprosesnya berdasarkan pemahaman yang tulus—tentang jalur manufaktur Anda, target pasar yang ingin Anda layani, dan standar kualitas yang ingin Anda pertahankan.'
      ],
      imageAlt: 'Pengolahan Komoditas Pertanian Custom Naturra Extal'
    },
    ideas: {
      title: 'Standardisasi Kualitas Sesuai Kebutuhan',
      intro:
        'Ceritakan spesifikasi teknis yang Anda butuhkan. Butuh mesh size khusus untuk cocoa powder? Kadar air spesifik untuk cengkeh standar ekspor? Atau mungkin blok cocopeat 5kg dengan tingkat EC rendah yang presisi? Kami bisa menyesuaikan lini pengolahan dan penyortiran kami khusus untuk Anda.',
      description:
        'Kami percaya setiap produsen dan importir memiliki standar kualitas unik untuk menjaga integritas produk mereka. Ada yang mengutamakan profil rasa dan warna cocoa, ada yang fokus pada kadar eugenol cengkeh, atau stabilitas media tanam cocopeat. Di Naturra Extal, pemenuhan spesifikasi industri ini adalah prioritas kami. Tim kami terbiasa menangani permintaan grading dengan parameter presisi: mulai dari alkalinitas cocoa, penyortiran manual (hand-picked) cengkeh premium, hingga proses pencucian dan buffering cocopeat skala industri.'
    },
    process: {
      title: 'Proses yang Nyata dan Bisa Diandalkan',
      steps: [
        {
          title: 'Konsultasi Awal',
          description:
            'Kirimkan persyaratan teknis Anda—tingkat kemurnian, kadar air, atau grade spesifik. Kami bantu mengubah kebutuhan Anda menjadi rencana pasokan yang konkret.'
        },
        {
          title: 'Grade Kualitas & Pengolahan',
          description:
            'Kami sarankan opsi pengolahan terbaik dan tentukan parameter grading yang sesuai dengan kebutuhan Anda.'
        },
        {
          title: 'Produksi Berkualitas',
          description: 'Tim pengolahan berpengalaman bekerja dengan presisi dan standar penyortiran tinggi.'
        },
        {
          title: 'Pengiriman & Logistik',
          description:
            'Pengiriman aman dan dukungan logistik hingga komoditas terkirim sempurna ke gudang Anda.'
        }
      ]
    },
    cta: {
      title: 'Siap untuk Mulai?',
      intro:
        'Jika Anda mencari komoditas pertanian yang mencerminkan kualitas, fungsi, dan standar industri Anda, ini saatnya berbicara. Kunjungi fasilitas kami di Bekasi atau hubungi tim kami untuk konsultasi:',
      workshopHeading: 'Fasilitas Bekasi',
      workshopLabel: 'Fasilitas Bekasi:',
      workshopParagraph:
        'Fasilitas kami dilengkapi peralatan pengolahan lengkap untuk menciptakan komoditas pertanian kustom. Tim berpengalaman kami siap mendiskusikan kebutuhan Anda dan membantu menemukan solusi terbaik.',
      button: 'Hubungi Kami'
    }
  },
  ar: {
    meta: {
      title: 'المواصفات المخصصة - Naturra Extal',
      description:
        'اطلب تصنيفًا وتغليفًا مخصصًا للسلع الزراعية وفقًا لاحتياجاتك الصناعية الخاصة. تخدم منشأة Naturra Extal في بيكاسي المواصفات حسب الطلب للمستوردين العالميين ومصنعي الأغذية.'
    },
    hero: {
      title: 'طلب مخصص',
      imageAlt: 'طلب مخصص Naturra Extal - منشأة السلع الزراعية في بيكاسي',
      imageTitle: 'طلب مخصص - معالجة السلع الزراعية'
    },
    message: {
      title: 'كل عمل تجاري له مواصفاته الخاصة',
      paragraphs: [
        'وغالبًا ما لا يمكن تمثيل درجات الجودة المحددة هذه من خلال المنتجات السائبة العامة المتوفرة في السوق. لذلك نحن نقدم حلولاً مخصصة لأولئك الذين يريدون محتوى رطوبة محددًا، أو حجم جزيئات، أو تغليفًا مخصصًا—بما يتماشى مع المتطلبات الصناعية وقيم الجودة التي تؤمن بها أعمالك.',
        'نحن لا نوفر السلع فحسب، بل نقوم بمعالجتها بناءً على فهم حقيقي—لسلسلة التصنيع الخاصة بك، والسوق المستهدف الذي تريد خدمته، ومعيار الجودة الذي تريد الحفاظ عليه.'
      ],
      imageAlt: 'معالجة السلع المخصصة Naturra Extal'
    },
    ideas: {
      title: 'التصنيف والتغليف الدقيق',
      intro:
        'فقط أخبرنا باحتياجاتك الصناعية. هل تحتاج إلى حجم مش معين لمسحوق الكاكاو؟ محتوى رطوبة محدد للقرنفل (معيار لال باري)؟ أو ربما قوالب كوكوبيت بوزن 5 كجم بطلب مخصص مع مستويات EC منخفضة؟ يمكننا معايرة خط الإنتاج والفرز لدينا خصيصًا لمتطلباتك.',
      description:
        'نحن نؤمن بأن كل مستورد لديه معايير جودة خاصة به للحفاظ على نزاهة سلسلة التوريد الخاصة به. يركز البعض على شهادة العضوية، بينما يعطي الآخرون الأولوية للتركيب الكيميائي للتصنيع. في Naturra Extal، تلبية هذه المواصفات الصناعية هي خبرتنا الأساسية. فريقنا معتاد على التعامل مع طلبات التصنيف بمعايير دقيقة: بدءًا من قلونة الكاكاو عالية الدهون وصولاً إلى فرز القرنفل الفاخر يدويًا وعمليات معالجة الكوكوبيت المحددة.'
    },
    process: {
      title: 'عملية حقيقية وموثوقة',
      steps: [
        {
          title: 'استشارة أولية',
          description:
            'أرسل لنا متطلباتك الفنية—مستويات النقاء، أو محتوى الرطوبة، أو درجات محددة. نحن نساعد في ترجمة احتياجاتك إلى خطة توريد ملموسة.'
        },
        {
          title: 'درجة الجودة والمعالجة',
          description: 'نوصي بأفضل خيارات المعالجة ونحدد معايير التصنيف التي تتوافق مع متطلباتك.'
        },
        {
          title: 'إنتاج عالي الجودة',
          description: 'يعمل فريق المعالجة الخبير لدينا بدقة ومعايير فرز عالية.'
        },
        {
          title: 'التسليم والخدمات اللوجستية',
          description: 'شحن آمن ودعم لوجستي حتى يتم تسليم السلع بشكل مثالي إلى مستودعاتك.'
        }
      ]
    },
    cta: {
      title: 'جاهز للبدء؟',
      intro:
        'إذا كنت تبحث عن سلع زراعية تعكس جودة ومعايير صناعتك، فقد حان الوقت للتواصل معنا. قم بزيارة منشأتنا في بيكاسي أو تواصل مع فريقنا للاستشارة:',
      workshopHeading: 'منشأة بيكاسي',
      workshopLabel: 'منشأة بيكاسي:',
      workshopParagraph:
        'منشأتنا مجهزة بمعدات معالجة كاملة لإنتاج سلع زراعية مخصصة. فريقنا الخبير جاهز لمناقشة احتياجاتك ومساعدتك في العثور على الحل الأمثل.',
      button: 'تواصل معنا'
    }
  },
  zh: {
    meta: {
      title: '定制规格 - Naturra Extal',
      description:
        '根据您的特定工业需求定制农产品等级和包装。Naturra Extal 贝卡西设施为全球进口商和食品制造商提供定制规格服务。'
    },
    hero: {
      title: '定制订单',
      imageAlt: '定制订单 Naturra Extal - 贝卡西农产品加工设施',
      imageTitle: '定制订单 - 农产品加工制造'
    },
    message: {
      title: '每个企业都有自己的规格需求',
      paragraphs: [
        '通常，市场上现有的通用散装产品无法满足特定的质量等级要求。因此， we 为那些需要特定水分含量、粒度或定制包装的客户提供定制解决方案，使其更贴近您的企业所信奉的工业要求和质量价值。',
        '我们不只是供应商品。我们在深刻理解您的生产线、目标市场以及您想要保持的质量标准的基础上进行加工。'
      ],
      imageAlt: 'Naturra Extal 定制农产品加工'
    },
    ideas: {
      title: '精准等级与包装',
      intro:
        '只需告诉我们您的工业需求。需要特定目数的可可粉？出口标准水分的丁香（Lal Pari 标准）？或者低 EC 值的 5kg 椰糠轻质砖？我们可以专门针对您的要求校准生产和分拣线。',
      description:
        '我们相信每位进口商都有自己的质量标准，以维护其供应链的完整性。有人关注有机认证，有人优先考虑制造过程中的化学成分。在 Naturra Extal，满足这些工业规格是我们的核心专长。我们的团队习惯于处理具有精准参数的分级请求：从高脂可可碱化到优质手工拣选丁香分拣，以及特定的椰糠缓冲处理工艺。'
    },
    process: {
      title: '可信赖的流程',
      steps: [
        {
          title: '初步咨询',
          description: '告知我们您的技术要求——纯度、水分含量或特定等级。我们会帮助您将需求转化为具体的供应计划。'
        },
        {
          title: '质量等级与加工',
          description: '我们会推荐最佳加工方案，并根据需求确定分级参数。'
        },
        {
          title: '高品质生产',
          description: '经验丰富的加工团队以高标准、高精度完成分拣与制作。'
        },
        {
          title: '交付与物流',
          description: '提供安全运输及物流支持，确保农产品完美送达您的仓库。'
        }
      ]
    },
    cta: {
      title: '准备好开始了吗？',
      intro:
        '如果您正在寻找符合行业质量、功能和标准的农产品，现在就与我们联系。欢迎参观我们的贝卡西设施或与团队洽谈咨询：',
      workshopHeading: '贝卡西设施',
      workshopLabel: '贝卡西设施：',
      workshopParagraph:
        '我们的设施配备完善的加工设备，能打造各类定制农产品。经验丰富的团队随时准备讨论您的需求，并帮助您找到最佳解决方案。',
      button: '联系我们'
    }
  },
  ja: {
    meta: {
      title: 'カスタム仕様 - Naturra Extal',
      description:
        '産業ニーズに合わせた農産物（ココア、丁香、ココピート）のグレーディングとパッケージングを承ります。Naturra Extal ベカシ施設は世界中の輸入業者や食品メーカー向けにオーダーメイド仕様を提供しています。'
    },
    hero: {
      title: 'カスタムオーダー',
      imageAlt: 'カスタムオーダー Naturra Extal - ベカシ農産物加工施設',
      imageTitle: 'カスタムオーダー - 農産物の製造・加工'
    },
    message: {
      title: 'ビジネスには独自の仕様が必要です',
      paragraphs: [
        '市場で流通する一般的なバルク製品では、特定の品質基準を満たせないことが多々あります。だからこそ、特定の水分含有量、粒度、あるいはカスタムパッケージを求めるお客様のために、産業要件や品質価値に即したカスタマイズソリューションを提供しています。',
        '私たちは単に原材料を供給するのではなく、お客様の製造ライン、ターゲット市場、維持したい品質基準を真摯に理解した上で加工を行います。'
      ],
      imageAlt: 'Naturra Extal のカスタム農産物加工'
    },
    ideas: {
      title: '精密なグレーディングと梱包',
      intro:
        'まずは産業上のニーズをお聞かせください。ココアパウダー의 특정 메쉬 사이즈가 필요하십니까? 수출 표준 수분 함량의 정향(Lal Pari 표준)? 또는 낮은 EC 레벨의 맞춤형 5kg 코코피트 블록? 귀사의 요구 사항에 맞춰 생산 및 선별 라인을 조정할 수 있습니다.',
      description:
        '우리는 모든 수입업체가 공급망의 무결성을 유지하기 위해 자신만의 품질 표준을 가지고 있다고 믿습니다. 유기농 인증에 집중하는 곳도 있고, 제조를 위한 화학적 조성을 우선시하는 곳도 있습니다. Naturra Extal에서는 이러한 산업 사양을 충족하는 것이 핵심 전문 분야입니다. 우리는 고지방 코코아 알칼리화부터 프리미엄 수동 선별 정향, 특정 코코피트 완충 처리 공정에 이르기까지 정밀한 파라미터를 통한 등급 선정 요청을 처리해 왔습니다.'
    },
    process: {
      title: '信頼できるプロセス',
      steps: [
        {
          title: '初回ヒアリング',
          description:
            '純度、水分含有量、特定のグレードなど、技術的な要件をお送りください。ニーズを具体的な供給計画に落とし込みます。'
        },
        {
          title: '品質グレードと加工選定',
          description: '最適な加工オプションを提案し、要件に沿ったグレーディングパラメータを決定します。'
        },
        {
          title: '高品質な製作',
          description: '経験豊富な加工チームが、高い基準と精度で選別・製作を行います。'
        },
        {
          title: '配送とロジスティクス',
          description:
            '安全な配送と物流サポートを提供し、農産物が倉庫に理想的な状態で届くまで寄り添います。'
        }
      ]
    },
    cta: {
      title: 'さあ、始めましょう',
      intro:
        '業界の品質、機能、基準を体現する農産物をお求めなら、ぜひお気軽にご相談ください。ベカシ施設へのご来訪やお問い合わせをお待ちしています。',
      workshopHeading: 'ベカシ施設',
      workshopLabel: 'ベカシ施設：',
      workshopParagraph:
        '施設には産業系カスタム農産物を加工するための設備が整っています。経験豊富なチームがニーズを丁寧にヒアリングし、最適な解決策をご提案します。',
      button: 'お問い合わせ'
    }
  },
  es: {
    meta: {
      title: 'Especificaciones Personalizadas - Naturra Extal',
      description:
        'Encargue la clasificación y el embalaje personalizados de materias primas agrícolas según sus necesidades industriales específicas. La instalación de Naturra Extal en Bekasi ofrece especificaciones a medida para importadores globales y fabricantes de alimentos.'
    },
    hero: {
      title: 'Pedido Personalizado',
      imageAlt: 'Pedido personalizado Naturra Extal - Instalación de Materias Primas Agrícolas en Bekasi',
      imageTitle: 'Pedido personalizado - Procesamiento de Materias Primas Agrícolas'
    },
    message: {
      title: 'Cada negocio tiene sus propias especificaciones',
      paragraphs: [
        'Y a menudo, esos grados de calidad específicos no pueden ser representados por productos a granel genéricos disponibles en el mercado. Por eso ofrecemos soluciones personalizadas para quienes desean un contenido de humedad específico, tamaño de partícula o embalaje a medida, más cerca de los requisitos industriales y los valores de calidad en los que cree su empresa.',
        'No solo suministramos productos. Los procesamos basándonos en una comprensión genuina de su cadena de fabricación, el mercado objetivo al que desea servir y el estándar de calidad que desea mantener.'
      ],
      imageAlt: 'Procesamiento de Productos Personalizados Naturra Extal'
    },
    ideas: {
      title: 'Clasificación y Embalaje de Precisión',
      intro:
        'Cuéntenos sus necesidades industriales. ¿Necesita un tamaño de malla determinado para el cacao en polvo? ¿Un contenido de humedad específico para el clavo (estándar Lal Pari)? ¿O quizás bloques de cocopeat de 5 kg a medida con niveles bajos de EC? Podemos calibrar nuestra línea de producción y clasificación específicamente para sus requerimientos.',
      description:
        'Creemos que cada importador tiene sus propios estándares de calidad para mantener la integridad de su cadena de suministro. Algunos requieren un enfoque en certificación orgánica, otros priorizan la composición química para la fabricación. En Naturra Extal, cumplir con estas especificaciones industriales es nuestra especialidad principal. Nuestro equipo está acostumbrado a manejar solicitudes de clasificación con parámetros precisos: desde la alcalinización del cacao alto en grasa hasta la clasificación manual premium de clavo y procesos específicos de amortiguación de cocopeat.'
    },
    process: {
      title: 'Un proceso real y confiable',
      steps: [
        {
          title: 'Consulta inicial',
          description:
            'Envíenos sus requisitos técnicos: niveles de pureza, contenido de humedad o grados específicos. Ayudamos a traducir sus necesidades en un plan de suministro concreto.'
        },
        {
          title: 'Grado de Calidad y Procesamiento',
          description:
            'Recomendamos las mejores opciones de procesamiento y determinamos los parámetros de clasificación que se alinean con sus requisitos.'
        },
        {
          title: 'Producción de alta calidad',
          description: 'Nuestro experimentado equipo de procesamiento trabaja con precisión y altos estándares de clasificación.'
        },
        {
          title: 'Entrega y Logística',
          description:
            'Envío seguro y soporte logístico hasta que las materias primas se entreguen perfectamente en su almacén.'
        }
      ]
    },
    cta: {
      title: '¿Listo para comenzar?',
      intro:
        'Si busca materias primas agrícolas que reflejen la calidad, función y estándares de su industria, hablemos ahora. Visite nuestra instalación en Bekasi o contáctenos para una asesoría:',
      workshopHeading: 'Instalación de Bekasi',
      workshopLabel: 'Instalación de Bekasi:',
      workshopParagraph:
        'Nuestra instalación cuenta con equipos de procesamiento completos para crear productos agrícolas a medida. El equipo está preparado para dialogar sobre sus necesidades y ayudarle a encontrar la mejor solución.',
      button: 'Contáctanos'
    }
  },
  fr: {
    meta: {
      title: 'Spécifications Personnalisées - Naturra Extal',
      description:
        'Commandez un calibrage et un emballage personnalisés de matières premières agricoles selon vos besoins industriels spécifiques. L’installation Naturra Extal de Bekasi propose des spécifications sur mesure pour les importateurs mondiaux et les fabricants de produits alimentaires.'
    },
    hero: {
      title: 'Commande sur mesure',
      imageAlt: 'Commande sur mesure Naturra Extal - Installation de Matières Premières Agricoles à Bekasi',
      imageTitle: 'Commande sur mesure - Transformation de Matières Premières Agricoles'
    },
    message: {
      title: 'Chaque entreprise a ses propres spécifications',
      paragraphs: [
        "Et souvent, ces grades de qualité spécifiques ne peuvent pas être représentés par des produits en vrac génériques disponibles sur le marché. C'est pourquoi nous proposons des solutions personnalisées pour ceux qui souhaitent un taux d'humidité spécifique, une taille de particule ou un emballage sur mesure—plus proche des besoins industriels et des valeurs de qualité auxquelles croit votre entreprise.",
        "Nous ne nous contentons pas de fournir des produits de base. Nous les transformons sur la base d'une compréhension réelle de votre chaîne de fabrication, du marché cible que vous souhaitez servir et des normes de qualité que vous souhaitez maintenir."
      ],
      imageAlt: 'Transformation de Produits Personnalisés Naturra Extal'
    },
    ideas: {
      title: 'Calibrage et Emballage de Précision',
      intro:
        "Expliquez-nous simplement vos besoins industriels. Besoin d'un mesh spécifique pour le cacao en poudre ? D'un taux d'humidité particulier pour les clous de girofle (standard Lal Pari) ? Ou peut-être des briques de cocopeat de 5 kg sur mesure avec des niveaux d'EC bas ? Nous pouvons calibrer notre ligne de production et de tri spécifiquement selon vos exigences.",
      description:
        "Nous sommes convaincus que chaque importateur possède ses propres normes de qualité pour maintenir l'intégrité de sa chaîne d'approvisionnement. Certains se concentrent sur la certification biologique, d'autres privilégient la composition chimique pour la fabrication. Chez Naturra Extal, répondre à ces spécifications industrielles est notre spécialité. Notre équipe a l'habitude de traiter des demandes de calibrage avec des paramètres précis : de l'alcalinisation du cacao à haute teneur en matière grasse au tri manuel premium des clous de girofle, en passant par les processus spécifiques de tamponnage du cocopeat."
    },
    process: {
      title: 'Un processus concret et fiable',
      steps: [
        {
          title: 'Consultation initiale',
          description:
            'Envoyez-nous vos exigences techniques—niveaux de pureté, taux d’humidité ou grades spécifiques. Nous vous aidons à traduire vos besoins en un plan d’approvisionnement concret.'
        },
        {
          title: 'Grade de Qualité et Transformation',
          description:
            'Nous recommandons les meilleures options de transformation et déterminons les paramètres de tri en phase avec vos besoins.'
        },
        {
          title: 'Production de qualité',
          description:
            'Notre équipe de transformation expérimentée travaille avec précision et selon des normes de tri élevées.'
        },
        {
          title: 'Livraison et Logistique',
          description:
            'Expédition sécurisée et support logistique jusqu’à ce que les matières premières soient parfaitement livrées dans votre entrepôt.'
        }
      ]
    },
    cta: {
      title: 'Prêt à commencer ?',
      intro:
        'Si vous souhaitez des matières premières agricoles qui reflètent l’identité, la fonctionnalité et les standards de votre industrie, parlons-en ensemble. Visitez notre installation de Bekasi ou contactez notre équipe pour une consultation :',
      workshopHeading: 'Installation de Bekasi',
      workshopLabel: 'Installation de Bekasi :',
      workshopParagraph:
        'Notre installation dispose d’équipements de transformation complets pour créer des produits agricoles sur mesure. Notre équipe expérimentée est prête à étudier vos besoins et à proposer la meilleure solution.',
      button: 'Contactez-nous'
    }
  },
  ko: {
    meta: {
      title: '맞춤 사양 주문 - Naturra Extal',
      description:
        '귀사의 산업적 필요에 맞춘 농산물(코코아, 정향, 코코피트)의 맞춤 등급 선정 및 포장을 주문하세요. Naturra Extal 베카시 시설은 글로벌 수입업체 및 식품 제조업체를 위한 맞춤 사양 서비스를 제공합니다.'
    },
    hero: {
      title: '맞춤 주문',
      imageAlt: '맞춤 주문 Naturra Extal - 베카시 농산물 가공 시설',
      imageTitle: '맞춤 주문 - 농산물 가공 및 제조'
    },
    message: {
      title: '모든 비즈니스에는 고유한 사양이 있습니다',
      paragraphs: [
        '시중의 일반적인 벌크 제품으로는 특정 품질 등급을 충족하기 어려운 경우가 많습니다. 그래서 우리는 특정 수분 함량, 입자 크기 또는 맞춤형 포장을 원하는 고객을 위해 비즈니스가 추구하는 산업적 요구와 품질 가치에 부합하는 맞춤형 솔루션을 제공합니다.',
        '우리는 단순히 원자재를 공급하는 것이 아닙니다. 귀사의 제조 공정, 타겟 시장 및 유지하고자 하는 품질 표준을 진심으로 이해한 바탕 위에서 가공합니다.'
      ],
      imageAlt: 'Naturra Extal 맞춤형 농산물 가공'
    },
    ideas: {
      title: '정밀 등급 선정 및 포장',
      intro:
        '귀사의 산업적 필요를 알려주세요. 코코아 파우더의 특정 메쉬 사이즈가 필요하신가요? 수출 표준 수분 함량의 정향(Lal Pari 표준)? 또는 낮은 EC 레벨의 맞춤형 5kg 코코피트 블록? 귀사의 요구 사항에 맞춰 생산 및 선별 라인을 조정할 수 있습니다.',
      description:
        '우리는 모든 수입업체가 공급망의 무결성을 유지하기 위해 자신만의 품질 표준을 가지고 있다고 믿습니다. 유기농 인증에 집중하는 곳도 있고, 제조를 위한 화학적 조성을 우선시하는 곳도 있습니다. Naturra Extal에서는 이러한 산업 사양을 충족하는 것이 핵심 전문 분야입니다. 우리는 고지방 코코아 알칼리화부터 프리미엄 수동 선별 정향, 특정 코코피트 완충 처리 공정에 이르기까지 정밀한 파라미터를 통한 등급 선정 요청을 처리해 왔습니다.'
    },
    process: {
      title: '신뢰할 수 있는 실제 프로세스',
      steps: [
        {
          title: '초기 상담',
          description:
            '순도, 수분 함량 또는 특정 등급과 같은 기술적 요구 사항을 보내주세요. 귀사의 니즈를 구체적인 공급 계획으로 전환해 드립니다.'
        },
        {
          title: '품질 등급 및 가공 선정',
          description: '최적의 가공 옵션을 추천하고 귀사의 요구 사항에 맞는 등급 파라미터를 결정합니다.'
        },
        {
          title: '고품질 생산',
          description: '숙련된 가공팀이 높은 기준과 정밀도로 선별 및 제작합니다.'
        },
        {
          title: '배송 및 물류',
          description:
            '안전한 배송과 물류 지원을 제공하며, 농산물이 창고에 완벽히 도착할 때까지 함께합니다.'
        }
      ]
    },
    cta: {
      title: '시작할 준비가 되셨나요?',
      intro:
        '업계의 품질, 기능 및 표준을 반영하는 농산물을 찾고 계시다면 지금 상담해 보세요. 베카시 시설 방문 또는 문의를 환영합니다:',
      workshopHeading: '베카시 시설',
      workshopLabel: '베카시 시설:',
      workshopParagraph:
        '시설에는 산업용 맞춤 농산물을 가공할 수 있는 설비가 갖춰져 있습니다. 경험 많은 팀이 요구 사항을 함께 논의하고 최적의 솔루션을 제안해 드립니다.',
      button: '문의하기'
    }
  }
}

const CustomOrder: React.FC = () => {
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
  const isIndonesian = language === 'id'
  const t = CUSTOM_ORDER_TRANSLATIONS[language] ?? CUSTOM_ORDER_TRANSLATIONS.en

  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  return (
    <div className="custom-order-page">
      <Helmet
        htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': language }}
      >
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link
            key={`custom-order-hreflang-${alternate.hrefLang}`}
            rel="alternate"
            hrefLang={alternate.hrefLang}
            href={alternate.href}
          />
        ))}
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
      </Helmet>

      <NaturraHeader isIndonesian={isIndonesian} language={language} />

      <section className="custom-order-hero">
        <div className="custom-order-hero-image">
          <img
            src={heroImage}
            alt={t.hero.imageAlt}
            title={t.hero.imageTitle}
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
          />
          <div className="custom-order-hero-overlay"></div>
        </div>
        <div className="custom-order-hero-content">
          <h1 className="custom-order-hero-title">{t.hero.title}</h1>
        </div>
      </section>

      <section className="custom-order-message-section">
        <div className="custom-order-message-container">
          <div className="custom-order-message-content">
            <div className="custom-order-message-text">
              <h2 className="custom-order-message-title">{t.message.title}</h2>
              <div className="custom-order-message-body">
                {t.message.paragraphs.map((paragraph, index) => (
                  <p className="custom-order-message-paragraph" key={`message-paragraph-${index}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="custom-order-message-image-wrapper">
              <img
                src={showroomImage}
                alt={t.message.imageAlt}
                className="custom-order-message-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="custom-order-ideas-section">
        <div className="custom-order-ideas-container">
          <h2 className="custom-order-ideas-title">{t.ideas.title}</h2>
          <p className="custom-order-ideas-intro">{t.ideas.intro}</p>
          <p className="custom-order-ideas-description">{t.ideas.description}</p>
        </div>
      </section>

      <section className="custom-order-process-section">
        <div className="custom-order-process-container">
          <h2 className="custom-order-process-main-title">{t.process.title}</h2>

          <div className="custom-order-process-grid">
            {t.process.steps.map((step) => (
              <div className="custom-order-process-item" key={step.title}>
                <div className="custom-order-process-icon">
                  {step.title === t.process.steps[0].title && <MessageCircle size={48} strokeWidth={1.5} />}
                  {step.title === t.process.steps[1].title && <FileText size={48} strokeWidth={1.5} />}
                  {step.title === t.process.steps[2].title && <Wrench size={48} strokeWidth={1.5} />}
                  {step.title === t.process.steps[3].title && <Truck size={48} strokeWidth={1.5} />}
                </div>
                <h3 className="custom-order-process-item-title">{step.title}</h3>
                <p className="custom-order-process-item-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="custom-order-cta-section">
        <div className="custom-order-cta-container">
          <h2 className="custom-order-cta-title">{t.cta.title}</h2>
          <p className="custom-order-cta-intro">{t.cta.intro}</p>

          <div className="custom-order-locations">
            <div className="custom-order-location">
              <h3>{t.cta.workshopHeading}</h3>
              <p>
                <a
                  href="https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jl. Raya Setu Cibitung - Bekasi, Telajung, Kec. Cikarang Bar., Kabupaten Bekasi, Jawa Barat
                  17320
                </a>
              </p>
              <p className="footer-phone">+6289513957752</p>
            </div>
          </div>

          <p className="custom-order-cta-description">{t.cta.workshopParagraph}</p>

          <div className="custom-order-cta-buttons">
            <a
              href="https://wa.me/+6289513957752"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-order-btn"
              onClick={() => trackWhatsAppClick('custom_order_page_cta')}
            >
              {t.cta.button}
            </a>
          </div>
        </div>
      </section>

      <Footer isIndonesian={isIndonesian} language={language} />
    </div>
  )
}

export default CustomOrder

