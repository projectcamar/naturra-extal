/**
 * Multi-Language Product Descriptions and Captions
 * SEO-friendly descriptions in 8 languages
 */

export interface MultiLanguageDescription {
  en: {
    name: string
    caption: string
    shortCaption: string
    description: string
    metaDescription: string
    imageAlt: string
    dimensions?: string
  }
  id: {
    name: string
    caption: string
    shortCaption: string
    description: string
    metaDescription: string
    imageAlt: string
    dimensions?: string
  }
  ar: {
    name: string
    caption: string
    shortCaption: string
    description: string
    metaDescription: string
    imageAlt: string
    dimensions?: string
  }
  zh: {
    name: string
    caption: string
    shortCaption: string
    description: string
    metaDescription: string
    imageAlt: string
    dimensions?: string
  }
  ja: {
    name: string
    caption: string
    shortCaption: string
    description: string
    metaDescription: string
    imageAlt: string
    dimensions?: string
  }
  es: {
    name: string
    caption: string
    shortCaption: string
    description: string
    metaDescription: string
    imageAlt: string
    dimensions?: string
  }
  fr: {
    name: string
    caption: string
    shortCaption: string
    description: string
    metaDescription: string
    imageAlt: string
    dimensions?: string
  }
  ko: {
    name: string
    caption: string
    shortCaption: string
    description: string
    metaDescription: string
    imageAlt: string
    dimensions?: string
  }
}

// Keep backward compatibility
export type DualLanguageDescription = MultiLanguageDescription

