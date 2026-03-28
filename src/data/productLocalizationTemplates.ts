import type { LanguageCode } from '../utils/languageManager'

export type ProductTemplateKey = 'storage' | 'outdoor' | 'table' | 'seating' | 'dining' | 'bar'

export const PRODUCT_TEMPLATE_KEYS: Record<string, ProductTemplateKey> = {
  'industrial-hanging-shelf': 'storage',
  'frame-loft-bookshelf': 'storage',
  'balcony-bar-table': 'outdoor',
  'lounge-set-coffee-table': 'table',
  'bench-corner-lounge': 'seating',
  'industrial-daybed-frame': 'seating',
  'bandung-pipe-dining-table': 'dining',
  'dining-set-with-2-chairs': 'dining',
  'beam-industrial-bar-chair': 'bar',
  'bar-stall-chair': 'bar',
  'steelframe-outdoor-bar-set': 'outdoor',
  'industrial-kitchen-cabinet': 'storage',
  'kabinet-lemari-industrial': 'storage',
  'hollowline-display-rack': 'storage',
  'ladder-frame-display-stand': 'storage',
  'industrial-coat-rack': 'storage',
  'meja-kerja-industrial': 'table'
}

export const PRODUCT_NAME_TRANSLATIONS: Record<
  string,
  Partial<Record<LanguageCode, string>>
> = {
  'industrial-hanging-shelf': {
    ar: 'رف تعليق صناعي',
    zh: '工业悬挂式置物架',
    ja: 'インダストリアル吊り下げ棚',
    es: 'Estante Colgante Industrial',
    fr: 'Étagère Murale Industrielle',
    ko: '인더스트리얼 행잉 선반'
  },
  'frame-loft-bookshelf': {
    ar: 'مكتبة إطار لوفت صناعية',
    zh: '工业风框架书架',
    ja: 'フレームロフトブックシェルフ',
    es: 'Librero Industrial tipo Loft',
    fr: 'Bibliothèque Industrielle Loft',
    ko: '인더스트리얼 프레임 로프트 책장'
  },
  'balcony-bar-table': {
    ar: 'طاولة بار للشرفة الصناعية',
    zh: '工业风阳台吧台桌',
    ja: 'インダストリアルバルコニーバーテーブル',
    es: 'Mesa de Bar para Balcón Industrial',
    fr: 'Table de Bar de Balcon Industrielle',
    ko: '인더스트리얼 발코니 바 테이블'
  },
  'lounge-set-coffee-table': {
    ar: 'طاولة قهوة لمجموعة الاسترخاء الصناعية',
    zh: '工业风休闲组合咖啡桌',
    ja: 'インダストリアルラウンジセットコーヒーテーブル',
    es: 'Mesa de Centro Industrial para Sala',
    fr: 'Table Basse Industrielle Lounge',
    ko: '인더스트리얼 라운지 세트 커피 테이블'
  },
  'bench-corner-lounge': {
    ar: 'كنبة زاوية صناعية',
    zh: '工业风转角休闲长椅',
    ja: 'インダストリアルコーナーベンチラウンジ',
    es: 'Banco Esquinero Industrial',
    fr: 'Banquette d’Angle Industrielle',
    ko: '인더스트리얼 코너 라운지 벤치'
  },
  'industrial-daybed-frame': {
    ar: 'إطار سرير نهاري صناعي',
    zh: '工业风日床框架',
    ja: 'インダストリアルデイベッドフレーム',
    es: 'Estructura de Camastro Industrial',
    fr: 'Structure de Méridienne Industrielle',
    ko: '인더스트리얼 데이베드 프레임'
  },
  'bandung-pipe-dining-table': {
    ar: 'طاولة طعام أنابيب باندونغ الصناعية',
    zh: '万隆管道工业餐桌',
    ja: 'バンドンパイプインダストリアルダイニングテーブル',
    es: 'Mesa de Comedor Industrial Bandung Pipe',
    fr: 'Table de Salle à Manger Industrielle Bandung Pipe',
    ko: '인더스트리얼 반둥 파이프 식탁'
  },
  'dining-set-with-2-chairs': {
    ar: 'طقم طعام صناعي مع كرسيين',
    zh: '工业风双椅餐桌套装',
    ja: '2脚チェア付きインダストリアルダイニングセット',
    es: 'Juego de Comedor Industrial con 2 Sillas',
    fr: 'Ensemble de Salle à Manger Industriel avec 2 Chaises',
    ko: '의자 2개 포함 인더스트리얼 다이닝 세트'
  },
  'beam-industrial-bar-chair': {
    ar: 'كرسي بار صناعي بعارضة',
    zh: '工业风梁式吧椅',
    ja: 'ビームインダストリアルバーチェア',
    es: 'Silla Alta de Bar Industrial Beam',
    fr: 'Chaise de Bar Industrielle Beam',
    ko: '인더스트리얼 빔 바 체어'
  },
  'bar-stall-chair': {
    ar: 'كرسي بار ستال صناعي',
    zh: '工业风吧台凳',
    ja: 'インダストリアルバーストールチェア',
    es: 'Silla Taburete de Bar Industrial',
    fr: 'Tabouret de Bar Industriel',
    ko: '인더스트리얼 바 스톨 체어'
  },
  'steelframe-outdoor-bar-set': {
    ar: 'طقم بار خارجي بإطار فولاذي صناعي',
    zh: '工业风钢架户外吧台套装',
    ja: 'スチールフレーム屋外バーセット',
    es: 'Set de Bar Exterior Industrial Steelframe',
    fr: 'Ensemble de Bar Extérieur Industriel Steelframe',
    ko: '스틸프레임 아웃도어 바 세트'
  },
  'industrial-kitchen-cabinet': {
    ar: 'خزانة مطبخ صناعية',
    zh: '工业风厨房柜',
    ja: 'インダストリアルキッチンキャビネット',
    es: 'Gabinete de Cocina Industrial',
    fr: 'Meuble de Cuisine Industriel',
    ko: '인더스트리얼 주방 캐비닛'
  },
  'kabinet-lemari-industrial': {
    ar: 'خزانة تخزين صناعية',
    zh: '工业风储物柜',
    ja: 'インダストリアル収納キャビネット',
    es: 'Gabinete de Almacenamiento Industrial',
    fr: 'Armoire de Rangement Industrielle',
    ko: '인더스트리얼 수납장'
  },
  'hollowline-display-rack': {
    ar: 'رف عرض هولو لاين صناعي',
    zh: '工业风空心线展示架',
    ja: 'ホロウラインディスプレイラック',
    es: 'Estantería Expositora Hollowline Industrial',
    fr: 'Étagère d’Exposition Industrielle Hollowline',
    ko: '인더스트리얼 할로우라인 디스플레이 랙'
  },
  'ladder-frame-display-stand': {
    ar: 'حامل عرض بإطار سلّم صناعي',
    zh: '工业风梯形展示架',
    ja: 'ラダーフレームディスプレイスタンド',
    es: 'Soporte Expositor tipo Escalera Industrial',
    fr: 'Présentoir Échelle Industriel',
    ko: '인더스트리얼 사다리형 디스플레이 스탠드'
  },
  'industrial-coat-rack': {
    ar: 'علاّقة معاطف صناعية',
    zh: '工业风衣帽架',
    ja: 'インダストリアルコートラック',
    es: 'Perchero Industrial',
    fr: 'Portemanteau Industriel',
    ko: '인더스트리얼 코트 랙'
  },
  'meja-kerja-industrial': {
    ar: 'طاولة عمل صناعية',
    zh: '工业风工作桌',
    ja: 'インダストリアルワークテーブル',
    es: 'Mesa de Trabajo Industrial',
    fr: 'Table de Travail Industrielle',
    ko: '인더스트리얼 작업 테이블'
  }
}

