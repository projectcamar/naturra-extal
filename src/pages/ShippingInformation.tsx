import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { Clock, MapPin, Phone, Mail, Globe } from 'lucide-react'
import Footer from '../components/Footer'
import NaturraHeader from '../components/NaturraHeader'
import ServiceAreasSection from '../components/ServiceAreasSection'
// Premium Agricultural Commodity Images
const heroImage = 'https://images.unsplash.com/photo-1586528116311-ad866efd92bf?w=1920&q=80'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import './ShippingInformation.css'

type ShippingTranslation = {
  meta: {
    title: string
    description: string
    keywords: string
  }
  heroTitle: string
  mainSection: {
    title: string
    paragraph: string
  }
  timesSection: {
    title: string
    items: Array<{ region: string; duration: string }>
  }
  containerSection: {
    title: string
    description: string
  }
  pricingSection: {
    title: string
    paragraphs: string[]
  }
  responsibilitySection: {
    title: string
    paragraphs: string[]
  }
  contactSection: {
    title: string
    description: string
    addressLabel: string
    phoneLabel: string
    emailLabel: string
    websiteLabel: string
    workshopLabel: string
  }
}

const SHIPPING_TRANSLATIONS: Record<LanguageCode, ShippingTranslation> = {
  en: {
    meta: {
      title: 'Shipping Information - Naturra Extal',
      description:
        'Complete information about agricultural commodity shipping from Naturra Extal. Shipping times, vessel procedures, and international export procedures.',
      keywords: 'agricultural shipping, commodity export, cocoa export, cloves shipping, cocopeat logistics'
    },
    heroTitle: 'Shipping Information',
    mainSection: {
      title: 'Shipping from Indonesia to Worldwide',
      paragraph:
        'We ship from the port of Tanjung Priok, Jakarta, Indonesia. Shipping to most international ports takes approximately four weeks from Indonesia.'
    },
    timesSection: {
      title: 'Shipping Times to Major World Ports',
      items: [
        { region: 'USA West Coast Ports', duration: '4 weeks' },
        { region: 'USA East Coast Ports', duration: '4-5 weeks' },
        { region: 'U.K. Ports', duration: '3-4 weeks' },
        { region: 'European Ports', duration: '3-4 weeks' },
        { region: 'Middle Eastern Ports', duration: '3-4 weeks' },
        { region: 'Asian Ports', duration: '2-3 weeks' }
      ]
    },
    containerSection: {
      title: 'Shipping Volume by Containers',
      description:
        "Our shipping volumes are by 20' (twenty foot) & 40' (forty foot) & 40'HC (forty foot high cube) containers."
    },
    pricingSection: {
      title: 'Shipping Cost Information',
      paragraphs: [
        'All of our shipping quotes include document fees, local handling and trucking fees, port loading fees and all other local charges levied in the packing and delivery of your container to your port.',
        "D.D.C fees (Document & Destination Charge) levied by the port of destination are not included. Some international ports charge a D.D.C fee upon the arrival and handling of your shipment in your local port. Check with your customs department for more information on D.D.C charges."
      ]
    },
    responsibilitySection: {
      title: 'Shipping Responsibility',
      paragraphs: [
        'We are not a cargo company and we are not responsible for any damage caused by shipping and handling of your order by the cargo companies that handle our shipments. Although we have our own cargo companies, we do highly recommend that you use your own cargo company with an agent in your local area.',
        "If you don't have a cargo company, we can suggest a few companies to choose from. However, we accept no responsibility for the reliability or quality of service from any cargo company.",
        'We are in very good cooperation with many reliable freight forwarders and shipping lines. In the event no shipping is specified, we are free to appoint shipping in the best interest of customers.'
      ]
    },
    contactSection: {
      title: 'For More Information',
      description: 'For more information, please send an email to us.',
      addressLabel: 'Address',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      websiteLabel: 'Website',
      workshopLabel: 'Workshop Bekasi:'
    }
  },
  id: {
    meta: {
      title: 'Informasi Pengiriman - Naturra Extal',
      description:
        'Informasi lengkap tentang pengiriman komoditas pertanian dari Naturra Extal. Waktu pengiriman, prosedur kapal, dan ekspor internasional.',
      keywords: 'pengiriman pertanian, ekspor komoditas, pengiriman cokelat, ekspor cengkeh, logistik cocopeat'
    },
    heroTitle: 'Informasi Pengiriman',
    mainSection: {
      title: 'Pengiriman dari Indonesia ke Seluruh Dunia',
      paragraph:
        'Kami mengirim dari pelabuhan Tanjung Priok, Jakarta, Indonesia. Pengiriman ke sebagian besar pelabuhan internasional membutuhkan waktu sekitar empat minggu dari Indonesia.'
    },
    timesSection: {
      title: 'Waktu Pengiriman ke Pelabuhan Utama Dunia',
      items: [
        { region: 'Pelabuhan Pantai Barat AS', duration: '4 minggu' },
        { region: 'Pelabuhan Pantai Timur AS', duration: '4-5 minggu' },
        { region: 'Pelabuhan Inggris', duration: '3-4 minggu' },
        { region: 'Pelabuhan Eropa', duration: '3-4 minggu' },
        { region: 'Pelabuhan Timur Tengah', duration: '3-4 minggu' },
        { region: 'Pelabuhan Asia', duration: '2-3 minggu' }
      ]
    },
    containerSection: {
      title: 'Volume Pengiriman dengan Kontainer',
      description:
        "Volume pengiriman kami menggunakan kontainer 20' (dua puluh kaki) & 40' (empat puluh kaki) & 40'HC (empat puluh kaki high cube)."
    },
    pricingSection: {
      title: 'Informasi Biaya Pengiriman',
      paragraphs: [
        'Semua penawaran pengiriman kami mencakup biaya dokumen, penanganan lokal dan biaya truk, biaya pemuatan pelabuhan, dan semua biaya lokal lainnya yang dikenakan dalam pengepakan dan pengiriman kontainer Anda ke pelabuhan Anda.',
        'Biaya D.D.C (Document & Destination Charge) yang dikenakan oleh pelabuhan tujuan tidak termasuk. Beberapa pelabuhan internasional mengenakan biaya D.D.C saat kedatangan dan penanganan pengiriman Anda di pelabuhan lokal Anda. Silakan periksa dengan departemen bea cukai Anda untuk informasi lebih lanjut tentang biaya D.D.C.'
      ]
    },
    responsibilitySection: {
      title: 'Tanggung Jawab Pengiriman',
      paragraphs: [
        'Kami bukan perusahaan kargo dan tidak bertanggung jawab atas kerusakan yang disebabkan oleh pengiriman dan penanganan pesanan Anda oleh perusahaan kargo yang menangani pengiriman kami. Meskipun kami memiliki perusahaan kargo sendiri, kami sangat merekomendasikan Anda menggunakan perusahaan kargo sendiri dengan agen di area lokal Anda.',
        'Jika Anda tidak memiliki perusahaan kargo, kami dapat menyarankan beberapa perusahaan untuk dipilih. Namun, kami tidak menerima tanggung jawab atas keandalan atau kualitas layanan dari perusahaan kargo mana pun.',
        'Kami memiliki kerja sama yang sangat baik dengan banyak forwarder dan jalur pengiriman yang dapat diandalkan. Jika tidak ada pengiriman yang ditentukan, kami bebas menunjuk pengiriman yang terbaik untuk kepentingan pelanggan.'
      ]
    },
    contactSection: {
      title: 'Informasi Lebih Lanjut',
      description: 'Untuk informasi lebih lanjut, silakan kirim email kepada kami.',
      addressLabel: 'Alamat',
      phoneLabel: 'Telepon',
      emailLabel: 'Email',
      websiteLabel: 'Website',
      workshopLabel: 'Workshop Bekasi:'
    }
  },
  ar: {
    meta: {
      title: 'معلومات الشحن - Naturra Extal',
      description:
        'معلومات كاملة عن شحن الأثاث من Naturra Extal. أوقات الشحن، التكاليف، وإجراءات الشحن الدولي.',
      keywords: 'شحن الأثاث، تصدير الأثاث، الشحن الدولي، أوقات الشحن'
    },
    heroTitle: 'معلومات الشحن',
    mainSection: {
      title: 'الشحن من إندونيسيا إلى مختلف أنحاء العالم',
      paragraph:
        'نشحن من ميناء تانجونغ بريوك في جاكرتا، إندونيسيا. يستغرق الشحن إلى معظم الموانئ الدولية حوالي أربعة أسابيع من إندونيسيا.'
    },
    timesSection: {
      title: 'أوقات الشحن إلى أبرز موانئ العالم',
      items: [
        { region: 'موانئ الساحل الغربي للولايات المتحدة', duration: '4 أسابيع' },
        { region: 'موانئ الساحل الشرقي للولايات المتحدة', duration: '4-5 أسابيع' },
        { region: 'موانئ المملكة المتحدة', duration: '3-4 أسابيع' },
        { region: 'الموانئ الأوروبية', duration: '3-4 أسابيع' },
        { region: 'موانئ الشرق الأوسط', duration: '3-4 أسابيع' },
        { region: 'الموانئ الآسيوية', duration: '2-3 أسابيع' }
      ]
    },
    containerSection: {
      title: 'حجم الشحن حسب الحاويات',
      description: 'نستخدم حاويات بطول 20 قدمًا و40 قدمًا و40 قدمًا عالي المكعب في جميع شحناتنا.'
    },
    pricingSection: {
      title: 'معلومات تكاليف الشحن',
      paragraphs: [
        'تشمل جميع عروض الشحن الخاصة بنا رسوم المستندات، ورسوم المناولة والنقل المحلية، ورسوم التحميل في الميناء، وكل الرسوم المحلية الأخرى المرتبطة بتعبئة وتسليم حاويتك إلى الميناء الخاص بك.',
        'لا تشمل العروض رسوم الوجهة والمستندات (D.D.C) التي يفرضها ميناء الوصول. بعض الموانئ الدولية تفرض هذه الرسوم عند وصول الشحنة والتعامل معها في مينائك المحلي. يرجى مراجعة قسم الجمارك لديكم لمعرفة التفاصيل.'
      ]
    },
    responsibilitySection: {
      title: 'مسؤولية الشحن',
      paragraphs: [
        'لسنا شركة شحن، ولسنا مسؤولين عن أي ضرر ناتج عن شحن أو مناولة طلبك من قبل شركات الشحن التي تتولى شحن منتجاتنا. على الرغم من تعاملنا مع شركات شحن خاصة بنا، إلا أننا نوصي باستخدام شركة الشحن الخاصة بك مع وكيل محلي.',
        'إذا لم يكن لديك شركة شحن، يمكننا اقتراح بعض الشركات للاختيار من بينها، لكننا لا نتحمل أي مسؤولية عن موثوقية أو جودة الخدمة لأي شركة شحن.',
        'نتعاون بشكل وثيق مع العديد من شركات الشحن وخطوط الملاحة الموثوقة. وفي حال لم يتم تحديد شركة شحن، يحق لنا تعيين الخيار الأنسب لمصلحة العملاء.'
      ]
    },
    contactSection: {
      title: 'معلومات إضافية',
      description: 'لمزيد من المعلومات، يرجى مراسلتنا عبر البريد الإلكتروني.',
      addressLabel: 'العنوان',
      phoneLabel: 'الهاتف',
      emailLabel: 'البريد الإلكتروني',
      websiteLabel: 'الموقع الإلكتروني',
      workshopLabel: 'ورشة بيكاسي:'
    }
  },
  zh: {
    meta: {
      title: '运输信息 - Naturra Extal',
      description:
        'Naturra Extal 家具运输的完整说明。运输时间、费用以及国际运输流程。',
      keywords: '家具运输, 国际运输, 家具出口, 运输时间'
    },
    heroTitle: '运输信息',
    mainSection: {
      title: '从印度尼西亚运往全球',
      paragraph:
        '我们从印度尼西亚雅加达的丹戎不碌港出货。运输到大多数国际港口大约需要四周时间。'
    },
    timesSection: {
      title: '运往全球主要港口的时间',
      items: [
        { region: '美国西海岸港口', duration: '4 周' },
        { region: '美国东海岸港口', duration: '4-5 周' },
        { region: '英国港口', duration: '3-4 周' },
        { region: '欧洲港口', duration: '3-4 周' },
        { region: '中东港口', duration: '3-4 周' },
        { region: '亚洲港口', duration: '2-3 周' }
      ]
    },
    containerSection: {
      title: '按集装箱计算的运输体积',
      description: '我们使用 20 英尺、40 英尺以及 40 英尺高箱集装箱进行出货。'
    },
    pricingSection: {
      title: '运费信息',
      paragraphs: [
        '我们的运费报价包含文件费用、本地装卸及运输费用、港口装载费用，以及将集装箱送至贵港口所涉及的所有其他本地费用。',
        '目的港收取的 D.D.C（文件与目的地费用）不包含在内。部分国际港口在货物到达并在当地港口处理时会收取 D.D.C 费用。请向当地海关咨询更多信息。'
      ]
    },
    responsibilitySection: {
      title: '运输责任声明',
      paragraphs: [
        '我们不是货运公司，对于货运公司在运输和搬运过程中造成的任何损坏不承担责任。尽管我们与固定的货运公司合作，但我们建议您使用本地代理的自有货运公司。',
        '如果您没有指定货运公司，我们可以提供一些备选方案，但无法对任何货运公司的可靠性或服务质量承担责任。',
        '我们与多家可靠的货运代理和航运公司保持良好合作。如果未指定承运方，我们会以客户利益为先选择最合适的方案。'
      ]
    },
    contactSection: {
      title: '更多信息',
      description: '如需更多信息，请发送电子邮件与我们联系。',
      addressLabel: '地址',
      phoneLabel: '电话',
      emailLabel: '邮箱',
      websiteLabel: '网站',
      workshopLabel: '贝卡西工坊：'
    }
  },
  ja: {
    meta: {
      title: '配送情報 - Naturra Extal',
      description:
        'Naturra Extal の家具配送に関する詳細情報。配送時間、費用、国際配送の手順についてご案内します。',
      keywords: '家具 配送, 国際配送, 家具輸出, 配送時間'
    },
    heroTitle: '配送情報',
    mainSection: {
      title: 'インドネシアから世界各地へ配送',
      paragraph:
        'インドネシア・ジャカルタのタンジュンプリオク港から出荷しています。多くの国際港へはおおよそ4週間で到着します。'
    },
    timesSection: {
      title: '主要港への配送リードタイム',
      items: [
        { region: '米国西海岸の港', duration: '4週間' },
        { region: '米国東海岸の港', duration: '4〜5週間' },
        { region: '英国の港', duration: '3〜4週間' },
        { region: 'ヨーロッパの港', duration: '3〜4週間' },
        { region: '中東の港', duration: '3〜4週間' },
        { region: 'アジアの港', duration: '2〜3週間' }
      ]
    },
    containerSection: {
      title: 'コンテナによる出荷ボリューム',
      description: '出荷には20フィート、40フィート、40フィート・ハイキューブのコンテナを使用しています。'
    },
    pricingSection: {
      title: '配送費用について',
      paragraphs: [
        '弊社のお見積もりには、書類費用、現地でのハンドリング・トラック費用、港での積込み費用など、コンテナをお客様の港へ届けるまでに発生するすべての現地費用が含まれます。',
        '目的港で徴収される D.D.C（書類および目的地手数料）は含まれていません。一部の国際港では、貨物到着時および現地港での取り扱い時に D.D.C が発生します。詳細は現地税関へご確認ください。'
      ]
    },
    responsibilitySection: {
      title: '配送に関する責任範囲',
      paragraphs: [
        '当社は貨物会社ではなく、弊社の貨物を取り扱う運送会社によって生じた損害について責任を負いません。提携業者はありますが、可能であればお客様ご自身の貨物会社（現地代理店あり）をご利用いただくことをおすすめします。',
        '貨物会社をお持ちでない場合は幾つか候補をご案内できますが、各社の信頼性やサービス品質について当社は責任を負いません。',
        '当社は信頼できるフォワーダーや船会社と良好な協力体制を築いています。特定の指示がない場合は、お客様の利益を最優先に適切な輸送手段を手配いたします。'
      ]
    },
    contactSection: {
      title: 'さらに詳しい情報について',
      description: '詳細についてはメールでお問い合わせください。',
      addressLabel: '住所',
      phoneLabel: '電話',
      emailLabel: 'メール',
      websiteLabel: 'ウェブサイト',
      workshopLabel: 'ベカシ工房：'
    }
  },
  es: {
    meta: {
      title: 'Información de Envío - Naturra Extal',
      description:
        'Información completa sobre el envío de muebles de Naturra Extal. Tiempos de entrega, costos y procedimientos de envío internacional.',
      keywords: 'envío de muebles, exportación de muebles, envío internacional, tiempos de envío'
    },
    heroTitle: 'Información de Envío',
    mainSection: {
      title: 'Envíos desde Indonesia hacia el mundo',
      paragraph:
        'Despachamos desde el puerto de Tanjung Priok en Yakarta, Indonesia. El envío hacia la mayoría de los puertos internacionales toma aproximadamente cuatro semanas desde Indonesia.'
    },
    timesSection: {
      title: 'Tiempos de envío hacia los principales puertos del mundo',
      items: [
        { region: 'Puertos de la costa oeste de EE. UU.', duration: '4 semanas' },
        { region: 'Puertos de la costa este de EE. UU.', duration: '4-5 semanas' },
        { region: 'Puertos del Reino Unido', duration: '3-4 semanas' },
        { region: 'Puertos europeos', duration: '3-4 semanas' },
        { region: 'Puertos de Oriente Medio', duration: '3-4 semanas' },
        { region: 'Puertos asiáticos', duration: '2-3 semanas' }
      ]
    },
    containerSection: {
      title: 'Volumen de envío por contenedores',
      description: 'Nuestros embarques utilizan contenedores de 20 pies, 40 pies y 40 pies high cube.'
    },
    pricingSection: {
      title: 'Información de costos de envío',
      paragraphs: [
        'Todas nuestras cotizaciones incluyen tarifas de documentación, manejo y transporte local, cargos de carga en el puerto y cualquier otro cargo local asociado al embalaje y entrega del contenedor hasta su puerto.',
        'Las tarifas D.D.C (Document & Destination Charge) cobradas por el puerto de destino no están incluidas. Algunos puertos internacionales aplican esta tarifa al recibir y manipular su envío en el puerto local. Consulte con su oficina de aduanas para más detalles.'
      ]
    },
    responsibilitySection: {
      title: 'Responsabilidad del envío',
      paragraphs: [
        'No somos una compañía de carga y no asumimos responsabilidad por los daños ocasionados durante el transporte o la manipulación de su pedido por parte de las empresas que gestionan nuestros envíos. Aunque trabajamos con transportistas de confianza, recomendamos utilizar su propia empresa de carga con un agente en su localidad.',
        'Si no cuenta con un proveedor logístico, podemos sugerir algunas opciones, pero no podemos responsabilizarnos por la fiabilidad o calidad del servicio de dichas empresas.',
        'Trabajamos estrechamente con agentes de carga y navieras confiables. Si no se especifica un transportista, podemos seleccionar la opción que mejor proteja los intereses del cliente.'
      ]
    },
    contactSection: {
      title: 'Más información',
      description: 'Para obtener más información, envíanos un correo electrónico.',
      addressLabel: 'Dirección',
      phoneLabel: 'Teléfono',
      emailLabel: 'Correo electrónico',
      websiteLabel: 'Sitio web',
      workshopLabel: 'Taller de Bekasi:'
    }
  },
  fr: {
    meta: {
      title: 'Informations sur la Livraison - Naturra Extal',
      description:
        'Informations complètes sur l’expédition de meubles Naturra Extal : délais, coûts et procédures de livraison internationale.',
      keywords: 'expédition de meubles, exportation de meubles, livraison internationale, délais de livraison'
    },
    heroTitle: 'Informations sur la Livraison',
    mainSection: {
      title: 'Expédition depuis l’Indonésie vers le monde entier',
      paragraph:
        'Nous expédions depuis le port de Tanjung Priok à Jakarta, Indonésie. L’envoi vers la plupart des ports internationaux prend environ quatre semaines depuis l’Indonésie.'
    },
    timesSection: {
      title: 'Délais d’expédition vers les principaux ports mondiaux',
      items: [
        { region: 'Ports de la côte ouest des États-Unis', duration: '4 semaines' },
        { region: 'Ports de la côte est des États-Unis', duration: '4-5 semaines' },
        { region: 'Ports du Royaume-Uni', duration: '3-4 semaines' },
        { region: 'Ports européens', duration: '3-4 semaines' },
        { region: 'Ports du Moyen-Orient', duration: '3-4 semaines' },
        { region: 'Ports asiatiques', duration: '2-3 semaines' }
      ]
    },
    containerSection: {
      title: 'Volume d’expédition par conteneurs',
      description:
        'Nous utilisons des conteneurs de 20 pieds, 40 pieds et 40 pieds high cube pour nos expéditions.'
    },
    pricingSection: {
      title: 'Informations sur les coûts d’expédition',
      paragraphs: [
        'Toutes nos offres incluent les frais de documentation, les frais de manutention et de transport locaux, les frais de chargement au port ainsi que tous les autres frais locaux liés à l’emballage et à la livraison de votre conteneur jusqu’à votre port.',
        'Les frais D.D.C (Document & Destination Charge) facturés par le port de destination ne sont pas inclus. Certains ports internationaux appliquent ces frais à l’arrivée et lors de la manutention de votre cargaison. Veuillez contacter votre service des douanes pour plus d’informations.'
      ]
    },
    responsibilitySection: {
      title: 'Responsabilités liées à l’expédition',
      paragraphs: [
        'Nous ne sommes pas une société de transport et ne pouvons être tenus responsables des dommages causés par les entreprises de fret qui manipulent nos expéditions. Bien que nous travaillions avec des partenaires de confiance, nous recommandons d’utiliser votre propre transporteur disposant d’un agent local.',
        'Si vous n’avez pas de société de transport, nous pouvons vous proposer plusieurs options, mais nous ne pouvons garantir la fiabilité ni la qualité de service de ces prestataires.',
        'Nous collaborons avec de nombreux transitaires et compagnies maritimes fiables. En l’absence d’instructions spécifiques, nous nous réservons le droit de choisir la solution la plus avantageuse pour le client.'
      ]
    },
    contactSection: {
      title: 'Pour plus d’informations',
      description: 'Pour davantage de renseignements, veuillez nous envoyer un e-mail.',
      addressLabel: 'Adresse',
      phoneLabel: 'Téléphone',
      emailLabel: 'Email',
      websiteLabel: 'Site web',
      workshopLabel: 'Atelier de Bekasi :'
    }
  },
  ko: {
    meta: {
      title: '배송 정보 - Naturra Extal',
      description:
        'Naturra Extal 가구 배송에 대한 전체 안내. 배송 기간, 비용, 국제 배송 절차를 확인하세요.',
      keywords: '가구 배송, 국제 배송, 가구 수출, 배송 기간'
    },
    heroTitle: '배송 정보',
    mainSection: {
      title: '인도네시아에서 전 세계로 배송',
      paragraph:
        '인도네시아 자카르타의 탄중프리옥 항구에서 출고합니다. 대부분의 국제 항구까지 약 4주가 소요됩니다.'
    },
    timesSection: {
      title: '주요 항구까지의 예상 배송 기간',
      items: [
        { region: '미국 서부 해안 항구', duration: '4주' },
        { region: '미국 동부 해안 항구', duration: '4~5주' },
        { region: '영국 항구', duration: '3~4주' },
        { region: '유럽 항구', duration: '3~4주' },
        { region: '중동 항구', duration: '3~4주' },
        { region: '아시아 항구', duration: '2~3주' }
      ]
    },
    containerSection: {
      title: '컨테이너별 배송 용량',
      description: '당사는 20피트, 40피트, 40피트 하이큐브 컨테이너를 사용해 출고합니다.'
    },
    pricingSection: {
      title: '배송 비용 안내',
      paragraphs: [
        '모든 견적에는 서류 비용, 현지 취급 및 운송 비용, 항구 상차 비용, 컨테이너를 고객 항구까지 배송하는 데 필요한 모든 기타 현지 비용이 포함됩니다.',
        '도착 항구에서 부과되는 D.D.C(문서 및 목적지 비용)는 포함되어 있지 않습니다. 일부 국제 항구는 화물이 도착하여 현지에서 처리될 때 D.D.C 비용을 청구합니다. 자세한 내용은 해당 지역 관세청에 문의해 주세요.'
      ]
    },
    responsibilitySection: {
      title: '배송 책임 범위',
      paragraphs: [
        '당사는 화물 회사가 아니며, 화물을 운송하거나 취급하는 과정에서 발생한 손상에 대해 책임을 지지 않습니다. 신뢰할 수 있는 파트너사가 있지만, 가능하다면 현지 대리점이 있는 고객님의 전용 화물 회사를 이용하시길 권장합니다.',
        '화물 회사가 없는 경우 몇 가지 대안을 제안해 드릴 수 있으나, 해당 업체의 신뢰성과 서비스 품질에 대해서는 책임을 지지 않습니다.',
        '당사는 검증된 포워더 및 선사와 긴밀히 협력하고 있습니다. 별도 지정이 없는 경우 고객의 이익을 최우선으로 하여 적합한 운송 방법을 선정합니다.'
      ]
    },
    contactSection: {
      title: '추가 정보',
      description: '자세한 안내가 필요하시면 이메일로 문의해 주세요.',
      addressLabel: '주소',
      phoneLabel: '전화번호',
      emailLabel: '이메일',
      websiteLabel: '웹사이트',
      workshopLabel: '베카시 공방:'
    }
  }
}

