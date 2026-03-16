import { LanguageCode } from './languageManager';

type HomeTranslations = Record<string, string>;
type PartnershipTranslations = Record<string, string | string[]>;
type CustomOrderTranslations = Record<string, any>;

export const NATURRA_HOME_TRANSLATIONS: Record<LanguageCode, HomeTranslations> = {
    en: {
        heroEyebrow: "CV Naturra Extal International",
        heroTitle: "Leaders in soft commodity services",
        heroDesc: "Connecting Indonesia's finest agricultural commodities with global markets. Specializing in premium cocoa, cloves, and cocopeat.",
        btnProducts: "Our Products",
        btnLearn: "Learn More",
        stat1: "Core Products",
        stat2: "Indonesian Sourced",
        stat3: "Global Market Reach",
        stat4: "Premium Quality Grade",
        heritageEyebrow: "Our Heritage",
        heritageTitle: "Carrying on our market experience and family business heritage.",
        heritageDesc: "CV Naturra Extal International is an Indonesian-based agricultural commodity trading company. We specialize in sourcing, processing, and exporting premium Indonesian commodities including cocoa powder, cloves (cengkeh), and cocopeat to international markets.",
        feat1: "Quality Certified",
        feat2: "Global Distribution",
        feat3: "Farmer Partnerships",
        whoWeAre: "Who we are",
        whoEyebrow: "Our Products",
        cocoaCategory: "HS 1805 & 1806",
        cocoaTitle: "Cocoa Products",
        cocoaDesc: "Premium cocoa powder — both pure (HS 1805.00.0) and sweetened (HS 1806.00.0). Sourced from Indonesia's finest cocoa-producing regions.",
        clovesCategory: "Premium Grade",
        clovesTitle: "Cengkeh (Cloves)",
        clovesDesc: "Hand-picked Indonesian cloves known worldwide for their rich aroma and superior quality. Ideal for spice trade, cigarettes, and culinary use.",
        cocopeatCategory: "Eco-Friendly",
        cocopeatTitle: "Cocopeat",
        cocopeatDesc: "High-quality cocopeat from Indonesian coconut husks. Perfect for horticulture, agriculture, and sustainable growing media applications.",
        sustainBadge: "Sustainability",
        sustainTitle: "Committed to a smarter future",
        sustainDesc: "At Naturra Extal, sustainability isn't just a word — it's how we do business. We partner directly with Indonesian farmers, ensuring fair trade practices and environmental stewardship throughout our supply chain.",
        sustainList1: "Direct farmer partnerships across Indonesia",
        sustainList2: "Sustainable sourcing and processing methods",
        sustainList3: "Fair pricing and transparent supply chain",
        sustainList4: "Quality-controlled from farm to export",
        ctaEyebrow: "Get in Touch",
        ctaTitle: "Contact Naturra Extal to discuss your commodity needs",
        ctaDesc: "Whether you're looking for premium cocoa powder, Indonesian cloves, or cocopeat, our team is ready to help you find the perfect solution for your business.",
        ctaBtn1: "WhatsApp Us",
        ctaBtn2: "Email Us",
        emailTitle: "Email",
        waTitle: "WhatsApp",
        globalTitle: "Global Trade",
        globalDesc: "Worldwide shipping available",
        corpTitle: "Corporate"
    },
    id: {
        heroEyebrow: "CV Naturra Extal International",
        heroTitle: "Pemimpin dalam layanan komoditas pertanian",
        heroDesc: "Menghubungkan komoditas pertanian terbaik Indonesia dengan pasar global. Spesialisasi dalam kakao premium, cengkeh, dan cocopeat.",
        btnProducts: "Produk Kami",
        btnLearn: "Pelajari Lebih Lanjut",
        stat1: "Produk Utama",
        stat2: "Sumber Asli Indonesia",
        stat3: "Jangkauan Pasar Global",
        stat4: "Kualitas Grade Premium",
        heritageEyebrow: "Warisan Kami",
        heritageTitle: "Meneruskan pengalaman pasar dan warisan bisnis keluarga kami.",
        heritageDesc: "CV Naturra Extal International adalah perusahaan perdagangan komoditas pertanian berbasis di Indonesia. Kami mengkhususkan diri dalam pengadaan, pemrosesan, dan ekspor komoditas premium Indonesia termasuk bubuk kakao, cengkeh, dan cocopeat ke pasar internasional.",
        feat1: "Kualitas Bersertifikat",
        feat2: "Distribusi Global",
        feat3: "Kemitraan Petani",
        whoWeAre: "Siapa Kami",
        whoEyebrow: "Produk Kami",
        cocoaCategory: "HS 1805 & 1806",
        cocoaTitle: "Produk Kakao",
        cocoaDesc: "Bubuk kakao premium — baik murni (HS 1805.00.0) maupun manis (HS 1806.00.0). Bersumber dari daerah penghasil kakao terbaik di Indonesia.",
        clovesCategory: "Grade Premium",
        clovesTitle: "Cengkeh",
        clovesDesc: "Cengkeh Indonesia pilihan yang dikenal di seluruh dunia karena aromanya yang kaya dan kualitasnya yang unggul. Ideal untuk perdagangan rempah-rempah, rokok, dan penggunaan kuliner.",
        cocopeatCategory: "Ramah Lingkungan",
        cocopeatTitle: "Cocopeat",
        cocopeatDesc: "Cocopeat berkualitas tinggi dari sabut kelapa Indonesia. Sempurna untuk hortikultura, pertanian, dan aplikasi media tanam yang berkelanjutan.",
        sustainBadge: "Keberlanjutan",
        sustainTitle: "Berkomitmen untuk masa depan yang lebih cerdas",
        sustainDesc: "Di Naturra Extal, keberlanjutan bukan hanya sebuah kata — ini adalah cara kami berbisnis. Kami bermitra langsung dengan petani Indonesia, memastikan praktik perdagangan yang adil dan pengelolaan lingkungan di seluruh rantai pasokan kami.",
        sustainList1: "Kemitraan langsung dengan petani di seluruh Indonesia",
        sustainList2: "Metode pengadaan dan pemrosesan yang berkelanjutan",
        sustainList3: "Harga yang adil dan rantai pasokan yang transparan",
        sustainList4: "Kualitas dikontrol dari lahan pertanian hingga ekspor",
        ctaEyebrow: "Hubungi Kami",
        ctaTitle: "Hubungi Naturra Extal untuk mendiskusikan kebutuhan komoditas Anda",
        ctaDesc: "Baik Anda mencari bubuk kakao premium, cengkeh Indonesia, atau cocopeat, tim kami siap membantu Anda menemukan solusi sempurna untuk bisnis Anda.",
        ctaBtn1: "Hubungi via WhatsApp",
        ctaBtn2: "Email Kami",
        emailTitle: "Email",
        waTitle: "WhatsApp",
        globalTitle: "Perdagangan Global",
        globalDesc: "Pengiriman ke seluruh dunia tersedia",
        corpTitle: "Perusahaan"
    },
    ar: {
        heroEyebrow: "CV Naturra Extal International",
        heroTitle: "رواد في خدمات السلع الأساسية الميسرة",
        heroDesc: "نربط أجود السلع الزراعية الإندونيسية بالأسواق العالمية. نتخصص في الكاكاو الفاخر، القرنفل، وبيتموس جوز الهند (Cocopeat).",
        btnProducts: "منتجاتنا",
        btnLearn: "اعرف المزيد",
        stat1: "المنتجات الأساسية",
        stat2: "من مصادر إندونيسية",
        stat3: "وصول للسوق العالمي",
        stat4: "درجة جودة ممتازة",
        heritageEyebrow: "تراثنا",
        heritageTitle: "نواصل خبرتنا في السوق وتراث أعمالنا العائلي.",
        heritageDesc: "CV Naturra Extal International هي شركة تجارية للسلع الزراعية مقرها إندونيسيا. نحن نتخصص في توريد ومعالجة وتصدير السلع الإندونيسية الفاخرة بما في ذلك مسحوق الكاكاو، والقرنفل، وبيتموس جوز الهند للأسواق الدولية.",
        feat1: "جودة معتمدة",
        feat2: "توزيع عالمي",
        feat3: "شراكات مع المزارعين",
        whoWeAre: "من نحن",
        whoEyebrow: "منتجاتنا",
        cocoaCategory: "HS 1805 & 1806",
        cocoaTitle: "منتجات الكاكاو",
        cocoaDesc: "مسحوق الكاكاو الفاخر — الطبيعي (HS 1805.00.0) والمحلى (HS 1806.00.0). يتم الحصول عليه من أفضل مناطق إنتاج الكاكاو في إندونيسيا.",
        clovesCategory: "درجة فاخرة",
        clovesTitle: "القرنفل (Cengkeh)",
        clovesDesc: "قرنفل إندونيسي مقطوف يدويًا معروف عالميًا برائحته الغنية وجودته الفائقة. مثالي لتجارة التوابل والسجائر والاستخدامات بالطهي.",
        cocopeatCategory: "صديق للبيئة",
        cocopeatTitle: "كوکوبيت (Cocopeat)",
        cocopeatDesc: "كوکوبيت عالي الجودة من قشور جوز الهند الإندونيسية. مثالي للبستنة والزراعة وتطبيقات أوساط النمو المستدامة.",
        sustainBadge: "الاستدامة",
        sustainTitle: "ملتزمون بمستقبل أكثر ذكاءً",
        sustainDesc: "في Naturra Extal، الاستدامة ليست مجرد كلمة — إنها الطريقة التي ندير بها أعمالنا. نحن نتشارك مباشرة مع المزارعين الإندونيسيين، مما يضمن ممارسات التجارة العادلة والإشراف البيئي في جميع أنحاء سلسلة التوريد الخاصة بنا.",
        sustainList1: "شراكات مباشرة مع المزارعين في جميع أنحاء إندونيسيا",
        sustainList2: "طرق تحديد مصادر ومعالجة مستدامة",
        sustainList3: "تسعير عادل وسلسلة توريد شفافة",
        sustainList4: "جودة خاضعة للرقابة من المزرعة إلى التصدير",
        ctaEyebrow: "ابقى على تواصل",
        ctaTitle: "اتصل بـ Naturra Extal لمناقشة احتياجاتك من السلع",
        ctaDesc: "سواء كنت تبحث عن مسحوق الكاكاو الفاخر أو القرنفل الإندونيسي أو الكوکوبيت، فإن فريقنا مستعد لمساعدتك في إيجاد الحل الأمثل لعملك.",
        ctaBtn1: "راسلنا عبر واتساب",
        ctaBtn2: "راسلنا عبر البريد الإلكتروني",
        emailTitle: "البريد الإلكتروني",
        waTitle: "واتساب",
        globalTitle: "التجارة العالمية",
        globalDesc: "الشحن لجميع أنحاء العالم متاح",
        corpTitle: "الشركة"
    },
    es: {
        heroEyebrow: "CV Naturra Extal International",
        heroTitle: "Líderes en servicios de materias primas blandas",
        heroDesc: "Conectamos las mejores materias primas agrícolas de Indonesia con los mercados globales. Especializados en cacao premium, clavo de olor y fibra de coco (cocopeat).",
        btnProducts: "Nuestros Productos",
        btnLearn: "Aprender Más",
        stat1: "Productos Principales",
        stat2: "Origen Indonesio",
        stat3: "Alcance Global",
        stat4: "Calidad Premium",
        heritageEyebrow: "Nuestra Herencia",
        heritageTitle: "Continuando nuestra experiencia en el mercado y herencia familiar.",
        heritageDesc: "CV Naturra Extal International es una empresa de comercio de materias primas agrícolas con sede en Indonesia. Nos especializamos en la obtención, procesamiento y exportación de productos indonesios de primera calidad, incluidos el cacao en polvo, el clavo (cengkeh) y la fibra de coco hacia los mercados internacionales.",
        feat1: "Calidad Certificada",
        feat2: "Distribución Global",
        feat3: "Asociaciones Agrícolas",
        whoWeAre: "Quiénes Somos",
        whoEyebrow: "Nuestros Productos",
        cocoaCategory: "HS 1805 & 1806",
        cocoaTitle: "Productos de Cacao",
        cocoaDesc: "Cacao en polvo premium: tanto puro (HS 1805.00.0) como edulcorado (HS 1806.00.0). Procedente de las mejores regiones productoras de cacao de Indonesia.",
        clovesCategory: "Grado Premium",
        clovesTitle: "Clavo (Cengkeh)",
        clovesDesc: "Clavo de olor indonesio recolectado a mano, conocido mundialmente por su rico aroma y calidad superior. Ideal para el comercio de especias, cigarrillos y uso culinario.",
        cocopeatCategory: "Ecológico",
        cocopeatTitle: "Fibra de Coco (Cocopeat)",
        cocopeatDesc: "Fibra de coco de alta calidad de cáscaras de coco de Indonesia. Perfecta para horticultura, agricultura y aplicaciones de sustratos de cultivo sostenibles.",
        sustainBadge: "Sostenibilidad",
        sustainTitle: "Comprometidos con un futuro más inteligente",
        sustainDesc: "En Naturra Extal, la sostenibilidad no es solo una palabra; es nuestra forma de trabajar. Colaboramos directamente con agricultores en Indonesia para asegurar prácticas comerciales justas y el cuidado del medio ambiente.",
        sustainList1: "Alianzas directas con agricultores en toda Indonesia",
        sustainList2: "Métodos de suministro y procesamiento sostenibles",
        sustainList3: "Precios justos y una cadena de suministro transparente",
        sustainList4: "Calidad controlada desde la recolección hasta la exportación",
        ctaEyebrow: "Contáctenos",
        ctaTitle: "Póngase en contacto con Naturra Extal para discutir sus necesidades",
        ctaDesc: "Ya sea que busque cacao en polvo premium, clavo indonesio o fibra de coco, nuestro equipo está listo para ayudarlo a encontrar la solución perfecta para su negocio.",
        ctaBtn1: "WhatsApp Us",
        ctaBtn2: "Envíenos un Correo",
        emailTitle: "Correo Electrónico",
        waTitle: "WhatsApp",
        globalTitle: "Comercio Global",
        globalDesc: "Envío disponible a todo el mundo",
        corpTitle: "Corporativo"
    },
    fr: {
        heroEyebrow: "CV Naturra Extal International",
        heroTitle: "Leaders en services de matières premières douces",
        heroDesc: "Connexion des meilleures matières premières agricoles d'Indonésie avec les marchés mondiaux. Spécialisés dans le cacao, les clous de girofle et la fibre de coco de qualité supérieure.",
        btnProducts: "Nos Produits",
        btnLearn: "En Savoir Plus",
        stat1: "Produits Clés",
        stat2: "Origine Indonésie",
        stat3: "Portée Mondiale",
        stat4: "Qualité Supérieure",
        heritageEyebrow: "Notre Héritage",
        heritageTitle: "Poursuite de notre expérience du marché et de notre héritage familial.",
        heritageDesc: "CV Naturra Extal International est une société commerciale de produits agricoles basée en Indonésie. Nous sommes spécialisés dans l'approvisionnement, la transformation et l'exportation de produits indonésiens de qualité supérieure.",
        feat1: "Qualité Certifiée",
        feat2: "Distribution Mondiale",
        feat3: "Partenariats Agricoles",
        whoWeAre: "Qui Sommes-Nous",
        whoEyebrow: "Nos Produits",
        cocoaCategory: "HS 1805 & 1806",
        cocoaTitle: "Produits Cacaotés",
        cocoaDesc: "Poudre de cacao de qualité supérieure — pure et sucrée. Provenant des meilleures régions de production de l'Indonésie.",
        clovesCategory: "Qualité Supérieure",
        clovesTitle: "Clous de Girofle (Cengkeh)",
        clovesDesc: "Récoltés à la main, reconnus pour leur arôme. Idéal pour les épices, les cigarettes et l'usage culinaire.",
        cocopeatCategory: "Écologique",
        cocopeatTitle: "Fibre de Coco (Cocopeat)",
        cocopeatDesc: "Haute qualité, parfait pour l'horticulture et les applications de culture durables.",
        sustainBadge: "Durabilité",
        sustainTitle: "Engagés pour un avenir plus intelligent",
        sustainDesc: "Chez Naturra Extal, la durabilité est notre façon de faire des affaires et de protéger notre planète à long terme.",
        sustainList1: "Partenariats directs avec les agriculteurs",
        sustainList2: "Méthodes d'approvisionnement et de transformation durables",
        sustainList3: "Des prix équitables et une chaîne d'approvisionnement transparente",
        sustainList4: "Qualité contrôlée de la ferme à l'exportation",
        ctaEyebrow: "Contactez-Nous",
        ctaTitle: "Discutez de vos besoins en marchandises agricoles",
        ctaDesc: "Notre équipe internationale est prête à trouver la solution parfaite pour votre entreprise.",
        ctaBtn1: "WhatsApp",
        ctaBtn2: "Envoyez-nous un Email",
        emailTitle: "Email",
        waTitle: "WhatsApp",
        globalTitle: "Commerce Mondial",
        globalDesc: "Expédition dans le monde entier",
        corpTitle: "Entreprise"
    },
    zh: {
        heroEyebrow: "CV Naturra Extal国际",
        heroTitle: "大宗软商品服务的领导者",
        heroDesc: "将印尼最优质的农产品与全球市场连接。专注于优质可可、丁香和椰糠保税业务。",
        btnProducts: "我们的产品",
        btnLearn: "了解更多",
        stat1: "核心产品",
        stat2: "印尼原产",
        stat3: "全球市场覆盖",
        stat4: "优质评级",
        heritageEyebrow: "我们的传承",
        heritageTitle: "传承我们的市场经验和家族企业历史。",
        heritageDesc: "CV Naturra Extal国际是一家总部位于印尼的农产品贸易公司。我们致力于优质印尼商品（包括可可粉、丁香和椰糠）的采购、加工和出口。",
        feat1: "质量认证",
        feat2: "全球分销",
        feat3: "农户合作",
        whoWeAre: "关于我们",
        whoEyebrow: "我们的产品",
        cocoaCategory: "HS 1805 & 1806",
        cocoaTitle: "可可产品",
        cocoaDesc: "优质可可粉——包括纯粉(HS 1805)和加糖粉(HS 1806)。产自印尼最好的可可产区。",
        clovesCategory: "特级",
        clovesTitle: "丁香 (Cengkeh)",
        clovesDesc: "手工挑选的印尼丁香因其浓郁的香气和卓越的品质而闻名全球。香料拉网、香烟及烹饪使用的理想选择。",
        cocopeatCategory: "环保",
        cocopeatTitle: "椰糠 (Cocopeat)",
        cocopeatDesc: "源自印尼椰壳的高品质椰糠。非常适合园艺、农业和可持续栽培基质应用。",
        sustainBadge: "可持续性",
        sustainTitle: "致力于更智能的未来",
        sustainDesc: "在Naturra Extal，可持续不仅仅是一个词，更是我们一贯的商业准则。我们直接与印尼农户合作，确保公平贸易和环境责任。",
        sustainList1: "印尼境内直接农户伙伴关系",
        sustainList2: "可持续采购和加工方法",
        sustainList3: "公平定价及透明供应链",
        sustainList4: "从农场到出口全程质量把控",
        ctaEyebrow: "取得联系",
        ctaTitle: "联系 Naturra Extal 以讨论您的大宗商品需求",
        ctaDesc: "无论您是在寻找优质可可粉、印尼丁香还是椰糠，我们的团队随时准备为您找到完美的解决方案。",
        ctaBtn1: "WhatsApp 联系",
        ctaBtn2: "发送电子邮件",
        emailTitle: "电子邮件",
        waTitle: "WhatsApp",
        globalTitle: "全球贸易",
        globalDesc: "支持全球送货服务",
        corpTitle: "公司"
    },
    ja: {
        heroEyebrow: "CV Naturra Extal International",
        heroTitle: "ソフトコモディティサービスのリーダー",
        heroDesc: "インドネシアの最高級農産物を世界市場へ。プレミアムココア、クローブ、ココピートを専門に扱っています。",
        btnProducts: "製品一覧",
        btnLearn: "詳細を見る",
        stat1: "主要製品",
        stat2: "インドネシア産",
        stat3: "グローバルな市場展開",
        stat4: "プレミアム品質",
        heritageEyebrow: "私たちの遺産",
        heritageTitle: "市場経験と家族経営の伝統を受け継ぐ。",
        heritageDesc: "CV Naturra Extal Internationalはインドネシアの農産物商社です。ココアパウダー、クローブ（Cengkeh）、ココピートなどの高品質なインドネシア産品を調達、加工、そして国際市場に輸出しています。",
        feat1: "品質認定",
        feat2: "グローバル物流",
        feat3: "農家とのパートナーシップ",
        whoWeAre: "私たちについて",
        whoEyebrow: "私たちの製品",
        cocoaCategory: "HS 1805 & 1806",
        cocoaTitle: "ココア製品",
        cocoaDesc: "プレミアムココアパウダー。純品と甘味品の両方を提供し、インドネシアの最高のカカオ産地から供給されています。",
        clovesCategory: "プレミアムグレード",
        clovesTitle: "クローブ (Cengkeh)",
        clovesDesc: "豊かな香りと優れた品質で世界中で知られる、手摘みのインドネシア産クローブ。スパイス取引、たばこ、料理に最適です。",
        cocopeatCategory: "環境に優しい",
        cocopeatTitle: "ココピート",
        cocopeatDesc: "インドネシア産ココナッツの皮から作られた高品質のココピート。園芸や農業での持続可能な使用に最適です。",
        sustainBadge: "持続可能性",
        sustainTitle: "賢い未来へのコミットメント",
        sustainDesc: "Naturra Extalでは、持続可能性は言葉だけではなく、私たちのビジネスのあり方そのものです。農家との直接取引を通じ、フェアな貿易を実践しています。",
        sustainList1: "インドネシア全土の農家との直接パートナーシップ",
        sustainList2: "持続可能な調達と加工方法",
        sustainList3: "公正な価格設定と透明性のあるサプライチェーン",
        sustainList4: "農場から輸出までの品質管理",
        ctaEyebrow: "お問い合わせ",
        ctaTitle: "商品に関するご相談はNaturra Extalへ",
        ctaDesc: "プレミアムなココアパウダー、インドネシアのクローブ、ココピートをお探しなら、私たちにお任せください。",
        ctaBtn1: "WhatsAppで連絡",
        ctaBtn2: "メールを送信する",
        emailTitle: "Eメール",
        waTitle: "WhatsApp",
        globalTitle: "グローバル貿易",
        globalDesc: "世界中への配送が可能",
        corpTitle: "企業情報"
    },
    ko: {
        heroEyebrow: "CV Naturra Extal International",
        heroTitle: "소프트 상품 서비스의 리더",
        heroDesc: "인도네시아 최고의 농산물을 세계 시장과 연결합니다. 프리미엄 코코아, 정향(클로브), 코코피트 전문.",
        btnProducts: "당사 제품",
        btnLearn: "자세히 알아보기",
        stat1: "핵심 제품",
        stat2: "인도네시아 산",
        stat3: "글로벌 시장 접근성",
        stat4: "프리미엄 품질",
        heritageEyebrow: "우리의 유산",
        heritageTitle: "시장 경험과 가족 비즈니스의 유산을 이어갑니다.",
        heritageDesc: "CV Naturra Extal International은 인도네시아에 본사를 둔 농산물 무역 회사입니다. 프리미엄 인도네시아 상품의 소싱, 가공 및 수출을 전문으로 합니다.",
        feat1: "품질 인증",
        feat2: "글로벌 유통",
        feat3: "농부 파트너십",
        whoWeAre: "회사 소개",
        whoEyebrow: "우리의 제품",
        cocoaCategory: "HS 1805 & 1806",
        cocoaTitle: "코코아 제품",
        cocoaDesc: "프리미엄 코코아 파우더. 세계 최고의 코코아 생산 지역에서 공급됩니다.",
        clovesCategory: "프리미엄 등급",
        clovesTitle: "정향 (Cengkeh)",
        clovesDesc: "수작업으로 수확한 뛰어난 품질의 인도네시아산 정향. 향신료 무역, 담배 및 요리에 이상적입니다.",
        cocopeatCategory: "친환경",
        cocopeatTitle: "코코피트",
        cocopeatDesc: "인도네시아 코코넛 껍질로 만든 고품질 코코피트. 원예, 농업 및 지속 가능한 재배 시스템에 완벽합니다.",
        sustainBadge: "지속 가능성",
        sustainTitle: "더 스마트한 미래를 위한 약속",
        sustainDesc: "Naturra Extal에서는 지속 가능성이 단순한 단어가 아니라 우리의 비즈니스 방식입니다.",
        sustainList1: "인도네시아 전역의 농부들과 직접 협력",
        sustainList2: "지속 가능한 원료 소싱 및 가공 절차",
        sustainList3: "공정한 가격 정책과 투명한 공급망",
        sustainList4: "농장부터 수출까지 철저한 품질 관리",
        ctaEyebrow: "문의하기",
        ctaTitle: "농산물 조달 관련 논의가 필요하시면 연락주세요",
        ctaDesc: "글로벌 비즈니스를 위한 최고의 인도네시아 원자재를 제공 및 납품해 드립니다.",
        ctaBtn1: "WhatsApp 문의",
        ctaBtn2: "이메일 문의",
        emailTitle: "이메일",
        waTitle: "WhatsApp",
        globalTitle: "글로벌 무역",
        globalDesc: "전 세계 배송 가능",
        corpTitle: "회사 정보"
    }
};

