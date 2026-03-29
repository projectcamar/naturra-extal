import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import './NaturraAbout.css'

const ABOUT_TRANSLATIONS: Record<LanguageCode, {
    metaTitle: string
    metaDesc: string
    eyebrow: string
    heroDesc: string
    sourcedTitle: string
    sourcedDesc: string
    diversityTitle: string
    diversitySubtitle: string
    regions: { name: string; desc: string }[]
    journeyEyebrow: string
    journeyHeading: string[]
    journeyDesc: string
    processTitle: string
    processSubtitle: string
    steps: { label: string; desc: string }[]
    contactCompany: string
    contactContact: string
    contactFollow: string
}> = {
    id: {
        metaTitle: 'Tentang Kami | CV Naturra Extal International',
        metaDesc: 'Pelajari tentang CV Naturra Extal International — perusahaan perdagangan komoditas pertanian Indonesia yang mengkhususkan diri dalam cocoa, cengkeh, dan cocopeat.',
        eyebrow: 'Tentang Kami',
        heroDesc: 'CV Naturra Extal International adalah perusahaan perdagangan komoditas Indonesia yang menjembatani warisan pertanian Indonesia yang kaya dengan pasar global. Kami mengkhususkan diri dalam pengadaan cocoa premium, cengkeh, dan cocopeat langsung dari petani Indonesia — memastikan kualitas, keberlanjutan, dan praktik perdagangan yang adil dari hulu ke ekspor.',
        sourcedTitle: 'BERSUMBER LANGSUNG DARI PETANI',
        sourcedDesc: 'Indonesia adalah produsen cocoa terbesar ketiga di dunia dan rumah bagi beberapa cengkeh dan produk kelapa terbaik. Di Naturra Extal, kami bekerja langsung dengan komunitas petani di seluruh kepulauan Indonesia, memotong perantara untuk memastikan petani mendapatkan kompensasi yang adil sementara klien kami mendapatkan komoditas berkualitas tertinggi dengan harga kompetitif.',
        diversityTitle: 'KEANEKARAGAMAN KOMODITAS INDONESIA',
        diversitySubtitle: 'Jaringan pengadaan kami tersebar di seluruh wilayah pertanian utama Indonesia',
        regions: [
            { name: 'Sulawesi', desc: 'Wilayah penghasil cocoa terbesar di Indonesia, bertanggung jawab atas lebih dari 60% produksi cocoa nasional. Cocoa Sulawesi dikenal dengan profil rasa yang khas dan kaya.' },
            { name: 'Jawa Timur', desc: 'Rumah perkebunan cocoa premium dan fasilitas pengolahan utama. Jawa Timur juga menjadi pusat pengadaan cocopeat kami.' },
            { name: 'Maluku', desc: 'Kepulauan Rempah legendaris — tempat lahirnya perdagangan cengkeh global. Cengkeh Maluku sangat dihargai di seluruh dunia karena kandungan minyak esensial yang luar biasa.' },
            { name: 'Sulawesi Utara', desc: 'Wilayah penghasil cocoa dan cengkeh yang signifikan. Tanah vulkanik memperkaya profil rasa komoditas yang ditanam di sini.' },
            { name: 'Surabaya', desc: 'Hub logistik dan pemasok cocopeat utama kami. Lokasi pelabuhan strategis Surabaya membuatnya ideal untuk ekspor komoditas.' },
            { name: 'Sumatera', desc: 'Kaya akan produksi cocoa dan kelapa. Geografi Sumatera yang beragam mendukung pembuatan cocopeat berkualitas tinggi.' },
        ],
        journeyEyebrow: 'Merangkul Keberlanjutan',
        journeyHeading: ['PERJALANAN KAMI', 'DARI PERTANIAN KE', 'PASAR GLOBAL'],
        journeyDesc: 'Di Naturra Extal, setiap komoditas yang kami perdagangkan melalui proses jaminan kualitas yang ketat. Dari seleksi hati-hati di tingkat pertanian, melalui pengeringan dan pengolahan yang tepat, hingga pemeriksaan kualitas akhir sebelum ekspor — kami memastikan setiap pengiriman memenuhi standar internasional.',
        processTitle: 'PROSES DARI PERTANIAN KE EKSPOR',
        processSubtitle: 'Rantai pasokan kami yang dikontrol kualitas memastikan komoditas premium di setiap langkah',
        steps: [
            { label: 'Pengadaan', desc: 'Kemitraan langsung dengan petani Indonesia di seluruh wilayah pertanian utama' },
            { label: 'Seleksi', desc: 'Penilaian kualitas yang ketat memastikan hanya komoditas premium yang dipilih' },
            { label: 'Pengolahan', desc: 'Pengeringan, pembersihan, dan pengolahan yang tepat sesuai standar internasional' },
            { label: 'Ekspor', desc: 'Pengemasan yang telah diperiksa kualitasnya dan pengiriman global dengan dokumentasi lengkap' },
        ],
        contactCompany: 'Perusahaan', contactContact: 'Kontak', contactFollow: 'Ikuti Kami',
    },
    en: {
        metaTitle: 'About Us | CV Naturra Extal International',
        metaDesc: 'Learn about CV Naturra Extal International — Indonesian agricultural commodity trading company specializing in cocoa, cloves and cocopeat.',
        eyebrow: 'About Us',
        heroDesc: 'CV Naturra Extal International is an Indonesian commodity trading company that bridges the gap between Indonesia\'s rich agricultural heritage and the global market. We specialize in sourcing premium cocoa, cloves (cengkeh), and cocopeat directly from Indonesian farmers — ensuring quality, sustainability, and fair trade practices from farm to export.',
        sourcedTitle: 'SOURCED DIRECTLY FROM THE FARMERS',
        sourcedDesc: 'Indonesia is the third-largest cocoa producer in the world and home to some of the finest cloves and coconut products. At Naturra Extal, we work directly with farming communities across the Indonesian archipelago, cutting out middlemen to ensure farmers receive fair compensation while our clients receive the highest quality commodities at competitive prices.',
        diversityTitle: 'INDONESIA COMMODITY DIVERSITY',
        diversitySubtitle: 'Our sourcing network spans across Indonesia\'s key agricultural regions',
        regions: [
            { name: 'Sulawesi', desc: 'Indonesia\'s largest cocoa-producing region, responsible for over 60% of national cocoa output. Sulawesi cocoa is known for its distinct flavor profile with mild acidity and rich chocolate notes.' },
            { name: 'East Java', desc: 'Home to premium cocoa estates and major processing facilities. East Java also serves as our cocopeat sourcing hub.' },
            { name: 'Maluku', desc: 'The legendary Spice Islands — birthplace of the global clove trade. Maluku cloves are prized worldwide for their exceptional essential oil content.' },
            { name: 'North Sulawesi', desc: 'A significant cocoa and clove producing region with ideal climate conditions. The volcanic soil enriches the flavor profiles of commodities grown here.' },
            { name: 'Surabaya', desc: 'Our key logistics and cocopeat supplier hub. Surabaya\'s strategic port location makes it ideal for commodity processing and export operations.' },
            { name: 'Sumatra', desc: 'Rich in both cocoa and coconut production. Sumatra\'s diverse geography supports high-quality cocopeat manufacturing and artisanal cocoa farming.' },
        ],
        journeyEyebrow: 'Embracing Sustainability',
        journeyHeading: ['OUR JOURNEY', 'FROM FARM TO', 'GLOBAL MARKET'],
        journeyDesc: 'At Naturra Extal, every commodity we trade goes through a rigorous quality assurance process. From careful selection at the farm level, through proper drying and processing, to final quality checks before export — we ensure that every shipment meets international standards.',
        processTitle: 'FARM TO EXPORT PROCESS',
        processSubtitle: 'Our quality-controlled supply chain ensures premium commodities at every step',
        steps: [
            { label: 'Sourcing', desc: 'Direct partnerships with Indonesian farmers across key agricultural regions' },
            { label: 'Selection', desc: 'Rigorous quality grading and selection ensuring only premium commodities' },
            { label: 'Processing', desc: 'Proper drying, cleaning, and processing following international standards' },
            { label: 'Export', desc: 'Quality-checked packaging and global shipping with full documentation' },
        ],
        contactCompany: 'Company', contactContact: 'Contact', contactFollow: 'Follow Us',
    },
    ar: {
        metaTitle: 'من نحن | CV Naturra Extal International',
        metaDesc: 'تعرف على CV Naturra Extal International — شركة تجارة سلع زراعية إندونيسية متخصصة في الكاكاو والقرنفل وجوز الهند.',
        eyebrow: 'من نحن',
        heroDesc: 'CV Naturra Extal International شركة تجارة سلع إندونيسية تجسر الفجوة بين الإرث الزراعي الغني لإندونيسيا والسوق العالمية. نتخصص في تزويد الكاكاو الفاخر والقرنفل (cengkeh) وجوز الهند مباشرة من المزارعين الإندونيسيين.',
        sourcedTitle: 'مُوَرَّد مباشرةً من المزارعين',
        sourcedDesc: 'إندونيسيا ثالث أكبر منتج للكاكاو في العالم. في Naturra Extal نعمل مع مجتمعات المزارعين مباشرةً عبر الأرخبيل الإندونيسي، مما يضمن للمزارعين عائداً عادلاً وللعملاء أعلى جودة بأسعار تنافسية.',
        diversityTitle: 'تنوع السلع الإندونيسية',
        diversitySubtitle: 'تمتد شبكة توريدنا عبر مناطق زراعية رئيسية في إندونيسيا',
        regions: [
            { name: 'سولاويزي', desc: 'أكبر منطقة منتجة للكاكاو في إندونيسيا، وتتميز بنكهة فريدة وحموضة خفيفة ونكهة شوكولاتة غنية.' },
            { name: 'جاوة الشرقية', desc: 'موطن مزارع الكاكاو الفاخرة ومرافق المعالجة الرئيسية، وهي أيضاً مركز توريد جوز الهند لدينا.' },
            { name: 'ملوكو', desc: 'جزر التوابل الأسطورية — مهد تجارة القرنفل العالمية. يُقدَّر قرنفل ملوكو لمحتواه العالي من الزيوت الأساسية.' },
            { name: 'شمال سولاويزي', desc: 'منطقة مهمة لإنتاج الكاكاو والقرنفل. تثري التربة البركانية نكهات السلع المزروعة هنا.' },
            { name: 'سورابايا', desc: 'مركز لوجستي رئيسي لدينا. يجعل موقع ميناء سورابايا الاستراتيجي منها مثاليةً لعمليات التصدير.' },
            { name: 'سومطرة', desc: 'غنية بإنتاج الكاكاو وجوز الهند. تدعم جغرافية سومطرة المتنوعة تصنيع جوز الهند عالي الجودة.' },
        ],
        journeyEyebrow: 'نحتضن الاستدامة',
        journeyHeading: ['رحلتنا', 'من المزرعة إلى', 'السوق العالمية'],
        journeyDesc: 'في Naturra Extal، يمر كل سلعة نتداولها بعملية ضمان جودة صارمة. من الاختيار الدقيق على مستوى المزرعة، مروراً بالتجفيف والمعالجة الصحيحة، وصولاً إلى فحوصات الجودة النهائية قبل التصدير.',
        processTitle: 'عملية من المزرعة إلى التصدير',
        processSubtitle: 'تضمن سلسلة التوريد المُحكمة منتجاتٍ متميزة في كل خطوة',
        steps: [
            { label: 'التوريد', desc: 'شراكات مباشرة مع المزارعين الإندونيسيين عبر المناطق الزراعية الرئيسية' },
            { label: 'الانتقاء', desc: 'تصنيف وانتقاء دقيق للجودة يضمن اختيار السلع الفاخرة فحسب' },
            { label: 'المعالجة', desc: 'تجفيف وتنظيف ومعالجة صحيحة وفق المعايير الدولية' },
            { label: 'التصدير', desc: 'تغليف مضمون الجودة وشحن عالمي بتوثيق كامل' },
        ],
        contactCompany: 'الشركة', contactContact: 'اتصل بنا', contactFollow: 'تابعنا',
    },
    zh: {
        metaTitle: '关于我们 | CV Naturra Extal International',
        metaDesc: '了解 CV Naturra Extal International — 印度尼西亚农业商品贸易公司，专注于可可、丁香和椰糠。',
        eyebrow: '关于我们',
        heroDesc: 'CV Naturra Extal International 是一家印度尼西亚商品贸易公司，连接印尼丰富的农业资源与全球市场。我们专注于直接向印尼农民采购优质可可、丁香和椰糠，确保从农场到出口的全程质量、可持续性与公平贸易。',
        sourcedTitle: '直接从农民处采购',
        sourcedDesc: '印度尼西亚是全球第三大可可生产国，也是优质丁香和椰糠产品的主要产地。Naturra Extal 直接与印尼各地的农民合作，省去中间商，确保农民获得公平报酬，同时客户以具竞争力的价格获得最高品质的商品。',
        diversityTitle: '印度尼西亚商品多样性',
        diversitySubtitle: '我们的采购网络覆盖印度尼西亚各主要农业产区',
        regions: [
            { name: '苏拉威西', desc: '印度尼西亚最大的可可产区，占全国可可产量的60%以上，以独特的口感和醇厚的巧克力风味著称。' },
            { name: '东爪哇', desc: '优质可可庄园和主要加工设施的所在地，同时也是我们的椰糠主要采购基地。' },
            { name: '马鲁古', desc: '传奇香料群岛——全球丁香贸易的发源地。马鲁古丁香因其卓越的精油含量而享誉全球。' },
            { name: '北苏拉威西', desc: '重要的可可和丁香产区，气候条件得天独厚。火山土壤赋予当地商品独特的风味特征。' },
            { name: '泗水', desc: '我们的核心物流和椰糠供应枢纽。泗水的战略性港口位置使其成为商品处理和出口的理想之地。' },
            { name: '苏门答腊', desc: '可可和椰子产量丰富，多样的地理条件支持高质量椰糠生产和精品可可农业。' },
        ],
        journeyEyebrow: '践行可持续发展',
        journeyHeading: ['我们的旅程', '从农场到', '全球市场'],
        journeyDesc: '在 Naturra Extal，我们交易的每种商品都经过严格的质量保证流程。从农场层面的精心挑选、适当的干燥和加工处理，到出口前的最终质量检查——我们确保每批货物符合国际标准。',
        processTitle: '从农场到出口的流程',
        processSubtitle: '我们严格的质量控制供应链确保每一步都提供优质商品',
        steps: [
            { label: '采购', desc: '与印度尼西亚主要农业产区的农民直接建立合作伙伴关系' },
            { label: '精选', desc: '严格的质量分级和筛选，确保只有优质商品通过' },
            { label: '加工', desc: '按照国际标准进行适当的干燥、清洁和加工处理' },
            { label: '出口', desc: '经质量检验的包装和全文件记录的全球运输服务' },
        ],
        contactCompany: '公司', contactContact: '联系我们', contactFollow: '关注我们',
    },
    ja: {
        metaTitle: '会社概要 | CV Naturra Extal International',
        metaDesc: 'CV Naturra Extal Internationalについて — ココア、クローブ、ヤシ繊維を専門とするインドネシアの農産物商社。',
        eyebrow: '会社概要',
        heroDesc: 'CV Naturra Extal Internationalは、インドネシアの豊かな農業遺産と世界市場を結ぶ商社です。インドネシアの農家から直接、プレミアムカカオ、クローブ（丁子）、ヤシ繊維（ココピート）を調達し、農場から輸出まで品質・持続可能性・公正取引を確保しています。',
        sourcedTitle: '農家から直接調達',
        sourcedDesc: 'インドネシアは世界第3位のカカオ生産国であり、最高品質のクローブやココナッツ製品の産地でもあります。Naturra Extalはインドネシア全域の農家と直接連携し、中間業者を排除することで農家への公正な報酬と、クライアントへの最高品質の商品を競争力ある価格で実現しています。',
        diversityTitle: 'インドネシア産品の多様性',
        diversitySubtitle: '私たちの調達ネットワークはインドネシアの主要農業地域全体に広がっています',
        regions: [
            { name: 'スラウェシ', desc: 'インドネシア最大のカカオ産地で、全国生産量の60%以上を占めます。スラウェシ産カカオは柔らかな酸味とリッチなコクが国際市場で高く評価されています。' },
            { name: '東ジャワ', desc: '高品質なカカオ農園と主要加工施設が集まる地域。ココピートの主要調達拠点でもあります。' },
            { name: 'マルク', desc: '伝説のスパイス諸島——世界のクローブ貿易発祥の地。マルク産クローブは精油含有量の高さと芳醇な香りで世界中から珍重されています。' },
            { name: '北スラウェシ', desc: 'カカオとクローブの重要産地で、理想的な気候条件を誇ります。火山性土壌が商品の独特な風味を育みます。' },
            { name: 'スラバヤ', desc: '当社の主要物流・ココピート供給拠点。戦略的な港湾位置が輸出オペレーションに最適です。' },
            { name: 'スマトラ', desc: 'カカオとココナッツの産地として豊かな多様な地形が高品質ココピート生産と職人的カカオ栽培を支えています。' },
        ],
        journeyEyebrow: '持続可能性への取り組み',
        journeyHeading: ['私たちの歩み', '農場から', '世界市場へ'],
        journeyDesc: 'Naturra Extalでは、すべての取引において厳格な品質保証プロセスを経ています。農場での丁寧な選別から適切な乾燥・加工処理、輸出前の最終品質検査まで、あらゆる出荷が国際基準を満たすよう取り組んでいます。',
        processTitle: '農場から輸出までのプロセス',
        processSubtitle: '品質管理されたサプライチェーンがすべての段階でプレミアム商品を保証します',
        steps: [
            { label: '調達', desc: '主要農業地域のインドネシア農家との直接パートナーシップ' },
            { label: '選別', desc: 'プレミアム商品のみを確保する厳格な品質グレーディングと選別' },
            { label: '加工', desc: '国際標準に従った適切な乾燥・洗浄・加工処理' },
            { label: '輸出', desc: '品質検査済みパッケージングと完全な書類を備えたグローバル輸送' },
        ],
        contactCompany: '会社情報', contactContact: 'お問い合わせ', contactFollow: 'フォローする',
    },
    es: {
        metaTitle: 'Sobre Nosotros | CV Naturra Extal International',
        metaDesc: 'Conozca CV Naturra Extal International — empresa de comercio de materias primas agrícolas de Indonesia especializada en cacao, clavo y cocopeat.',
        eyebrow: 'Sobre Nosotros',
        heroDesc: 'CV Naturra Extal International es una empresa comercializadora de materias primas de Indonesia que conecta el rico patrimonio agrícola del país con el mercado global. Nos especializamos en el abastecimiento de cacao premium, clavo (cengkeh) y cocopeat directamente de agricultores indonesios.',
        sourcedTitle: 'ORIGEN DIRECTO DEL AGRICULTOR',
        sourcedDesc: 'Indonesia es el tercer mayor productor de cacao del mundo. En Naturra Extal trabajamos directamente con comunidades agrícolas en todo el archipiélago indonesio, eliminando intermediarios para garantizar una compensación justa a los agricultores y la más alta calidad para nuestros clientes.',
        diversityTitle: 'DIVERSIDAD DE MATERIAS PRIMAS INDONESIAS',
        diversitySubtitle: 'Nuestra red de abastecimiento abarca las principales regiones agrícolas de Indonesia',
        regions: [
            { name: 'Sulawesi', desc: 'La mayor región productora de cacao de Indonesia, responsable de más del 60% de la producción nacional, con un perfil de sabor diferenciado.' },
            { name: 'Java Oriental', desc: 'Sede de las principales fincas de cacao y plantas de procesamiento. También es nuestro principal centro de cocopeat.' },
            { name: 'Maluku', desc: 'Las legendarias Islas de las Especias — cuna del comercio mundial del clavo. El clavo de Maluku es apreciado en todo el mundo por su extraordinario contenido de aceite esencial.' },
            { name: 'Sulawesi del Norte', desc: 'Región productora de cacao y clavo de gran relevancia. El suelo volcánico enriquece los perfiles de sabor de los cultivos.' },
            { name: 'Surabaya', desc: 'Nuestro hub logístico y de cocopeat. La ubicación estratégica del puerto de Surabaya la hace ideal para las exportaciones.' },
            { name: 'Sumatra', desc: 'Rica en producción de cacao y coco. La diversa geografía de Sumatra sostiene una manufactura de cocopeat de alta calidad.' },
        ],
        journeyEyebrow: 'Comprometidos con la Sostenibilidad',
        journeyHeading: ['NUESTRO VIAJE', 'DEL CAMPO AL', 'MERCADO GLOBAL'],
        journeyDesc: 'En Naturra Extal, cada materia prima que comercializamos pasa por un riguroso proceso de aseguramiento de la calidad. Desde la selección cuidadosa en la finca hasta los controles finales antes de la exportación.',
        processTitle: 'PROCESO DEL CAMPO A LA EXPORTACIÓN',
        processSubtitle: 'Nuestra cadena de suministro controlada garantiza materias primas premium en cada paso',
        steps: [
            { label: 'Abastecimiento', desc: 'Alianzas directas con agricultores indonesios en las principales regiones agrícolas' },
            { label: 'Selección', desc: 'Clasificación y selección rigurosa para asegurar solo materias primas premium' },
            { label: 'Procesamiento', desc: 'Secado, limpieza y procesamiento según estándares internacionales' },
            { label: 'Exportación', desc: 'Embalaje con control de calidad y envíos globales con documentación completa' },
        ],
        contactCompany: 'Empresa', contactContact: 'Contacto', contactFollow: 'Síguenos',
    },
    fr: {
        metaTitle: 'À propos | CV Naturra Extal International',
        metaDesc: 'Découvrez CV Naturra Extal International — entreprise indonésienne de négoce de matières premières agricoles spécialisée dans le cacao, les clous de girofle et le cocopeat.',
        eyebrow: 'À propos de nous',
        heroDesc: 'CV Naturra Extal International est une société de négoce de matières premières en Indonésie qui fait le lien entre le riche patrimoine agricole du pays et le marché mondial. Nous nous spécialisons dans l\'approvisionnement direct de cacao premium, de clous de girofle et de cocopeat auprès des agriculteurs indonésiens.',
        sourcedTitle: 'APPROVISIONNEMENT DIRECT AUPRÈS DES AGRICULTEURS',
        sourcedDesc: 'L\'Indonésie est le troisième producteur mondial de cacao. Chez Naturra Extal, nous travaillons directement avec les communautés agricoles de tout l\'archipel indonésien, en éliminant les intermédiaires pour garantir une juste rémunération aux agriculteurs.',
        diversityTitle: 'DIVERSITÉ DES MATIÈRES PREMIÈRES INDONÉSIENNES',
        diversitySubtitle: 'Notre réseau d\'approvisionnement couvre les principales régions agricoles d\'Indonésie',
        regions: [
            { name: 'Sulawesi', desc: 'La plus grande région de production de cacao en Indonésie, avec plus de 60 % de la production nationale. Connue pour son profil de saveur distinctif.' },
            { name: 'Java Oriental', desc: 'Siège des principales plantations de cacao et installations de transformation. Aussi notre principal pôle d\'approvisionnement en cocopeat.' },
            { name: 'Moluques', desc: 'Les légendaires Îles aux Épices — berceau du commerce mondial des clous de girofle. Le girofle des Moluques est reconnu pour sa haute teneur en huile essentielle.' },
            { name: 'Sulawesi du Nord', desc: 'Région productrice importante de cacao et de girofle. Le sol volcanique enrichit les profils aromatiques des produits cultivés ici.' },
            { name: 'Surabaya', desc: 'Notre hub logistique et de cocopeat. La position portuaire stratégique de Surabaya la rend idéale pour les opérations d\'exportation.' },
            { name: 'Sumatra', desc: 'Riche en production de cacao et de noix de coco. La géographie diversifiée soutient une fabrication de cocopeat de haute qualité.' },
        ],
        journeyEyebrow: 'En faveur de la durabilité',
        journeyHeading: ['NOTRE VOYAGE', 'DE LA FERME AU', 'MARCHÉ MONDIAL'],
        journeyDesc: 'Chez Naturra Extal, chaque matière première que nous négocions passe par un processus rigoureux d\'assurance qualité. De la sélection soigneuse au niveau de la ferme jusqu\'aux contrôles de qualité finaux avant exportation.',
        processTitle: 'PROCESSUS DE LA FERME À L\'EXPORT',
        processSubtitle: 'Notre chaîne d\'approvisionnement contrôlée garantit des matières premières premium à chaque étape',
        steps: [
            { label: 'Approvisionnement', desc: 'Partenariats directs avec les agriculteurs indonésiens dans les principales régions agricoles' },
            { label: 'Sélection', desc: 'Tri et sélection rigoureux garantissant uniquement des matières premières premium' },
            { label: 'Traitement', desc: 'Séchage, nettoyage et traitement appropriés selon les normes internationales' },
            { label: 'Export', desc: 'Emballage contrôlé et expédition mondiale avec documentation complète' },
        ],
        contactCompany: 'Entreprise', contactContact: 'Contact', contactFollow: 'Suivez-nous',
    },
    ko: {
        metaTitle: '회사 소개 | CV Naturra Extal International',
        metaDesc: 'CV Naturra Extal International 소개 — 코코아, 정향, 코코피트를 전문으로 하는 인도네시아 농산물 거래 회사.',
        eyebrow: '회사 소개',
        heroDesc: 'CV Naturra Extal International은 인도네시아의 풍요로운 농업 유산과 글로벌 시장을 연결하는 인도네시아 원자재 무역 회사입니다. 인도네시아 농부들로부터 직접 프리미엄 코코아, 정향(cengkeh), 코코피트를 조달하며, 농장에서 수출에 이르기까지 품질과 지속 가능성, 공정 거래를 보장합니다.',
        sourcedTitle: '농부로부터 직접 조달',
        sourcedDesc: '인도네시아는 세계 3위의 코코아 생산국이자 최고품질의 정향 및 코코넛 제품 산지입니다. Naturra Extal은 인도네시아 전역의 농민 공동체와 직접 협력하여 중간 상인을 없애고, 농민에게는 공정한 보상을, 고객에게는 경쟁력 있는 가격의 최고 품질 원자재를 제공합니다.',
        diversityTitle: '인도네시아 원자재의 다양성',
        diversitySubtitle: '저희 조달 네트워크는 인도네시아의 주요 농업 지역에 걸쳐 있습니다',
        regions: [
            { name: '술라웨시', desc: '전국 코코아 생산량의 60% 이상을 차지하는 인도네시아 최대 코코아 산지. 은은한 산미와 풍부한 초콜릿 풍미로 유명합니다.' },
            { name: '동부 자바', desc: '프리미엄 코코아 농장과 주요 가공시설이 위치하며, 코코피트 조달의 주요 거점이기도 합니다.' },
            { name: '말루쿠', desc: '전설의 향신료 섬 — 세계 정향 무역의 발상지. 말루쿠 정향은 탁월한 에센셜 오일 함량으로 전 세계에서 귀하게 여깁니다.' },
            { name: '북부 술라웨시', desc: '코코아·정향 주산지로 이상적인 기후 조건을 보유합니다. 화산성 토양이 재배 원자재에 독특한 풍미를 더합니다.' },
            { name: '수라바야', desc: '핵심 물류 및 코코피트 공급 거점. 수라바야의 전략적 항구 위치는 수출 운영에 최적입니다.' },
            { name: '수마트라', desc: '코코아·코코넛 생산이 풍부하며, 고품질 코코피트 제조와 아티산 코코아 농업을 지원하는 다양한 지형을 갖추고 있습니다.' },
        ],
        journeyEyebrow: '지속 가능성을 실천하며',
        journeyHeading: ['우리의 여정', '농장에서', '글로벌 시장까지'],
        journeyDesc: 'Naturra Extal에서 거래하는 모든 원자재는 엄격한 품질 보증 절차를 거칩니다. 농장 단계의 신중한 선별부터 적절한 건조 및 가공, 수출 전 최종 품질 검사까지 — 모든 선적이 국제 기준을 충족하도록 보장합니다.',
        processTitle: '농장에서 수출까지의 프로세스',
        processSubtitle: '품질이 통제된 공급망으로 모든 단계에서 프리미엄 원자재를 보장합니다',
        steps: [
            { label: '조달', desc: '주요 농업 지역 인도네시아 농부들과의 직접 파트너십' },
            { label: '선별', desc: '프리미엄 원자재만을 확보하는 엄격한 품질 등급 분류 및 선별' },
            { label: '가공', desc: '국제 기준에 따른 적절한 건조, 세척 및 가공 처리' },
            { label: '수출', desc: '품질 검사된 포장 및 완전한 서류를 갖춘 글로벌 운송 서비스' },
        ],
        contactCompany: '회사', contactContact: '연락처', contactFollow: '팔로우하기',
    },
}

