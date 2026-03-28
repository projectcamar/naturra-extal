import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { FileText, MessageCircle, Truck, Wrench } from 'lucide-react'
import Footer from '../components/Footer'
import Header from '../components/Header'
// legacy mangala image import removed
// legacy mangala image import removed
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
      title: 'Custom Order - Mangala Living',
      description:
        'Order custom industrial furniture according to your needs. Mangala Living Bekasi serves made-to-order furniture for cafes, restaurants, offices, and homes.'
    },
    hero: {
      title: 'Custom Order',
      imageAlt: 'Custom Order Mangala Living - Bekasi Industrial Furniture Workshop',
      imageTitle: 'Custom Order - Industrial Furniture Manufacturing'
    },
    message: {
      title: 'Everyone has their own taste',
      paragraphs: [
        "And often, that taste cannot be represented by ready-made products available in the market. That's why we open our doors to those who want something more personal—closer to the character, function, and aesthetic values you believe in.",
        "We don't just make furniture. We shape it from genuine understanding—of your lifestyle, the room you want to build, and the story you want to share within it."
      ],
      imageAlt: 'Custom Furniture Design Mangala Living'
    },
    ideas: {
      title: 'Starting from Simple Ideas',
      intro:
        'Just tell us your wishes, no complicated words needed. Need an open shelf with custom dimensions? A lounge chair that fits your favourite corner? Or perhaps a dining set to energise your café atmosphere? Everything can be designed from scratch, aligned with your needs and the ambience you want to create.',
      description:
        'We believe everyone has a unique taste in organising space. Some love rich details, others prefer clean, simple lines. At Mangala Living, all these design approaches are not only possible—they are our expertise. Our team is accustomed to handling design requests with diverse characters: from magnificent aesthetics with classic accents, to warm natural looks, and modern styles that remain highly functional.'
    },
    process: {
      title: 'Real and Reliable Process',
      steps: [
        {
          title: 'Initial Consultation',
          description:
            'Send us your inspiration—images, sketches, or rough notes. We help translate your idea into a concrete plan.'
        },
        {
          title: 'Material & Design Selection',
          description:
            'We recommend the best material options and craft a design that aligns with your requirements.'
        },
        {
          title: 'Quality Production',
          description: 'Our experienced production team works with precision and high quality standards.'
        },
        {
          title: 'Delivery & Installation',
          description:
            'Safe delivery and installation support until the furniture is perfectly set up in your space.'
        }
      ]
    },
    cta: {
      title: 'Ready to Start?',
      intro:
        "If you're looking for furniture that reflects your space's identity, function, and aesthetics, it's time to talk. Visit our workshop in Bekasi or contact our team for a consultation:",
      workshopHeading: 'Workshop Bekasi',
      workshopLabel: 'Workshop Bekasi:',
      workshopParagraph:
        'Our workshop is equipped with complete manufacturing facilities for custom industrial furniture. Our experienced team is ready to discuss your needs and help you find the best solution.',
      button: 'Contact Us'
    }
  },
  id: {
    meta: {
      title: 'Custom Order - Mangala Living',
      description:
        'Pesan furniture industrial custom sesuai kebutuhan Anda. Workshop Mangala Living Bekasi melayani custom order untuk cafe, restoran, kantor, dan rumah.'
    },
    hero: {
      title: 'Custom Order',
      imageAlt: 'Custom Order Mangala Living - Workshop Furniture Industrial Bekasi',
      imageTitle: 'Custom Order - Pabrikasi Furniture Industrial'
    },
    message: {
      title: 'Setiap orang punya selera',
      paragraphs: [
        'Dan sering kali, selera itu tak bisa diwakili oleh produk jadi yang sudah ada di pasaran. Itulah mengapa kami membuka pintu bagi Anda yang ingin sesuatu yang lebih personal—lebih dekat dengan karakter, fungsi, dan nilai estetika yang Anda yakini.',
        'Kami tidak sekadar membuat furnitur. Kami membentuknya dari pemahaman. Tentang gaya hidup Anda, tentang ruangan yang ingin Anda bangun, dan tentang cerita yang ingin Anda hadirkan di dalamnya.'
      ],
      imageAlt: 'Desain Furniture Custom Mangala Living'
    },
    ideas: {
      title: 'Dimulai dari Ide yang Sederhana',
      intro:
        'Ceritakan saja keinginan Anda, tak perlu kata rumit. Mau rak terbuka dengan ukuran khusus? Kursi santai yang muat di sudut favorit rumah? Atau satu set meja makan untuk menghidupkan suasana kafe? Semua bisa dirancang dari awal, sesuai kebutuhan dan suasana yang ingin Anda bangun.',
      description:
        'Kami percaya, setiap orang punya selera unik dalam menata ruang. Ada yang menyukai detail kaya, ada pula yang memilih garis sederhana dan bersih. Di Mangala Living, semua pendekatan desain tersebut bukan sekadar mungkin—itulah keahlian kami. Tim kami terbiasa menangani permintaan desain dengan ragam karakter: mulai dari estetika megah dengan aksen klasik, nuansa natural yang earthy, hingga gaya modern yang tegas namun tetap fungsional.'
    },
    process: {
      title: 'Proses yang Nyata dan Bisa Diandalkan',
      steps: [
        {
          title: 'Konsultasi Awal',
          description:
            'Kirimkan inspirasi Anda—gambar, sketsa, atau catatan. Kami bantu mengubahnya menjadi rencana yang jelas.'
        },
        {
          title: 'Pemilihan Bahan & Desain',
          description: 'Kami sarankan material terbaik dan susun desain sesuai kebutuhan Anda.'
        },
        {
          title: 'Produksi Berkualitas',
          description: 'Tim produksi berpengalaman bekerja dengan presisi dan standar tinggi.'
        },
        {
          title: 'Pengiriman & Instalasi',
          description:
            'Pengiriman aman dan bantuan instalasi hingga furnitur terpasang sempurna di tempat Anda.'
        }
      ]
    },
    cta: {
      title: 'Siap untuk Mulai?',
      intro:
        'Jika Anda mencari furnitur yang mencerminkan identitas, fungsi, dan estetika ruang Anda, ini saatnya berbicara. Kunjungi workshop kami di Bekasi atau hubungi tim kami untuk konsultasi:',
      workshopHeading: 'Workshop Bekasi',
      workshopLabel: 'Workshop Bekasi:',
      workshopParagraph:
        'Workshop kami dilengkapi fasilitas manufaktur lengkap untuk menciptakan furniture industrial custom. Tim berpengalaman kami siap mendiskusikan kebutuhan Anda dan membantu menemukan solusi terbaik.',
      button: 'Hubungi Kami'
    }
  },
  ar: {
    meta: {
      title: 'طلب مخصص - Mangala Living',
      description:
        'اطلب أثاثًا صناعيًا مخصصًا وفق احتياجاتك. ورشة Mangala Living في بيكاسي تخدم المقاهي والمطاعم والمكاتب والمنازل.'
    },
    hero: {
      title: 'طلب مخصص',
      imageAlt: 'طلب مخصص Mangala Living - ورشة الأثاث الصناعي في بيكاسي',
      imageTitle: 'طلب مخصص - تصنيع أثاث صناعي'
    },
    message: {
      title: 'لكل شخص ذوقه الخاص',
      paragraphs: [
        'وغالبًا ما يكون هذا الذوق لا تنعكسه المنتجات الجاهزة المتوفرة في السوق. لذلك نفتح أبوابنا لمن يبحثون عن شيء أكثر خصوصية وأكثر قربًا من شخصيتهم ووظيفتهم وقيمهم الجمالية.',
        'نحن لا نصنع الأثاث فقط، بل نشكّله انطلاقًا من الفهم—عن نمط حياتك، وعن المساحة التي تريد بناءها، وعن القصة التي ترغب في إبرازها داخلها.'
      ],
      imageAlt: 'تصميم أثاث مخصص Mangala Living'
    },
    ideas: {
      title: 'يبدأ من فكرة بسيطة',
      intro:
        'أخبرنا بما تريد دون تعقيد. رف مفتوح بمقاس محدد؟ كرسي استرخاء ينسجم مع ركنك المفضل؟ أو ربما طقم طاولة طعام يمنح المقهى روحًا جديدة؟ يمكن تصميم كل ذلك من البداية، وفق احتياجاتك والأجواء التي ترغب في بنائها.',
      description:
        'نؤمن بأن لكل شخص ذوقًا فريدًا في ترتيب المساحات. هناك من يعشق التفاصيل الغنية، وآخرون يفضلون الخطوط البسيطة والواضحة. في Mangala Living، كل هذه المقاربات ليست ممكنة فحسب بل هي مجال خبرتنا. اعتاد فريقنا على التعامل مع طلبات تصميم متنوعة: من اللمسات الكلاسيكية الفخمة، والتصاميم الطبيعية الدافئة، وصولًا إلى الأسلوب الحديث الواضح والوظيفي.'
    },
    process: {
      title: 'عملية حقيقية يمكن الاعتماد عليها',
      steps: [
        {
          title: 'استشارة أولية',
          description:
            'أرسل لنا مصدر إلهامك، سواء كان صورًا أو رسومات أو ملاحظات بسيطة. سنساعدك على تحويلها إلى خطة واضحة.'
        },
        {
          title: 'اختيار المواد والتصميم',
          description: 'سنقترح أفضل خيارات المواد ونطوّر تصميمًا يتوافق مع احتياجاتك.'
        },
        {
          title: 'إنتاج بجودة عالية',
          description: 'يعمل فريق الإنتاج الخبير لدينا بدقة ومعايير جودة مرتفعة.'
        },
        {
          title: 'التسليم والتركيب',
          description:
            'تسليم آمن مع دعم كامل لعملية التركيب حتى يصبح الأثاث في مكانه بالشكل المثالي.'
        }
      ]
    },
    cta: {
      title: 'جاهز للبدء؟',
      intro:
        'إذا كنت تبحث عن أثاث يعكس هوية مساحتك ووظيفتها وجمالها، فقد حان الوقت للتواصل معنا. زر ورشتنا في بيكاسي أو تواصل مع فريقنا للاستشارة:',
      workshopHeading: 'ورشة بيكاسي',
      workshopLabel: 'ورشة بيكاسي:',
      workshopParagraph:
        'ورشتنا مجهزة بمرافق تصنيع متكاملة لصناعة الأثاث الصناعي المخصص. فريقنا الخبير جاهز لمناقشة احتياجاتك ومساعدتك في العثور على الحل الأمثل.',
      button: 'تواصل معنا'
    }
  },
  zh: {
    meta: {
      title: '定制订单 - Mangala Living',
      description:
        '根据您的需求定制工业风家具。Mangala Living 贝卡西工坊为咖啡馆、餐厅、办公室及家庭提供定制服务。'
    },
    hero: {
      title: '定制订单',
      imageAlt: '定制订单 Mangala Living - 贝卡西工业家具工坊',
      imageTitle: '定制订单 - 工业家具制造'
    },
    message: {
      title: '每个人都有自己的品味',
      paragraphs: [
        '这样的品味往往无法通过现成产品来表达。因此我们欢迎那些追求更个性化作品的人——让家具更贴近你的性格、功能需求与美学价值。',
        '我们不只是制作家具，而是从理解开始塑造：理解你的生活方式、想打造的空间，以及你想在其中呈现的故事。'
      ],
      imageAlt: 'Mangala Living 定制家具设计'
    },
    ideas: {
      title: '从简单的想法开始',
      intro:
        '无需复杂表述，只要告诉我们你的想法。想要一个特殊尺寸的开放式置物架？放在最喜欢角落的舒适躺椅？或是一套让咖啡馆充满活力的餐桌椅？所有这些都可以从零开始设计，完全满足你的需求与氛围设定。',
      description:
        '我们相信每个人在布置空间时都有独特的偏好。有人喜欢丰富的细节，也有人钟爱简洁利落的线条。在 Mangala Living，这些设计取向不仅可能，更是我们的专长。我们的团队熟悉各种风格需求：华丽而带经典细节的风格、自然温润的氛围，以及干练现代且注重功能性的表达。'
    },
    process: {
      title: '可信赖的流程',
      steps: [
        {
          title: '初步咨询',
          description: '向我们发送你的灵感——图片、手绘草图或简单备注，我们会帮助你把想法具象化。'
        },
        {
          title: '材料与设计选择',
          description: '我们会推荐最合适的材料方案，并根据需求完成设计。'
        },
        {
          title: '高品质生产',
          description: '经验丰富的生产团队以高标准、高精度完成制作。'
        },
        {
          title: '交付与安装',
          description: '提供安全配送及安装支持，直到家具完美呈现在你的空间中。'
        }
      ]
    },
    cta: {
      title: '准备好开始了吗？',
      intro:
        '如果你想要能够体现空间身份、功能与美感的家具，现在就与我们联系吧。欢迎参观我们的贝卡西工坊或与团队洽谈咨询：',
      workshopHeading: '贝卡西工坊',
      workshopLabel: '贝卡西工坊：',
      workshopParagraph:
        '我们的工坊配备完善的制造设施，能打造各类工业风定制家具。经验丰富的团队随时准备讨论你的需求，并帮助你找到最佳解决方案。',
      button: '联系我们'
    }
  },
  ja: {
    meta: {
      title: 'カスタムオーダー - Mangala Living',
      description:
        'ニーズに合わせた工業系カスタム家具を制作します。Mangala Living ベカシ工房はカフェ、レストラン、オフィス、住宅向けのオーダーメイドに対応しています。'
    },
    hero: {
      title: 'カスタムオーダー',
      imageAlt: 'カスタムオーダー Mangala Living - ベカシ工業家具ワークショップ',
      imageTitle: 'カスタムオーダー - 工業家具の製造'
    },
    message: {
      title: '人それぞれのこだわりがあります',
      paragraphs: [
        '既製品では表現しきれないこだわりも多くあります。だからこそ、よりパーソナルで、あなたの個性や機能、美学に寄り添ったものを求める方々を歓迎しています。',
        '私たちは単に家具を作るのではなく、あなたのライフスタイル、理想の空間、そこに込めたいストーリーを理解するところから形にしていきます。'
      ],
      imageAlt: 'Mangala Living のカスタム家具デザイン'
    },
    ideas: {
      title: 'シンプルなアイデアから始まります',
      intro:
        '難しく考えず、まずは思い描くものを教えてください。特別なサイズのオープンラックが欲しい？お気に入りのコーナーに合わせたラウンジチェア？カフェの雰囲気を高めるダイニングセット？すべてゼロから設計し、求める雰囲気に仕上げられます。',
      description:
        '誰もが空間づくりに独自のセンスを持っています。ディテール豊かなスタイルを好む人もいれば、シンプルで明快なラインを好む人も。Mangala Living ではそうしたアプローチがすべて可能であり、それが私たちの強みです。クラシックなアクセントを活かした豪華なテイスト、自然で温かみのある雰囲気、そして機能的でモダンな表現に至るまで幅広い要望に対応してきました。'
    },
    process: {
      title: '信頼できる実際のプロセス',
      steps: [
        {
          title: '初回ヒアリング',
          description:
            '写真やスケッチ、メモなど、インスピレーションとなるものをお送りください。私たちが具体的な形に落とし込みます。'
        },
        {
          title: '素材とデザインの選定',
          description: '最適な素材をご提案し、ご要望に沿ったデザインを作成します。'
        },
        {
          title: '高品質な製作',
          description: '経験豊富な生産チームが、高い基準と精度で製作を行います。'
        },
        {
          title: '配送と設置',
          description:
            '安全な配送と設置サポートを提供し、家具が理想的な状態になるまで寄り添います。'
        }
      ]
    },
    cta: {
      title: 'さあ、始めましょう',
      intro:
        '空間のアイデンティティや機能、美しさを体現する家具をお求めなら、ぜひお気軽にご相談ください。ベカシ工房へのご来訪やお問い合わせをお待ちしています。',
      workshopHeading: 'ベカシ工房',
      workshopLabel: 'ベカシ工房：',
      workshopParagraph:
        '工房には産業系カスタム家具を製作するための設備が整っています。経験豊富なチームがニーズを丁寧にヒアリングし、最適な解決策をご提案します。',
      button: 'お問い合わせ'
    }
  },
  es: {
    meta: {
      title: 'Pedido Personalizado - Mangala Living',
      description:
        'Encarga muebles industriales a medida según tus necesidades. El taller Mangala Living en Bekasi atiende cafés, restaurantes, oficinas y hogares.'
    },
    hero: {
      title: 'Pedido Personalizado',
      imageAlt: 'Pedido personalizado Mangala Living - Taller de muebles industriales en Bekasi',
      imageTitle: 'Pedido personalizado - Fabricación de muebles industriales'
    },
    message: {
      title: 'Cada persona tiene su propio estilo',
      paragraphs: [
        'Y muchas veces ese estilo no se refleja en los productos prediseñados del mercado. Por eso abrimos la puerta a quienes desean algo más personal, más cercano a la identidad, función y estética que imaginan.',
        'No solo fabricamos muebles: los construimos a partir de la comprensión de tu estilo de vida, del espacio que quieres crear y de la historia que quieres contar en él.'
      ],
      imageAlt: 'Diseño de muebles personalizados Mangala Living'
    },
    ideas: {
      title: 'Todo comienza con una idea sencilla',
      intro:
        'Cuéntanos lo que deseas sin complicaciones. ¿Necesitas un estante abierto a medida? ¿Un sillón relajante para tu rincón favorito? ¿O un juego de comedor que revitalice tu café? Podemos diseñarlo desde cero según tus necesidades y la atmósfera que buscas crear.',
      description:
        'Creemos que cada persona tiene un gusto único al diseñar espacios. Algunas disfrutan de los detalles ricos; otras prefieren líneas limpias y sencillas. En Mangala Living todas esas aproximaciones son posibles y forman parte de nuestra especialidad. Nuestro equipo está acostumbrado a trabajar con estilos muy variados: desde detalles clásicos y elegantes, pasando por una estética natural y cálida, hasta un lenguaje moderno y funcional.'
    },
    process: {
      title: 'Un proceso real y confiable',
      steps: [
        {
          title: 'Consulta inicial',
          description:
            'Envíanos tus referencias—imágenes, bocetos o notas. Te ayudaremos a convertir la idea en un plan concreto.'
        },
        {
          title: 'Selección de materiales y diseño',
          description:
            'Recomendamos los materiales más adecuados y desarrollamos el diseño acorde a tus necesidades.'
        },
        {
          title: 'Producción de alta calidad',
          description: 'Nuestro equipo experimentado trabaja con precisión y altos estándares de calidad.'
        },
        {
          title: 'Entrega e instalación',
          description:
            'Coordinamos un envío seguro y brindamos apoyo en la instalación hasta que el mobiliario quede perfectamente instalado.'
        }
      ]
    },
    cta: {
      title: '¿Listo para comenzar?',
      intro:
        'Si buscas muebles que representen la identidad, funcionalidad y estética de tu espacio, hablemos ahora. Visita nuestro taller en Bekasi o contáctanos para una asesoría:',
      workshopHeading: 'Taller de Bekasi',
      workshopLabel: 'Taller de Bekasi:',
      workshopParagraph:
        'Nuestro taller cuenta con instalaciones completas para fabricar muebles industriales a medida. El equipo está preparado para dialogar sobre tus necesidades y ayudarte a encontrar la mejor solución.',
      button: 'Contáctanos'
    }
  },
  fr: {
    meta: {
      title: 'Commande sur mesure - Mangala Living',
      description:
        'Commandez un mobilier industriel sur mesure adapté à vos besoins. L’atelier Mangala Living de Bekasi travaille pour cafés, restaurants, bureaux et particuliers.'
    },
    hero: {
      title: 'Commande sur mesure',
      imageAlt: 'Commande sur mesure Mangala Living - Atelier de mobilier industriel à Bekasi',
      imageTitle: 'Commande sur mesure - Fabrication de mobilier industriel'
    },
    message: {
      title: 'Chacun a ses propres goûts',
      paragraphs: [
        'Et ces goûts ne peuvent pas toujours être reflétés par des produits standards. C’est pourquoi nous accueillons ceux qui recherchent une solution plus personnelle, fidèle à leur identité, leurs fonctions et leur esthétique.',
        'Nous ne nous contentons pas de fabriquer des meubles : nous les concevons à partir d’une compréhension profonde de votre style de vie, de l’espace que vous souhaitez créer et de l’histoire que vous voulez y raconter.'
      ],
      imageAlt: 'Mangala Living - Conception de mobilier sur mesure'
    },
    ideas: {
      title: 'Tout part d’une idée simple',
      intro:
        'Expliquez-nous simplement votre souhait. Un rayonnage ouvert sur mesure ? Un fauteuil confortable pour votre coin préféré ? Ou un ensemble de table pour dynamiser l’ambiance de votre café ? Tout peut être conçu depuis zéro pour correspondre à vos besoins et à l’atmosphère recherchée.',
      description:
        'Nous sommes convaincus que chacun possède un sens unique de l’aménagement. Certains aiment les détails élaborés, d’autres préfèrent des lignes nettes et épurées. Chez Mangala Living, ces différentes approches sont notre spécialité. Notre équipe a l’habitude de répondre à des demandes variées : accents classiques et élégants, styles naturels et chaleureux ou encore lignes contemporaines affirmées mais fonctionnelles.'
    },
    process: {
      title: 'Un processus concret et fiable',
      steps: [
        {
          title: 'Consultation initiale',
          description:
            'Envoyez-nous vos inspirations—photos, croquis ou notes. Nous vous aidons à transformer l’idée en plan concret.'
        },
        {
          title: 'Choix des matériaux et conception',
          description:
            'Nous recommandons les meilleurs matériaux et élaborons un design en phase avec vos besoins.'
        },
        {
          title: 'Production de qualité',
          description:
            'Notre équipe de production expérimentée travaille avec précision et selon des normes de qualité élevées.'
        },
        {
          title: 'Livraison et installation',
          description:
            'Livraison sécurisée et assistance à l’installation jusqu’à ce que le mobilier soit parfaitement en place.'
        }
      ]
    },
    cta: {
      title: 'Prêt à commencer ?',
      intro:
        'Si vous souhaitez un mobilier qui reflète l’identité, la fonctionnalité et l’esthétique de votre espace, parlons-en ensemble. Visitez notre atelier de Bekasi ou contactez notre équipe pour une consultation :',
      workshopHeading: 'Atelier de Bekasi',
      workshopLabel: 'Atelier de Bekasi :',
      workshopParagraph:
        'Notre atelier dispose d’équipements complets pour créer des meubles industriels sur mesure. Notre équipe expérimentée est prête à étudier vos besoins et à proposer la meilleure solution.',
      button: 'Contactez-nous'
    }
  },
  ko: {
    meta: {
      title: '맞춤 주문 - Mangala Living',
      description:
        '필요에 맞춘 산업용 맞춤 가구를 제작합니다. Mangala Living 베카시 작업실은 카페, 레스토랑, 사무실, 주거 공간을 위한 맞춤 제작을 제공합니다.'
    },
    hero: {
      title: '맞춤 주문',
      imageAlt: '맞춤 주문 Mangala Living - 베카시 산업용 가구 공방',
      imageTitle: '맞춤 주문 - 산업용 가구 제작'
    },
    message: {
      title: '사람마다 취향이 다릅니다',
      paragraphs: [
        '그 취향은 기존 제품으로는 표현하기 어려울 때가 많습니다. 그래서 우리는 더 개인적이고, 당신의 개성과 기능, 미학을 그대로 담아낼 가구를 원하는 분들을 환영합니다.',
        '우리는 단순히 가구를 만드는 것이 아니라, 당신의 라이프스타일, 만들고 싶은 공간, 그리고 그 안에 담고 싶은 이야기를 이해하는 것에서 출발합니다.'
      ],
      imageAlt: 'Mangala Living 맞춤 가구 디자인'
    },
    ideas: {
      title: '간단한 아이디어에서 출발합니다',
      intro:
        '복잡하게 설명하지 않아도 됩니다. 특별한 크기의 오픈 선반이 필요하신가요? 가장 좋아하는 공간에 어울리는 라운지 체어? 카페 분위기를 살려줄 다이닝 세트? 모든 것을 처음부터 설계하여 원하는 분위기와 기능에 맞춰 제작할 수 있습니다.',
      description:
        '모든 사람은 공간을 꾸미는 자신만의 감각이 있습니다. 풍부한 디테일을 좋아하는 분도 있고, 깔끔하고 간결한 라인을 선호하는 분도 있습니다. Mangala Living에서는 이러한 다양한 디자인 접근이 가능하며, 바로 우리의 전문 분야입니다. 클래식한 디테일을 살린 웅장한 스타일부터 자연스럽고 따뜻한 무드, 뚜렷하면서도 기능적인 현대 스타일까지 다양한 요청을 다뤄왔습니다.'
    },
    process: {
      title: '신뢰할 수 있는 실제 프로세스',
      steps: [
        {
          title: '초기 상담',
          description:
            '이미지, 스케치, 간단한 메모 등 영감을 주는 자료를 보내주세요. 아이디어를 구체화해 드립니다.'
        },
        {
          title: '소재 및 디자인 선정',
          description: '가장 적합한 소재를 추천하고, 요구 사항에 맞는 디자인을 완성합니다.'
        },
        {
          title: '고품질 생산',
          description: '숙련된 생산팀이 높은 기준과 정밀도로 제작합니다.'
        },
        {
          title: '배송 및 설치',
          description:
            '안전한 배송과 설치 지원을 제공하며, 가구가 완벽히 자리 잡을 때까지 함께합니다.'
        }
      ]
    },
    cta: {
      title: '시작할 준비가 되셨나요?',
      intro:
        '공간의 아이덴티티와 기능, 미적 가치를 표현할 수 있는 가구를 찾고 계시다면 지금 상담해 보세요. 베카시 공방 방문 또는 문의를 환영합니다:',
      workshopHeading: '베카시 공방',
      workshopLabel: '베카시 공방:',
      workshopParagraph:
        '공방에는 산업용 맞춤 가구를 제작할 수 있는 설비가 갖춰져 있습니다. 경험 많은 팀이 요구 사항을 함께 논의하고 최적의 솔루션을 제안해 드립니다.',
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

      <Header isIndonesian={isIndonesian} language={language} />

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
              <p className="footer-phone">+6288801146881</p>
            </div>
          </div>

          <p className="custom-order-cta-description">{t.cta.workshopParagraph}</p>

          <div className="custom-order-cta-buttons">
            <a
              href="https://wa.me/+6288801146881"
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