export const NATURRA_PARTNERSHIP_TRANSLATIONS: Record<LanguageCode, PartnershipTranslations> = {
    en: {
        pageTitle: "Global Partnership Details - Naturra Extal",
        metaDescription: "Learn how to partner with Naturra Extal for bulk commodity sourcing.",
        metaKeywords: "commodity partnership, cocoa supplier, clove partnership",
        heroTitle: "Global Partnership",
        mainTitle: "A Reliable Sourcing Partner",
        mainParagraphs: [
            "Whether you are a food manufacturer, international wholesaler, or distributor, you need a trusted partner in origin. Naturra Extal is here to ensure your supply chain remains uninterrupted and high-quality.",
            "We understand that international trade involves strict compliance, precise specifications, and timely deliveries. We are dedicated to accommodating these needs seamlessly."
        ],
        experienceTitle: "Export Expertise",
        experienceParagraphs: [
            "Our team has extensive experience managing exports across different continents. We know how to handle the documentation, quality control, and logistics required to successfully land products at your destination port.",
            "From sample evaluation to bulk container loading, we maintain complete transparency. We know how to organize efficient, reliable workflows for you."
        ],
        collaborationTitle: "Direct from the Source",
        collaborationSubtitle: "B2B Commodity Supplier",
        collaborationParagraphs: [
            "We believe success comes from securing the best raw materials directly from the source. By partnering with us, you cut out unnecessary middlemen and work directly with a company rooted in Indonesia's finest farming regions.",
            "Our team is ready to discuss your volume requirements, target specifications, and preferred shipping incoterms (FOB, CIF, etc.).",
            "We provide clear, measurable solutions. You'll receive accurate quotes, genuine product specs, and consistent quality."
        ],
        flexibilityTitle: "Flexible Contracts",
        flexibilityParagraphs: [
            "We offer flexible MOQs depending on the product, from partial container shipments to regular multi-container monthly contracts.",
            "You can choose the packaging method that best fits your warehouse and production lines. We are here to help make it happen."
        ],
        scaleTitle: "Commitment to Your Scale",
        scaleDescription: "We scale with your business. As your volume requirements grow, our farmer networks and processing capabilities will rise to meet your demand.",
        scaleQuestion: "Ready to secure your supply chain?",
        ctaTitle: "Discuss Your Next Contract",
        ctaDescription: "Tell us about your commodity needs. Send us your specifications to start a long-term partnership.",
        ctaButton: "Contact Our Trade Team",
        contactTitle: "Trade Office"
    },
    id: {
        pageTitle: "Program Kemitraan Global - Naturra Extal",
        metaDescription: "Pelajari cara bermitra dengan Naturra Extal untuk komoditas grosir.",
        metaKeywords: "kemitraan komoditas, pemasok kakao, kemitraan cengkeh",
        heroTitle: "Kemitraan Global",
        mainTitle: "Mitra Pengadaan yang Handal",
        mainParagraphs: [
            "Baik Anda pabrikan makanan, pedagang grosir internasional, atau distributor, Anda membutuhkan mitra terpercaya di negara asal. Naturra Extal hadir untuk memastikan rantai pasok Anda konsisten.",
            "Kami memahami bahwa perdagangan internasional melibatkan kepatuhan yang ketat, spesifikasi yang tepat, dan pengiriman yang tepat waktu."
        ],
        experienceTitle: "Keahlian Ekspor",
        experienceParagraphs: [
            "Tim kami memiliki pengalaman mengelola ekspor lintas benua. Kami menguasai dokumen, kontrol kualitas, dan logistik.",
            "Mulai dari sampel hingga pemuatan kontainer, kami menjaga transparansi. Kami menjamin alur ke Anda efisien."
        ],
        collaborationTitle: "Langsung dari Sumbernya",
        collaborationSubtitle: "Pemasok Komoditas B2B",
        collaborationParagraphs: [
            "Kami memutus mata rantai perantara. Bermitra dengan kami berarti berhubungan langsung dengan produsen di Indonesia.",
            "Tim kami siap membahas kebutuhan volume, target spesifikasi, dan istilah pengiriman (FOB, CIF, dll).",
            "Kutipan yang akurat dan kualitas yang berkelanjutan selalu kami tawarkan."
        ],
        flexibilityTitle: "Kontrak yang Fleksibel",
        flexibilityParagraphs: [
            "Kami menawarkan fleksibilitas MOQ yang bervariasi bergantung komoditas Anda.",
            "Kemasan dapat disesuaikan dengan permintaan standar gudang dan lini produksi pabrik Anda."
        ],
        scaleTitle: "Komitmen Skala Bisnis",
        scaleDescription: "Kami akan meningkatkan produksi dan sistem petani untuk mengakomodir kebutuhan pabrik Anda jika bertumbuh.",
        scaleQuestion: "Siap mengamankan stabilitas rantai pasokan Anda?",
        ctaTitle: "Diskusikan Kontrak Anda Berikutnya",
        ctaDescription: "Beritahu kami kebutuhan komoditas Anda untuk memulai mitra jangka panjang.",
        ctaButton: "Hubungi Tim Eksportir Kami",
        contactTitle: "Kantor Perdagangan"
    },
    ar: {
        pageTitle: "تفاصيل الشراكة العالمية - Naturra Extal",
        metaDescription: "تعرف على كيفية الشراكة مع Naturra Extal للشراء بالجملة.",
        metaKeywords: "شراكة السلع, مورد الكاكاو, شراكة القرنفل",
        heroTitle: "الشراكة العالمية والعقود",
        mainTitle: "شريك موثوق للشراء",
        mainParagraphs: [
            "سواء كنت مصنع أغذية، تاجر جملة دولي، أو موزع، فإنك بحاجة إلى شريك موثوق في بلد المنشأ. Naturra Extal هنا لضمان بقاء سلسلة التوريد الخاصة بك عالية الجودة ولا تتأثر.",
            "نحن ندرك أن التجارة الدولية تنطوي على الامتثال الصارم والمواصفات الدقيقة والتسليم في الوقت المناسب."
        ],
        experienceTitle: "خبرة التصدير",
        experienceParagraphs: [
            "يمتلك فريقنا خبرة واسعة في إدارة الصادرات عبر القارات المختلفة. نحن نعرف كيفية التعامل مع التوثيق والمراقبة.",
            "من تقييم العينات إلى تحميل حاويات البضائع السائبة، نحافظ على شفافية كاملة."
        ],
        collaborationTitle: "مباشرة من المصدر",
        collaborationSubtitle: "مورد السلع B2B",
        collaborationParagraphs: [
            "بشراكتك معنا، أنت تتخلص من الوسطاء وتعمل مباشرة مع شركة متجذرة في أرقى المناطق الزراعية في إندونيسيا.",
            "فريقنا جاهز لمناقشة متطلبات الحجم، المواصفات، وشروط الشحن المفضلة (FOB، CIF، إلخ).",
            "نحن نقدم حلولًا تقنية محددة بدقة. ستحصل على تسعير دقيق وجودة ثابتة."
        ],
        flexibilityTitle: "عقود مرنة",
        flexibilityParagraphs: [
            "نحن نقدم مرونة في الحد الأدنى لكمية الطلب حسب المنتج، من حمولات الحاويات الجزئية إلى العقود الشهرية بانتظام.",
            "يمكنك اختيار طريقة التغليف التي تناسب مستودعك وخطوط الإنتاج الخاصة بك."
        ],
        scaleTitle: "الالتزام بتوسع عملك",
        scaleDescription: "نحن ننمو مع عملك. مع نمو متطلبات الحجم الخاصة بك، ستتوسع شبكتنا لتلبية طلبك.",
        scaleQuestion: "هل أنت مستعد لتأمين سلسلة التوريد الخاصة بك؟",
        ctaTitle: "ناقش عقدك القادم",
        ctaDescription: "أخبرنا عن احتياجات السلع الخاصة بك وتواصل معنا.",
        ctaButton: "اتصل بفريق التجارة",
        contactTitle: "مكتب التجارة"
    },
    es: {
        pageTitle: "Asociación Global - Naturra Extal",
        metaDescription: "Aprenda cómo asociarse con Naturra Extal para importación de materias primas.",
        metaKeywords: "asociación comercial, proveedor de cacao, alianza",
        heroTitle: "Asociación Global B2B",
        mainTitle: "Socio de Suministro Confiable",
        mainParagraphs: [
            "Independientemente de si es un fabricante de alimentos o un mayorista, necesita un socio de origen.",
            "Entendemos que el comercio internacional implica especificaciones estrictas y entregas puntuales."
        ],
        experienceTitle: "Experiencia en Exportación",
        experienceParagraphs: [
            "Nuestro equipo maneja exportaciones globales a varios continentes, entendiendo la documentación y calidad requerida.",
            "Mantenemos completa transparencia desde las muestras hasta el envío a granel."
        ],
        collaborationTitle: "Directamente de Origen",
        collaborationSubtitle: "Proveedor Mayorista",
        collaborationParagraphs: [
            "Acercamos las granjas agrícolas hasta sus fábricas. Olvídese de perder capital en intermediarios.",
            "Estamos listos para discutir precios (FOB, CIF) y volúmenes a granel.",
            "Recibirá calidades genuinas de consistencia mensual."
        ],
        flexibilityTitle: "Contratos Flexibles",
        flexibilityParagraphs: [
            "Ofrecemos límites de pedido que se adaptan a su modelo de distribución comercial.",
            "El tipo y tamaño de empaque se pueden personalizar según se solicite."
        ],
        scaleTitle: "Para Escalar Su Negocio",
        scaleDescription: "A medida que crecen sus requisiciones de volumen, lo harán nuestros flujos agrícolas de respuesta.",
        scaleQuestion: "¿Listo para afianzar el suministro a futuro?",
        ctaTitle: "Programar Análisis de Demanda",
        ctaDescription: "Descubra qué es posible solicitando nuestras especificaciones base.",
        ctaButton: "Consultar Equipo Comercial",
        contactTitle: "Información de Oficina"
    },
    fr: {
        pageTitle: "Partenariat International - Naturra Extal",
        metaDescription: "Apprenez à collaborer avec Naturra Extal pour l'approvisionnement en matières premières.",
        metaKeywords: "partenariat, export de cacao",
        heroTitle: "Partenariat Global B2B",
        mainTitle: "Partenaire de Confiance",
        mainParagraphs: [
            "Que vous soyez fabricant agroalimentaire, grossiste ou distributeur, Naturra Extal est votre solution locale.",
            "Les exigences internationales sont très strictes. Nous sommes parés pour y faire face."
        ],
        experienceTitle: "Notre Expertise Locale",
        experienceParagraphs: [
            "Notre équipe contrôle chaque étape, de la logistique à la conformité administrative des exportations.",
            "De l'envoi d'échantillons au conditionnement en vrac."
        ],
        collaborationTitle: "Lien Direct",
        collaborationSubtitle: "Fournisseur en Vrac B2B",
        collaborationParagraphs: [
            "Evitez les chaînes d'approvisionnement interminables. Travaillez directement avec l'Indonésie.",
            "Incoterms FOB, CIF, conditions flexibles sur tout nos contrats de matières.",
            "De réels produits pour des prix cohérents."
        ],
        flexibilityTitle: "Contrats Sur-mesure",
        flexibilityParagraphs: [
            "Volumes ajustés mensuellement sur des périodes d'engagement décidées avec le partenaire.",
            "Optimisez votre conditionnement."
        ],
        scaleTitle: "Soutenir Votre Croissance",
        scaleDescription: "Nous accompagnons l'évolution de nos clients par la garantie d'une constante de livraison.",
        scaleQuestion: "Prêt à parler distribution ?",
        ctaTitle: "Démarrez l'Engagement",
        ctaDescription: "Confiez-nous vos projections de commandes et critères.",
        ctaButton: "Contacter le Service Commercial",
        contactTitle: "Bureau Commercial"
    },
    zh: {
        pageTitle: "全球商业合作 - Naturra Extal",
        metaDescription: "了解有关大宗商品批量采购的合作细节。",
        metaKeywords: "大宗商品采购, 合作供应商, 可可和丁香工厂",
        heroTitle: "全球战略伙伴",
        mainTitle: "可靠的货源支持者",
        mainParagraphs: [
            "无论您是国际食品制造商还是大型批发商，找到可靠的产地源头都能确保利润。",
            "我们极其了解进口规格要求与国际交期控制的必要性。"
        ],
        experienceTitle: "外贸及出口实力",
        experienceParagraphs: [
            "从原产地出关到靠泊目的港，我们有一套专业的文书把控与装运计划。",
            "透明化、定制化是我们的立业之本。"
        ],
        collaborationTitle: "产地直销",
        collaborationSubtitle: "国际大宗商品B2B工厂",
        collaborationParagraphs: [
            "砍掉中间商，通过印尼核心原产地直发获得成本优势。",
            "随时商讨离岸(FOB)及到岸(CIF)协议或体积需求。",
            "承诺稳定如一的产品批次标准。"
        ],
        flexibilityTitle: "合同周期高度灵活",
        flexibilityParagraphs: [
            "无论是每月定期的长协合同还是零散货柜交付，Naturra Extal 均可服务。",
            "完全客制化的商用包装和贴牌分装。"
        ],
        scaleTitle: "匹配您的体量",
        scaleDescription: "伴随着您的体量增长，我们亦会利用印尼庞大农业合作网填补你的市场供应。",
        scaleQuestion: "准备好洽谈供应保障了吗？",
        ctaTitle: "商讨新订购计划",
        ctaDescription: "发送贵公司的质量规格表即可开始评估流程。",
        ctaButton: "联络海外销售团队",
        contactTitle: "企业运营处"
    },
    ja: {
        pageTitle: "グローバルパートナーシップ - Naturra Extal",
        metaDescription: "農産物の大量調達についての提携情報。",
        metaKeywords: "提携, クローブ仕入れ, B2B",
        heroTitle: "グローバルパートナーシップ",
        mainTitle: "信頼できる調達パートナー",
        mainParagraphs: [
            "世界中の商社や食品メーカーに向け、安定した原料供給を行います。",
            "国際取引における厳格なレギュレーションを理解しており、順守に向けた体制を確立しています。"
        ],
        experienceTitle: "確かな輸出経験",
        experienceParagraphs: [
            "複数の大陸に向けた輸出実績があり、適切な品質管理と書類作成を得意とします。",
            "サンプル評価から本船積載までを円滑に進めます。"
        ],
        collaborationTitle: "原産地からの直接手配",
        collaborationSubtitle: "B2B コモディティサプライヤー",
        collaborationParagraphs: [
            "中間業者を省くことで、高品質なインドネシア産原料を適正価格でお届けします。",
            "FOBやCIFといった取引条件についても柔軟に議論可能です。",
            "規格や品質仕様に基づいた明確な供給をお約束します。"
        ],
        flexibilityTitle: "柔軟な契約条件",
        flexibilityParagraphs: [
            "大量のコンテナ取引だけでなく、より小口や月次定期契約など、様々に対応します。",
            "パッキングや納品方法もお選びいただけます。"
        ],
        scaleTitle: "事業の成長にコミット",
        scaleDescription: "お客様の必要とする調達規模に合わせて、私たちの供給力も拡大させます。",
        scaleQuestion: "サプライチェーンを確立する準備はできていますか？",
        ctaTitle: "契約について協議する",
        ctaDescription: "必要な種類や数量をご連絡いただければ、最適な解決策をご提案します。",
        ctaButton: "輸出チームへ連絡する",
        contactTitle: "取引窓口"
    },
    ko: {
        pageTitle: "글로벌 파트너십 안내 - Naturra Extal",
        metaDescription: "Naturra Extal과 대량 상품 소싱을 위한 파트너가 되는 방법을 확인하세요.",
        metaKeywords: "상품 파트너십, 코코아 공급, 정향 소싱",
        heroTitle: "글로벌 B2B 파트너십",
        mainTitle: "신뢰할 수 있는 소싱 파트너",
        mainParagraphs: [
            "식품 제조업체 또는 다국적 도매업체라면 원산지에 믿을 수 있는 파트너가 필수적입니다.",
            "저희는 무역 과정 안의 납기가 얼마나 중요한지 명확하게 이해하고 있습니다."
        ],
        experienceTitle: "수출 전문성",
        experienceParagraphs: [
            "철저한 샘플 테스트와 인증, 문서 작업 등을 통해 안전하게 통관될 수 있도록 지원합니다.",
            "대량 컨테이너를 능숙하게 핸들링합니다."
        ],
        collaborationTitle: "원산지 직공급 시스템",
        collaborationSubtitle: "B2B 원자재 공급사",
        collaborationParagraphs: [
            "인도네시아의 농업 지역에 기반을 두고 중간 유통 과정을 완전히 제거합니다.",
            "목표하는 가격, 거래 조건 (FOB, CIF), 그리고 대량 주문 수량에 대해 협의하십시오.",
            "어디서도 볼 수 없는 투명하고 체계화된 솔루션 매트릭스를 제공합니다."
        ],
        flexibilityTitle: "유연한 계약 조건 안내",
        flexibilityParagraphs: [
            "정기적인 다수 컨테이너 발주부터 초기 부분 화물 계약까지, 맞춤형으로 돕습니다.",
            "포장 및 적재 방식도 제조 라인에 맞게 커스텀할 수 있습니다."
        ],
        scaleTitle: "장기적인 성장",
        scaleDescription: "사업 성장에 발맞춰 더 많은 작물 네트워크를 가동하여 요구 사항을 충족해 드립니다.",
        scaleQuestion: "공급망 안정화에 관심이 있으신가요?",
        ctaTitle: "다음 계약 논의 시작하기",
        ctaDescription: "상세 스펙과 공급 일정을 제출해주시면 전문 무역팀이 회신합니다.",
        ctaButton: "수출팀에 연락하기",
        contactTitle: "연락처 정보"
    }
};