const NaturraAbout: React.FC = () => {
    const location = useLocation()
    const [language, setLanguage] = useState<LanguageCode>(() =>
        getCurrentLanguage(location.pathname, location.search)
    )

    useEffect(() => {
        const currentLang = getCurrentLanguage(location.pathname, location.search)
        if (currentLang !== language) setLanguage(currentLang)
    }, [location.pathname, location.search, language])

    useEffect(() => {
        const stored = getStoredLanguage()
        const urlLang = getCurrentLanguage(location.pathname, location.search)
        if (stored || urlLang !== 'en') return
        detectLanguageFromIP().then(ipLang => { if (ipLang && !getStoredLanguage()) setLanguage(ipLang) })
    }, [])

    const t = ABOUT_TRANSLATIONS[language] ?? ABOUT_TRANSLATIONS.en

    return (
        <div className="naturra-about">
            <Helmet>
                <title>{t.metaTitle}</title>
                <meta name="description" content={t.metaDesc} />
                <link rel="canonical" href="https://naturraextal.com/about" />
            </Helmet>

            <NaturraHeader />

            {/* HERO */}
            <section className="naturra-about__hero">
                <div className="naturra-about__hero-inner">
                    <span className="naturra-about__hero-eyebrow">{t.eyebrow}</span>
                    <h1 className="naturra-about__hero-title">Naturra Extal<br />International</h1>
                    <p className="naturra-about__hero-desc">{t.heroDesc}</p>
                </div>
            </section>

            {/* SOURCED FROM FARMERS */}
            <section className="naturra-about__sourcing">
                <div className="naturra-about__sourcing-inner">
                    <div className="naturra-about__sourcing-image">
                        <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80" alt="Indonesian farmers harvesting commodities" loading="lazy" />
                    </div>
                    <div className="naturra-about__sourcing-text">
                        <h2>{t.sourcedTitle}</h2>
                        <p>{t.sourcedDesc}</p>
                    </div>
                </div>
            </section>

            {/* COMMODITY DIVERSITY */}
            <section className="naturra-about__diversity">
                <div className="naturra-about__diversity-inner">
                    <h2 className="naturra-about__diversity-title">{t.diversityTitle}</h2>
                    <p className="naturra-about__diversity-subtitle">{t.diversitySubtitle}</p>
                    <div className="naturra-about__diversity-grid">
                        {t.regions.map((region) => (
                            <div key={region.name} className="naturra-about__diversity-card">
                                <h3>{region.name}</h3>
                                <p>{region.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="naturra-about__image-row">
                        <img src="https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80" alt="Cocoa beans drying" loading="lazy" />
                        <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80" alt="Indonesian spices and cloves" loading="lazy" />
                        <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80" alt="Agricultural landscape Indonesia" loading="lazy" />
                    </div>
                </div>
            </section>

            {/* OUR JOURNEY */}
            <section className="naturra-about__journey">
                <div className="naturra-about__journey-bg">
                    <img src="https://images.unsplash.com/photo-1559133967-313620786524?auto=format&fit=crop&q=80&w=1200" alt="Sustainable Indonesian agriculture" loading="lazy" />
                </div>
                <div className="naturra-about__journey-overlay" />
                <div className="naturra-about__journey-inner">
                    <div>
                        <span className="naturra-about__journey-title">{t.journeyEyebrow}</span>
                        <h2 className="naturra-about__journey-heading">
                            {t.journeyHeading[0]}<br />{t.journeyHeading[1]}<br />{t.journeyHeading[2]}
                        </h2>
                    </div>
                    <div>
                        <p className="naturra-about__journey-desc">{t.journeyDesc}</p>
                    </div>
                </div>
            </section>

            {/* PROCESS STEPS */}
            <section className="naturra-about__process">
                <div className="naturra-about__process-inner">
                    <h2 className="naturra-about__process-title">{t.processTitle}</h2>
                    <p className="naturra-about__process-subtitle">{t.processSubtitle}</p>
                    <div className="naturra-about__process-grid">
                        {t.steps.map((step, i) => (
                            <div key={i} className="naturra-about__process-step">
                                <div className="naturra-about__process-step-number">{i + 1}</div>
                                <h4>{step.label}</h4>
                                <p>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section className="naturra-about__contact">
                <div className="naturra-about__contact-inner">
                    <div className="naturra-about__contact-col">
                        <h4>{t.contactCompany}</h4>
                        <p>CV Naturra Extal International</p>
                        <p>Indonesia</p>
                    </div>
                    <div className="naturra-about__contact-col">
                        <h4>{t.contactContact}</h4>
                        <a href="mailto:naturraextal@gmail.com">naturraextal@gmail.com</a>
                        <a href="https://wa.me/628951395752" target="_blank" rel="noopener noreferrer">+62 895-1395-7752 (WhatsApp)</a>
                    </div>
                    <div className="naturra-about__contact-col">
                        <h4>{t.contactFollow}</h4>
                        <div className="naturra-about__contact-social">
                            <a href="https://wa.me/628951395752" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                            <a href="mailto:naturraextal@gmail.com">Email</a>
                        </div>
                    </div>
                </div>
            </section>

            <NaturraFooter />
        </div>
    )
}

export default NaturraAbout