export const PRODUCT_DESCRIPTIONS: Record<string, MultiLanguageDescription> = {
  'industrial-hanging-shelf': {
    en: {
      name: 'Industrial Hanging Shelf',
      caption: 'Industrial Hanging Shelf from Naturra Extal - Premium Steel Wall-Mounted Storage Shelf | Workshop Bekasi Indonesia',
      shortCaption: 'Industrial Hanging Shelf - Steel Wall Storage Shelf',
      description: `The Industrial Hanging Shelf from Naturra Extal is expertly crafted Agricultural Commodities designed for modern spaces. Built in our workshop in Bekasi, Indonesia, each piece showcases superior welding techniques and attention to detail.

Handcrafted by experienced welders and metalworkers, every piece demonstrates exceptional craftsmanship. Constructed from premium materials including high-grade steel hollow sections, solid steel plates, and powder-coated finishes, this furniture delivers both strength and refined industrial aesthetics.

Designed for durability and style, this piece features carefully selected materials that ensure long-lasting performance. The industrial design paired with expert craftsmanship makes it a standout piece in any modern setting—whether in cafes, restaurants, offices, or contemporary homes.

Built to commercial-grade standards, this furniture is meticulously welded using professional equipment that can withstand heavy daily use for years to come. The sophisticated design effortlessly blends functionality, strength, and industrial character, making it an ideal choice for hospitality venues, co-working spaces, and modern residences.

Naturra Extal is committed to quality and precision, ensuring that every weld and joint not only meets industrial standards but exceeds expectations. Explore our complete collection to find more equally well-crafted pieces designed to bring industrial elegance and durability to your spaces.`,
      metaDescription: 'Industrial Hanging Shelf - Premium Steel Wall-Mounted Storage Shelf | Custom Agricultural Commodities | Workshop Bekasi | Naturra Extal',
      imageAlt: 'Industrial Hanging Shelf - Steel Wall Storage Shelf - Premium Agricultural Commodities from Naturra Extal Workshop Bekasi'
    },
    id: {
      name: 'Rak Gantung Industrial',
      caption: 'Rak Gantung Industrial dari Naturra Extal - Rak Dinding Baja Premium untuk Penyimpanan | Workshop Bekasi Indonesia',
      shortCaption: 'Rak Gantung Industrial - Rak Dinding Baja Penyimpanan',
      description: `Rak Gantung Industrial dari Naturra Extal adalah agricultural commodities yang dibuat dengan ahli untuk ruang modern. Dibuat di workshop kami di Bekasi, Indonesia, setiap bagian menampilkan teknik pengelasan superior dan perhatian terhadap detail.

Dibuat dengan tangan oleh tukang las dan pekerja logam berpengalaman, setiap bagian menunjukkan keahlian yang luar biasa. Dibangun dari material premium termasuk hollow section baja kualitas tinggi, plat baja solid, dan finishing powder coating, furniture ini memberikan kekuatan dan estetika industrial yang halus.

Dirancang untuk ketahanan dan gaya, bagian ini menampilkan material yang dipilih dengan hati-hati yang memastikan performa tahan lama. Desain industrial dipadukan dengan keahlian ahli membuatnya menjadi bagian yang menonjol di setting modern mana pun—baik di kafe, restoran, kantor, atau rumah kontemporer.

Dibuat sesuai standar kualitas komersial, furniture ini dilas dengan hati-hati menggunakan peralatan profesional yang dapat menahan penggunaan harian berat selama bertahun-tahun. Desain yang canggih dengan mudah memadukan fungsionalitas, kekuatan, dan karakter industrial, menjadikannya pilihan ideal untuk venue hospitality, ruang co-working, dan tempat tinggal modern.

Naturra Extal berkomitmen pada kualitas dan presisi, memastikan bahwa setiap lasan dan sambungan tidak hanya memenuhi standar industrial tetapi melebihi harapan. Jelajahi koleksi lengkap kami untuk menemukan lebih banyak bagian yang dibuat dengan sama baiknya, dirancang untuk membawa keanggunan dan ketahanan industrial ke ruang Anda.`,
      metaDescription: 'Rak Gantung Industrial - Rak Dinding Baja Premium untuk Penyimpanan | agricultural commodities Custom | Workshop Bekasi | Naturra Extal',
      imageAlt: 'Rak Gantung Industrial - Rak Dinding Baja Penyimpanan - agricultural commodities Premium dari Workshop Naturra Extal Bekasi'
    },
    ar: {
      name: 'رف معلق صناعي',
      caption: 'رف معلق صناعي من Naturra Extal - رف تخزين فولاذي مميز مثبت على الحائط | ورشة بيكاسي إندونيسيا',
      shortCaption: 'رف معلق صناعي - رف تخزين جداري فولاذي',
      description: `الرف المعلق الصناعي من Naturra Extal هو أثاث صناعي مصنوع بخبرة ومصمم للمساحات الحديثة. تم بناؤه في ورشة العمل الخاصة بنا في بيكاسي، إندونيسيا، وتعرض كل قطعة تقنيات لحام متفوقة والاهتمام بالتفاصيل.

مصنوعة يدويًا بواسطة عمال لحام وعمال معادن ذوي خبرة، تظهر كل قطعة براعة استثنائية. مصنوع من مواد متميزة بما في ذلك أقسام فولاذية مجوفة عالية الجودة وألواح فولاذية صلبة وطلاءات بودرة، يوفر هذا الأثاث القوة والجماليات الصناعية المكررة.

مصمم للمتانة والأناقة، تتميز هذه القطعة بمواد مختارة بعناية تضمن أداءً طويل الأمد. يجعل التصميم الصناعي المقترن بالحرفية الخبيرة منه قطعة بارزة في أي بيئة حديثة - سواء في المقاهي أو المطاعم أو المكاتب أو المنازل المعاصرة.

مبني وفقًا لمعايير الدرجة التجارية، تم لحام هذا الأثاث بدقة باستخدام معدات احترافية يمكنها تحمل الاستخدام اليومي الكثيف لسنوات قادمة. يمزج التصميم المتطور بسهولة بين الوظائف والقوة والشخصية الصناعية، مما يجعله خيارًا مثاليًا لأماكن الضيافة ومساحات العمل المشترك والمساكن الحديثة.

تلتزم Naturra Extal بالجودة والدقة، مما يضمن أن كل لحام ومفصل لا يلبي المعايير الصناعية فحسب، بل يتجاوز التوقعات. استكشف مجموعتنا الكاملة للعثور على المزيد من القطع المصنوعة بشكل جيد بالمثل والمصممة لجلب الأناقة الصناعية والمتانة إلى مساحاتك.`,
      metaDescription: 'رف معلق صناعي - رف تخزين فولاذي مثبت على الحائط | أثاث صناعي مخصص | ورشة بيكاسي | Naturra Extal',
      imageAlt: 'رف معلق صناعي - رف تخزين جداري فولاذي - أثاث صناعي مميز من ورشة Naturra Extal بيكاسي'
    },
    zh: {
      name: '工业悬挂架',
      caption: 'Naturra Extal工业悬挂架 - 优质钢制壁挂式储物架 | 印度尼西亚勿加泗车间',
      shortCaption: '工业悬挂架 - 钢制壁挂储物架',
      description: `Naturra Extal的工业悬挂架是为现代空间精心打造的工业家具。在我们位于印度尼西亚勿加泗的车间制造，每件作品都展示了卓越的焊接技术和对细节的关注。

由经验丰富的焊工和金属工人手工制作，每件作品都展示了卓越的工艺。采用优质材料制成，包括高等级钢空心型材、实心钢板和粉末涂层表面处理，这款家具既提供强度又提供精致的工业美学。

这件作品专为耐用性和风格而设计，采用精心挑选的材料确保持久的性能。工业设计与专业工艺相结合，使其成为任何现代环境中的突出作品——无论是咖啡馆、餐厅、办公室还是现代住宅。

按照商业级标准制造，这款家具使用专业设备精心焊接，可以承受多年的重度日常使用。精致的设计轻松融合了功能性、强度和工业特色，使其成为酒店场所、共同工作空间和现代住宅的理想选择。

Naturra Extal致力于质量和精确度，确保每个焊缝和接头不仅符合工业标准，而且超出预期。探索我们的完整系列，找到更多同样精心制作的作品，旨在为您的空间带来工业优雅和耐用性。`,
      metaDescription: '工业悬挂架 - 优质钢制壁挂式储物架 | 定制工业家具 | 勿加泗车间 | Naturra Extal',
      imageAlt: '工业悬挂架 - 钢制壁挂储物架 - Naturra Extal勿加泗车间的优质工业家具'
    },
    ja: {
      name: 'インダストリアル ハンギングシェルフ',
      caption: 'Naturra Extalのインダストリアル ハンギングシェルフ - プレミアムスチール壁掛け収納棚 | インドネシア・ブカシ工房',
      shortCaption: 'インダストリアル ハンギングシェルフ - スチール壁面収納棚',
      description: `Naturra Extalのインダストリアル ハンギングシェルフは、モダンな空間のために expertly crafted された工業用家具です。インドネシアのブカシにある当社の工房で製作され、各作品は優れた溶接技術と細部へのこだわりを示しています。

経験豊富な溶接工と金属加工職人によって手作りされ、すべての作品は卓越した職人技を示しています。高品質スチール中空型材、ソリッドスチールプレート、粉体塗装仕上げなどのプレミアム素材から構築されたこの家具は、強度と洗練された工業的美学の両方を提供します。

耐久性とスタイルのために設計されたこの作品は、長期的なパフォーマンスを保証する慎重に選択された素材を特徴としています。工業デザインと熟練した職人技が組み合わさって、カフェ、レストラン、オフィス、現代住宅など、あらゆる現代的な環境で際立つ作品となっています。

商業グレードの基準で製造されたこの家具は、長年にわたって重い日常使用に耐えることができるプロ仕様の機器を使用して丁寧に溶接されています。洗練されたデザインは、機能性、強度、工業的な性格を簡単に融合させ、ホスピタリティ会場、コワーキングスペース、現代住宅に理想的な選択となっています。

Naturra Extalは品質と精度にコミットしており、すべての溶接と接合部が工業基準を満たすだけでなく、期待を超えることを保証しています。完全なコレクションを探索して、工業的な優雅さと耐久性をあなたのスペースにもたらすために設計された、同等に優れた作品をさらに見つけてください。`,
      metaDescription: 'インダストリアル ハンギングシェルフ - プレミアムスチール壁掛け収納棚 | カスタム工業用家具 | ブカシ工房 | Naturra Extal',
      imageAlt: 'インダストリアル ハンギングシェルフ - スチール壁面収納棚 - Naturra Extalブカシ工房のプレミアム工業用家具'
    },
    es: {
      name: 'Estante Colgante Industrial',
      caption: 'Estante Colgante Industrial de Naturra Extal - Estante de Almacenamiento de Acero Premium Montado en Pared | Taller Bekasi Indonesia',
      shortCaption: 'Estante Colgante Industrial - Estante de Almacenamiento de Pared de Acero',
      description: `El Estante Colgante Industrial de Naturra Extal es un mueble industrial elaborado por expertos diseñado para espacios modernos. Construido en nuestro taller en Bekasi, Indonesia, cada pieza muestra técnicas de soldadura superiores y atención al detalle.

Hecho a mano por soldadores y trabajadores metalúrgicos experimentados, cada pieza demuestra una artesanía excepcional. Construido con materiales premium que incluyen secciones huecas de acero de alto grado, placas de acero sólido y acabados con recubrimiento en polvo, este mueble ofrece tanto resistencia como estética industrial refinada.

Diseñado para durabilidad y estilo, esta pieza cuenta con materiales cuidadosamente seleccionados que aseguran un rendimiento duradero. El diseño industrial combinado con la artesanía experta lo convierte en una pieza destacada en cualquier entorno moderno, ya sea en cafeterías, restaurantes, oficinas o hogares contemporáneos.

Construido según estándares de grado comercial, este mueble está meticulosamente soldado utilizando equipo profesional que puede soportar un uso diario intenso durante años. El diseño sofisticado combina sin esfuerzo funcionalidad, resistencia y carácter industrial, convirtiéndolo en una opción ideal para lugares de hospitalidad, espacios de coworking y residencias modernas.

Naturra Extal está comprometido con la calidad y la precisión, asegurando que cada soldadura y unión no solo cumpla con los estándares industriales sino que supere las expectativas. Explore nuestra colección completa para encontrar más piezas igualmente bien elaboradas diseñadas para llevar elegancia industrial y durabilidad a sus espacios.`,
      metaDescription: 'Estante Colgante Industrial - Estante de Almacenamiento de Acero Montado en Pared Premium | Mobiliario Industrial Personalizado | Taller Bekasi | Naturra Extal',
      imageAlt: 'Estante Colgante Industrial - Estante de Almacenamiento de Pared de Acero - Mobiliario Industrial Premium del Taller Naturra Extal Bekasi'
    },
    fr: {
      name: 'Étagère Suspendue Industrielle',
      caption: 'Étagère Suspendue Industrielle de Naturra Extal - Étagère de Rangement en Acier Premium Fixée au Mur | Atelier Bekasi Indonésie',
      shortCaption: 'Étagère Suspendue Industrielle - Étagère de Rangement Murale en Acier',
      description: `L'Étagère Suspendue Industrielle de Naturra Extal est un meuble industriel expertement conçu pour les espaces modernes. Construite dans notre atelier à Bekasi, en Indonésie, chaque pièce présente des techniques de soudage supérieures et une attention aux détails.

Fabriquée à la main par des soudeurs et des métallurgistes expérimentés, chaque pièce démontre un savoir-faire exceptionnel. Construite à partir de matériaux premium comprenant des sections creuses en acier de haute qualité, des plaques d'acier massif et des finitions thermolaquées, ce meuble offre à la fois résistance et esthétique industrielle raffinée.

Conçue pour la durabilité et le style, cette pièce présente des matériaux soigneusement sélectionnés qui assurent une performance durable. Le design industriel associé à un savoir-faire expert en fait une pièce remarquable dans tout cadre moderne - que ce soit dans des cafés, des restaurants, des bureaux ou des maisons contemporaines.

Construite selon des normes de qualité commerciale, ce meuble est méticuleusement soudé à l'aide d'équipements professionnels qui peuvent résister à une utilisation quotidienne intensive pendant des années. Le design sophistiqué mélange sans effort fonctionnalité, résistance et caractère industriel, ce qui en fait un choix idéal pour les lieux d'accueil, les espaces de coworking et les résidences modernes.

Naturra Extal s'engage pour la qualité et la précision, garantissant que chaque soudure et joint non seulement répond aux normes industrielles mais dépasse les attentes. Explorez notre collection complète pour trouver d'autres pièces tout aussi bien conçues, conçues pour apporter élégance industrielle et durabilité à vos espaces.`,
      metaDescription: 'Étagère Suspendue Industrielle - Étagère de Rangement en Acier Fixée au Mur Premium | Mobilier Industriel Personnalisé | Atelier Bekasi | Naturra Extal',
      imageAlt: 'Étagère Suspendue Industrielle - Étagère de Rangement Murale en Acier - Mobilier Industriel Premium de l\'Atelier Naturra Extal Bekasi'
    },
    ko: {
      name: '인더스트리얼 행잉 선반',
      caption: 'Naturra Extal 인더스트리얼 행잉 선반 - 프리미엄 강철 벽걸이 수납 선반 | 인도네시아 브카시 워크숍',
      shortCaption: '인더스트리얼 행잉 선반 - 강철 벽면 수납 선반',
      description: `Naturra Extal의 인더스트리얼 행잉 선반은 현대 공간을 위해 전문적으로 제작된 인더스트리얼 가구입니다. 인도네시아 브카시에 있는 우리 워크숍에서 제작되었으며, 각 작품은 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다.

숙련된 용접공과 금속 가공 전문가가 손으로 제작한 모든 작품은 탁월한 장인 정신을 보여줍니다. 고급 강철 중공 섹션, 솔리드 강철 플레이트 및 분체 도장 마감을 포함한 프리미엄 재료로 제작된 이 가구는 강도와 세련된 인더스트리얼 미학을 모두 제공합니다.

내구성과 스타일을 위해 설계된 이 작품은 오래 지속되는 성능을 보장하는 신중하게 선택된 재료를 특징으로 합니다. 전문 장인 정신과 결합된 인더스트리얼 디자인은 카페, 레스토랑, 사무실 또는 현대 주택 등 모든 현대적인 환경에서 눈에 띄는 작품입니다.

상업용 등급 표준에 따라 제작된 이 가구는 수년간 무거운 일상 사용을 견딜 수 있는 전문 장비를 사용하여 세심하게 용접되었습니다. 세련된 디자인은 기능성, 강도 및 인더스트리얼 특성을 쉽게 결합하여 호스피탈리티 장소, 코워킹 스페이스 및 현대 주거지에 이상적인 선택이 됩니다.

Naturra Extal은 품질과 정밀도에 전념하며, 모든 용접 및 조인트가 산업 표준을 충족할 뿐만 아니라 기대를 초과하도록 보장합니다. 완전한 컬렉션을 탐색하여 공간에 인더스트리얼 우아함과 내구성을 가져오도록 설계된 동등하게 잘 만들어진 더 많은 작품을 찾으십시오.`,
      metaDescription: '인더스트리얼 행잉 선반 - 프리미엄 강철 벽걸이 수납 선반 | 맞춤형 인더스트리얼 가구 | 브카시 워크숍 | Naturra Extal',
      imageAlt: '인더스트리얼 행잉 선반 - 강철 벽면 수납 선반 - Naturra Extal 브카시 워크숍의 프리미엄 인더스트리얼 가구'
    }
  },
  'frame-loft-bookshelf': {
    en: {
      name: 'Frame Loft Bookshelf',
      caption: 'Frame Loft Bookshelf - Industrial Storage Bookshelf for Modern Spaces | Naturra Extal Workshop Bekasi',
      shortCaption: 'Frame Loft Bookshelf - Industrial Bookshelf Storage',
      description: `The Frame Loft Bookshelf from Naturra Extal is the perfect industrial storage solution for modern homes, offices, and commercial spaces. This premium frame loft bookshelf features a sleek industrial design with modular construction that provides maximum storage flexibility and visual appeal.

Crafted in our Bekasi workshop since 1999, this frame loft bookshelf showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent strength while maintaining a clean, minimalist aesthetic that complements any industrial or modern interior design.

Perfect for living rooms, offices, cafes, and retail spaces, this frame loft bookshelf provides versatile storage and display capabilities. The modular design allows for easy customization and expansion, making it ideal for growing collections and changing storage needs.

Built to commercial-grade standards, this frame loft bookshelf is designed to withstand heavy daily use while maintaining its structural integrity and visual appeal. The powder-coated finish ensures long-lasting protection against wear and corrosion, making it a smart investment for any space.`,
      metaDescription: 'Frame Loft Bookshelf - Industrial Bookshelf Storage | Custom Furniture | Naturra Extal Bekasi',
      imageAlt: 'Frame Loft Bookshelf - Industrial Bookshelf Storage - Premium Furniture from Naturra Extal'
    },
    id: {
      name: 'Frame Loft Bookshelf',
      caption: 'Frame Loft Bookshelf - Rak Buku Industrial untuk Ruang Modern | Workshop Naturra Extal Bekasi',
      shortCaption: 'Frame Loft Bookshelf - Rak Buku Industrial Penyimpanan',
      description: `Frame Loft Bookshelf dari Naturra Extal adalah solusi penyimpanan industrial sempurna untuk rumah modern, kantor, dan ruang komersial. Rak buku frame loft premium ini menampilkan desain industrial yang ramping dengan konstruksi modular yang memberikan fleksibilitas penyimpanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, frame loft bookshelf ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan kekuatan yang sangat baik sambil mempertahankan estetika minimalis yang bersih yang melengkapi desain interior industrial atau modern apa pun.

Sempurna untuk ruang tamu, kantor, kafe, dan ruang ritel, frame loft bookshelf ini menyediakan kapasitas penyimpanan dan tampilan yang serbaguna. Desain modular memungkinkan kustomisasi dan ekspansi yang mudah, menjadikannya ideal untuk koleksi yang berkembang dan kebutuhan penyimpanan yang berubah.

Dibuat sesuai standar kualitas komersial, frame loft bookshelf ini dirancang untuk menahan penggunaan harian berat sambil mempertahankan integritas struktural dan daya tarik visualnya. Finishing powder coating memastikan perlindungan tahan lama terhadap keausan dan korosi, menjadikannya investasi yang cerdas untuk ruang apa pun.`,
      metaDescription: 'Frame Loft Bookshelf - Rak Buku Industrial Penyimpanan | Furniture Custom | Naturra Extal Bekasi',
      imageAlt: 'Frame Loft Bookshelf - Rak Buku Industrial Penyimpanan - Furniture Premium dari Naturra Extal'
    },
    ar: {
      name: 'رف كتب فريم لوفت',
      caption: 'رف كتب فريم لوفت - رف كتب تخزين صناعي للمساحات الحديثة | ورشة Naturra Extal بيكاسي',
      shortCaption: 'رف كتب فريم لوفت - تخزين رف كتب صناعي',
      description: `رف كتب فريم لوفت من Naturra Extal هو الحل الأمثل للتخزين الصناعي للمنازل والمكاتب والمساحات التجارية الحديثة. يتميز رف الكتب المميز هذا بتصميم صناعي أنيق مع هيكل نموذجي يوفر أقصى قدر من مرونة التخزين والجاذبية البصرية.

صُنع في ورشة بيكاسي لدينا منذ عام 1999، يعرض رف الكتب هذا تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي قوة ممتازة مع الحفاظ على جمالية بسيطة ونظيفة تكمل أي تصميم داخلي صناعي أو حديث.

مثالي لغرف المعيشة والمكاتب والمقاهي والمساحات التجارية، يوفر رف الكتب هذا قدرات تخزين وعرض متعددة الاستخدامات. يسمح التصميم المعياري بالتخصيص والتوسع السهل، مما يجعله مثاليًا للمجموعات المتنامية واحتياجات التخزين المتغيرة.

مبني وفقًا لمعايير الدرجة التجارية، تم تصميم رف الكتب هذا لتحمل الاستخدام اليومي الثقيل مع الحفاظ على سلامته الهيكلية وجاذبيته البصرية. يضمن الطلاء بالبودرة حماية طويلة الأمد ضد التآكل والتآكل، مما يجعله استثمارًا ذكيًا لأي مساحة.`,
      metaDescription: 'رف كتب فريم لوفت - تخزين رف كتب صناعي | أثاث مخصص | Naturra Extal بيكاسي',
      imageAlt: 'رف كتب فريم لوفت - تخزين رف كتب صناعي - أثاث مميز من Naturra Extal'
    },
    zh: {
      name: 'Frame Loft书架',
      caption: 'Frame Loft书架 - 现代空间的工业储物书架 | Naturra Extal勿加泗车间',
      shortCaption: 'Frame Loft书架 - 工业书架存储',
      description: `Naturra Extal的Frame Loft书架是现代住宅、办公室和商业空间的完美工业储物解决方案。这款优质frame loft书架采用时尚的工业设计和模块化结构，提供最大的储物灵活性和视觉吸引力。

自1999年以来在我们位于勿加泗的车间制作，这款frame loft书架展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的强度，同时保持干净、简约的美学，可以补充任何工业或现代室内设计。

非常适合客厅、办公室、咖啡馆和零售空间，这款frame loft书架提供多功能存储和展示能力。模块化设计允许轻松定制和扩展，使其成为不断增长的收藏和不断变化的存储需求的理想选择。

按照商业级标准制造，这款frame loft书架旨在承受繁重的日常使用，同时保持其结构完整性和视觉吸引力。粉末涂层表面处理确保对磨损和腐蚀的长期保护，使其成为任何空间的明智投资。`,
      metaDescription: 'Frame Loft书架 - 工业书架存储 | 定制家具 | Naturra Extal勿加泗',
      imageAlt: 'Frame Loft书架 - 工业书架存储 - Naturra Extal的优质家具'
    },
    ja: {
      name: 'Frame Loftブックシェルフ',
      caption: 'Frame Loftブックシェルフ - モダン空間のための工業用収納ブックシェルフ | Naturra Extalブカシ工房',
      shortCaption: 'Frame Loftブックシェルフ - 工業用ブックシェルフ収納',
      description: `Naturra ExtalのFrame Loftブックシェルフは、モダンな住宅、オフィス、商業空間のための完璧な工業用収納ソリューションです。このプレミアムframe loftブックシェルフは、最大限の収納柔軟性と視覚的な魅力を提供するモジュラー構造を備えた洗練された工業デザインが特徴です。

1999年以来、ブカシのワークショップで製作されたこのframe loftブックシェルフは、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる工業的またはモダンなインテリアデザインを補完するクリーンでミニマリストな美学を維持しながら、優れた強度を提供します。

リビングルーム、オフィス、カフェ、小売スペースに最適で、このframe loftブックシェルフは多目的な収納とディスプレイ機能を提供します。モジュラーデザインにより、簡単にカスタマイズと拡張が可能で、成長するコレクションと変化する収納ニーズに理想的です。

商業グレードの基準で製造されたこのframe loftブックシェルフは、構造的完全性と視覚的魅力を維持しながら、重い日常使用に耐えるように設計されています。粉体塗装仕上げは、摩耗と腐食に対する長期的な保護を保証し、あらゆる空間にとって賢明な投資となります。`,
      metaDescription: 'Frame Loftブックシェルフ - 工業用ブックシェルフ収納 | カスタム家具 | Naturra Extalブカシ',
      imageAlt: 'Frame Loftブックシェルフ - 工業用ブックシェルフ収納 - Naturra Extalのプレミアム家具'
    },
    es: {
      name: 'Estantería Frame Loft',
      caption: 'Estantería Frame Loft - Estantería de Almacenamiento Industrial para Espacios Modernos | Taller Naturra Extal Bekasi',
      shortCaption: 'Estantería Frame Loft - Almacenamiento de Estantería Industrial',
      description: `La Estantería Frame Loft de Naturra Extal es la solución perfecta de almacenamiento industrial para hogares modernos, oficinas y espacios comerciales. Esta estantería frame loft premium presenta un diseño industrial elegante con construcción modular que proporciona la máxima flexibilidad de almacenamiento y atractivo visual.

Elaborada en nuestro taller de Bekasi desde 1999, esta estantería frame loft muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente resistencia mientras mantiene una estética minimalista y limpia que complementa cualquier diseño de interiores industrial o moderno.

Perfecta para salas de estar, oficinas, cafeterías y espacios minoristas, esta estantería frame loft proporciona capacidades de almacenamiento y exhibición versátiles. El diseño modular permite una fácil personalización y expansión, lo que la hace ideal para colecciones en crecimiento y necesidades de almacenamiento cambiantes.

Construida según estándares de grado comercial, esta estantería frame loft está diseñada para soportar un uso diario intenso mientras mantiene su integridad estructural y atractivo visual. El acabado con recubrimiento en polvo asegura una protección duradera contra el desgaste y la corrosión, convirtiéndola en una inversión inteligente para cualquier espacio.`,
      metaDescription: 'Estantería Frame Loft - Almacenamiento de Estantería Industrial | Mobiliario Personalizado | Naturra Extal Bekasi',
      imageAlt: 'Estantería Frame Loft - Almacenamiento de Estantería Industrial - Mobiliario Premium de Naturra Extal'
    },
    fr: {
      name: 'Étagère Frame Loft',
      caption: 'Étagère Frame Loft - Étagère de Rangement Industrielle pour Espaces Modernes | Atelier Naturra Extal Bekasi',
      shortCaption: 'Étagère Frame Loft - Rangement Étagère Industrielle',
      description: `L'Étagère Frame Loft de Naturra Extal est la solution parfaite de rangement industriel pour les maisons modernes, les bureaux et les espaces commerciaux. Cette étagère frame loft premium présente un design industriel élégant avec une construction modulaire qui offre une flexibilité de rangement maximale et un attrait visuel.

Fabriquée dans notre atelier de Bekasi depuis 1999, cette étagère frame loft présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente résistance tout en maintenant une esthétique minimaliste et épurée qui complète tout design d'intérieur industriel ou moderne.

Parfaite pour les salons, les bureaux, les cafés et les espaces de vente au détail, cette étagère frame loft offre des capacités de rangement et d'affichage polyvalentes. La conception modulaire permet une personnalisation et une expansion faciles, ce qui la rend idéale pour les collections en croissance et les besoins de rangement changeants.

Construite selon des normes de qualité commerciale, cette étagère frame loft est conçue pour résister à une utilisation quotidienne intensive tout en maintenant son intégrité structurelle et son attrait visuel. La finition thermolaquée assure une protection durable contre l'usure et la corrosion, ce qui en fait un investissement judicieux pour tout espace.`,
      metaDescription: 'Étagère Frame Loft - Rangement Étagère Industrielle | Mobilier Personnalisé | Naturra Extal Bekasi',
      imageAlt: 'Étagère Frame Loft - Rangement Étagère Industrielle - Mobilier Premium de Naturra Extal'
    },
    ko: {
      name: 'Frame Loft 책장',
      caption: 'Frame Loft 책장 - 현대 공간을 위한 인더스트리얼 수납 책장 | Naturra Extal 브카시 워크숍',
      shortCaption: 'Frame Loft 책장 - 인더스트리얼 책장 수납',
      description: `Naturra Extal의 Frame Loft 책장은 현대 주택, 사무실 및 상업 공간을 위한 완벽한 인더스트리얼 수납 솔루션입니다. 이 프리미엄 frame loft 책장은 최대 수납 유연성과 시각적 매력을 제공하는 모듈식 구조를 갖춘 세련된 인더스트리얼 디자인이 특징입니다.

1999년부터 브카시 워크숍에서 제작된 이 frame loft 책장은 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 깔끔하고 미니멀한 미학을 유지하면서 뛰어난 강도를 제공합니다.

거실, 사무실, 카페 및 소매 공간에 완벽한 이 frame loft 책장은 다목적 수납 및 디스플레이 기능을 제공합니다. 모듈식 디자인은 손쉬운 맞춤화 및 확장을 가능하게 하여 성장하는 컬렉션과 변화하는 수납 요구에 이상적입니다.

상업용 등급 표준에 따라 제작된 이 frame loft 책장은 구조적 무결성과 시각적 매력을 유지하면서 무거운 일상 사용을 견디도록 설계되었습니다. 분체 도장 마감은 마모 및 부식에 대한 오래 지속되는 보호를 보장하여 모든 공간에 현명한 투자가 됩니다.`,
      metaDescription: 'Frame Loft 책장 - 인더스트리얼 책장 수납 | 맞춤형 가구 | Naturra Extal 브카시',
      imageAlt: 'Frame Loft 책장 - 인더스트리얼 책장 수납 - Naturra Extal의 프리미엄 가구'
    }
  },
  'balcony-bar-table': {
    en: {
      name: 'Balcony Bar Table',
      caption: 'Balcony Bar Table - Outdoor Industrial Bar Table for Patio and Terrace | Naturra Extal',
      shortCaption: 'Balcony Bar Table - Outdoor Bar Table',
      description: `The Balcony Bar Table from Naturra Extal is the ultimate outdoor dining and entertainment solution for modern spaces. This premium balcony bar table features a robust industrial design with weather-resistant construction that provides maximum durability for outdoor use.

Crafted in our Bekasi workshop since 1999, this balcony bar table showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent stability while maintaining a sleek, modern aesthetic that complements any outdoor or indoor industrial design.

Perfect for balconies, terraces, patios, and outdoor cafes, this balcony bar table provides versatile dining and entertainment capabilities. The weather-resistant powder coating ensures long-lasting protection against harsh outdoor conditions, making it ideal for year-round use.

Built to commercial-grade standards, this balcony bar table is designed to withstand heavy daily use while maintaining its structural integrity and visual appeal. The industrial design effortlessly blends functionality, strength, and outdoor durability, making it an ideal choice for hospitality venues, residential balconies, and outdoor entertainment spaces.`,
      metaDescription: 'Balcony Bar Table - Outdoor Industrial Bar Table | Weather Resistant Furniture | Naturra Extal',
      imageAlt: 'Balcony Bar Table - Outdoor Industrial Bar Table - Weather Resistant Furniture from Naturra Extal'
    },
    id: {
      name: 'Meja Bar Balkon',
      caption: 'Balcony Bar Table - Meja Bar Outdoor Industrial untuk Teras dan Balkon | Naturra Extal',
      shortCaption: 'Balcony Bar Table - Meja Bar Outdoor',
      description: `Balcony Bar Table dari Naturra Extal adalah solusi makan dan hiburan outdoor terbaik untuk ruang modern. Meja bar balkon premium ini menampilkan desain industrial yang kokoh dengan konstruksi tahan cuaca yang memberikan ketahanan maksimal untuk penggunaan outdoor.

Dibuat di workshop Bekasi kami sejak 1999, meja bar balkon ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan stabilitas yang sangat baik sambil mempertahankan estetika modern yang ramping yang melengkapi desain industrial outdoor atau indoor apa pun.

Sempurna untuk balkon, teras, patio, dan kafe outdoor, meja bar balkon ini menyediakan kapasitas makan dan hiburan yang serbaguna. Powder coating tahan cuaca memastikan perlindungan tahan lama terhadap kondisi outdoor yang keras, menjadikannya ideal untuk penggunaan sepanjang tahun.

Dibuat sesuai standar kualitas komersial, meja bar balkon ini dirancang untuk menahan penggunaan harian berat sambil mempertahankan integritas struktural dan daya tarik visualnya. Desain industrial dengan mudah memadukan fungsionalitas, kekuatan, dan ketahanan outdoor, menjadikannya pilihan ideal untuk venue hospitality, balkon perumahan, dan ruang hiburan outdoor.`,
      metaDescription: 'Balcony Bar Table - Meja Bar Outdoor Industrial | Furniture Tahan Cuaca | Naturra Extal',
      imageAlt: 'Balcony Bar Table - Meja Bar Outdoor Industrial - Furniture Tahan Cuaca dari Naturra Extal'
    },
    ar: {
      name: 'طاولة بار بلكونة',
      caption: 'طاولة بار بلكونة - طاولة بار صناعية خارجية للفناء والتراس | Naturra Extal',
      shortCaption: 'طاولة بار بلكونة - طاولة بار خارجية',
      description: `طاولة البار للبلكونة من Naturra Extal هي الحل المثالي للطعام والترفيه في الهواء الطلق للمساحات الحديثة. تتميز طاولة البار المميزة هذه بتصميم صناعي قوي مع بناء مقاوم للعوامل الجوية يوفر أقصى قدر من المتانة للاستخدام الخارجي.

صُنعت في ورشة بيكاسي لدينا منذ عام 1999، تعرض طاولة البار هذه تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي استقرارًا ممتازًا مع الحفاظ على جمالية حديثة أنيقة تكمل أي تصميم صناعي داخلي أو خارجي.

مثالية للشرفات والتراسات والفناءات والمقاهي الخارجية، توفر طاولة البار هذه قدرات طعام وترفيه متعددة الاستخدامات. يضمن الطلاء بالبودرة المقاوم للعوامل الجوية حماية طويلة الأمد ضد الظروف الخارجية القاسية، مما يجعلها مثالية للاستخدام على مدار العام.

مبنية وفقًا لمعايير الدرجة التجارية، تم تصميم طاولة البار هذه لتحمل الاستخدام اليومي الثقيل مع الحفاظ على سلامتها الهيكلية وجاذبيتها البصرية. يمزج التصميم الصناعي بسهولة بين الوظائف والقوة والمتانة الخارجية، مما يجعله خيارًا مثاليًا لأماكن الضيافة والشرفات السكنية ومساحات الترفيه الخارجية.`,
      metaDescription: 'طاولة بار بلكونة - طاولة بار صناعية خارجية | أثاث مقاوم للعوامل الجوية | Naturra Extal',
      imageAlt: 'طاولة بار بلكونة - طاولة بار صناعية خارجية - أثاث مقاوم للعوامل الجوية من Naturra Extal'
    },
    zh: {
      name: '阳台吧台桌',
      caption: '阳台吧台桌 - 露台和阳台用户外工业吧台桌 | Naturra Extal',
      shortCaption: '阳台吧台桌 - 户外吧台桌',
      description: `Naturra Extal的阳台吧台桌是现代空间的终极户外用餐和娱乐解决方案。这款优质阳台吧台桌采用坚固的工业设计和防风雨结构，为户外使用提供最大的耐用性。

自1999年以来在我们位于勿加泗的车间制作，这款阳台吧台桌展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的稳定性，同时保持时尚现代的美学，可以补充任何户外或室内工业设计。

非常适合阳台、露台、庭院和户外咖啡馆，这款阳台吧台桌提供多功能用餐和娱乐能力。防风雨粉末涂层确保对恶劣户外条件的长期保护，使其成为全年使用的理想选择。

按照商业级标准制造，这款阳台吧台桌旨在承受繁重的日常使用，同时保持其结构完整性和视觉吸引力。工业设计轻松融合了功能性、强度和户外耐用性，使其成为酒店场所、住宅阳台和户外娱乐空间的理想选择。`,
      metaDescription: '阳台吧台桌 - 户外工业吧台桌 | 防风雨家具 | Naturra Extal',
      imageAlt: '阳台吧台桌 - 户外工业吧台桌 - Naturra Extal的防风雨家具'
    },
    ja: {
      name: 'バルコニーバーテーブル',
      caption: 'バルコニーバーテーブル - パティオとテラス用アウトドア工業用バーテーブル | Naturra Extal',
      shortCaption: 'バルコニーバーテーブル - アウトドアバーテーブル',
      description: `Naturra Extalのバルコニーバーテーブルは、モダンな空間のための究極のアウトドアダイニングとエンターテインメントソリューションです。このプレミアムバルコニーバーテーブルは、屋外使用に最大限の耐久性を提供する耐候性構造を備えた頑丈な工業デザインが特徴です。

1999年以来、ブカシのワークショップで製作されたこのバルコニーバーテーブルは、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる屋外または屋内の工業デザインを補完する洗練された現代的な美学を維持しながら、優れた安定性を提供します。

バルコニー、テラス、パティオ、屋外カフェに最適で、このバルコニーバーテーブルは多目的なダイニングとエンターテインメント機能を提供します。耐候性粉体塗装は、過酷な屋外条件に対する長期的な保護を保証し、一年中の使用に理想的です。

商業グレードの基準で製造されたこのバルコニーバーテーブルは、構造的完全性と視覚的魅力を維持しながら、重い日常使用に耐えるように設計されています。工業デザインは、機能性、強度、屋外耐久性を簡単に融合させ、ホスピタリティ会場、住宅バルコニー、屋外エンターテインメントスペースに理想的な選択となっています。`,
      metaDescription: 'バルコニーバーテーブル - アウトドア工業用バーテーブル | 耐候性家具 | Naturra Extal',
      imageAlt: 'バルコニーバーテーブル - アウトドア工業用バーテーブル - Naturra Extalの耐候性家具'
    },
    es: {
      name: 'Mesa de Bar para Balcón',
      caption: 'Mesa de Bar para Balcón - Mesa de Bar Industrial para Exteriores para Patio y Terraza | Naturra Extal',
      shortCaption: 'Mesa de Bar para Balcón - Mesa de Bar para Exteriores',
      description: `La Mesa de Bar para Balcón de Naturra Extal es la solución definitiva de comedor y entretenimiento al aire libre para espacios modernos. Esta mesa de bar premium presenta un diseño industrial robusto con construcción resistente a la intemperie que proporciona la máxima durabilidad para uso en exteriores.

Elaborada en nuestro taller de Bekasi desde 1999, esta mesa de bar para balcón muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente estabilidad mientras mantiene una estética moderna elegante que complementa cualquier diseño industrial interior o exterior.

Perfecta para balcones, terrazas, patios y cafeterías al aire libre, esta mesa de bar para balcón proporciona capacidades de comedor y entretenimiento versátiles. El recubrimiento en polvo resistente a la intemperie asegura una protección duradera contra condiciones exteriores adversas, haciéndola ideal para uso durante todo el año.

Construida según estándares de grado comercial, esta mesa de bar para balcón está diseñada para soportar un uso diario intenso mientras mantiene su integridad estructural y atractivo visual. El diseño industrial combina sin esfuerzo funcionalidad, resistencia y durabilidad para exteriores, convirtiéndola en una opción ideal para lugares de hospitalidad, balcones residenciales y espacios de entretenimiento al aire libre.`,
      metaDescription: 'Mesa de Bar para Balcón - Mesa de Bar Industrial para Exteriores | Mobiliario Resistente a la Intemperie | Naturra Extal',
      imageAlt: 'Mesa de Bar para Balcón - Mesa de Bar Industrial para Exteriores - Mobiliario Resistente a la Intemperie de Naturra Extal'
    },
    fr: {
      name: 'Table de Bar de Balcon',
      caption: 'Table de Bar de Balcon - Table de Bar Industrielle Extérieure pour Patio et Terrasse | Naturra Extal',
      shortCaption: 'Table de Bar de Balcon - Table de Bar Extérieure',
      description: `La Table de Bar de Balcon de Naturra Extal est la solution ultime de restauration et de divertissement en plein air pour les espaces modernes. Cette table de bar premium présente un design industriel robuste avec une construction résistante aux intempéries qui offre une durabilité maximale pour une utilisation en extérieur.

Fabriquée dans notre atelier de Bekasi depuis 1999, cette table de bar de balcon présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente stabilité tout en maintenant une esthétique moderne élégante qui complète tout design industriel intérieur ou extérieur.

Parfaite pour les balcons, les terrasses, les patios et les cafés en plein air, cette table de bar de balcon offre des capacités de restauration et de divertissement polyvalentes. Le revêtement en poudre résistant aux intempéries assure une protection durable contre les conditions extérieures difficiles, ce qui la rend idéale pour une utilisation toute l'année.

Construite selon des normes de qualité commerciale, cette table de bar de balcon est conçue pour résister à une utilisation quotidienne intensive tout en maintenant son intégrité structurelle et son attrait visuel. Le design industriel mélange sans effort fonctionnalité, résistance et durabilité extérieure, ce qui en fait un choix idéal pour les lieux d'accueil, les balcons résidentiels et les espaces de divertissement en plein air.`,
      metaDescription: 'Table de Bar de Balcon - Table de Bar Industrielle Extérieure | Mobilier Résistant aux Intempéries | Naturra Extal',
      imageAlt: 'Table de Bar de Balcon - Table de Bar Industrielle Extérieure - Mobilier Résistant aux Intempéries de Naturra Extal'
    },
    ko: {
      name: '발코니 바 테이블',
      caption: '발코니 바 테이블 - 파티오와 테라스용 아웃도어 인더스트리얼 바 테이블 | Naturra Extal',
      shortCaption: '발코니 바 테이블 - 아웃도어 바 테이블',
      description: `Naturra Extal의 발코니 바 테이블은 현대 공간을 위한 궁극적인 아웃도어 식사 및 엔터테인먼트 솔루션입니다. 이 프리미엄 발코니 바 테이블은 아웃도어 사용을 위한 최대 내구성을 제공하는 내후성 구조를 갖춘 견고한 인더스트리얼 디자인이 특징입니다.

1999년부터 브카시 워크숍에서 제작된 이 발코니 바 테이블은 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 아웃도어 또는 인도어 인더스트리얼 디자인을 보완하는 세련되고 현대적인 미학을 유지하면서 뛰어난 안정성을 제공합니다.

발코니, 테라스, 파티오 및 아웃도어 카페에 완벽한 이 발코니 바 테이블은 다목적 식사 및 엔터테인먼트 기능을 제공합니다. 내후성 분체 도장은 가혹한 아웃도어 조건에 대한 오래 지속되는 보호를 보장하여 일년 내내 사용하기에 이상적입니다.

상업용 등급 표준에 따라 제작된 이 발코니 바 테이블은 구조적 무결성과 시각적 매력을 유지하면서 무거운 일상 사용을 견디도록 설계되었습니다. 인더스트리얼 디자인은 기능성, 강도 및 아웃도어 내구성을 쉽게 결합하여 호스피탈리티 장소, 주거 발코니 및 아웃도어 엔터테인먼트 공간에 이상적인 선택이 됩니다.`,
      metaDescription: '발코니 바 테이블 - 아웃도어 인더스트리얼 바 테이블 | 내후성 가구 | Naturra Extal',
      imageAlt: '발코니 바 테이블 - 아웃도어 인더스트리얼 바 테이블 - Naturra Extal의 내후성 가구'
    }
  },
  'lounge-set-coffee-table': {
    en: {
      name: 'Lounge Set Coffee Table',
      caption: 'Lounge Set Coffee Table - Industrial Coffee Table for Living Room | Naturra Extal',
      shortCaption: 'Lounge Set Coffee Table - Industrial Coffee Table',
      description: `The Lounge Set Coffee Table from Naturra Extal is expertly crafted Agricultural Commodities designed for modern living spaces. This premium coffee table features a robust industrial design with steel construction that provides maximum durability and visual appeal.

Crafted in our Bekasi workshop since 1999, this lounge set coffee table showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent stability while maintaining a sleek, modern aesthetic that complements any industrial or contemporary interior design.

Perfect for living rooms, lounges, waiting areas, and commercial spaces, this lounge set coffee table provides versatile functionality. The industrial design creates a focal point for living areas while offering practical functionality for daily use.`,
      metaDescription: 'Lounge Set Coffee Table - Industrial Coffee Table | Custom Furniture | Naturra Extal',
      imageAlt: 'Lounge Set Coffee Table - Industrial Coffee Table - Premium Furniture from Naturra Extal'
    },
    id: {
      name: 'Meja Kopi Lounge Set',
      caption: 'Lounge Set Coffee Table - Meja Kopi Industrial untuk Ruang Tamu | Naturra Extal',
      shortCaption: 'Lounge Set Coffee Table - Meja Kopi Industrial',
      description: `Lounge Set Coffee Table dari Naturra Extal adalah agricultural commodities yang dibuat dengan ahli untuk ruang hidup modern. Meja kopi premium ini menampilkan desain industrial yang kokoh dengan konstruksi baja yang memberikan ketahanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, meja kopi lounge set ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan stabilitas yang sangat baik sambil mempertahankan estetika modern yang ramping yang melengkapi desain interior industrial atau kontemporer apa pun.

Sempurna untuk ruang tamu, lounge, area tunggu, dan ruang komersial, meja kopi lounge set ini menyediakan fungsionalitas yang serbaguna. Desain industrial menciptakan titik fokus untuk ruang hidup sambil menawarkan fungsionalitas praktis untuk penggunaan harian.`,
      metaDescription: 'Lounge Set Coffee Table - Meja Kopi Industrial | Furniture Custom | Naturra Extal',
      imageAlt: 'Lounge Set Coffee Table - Meja Kopi Industrial - Furniture Premium dari Naturra Extal'
    },
    ar: {
      name: 'طاولة قهوة لاونج سيت',
      caption: 'طاولة قهوة لاونج سيت - طاولة قهوة صناعية لغرفة المعيشة | Naturra Extal',
      shortCaption: 'طاولة قهوة لاونج سيت - طاولة قهوة صناعية',
      description: `طاولة القهوة لاونج سيت من Naturra Extal هي أثاث صناعي مصنوع بخبرة ومصمم لمساحات المعيشة الحديثة. تتميز طاولة القهوة المميزة هذه بتصميم صناعي قوي مع هيكل فولاذي يوفر أقصى قدر من المتانة والجاذبية البصرية.

صُنعت في ورشة بيكاسي لدينا منذ عام 1999، تعرض طاولة القهوة هذه تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي استقرارًا ممتازًا مع الحفاظ على جمالية حديثة أنيقة تكمل أي تصميم داخلي صناعي أو معاصر.

مثالية لغرف المعيشة والصالات ومناطق الانتظار والمساحات التجارية، توفر طاولة القهوة هذه وظائف متعددة الاستخدامات. يخلق التصميم الصناعي نقطة محورية لمناطق المعيشة مع توفير وظائف عملية للاستخدام اليومي.`,
      metaDescription: 'طاولة قهوة لاونج سيت - طاولة قهوة صناعية | أثاث مخصص | Naturra Extal',
      imageAlt: 'طاولة قهوة لاونج سيت - طاولة قهوة صناعية - أثاث مميز من Naturra Extal'
    },
    zh: {
      name: '休息区咖啡桌',
      caption: '休息区咖啡桌 - 客厅工业咖啡桌 | Naturra Extal',
      shortCaption: '休息区咖啡桌 - 工业咖啡桌',
      description: `Naturra Extal的休息区咖啡桌是为现代生活空间精心制作的工业家具。这款优质咖啡桌采用坚固的工业设计和钢结构，提供最大的耐用性和视觉吸引力。

自1999年以来在我们位于勿加泗的车间制作，这款休息区咖啡桌展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的稳定性，同时保持时尚现代的美学，可以补充任何工业或现代室内设计。

非常适合客厅、休息室、等候区和商业空间，这款休息区咖啡桌提供多功能性。工业设计为生活区域创造了一个焦点，同时为日常使用提供实用功能。`,
      metaDescription: '休息区咖啡桌 - 工业咖啡桌 | 定制家具 | Naturra Extal',
      imageAlt: '休息区咖啡桌 - 工业咖啡桌 - Naturra Extal的优质家具'
    },
    ja: {
      name: 'ラウンジセットコーヒーテーブル',
      caption: 'ラウンジセットコーヒーテーブル - リビングルーム用工業用コーヒーテーブル | Naturra Extal',
      shortCaption: 'ラウンジセットコーヒーテーブル - 工業用コーヒーテーブル',
      description: `Naturra Extalのラウンジセットコーヒーテーブルは、モダンなリビングスペースのために expertly crafted された工業用家具です。このプレミアムコーヒーテーブルは、最大限の耐久性と視覚的な魅力を提供する頑丈な工業デザインとスチール構造が特徴です。

1999年以来、ブカシのワークショップで製作されたこのラウンジセットコーヒーテーブルは、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる工業的または現代的なインテリアデザインを補完する洗練された現代的な美学を維持しながら、優れた安定性を提供します。

リビングルーム、ラウンジ、待合エリア、商業空間に最適で、このラウンジセットコーヒーテーブルは多目的な機能を提供します。工業デザインは、日常使用のための実用的な機能を提供しながら、リビングエリアの焦点を作り出します。`,
      metaDescription: 'ラウンジセットコーヒーテーブル - 工業用コーヒーテーブル | カスタム家具 | Naturra Extal',
      imageAlt: 'ラウンジセットコーヒーテーブル - 工業用コーヒーテーブル - Naturra Extalのプレミアム家具'
    },
    es: {
      name: 'Mesa de Centro Lounge Set',
      caption: 'Mesa de Centro Lounge Set - Mesa de Centro Industrial para Sala de Estar | Naturra Extal',
      shortCaption: 'Mesa de Centro Lounge Set - Mesa de Centro Industrial',
      description: `La Mesa de Centro Lounge Set de Naturra Extal es un mueble industrial expertamente elaborado diseñado para espacios de vida modernos. Esta mesa de centro premium presenta un diseño industrial robusto con construcción de acero que proporciona la máxima durabilidad y atractivo visual.

Elaborada en nuestro taller de Bekasi desde 1999, esta mesa de centro lounge set muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente estabilidad mientras mantiene una estética moderna elegante que complementa cualquier diseño de interiores industrial o contemporáneo.

Perfecta para salas de estar, lounges, áreas de espera y espacios comerciales, esta mesa de centro lounge set proporciona funcionalidad versátil. El diseño industrial crea un punto focal para las áreas de estar mientras ofrece funcionalidad práctica para el uso diario.`,
      metaDescription: 'Mesa de Centro Lounge Set - Mesa de Centro Industrial | Mobiliario Personalizado | Naturra Extal',
      imageAlt: 'Mesa de Centro Lounge Set - Mesa de Centro Industrial - Mobiliario Premium de Naturra Extal'
    },
    fr: {
      name: 'Table Basse Lounge Set',
      caption: 'Table Basse Lounge Set - Table Basse Industrielle pour Salon | Naturra Extal',
      shortCaption: 'Table Basse Lounge Set - Table Basse Industrielle',
      description: `La Table Basse Lounge Set de Naturra Extal est un meuble industriel expertement conçu pour les espaces de vie modernes. Cette table basse premium présente un design industriel robuste avec une construction en acier qui offre une durabilité maximale et un attrait visuel.

Fabriquée dans notre atelier de Bekasi depuis 1999, cette table basse lounge set présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente stabilité tout en maintenant une esthétique moderne élégante qui complète tout design d'intérieur industriel ou contemporain.

Parfaite pour les salons, les lounges, les zones d'attente et les espaces commerciaux, cette table basse lounge set offre une fonctionnalité polyvalente. Le design industriel crée un point focal pour les espaces de vie tout en offrant une fonctionnalité pratique pour une utilisation quotidienne.`,
      metaDescription: 'Table Basse Lounge Set - Table Basse Industrielle | Mobilier Personnalisé | Naturra Extal',
      imageAlt: 'Table Basse Lounge Set - Table Basse Industrielle - Mobilier Premium de Naturra Extal'
    },
    ko: {
      name: '라운지 세트 커피 테이블',
      caption: '라운지 세트 커피 테이블 - 거실용 인더스트리얼 커피 테이블 | Naturra Extal',
      shortCaption: '라운지 세트 커피 테이블 - 인더스트리얼 커피 테이블',
      description: `Naturra Extal의 라운지 세트 커피 테이블은 현대 생활 공간을 위해 전문적으로 제작된 인더스트리얼 가구입니다. 이 프리미엄 커피 테이블은 최대 내구성과 시각적 매력을 제공하는 견고한 인더스트리얼 디자인과 강철 구조가 특징입니다.

1999년부터 브카시 워크숍에서 제작된 이 라운지 세트 커피 테이블은 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 세련되고 현대적인 미학을 유지하면서 뛰어난 안정성을 제공합니다.

거실, 라운지, 대기 공간 및 상업 공간에 완벽한 이 라운지 세트 커피 테이블은 다목적 기능을 제공합니다. 인더스트리얼 디자인은 일상 사용을 위한 실용적인 기능을 제공하면서 생활 공간의 초점을 만듭니다.`,
      metaDescription: '라운지 세트 커피 테이블 - 인더스트리얼 커피 테이블 | 맞춤형 가구 | Naturra Extal',
      imageAlt: '라운지 세트 커피 테이블 - 인더스트리얼 커피 테이블 - Naturra Extal의 프리미엄 가구'
    }
  },
  'bench-corner-lounge': {
    en: {
      name: 'Bench Corner Lounge',
      caption: 'Bench Corner Lounge - Industrial Corner Bench for Cafes and Restaurants | Naturra Extal',
      shortCaption: 'Bench Corner Lounge - Industrial Corner Bench',
      description: `The Bench Corner Lounge from Naturra Extal is the perfect industrial seating solution for modern cafes, restaurants, and commercial spaces. This premium bench corner lounge features a sleek industrial design with comfortable seating that provides maximum comfort and visual appeal.

Crafted in our Bekasi workshop since 1999, this bench corner lounge showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent durability while maintaining a clean, minimalist aesthetic that complements any industrial or modern interior design.

Perfect for cafes, restaurants, waiting areas, and commercial spaces, this bench corner lounge provides versatile seating capabilities. The corner design maximizes space efficiency while creating intimate seating areas for guests and customers.`,
      metaDescription: 'Bench Corner Lounge - Industrial Corner Bench | Cafe Furniture | Naturra Extal',
      imageAlt: 'Bench Corner Lounge - Industrial Corner Bench - Premium Seating from Naturra Extal'
    },
    id: {
      name: 'Kursi Sudut Lounge',
      caption: 'Bench Corner Lounge - Kursi Sudut Industrial untuk Kafe dan Restoran | Naturra Extal',
      shortCaption: 'Bench Corner Lounge - Kursi Sudut Industrial',
      description: `Bench Corner Lounge dari Naturra Extal adalah solusi tempat duduk industrial sempurna untuk kafe modern, restoran, dan ruang komersial. Kursi sudut premium ini menampilkan desain industrial yang ramping dengan tempat duduk yang nyaman yang memberikan kenyamanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, kursi sudut ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan ketahanan yang sangat baik sambil mempertahankan estetika minimalis yang bersih yang melengkapi desain interior industrial atau modern apa pun.

Sempurna untuk kafe, restoran, area tunggu, dan ruang komersial, kursi sudut ini menyediakan kapasitas tempat duduk yang serbaguna. Desain sudut memaksimalkan efisiensi ruang sambil menciptakan area tempat duduk yang intim untuk tamu dan pelanggan.`,
      metaDescription: 'Bench Corner Lounge - Kursi Sudut Industrial | Furniture Kafe | Naturra Extal',
      imageAlt: 'Bench Corner Lounge - Kursi Sudut Industrial - Tempat Duduk Premium dari Naturra Extal'
    },
    ar: {
      name: 'مقعد زاوية لاونج',
      caption: 'مقعد زاوية لاونج - مقعد زاوية صناعي للمقاهي والمطاعم | Naturra Extal',
      shortCaption: 'مقعد زاوية لاونج - مقعد زاوية صناعي',
      description: `مقعد الزاوية لاونج من Naturra Extal هو الحل الأمثل للجلوس الصناعي للمقاهي والمطاعم والمساحات التجارية الحديثة. يتميز مقعد الزاوية المميز هذا بتصميم صناعي أنيق مع مقاعد مريحة توفر أقصى قدر من الراحة والجاذبية البصرية.

صُنع في ورشة بيكاسي لدينا منذ عام 1999، يعرض مقعد الزاوية هذا تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي متانة ممتازة مع الحفاظ على جمالية بسيطة ونظيفة تكمل أي تصميم داخلي صناعي أو حديث.

مثالي للمقاهي والمطاعم ومناطق الانتظار والمساحات التجارية، يوفر مقعد الزاوية هذا قدرات جلوس متعددة الاستخدامات. يعظم تصميم الزاوية كفاءة المساحة مع إنشاء مناطق جلوس حميمة للضيوف والعملاء.`,
      metaDescription: 'مقعد زاوية لاونج - مقعد زاوية صناعي | أثاث المقاهي | Naturra Extal',
      imageAlt: 'مقعد زاوية لاونج - مقعد زاوية صناعي - مقاعد مميزة من Naturra Extal'
    },
    zh: {
      name: '角落休息长椅',
      caption: '角落休息长椅 - 咖啡馆和餐厅用工业角落长椅 | Naturra Extal',
      shortCaption: '角落休息长椅 - 工业角落长椅',
      description: `Naturra Extal的角落休息长椅是现代咖啡馆、餐厅和商业空间的完美工业座椅解决方案。这款优质角落休息长椅采用时尚的工业设计和舒适的座椅，提供最大的舒适性和视觉吸引力。

自1999年以来在我们位于勿加泗的车间制作，这款角落休息长椅展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的耐用性，同时保持干净、简约的美学，可以补充任何工业或现代室内设计。

非常适合咖啡馆、餐厅、等候区和商业空间，这款角落休息长椅提供多功能座椅能力。角落设计在为客人和顾客创造亲密座位区域的同时最大化空间效率。`,
      metaDescription: '角落休息长椅 - 工业角落长椅 | 咖啡馆家具 | Naturra Extal',
      imageAlt: '角落休息长椅 - 工业角落长椅 - Naturra Extal的优质座椅'
    },
    ja: {
      name: 'ベンチコーナーラウンジ',
      caption: 'ベンチコーナーラウンジ - カフェとレストラン用工業用コーナーベンチ | Naturra Extal',
      shortCaption: 'ベンチコーナーラウンジ - 工業用コーナーベンチ',
      description: `Naturra Extalのベンチコーナーラウンジは、モダンなカフェ、レストラン、商業空間のための完璧な工業用シーティングソリューションです。このプレミアムベンチコーナーラウンジは、最大限の快適性と視覚的な魅力を提供する快適な座席を備えた洗練された工業デザインが特徴です。

1999年以来、ブカシのワークショップで製作されたこのベンチコーナーラウンジは、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる工業的またはモダンなインテリアデザインを補完するクリーンでミニマリストな美学を維持しながら、優れた耐久性を提供します。

カフェ、レストラン、待合エリア、商業空間に最適で、このベンチコーナーラウンジは多目的な座席機能を提供します。コーナーデザインは、ゲストや顧客のための親密な座席エリアを作り出しながら、スペース効率を最大化します。`,
      metaDescription: 'ベンチコーナーラウンジ - 工業用コーナーベンチ | カフェ家具 | Naturra Extal',
      imageAlt: 'ベンチコーナーラウンジ - 工業用コーナーベンチ - Naturra Extalのプレミアムシーティング'
    },
    es: {
      name: 'Banco de Esquina Lounge',
      caption: 'Banco de Esquina Lounge - Banco de Esquina Industrial para Cafés y Restaurantes | Naturra Extal',
      shortCaption: 'Banco de Esquina Lounge - Banco de Esquina Industrial',
      description: `El Banco de Esquina Lounge de Naturra Extal es la solución perfecta de asientos industriales para cafeterías modernas, restaurantes y espacios comerciales. Este banco de esquina premium presenta un diseño industrial elegante con asientos cómodos que proporcionan la máxima comodidad y atractivo visual.

Elaborado en nuestro taller de Bekasi desde 1999, este banco de esquina lounge muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente durabilidad mientras mantiene una estética minimalista y limpia que complementa cualquier diseño de interiores industrial o moderno.

Perfecto para cafés, restaurantes, áreas de espera y espacios comerciales, este banco de esquina lounge proporciona capacidades de asientos versátiles. El diseño de esquina maximiza la eficiencia del espacio mientras crea áreas de asientos íntimas para invitados y clientes.`,
      metaDescription: 'Banco de Esquina Lounge - Banco de Esquina Industrial | Mobiliario de Cafetería | Naturra Extal',
      imageAlt: 'Banco de Esquina Lounge - Banco de Esquina Industrial - Asientos Premium de Naturra Extal'
    },
    fr: {
      name: 'Banquette d\'Angle Lounge',
      caption: 'Banquette d\'Angle Lounge - Banquette d\'Angle Industrielle pour Cafés et Restaurants | Naturra Extal',
      shortCaption: 'Banquette d\'Angle Lounge - Banquette d\'Angle Industrielle',
      description: `La Banquette d'Angle Lounge de Naturra Extal est la solution parfaite de sièges industriels pour les cafés modernes, les restaurants et les espaces commerciaux. Cette banquette d'angle premium présente un design industriel élégant avec des sièges confortables qui offrent un confort maximal et un attrait visuel.

Fabriquée dans notre atelier de Bekasi depuis 1999, cette banquette d'angle lounge présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente durabilité tout en maintenant une esthétique minimaliste et épurée qui complète tout design d'intérieur industriel ou moderne.

Parfaite pour les cafés, les restaurants, les zones d'attente et les espaces commerciaux, cette banquette d'angle lounge offre des capacités d'assise polyvalentes. Le design d'angle maximise l'efficacité de l'espace tout en créant des zones d'assise intimes pour les invités et les clients.`,
      metaDescription: 'Banquette d\'Angle Lounge - Banquette d\'Angle Industrielle | Mobilier de Café | Naturra Extal',
      imageAlt: 'Banquette d\'Angle Lounge - Banquette d\'Angle Industrielle - Sièges Premium de Naturra Extal'
    },
    ko: {
      name: '벤치 코너 라운지',
      caption: '벤치 코너 라운지 - 카페와 레스토랑용 인더스트리얼 코너 벤치 | Naturra Extal',
      shortCaption: '벤치 코너 라운지 - 인더스트리얼 코너 벤치',
      description: `Naturra Extal의 벤치 코너 라운지는 현대적인 카페, 레스토랑 및 상업 공간을 위한 완벽한 인더스트리얼 좌석 솔루션입니다. 이 프리미엄 벤치 코너 라운지는 최대의 편안함과 시각적 매력을 제공하는 편안한 좌석을 갖춘 세련된 인더스트리얼 디자인이 특징입니다.

1999년부터 브카시 워크숍에서 제작된 이 벤치 코너 라운지는 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 깔끔하고 미니멀한 미학을 유지하면서 뛰어난 내구성을 제공합니다.

카페, 레스토랑, 대기 공간 및 상업 공간에 완벽한 이 벤치 코너 라운지는 다목적 좌석 기능을 제공합니다. 코너 디자인은 손님과 고객을 위한 친밀한 좌석 공간을 만들면서 공간 효율성을 최대화합니다.`,
      metaDescription: '벤치 코너 라운지 - 인더스트리얼 코너 벤치 | 카페 가구 | Naturra Extal',
      imageAlt: '벤치 코너 라운지 - 인더스트리얼 코너 벤치 - Naturra Extal의 프리미엄 좌석'
    }
  },
  'industrial-daybed-frame': {
    en: {
      name: 'Industrial Daybed Frame',
      caption: 'Industrial Daybed Frame - Steel Daybed Frame for Lounge Areas | Naturra Extal',
      shortCaption: 'Industrial Daybed Frame - Steel Daybed',
      description: `The Industrial Daybed Frame from Naturra Extal is the perfect Agricultural Commodities solution for modern spaces. This premium industrial daybed frame features a robust industrial design with steel construction that provides maximum durability and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial daybed frame showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent strength while maintaining a sleek, modern aesthetic that complements any industrial or contemporary interior design.

Perfect for lounges, waiting areas, hotels, and commercial spaces, this industrial daybed frame provides versatile seating and relaxation capabilities. The daybed design offers comfortable seating and lounging options for guests and customers.`,
      metaDescription: 'Industrial Daybed Frame - Steel Daybed Frame | Lounge Furniture | Naturra Extal',
      imageAlt: 'Industrial Daybed Frame - Steel Daybed - Premium Furniture from Naturra Extal'
    },
    id: {
      name: 'Rangka Daybed Industrial',
      caption: 'Industrial Daybed Frame - Rangka Daybed Baja untuk Area Lounge | Naturra Extal',
      shortCaption: 'Industrial Daybed Frame - Daybed Baja',
      description: `Industrial Daybed Frame dari Naturra Extal adalah solusi agricultural commodities sempurna untuk ruang modern. Rangka daybed industrial premium ini menampilkan desain industrial yang kokoh dengan konstruksi baja yang memberikan ketahanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, rangka daybed industrial ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan kekuatan yang sangat baik sambil mempertahankan estetika modern yang ramping yang melengkapi desain interior industrial atau kontemporer apa pun.

Sempurna untuk lounge, area tunggu, hotel, dan ruang komersial, rangka daybed industrial ini menyediakan kapasitas tempat duduk dan relaksasi yang serbaguna. Desain daybed menawarkan opsi tempat duduk dan berbaring yang nyaman untuk tamu dan pelanggan.`,
      metaDescription: 'Industrial Daybed Frame - Rangka Daybed Baja | Furniture Lounge | Naturra Extal',
      imageAlt: 'Industrial Daybed Frame - Daybed Baja - Furniture Premium dari Naturra Extal'
    },
    ar: { name: 'إطار سرير نهاري صناعي', caption: 'إطار سرير نهاري صناعي - إطار سرير نهاري فولاذي لمناطق الصالة | Naturra Extal', shortCaption: 'إطار سرير نهاري صناعي - سرير نهاري فولاذي', description: `إطار السرير النهاري الصناعي من Naturra Extal هو الحل المثالي للأثاث الصناعي للمساحات الحديثة. يتميز إطار السرير النهاري الصناعي المميز هذا بتصميم صناعي قوي مع هيكل فولاذي يوفر أقصى قدر من المتانة والجاذبية البصرية.\n\nصُنع في ورشة بيكاسي لدينا منذ عام 1999، يعرض إطار السرير النهاري الصناعي هذا تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي قوة ممتازة مع الحفاظ على جمالية حديثة أنيقة تكمل أي تصميم داخلي صناعي أو معاصر.\n\nمثالي للصالات ومناطق الانتظار والفنادق والمساحات التجارية، يوفر إطار السرير النهاري الصناعي هذا قدرات جلوس واسترخاء متعددة الاستخدامات. يوفر تصميم السرير النهاري خيارات جلوس واسترخاء مريحة للضيوف والعملاء.`, metaDescription: 'إطار سرير نهاري صناعي - إطار سرير نهاري فولاذي | أثاث الصالة | Naturra Extal', imageAlt: 'إطار سرير نهاري صناعي - سرير نهاري فولاذي - أثاث مميز من Naturra Extal' },
    zh: { name: '工业躺椅框架', caption: '工业躺椅框架 - 休息区用钢制躺椅框架 | Naturra Extal', shortCaption: '工业躺椅框架 - 钢制躺椅', description: `Naturra Extal的工业躺椅框架是现代空间的完美工业家具解决方案。这款优质工业躺椅框架采用坚固的工业设计和钢结构，提供最大的耐用性和视觉吸引力。\n\n自1999年以来在我们位于勿加泗的车间制作，这款工业躺椅框架展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的强度，同时保持时尚现代的美学，可以补充任何工业或现代室内设计。\n\n非常适合休息室、等候区、酒店和商业空间，这款工业躺椅框架提供多功能座椅和休息能力。躺椅设计为客人和顾客提供舒适的座椅和休息选项。`, metaDescription: '工业躺椅框架 - 钢制躺椅框架 | 休息室家具 | Naturra Extal', imageAlt: '工业躺椅框架 - 钢制躺椅 - Naturra Extal的优质家具' },
    ja: { name: 'インダストリアル デイベッドフレーム', caption: 'インダストリアル デイベッドフレーム - ラウンジエリア用スチールデイベッドフレーム | Naturra Extal', shortCaption: 'インダストリアル デイベッドフレーム - スチールデイベッド', description: `Naturra Extalのインダストリアル デイベッドフレームは、モダンな空間のための完璧な工業用家具ソリューションです。このプレミアム工業用デイベッドフレームは、最大限の耐久性と視覚的な魅力を提供する頑丈な工業デザインとスチール構造が特徴です。\n\n1999年以来、ブカシのワークショップで製作されたこの工業用デイベッドフレームは、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる工業的または現代的なインテリアデザインを補完する洗練された現代的な美学を維持しながら、優れた強度を提供します。\n\nラウンジ、待合エリア、ホテル、商業空間に最適で、この工業用デイベッドフレームは多目的な座席とリラクゼーション機能を提供します。デイベッドデザインは、ゲストや顧客に快適な座席とラウンジオプションを提供します。`, metaDescription: 'インダストリアル デイベッドフレーム - スチールデイベッドフレーム | ラウンジ家具 | Naturra Extal', imageAlt: 'インダストリアル デイベッドフレーム - スチールデイベッド - Naturra Extalのプレミアム家具' },
    es: { name: 'Marco de Diván Industrial', caption: 'Marco de Diván Industrial - Marco de Diván de Acero para Áreas de Lounge | Naturra Extal', shortCaption: 'Marco de Diván Industrial - Diván de Acero', description: `El Marco de Diván Industrial de Naturra Extal es la solución perfecta de mobiliario industrial para espacios modernos. Este marco de diván industrial premium presenta un diseño industrial robusto con construcción de acero que proporciona la máxima durabilidad y atractivo visual.\n\nElaborado en nuestro taller de Bekasi desde 1999, este marco de diván industrial muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente resistencia mientras mantiene una estética moderna elegante que complementa cualquier diseño de interiores industrial o contemporáneo.\n\nPerfecto para lounges, áreas de espera, hoteles y espacios comerciales, este marco de diván industrial proporciona capacidades de asientos y relajación versátiles. El diseño de diván ofrece opciones de asientos y descanso cómodas para invitados y clientes.`, metaDescription: 'Marco de Diván Industrial - Marco de Diván de Acero | Mobiliario de Lounge | Naturra Extal', imageAlt: 'Marco de Diván Industrial - Diván de Acero - Mobiliario Premium de Naturra Extal' },
    fr: { name: 'Cadre de Lit de Jour Industriel', caption: 'Cadre de Lit de Jour Industriel - Cadre de Lit de Jour en Acier pour Espaces Lounge | Naturra Extal', shortCaption: 'Cadre de Lit de Jour Industriel - Lit de Jour en Acier', description: `Le Cadre de Lit de Jour Industriel de Naturra Extal est la solution parfaite de mobilier industriel pour les espaces modernes. Ce cadre de lit de jour industriel premium présente un design industriel robuste avec une construction en acier qui offre une durabilité maximale et un attrait visuel.\n\nFabriqué dans notre atelier de Bekasi depuis 1999, ce cadre de lit de jour industriel présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente résistance tout en maintenant une esthétique moderne élégante qui complète tout design d'intérieur industriel ou contemporain.\n\nParfait pour les lounges, les zones d'attente, les hôtels et les espaces commerciaux, ce cadre de lit de jour industriel offre des capacités d'assise et de relaxation polyvalentes. Le design de lit de jour offre des options d'assise et de détente confortables pour les invités et les clients.`, metaDescription: 'Cadre de Lit de Jour Industriel - Cadre de Lit de Jour en Acier | Mobilier de Lounge | Naturra Extal', imageAlt: 'Cadre de Lit de Jour Industriel - Lit de Jour en Acier - Mobilier Premium de Naturra Extal' },
    ko: { name: '인더스트리얼 데이베드 프레임', caption: '인더스트리얼 데이베드 프레임 - 라운지 공간용 강철 데이베드 프레임 | Naturra Extal', shortCaption: '인더스트리얼 데이베드 프레임 - 강철 데이베드', description: `Naturra Extal의 인더스트리얼 데이베드 프레임은 현대 공간을 위한 완벽한 인더스트리얼 가구 솔루션입니다. 이 프리미엄 인더스트리얼 데이베드 프레임은 최대 내구성과 시각적 매력을 제공하는 견고한 인더스트리얼 디자인과 강철 구조가 특징입니다.\n\n1999년부터 브카시 워크숍에서 제작된 이 인더스트리얼 데이베드 프레임은 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 세련되고 현대적인 미학을 유지하면서 뛰어난 강도를 제공합니다.\n\n라운지, 대기 공간, 호텔 및 상업 공간에 완벽한 이 인더스트리얼 데이베드 프레임은 다목적 좌석 및 휴식 기능을 제공합니다. 데이베드 디자인은 손님과 고객을 위한 편안한 좌석 및 라운지 옵션을 제공합니다.`, metaDescription: '인더스트리얼 데이베드 프레임 - 강철 데이베드 프레임 | 라운지 가구 | Naturra Extal', imageAlt: '인더스트리얼 데이베드 프레임 - 강철 데이베드 - Naturra Extal의 프리미엄 가구' }
  },
  'bandung-pipe-dining-table': {
    en: {
      name: 'Bandung Pipe Dining Table',
      caption: 'Bandung Pipe Dining Table - Industrial Dining Table for Home and Restaurant | Naturra Extal',
      shortCaption: 'Bandung Pipe Dining Table - Industrial Dining Table',
      description: `The Bandung Pipe Dining Table from Naturra Extal is the perfect industrial dining solution for modern homes, cafes, and restaurants. This premium industrial dining table features a robust industrial design with steel construction that provides maximum durability and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial dining table showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent stability while maintaining a sleek, modern aesthetic that complements any industrial or contemporary interior design.

Perfect for homes, cafes, restaurants, and commercial dining spaces, this industrial dining table provides versatile dining capabilities. The industrial design creates a focal point for dining areas while offering practical functionality for daily use.`,
      metaDescription: 'Bandung Pipe Dining Table - Industrial Dining Table | Custom Furniture | Naturra Extal',
      imageAlt: 'Bandung Pipe Dining Table - Industrial Dining Table - Premium Furniture from Naturra Extal'
    },
    id: {
      name: 'Meja Makan Pipa Bandung',
      caption: 'Bandung Pipe Dining Table - Meja Makan Industrial untuk Rumah dan Restoran | Naturra Extal',
      shortCaption: 'Bandung Pipe Dining Table - Meja Makan Industrial',
      description: `Bandung Pipe Dining Table dari Naturra Extal adalah solusi makan industrial sempurna untuk rumah modern, kafe, dan restoran. Meja makan industrial premium ini menampilkan desain industrial yang kokoh dengan konstruksi baja yang memberikan ketahanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, meja makan industrial ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan stabilitas yang sangat baik sambil mempertahankan estetika modern yang ramping yang melengkapi desain interior industrial atau kontemporer apa pun.

Sempurna untuk rumah, kafe, restoran, dan ruang makan komersial, meja makan industrial ini menyediakan kapasitas makan yang serbaguna. Desain industrial menciptakan titik fokus untuk area makan sambil menawarkan fungsionalitas praktis untuk penggunaan harian.`,
      metaDescription: 'Bandung Pipe Dining Table - Meja Makan Industrial | Furniture Custom | Naturra Extal',
      imageAlt: 'Bandung Pipe Dining Table - Meja Makan Industrial - Furniture Premium dari Naturra Extal'
    },
    ar: { name: 'طاولة طعام بانودنج بايب', caption: 'طاولة طعام بانودنج بايب - طاولة طعام صناعية للمنزل والمطعم | Naturra Extal', shortCaption: 'طاولة طعام بانودنج بايب - طاولة طعام صناعية', description: `طاولة طعام بانودنج بايب من Naturra Extal هي الحل الأمثل لتناول الطعام الصناعي للمنازل الحديثة والمقاهي والمطاعم. تتميز طاولة الطعام الصناعية المميزة هذه بتصميم صناعي قوي مع هيكل فولاذي يوفر أقصى قدر من المتانة والجاذبية البصرية.\n\nصُنعت في ورشة بيكاسي لدينا منذ عام 1999، تعرض طاولة الطعام الصناعية هذه تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي استقرارًا ممتازًا مع الحفاظ على جمالية حديثة أنيقة تكمل أي تصميم داخلي صناعي أو معاصر.\n\nمثالية للمنازل والمقاهي والمطاعم ومساحات تناول الطعام التجارية، توفر طاولة الطعام الصناعية هذه قدرات طعام متعددة الاستخدامات. يخلق التصميم الصناعي نقطة محورية لمناطق تناول الطعام مع توفير وظائف عملية للاستخدام اليومي.`, metaDescription: 'طاولة طعام بانودنج بايب - طاولة طعام صناعية | أثاث مخصص | Naturra Extal', imageAlt: 'طاولة طعام بانودنج بايب - طاولة طعام صناعية - أثاث مميز من Naturra Extal' },
    zh: { name: '万隆管道餐桌', caption: '万隆管道餐桌 - 家居和餐厅用工业餐桌 | Naturra Extal', shortCaption: '万隆管道餐桌 - 工业餐桌', description: `Naturra Extal的万隆管道餐桌是现代家居、咖啡馆和餐厅的完美工业用餐解决方案。这款优质工业餐桌采用坚固的工业设计和钢结构，提供最大的耐用性和视觉吸引力。\n\n自1999年以来在我们位于勿加泗的车间制作，这款工业餐桌展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的稳定性，同时保持时尚现代的美学，可以补充任何工业或现代室内设计。\n\n非常适合家居、咖啡馆、餐厅和商业用餐空间，这款工业餐桌提供多功能用餐能力。工业设计为用餐区创造了一个焦点，同时为日常使用提供实用功能。`, metaDescription: '万隆管道餐桌 - 工业餐桌 | 定制家具 | Naturra Extal', imageAlt: '万隆管道餐桌 - 工业餐桌 - Naturra Extal的优质家具' },
    ja: { name: 'バンドンパイプダイニングテーブル', caption: 'バンドンパイプダイニングテーブル - ホームとレストラン用工業用ダイニングテーブル | Naturra Extal', shortCaption: 'バンドンパイプダイニングテーブル - 工業用ダイニングテーブル', description: `Naturra Extalのバンドンパイプダイニングテーブルは、モダンな家庭、カフェ、レストランのための完璧な工業用ダイニングソリューションです。このプレミアム工業用ダイニングテーブルは、最大限の耐久性と視覚的な魅力を提供する頑丈な工業デザインとスチール構造が特徴です。\n\n1999年以来、ブカシのワークショップで製作されたこの工業用ダイニングテーブルは、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる工業的または現代的なインテリアデザインを補完する洗練された現代的な美学を維持しながら、優れた安定性を提供します。\n\n家庭、カフェ、レストラン、商業用ダイニングスペースに最適で、この工業用ダイニングテーブルは多目的なダイニング機能を提供します。工業デザインは、ダイニングエリアの焦点を作り出しながら、日常使用のための実用的な機能を提供します。`, metaDescription: 'バンドンパイプダイニングテーブル - 工業用ダイニングテーブル | カスタム家具 | Naturra Extal', imageAlt: 'バンドンパイプダイニングテーブル - 工業用ダイニングテーブル - Naturra Extalのプレミアム家具' },
    es: { name: 'Mesa de Comedor Bandung Pipe', caption: 'Mesa de Comedor Bandung Pipe - Mesa de Comedor Industrial para Hogar y Restaurante | Naturra Extal', shortCaption: 'Mesa de Comedor Bandung Pipe - Mesa de Comedor Industrial', description: `La Mesa de Comedor Bandung Pipe de Naturra Extal es la solución perfecta de comedor industrial para hogares modernos, cafés y restaurantes. Esta mesa de comedor industrial premium presenta un diseño industrial robusto con construcción de acero que proporciona la máxima durabilidad y atractivo visual.\n\nElaborada en nuestro taller de Bekasi desde 1999, esta mesa de comedor industrial muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente estabilidad mientras mantiene una estética moderna elegante que complementa cualquier diseño de interiores industrial o contemporáneo.\n\nPerfecta para hogares, cafés, restaurantes y espacios de comedor comerciales, esta mesa de comedor industrial proporciona capacidades de comedor versátiles. El diseño industrial crea un punto focal para las áreas de comedor mientras ofrece funcionalidad práctica para el uso diario.`, metaDescription: 'Mesa de Comedor Bandung Pipe - Mesa de Comedor Industrial | Mobiliario Personalizado | Naturra Extal', imageAlt: 'Mesa de Comedor Bandung Pipe - Mesa de Comedor Industrial - Mobiliario Premium de Naturra Extal' },
    fr: { name: 'Table à Manger Bandung Pipe', caption: 'Table à Manger Bandung Pipe - Table à Manger Industrielle pour Maison et Restaurant | Naturra Extal', shortCaption: 'Table à Manger Bandung Pipe - Table à Manger Industrielle', description: `La Table à Manger Bandung Pipe de Naturra Extal est la solution parfaite de salle à manger industrielle pour les maisons modernes, les cafés et les restaurants. Cette table à manger industrielle premium présente un design industriel robuste avec une construction en acier qui offre une durabilité maximale et un attrait visuel.\n\nFabriquée dans notre atelier de Bekasi depuis 1999, cette table à manger industrielle présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente stabilité tout en maintenant une esthétique moderne élégante qui complète tout design d'intérieur industriel ou contemporain.\n\nParfaite pour les maisons, les cafés, les restaurants et les espaces de restauration commerciaux, cette table à manger industrielle offre des capacités de restauration polyvalentes. Le design industriel crée un point focal pour les zones de restauration tout en offrant une fonctionnalité pratique pour un usage quotidien.`, metaDescription: 'Table à Manger Bandung Pipe - Table à Manger Industrielle | Mobilier Personnalisé | Naturra Extal', imageAlt: 'Table à Manger Bandung Pipe - Table à Manger Industrielle - Mobilier Premium de Naturra Extal' },
    ko: { name: '반둥 파이프 다이닝 테이블', caption: '반둥 파이프 다이닝 테이블 - 가정 및 레스토랑용 인더스트리얼 다이닝 테이블 | Naturra Extal', shortCaption: '반둥 파이프 다이닝 테이블 - 인더스트리얼 다이닝 테이블', description: `Naturra Extal의 반둥 파이프 다이닝 테이블은 현대 가정, 카페 및 레스토랑을 위한 완벽한 인더스트리얼 다이닝 솔루션입니다. 이 프리미엄 인더스트리얼 다이닝 테이블은 최대 내구성과 시각적 매력을 제공하는 견고한 인더스트리얼 디자인과 강철 구조가 특징입니다.\n\n1999년부터 브카시 워크숍에서 제작된 이 인더스트리얼 다이닝 테이블은 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 세련되고 현대적인 미학을 유지하면서 뛰어난 안정성을 제공합니다.\n\n가정, 카페, 레스토랑 및 상업 식사 공간에 완벽한 이 인더스트리얼 다이닝 테이블은 다목적 식사 기능을 제공합니다. 인더스트리얼 디자인은 식사 공간의 초점을 만들면서 일상 사용을 위한 실용적인 기능을 제공합니다.`, metaDescription: '반둥 파이프 다이닝 테이블 - 인더스트리얼 다이닝 테이블 | 맞춤 가구 | Naturra Extal', imageAlt: '반둥 파이프 다이닝 테이블 - 인더스트리얼 다이닝 테이블 - Naturra Extal의 프리미엄 가구' }
  },
  'dining-set-with-2-chairs': {
    en: {
      name: 'Dining Set with 2 Chairs',
      caption: 'Dining Set with 2 Chairs - Complete Industrial Dining Set | Naturra Extal',
      shortCaption: 'Dining Set with 2 Chairs - Complete Dining Set',
      description: `The Dining Set with 2 Chairs from Naturra Extal is the perfect industrial dining solution for modern homes, cafes, and restaurants. This premium industrial dining set features a robust industrial design with steel construction that provides maximum durability and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial dining set showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent stability while maintaining a sleek, modern aesthetic that complements any industrial or contemporary interior design.

Perfect for homes, cafes, restaurants, and commercial dining spaces, this industrial dining set provides versatile dining capabilities. The industrial design creates a focal point for dining areas while offering practical functionality for daily use.`,
      metaDescription: 'Dining Set with 2 Chairs - Complete Industrial Dining Set | Custom Furniture | Naturra Extal',
      imageAlt: 'Dining Set with 2 Chairs - Complete Industrial Dining Set - Premium Furniture from Naturra Extal'
    },
    id: {
      name: 'Set Meja Makan dengan 2 Kursi',
      caption: 'Dining Set with 2 Chairs - Set Meja Makan Industrial Lengkap | Naturra Extal',
      shortCaption: 'Dining Set with 2 Chairs - Set Meja Makan Lengkap',
      description: `Dining Set with 2 Chairs dari Naturra Extal adalah solusi makan industrial sempurna untuk rumah modern, kafe, dan restoran. Set meja makan industrial premium ini menampilkan desain industrial yang kokoh dengan konstruksi baja yang memberikan ketahanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, set meja makan industrial ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan stabilitas yang sangat baik sambil mempertahankan estetika modern yang ramping yang melengkapi desain interior industrial atau kontemporer apa pun.

Sempurna untuk rumah, kafe, restoran, dan ruang makan komersial, set meja makan industrial ini menyediakan kapasitas makan yang serbaguna. Desain industrial menciptakan titik fokus untuk area makan sambil menawarkan fungsionalitas praktis untuk penggunaan harian.`,
      metaDescription: 'Dining Set with 2 Chairs - Set Meja Makan Industrial Lengkap | Furniture Custom | Naturra Extal',
      imageAlt: 'Dining Set with 2 Chairs - Set Meja Makan Industrial Lengkap - Furniture Premium dari Naturra Extal'
    },
    ar: { name: 'طقم طعام مع 2 كرسي', caption: 'طقم طعام مع 2 كرسي - طقم طعام صناعي كامل | Naturra Extal', shortCaption: 'طقم طعام مع 2 كرسي - طقم طعام كامل', description: `طقم الطعام مع 2 كرسي من Naturra Extal هو الحل الأمثل لتناول الطعام الصناعي للمنازل الحديثة والمقاهي والمطاعم. يتميز طقم الطعام الصناعي المميز هذا بتصميم صناعي قوي مع هيكل فولاذي يوفر أقصى قدر من المتانة والجاذبية البصرية.\n\nصُنع في ورشة بيكاسي لدينا منذ عام 1999، يعرض طقم الطعام الصناعي هذا تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي استقرارًا ممتازًا مع الحفاظ على جمالية حديثة أنيقة تكمل أي تصميم داخلي صناعي أو معاصر.\n\nمثالي للمنازل والمقاهي والمطاعم ومساحات تناول الطعام التجارية، يوفر طقم الطعام الصناعي هذا قدرات طعام متعددة الاستخدامات. يخلق التصميم الصناعي نقطة محورية لمناطق تناول الطعام مع توفير وظائف عملية للاستخدام اليومي.`, metaDescription: 'طقم طعام مع 2 كرسي - طقم طعام صناعي كامل | أثاث مخصص | Naturra Extal', imageAlt: 'طقم طعام مع 2 كرسي - طقم طعام صناعي كامل - أثاث مميز من Naturra Extal' },
    zh: { name: '带2把椅子的餐桌套装', caption: '带2把椅子的餐桌套装 - 完整的工业餐桌套装 | Naturra Extal', shortCaption: '带2把椅子的餐桌套装 - 完整的餐桌套装', description: `Naturra Extal的带2把椅子的餐桌套装是现代家居、咖啡馆和餐厅的完美工业用餐解决方案。这款优质工业餐桌套装采用坚固的工业设计和钢结构，提供最大的耐用性和视觉吸引力。\n\n自1999年以来在我们位于勿加泗的车间制作，这款工业餐桌套装展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的稳定性，同时保持时尚现代的美学，可以补充任何工业或现代室内设计。\n\n非常适合家居、咖啡馆、餐厅和商业用餐空间，这款工业餐桌套装提供多功能用餐能力。工业设计为用餐区创造了一个焦点，同时为日常使用提供实用功能。`, metaDescription: '带2把椅子的餐桌套装 - 完整的工业餐桌套装 | 定制家具 | Naturra Extal', imageAlt: '带2把椅子的餐桌套装 - 完整的工业餐桌套装 - Naturra Extal的优质家具' },
    ja: { name: '2脚の椅子付きダイニングセット', caption: '2脚の椅子付きダイニングセット - 完全な工業用ダイニングセット | Naturra Extal', shortCaption: '2脚の椅子付きダイニングセット - 完全なダイニングセット', description: `Naturra Extalの2脚の椅子付きダイニングセットは、モダンな家庭、カフェ、レストランのための完璧な工業用ダイニングソリューションです。このプレミアム工業用ダイニングセットは、最大限の耐久性と視覚的な魅力を提供する頑丈な工業デザインとスチール構造が特徴です。\n\n1999年以来、ブカシのワークショップで製作されたこの工業用ダイニングセットは、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる工業的または現代的なインテリアデザインを補完する洗練された現代的な美学を維持しながら、優れた安定性を提供します。\n\n家庭、カフェ、レストラン、商業用ダイニングスペースに最適で、この工業用ダイニングセットは多目的なダイニング機能を提供します。工業デザインは、ダイニングエリアの焦点を作り出しながら、日常使用のための実用的な機能を提供します。`, metaDescription: '2脚の椅子付きダイニングセット - 完全な工業用ダイニングセット | カスタム家具 | Naturra Extal', imageAlt: '2脚の椅子付きダイニングセット - 完全な工業用ダイニングセット - Naturra Extalのプレミアム家具' },
    es: { name: 'Juego de Comedor con 2 Sillas', caption: 'Juego de Comedor con 2 Sillas - Juego de Comedor Industrial Completo | Naturra Extal', shortCaption: 'Juego de Comedor con 2 Sillas - Juego de Comedor Completo', description: `El Juego de Comedor con 2 Sillas de Naturra Extal es la solución perfecta de comedor industrial para hogares modernos, cafés y restaurantes. Este juego de comedor industrial premium presenta un diseño industrial robusto con construcción de acero que proporciona la máxima durabilidad y atractivo visual.\n\nElaborado en nuestro taller de Bekasi desde 1999, este juego de comedor industrial muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente estabilidad mientras mantiene una estética moderna elegante que complementa cualquier diseño de interiores industrial o contemporáneo.\n\nPerfecto para hogares, cafés, restaurantes y espacios de comedor comerciales, este juego de comedor industrial proporciona capacidades de comedor versátiles. El diseño industrial crea un punto focal para las áreas de comedor mientras ofrece funcionalidad práctica para el uso diario.`, metaDescription: 'Juego de Comedor con 2 Sillas - Juego de Comedor Industrial Completo | Mobiliario Personalizado | Naturra Extal', imageAlt: 'Juego de Comedor con 2 Sillas - Juego de Comedor Industrial Completo - Mobiliario Premium de Naturra Extal' },
    fr: { name: 'Ensemble de Salle à Manger avec 2 Chaises', caption: 'Ensemble de Salle à Manger avec 2 Chaises - Ensemble de Salle à Manger Industriel Complet | Naturra Extal', shortCaption: 'Ensemble de Salle à Manger avec 2 Chaises - Ensemble de Salle à Manger Complet', description: `L'Ensemble de Salle à Manger avec 2 Chaises de Naturra Extal est la solution parfaite de salle à manger industrielle pour les maisons modernes, les cafés et les restaurants. Cet ensemble de salle à manger industriel premium présente un design industriel robuste avec une construction en acier qui offre une durabilité maximale et un attrait visuel.\n\nFabriqué dans notre atelier de Bekasi depuis 1999, cet ensemble de salle à manger industriel présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente stabilité tout en maintenant une esthétique moderne élégante qui complète tout design d'intérieur industriel ou contemporain.\n\nParfait pour les maisons, les cafés, les restaurants et les espaces de restauration commerciaux, cet ensemble de salle à manger industriel offre des capacités de restauration polyvalentes. Le design industriel crée un point focal pour les zones de restauration tout en offrant une fonctionnalité pratique pour un usage quotidien.`, metaDescription: 'Ensemble de Salle à Manger avec 2 Chaises - Ensemble de Salle à Manger Industriel Complet | Mobilier Personnalisé | Naturra Extal', imageAlt: 'Ensemble de Salle à Manger avec 2 Chaises - Ensemble de Salle à Manger Industriel Complet - Mobilier Premium de Naturra Extal' },
    ko: { name: '2개의 의자가 있는 다이닝 세트', caption: '2개의 의자가 있는 다이닝 세트 - 완전한 인더스트리얼 다이닝 세트 | Naturra Extal', shortCaption: '2개의 의자가 있는 다이닝 세트 - 완전한 다이닝 세트', description: `Naturra Extal의 2개의 의자가 있는 다이닝 세트는 현대 가정, 카페 및 레스토랑을 위한 완벽한 인더스트리얼 다이닝 솔루션입니다. 이 프리미엄 인더스트리얼 다이닝 세트는 최대 내구성과 시각적 매력을 제공하는 견고한 인더스트리얼 디자인과 강철 구조가 특징입니다.\n\n1999년부터 브카시 워크숍에서 제작된 이 인더스트리얼 다이닝 세트는 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 세련되고 현대적인 미학을 유지하면서 뛰어난 안정성을 제공합니다.\n\n가정, 카페, 레스토랑 및 상업 식사 공간에 완벽한 이 인더스트리얼 다이닝 세트는 다목적 식사 기능을 제공합니다. 인더스트리얼 디자인은 식사 공간의 초점을 만들면서 일상 사용을 위한 실용적인 기능을 제공합니다.`, metaDescription: '2개의 의자가 있는 다이닝 세트 - 완전한 인더스트리얼 다이닝 세트 | 맞춤 가구 | Naturra Extal', imageAlt: '2개의 의자가 있는 다이닝 세트 - 완전한 인더스트리얼 다이닝 세트 - Naturra Extal의 프리미엄 가구' }
  },
  'beam-industrial-bar-chair': {
    en: {
      name: 'Beam Industrial Bar Chair',
      caption: 'Beam Industrial Bar Chair - Industrial Bar Stool for Counter and Bar | Naturra Extal',
      shortCaption: 'Beam Industrial Bar Chair - Industrial Bar Stool',
      description: `The Beam Industrial Bar Chair from Naturra Extal is the perfect industrial bar seating solution for modern cafes, restaurants, and commercial spaces. This premium industrial bar chair features a sleek industrial design with steel construction that provides maximum comfort and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial bar chair showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent durability while maintaining a clean, minimalist aesthetic that complements any industrial or modern interior design.

Perfect for bars, cafes, restaurants, and commercial spaces, this industrial bar chair provides versatile seating capabilities. The bar height design offers comfortable seating for counter areas and bar spaces.`,
      metaDescription: 'Beam Industrial Bar Chair - Industrial Bar Stool | Cafe Furniture | Naturra Extal',
      imageAlt: 'Beam Industrial Bar Chair - Industrial Bar Stool - Premium Seating from Naturra Extal'
    },
    id: {
      name: 'Kursi Bar Beam Industrial',
      caption: 'Beam Industrial Bar Chair - Kursi Bar Industrial untuk Counter dan Bar | Naturra Extal',
      shortCaption: 'Beam Industrial Bar Chair - Kursi Bar Industrial',
      description: `Beam Industrial Bar Chair dari Naturra Extal adalah solusi tempat duduk bar industrial sempurna untuk kafe modern, restoran, dan ruang komersial. Kursi bar industrial premium ini menampilkan desain industrial yang ramping dengan konstruksi baja yang memberikan kenyamanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, kursi bar industrial ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan ketahanan yang sangat baik sambil mempertahankan estetika minimalis yang bersih yang melengkapi desain interior industrial atau modern apa pun.

Sempurna untuk bar, kafe, restoran, dan ruang komersial, kursi bar industrial ini menyediakan kapasitas tempat duduk yang serbaguna. Desain tinggi bar menawarkan tempat duduk yang nyaman untuk area counter dan ruang bar.`,
      metaDescription: 'Beam Industrial Bar Chair - Kursi Bar Industrial | Furniture Kafe | Naturra Extal',
      imageAlt: 'Beam Industrial Bar Chair - Kursi Bar Industrial - Tempat Duduk Premium dari Naturra Extal'
    },
    ar: {
      name: 'كرسي بار بيم الصناعي',
      caption: 'كرسي بار بيم الصناعي - كرسي بار صناعي للكاونتر والبار | Naturra Extal',
      shortCaption: 'كرسي بار بيم الصناعي - كرسي بار صناعي',
      description: `كرسي البار الصناعي Beam من Naturra Extal هو الحل المثالي لمقاعد البار الصناعي للمقاهي والمطاعم والمساحات التجارية الحديثة. يتميز كرسي البار الصناعي المميز هذا بتصميم صناعي أنيق مع هيكل فولاذي يوفر أقصى قدر من الراحة والجاذبية البصرية.

صُنع في ورشة عملنا في بيكاسي منذ عام 1999، يعرض كرسي البار الصناعي هذا تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي متانة ممتازة مع الحفاظ على جمالية بسيطة ونظيفة تكمل أي تصميم داخلي صناعي أو حديث.

مثالي للبارات والمقاهي والمطاعم والمساحات التجارية، يوفر كرسي البار الصناعي هذا قدرات جلوس متعددة الاستخدامات. يوفر تصميم ارتفاع البار جلوسًا مريحًا لمناطق الكاونتر ومساحات البار.`,
      metaDescription: 'كرسي بار بيم الصناعي - كرسي بار صناعي | أثاث المقاهي | Naturra Extal',
      imageAlt: 'كرسي بار بيم الصناعي - كرسي بار صناعي - مقاعد مميزة من Naturra Extal'
    },
    zh: {
      name: 'Beam工业吧椅',
      caption: 'Beam工业吧椅 - 工业吧椅用于柜台和酒吧 | Naturra Extal',
      shortCaption: 'Beam工业吧椅 - 工业吧椅',
      description: `Naturra Extal的Beam工业吧椅是现代咖啡馆、餐厅和商业空间的完美工业座椅解决方案。这款优质工业吧椅采用时尚的工业设计和钢结构，提供最大的舒适性和视觉吸引力。

自1999年以来在我们位于勿加泗的车间制作，这款工业吧椅展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的耐用性，同时保持干净、简约的美学，可以补充任何工业或现代室内设计。

非常适合酒吧、咖啡馆、餐厅和商业空间，这款工业吧椅提供多功能座椅能力。酒吧高度设计为柜台区和酒吧空间提供舒适的座椅。`,
      metaDescription: 'Beam工业吧椅 - 工业吧椅 | 咖啡馆家具 | Naturra Extal',
      imageAlt: 'Beam工业吧椅 - 工业吧椅 - Naturra Extal的优质座椅'
    },
    ja: {
      name: 'Beam Industrial Bar Chair',
      caption: 'Beam Industrial Bar Chair - カウンターとバー用の工業用バーチェア | Naturra Extal',
      shortCaption: 'Beam Industrial Bar Chair - 工業用バーチェア',
      description: `Naturra ExtalのBeam Industrial Bar Chairは、モダンなカフェ、レストラン、商業空間に最適な工業用バーシーティングソリューションです。このプレミアム工業用バーチェアは、最大限の快適性と視覚的な魅力を提供するスチール構造を備えた洗練された工業デザインが特徴です。

1999年以来、ブカシのワークショップで製作されたこの工業用バーチェアは、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、優れた耐久性を提供しながら、あらゆる工業的またはモダンなインテリアデザインを補完するクリーンでミニマリストな美学を維持しています。

バー、カフェ、レストラン、商業空間に最適で、この工業用バーチェアは多目的な座席機能を提供します。バーの高さのデザインは、カウンターエリアとバースペースに快適な座席を提供します。`,
      metaDescription: 'Beam Industrial Bar Chair - 工業用バーチェア | カフェ家具 | Naturra Extal',
      imageAlt: 'Beam Industrial Bar Chair - 工業用バーチェア - Naturra Extalのプレミアムシーティング'
    },
    es: {
      name: 'Silla de Bar Industrial Beam',
      caption: 'Silla de Bar Industrial Beam - Taburete de Bar Industrial para Mostrador y Bar | Naturra Extal',
      shortCaption: 'Silla de Bar Industrial Beam - Taburete de Bar Industrial',
      description: `La Silla de Bar Industrial Beam de Naturra Extal es la solución perfecta de asientos de bar industriales para cafeterías modernas, restaurantes y espacios comerciales. Esta silla de bar industrial premium presenta un diseño industrial elegante con construcción de acero que proporciona la máxima comodidad y atractivo visual.

Elaborada en nuestro taller de Bekasi desde 1999, esta silla de bar industrial muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente durabilidad mientras mantiene una estética minimalista y limpia que complementa cualquier diseño de interiores industrial o moderno.

Perfecta para bares, cafeterías, restaurantes y espacios comerciales, esta silla de bar industrial proporciona capacidades de asientos versátiles. El diseño de altura de bar ofrece asientos cómodos para áreas de mostrador y espacios de bar.`,
      metaDescription: 'Silla de Bar Industrial Beam - Taburete de Bar Industrial | Mobiliario de Cafetería | Naturra Extal',
      imageAlt: 'Silla de Bar Industrial Beam - Taburete de Bar Industrial - Asientos Premium de Naturra Extal'
    },
    fr: {
      name: 'Chaise de Bar Industrielle Beam',
      caption: 'Chaise de Bar Industrielle Beam - Tabouret de Bar Industriel pour Comptoir et Bar | Naturra Extal',
      shortCaption: 'Chaise de Bar Industrielle Beam - Tabouret de Bar Industriel',
      description: `La Chaise de Bar Industrielle Beam de Naturra Extal est la solution parfaite de sièges de bar industriels pour les cafés modernes, les restaurants et les espaces commerciaux. Cette chaise de bar industrielle premium présente un design industriel élégant avec une construction en acier qui offre un confort maximal et un attrait visuel.

Fabriquée dans notre atelier de Bekasi depuis 1999, cette chaise de bar industrielle présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente durabilité tout en maintenant une esthétique minimaliste et épurée qui complète tout design d'intérieur industriel ou moderne.

Parfaite pour les bars, les cafés, les restaurants et les espaces commerciaux, cette chaise de bar industrielle offre des capacités d'assise polyvalentes. Le design de hauteur de bar offre des sièges confortables pour les zones de comptoir et les espaces de bar.`,
      metaDescription: 'Chaise de Bar Industrielle Beam - Tabouret de Bar Industriel | Mobilier de Café | Naturra Extal',
      imageAlt: 'Chaise de Bar Industrielle Beam - Tabouret de Bar Industriel - Sièges Premium de Naturra Extal'
    },
    ko: {
      name: 'Beam 인더스트리얼 바 체어',
      caption: 'Beam 인더스트리얼 바 체어 - 카운터와 바를 위한 인더스트리얼 바 의자 | Naturra Extal',
      shortCaption: 'Beam 인더스트리얼 바 체어 - 인더스트리얼 바 의자',
      description: `Naturra Extal의 Beam 인더스트리얼 바 체어는 현대적인 카페, 레스토랑 및 상업 공간을 위한 완벽한 인더스트리얼 바 좌석 솔루션입니다. 이 프리미엄 인더스트리얼 바 체어는 최대의 편안함과 시각적 매력을 제공하는 강철 구조를 갖춘 세련된 인더스트리얼 디자인이 특징입니다.

1999년부터 브카시 워크숍에서 제작된 이 인더스트리얼 바 체어는 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 뛰어난 내구성을 제공하면서 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 깔끔하고 미니멀한 미학을 유지합니다.

바, 카페, 레스토랑 및 상업 공간에 완벽한 이 인더스트리얼 바 체어는 다목적 좌석 기능을 제공합니다. 바 높이 디자인은 카운터 영역과 바 공간을 위한 편안한 좌석을 제공합니다.`,
      metaDescription: 'Beam 인더스트리얼 바 체어 - 인더스트리얼 바 의자 | 카페 가구 | Naturra Extal',
      imageAlt: 'Beam 인더스트리얼 바 체어 - 인더스트리얼 바 의자 - Naturra Extal의 프리미엄 좌석'
    }
  },
  'bar-stall-chair': {
    en: {
      name: 'Bar Stall Chair',
      caption: 'Bar Stall Chair - Industrial Stall Chair for Bar and Counter | Naturra Extal',
      shortCaption: 'Bar Stall Chair - Industrial Stall Chair',
      description: `The Bar Stall Chair from Naturra Extal is the perfect industrial bar seating solution for modern cafes, restaurants, and commercial spaces. This premium industrial bar chair features a sleek industrial design with steel construction that provides maximum comfort and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial bar chair showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent durability while maintaining a clean, minimalist aesthetic that complements any industrial or modern interior design.

Perfect for bars, cafes, restaurants, and commercial spaces, this industrial bar chair provides versatile seating capabilities. The bar height design offers comfortable seating for counter areas and bar spaces.`,
      metaDescription: 'Bar Stall Chair - Industrial Stall Chair | Cafe Furniture | Naturra Extal',
      imageAlt: 'Bar Stall Chair - Industrial Stall Chair - Premium Seating from Naturra Extal'
    },
    id: {
      name: 'Kursi Stall Bar',
      caption: 'Bar Stall Chair - Kursi Stall Industrial untuk Bar dan Counter | Naturra Extal',
      shortCaption: 'Bar Stall Chair - Kursi Stall Industrial',
      description: `Bar Stall Chair dari Naturra Extal adalah solusi tempat duduk bar industrial sempurna untuk kafe modern, restoran, dan ruang komersial. Kursi bar industrial premium ini menampilkan desain industrial yang ramping dengan konstruksi baja yang memberikan kenyamanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, kursi bar industrial ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan ketahanan yang sangat baik sambil mempertahankan estetika minimalis yang bersih yang melengkapi desain interior industrial atau modern apa pun.

Sempurna untuk bar, kafe, restoran, dan ruang komersial, kursi bar industrial ini menyediakan kapasitas tempat duduk yang serbaguna. Desain tinggi bar menawarkan tempat duduk yang nyaman untuk area counter dan ruang bar.`,
      metaDescription: 'Bar Stall Chair - Kursi Stall Industrial | Furniture Kafe | Naturra Extal',
      imageAlt: 'Bar Stall Chair - Kursi Stall Industrial - Tempat Duduk Premium dari Naturra Extal'
    },
    ar: {
      name: 'كرسي بار ستول',
      caption: 'كرسي بار ستول - كرسي ستول صناعي للبار والكاونتر | Naturra Extal',
      shortCaption: 'كرسي بار ستول - كرسي ستول صناعي',
      description: `كرسي البار ستول من Naturra Extal هو الحل المثالي لمقاعد البار الصناعي للمقاهي والمطاعم والمساحات التجارية الحديثة. يتميز كرسي البار الصناعي المميز هذا بتصميم صناعي أنيق مع هيكل فولاذي يوفر أقصى قدر من الراحة والجاذبية البصرية.

صُنع في ورشة عملنا في بيكاسي منذ عام 1999، يعرض كرسي البار الصناعي هذا تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي متانة ممتازة مع الحفاظ على جمالية بسيطة ونظيفة تكمل أي تصميم داخلي صناعي أو حديث.

مثالي للبارات والمقاهي والمطاعم والمساحات التجارية، يوفر كرسي البار الصناعي هذا قدرات جلوس متعددة الاستخدامات. يوفر تصميم ارتفاع البار جلوسًا مريحًا لمناطق الكاونتر ومساحات البار.`,
      metaDescription: 'كرسي بار ستول - كرسي ستول صناعي | أثاث المقاهي | Naturra Extal',
      imageAlt: 'كرسي بار ستول - كرسي ستول صناعي - مقاعد مميزة من Naturra Extal'
    },
    zh: {
      name: '吧台高脚椅',
      caption: '吧台高脚椅 - 工业吧台椅用于酒吧和柜台 | Naturra Extal',
      shortCaption: '吧台高脚椅 - 工业吧台椅',
      description: `Naturra Extal的吧台高脚椅是现代咖啡馆、餐厅和商业空间的完美工业座椅解决方案。这款优质工业吧椅采用时尚的工业设计和钢结构，提供最大的舒适性和视觉吸引力。

自1999年以来在我们位于勿加泗的车间制作，这款工业吧椅展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的耐用性，同时保持干净、简约的美学，可以补充任何工业或现代室内设计。

非常适合酒吧、咖啡馆、餐厅和商业空间，这款工业吧椅提供多功能座椅能力。酒吧高度设计为柜台区和酒吧空间提供舒适的座椅。`,
      metaDescription: '吧台高脚椅 - 工业吧台椅 | 咖啡馆家具 | Naturra Extal',
      imageAlt: '吧台高脚椅 - 工业吧台椅 - Naturra Extal的优质座椅'
    },
    ja: {
      name: 'バースツールチェア',
      caption: 'バースツールチェア - バーとカウンター用の工業用スツールチェア | Naturra Extal',
      shortCaption: 'バースツールチェア - 工業用スツールチェア',
      description: `Naturra Extalのバースツールチェアは、モダンなカフェ、レストラン、商業空間に最適な工業用バーシーティングソリューションです。このプレミアム工業用バーチェアは、最大限の快適性と視覚的な魅力を提供するスチール構造を備えた洗練された工業デザインが特徴です。

1999年以来、ブカシのワークショップで製作されたこの工業用バーチェアは、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、優れた耐久性を提供しながら、あらゆる工業的またはモダンなインテリアデザインを補完するクリーンでミニマリストな美学を維持しています。

バー、カフェ、レストラン、商業空間に最適で、この工業用バーチェアは多目的な座席機能を提供します。バーの高さのデザインは、カウンターエリアとバースペースに快適な座席を提供します。`,
      metaDescription: 'バースツールチェア - 工業用スツールチェア | カフェ家具 | Naturra Extal',
      imageAlt: 'バースツールチェア - 工業用スツールチェア - Naturra Extalのプレミアムシーティング'
    },
    es: {
      name: 'Silla de Bar Stall',
      caption: 'Silla de Bar Stall - Silla Stall Industrial para Bar y Mostrador | Naturra Extal',
      shortCaption: 'Silla de Bar Stall - Silla Stall Industrial',
      description: `La Silla de Bar Stall de Naturra Extal es la solución perfecta de asientos de bar industriales para cafeterías modernas, restaurantes y espacios comerciales. Esta silla de bar industrial premium presenta un diseño industrial elegante con construcción de acero que proporciona la máxima comodidad y atractivo visual.

Elaborada en nuestro taller de Bekasi desde 1999, esta silla de bar industrial muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente durabilidad mientras mantiene una estética minimalista y limpia que complementa cualquier diseño de interiores industrial o moderno.

Perfecta para bares, cafeterías, restaurantes y espacios comerciales, esta silla de bar industrial proporciona capacidades de asientos versátiles. El diseño de altura de bar ofrece asientos cómodos para áreas de mostrador y espacios de bar.`,
      metaDescription: 'Silla de Bar Stall - Silla Stall Industrial | Mobiliario de Cafetería | Naturra Extal',
      imageAlt: 'Silla de Bar Stall - Silla Stall Industrial - Asientos Premium de Naturra Extal'
    },
    fr: {
      name: 'Chaise de Bar Stall',
      caption: 'Chaise de Bar Stall - Chaise Stall Industrielle pour Bar et Comptoir | Naturra Extal',
      shortCaption: 'Chaise de Bar Stall - Chaise Stall Industrielle',
      description: `La Chaise de Bar Stall de Naturra Extal est la solution parfaite de sièges de bar industriels pour les cafés modernes, les restaurants et les espaces commerciaux. Cette chaise de bar industrielle premium présente un design industriel élégant avec une construction en acier qui offre un confort maximal et un attrait visuel.

Fabriquée dans notre atelier de Bekasi depuis 1999, cette chaise de bar industrielle présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente durabilité tout en maintenant une esthétique minimaliste et épurée qui complète tout design d'intérieur industriel ou moderne.

Parfaite pour les bars, les cafés, les restaurants et les espaces commerciaux, cette chaise de bar industrielle offre des capacités d'assise polyvalentes. Le design de hauteur de bar offre des sièges confortables pour les zones de comptoir et les espaces de bar.`,
      metaDescription: 'Chaise de Bar Stall - Chaise Stall Industrielle | Mobilier de Café | Naturra Extal',
      imageAlt: 'Chaise de Bar Stall - Chaise Stall Industrielle - Sièges Premium de Naturra Extal'
    },
    ko: {
      name: '바 스톨 체어',
      caption: '바 스톨 체어 - 바와 카운터를 위한 인더스트리얼 스톨 체어 | Naturra Extal',
      shortCaption: '바 스톨 체어 - 인더스트리얼 스톨 체어',
      description: `Naturra Extal의 바 스톨 체어는 현대적인 카페, 레스토랑 및 상업 공간을 위한 완벽한 인더스트리얼 바 좌석 솔루션입니다. 이 프리미엄 인더스트리얼 바 체어는 최대의 편안함과 시각적 매력을 제공하는 강철 구조를 갖춘 세련된 인더스트리얼 디자인이 특징입니다.

1999년부터 브카시 워크숍에서 제작된 이 인더스트리얼 바 체어는 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 뛰어난 내구성을 제공하면서 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 깔끔하고 미니멀한 미학을 유지합니다.

바, 카페, 레스토랑 및 상업 공간에 완벽한 이 인더스트리얼 바 체어는 다목적 좌석 기능을 제공합니다. 바 높이 디자인은 카운터 영역과 바 공간을 위한 편안한 좌석을 제공합니다.`,
      metaDescription: '바 스톨 체어 - 인더스트리얼 스톨 체어 | 카페 가구 | Naturra Extal',
      imageAlt: '바 스톨 체어 - 인더스트리얼 스톨 체어 - Naturra Extal의 프리미엄 좌석'
    }
  },
  'steelframe-outdoor-bar-set': {
    en: {
      name: 'Steelframe Outdoor Bar Set',
      caption: 'Steelframe Outdoor Bar Set - Outdoor Industrial Bar Furniture Set | Naturra Extal',
      shortCaption: 'Steelframe Outdoor Bar Set - Outdoor Bar Set',
      description: `The Steelframe Outdoor Bar Set from Naturra Extal is the perfect industrial outdoor furniture solution for modern spaces. This premium industrial outdoor bar set features a robust industrial design with weather-resistant construction that provides maximum durability for outdoor use.

Crafted in our Bekasi workshop since 1999, this industrial outdoor bar set showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent stability while maintaining a sleek, modern aesthetic that complements any outdoor or industrial design.

Perfect for outdoor cafes, restaurants, patios, and commercial outdoor spaces, this industrial outdoor bar set provides versatile outdoor dining and entertainment capabilities. The weather-resistant powder coating ensures long-lasting protection against harsh outdoor conditions.`,
      metaDescription: 'Steelframe Outdoor Bar Set - Outdoor Industrial Bar Furniture | Weather Resistant | Naturra Extal',
      imageAlt: 'Steelframe Outdoor Bar Set - Outdoor Industrial Bar Furniture - Weather Resistant from Naturra Extal'
    },
    id: {
      name: 'Set Bar Outdoor Steelframe',
      caption: 'Steelframe Outdoor Bar Set - Set Furniture Bar Outdoor Industrial | Naturra Extal',
      shortCaption: 'Steelframe Outdoor Bar Set - Set Bar Outdoor',
      description: `Steelframe Outdoor Bar Set dari Naturra Extal adalah solusi furniture outdoor industrial sempurna untuk ruang modern. Set bar outdoor industrial premium ini menampilkan desain industrial yang kokoh dengan konstruksi tahan cuaca yang memberikan ketahanan maksimal untuk penggunaan outdoor.

Dibuat di workshop Bekasi kami sejak 1999, set bar outdoor industrial ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan stabilitas yang sangat baik sambil mempertahankan estetika modern yang ramping yang melengkapi desain outdoor atau industrial apa pun.

Sempurna untuk kafe outdoor, restoran, patio, dan ruang outdoor komersial, set bar outdoor industrial ini menyediakan kapasitas makan dan hiburan outdoor yang serbaguna. Powder coating tahan cuaca memastikan perlindungan tahan lama terhadap kondisi outdoor yang keras.`,
      metaDescription: 'Steelframe Outdoor Bar Set - Furniture Bar Outdoor Industrial | Tahan Cuaca | Naturra Extal',
      imageAlt: 'Steelframe Outdoor Bar Set - Furniture Bar Outdoor Industrial - Tahan Cuaca dari Naturra Extal'
    },
    ar: { name: 'طقم بار خارجي ستيل فريم', caption: 'طقم بار خارجي ستيل فريم - طقم أثاث بار خارجي صناعي | Naturra Extal', shortCaption: 'طقم بار خارجي ستيل فريم - طقم بار خارجي', description: `طقم البار الخارجي Steelframe من Naturra Extal هو الحل الأمثل للأثاث الخارجي الصناعي للمساحات الحديثة. يتميز طقم البار الخارجي الصناعي المميز هذا بتصميم صناعي قوي مع هيكل مقاوم للطقس يوفر أقصى قدر من المتانة للاستخدام الخارجي.\n\nصُنع في ورشة بيكاسي لدينا منذ عام 1999، يعرض طقم البار الخارجي الصناعي هذا تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي استقرارًا ممتازًا مع الحفاظ على جمالية حديثة أنيقة تكمل أي تصميم خارجي أو صناعي.\n\nمثالي للمقاهي الخارجية والمطاعم والفناءات والمساحات الخارجية التجارية، يوفر طقم البار الخارجي الصناعي هذا قدرات طعام وترفيه خارجية متعددة الاستخدامات. يضمن الطلاء المسحوق المقاوم للطقس حماية طويلة الأمد ضد ظروف الطقس القاسية.`, metaDescription: 'طقم بار خارجي ستيل فريم - أثاث بار خارجي صناعي | مقاوم للطقس | Naturra Extal', imageAlt: 'طقم بار خارجي ستيل فريم - أثاث بار خارجي صناعي - مقاوم للطقس من Naturra Extal' },
    zh: { name: 'Steelframe户外吧台套装', caption: 'Steelframe户外吧台套装 - 户外工业吧台家具套装 | Naturra Extal', shortCaption: 'Steelframe户外吧台套装 - 户外吧台套装', description: `Naturra Extal的Steelframe户外吧台套装是现代空间的完美工业户外家具解决方案。这款优质工业户外吧台套装采用坚固的工业设计和耐候结构，为户外使用提供最大的耐用性。\n\n自1999年以来在我们位于勿加泗的车间制作，这款工业户外吧台套装展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的稳定性，同时保持时尚现代的美学，可以补充任何户外或工业设计。\n\n非常适合户外咖啡馆、餐厅、露台和商业户外空间，这款工业户外吧台套装提供多功能户外用餐和娱乐能力。耐候粉末涂层确保对恶劣户外条件的持久保护。`, metaDescription: 'Steelframe户外吧台套装 - 户外工业吧台家具 | 耐候 | Naturra Extal', imageAlt: 'Steelframe户外吧台套装 - 户外工业吧台家具 - Naturra Extal的耐候产品' },
    ja: { name: 'Steelframe アウトドアバーセット', caption: 'Steelframe アウトドアバーセット - 屋外工業用バー家具セット | Naturra Extal', shortCaption: 'Steelframe アウトドアバーセット - アウトドアバーセット', description: `Naturra ExtalのSteelframe アウトドアバーセットは、モダンな空間のための完璧な工業用屋外家具ソリューションです。このプレミアム工業用屋外バーセットは、屋外使用のための最大限の耐久性を提供する耐候性構造を備えた頑丈な工業デザインが特徴です。\n\n1999年以来、ブカシのワークショップで製作されたこの工業用屋外バーセットは、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる屋外または工業デザインを補完する洗練された現代的な美学を維持しながら、優れた安定性を提供します。\n\n屋外カフェ、レストラン、パティオ、商業用屋外スペースに最適で、この工業用屋外バーセットは多目的な屋外ダイニングとエンターテイメント機能を提供します。耐候性パウダーコーティングにより、厳しい屋外条件に対する長期的な保護が保証されます。`, metaDescription: 'Steelframe アウトドアバーセット - 屋外工業用バー家具 | 耐候性 | Naturra Extal', imageAlt: 'Steelframe アウトドアバーセット - 屋外工業用バー家具 - Naturra Extalの耐候性製品' },
    es: { name: 'Juego de Bar Exterior Steelframe', caption: 'Juego de Bar Exterior Steelframe - Juego de Mobiliario de Bar Exterior Industrial | Naturra Extal', shortCaption: 'Juego de Bar Exterior Steelframe - Juego de Bar Exterior', description: `El Juego de Bar Exterior Steelframe de Naturra Extal es la solución perfecta de mobiliario exterior industrial para espacios modernos. Este juego de bar exterior industrial premium presenta un diseño industrial robusto con construcción resistente a la intemperie que proporciona la máxima durabilidad para uso exterior.\n\nElaborado en nuestro taller de Bekasi desde 1999, este juego de bar exterior industrial muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente estabilidad mientras mantiene una estética moderna elegante que complementa cualquier diseño exterior o industrial.\n\nPerfecto para cafés al aire libre, restaurantes, patios y espacios comerciales al aire libre, este juego de bar exterior industrial proporciona capacidades de comedor y entretenimiento al aire libre versátiles. El revestimiento en polvo resistente a la intemperie garantiza una protección duradera contra condiciones exteriores adversas.`, metaDescription: 'Juego de Bar Exterior Steelframe - Mobiliario de Bar Exterior Industrial | Resistente a la Intemperie | Naturra Extal', imageAlt: 'Juego de Bar Exterior Steelframe - Mobiliario de Bar Exterior Industrial - Resistente a la Intemperie de Naturra Extal' },
    fr: { name: 'Ensemble de Bar Extérieur Steelframe', caption: 'Ensemble de Bar Extérieur Steelframe - Ensemble de Mobilier de Bar Extérieur Industriel | Naturra Extal', shortCaption: 'Ensemble de Bar Extérieur Steelframe - Ensemble de Bar Extérieur', description: `L'Ensemble de Bar Extérieur Steelframe de Naturra Extal est la solution parfaite de mobilier extérieur industriel pour les espaces modernes. Cet ensemble de bar extérieur industriel premium présente un design industriel robuste avec une construction résistante aux intempéries qui offre une durabilité maximale pour une utilisation en extérieur.\n\nFabriqué dans notre atelier de Bekasi depuis 1999, cet ensemble de bar extérieur industriel présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente stabilité tout en maintenant une esthétique moderne élégante qui complète tout design extérieur ou industriel.\n\nParfait pour les cafés en plein air, les restaurants, les patios et les espaces commerciaux extérieurs, cet ensemble de bar extérieur industriel offre des capacités de restauration et de divertissement en plein air polyvalentes. Le revêtement en poudre résistant aux intempéries garantit une protection durable contre les conditions extérieures difficiles.`, metaDescription: 'Ensemble de Bar Extérieur Steelframe - Mobilier de Bar Extérieur Industriel | Résistant aux Intempéries | Naturra Extal', imageAlt: 'Ensemble de Bar Extérieur Steelframe - Mobilier de Bar Extérieur Industriel - Résistant aux Intempéries de Naturra Extal' },
    ko: { name: 'Steelframe 야외 바 세트', caption: 'Steelframe 야외 바 세트 - 야외 인더스트리얼 바 가구 세트 | Naturra Extal', shortCaption: 'Steelframe 야외 바 세트 - 야외 바 세트', description: `Naturra Extal의 Steelframe 야외 바 세트는 현대 공간을 위한 완벽한 인더스트리얼 야외 가구 솔루션입니다. 이 프리미엄 인더스트리얼 야외 바 세트는 야외 사용을 위한 최대 내구성을 제공하는 내후성 구조를 갖춘 견고한 인더스트리얼 디자인이 특징입니다.\n\n1999년부터 브카시 워크숍에서 제작된 이 인더스트리얼 야외 바 세트는 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 야외 또는 인더스트리얼 디자인을 보완하는 세련되고 현대적인 미학을 유지하면서 뛰어난 안정성을 제공합니다.\n\n야외 카페, 레스토랑, 파티오 및 상업 야외 공간에 완벽한 이 인더스트리얼 야외 바 세트는 다목적 야외 식사 및 엔터테인먼트 기능을 제공합니다. 내후성 분말 코팅은 가혹한 야외 조건에 대한 오래 지속되는 보호를 보장합니다.`, metaDescription: 'Steelframe 야외 바 세트 - 야외 인더스트리얼 바 가구 | 내후성 | Naturra Extal', imageAlt: 'Steelframe 야외 바 세트 - 야외 인더스트리얼 바 가구 - Naturra Extal의 내후성 제품' }
  },
  'industrial-kitchen-cabinet': {
    en: {
      name: 'Industrial Kitchen Cabinet',
      caption: 'Industrial Kitchen Cabinet - Steel Kitchen Storage Cabinet | Naturra Extal',
      shortCaption: 'Industrial Kitchen Cabinet - Steel Kitchen Cabinet',
      description: `The Industrial Kitchen Cabinet from Naturra Extal is the perfect industrial storage solution for modern spaces. This premium industrial storage furniture features a robust industrial design with steel construction that provides maximum storage capacity and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial storage furniture showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent durability while maintaining a sleek, modern aesthetic that complements any industrial or contemporary interior design.

Perfect for offices, cafes, restaurants, and commercial spaces, this industrial storage furniture provides versatile storage capabilities. The industrial design creates functional storage solutions while adding visual interest to any space.`,
      metaDescription: 'Industrial Kitchen Cabinet - Steel Kitchen Storage Cabinet | Custom Furniture | Naturra Extal',
      imageAlt: 'Industrial Kitchen Cabinet - Steel Kitchen Cabinet - Premium Storage from Naturra Extal'
    },
    id: {
      name: 'Kabinet Dapur Industrial',
      caption: 'Industrial Kitchen Cabinet - Kabinet Dapur Baja Penyimpanan | Naturra Extal',
      shortCaption: 'Industrial Kitchen Cabinet - Kabinet Dapur Baja',
      description: `Industrial Kitchen Cabinet dari Naturra Extal adalah solusi penyimpanan industrial sempurna untuk ruang modern. Furniture penyimpanan industrial premium ini menampilkan desain industrial yang kokoh dengan konstruksi baja yang memberikan kapasitas penyimpanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, furniture penyimpanan industrial ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan ketahanan yang sangat baik sambil mempertahankan estetika modern yang ramping yang melengkapi desain interior industrial atau kontemporer apa pun.

Sempurna untuk kantor, kafe, restoran, dan ruang komersial, furniture penyimpanan industrial ini menyediakan kapasitas penyimpanan yang serbaguna. Desain industrial menciptakan solusi penyimpanan fungsional sambil menambah minat visual untuk ruang apa pun.`,
      metaDescription: 'Industrial Kitchen Cabinet - Kabinet Dapur Baja Penyimpanan | Furniture Custom | Naturra Extal',
      imageAlt: 'Industrial Kitchen Cabinet - Kabinet Dapur Baja - Penyimpanan Premium dari Naturra Extal'
    },
    ar: { name: 'خزانة مطبخ صناعية', caption: 'خزانة مطبخ صناعية - خزانة تخزين مطبخ فولاذية | Naturra Extal', shortCaption: 'خزانة مطبخ صناعية - خزانة مطبخ فولاذية', description: `خزانة المطبخ الصناعية من Naturra Extal هي الحل الأمثل للتخزين الصناعي للمساحات الحديثة. يتميز أثاث التخزين الصناعي المميز هذا بتصميم صناعي قوي مع هيكل فولاذي يوفر أقصى قدر من سعة التخزين والجاذبية البصرية.\n\nصُنع في ورشة بيكاسي لدينا منذ عام 1999، يعرض أثاث التخزين الصناعي هذا تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي متانة ممتازة مع الحفاظ على جمالية حديثة أنيقة تكمل أي تصميم داخلي صناعي أو معاصر.\n\nمثالية للمكاتب والمقاهي والمطاعم والمساحات التجارية، يوفر أثاث التخزين الصناعي هذا قدرات تخزين متعددة الاستخدامات. يخلق التصميم الصناعي حلول تخزين وظيفية مع إضافة اهتمام بصري لأي مساحة.`, metaDescription: 'خزانة مطبخ صناعية - خزانة تخزين مطبخ فولاذية | أثاث مخصص | Naturra Extal', imageAlt: 'خزانة مطبخ صناعية - خزانة مطبخ فولاذية - تخزين مميز من Naturra Extal' },
    zh: { name: '工业厨房橱柜', caption: '工业厨房橱柜 - 钢制厨房储物柜 | Naturra Extal', shortCaption: '工业厨房橱柜 - 钢制厨房橱柜', description: `Naturra Extal的工业厨房橱柜是现代空间的完美工业储物解决方案。这款优质工业储物家具采用坚固的工业设计和钢结构，提供最大的存储容量和视觉吸引力。\n\n自1999年以来在我们位于勿加泗的车间制作，这款工业储物家具展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的耐用性，同时保持时尚现代的美学，可以补充任何工业或现代室内设计。\n\n非常适合办公室、咖啡馆、餐厅和商业空间，这款工业储物家具提供多功能存储能力。工业设计创造了功能性存储解决方案，同时为任何空间增添视觉趣味。`, metaDescription: '工业厨房橱柜 - 钢制厨房储物柜 | 定制家具 | Naturra Extal', imageAlt: '工业厨房橱柜 - 钢制厨房橱柜 - Naturra Extal的优质存储' },
    ja: { name: 'インダストリアル キッチンキャビネット', caption: 'インダストリアル キッチンキャビネット - スチールキッチン収納キャビネット | Naturra Extal', shortCaption: 'インダストリアル キッチンキャビネット - スチールキッチンキャビネット', description: `Naturra Extalのインダストリアル キッチンキャビネットは、モダンな空間のための完璧な工業用収納ソリューションです。このプレミアム工業用収納家具は、最大限の収納容量と視覚的な魅力を提供する頑丈な工業デザインとスチール構造が特徴です。\n\n1999年以来、ブカシのワークショップで製作されたこの工業用収納家具は、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる工業的または現代的なインテリアデザインを補完する洗練された現代的な美学を維持しながら、優れた耐久性を提供します。\n\nオフィス、カフェ、レストラン、商業空間に最適で、この工業用収納家具は多目的な収納機能を提供します。工業デザインは、あらゆる空間に視覚的な興味を加えながら、機能的な収納ソリューションを作り出します。`, metaDescription: 'インダストリアル キッチンキャビネット - スチールキッチン収納キャビネット | カスタム家具 | Naturra Extal', imageAlt: 'インダストリアル キッチンキャビネット - スチールキッチンキャビネット - Naturra Extalのプレミアム収納' },
    es: { name: 'Gabinete de Cocina Industrial', caption: 'Gabinete de Cocina Industrial - Gabinete de Almacenamiento de Cocina de Acero | Naturra Extal', shortCaption: 'Gabinete de Cocina Industrial - Gabinete de Cocina de Acero', description: `El Gabinete de Cocina Industrial de Naturra Extal es la solución perfecta de almacenamiento industrial para espacios modernos. Este mueble de almacenamiento industrial premium presenta un diseño industrial robusto con construcción de acero que proporciona la máxima capacidad de almacenamiento y atractivo visual.\n\nElaborado en nuestro taller de Bekasi desde 1999, este mueble de almacenamiento industrial muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente durabilidad mientras mantiene una estética moderna elegante que complementa cualquier diseño de interiores industrial o contemporáneo.\n\nPerfecto para oficinas, cafeterías, restaurantes y espacios comerciales, este mueble de almacenamiento industrial proporciona capacidades de almacenamiento versátiles. El diseño industrial crea soluciones de almacenamiento funcionales mientras agrega interés visual a cualquier espacio.`, metaDescription: 'Gabinete de Cocina Industrial - Gabinete de Almacenamiento de Cocina de Acero | Mobiliario Personalizado | Naturra Extal', imageAlt: 'Gabinete de Cocina Industrial - Gabinete de Cocina de Acero - Almacenamiento Premium de Naturra Extal' },
    fr: { name: 'Armoire de Cuisine Industrielle', caption: 'Armoire de Cuisine Industrielle - Armoire de Rangement de Cuisine en Acier | Naturra Extal', shortCaption: 'Armoire de Cuisine Industrielle - Armoire de Cuisine en Acier', description: `L'Armoire de Cuisine Industrielle de Naturra Extal est la solution parfaite de rangement industriel pour les espaces modernes. Ce meuble de rangement industriel premium présente un design industriel robuste avec une construction en acier qui offre une capacité de rangement maximale et un attrait visuel.\n\nFabriqué dans notre atelier de Bekasi depuis 1999, ce meuble de rangement industriel présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente durabilité tout en maintenant une esthétique moderne élégante qui complète tout design d'intérieur industriel ou contemporain.\n\nParfait pour les bureaux, les cafés, les restaurants et les espaces commerciaux, ce meuble de rangement industriel offre des capacités de rangement polyvalentes. Le design industriel crée des solutions de rangement fonctionnelles tout en ajoutant un intérêt visuel à n'importe quel espace.`, metaDescription: 'Armoire de Cuisine Industrielle - Armoire de Rangement de Cuisine en Acier | Mobilier Personnalisé | Naturra Extal', imageAlt: 'Armoire de Cuisine Industrielle - Armoire de Cuisine en Acier - Rangement Premium de Naturra Extal' },
    ko: { name: '인더스트리얼 주방 캐비닛', caption: '인더스트리얼 주방 캐비닛 - 강철 주방 수납 캐비닛 | Naturra Extal', shortCaption: '인더스트리얼 주방 캐비닛 - 강철 주방 캐비닛', description: `Naturra Extal의 인더스트리얼 주방 캐비닛은 현대 공간을 위한 완벽한 인더스트리얼 수납 솔루션입니다. 이 프리미엄 인더스트리얼 수납 가구는 최대 수납 용량과 시각적 매력을 제공하는 견고한 인더스트리얼 디자인과 강철 구조가 특징입니다.\n\n1999년부터 브카시 워크숍에서 제작된 이 인더스트리얼 수납 가구는 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 세련되고 현대적인 미학을 유지하면서 뛰어난 내구성을 제공합니다.\n\n사무실, 카페, 레스토랑 및 상업 공간에 완벽한 이 인더스트리얼 수납 가구는 다목적 수납 기능을 제공합니다. 인더스트리얼 디자인은 모든 공간에 시각적 흥미를 더하면서 기능적인 수납 솔루션을 만들어냅니다.`, metaDescription: '인더스트리얼 주방 캐비닛 - 강철 주방 수납 캐비닛 | 맞춤 가구 | Naturra Extal', imageAlt: '인더스트리얼 주방 캐비닛 - 강철 주방 캐비닛 - Naturra Extal의 프리미엄 수납' }
  },
  'kabinet-lemari-industrial': {
    en: {
      name: 'Industrial Storage Cabinet',
      caption: 'Industrial Storage Cabinet - Industrial Wardrobe Cabinet | Naturra Extal',
      shortCaption: 'Industrial Storage Cabinet - Wardrobe Cabinet',
      description: `The Kabinet Lemari Industrial from Naturra Extal is the perfect industrial storage solution for modern spaces. This premium industrial storage furniture features a robust industrial design with steel construction that provides maximum storage capacity and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial storage furniture showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent durability while maintaining a sleek, modern aesthetic that complements any industrial or contemporary interior design.

Perfect for offices, cafes, restaurants, and commercial spaces, this industrial storage furniture provides versatile storage capabilities. The industrial design creates functional storage solutions while adding visual interest to any space.`,
      metaDescription: 'Industrial Storage Cabinet - Industrial Wardrobe Cabinet | Custom Furniture | Naturra Extal',
      imageAlt: 'Industrial Storage Cabinet - Industrial Wardrobe Cabinet - Premium Storage from Naturra Extal'
    },
    id: {
      name: 'Kabinet Lemari Industrial',
      caption: 'Kabinet Lemari Industrial - Kabinet Penyimpanan Industrial | Naturra Extal',
      shortCaption: 'Kabinet Lemari Industrial - Kabinet Industrial',
      description: `Kabinet Lemari Industrial dari Naturra Extal adalah solusi penyimpanan industrial sempurna untuk ruang modern. Furniture penyimpanan industrial premium ini menampilkan desain industrial yang kokoh dengan konstruksi baja yang memberikan kapasitas penyimpanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, furniture penyimpanan industrial ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan ketahanan yang sangat baik sambil mempertahankan estetika modern yang ramping yang melengkapi desain interior industrial atau kontemporer apa pun.

Sempurna untuk kantor, kafe, restoran, dan ruang komersial, furniture penyimpanan industrial ini menyediakan kapasitas penyimpanan yang serbaguna. Desain industrial menciptakan solusi penyimpanan fungsional sambil menambah minat visual untuk ruang apa pun.`,
      metaDescription: 'Kabinet Lemari Industrial - Kabinet Penyimpanan Industrial | Furniture Custom | Naturra Extal',
      imageAlt: 'Kabinet Lemari Industrial - Kabinet Industrial - Penyimpanan Premium dari Naturra Extal'
    },
    ar: { name: 'خزانة تخزين صناعية', caption: 'خزانة تخزين صناعية - خزانة ملابس صناعية | Naturra Extal', shortCaption: 'خزانة تخزين صناعية - خزانة ملابس', description: `خزانة Kabinet Lemari Industrial من Naturra Extal هي الحل الأمثل للتخزين الصناعي للمساحات الحديثة. يتميز أثاث التخزين الصناعي المميز هذا بتصميم صناعي قوي مع هيكل فولاذي يوفر أقصى قدر من سعة التخزين والجاذبية البصرية.\n\nصُنع في ورشة بيكاسي لدينا منذ عام 1999، يعرض أثاث التخزين الصناعي هذا تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي متانة ممتازة مع الحفاظ على جمالية حديثة أنيقة تكمل أي تصميم داخلي صناعي أو معاصر.\n\nمثالي للمكاتب والمقاهي والمطاعم والمساحات التجارية، يوفر أثاث التخزين الصناعي هذا قدرات تخزين متعددة الاستخدامات. يخلق التصميم الصناعي حلول تخزين وظيفية مع إضافة اهتمام بصري لأي مساحة.`, metaDescription: 'خزانة تخزين صناعية - خزانة ملابس صناعية | أثاث مخصص | Naturra Extal', imageAlt: 'خزانة تخزين صناعية - خزانة ملابس صناعية - تخزين مميز من Naturra Extal' },
    zh: { name: '工业储物柜', caption: '工业储物柜 - 工业衣柜 | Naturra Extal', shortCaption: '工业储物柜 - 衣柜', description: `Naturra Extal的Kabinet Lemari Industrial是现代空间的完美工业储物解决方案。这款优质工业储物家具采用坚固的工业设计和钢结构，提供最大的存储容量和视觉吸引力。\n\n自1999年以来在我们位于勿加泗的车间制作，这款工业储物家具展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的耐用性，同时保持时尚现代的美学，可以补充任何工业或现代室内设计。\n\n非常适合办公室、咖啡馆、餐厅和商业空间，这款工业储物家具提供多功能存储能力。工业设计创造了功能性存储解决方案，同时为任何空间增添视觉趣味。`, metaDescription: '工业储物柜 - 工业衣柜 | 定制家具 | Naturra Extal', imageAlt: '工业储物柜 - 工业衣柜 - Naturra Extal的优质存储' },
    ja: { name: 'インダストリアル 収納キャビネット', caption: 'インダストリアル 収納キャビネット - インダストリアル ワードローブキャビネット | Naturra Extal', shortCaption: 'インダストリアル 収納キャビネット - ワードローブキャビネット', description: `Naturra ExtalのKabinet Lemari Industrialは、モダンな空間のための完璧な工業用収納ソリューションです。このプレミアム工業用収納家具は、最大限の収納容量と視覚的な魅力を提供する頑丈な工業デザインとスチール構造が特徴です。\n\n1999年以来、ブカシのワークショップで製作されたこの工業用収納家具は、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる工業的または現代的なインテリアデザインを補完する洗練された現代的な美学を維持しながら、優れた耐久性を提供します。\n\nオフィス、カフェ、レストラン、商業空間に最適で、この工業用収納家具は多目的な収納機能を提供します。工業デザインは、あらゆる空間に視覚的な興味を加えながら、機能的な収納ソリューションを作り出します。`, metaDescription: 'インダストリアル 収納キャビネット - インダストリアル ワードローブキャビネット | カスタム家具 | Naturra Extal', imageAlt: 'インダストリアル 収納キャビネット - インダストリアル ワードローブキャビネット - Naturra Extalのプレミアム収納' },
    es: { name: 'Gabinete de Almacenamiento Industrial', caption: 'Gabinete de Almacenamiento Industrial - Gabinete de Armario Industrial | Naturra Extal', shortCaption: 'Gabinete de Almacenamiento Industrial - Gabinete de Armario', description: `El Kabinet Lemari Industrial de Naturra Extal es la solución perfecta de almacenamiento industrial para espacios modernos. Este mueble de almacenamiento industrial premium presenta un diseño industrial robusto con construcción de acero que proporciona la máxima capacidad de almacenamiento y atractivo visual.\n\nElaborado en nuestro taller de Bekasi desde 1999, este mueble de almacenamiento industrial muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente durabilidad mientras mantiene una estética moderna elegante que complementa cualquier diseño de interiores industrial o contemporáneo.\n\nPerfecto para oficinas, cafeterías, restaurantes y espacios comerciales, este mueble de almacenamiento industrial proporciona capacidades de almacenamiento versátiles. El diseño industrial crea soluciones de almacenamiento funcionales mientras agrega interés visual a cualquier espacio.`, metaDescription: 'Gabinete de Almacenamiento Industrial - Gabinete de Armario Industrial | Mobiliario Personalizado | Naturra Extal', imageAlt: 'Gabinete de Almacenamiento Industrial - Gabinete de Armario Industrial - Almacenamiento Premium de Naturra Extal' },
    fr: { name: 'Armoire de Rangement Industrielle', caption: 'Armoire de Rangement Industrielle - Armoire-Penderie Industrielle | Naturra Extal', shortCaption: 'Armoire de Rangement Industrielle - Armoire-Penderie', description: `Le Kabinet Lemari Industrial de Naturra Extal est la solution parfaite de rangement industriel pour les espaces modernes. Ce meuble de rangement industriel premium présente un design industriel robuste avec une construction en acier qui offre une capacité de rangement maximale et un attrait visuel.\n\nFabriqué dans notre atelier de Bekasi depuis 1999, ce meuble de rangement industriel présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente durabilité tout en maintenant une esthétique moderne élégante qui complète tout design d'intérieur industriel ou contemporain.\n\nParfait pour les bureaux, les cafés, les restaurants et les espaces commerciaux, ce meuble de rangement industriel offre des capacités de rangement polyvalentes. Le design industriel crée des solutions de rangement fonctionnelles tout en ajoutant un intérêt visuel à n'importe quel espace.`, metaDescription: 'Armoire de Rangement Industrielle - Armoire-Penderie Industrielle | Mobilier Personnalisé | Naturra Extal', imageAlt: 'Armoire de Rangement Industrielle - Armoire-Penderie Industrielle - Rangement Premium de Naturra Extal' },
    ko: { name: '인더스트리얼 수납 캐비닛', caption: '인더스트리얼 수납 캐비닛 - 인더스트리얼 옷장 캐비닛 | Naturra Extal', shortCaption: '인더스트리얼 수납 캐비닛 - 옷장 캐비닛', description: `Naturra Extal의 Kabinet Lemari Industrial은 현대 공간을 위한 완벽한 인더스트리얼 수납 솔루션입니다. 이 프리미엄 인더스트리얼 수납 가구는 최대 수납 용량과 시각적 매력을 제공하는 견고한 인더스트리얼 디자인과 강철 구조가 특징입니다.\n\n1999년부터 브카시 워크숍에서 제작된 이 인더스트리얼 수납 가구는 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 세련되고 현대적인 미학을 유지하면서 뛰어난 내구성을 제공합니다.\n\n사무실, 카페, 레스토랑 및 상업 공간에 완벽한 이 인더스트리얼 수납 가구는 다목적 수납 기능을 제공합니다. 인더스트리얼 디자인은 모든 공간에 시각적 흥미를 더하면서 기능적인 수납 솔루션을 만들어냅니다.`, metaDescription: '인더스트리얼 수납 캐비닛 - 인더스트리얼 옷장 캐비닛 | 맞춤 가구 | Naturra Extal', imageAlt: '인더스트리얼 수납 캐비닛 - 인더스트리얼 옷장 캐비닛 - Naturra Extal의 프리미엄 수납' }
  },
  'hollowline-display-rack': {
    en: {
      name: 'Hollowline Display Rack',
      caption: 'Hollowline Display Rack - Industrial Display Shelf Rack | Naturra Extal',
      shortCaption: 'Hollowline Display Rack - Display Rack',
      description: `The Hollowline Display Rack from Naturra Extal is the perfect industrial storage solution for modern retail and commercial spaces. This premium hollowline display rack features a sleek industrial design with hollow steel construction that provides maximum durability and visual appeal.

Crafted in our Bekasi workshop since 1999, this hollowline display rack showcases superior welding techniques and attention to detail. The hollow steel frame construction offers excellent strength-to-weight ratio while maintaining a clean, minimalist aesthetic that complements any industrial or modern interior design.

Perfect for retail stores, cafes, restaurants, and offices, this hollowline display rack provides versatile storage and display capabilities. The modular design allows for easy customization and expansion, making it ideal for growing businesses that need flexible storage solutions.`,
      metaDescription: 'Hollowline Display Rack - Industrial Display Shelf Rack | Custom Furniture | Naturra Extal',
      imageAlt: 'Hollowline Display Rack - Industrial Display Rack - Premium Storage from Naturra Extal'
    },
    id: {
      name: 'Rak Display Hollowline',
      caption: 'Hollowline Display Rack - Rak Display Industrial | Naturra Extal',
      shortCaption: 'Hollowline Display Rack - Rak Display',
      description: `Hollowline Display Rack dari Naturra Extal adalah solusi penyimpanan industrial sempurna untuk ruang ritel dan komersial modern. Rak display hollowline premium ini menampilkan desain industrial yang ramping dengan konstruksi baja hollow yang memberikan ketahanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, rak display hollowline ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja hollow menawarkan rasio kekuatan-berat yang sangat baik sambil mempertahankan estetika minimalis yang bersih yang melengkapi desain interior industrial atau modern apa pun.

Sempurna untuk toko ritel, kafe, restoran, dan kantor, rak display hollowline ini menyediakan kapasitas penyimpanan dan tampilan yang serbaguna. Desain modular memungkinkan kustomisasi dan ekspansi yang mudah, menjadikannya ideal untuk bisnis yang berkembang yang membutuhkan solusi penyimpanan yang fleksibel.`,
      metaDescription: 'Hollowline Display Rack - Rak Display Industrial | Furniture Custom | Naturra Extal',
      imageAlt: 'Hollowline Display Rack - Rak Display Industrial - Penyimpanan Premium dari Naturra Extal'
    },
    ar: {
      name: 'رف عرض هولولاين',
      caption: 'رف عرض هولولاين - رف عرض صناعي | Naturra Extal',
      shortCaption: 'رف عرض هولولاين - رف عرض',
      description: `رف العرض هولولاين من Naturra Extal هو الحل الأمثل للتخزين الصناعي لمساحات التجزئة والتجارية الحديثة. يتميز رف العرض المميز هذا بتصميم صناعي أنيق مع هيكل فولاذي مجوف يوفر أقصى قدر من المتانة والجاذبية البصرية.

صُنع في ورشة بيكاسي لدينا منذ عام 1999، يعرض رف العرض هذا تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي المجوف نسبة قوة إلى وزن ممتازة مع الحفاظ على جمالية بسيطة ونظيفة تكمل أي تصميم داخلي صناعي أو حديث.

مثالي لمتاجر التجزئة والمقاهي والمطاعم والمكاتب، يوفر رف العرض هذا قدرات تخزين وعرض متعددة الاستخدامات. يسمح التصميم المعياري بالتخصيص والتوسع السهل، مما يجعله مثاليًا للشركات المتنامية التي تحتاج إلى حلول تخزين مرنة.`,
      metaDescription: 'رف عرض هولولاين - رف عرض صناعي | أثاث مخصص | Naturra Extal',
      imageAlt: 'رف عرض هولولاين - رف عرض صناعي - تخزين مميز من Naturra Extal'
    },
    zh: {
      name: 'Hollowline展示架',
      caption: 'Hollowline展示架 - 工业展示货架 | Naturra Extal',
      shortCaption: 'Hollowline展示架 - 展示架',
      description: `Naturra Extal的Hollowline展示架是现代零售和商业空间的完美工业储物解决方案。这款优质hollowline展示架采用时尚的工业设计和中空钢结构，提供最大的耐用性和视觉吸引力。

自1999年以来在我们位于勿加泗的车间制作，这款hollowline展示架展示了卓越的焊接技术和对细节的关注。中空钢框架结构提供出色的强度重量比，同时保持干净、简约的美学，可以补充任何工业或现代室内设计。

非常适合零售店、咖啡馆、餐厅和办公室，这款hollowline展示架提供多功能存储和展示能力。模块化设计允许轻松定制和扩展，使其成为需要灵活存储解决方案的成长型企业的理想选择。`,
      metaDescription: 'Hollowline展示架 - 工业展示货架 | 定制家具 | Naturra Extal',
      imageAlt: 'Hollowline展示架 - 工业展示架 - Naturra Extal的优质存储'
    },
    ja: {
      name: 'Hollowlineディスプレイラック',
      caption: 'Hollowlineディスプレイラック - 工業用ディスプレイ棚ラック | Naturra Extal',
      shortCaption: 'Hollowlineディスプレイラック - ディスプレイラック',
      description: `Naturra ExtalのHollowlineディスプレイラックは、モダンな小売および商業空間のための完璧な工業用収納ソリューションです。このプレミアムhollowlineディスプレイラックは、最大限の耐久性と視覚的な魅力を提供する中空鋼構造を備えた洗練された工業デザインが特徴です。

1999年以来、ブカシのワークショップで製作されたこのhollowlineディスプレイラックは、優れた溶接技術と細部へのこだわりを示しています。中空鋼フレーム構造は、あらゆる工業的またはモダンなインテリアデザインを補完するクリーンでミニマリストな美学を維持しながら、優れた強度対重量比を提供します。

小売店、カフェ、レストラン、オフィスに最適で、このhollowlineディスプレイラックは多目的な収納とディスプレイ機能を提供します。モジュラーデザインにより、簡単にカスタマイズと拡張が可能で、柔軟な収納ソリューションを必要とする成長中のビジネスに理想的です。`,
      metaDescription: 'Hollowlineディスプレイラック - 工業用ディスプレイ棚ラック | カスタム家具 | Naturra Extal',
      imageAlt: 'Hollowlineディスプレイラック - 工業用ディスプレイラック - Naturra Extalのプレミアム収納'
    },
    es: {
      name: 'Estantería de Exhibición Hollowline',
      caption: 'Estantería de Exhibición Hollowline - Estantería de Exhibición Industrial | Naturra Extal',
      shortCaption: 'Estantería de Exhibición Hollowline - Estantería de Exhibición',
      description: `La Estantería de Exhibición Hollowline de Naturra Extal es la solución perfecta de almacenamiento industrial para espacios minoristas y comerciales modernos. Esta estantería de exhibición hollowline premium presenta un diseño industrial elegante con construcción de acero hueco que proporciona la máxima durabilidad y atractivo visual.

Elaborada en nuestro taller de Bekasi desde 1999, esta estantería de exhibición hollowline muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero hueco ofrece una excelente relación resistencia-peso mientras mantiene una estética minimalista y limpia que complementa cualquier diseño de interiores industrial o moderno.

Perfecta para tiendas minoristas, cafeterías, restaurantes y oficinas, esta estantería de exhibición hollowline proporciona capacidades de almacenamiento y exhibición versátiles. El diseño modular permite una fácil personalización y expansión, lo que la hace ideal para empresas en crecimiento que necesitan soluciones de almacenamiento flexibles.`,
      metaDescription: 'Estantería de Exhibición Hollowline - Estantería de Exhibición Industrial | Mobiliario Personalizado | Naturra Extal',
      imageAlt: 'Estantería de Exhibición Hollowline - Estantería de Exhibición Industrial - Almacenamiento Premium de Naturra Extal'
    },
    fr: {
      name: 'Étagère d\'Exposition Hollowline',
      caption: 'Étagère d\'Exposition Hollowline - Étagère d\'Exposition Industrielle | Naturra Extal',
      shortCaption: 'Étagère d\'Exposition Hollowline - Étagère d\'Exposition',
      description: `L'Étagère d'Exposition Hollowline de Naturra Extal est la solution parfaite de rangement industriel pour les espaces de vente au détail et commerciaux modernes. Cette étagère d'exposition hollowline premium présente un design industriel élégant avec une construction en acier creux qui offre une durabilité maximale et un attrait visuel.

Fabriquée dans notre atelier de Bekasi depuis 1999, cette étagère d'exposition hollowline présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier creux offre un excellent rapport résistance-poids tout en maintenant une esthétique minimaliste et épurée qui complète tout design d'intérieur industriel ou moderne.

Parfaite pour les magasins de détail, les cafés, les restaurants et les bureaux, cette étagère d'exposition hollowline offre des capacités de rangement et d'affichage polyvalentes. La conception modulaire permet une personnalisation et une expansion faciles, ce qui la rend idéale pour les entreprises en croissance qui ont besoin de solutions de rangement flexibles.`,
      metaDescription: 'Étagère d\'Exposition Hollowline - Étagère d\'Exposition Industrielle | Mobilier Personnalisé | Naturra Extal',
      imageAlt: 'Étagère d\'Exposition Hollowline - Étagère d\'Exposition Industrielle - Rangement Premium de Naturra Extal'
    },
    ko: {
      name: 'Hollowline 디스플레이 랙',
      caption: 'Hollowline 디스플레이 랙 - 인더스트리얼 디스플레이 선반 랙 | Naturra Extal',
      shortCaption: 'Hollowline 디스플레이 랙 - 디스플레이 랙',
      description: `Naturra Extal의 Hollowline 디스플레이 랙은 현대 소매 및 상업 공간을 위한 완벽한 인더스트리얼 수납 솔루션입니다. 이 프리미엄 hollowline 디스플레이 랙은 최대 내구성과 시각적 매력을 제공하는 중공 강철 구조를 갖춘 세련된 인더스트리얼 디자인이 특징입니다.

1999년부터 브카시 워크숍에서 제작된 이 hollowline 디스플레이 랙은 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 중공 강철 프레임 구조는 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 깔끔하고 미니멀한 미학을 유지하면서 우수한 강도 대 중량 비율을 제공합니다.

소매점, 카페, 레스토랑 및 사무실에 완벽한 이 hollowline 디스플레이 랙은 다목적 수납 및 디스플레이 기능을 제공합니다. 모듈식 디자인은 손쉬운 맞춤화 및 확장을 가능하게 하여 유연한 수납 솔루션이 필요한 성장하는 기업에 이상적입니다.`,
      metaDescription: 'Hollowline 디스플레이 랙 - 인더스트리얼 디스플레이 선반 랙 | 맞춤형 가구 | Naturra Extal',
      imageAlt: 'Hollowline 디스플레이 랙 - 인더스트리얼 디스플레이 랙 - Naturra Extal의 프리미엄 수납'
    }
  },
  'ladder-frame-display-stand': {
    en: {
      name: 'Ladder Frame Display Stand',
      caption: 'Ladder Frame Display Stand - Industrial Ladder Display Stand | Naturra Extal',
      shortCaption: 'Ladder Frame Display Stand - Ladder Display',
      description: `The Ladder Frame Display Stand from Naturra Extal is the perfect industrial storage solution for modern spaces. This premium industrial storage furniture features a robust industrial design with steel construction that provides maximum storage capacity and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial storage furniture showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent durability while maintaining a sleek, modern aesthetic that complements any industrial or contemporary interior design.

Perfect for offices, cafes, restaurants, and commercial spaces, this industrial storage furniture provides versatile storage capabilities. The industrial design creates functional storage solutions while adding visual interest to any space.`,
      metaDescription: 'Ladder Frame Display Stand - Industrial Ladder Display | Custom Furniture | Naturra Extal',
      imageAlt: 'Ladder Frame Display Stand - Industrial Ladder Display - Premium Storage from Naturra Extal'
    },
    id: {
      name: 'Stand Display Rangka Tangga',
      caption: 'Ladder Frame Display Stand - Stand Display Tangga Industrial | Naturra Extal',
      shortCaption: 'Ladder Frame Display Stand - Display Tangga',
      description: `Ladder Frame Display Stand dari Naturra Extal adalah solusi penyimpanan industrial sempurna untuk ruang modern. Furniture penyimpanan industrial premium ini menampilkan desain industrial yang kokoh dengan konstruksi baja yang memberikan kapasitas penyimpanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, furniture penyimpanan industrial ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan ketahanan yang sangat baik sambil mempertahankan estetika modern yang ramping yang melengkapi desain interior industrial atau kontemporer apa pun.

Sempurna untuk kantor, kafe, restoran, dan ruang komersial, furniture penyimpanan industrial ini menyediakan kapasitas penyimpanan yang serbaguna. Desain industrial menciptakan solusi penyimpanan fungsional sambil menambah minat visual untuk ruang apa pun.`,
      metaDescription: 'Ladder Frame Display Stand - Display Tangga Industrial | Furniture Custom | Naturra Extal',
      imageAlt: 'Ladder Frame Display Stand - Display Tangga Industrial - Penyimpanan Premium dari Naturra Extal'
    },
    ar: { name: 'حامل عرض إطار السلم', caption: 'حامل عرض إطار السلم - حامل عرض سلم صناعي | Naturra Extal', shortCaption: 'حامل عرض إطار السلم - عرض السلم', description: `حامل العرض Ladder Frame من Naturra Extal هو الحل الأمثل للتخزين الصناعي للمساحات الحديثة. يتميز أثاث التخزين الصناعي المميز هذا بتصميم صناعي قوي مع هيكل فولاذي يوفر أقصى قدر من سعة التخزين والجاذبية البصرية.\n\nصُنع في ورشة بيكاسي لدينا منذ عام 1999، يعرض أثاث التخزين الصناعي هذا تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي متانة ممتازة مع الحفاظ على جمالية حديثة أنيقة تكمل أي تصميم داخلي صناعي أو معاصر.\n\nمثالي للمكاتب والمقاهي والمطاعم والمساحات التجارية، يوفر أثاث التخزين الصناعي هذا قدرات تخزين متعددة الاستخدامات. يخلق التصميم الصناعي حلول تخزين وظيفية مع إضافة اهتمام بصري لأي مساحة.`, metaDescription: 'حامل عرض إطار السلم - عرض سلم صناعي | أثاث مخصص | Naturra Extal', imageAlt: 'حامل عرض إطار السلم - عرض سلم صناعي - تخزين مميز من Naturra Extal' },
    zh: { name: '梯架展示架', caption: '梯架展示架 - 工业梯形展示架 | Naturra Extal', shortCaption: '梯架展示架 - 梯形展示', description: `Naturra Extal的梯架展示架是现代空间的完美工业储物解决方案。这款优质工业储物家具采用坚固的工业设计和钢结构，提供最大的存储容量和视觉吸引力。\n\n自1999年以来在我们位于勿加泗的车间制作，这款工业储物家具展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的耐用性，同时保持时尚现代的美学，可以补充任何工业或现代室内设计。\n\n非常适合办公室、咖啡馆、餐厅和商业空间，这款工业储物家具提供多功能存储能力。工业设计创造了功能性存储解决方案，同时为任何空间增添视觉趣味。`, metaDescription: '梯架展示架 - 工业梯形展示 | 定制家具 | Naturra Extal', imageAlt: '梯架展示架 - 工业梯形展示 - Naturra Extal的优质存储' },
    ja: { name: 'ラダーフレーム ディスプレイスタンド', caption: 'ラダーフレーム ディスプレイスタンド - 工業用ラダーディスプレイスタンド | Naturra Extal', shortCaption: 'ラダーフレーム ディスプレイスタンド - ラダーディスプレイ', description: `Naturra Extalのラダーフレーム ディスプレイスタンドは、モダンな空間のための完璧な工業用収納ソリューションです。このプレミアム工業用収納家具は、最大限の収納容量と視覚的な魅力を提供する頑丈な工業デザインとスチール構造が特徴です。\n\n1999年以来、ブカシのワークショップで製作されたこの工業用収納家具は、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる工業的または現代的なインテリアデザインを補完する洗練された現代的な美学を維持しながら、優れた耐久性を提供します。\n\nオフィス、カフェ、レストラン、商業空間に最適で、この工業用収納家具は多目的な収納機能を提供します。工業デザインは、あらゆる空間に視覚的な興味を加えながら、機能的な収納ソリューションを作り出します。`, metaDescription: 'ラダーフレーム ディスプレイスタンド - 工業用ラダーディスプレイ | カスタム家具 | Naturra Extal', imageAlt: 'ラダーフレーム ディスプレイスタンド - 工業用ラダーディスプレイ - Naturra Extalのプレミアム収納' },
    es: { name: 'Soporte de Exhibición de Marco de Escalera', caption: 'Soporte de Exhibición de Marco de Escalera - Soporte de Exhibición de Escalera Industrial | Naturra Extal', shortCaption: 'Soporte de Exhibición de Marco de Escalera - Exhibición de Escalera', description: `El Soporte de Exhibición de Marco de Escalera de Naturra Extal es la solución perfecta de almacenamiento industrial para espacios modernos. Este mueble de almacenamiento industrial premium presenta un diseño industrial robusto con construcción de acero que proporciona la máxima capacidad de almacenamiento y atractivo visual.\n\nElaborado en nuestro taller de Bekasi desde 1999, este mueble de almacenamiento industrial muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente durabilidad mientras mantiene una estética moderna elegante que complementa cualquier diseño de interiores industrial o contemporáneo.\n\nPerfecto para oficinas, cafeterías, restaurantes y espacios comerciales, este mueble de almacenamiento industrial proporciona capacidades de almacenamiento versátiles. El diseño industrial crea soluciones de almacenamiento funcionales mientras agrega interés visual a cualquier espacio.`, metaDescription: 'Soporte de Exhibición de Marco de Escalera - Exhibición de Escalera Industrial | Mobiliario Personalizado | Naturra Extal', imageAlt: 'Soporte de Exhibición de Marco de Escalera - Exhibición de Escalera Industrial - Almacenamiento Premium de Naturra Extal' },
    fr: { name: 'Support d\'Exposition en Échelle', caption: 'Support d\'Exposition en Échelle - Support d\'Exposition en Échelle Industrielle | Naturra Extal', shortCaption: 'Support d\'Exposition en Échelle - Exposition en Échelle', description: `Le Support d'Exposition en Échelle de Naturra Extal est la solution parfaite de rangement industriel pour les espaces modernes. Ce meuble de rangement industriel premium présente un design industriel robuste avec une construction en acier qui offre une capacité de rangement maximale et un attrait visuel.\n\nFabriqué dans notre atelier de Bekasi depuis 1999, ce meuble de rangement industriel présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente durabilité tout en maintenant une esthétique moderne élégante qui complète tout design d'intérieur industriel ou contemporain.\n\nParfait pour les bureaux, les cafés, les restaurants et les espaces commerciaux, ce meuble de rangement industriel offre des capacités de rangement polyvalentes. Le design industriel crée des solutions de rangement fonctionnelles tout en ajoutant un intérêt visuel à n'importe quel espace.`, metaDescription: 'Support d\'Exposition en Échelle - Exposition en Échelle Industrielle | Mobilier Personnalisé | Naturra Extal', imageAlt: 'Support d\'Exposition en Échelle - Exposition en Échelle Industrielle - Rangement Premium de Naturra Extal' },
    ko: { name: '사다리 프레임 디스플레이 스탠드', caption: '사다리 프레임 디스플레이 스탠드 - 인더스트리얼 사다리 디스플레이 스탠드 | Naturra Extal', shortCaption: '사다리 프레임 디스플레이 스탠드 - 사다리 디스플레이', description: `Naturra Extal의 사다리 프레임 디스플레이 스탠드는 현대 공간을 위한 완벽한 인더스트리얼 수납 솔루션입니다. 이 프리미엄 인더스트리얼 수납 가구는 최대 수납 용량과 시각적 매력을 제공하는 견고한 인더스트리얼 디자인과 강철 구조가 특징입니다.\n\n1999년부터 브카시 워크숍에서 제작된 이 인더스트리얼 수납 가구는 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 세련되고 현대적인 미학을 유지하면서 뛰어난 내구성을 제공합니다.\n\n사무실, 카페, 레스토랑 및 상업 공간에 완벽한 이 인더스트리얼 수납 가구는 다목적 수납 기능을 제공합니다. 인더스트리얼 디자인은 모든 공간에 시각적 흥미를 더하면서 기능적인 수납 솔루션을 만들어냅니다.`, metaDescription: '사다리 프레임 디스플레이 스탠드 - 인더스트리얼 사다리 디스플레이 | 맞춤 가구 | Naturra Extal', imageAlt: '사다리 프레임 디스플레이 스탠드 - 인더스트리얼 사다리 디스플레이 - Naturra Extal의 프리미엄 수납' }
  },
  'industrial-coat-rack': {
    en: {
      name: 'Industrial Coat Rack',
      caption: 'Industrial Coat Rack - Steel Coat Rack Hanger | Naturra Extal',
      shortCaption: 'Industrial Coat Rack - Coat Rack',
      description: `The Industrial Coat Rack from Naturra Extal is the perfect industrial storage solution for modern spaces. This premium industrial storage furniture features a robust industrial design with steel construction that provides maximum storage capacity and visual appeal.

Crafted in our Bekasi workshop since 1999, this industrial storage furniture showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent durability while maintaining a sleek, modern aesthetic that complements any industrial or contemporary interior design.

Perfect for offices, cafes, restaurants, and commercial spaces, this industrial storage furniture provides versatile storage capabilities. The industrial design creates functional storage solutions while adding visual interest to any space.`,
      metaDescription: 'Industrial Coat Rack - Steel Coat Rack | Custom Furniture | Naturra Extal',
      imageAlt: 'Industrial Coat Rack - Steel Coat Rack - Premium Storage from Naturra Extal'
    },
    id: {
      name: 'Gantungan Baju Industrial',
      caption: 'Industrial Coat Rack - Gantungan Baju Industrial Baja | Naturra Extal',
      shortCaption: 'Industrial Coat Rack - Gantungan Baju',
      description: `Industrial Coat Rack dari Naturra Extal adalah solusi penyimpanan industrial sempurna untuk ruang modern. Furniture penyimpanan industrial premium ini menampilkan desain industrial yang kokoh dengan konstruksi baja yang memberikan kapasitas penyimpanan maksimal dan daya tarik visual.

Dibuat di workshop Bekasi kami sejak 1999, furniture penyimpanan industrial ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan ketahanan yang sangat baik sambil mempertahankan estetika modern yang ramping yang melengkapi desain interior industrial atau kontemporer apa pun.

Sempurna untuk kantor, kafe, restoran, dan ruang komersial, furniture penyimpanan industrial ini menyediakan kapasitas penyimpanan yang serbaguna. Desain industrial menciptakan solusi penyimpanan fungsional sambil menambah minat visual untuk ruang apa pun.`,
      metaDescription: 'Industrial Coat Rack - Gantungan Baju Industrial Baja | Furniture Custom | Naturra Extal',
      imageAlt: 'Industrial Coat Rack - Gantungan Baju Industrial - Penyimpanan Premium dari Naturra Extal'
    },
    ar: { name: 'شماعة معاطف صناعية', caption: 'شماعة معاطف صناعية - شماعة معاطف فولاذية | Naturra Extal', shortCaption: 'شماعة معاطف صناعية - شماعة معاطف', description: `شماعة المعاطف الصناعية من Naturra Extal هي الحل الأمثل للتخزين الصناعي للمساحات الحديثة. يتميز أثاث التخزين الصناعي المميز هذا بتصميم صناعي قوي مع هيكل فولاذي يوفر أقصى قدر من سعة التخزين والجاذبية البصرية.\n\nصُنع في ورشة بيكاسي لدينا منذ عام 1999، يعرض أثاث التخزين الصناعي هذا تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي متانة ممتازة مع الحفاظ على جمالية حديثة أنيقة تكمل أي تصميم داخلي صناعي أو معاصر.\n\nمثالية للمكاتب والمقاهي والمطاعم والمساحات التجارية، يوفر أثاث التخزين الصناعي هذا قدرات تخزين متعددة الاستخدامات. يخلق التصميم الصناعي حلول تخزين وظيفية مع إضافة اهتمام بصري لأي مساحة.`, metaDescription: 'شماعة معاطف صناعية - شماعة معاطف فولاذية | أثاث مخصص | Naturra Extal', imageAlt: 'شماعة معاطف صناعية - شماعة معاطف فولاذية - تخزين مميز من Naturra Extal' },
    zh: { name: '工业衣架', caption: '工业衣架 - 钢制衣架挂钩 | Naturra Extal', shortCaption: '工业衣架 - 衣架', description: `Naturra Extal的工业衣架是现代空间的完美工业储物解决方案。这款优质工业储物家具采用坚固的工业设计和钢结构，提供最大的存储容量和视觉吸引力。\n\n自1999年以来在我们位于勿加泗的车间制作，这款工业储物家具展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的耐用性，同时保持时尚现代的美学，可以补充任何工业或现代室内设计。\n\n非常适合办公室、咖啡馆、餐厅和商业空间，这款工业储物家具提供多功能存储能力。工业设计创造了功能性存储解决方案，同时为任何空间增添视觉趣味。`, metaDescription: '工业衣架 - 钢制衣架 | 定制家具 | Naturra Extal', imageAlt: '工业衣架 - 钢制衣架 - Naturra Extal的优质存储' },
    ja: { name: 'インダストリアル コートラック', caption: 'インダストリアル コートラック - スチールコートラックハンガー | Naturra Extal', shortCaption: 'インダストリアル コートラック - コートラック', description: `Naturra Extalのインダストリアル コートラックは、モダンな空間のための完璧な工業用収納ソリューションです。このプレミアム工業用収納家具は、最大限の収納容量と視覚的な魅力を提供する頑丈な工業デザインとスチール構造が特徴です。\n\n1999年以来、ブカシのワークショップで製作されたこの工業用収納家具は、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる工業的または現代的なインテリアデザインを補完する洗練された現代的な美学を維持しながら、優れた耐久性を提供します。\n\nオフィス、カフェ、レストラン、商業空間に最適で、この工業用収納家具は多目的な収納機能を提供します。工業デザインは、あらゆる空間に視覚的な興味を加えながら、機能的な収納ソリューションを作り出します。`, metaDescription: 'インダストリアル コートラック - スチールコートラック | カスタム家具 | Naturra Extal', imageAlt: 'インダストリアル コートラック - スチールコートラック - Naturra Extalのプレミアム収納' },
    es: { name: 'Perchero Industrial', caption: 'Perchero Industrial - Colgador de Abrigos de Acero | Naturra Extal', shortCaption: 'Perchero Industrial - Perchero', description: `El Perchero Industrial de Naturra Extal es la solución perfecta de almacenamiento industrial para espacios modernos. Este mueble de almacenamiento industrial premium presenta un diseño industrial robusto con construcción de acero que proporciona la máxima capacidad de almacenamiento y atractivo visual.\n\nElaborado en nuestro taller de Bekasi desde 1999, este mueble de almacenamiento industrial muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente durabilidad mientras mantiene una estética moderna elegante que complementa cualquier diseño de interiores industrial o contemporáneo.\n\nPerfecto para oficinas, cafeterías, restaurantes y espacios comerciales, este mueble de almacenamiento industrial proporciona capacidades de almacenamiento versátiles. El diseño industrial crea soluciones de almacenamiento funcionales mientras agrega interés visual a cualquier espacio.`, metaDescription: 'Perchero Industrial - Perchero de Acero | Mobiliario Personalizado | Naturra Extal', imageAlt: 'Perchero Industrial - Perchero de Acero - Almacenamiento Premium de Naturra Extal' },
    fr: { name: 'Porte-Manteau Industriel', caption: 'Porte-Manteau Industriel - Cintre en Acier | Naturra Extal', shortCaption: 'Porte-Manteau Industriel - Porte-Manteau', description: `Le Porte-Manteau Industriel de Naturra Extal est la solution parfaite de rangement industriel pour les espaces modernes. Ce meuble de rangement industriel premium présente un design industriel robuste avec une construction en acier qui offre une capacité de rangement maximale et un attrait visuel.\n\nFabriqué dans notre atelier de Bekasi depuis 1999, ce meuble de rangement industriel présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente durabilité tout en maintenant une esthétique moderne élégante qui complète tout design d'intérieur industriel ou contemporain.\n\nParfait pour les bureaux, les cafés, les restaurants et les espaces commerciaux, ce meuble de rangement industriel offre des capacités de rangement polyvalentes. Le design industriel crée des solutions de rangement fonctionnelles tout en ajoutant un intérêt visuel à n'importe quel espace.`, metaDescription: 'Porte-Manteau Industriel - Porte-Manteau en Acier | Mobilier Personnalisé | Naturra Extal', imageAlt: 'Porte-Manteau Industriel - Porte-Manteau en Acier - Rangement Premium de Naturra Extal' },
    ko: { name: '인더스트리얼 코트 랙', caption: '인더스트리얼 코트 랙 - 강철 코트 랙 행거 | Naturra Extal', shortCaption: '인더스트리얼 코트 랙 - 코트 랙', description: `Naturra Extal의 인더스트리얼 코트 랙은 현대 공간을 위한 완벽한 인더스트리얼 수납 솔루션입니다. 이 프리미엄 인더스트리얼 수납 가구는 최대 수납 용량과 시각적 매력을 제공하는 견고한 인더스트리얼 디자인과 강철 구조가 특징입니다.\n\n1999년부터 브카시 워크숍에서 제작된 이 인더스트리얼 수납 가구는 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 인더스트리얼 또는 현대적인 인테리어 디자인을 보완하는 세련되고 현대적인 미학을 유지하면서 뛰어난 내구성을 제공합니다.\n\n사무실, 카페, 레스토랑 및 상업 공간에 완벽한 이 인더스트리얼 수납 가구는 다목적 수납 기능을 제공합니다. 인더스트리얼 디자인은 모든 공간에 시각적 흥미를 더하면서 기능적인 수납 솔루션을 만들어냅니다.`, metaDescription: '인더스트리얼 코트 랙 - 강철 코트 랙 | 맞춤 가구 | Naturra Extal', imageAlt: '인더스트리얼 코트 랙 - 강철 코트 랙 - Naturra Extal의 프리미엄 수납' }
  },
  'meja-kerja-industrial': {
    en: {
      name: 'Industrial Work Table',
      caption: 'Industrial Work Table - Industrial Work Desk | Naturra Extal',
      shortCaption: 'Industrial Work Table - Work Desk',
      description: `The Meja Kerja Industrial from Naturra Extal is the perfect industrial work table solution for modern offices and commercial spaces. This premium industrial work table features a robust industrial design with steel construction that provides maximum durability and functionality.

Crafted in our Bekasi workshop since 1999, this industrial work table showcases superior welding techniques and attention to detail. The industrial steel frame construction offers excellent stability while maintaining a sleek, modern aesthetic that complements any industrial or contemporary office design.

Perfect for offices, workshops, studios, and commercial spaces, this industrial work table provides versatile work capabilities. The industrial design creates a professional work environment while offering practical functionality for daily tasks.`,
      metaDescription: 'Industrial Work Table - Industrial Work Desk | Office Furniture | Naturra Extal',
      imageAlt: 'Industrial Work Table - Industrial Work Desk - Premium Office Furniture from Naturra Extal'
    },
    id: {
      name: 'Meja Kerja Industrial',
      caption: 'Meja Kerja Industrial - Meja Kerja Industrial | Naturra Extal',
      shortCaption: 'Meja Kerja Industrial - Meja Kerja',
      description: `Meja Kerja Industrial dari Naturra Extal adalah solusi meja kerja industrial sempurna untuk kantor modern dan ruang komersial. Meja kerja industrial premium ini menampilkan desain industrial yang kokoh dengan konstruksi baja yang memberikan ketahanan maksimal dan fungsionalitas.

Dibuat di workshop Bekasi kami sejak 1999, meja kerja industrial ini menampilkan teknik pengelasan superior dan perhatian terhadap detail. Konstruksi rangka baja industrial menawarkan stabilitas yang sangat baik sambil mempertahankan estetika modern yang ramping yang melengkapi desain kantor industrial atau kontemporer apa pun.

Sempurna untuk kantor, workshop, studio, dan ruang komersial, meja kerja industrial ini menyediakan kapasitas kerja yang serbaguna. Desain industrial menciptakan lingkungan kerja profesional sambil menawarkan fungsionalitas praktis untuk tugas harian.`,
      metaDescription: 'Meja Kerja Industrial - Meja Kerja Industrial | Furniture Kantor | Naturra Extal',
      imageAlt: 'Meja Kerja Industrial - Meja Kerja Industrial - Furniture Kantor Premium dari Naturra Extal'
    },
    ar: { name: 'طاولة عمل صناعية', caption: 'طاولة عمل صناعية - مكتب عمل صناعي | Naturra Extal', shortCaption: 'طاولة عمل صناعية - مكتب عمل', description: `طاولة العمل الصناعية Meja Kerja Industrial من Naturra Extal هي الحل الأمثل لطاولة العمل الصناعية للمكاتب الحديثة والمساحات التجارية. تتميز طاولة العمل الصناعية المميزة هذه بتصميم صناعي قوي مع هيكل فولاذي يوفر أقصى قدر من المتانة والوظائف.\n\nصُنعت في ورشة بيكاسي لدينا منذ عام 1999، تعرض طاولة العمل الصناعية هذه تقنيات لحام متفوقة والاهتمام بالتفاصيل. يوفر هيكل الإطار الفولاذي الصناعي استقرارًا ممتازًا مع الحفاظ على جمالية حديثة أنيقة تكمل أي تصميم مكتب صناعي أو معاصر.\n\nمثالية للمكاتب والورش والاستوديوهات والمساحات التجارية، توفر طاولة العمل الصناعية هذه قدرات عمل متعددة الاستخدامات. يخلق التصميم الصناعي بيئة عمل احترافية مع توفير وظائف عملية للمهام اليومية.`, metaDescription: 'طاولة عمل صناعية - مكتب عمل صناعي | أثاث المكاتب | Naturra Extal', imageAlt: 'طاولة عمل صناعية - مكتب عمل صناعي - أثاث مكتب مميز من Naturra Extal' },
    zh: { name: '工业工作台', caption: '工业工作台 - 工业工作桌 | Naturra Extal', shortCaption: '工业工作台 - 工作桌', description: `Naturra Extal的Meja Kerja Industrial工业工作台是现代办公室和商业空间的完美工业工作台解决方案。这款优质工业工作台采用坚固的工业设计和钢结构，提供最大的耐用性和功能性。\n\n自1999年以来在我们位于勿加泗的车间制作，这款工业工作台展示了卓越的焊接技术和对细节的关注。工业钢框架结构提供出色的稳定性，同时保持时尚现代的美学，可以补充任何工业或现代办公室设计。\n\n非常适合办公室、车间、工作室和商业空间，这款工业工作台提供多功能工作能力。工业设计创造了专业的工作环境，同时为日常任务提供实用功能。`, metaDescription: '工业工作台 - 工业工作桌 | 办公家具 | Naturra Extal', imageAlt: '工业工作台 - 工业工作桌 - Naturra Extal的优质办公家具' },
    ja: { name: 'インダストリアル ワークテーブル', caption: 'インダストリアル ワークテーブル - 工業用ワークデスク | Naturra Extal', shortCaption: 'インダストリアル ワークテーブル - ワークデスク', description: `Naturra ExtalのMeja Kerja Industrialは、モダンなオフィスと商業空間のための完璧な工業用ワークテーブルソリューションです。このプレミアム工業用ワークテーブルは、最大限の耐久性と機能性を提供する頑丈な工業デザインとスチール構造が特徴です。\n\n1999年以来、ブカシのワークショップで製作されたこの工業用ワークテーブルは、優れた溶接技術と細部へのこだわりを示しています。工業用スチールフレーム構造は、あらゆる工業的または現代的なオフィスデザインを補完する洗練された現代的な美学を維持しながら、優れた安定性を提供します。\n\nオフィス、ワークショップ、スタジオ、商業空間に最適で、この工業用ワークテーブルは多目的な作業機能を提供します。工業デザインは、日常業務のための実用的な機能を提供しながら、プロフェッショナルな作業環境を作り出します。`, metaDescription: 'インダストリアル ワークテーブル - 工業用ワークデスク | オフィス家具 | Naturra Extal', imageAlt: 'インダストリアル ワークテーブル - 工業用ワークデスク - Naturra Extalのプレミアムオフィス家具' },
    es: { name: 'Mesa de Trabajo Industrial', caption: 'Mesa de Trabajo Industrial - Escritorio de Trabajo Industrial | Naturra Extal', shortCaption: 'Mesa de Trabajo Industrial - Escritorio de Trabajo', description: `La Mesa de Trabajo Industrial Meja Kerja Industrial de Naturra Extal es la solución perfecta de mesa de trabajo industrial para oficinas modernas y espacios comerciales. Esta mesa de trabajo industrial premium presenta un diseño industrial robusto con construcción de acero que proporciona la máxima durabilidad y funcionalidad.\n\nElaborada en nuestro taller de Bekasi desde 1999, esta mesa de trabajo industrial muestra técnicas de soldadura superiores y atención al detalle. La construcción del marco de acero industrial ofrece una excelente estabilidad mientras mantiene una estética moderna elegante que complementa cualquier diseño de oficina industrial o contemporáneo.\n\nPerfecta para oficinas, talleres, estudios y espacios comerciales, esta mesa de trabajo industrial proporciona capacidades de trabajo versátiles. El diseño industrial crea un entorno de trabajo profesional mientras ofrece funcionalidad práctica para tareas diarias.`, metaDescription: 'Mesa de Trabajo Industrial - Escritorio de Trabajo Industrial | Mobiliario de Oficina | Naturra Extal', imageAlt: 'Mesa de Trabajo Industrial - Escritorio de Trabajo Industrial - Mobiliario de Oficina Premium de Naturra Extal' },
    fr: { name: 'Table de Travail Industrielle', caption: 'Table de Travail Industrielle - Bureau de Travail Industriel | Naturra Extal', shortCaption: 'Table de Travail Industrielle - Bureau de Travail', description: `La Table de Travail Industrielle Meja Kerja Industrial de Naturra Extal est la solution parfaite de table de travail industrielle pour les bureaux modernes et les espaces commerciaux. Cette table de travail industrielle premium présente un design industriel robuste avec une construction en acier qui offre une durabilité et une fonctionnalité maximales.\n\nFabriquée dans notre atelier de Bekasi depuis 1999, cette table de travail industrielle présente des techniques de soudage supérieures et une attention aux détails. La construction du cadre en acier industriel offre une excellente stabilité tout en maintenant une esthétique moderne élégante qui complète tout design de bureau industriel ou contemporain.\n\nParfaite pour les bureaux, les ateliers, les studios et les espaces commerciaux, cette table de travail industrielle offre des capacités de travail polyvalentes. Le design industriel crée un environnement de travail professionnel tout en offrant une fonctionnalité pratique pour les tâches quotidiennes.`, metaDescription: 'Table de Travail Industrielle - Bureau de Travail Industriel | Mobilier de Bureau | Naturra Extal', imageAlt: 'Table de Travail Industrielle - Bureau de Travail Industriel - Mobilier de Bureau Premium de Naturra Extal' },
    ko: { name: '인더스트리얼 작업 테이블', caption: '인더스트리얼 작업 테이블 - 인더스트리얼 작업 데스크 | Naturra Extal', shortCaption: '인더스트리얼 작업 테이블 - 작업 데스크', description: `Naturra Extal의 Meja Kerja Industrial은 현대 사무실과 상업 공간을 위한 완벽한 인더스트리얼 작업 테이블 솔루션입니다. 이 프리미엄 인더스트리얼 작업 테이블은 최대 내구성과 기능성을 제공하는 견고한 인더스트리얼 디자인과 강철 구조가 특징입니다.\n\n1999년부터 브카시 워크숍에서 제작된 이 인더스트리얼 작업 테이블은 뛰어난 용접 기술과 세부 사항에 대한 관심을 보여줍니다. 인더스트리얼 강철 프레임 구조는 모든 인더스트리얼 또는 현대적인 사무실 디자인을 보완하는 세련되고 현대적인 미학을 유지하면서 뛰어난 안정성을 제공합니다.\n\n사무실, 작업장, 스튜디오 및 상업 공간에 완벽한 이 인더스트리얼 작업 테이블은 다목적 작업 기능을 제공합니다. 인더스트리얼 디자인은 일상 업무를 위한 실용적인 기능을 제공하면서 전문적인 작업 환경을 만들어냅니다.`, metaDescription: '인더스트리얼 작업 테이블 - 인더스트리얼 작업 데스크 | 사무실 가구 | Naturra Extal', imageAlt: '인더스트리얼 작업 테이블 - 인더스트리얼 작업 데스크 - Naturra Extal의 프리미엄 사무실 가구' }
  }
}