const ShippingInformation: React.FC = () => {
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

    // Skip IP detection if user has stored preference or URL has language
    if (stored || urlLang !== 'en') {
      return
    }

    // Only detect from IP on first visit
    const detectIP = async () => {
      const ipLang = await detectLanguageFromIP()
      if (ipLang && !stored) {
        setLanguage(ipLang)
      }
    }

    detectIP()
  }, []) // Only run once on mount
  const isIndonesian = language === 'id'
  const t = SHIPPING_TRANSLATIONS[language] ?? SHIPPING_TRANSLATIONS.en

  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  return (
    <div className="shipping-information-page">
      <Helmet
        htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': language }}
      >
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link
            key={`shipping-hreflang-${alternate.hrefLang}`}
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

      <section className="shipping-hero">
        <div className="shipping-hero-image">
          <img
            src={heroImage}
            alt="Shipping Information - Informasi Pengiriman agricultural commodities Naturra Extal Seluruh Indonesia"
            title="Shipping Information - Delivery Service for Agricultural Commodities Across Indonesia"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
            itemProp="image"
            data-image-type="shipping-hero"
            data-category="shipping"
          />
          <div className="shipping-hero-overlay"></div>
        </div>
        <div className="shipping-hero-content">
          <h1 className="shipping-hero-title">{t.heroTitle}</h1>
        </div>
      </section>

      <section className="shipping-main-section">
        <div className="shipping-main-container">
          <div className="shipping-main-content">
            <h2 className="shipping-main-title">{t.mainSection.title}</h2>
            <div className="shipping-main-body">
              <p className="shipping-main-paragraph">{t.mainSection.paragraph}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="shipping-times-section">
        <div className="shipping-times-container">
          <h2 className="shipping-times-title">{t.timesSection.title}</h2>

          <div className="shipping-times-grid">
            {t.timesSection.items.map((item) => (
              <div className="shipping-time-item" key={item.region}>
                <div className="shipping-time-icon">
                  <Clock size={24} />
                </div>
                <div className="shipping-time-content">
                  <h3 className="shipping-time-region">{item.region}</h3>
                  <p className="shipping-time-duration">{item.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shipping-container-section">
        <div className="shipping-container-container">
          <h2 className="shipping-container-title">{t.containerSection.title}</h2>
          <div className="shipping-container-content">
            <p className="shipping-container-description">{t.containerSection.description}</p>
          </div>
        </div>
      </section>

      <section className="shipping-pricing-section">
        <div className="shipping-pricing-container">
          <h2 className="shipping-pricing-title">{t.pricingSection.title}</h2>
          <div className="shipping-pricing-content">
            {t.pricingSection.paragraphs.map((paragraph, index) => (
              <p className="shipping-pricing-description" key={`pricing-paragraph-${index}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="shipping-responsibility-section">
        <div className="shipping-responsibility-container">
          <h2 className="shipping-responsibility-title">{t.responsibilitySection.title}</h2>
          <div className="shipping-responsibility-content">
            {t.responsibilitySection.paragraphs.map((paragraph, index) => (
              <p className="shipping-responsibility-description" key={`responsibility-${index}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <ServiceAreasSection language={language} isIndonesian={isIndonesian} />

      <section className="shipping-contact-section">
        <div className="shipping-contact-container">
          <h2 className="shipping-contact-title">{t.contactSection.title}</h2>
          <p className="shipping-contact-description">{t.contactSection.description}</p>

          <div className="shipping-contact-info">
            <div className="shipping-contact-item">
              <div className="shipping-contact-icon">
                <MapPin size={20} />
              </div>
              <div className="shipping-contact-details">
                <h3 className="shipping-contact-label">{t.contactSection.addressLabel}</h3>
                <p className="shipping-contact-value">
                  <strong>{t.contactSection.workshopLabel}</strong>
                  <br />
                  <a
                    href="https://maps.app.goo.gl/5Bc5ymfVtAYRPtpK7"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#8B7355', textDecoration: 'underline' }}
                  >
                    Jl. Raya Setu Cibitung - Bekasi, Telajung, Kec. Cikarang Bar., Kabupaten Bekasi, Jawa
                    Barat 17320
                  </a>
                </p>
              </div>
            </div>

            <div className="shipping-contact-item">
              <div className="shipping-contact-icon">
                <Phone size={20} />
              </div>
              <div className="shipping-contact-details">
                <h3 className="shipping-contact-label">{t.contactSection.phoneLabel}</h3>
                <p className="shipping-contact-value">
                  <a
                    href="https://wa.me/+6289513957752"
                    style={{ color: '#8B7355', textDecoration: 'underline' }}
                    onClick={() => trackWhatsAppClick('shipping_info_contact')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +6289513957752
                  </a>
                </p>
              </div>
            </div>

            <div className="shipping-contact-item">
              <div className="shipping-contact-icon">
                <Mail size={20} />
              </div>
              <div className="shipping-contact-details">
                <h3 className="shipping-contact-label">{t.contactSection.emailLabel}</h3>
                <p className="shipping-contact-value">
                  <a
                    href="mailto:hello@naturraextal.com"
                    style={{ color: '#8B7355', textDecoration: 'underline' }}
                  >
                    naturraextal@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="shipping-contact-item">
              <div className="shipping-contact-icon">
                <Globe size={20} />
              </div>
              <div className="shipping-contact-details">
                <h3 className="shipping-contact-label">{t.contactSection.websiteLabel}</h3>
                <p className="shipping-contact-value">
                  <a
                    href="https://www.naturraextal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#8B7355', textDecoration: 'underline' }}
                  >
                    www.naturraextal.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer isIndonesian={isIndonesian} language={language} />
    </div>
  )
}

export default ShippingInformation