export const COMMON_WORKSHOP_PARAGRAPH: Record<LanguageCode, string> = {
  en: 'Crafted in our Bekasi workshop since 1999, every piece showcases premium welding techniques and meticulous attention to detail. The industrial-grade steel frame delivers outstanding strength while preserving a refined, minimalist aesthetic that complements modern or industrial interiors.',
  id: 'Diproduksi di workshop Bekasi kami sejak 1999, setiap produk menampilkan teknik pengelasan premium dan perhatian detail yang teliti. Rangka baja industrial memberikan kekuatan maksimal sekaligus mempertahankan estetika minimalis yang bersih untuk interior modern maupun industrial.',
  ar: 'يُصنّع كل منتج في ورشتنا في بوقاسي منذ عام 1999 مع إبراز تقنيات لحام متقدمة وعناية دقيقة بالتفاصيل. يوفّر الهيكل الفولاذي الصناعي قوة ممتازة مع الحفاظ على طابع عصري بسيط يتناغم مع أي مساحة حديثة أو صناعية.',
  zh: '自1999年以来，我们位于勿加泗的工坊手工打造每一件作品，展现出精湛的焊接技术与对细节的极致把控。工业级钢结构兼具卓越强度与简洁利落的美感，可与任何现代或工业风空间相得益彰。',
  ja: '1999年から稼働するベカシの自社工房で製作され、熟練した溶接技術と細部へのこだわりが光ります。工業用スチールフレームは優れた強度を備えつつ、モダンでミニマルな美しさを保ち、インダストリアル空間にも調和します。',
  es: 'Fabricado en nuestro taller de Bekasi desde 1999, cada pieza refleja técnicas de soldadura de alto nivel y una atención minuciosa al detalle. La estructura de acero industrial ofrece gran resistencia manteniendo una estética minimalista que se adapta a interiores modernos o de estilo industrial.',
  fr: 'Fabriqué dans notre atelier de Bekasi depuis 1999, chaque produit met en valeur des techniques de soudure haut de gamme et une attention minutieuse aux détails. La structure en acier industriel assure une excellente solidité tout en conservant une esthétique minimaliste adaptée aux intérieurs modernes ou industriels.',
  ko: '1999년부터 운영 중인 베카시 워크숍에서 제작되어 숙련된 용접 기술과 세심한 디테일이 돋보입니다. 산업용 강철 프레임은 뛰어난 강도를 제공하면서도 현대적이거나 인더스트리얼 인테리어와 조화를 이루는 미니멀한 미감을 유지합니다.'
}