/**
 * Get multi-language description for a product by slug
 */
export const getProductDescription = (slug: string): MultiLanguageDescription | null => {
  const desc = PRODUCT_DESCRIPTIONS[slug]
  if (!desc) return null
  return desc
}

/**
 * Get caption for product image (SEO-friendly multi-language)
 */
export const getProductImageCaption = (slug: string, isIndonesian: boolean, language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'): string => {
  const desc = getProductDescription(slug)
  const lang = language || (isIndonesian ? 'id' : 'en')

  if (!desc) {
    // Fallback to generic caption
    const fallbacks: Record<string, string> = {
      en: 'Premium Agricultural Commodities from Naturra Extal Workshop Bekasi',
      id: 'agricultural commodities Premium dari Naturra Extal Workshop Bekasi',
      ar: 'أثاث صناعي مميز من ورشة Naturra Extal بيكاسي',
      zh: 'Naturra Extal勿加泗车间的优质工业家具',
      ja: 'Naturra Extalブカシワークショップのプレミアム工業用家具',
      es: 'Mobiliario Industrial Premium del Taller Naturra Extal Bekasi',
      fr: 'Mobilier Industriel Premium de l\'Atelier Naturra Extal Bekasi',
      ko: 'Naturra Extal 브카시 워크숍의 프리미엄 인더스트리얼 가구'
    }
    return fallbacks[lang] || fallbacks.en
  }
  return desc[lang]?.caption || desc.en.caption
}