export const NATURRA_CUSTOM_ORDER_TRANSLATIONS: Record<LanguageCode, CustomOrderTranslations> = {
    en: {
        meta: { title: "Custom Specifications - Naturra Extal", description: "Request custom specifications for cocoa, cloves, and cocopeat." },
        hero: { title: "Custom Specifications", imageAlt: "Naturra Extal Custom Processing", imageTitle: "Custom Commodity Processing" },
        message: {
            title: "Tailored to Your Requirements",
            paragraphs: [
                "Different markets require different grades, processing methods, and packaging. We open our doors to buyers who need specific adjustments to standard commodity offerings.",
                "We don't just supply raw materials. We understand your end-product goals and shape our processing to ensure the ingredients meet your exact factory specifications."
            ],
            imageAlt: "Custom Commodity Specifications"
        },
        ideas: {
            title: "From Raw to Ready",
            intro: "Need a specific mesh size or fat content for cocoa powder? Specific moisture limits for cloves or tailored block weights for cocopeat? Tell us your targets.",
            description: "We believe every manufacturer has unique processing parameters. At Naturra Extal, custom sizing, sorting, and packaging are our expertise. Our team routinely handles strict international grading requests."
        },
        process: {
            title: "Our Quality Assurance Process",
            steps: [
                { title: "Requirement Gathering", description: "You provide exact specifications (moisture, mesh, grade, packaging)." },
                { title: "Sourcing & Sorting", description: "We select the raw materials matching the target grade." },
                { title: "Lab & Processing", description: "Items are processed and undergo parameter verification." },
                { title: "Export Delivery", description: "Safe loading and complete export documentation to your final port." }
            ]
        },
        cta: {
            title: "Request a Custom Quote",
            intro: "If you require specific grades or packaging, it's time to talk. Contact our export team for a consultation:",
            workshopHeading: "Processing Facility",
            workshopLabel: "Facility Info:",
            workshopParagraph: "Our facility in Indonesia handles custom processing, sorting, and specialized packaging for bulk commodity orders.",
            button: "Request Quote"
        }
    },
    id: {
        meta: { title: "Spesifikasi Khusus - Naturra Extal", description: "Pesan spesifikasi komoditas custom yang sesuai persis dengan kebutuhan industri Anda." },
        hero: { title: "Spesifikasi Khusus", imageAlt: "Naturra Extal Custom Spesifikasi", imageTitle: "Proses Komoditas Khusus" },
        message: {
            title: "Disesuaikan Untuk Anda",
            paragraphs: [
                "Setiap negara dan pabrik produsen makanan atau perusahaan agrikultur punya standar batas minimum masing-masing.",
                "Kami bisa mengatur ukuran, kelembapan, kadar lemak, maupun ukuran briket di level produksi."
            ],
            imageAlt: "Spesifikasi Khusus"
        },
        ideas: {
            title: "Dari Mentah Ke Siap Kirim",
            intro: "Butuh ukuran mesh tertentu pada Coklat bubuk? Kadar air sangat rendah untuk cengkeh ekspor Anda? Sertakan di surat permohonan pesanan Anda.",
            description: "Mensortir ulang dan memastikan semua sesuai standar laboratorium spesifik tujuan ekspor adalah keahlian utama Quality Control kami."
        },
        process: {
            title: "Jaminan Proses Kualitas Kami",
            steps: [
                { title: "Pengumpulan Syarat", description: "Anda memberikan spec exact (kelembapan, grade, packaging dll)." },
                { title: "Penyortiran", description: "Kami mengumpulkan hasil mentah untuk masuk tahapan seleksi material." },
                { title: "Test Lab", description: "Sertifikasi ekspor akan dibuat jika seluruh proses parameter QC lolos." },
                { title: "Delivery Ekspor", description: "Loading dan penyerahan di pelabuhan akan diawasi tim surveyor independen." }
            ]
        },
        cta: {
            title: "Minta Kutipan Harga",
            intro: "Jangan ragu untuk mengirimkan email persyaratan Anda pada fasilitas manufaktur kami.",
            workshopHeading: "Fasilitas Pengemasan",
            workshopLabel: "Fasilitas:",
            workshopParagraph: "Gudang berstandar ekspor kami siap menampung spesifikasi unik Anda.",
            button: "Dapatkan Harga"
        }
    },
    ar: {
        meta: { title: "مواصفات مخصصة - Naturra Extal", description: "مواصفات مخصصة للكاكاو والقرنفل وكوكوبيت." },
        hero: { title: "مواصفات مخصصة", imageAlt: "معالجة للسلع الإندونيسية", imageTitle: "مواصفات مخصصة" },
        message: {
            title: "مصممة لمتطلباتك",
            paragraphs: [
                "تتطلب الأسواق المختلفة درجات وطرق معالجة وتعبئة مختلفة. نحن نفتح أبوابنا للمشترين الذين يحتاجون إلى تعديلات محددة على عروض السلع القياسية.",
                "نحن نفهم أهدافك من المنتج النهائي ونشكل معالجتنا لضمان تلبية المكونات لمواصفات المصنع."
            ],
            imageAlt: "معالجة مخصصة"
        },
        ideas: {
            title: "من المواد الخام إلى الجاهزة",
            intro: "هل تحتاج إلى حجم معين أو محتوى دهني معين لمسحوق الكاكاو؟",
            description: "نحن نؤمن بأن كل مُصنّع لديه معايير فريدة. في Naturra Extal، الفرز والتعبئة المخصصة هي خبرتنا."
        },
        process: {
            title: "عملية ضمان الجودة",
            steps: [
                { title: "جمع المتطلبات", description: "تحديد مواصفاتك الدقيقة." },
                { title: "الفرز والمصادر", description: "نختار المواد الخام التي تتطابق مع طلبك." },
                { title: "التوثيق والتجهيز", description: "معالجة العناصر وتقديم الفحص المخبري." },
                { title: "التسليم", description: "نجهّز التوثيق الآمن لإرساله بحرياً." }
            ]
        },
        cta: {
            title: "اطلب عرض سعر مخصص",
            intro: "إذا كنت بحاجة إلى درجات خاصة، تواصل مع فريق التصدير.",
            workshopHeading: "مرافق التعبئة والتغليف",
            workshopLabel: "معلومات المصنع:",
            workshopParagraph: "تقع مرافقنا في إندونيسيا، وهي مهيأة للطلبات المخصصة.",
            button: "اطلب السعر"
        }
    },
    es: {
        meta: { title: "Especificaciones Personalizadas - Naturra Extal", description: "Materias primas especificadas" },
        hero: { title: "Especificación Personalizada", imageAlt: "Maquila B2B", imageTitle: "Fabricación" },
        message: {
            title: "Diseñado para Exigencias de Mercado",
            paragraphs: [
                "Tanto para certificaciones orgánicas como necesidades estandarizadas de humedad.",
                "Tenemos laboratorios al alcance de los contenedores que respaldarán los certificados al exportar."
            ],
            imageAlt: "Certificados Especificos"
        },
        ideas: {
            title: "Garantizamos tu Fórmula",
            intro: "Tanto para porcentaje de grasa de cacao como el tipo de secado de clavo.",
            description: "Los lineamientos de su cadena exigirán que mantengamos el estándar todos los meses."
        },
        process: {
            title: "Pasos Asegurados",
            steps: [
                { title: "Revisión Acuerdos", description: "Lectura completa de specs objetivo." },
                { title: "Selección en Granja", description: "Recolectamos lotes alineados." },
                { title: "Proceso Limpieza", description: "Revisión visual y de maquinaría." },
                { title: "Embarque Final", description: "Sellado bajo autoridades aduaneras indonesas." }
            ]
        },
        cta: {
            title: "Formular Nuevo Requerimiento",
            intro: "Llámenos y conversaremos los detalles para adaptarnos a usted.",
            workshopHeading: "Centro de Acopio",
            workshopLabel: "Nuestra Facilidad:",
            workshopParagraph: "Equipos capacitados e instalaciones de primer mundo en Jakarta/Bekasi.",
            button: "Tasar Requerimiento"
        }
    },
    fr: {
        meta: { title: "Fiche Technique Sur Mesure - Naturra Extal", description: "Exportations qualifiées." },
        hero: { title: "Spécifications Sur Mesure", imageAlt: "Cacao Clous Girofle Coco", imageTitle: "Cacao Extal" },
        message: {
            title: "Aux Dimensions de Votre Usine",
            paragraphs: [
                "Nos capacités logistiques s'adaptent, que ce soit pour des blocs de CocoPeat spécifiques ou de la poudre de cacao ciblée.",
                "La valeur de nos partenariats est liée au maintien stable qualitatif de mois en mois."
            ],
            imageAlt: "Personnalisation du Vrac"
        },
        ideas: {
            title: "Les Tests Laboratoires",
            intro: "Nous effectuons plusieurs tris visuels ou par densimétrie en fonction des résidus fixés en KPI.",
            description: "C'est grace à une inspection stricte SGS ou Sucofindo que la validation douanière sera établie."
        },
        process: {
            title: "Processus d'Assurance Qualité",
            steps: [
                { title: "Fiche Technique", description: "Envoi et relecture commune." },
                { title: "Collecte Amont", description: "Achats auprès des fermes ciblées." },
                { title: "Test et Nettoyage", description: "Transformation par étapes successives." },
                { title: "Validation Cargo", description: "Expédition internationale couverte." }
            ]
        },
        cta: {
            title: "Demandez une Cotation",
            intro: "Notre bureau import/export s'occupe de la négociation de termes sécurisés et transparents.",
            workshopHeading: "Plateforme Indonésienne",
            workshopLabel: "Lieu :",
            workshopParagraph: "Silos, hangars aérés pour Cacao, zone contrôle Clous et presses Cocopeat en relation direct.",
            button: "Demande de Prix"
        }
    },
    zh: {
        meta: { title: "定制规格需求 - Naturra Extal", description: "了解关于我们如何配合您的进出口标准定制原产地物资" },
        hero: { title: "特定规格订单", imageAlt: "大宗农业处理", imageTitle: "农产品定制化标准" },
        message: {
            title: "完全向您的指标看齐",
            paragraphs: [
                "国际市场采购中，水分、瑕疵率、目数、甚至包装唛头都严重影响后续销路及加工。",
                "我们深知客户的顾虑，Naturra Extal为您在原产地做好所有严苛的处理工序。"
            ],
            imageAlt: "指标把控图"
        },
        ideas: {
            title: "精细化农产品处理",
            intro: "需要脂肪含量极其特定的可可粉吗？对于椰糠盐分EC值有特殊要求吗？告诉我们！",
            description: "专业的流水线及印尼官方实验室将为我们背书，满足各类国际商检级别。"
        },
        process: {
            title: "质量履约四步法",
            steps: [
                { title: "需求匹配", description: "买方将提供目标化学/物理指标及包装明细。" },
                { title: "毛料集采", description: "我们在全印尼相关农户产区进行大范围调货。" },
                { title: "筛分与检验", description: "精细化去除杂质，实验室取样报告合格则出库。" },
                { title: "封柜发运", description: "出具国际货运必须证书和正本提单。" }
            ]
        },
        cta: {
            title: "申请一站式定做报价",
            intro: "准备好开启首个柜重吗？告诉我们详细的信息以获得精准的CIF/FOB价格。",
            workshopHeading: "中央运转仓库",
            workshopLabel: "处理中心:",
            workshopParagraph: "全印尼多网点支持快速出货和无菌级打包。",
            button: "立即获悉价格"
        }
    },
    ja: {
        meta: { title: "特別仕様オーダー - Naturra Extal", description: "お客様の要件に合致したインドネシア産コモディティ" },
        hero: { title: "スペックカスタマイズ", imageAlt: "インドネシア農産物流通", imageTitle: "カスタム処理" },
        message: {
            title: "工場にそのまま導入可能な原料",
            paragraphs: [
                "含有水分量から粉末の細かさに至るまで、品質指標を満たすためのソリューションを提供します。",
                "独自のサプライチェーンにより、日本の厳しい基準にも合わせたクオリティを保証します。"
            ],
            imageAlt: "カスタマイズされた農産物"
        },
        ideas: {
            title: "高度なパラメーター管理",
            intro: "ココピートのブロックサイズ変更や、クローブにおける指定含有量が必要ですか？",
            description: "細かな加工や検品基準を通じて、歩留まり向上や安全性を支援いたします。"
        },
        process: {
            title: "クオリティアシュアランスフロー",
            steps: [
                { title: "仕様すり合わせ", description: "ターゲット基準やパッケージ方法を定義。" },
                { title: "独自の原料選別", description: "トップクラスの農園から規定に則り集約。" },
                { title: "加工・衛生試験", description: "国際テスト基準をクリアする成分検査を実行。" },
                { title: "コンテナ手配", description: "迅速かつ安全に積載し、輸出通関を手配。" }
            ]
        },
        cta: {
            title: "見積もりのご依頼を承ります",
            intro: "品質基準をお持ちなら、ぜひ弊社のご案内にお任せください。",
            workshopHeading: "処理専用施設",
            workshopLabel: "施設情報:",
            workshopParagraph: "国内のハブとして機能する衛生的な倉庫設備と充実した加工能力を保有。",
            button: "見積もり依頼"
        }
    },
    ko: {
        meta: { title: "맞춤형 사양 발주 - Naturra Extal", description: "고객사의 정확한 제조 요구조건에 부합하는 농산물 소싱" },
        hero: { title: "맞춤형 스펙 주문", imageAlt: "인도네시아 상품 거래", imageTitle: "품질 관리" },
        message: {
            title: "요구 조건에 완벽히 맞추는 프로세스",
            paragraphs: [
                "각 국가의 식약청 및 공장마다 원하는 등급과 패키징 사이즈가 다를 수밖에 없습니다.",
                "우리는 표준 상품만 파는 것이 아니라, 맞춤형 가공을 통해 제조 효율을 높여드립니다."
            ],
            imageAlt: "디지털 품질 관리 검사"
        },
        ideas: {
            title: "수분, 크기, 성분부터 포장까지",
            intro: "특별한 메쉬(Mesh)의 코코아 파우더가 아니면 안 되나요? EC값이 낮은 친환경 코코피트가 필요하신가요?",
            description: "목표하는 화학적, 물리적 파라미터가 있다면 전담 팀이 산지에서부터 기준을 잡고 관리합니다."
        },
        process: {
            title: "4단계 품질 보증 프로세스",
            steps: [
                { title: "기초 논의", description: "포장 규격 및 목표 지표 공유." },
                { title: "선별 소싱", description: "수확물 중에서 스펙에 맞는 로트만 추출." },
                { title: "가공 및 테스팅", description: "이물질 제거 및 성적서(COA) 발급 과정 진행." },
                { title: "물류 및 적재", description: "안전 포장을 거쳐 항구로 즉시 이동." }
            ]
        },
        cta: {
            title: "견적 확인 및 상담 진행",
            intro: "당사의 수출팀에게 필요한 수량과 타겟 기준표를 전달해주세요.",
            workshopHeading: "Naturra Extal 시설",
            workshopLabel: "가공 공장:",
            workshopParagraph: "품질 최우선의 대규모 선별, 가공 및 패킹 공장을 보유하고 있습니다.",
            button: "문의 남기기"
        }
    }
};