interface TemplateText {
  shortLabel: string
  caption: string
  meta: string
  imageAlt: string
  paragraph1: string
  paragraph3: string
  paragraph4: string
}

type TemplateDictionary = Partial<Record<ProductTemplateKey, Partial<Record<LanguageCode, TemplateText>>>>

export const TEMPLATE_TEXTS: TemplateDictionary = {
  storage: {
    en: {
      shortLabel: 'Industrial Storage Solution',
      caption: '{{name}} - Industrial storage solution from Naturra Extal | Bekasi Workshop Indonesia',
      meta: '{{name}} - Custom industrial storage furniture by Naturra Extal Bekasi',
      imageAlt: '{{name}} - Premium industrial storage furniture from Naturra Extal',
      paragraph1: 'The {{name}} from Naturra Extal is the perfect industrial storage solution for modern spaces. A robust steel structure and clean geometry deliver generous capacity together with striking industrial aesthetics.',
      paragraph3: 'Ideal for offices, cafes, restaurants, and retail environments, it keeps equipment organized while reinforcing the visual identity of the interior.',
      paragraph4: 'Built to commercial-grade standards, it withstands heavy daily use and retains its finish, making it a smart long-term investment for any professional space.'
    },
    id: {
      shortLabel: 'Solusi Penyimpanan Industrial',
      caption: '{{name}} - Solusi penyimpanan industrial dari Naturra Extal | Workshop Bekasi Indonesia',
      meta: '{{name}} - Furniture penyimpanan industrial custom Naturra Extal Bekasi',
      imageAlt: '{{name}} - Furniture penyimpanan industrial premium Naturra Extal',
      paragraph1: '{{name}} dari Naturra Extal adalah solusi penyimpanan industrial sempurna untuk ruang modern. Struktur baja kokoh dengan garis tegas menghadirkan kapasitas besar dan estetika industrial yang kuat.',
      paragraph3: 'Ideal untuk kantor, kafe, restoran, dan retail, menjaga peralatan tetap rapi sekaligus memperkuat identitas visual interior.',
      paragraph4: 'Dibuat dengan standar komersial, tahan penggunaan harian intensif dan menjaga finishing tetap prima, menjadi investasi jangka panjang yang cerdas.'
    },
    ar: {
      shortLabel: 'حل تخزين صناعي',
      caption: '{{name}} - حل تخزين صناعي من Naturra Extal | ورشة بوقاسي إندونيسيا',
      meta: '{{name}} - أثاث تخزين صناعي مخصص من Naturra Extal في بوقاسي',
      imageAlt: '{{name}} - أثاث تخزين صناعي فاخر من Naturra Extal',
      paragraph1: '{{name}} من Naturra Extal هو الحل المثالي للتخزين الصناعي في المساحات الحديثة. يجمع بين هيكل فولاذي متين وخطوط نظيفة ليقدم سعة كبيرة وطابعًا صناعياً لافتاً.',
      paragraph3: 'مثالي للمكاتب والمقاهي والمطاعم ومتاجر البيع بالتجزئة، يحافظ على تنظيم الأدوات بينما يعزز الهوية البصرية للمساحة.',
      paragraph4: 'مصمم وفق معايير الاستخدام التجاري، يتحمل الاستخدام اليومي المكثف ويحافظ على تشطيبه، مما يجعله استثمارًا طويل الأمد لأي مساحة مهنية.'
    },
    zh: {
      shortLabel: '工业储物方案',
      caption: '{{name}} - Naturra Extal 工业储物方案 | 勿加泗工坊 印度尼西亚',
      meta: '{{name}} - Naturra Extal 勿加泗定制工业储物家具',
      imageAlt: '{{name}} - Naturra Extal 高端工业储物家具',
      paragraph1: '{{name}} 是 Naturra Extal 为现代空间打造的理想工业储物方案。坚固的钢结构搭配干练的线条，兼具大容量与鲜明的工业美感。',
      paragraph3: '非常适合办公室、咖啡馆、餐厅及零售空间，在保持整洁有序的同时强化整体视觉风格。',
      paragraph4: '按照商用级标准打造，经得起高频日常使用并保持精致外观，是值得信赖的长期投资。'
    },
    ja: {
      shortLabel: 'インダストリアル収納ソリューション',
      caption: '{{name}} - Naturra Extal のインダストリアル収納ソリューション | ベカシ工房 インドネシア',
      meta: '{{name}} - Naturra Extal ベカシが手掛けるカスタム工業収納家具',
      imageAlt: '{{name}} - Naturra Extal のプレミアム工業収納家具',
      paragraph1: 'Naturra Extal の{{name}}は、現代空間に最適なインダストリアル収納ソリューションです。重厚なスチール構造とシャープなラインが、大容量とアイコニックなインダストリアル美を両立させます。',
      paragraph3: 'オフィスやカフェ、レストラン、リテール空間に最適で、収納をスマートに保ちながら空間のビジュアルアイデンティティを引き立てます。',
      paragraph4: '商業グレード仕様で設計され、ハードな日常使用にも耐え、仕上げの美しさを長く保つ長期的な投資アイテムです。'
    },
    es: {
      shortLabel: 'Solución de almacenamiento industrial',
      caption: '{{name}} - Solución de almacenamiento industrial de Naturra Extal | Taller Bekasi Indonesia',
      meta: '{{name}} - Mueble de almacenamiento industrial personalizado por Naturra Extal Bekasi',
      imageAlt: '{{name}} - Mueble de almacenamiento industrial premium de Naturra Extal',
      paragraph1: 'El {{name}} de Naturra Extal es la solución de almacenamiento industrial perfecta para espacios modernos. Combina un bastidor de acero robusto con líneas limpias para ofrecer gran capacidad y un estilo industrial impactante.',
      paragraph3: 'Ideal para oficinas, cafeterías, restaurantes y comercios, mantiene todo organizado mientras refuerza la identidad visual del interior.',
      paragraph4: 'Diseñado con estándares de uso comercial, resiste el ritmo diario y conserva su acabado, siendo una inversión a largo plazo para cualquier negocio.'
    },
    fr: {
      shortLabel: 'Solution de rangement industrielle',
      caption: '{{name}} - Solution de rangement industrielle par Naturra Extal | Atelier Bekasi Indonésie',
      meta: '{{name}} - Meuble de rangement industriel sur mesure par Naturra Extal Bekasi',
      imageAlt: '{{name}} - Meuble de rangement industriel premium Naturra Extal',
      paragraph1: 'Le {{name}} signé Naturra Extal est la solution de rangement industrielle idéale pour les espaces contemporains. Sa structure en acier robuste et ses lignes épurées offrent une grande capacité tout en affichant un style résolument industriel.',
      paragraph3: 'Parfait pour les bureaux, cafés, restaurants ou boutiques, il organise chaque élément tout en renforçant l’identité visuelle de votre intérieur.',
      paragraph4: 'Conçu selon des standards professionnels, il supporte une utilisation intensive tout en conservant son fini, garantissant un investissement rentable sur la durée.'
    },
    ko: {
      shortLabel: '인더스트리얼 수납 솔루션',
      caption: '{{name}} - 망갈라 리빙 인더스트리얼 수납 솔루션 | 베카시 워크숍 인도네시아',
      meta: '{{name}} - 망갈라 리빙 베카시 맞춤형 산업 수납 가구',
      imageAlt: '{{name}} - 망갈라 리빙 프리미엄 산업 수납 가구',
      paragraph1: '{{name}}는 현대 공간을 위한 최적의 인더스트리얼 수납 솔루션입니다. 견고한 강철 프레임과 미니멀한 라인이 넉넉한 수납력과 과감한 산업 디자인을 동시에 구현합니다.',
      paragraph3: '사무실, 카페, 레스토랑, 리테일 공간 등에서 장비와 소품을 깔끔하게 정리하면서 공간의 아이덴티티를 강화합니다.',
      paragraph4: '상업용 규격으로 설계되어 잦은 사용에도 마감이 유지되며, 장기적인 투자 가치가 뛰어난 제품입니다.'
    }
  },
  outdoor: {
    en: {
      shortLabel: 'Industrial Outdoor Bar Solution',
      caption: '{{name}} - Industrial outdoor bar solution by Naturra Extal | Bekasi Workshop Indonesia',
      meta: '{{name}} - Weather-resistant industrial outdoor furniture by Naturra Extal',
      imageAlt: '{{name}} - Naturra Extal industrial outdoor bar furniture',
      paragraph1: 'The {{name}} from Naturra Extal is the ultimate industrial outdoor bar solution for balconies, rooftops, and terraces. Weather-resistant steel construction delivers exceptional durability without compromising on modern aesthetics.',
      paragraph3: '',
      paragraph4: ''
    } as any
  } as any
} as any