/**
 * Get short caption for product image (for alt text)
 */
export const getProductImageAlt = (slug: string, isIndonesian: boolean, language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'): string => {
  const desc = getProductDescription(slug)
  const lang = language || (isIndonesian ? 'id' : 'en')

  if (!desc) {
    // Fallback to generic alt
    const fallbacks: Record<string, string> = {
      en: 'Premium Agricultural Commodities from Naturra Extal',
      id: 'agricultural commodities Premium dari Naturra Extal',
      ar: 'أثاث صناعي مميز من Naturra Extal',
      zh: 'Naturra Extal的优质工业家具',
      ja: 'Naturra Extalのプレミアム工業用家具',
      es: 'Mobiliario Industrial Premium de Naturra Extal',
      fr: 'Mobilier Industriel Premium de Naturra Extal',
      ko: 'Naturra Extal의 프리미엄 인더스트리얼 가구'
    }
    return fallbacks[lang] || fallbacks.en
  }
  return desc[lang]?.imageAlt || desc.en.imageAlt
}

/**
 * Get translated product name
 */
export const getProductName = (slug: string, isIndonesian: boolean, language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'): string => {
  const desc = getProductDescription(slug)
  const lang = language || (isIndonesian ? 'id' : 'en')

  if (!desc) {
    // Fallback - get name from products.ts
    return ''
  }
  return desc[lang]?.name || desc.en.name
}
