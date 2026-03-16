import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import AnnouncementBar from '../components/AnnouncementBar'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import heroImage from '../assets/main-hero-image.webp'
import projectVideo from '../assets/meja-makan-industrial.mp4'
import experienceImage from '../assets/Hollowline-Display-Rack.webp'
import collaborationImage from '../assets/Meja-Kerja-Rak-Meja-Belajar-custom.webp'
import flexibilityImage from '../assets/Kabinet-Industrial-Dapur.webp'
import scaleImage from '../assets/Meja-makan-industrial-150x60x90-2 kursi.webp'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import './NaturraPartnership.css'

const PARTNERSHIP_TRANSLATIONS: Record<
  LanguageCode,
  {
    pageTitle: string
    metaDescription: string
    metaKeywords: string
    heroTitle: string
    mainTitle: string
    mainParagraphs: string[]
    experienceTitle: string
    experienceParagraphs: string[]
    collaborationTitle: string
    collaborationSubtitle: string
    collaborationParagraphs: string[]
    flexibilityTitle: string
    flexibilityParagraphs: string[]
    scaleTitle: string
    scaleDescription: string
    scaleQuestion: string
    ctaTitle: string
    ctaDescription: string
    ctaButton: string
    contactTitle: string
  }
> = {
  id: {
    pageTitle: `Partnership Program Furniture Industrial: Kontraktor, Desainer, Developer - Naturra Extal`,
    metaDescription: `Bagaimana cara kerja sama dengan Naturra Extal untuk project furniture? Program partnership untuk kontraktor, interior designer, property developer, hotel chain. Keuntungan partnership: Volume pricing hingga 20% discount, dedicated project manager, priority production, 3D rendering gratis, technical support on-site, invoice termin fleksibel. Pengalaman handling project hotel 100+ kamar, restoran chain 10+ outlet, mall tenant 50+ unit. Syarat partnership minimum project Rp 50 juta atau 5+ project/tahun.`,
    metaKeywords: `partnership furniture bekasi, kerja sama furniture industrial, program mitra furniture bekasi, diskon volume furniture bekasi, kontraktor furniture partner, interior designer furniture supplier, developer furniture bekasi, pengadaan furniture hotel bekasi, furniture project besar bekasi, supplier furniture kontraktor, mitra furniture restoran chain, furniture mall tenant bekasi`,
    heroTitle: `Kerja Sama`,
    mainTitle: `Setiap proyek punya cerita sendiri`,
    mainParagraphs: [
      `Baik itu pengadaan furnitur hotel, vila, restoran, atau rumah tinggal - yang dibutuhkan bukan hanya produk, tapi mitra kerja yang bisa dipercaya. Naturra Extal hadir bukan sebagai penjual, tapi sebagai bagian dari tim Anda.`,
      `Kami mengerti bahwa sebuah proyek berarti tenggat, spesifikasi ketat, revisi mendadak, dan harapan yang tinggi. Anda butuh rekan yang bisa mengakomodasi, bukan menambah kerumitan. Yang bisa mendengar, bukan hanya menjawab.`
    ],
    experienceTitle: `Pengalaman Jadi Nilai Tambah`,
    experienceParagraphs: [
      `Kami sudah terbiasa ikut dalam banyak skema proyek - dari apartemen di tengah kota, resor di pinggir pantai, hingga pengadaan ruang publik. Setiap klien membawa tantangan berbeda. Justru itu yang membuat kami terlatih, bukan sekadar ahli membuat furnitur, tapi juga memahami dinamika proyeknya.`,
      `Mulai dari proses penyesuaian desain, pemilihan material, hingga skema pengiriman bertahap, semuanya bisa dikomunikasikan. Anda tidak perlu menjelaskan dua kali. Kami tahu bagaimana menyusun alur kerja yang efisien.`
    ],
    collaborationTitle: `Bukan Sekadar Produksi, Tapi Kolaborasi`,
    collaborationSubtitle: `Kontraktor Mebel`,
    collaborationParagraphs: [
      `Kami percaya, keberhasilan proyek bukan dari banyaknya item yang diproduksi, tapi dari seberapa tepat kami mengeksekusi ide Anda. Ada klien yang datang dengan moodboard, ada yang cuma kirim foto, bahkan ada yang hanya bilang: "Saya butuh nuansa tropis, hangat, tapi tetap elegan."`,
      `Semua bisa dibicarakan. Tim kami terbuka untuk berdiskusi dari awal. Anda bisa menyampaikan keperluan khusus: ukuran ruang, batasan anggaran, gaya desain interior, atau detail konstruksi.`,
      `Kami akan bantu merumuskan solusi. Bukan dengan kata-kata manis, tapi dengan sketsa, perhitungan material dan prototipe bila dibutuhkan. Semuanya jelas dan terukur.`
    ],
    flexibilityTitle: `Tahu Kapan Harus Cepat, Tahu Kapan Harus Teliti`,
    flexibilityParagraphs: [
      `Beberapa klien butuh cepat. Ada yang menginginkan tahap pengiriman per zona. Ada pula yang meminta penyesuaian produksi berdasarkan hasil site inspection. Semua itu masuk akal dan bisa dibicarakan.`,
      `Kami tidak menawarkan paket seragam untuk semua proyek. Anda bisa memilih. Mau fokus pada kayu solid dengan sentuhan handmade? Atau kombinasi antara efisiensi produksi dan detail artistik? Kami bantu wujudkan.`
    ],
    scaleTitle: `Proyek Besar atau Kecil, Sama-Sama Serius`,
    scaleDescription: `Pernah mengerjakan ratusan unit dalam satu waktu. Pernah juga hanya buat satu set kursi untuk area tamu privat. Skala bukan penentu. Yang penting: apakah proyek Anda berarti?`,
    scaleQuestion: `Bila jawabannya ya, mari kita bicarakan lebih lanjut.`,
    ctaTitle: `Siap Bahas Proyek Anda?`,
    ctaDescription: `Ceritakan kebutuhan proyek Anda sekarang. Kirimkan gambar, denah, atau referensi, dan kami akan bantu merumuskannya jadi langkah nyata.`,
    ctaButton: `Hubungi kami sekarang`,
    contactTitle: `Temukan Kami`
  },
  en: {
    pageTitle: `Industrial Furniture Partnership Program: Contractors, Designers, Developers - Naturra Extal`,
    metaDescription: `How to partner with Naturra Extal for furniture projects? Partnership program for contractors, interior designers, property developers, hotel chains. Partnership benefits: Volume pricing up to 20% discount, dedicated project manager, priority production, free 3D rendering, on-site technical support, flexible payment terms. Experience handling 100+ room hotel projects, 10+ outlet restaurant chains, 50+ mall tenant units. Partnership requirements: minimum Rp 50 million project or 5+ projects/year.`,
    metaKeywords: `furniture partnership bekasi, industrial furniture collaboration, furniture contractor bekasi, interior designer furniture supplier, developer furniture partnership, hotel furniture procurement, commercial furniture supplier`,
    heroTitle: `Partnership`,
    mainTitle: `Every project has its own story`,
    mainParagraphs: [
      `Whether it's hotel, villa, restaurant, or residential furniture procurement - what's needed is not just products, but a trusted work partner. Naturra Extal is here not as a seller, but as part of your team.`,
      `We understand that a project means deadlines, strict specifications, sudden revisions, and high expectations. You need a partner who can accommodate, not add complexity. Who can listen, not just answer.`
    ],
    experienceTitle: `Experience Becomes Added Value`,
    experienceParagraphs: [
      `We're already accustomed to participating in many project schemes - from apartments in the city center, resorts on the beach, to public space procurement. Each client brings different challenges. That's exactly what makes us trained, not just experts at making furniture, but also understanding project dynamics.`,
      `From the design adjustment process, material selection, to phased delivery schemes, everything can be communicated. You don't need to explain twice. We know how to organize efficient workflows.`
    ],
    collaborationTitle: `Not Just Production, But Collaboration`,
    collaborationSubtitle: `Furniture Contractor`,
    collaborationParagraphs: [
      `We believe project success is not from the number of items produced, but from how precisely we execute your ideas. Some clients come with moodboards, some just send photos, even some just say: "I need a tropical, warm, yet elegant atmosphere."`,
      `Everything can be discussed. Our team is open to discussion from the start. You can convey special needs: room dimensions, budget constraints, interior design style, or construction details.`,
      `We'll help formulate solutions. Not with sweet words, but with sketches, material calculations and prototypes when needed. Everything is clear and measurable.`
    ],
    flexibilityTitle: `Know When to Be Fast, Know When to Be Careful`,
    flexibilityParagraphs: [
      `Some clients need speed. Some want phased delivery per zone. Others request production adjustments based on site inspection results. All of that makes sense and can be discussed.`,
      `We don't offer uniform packages for all projects. You can choose. Want to focus on solid wood with handmade touches? Or a combination of production efficiency and artistic details? We'll help make it happen.`
    ],
    scaleTitle: `Large or Small Projects, Both Taken Seriously`,
    scaleDescription: `We've worked on hundreds of units at once. We've also made just one set of chairs for a private guest area. Scale is not the determining factor. What matters: does your project matter?`,
    scaleQuestion: `If the answer is yes, let's discuss further.`,
    ctaTitle: `Ready to Discuss Your Project?`,
    ctaDescription: `Tell us about your project needs now. Send images, floor plans, or references, and we'll help formulate them into concrete steps.`,
    ctaButton: `Contact us now`,
    contactTitle: `Find Us`
  },
  ar: {
    pageTitle: `برنامج الشراكة للأثاث الصناعي: المقاولون والمصممون والمطورون - Naturra Extal`,
    metaDescription: `كيف تتعاون مع Naturra Extal في مشاريع الأثاث؟ برنامج شراكة للمقاولين، مصممي الديكور الداخلي، مطوري العقارات، سلاسل الفنادق. مزايا الشراكة: تسعير بالجملة حتى خصم 20٪، مدير مشروع مخصص، أولوية في الإنتاج، تصميمات ثلاثية الأبعاد مجانية، دعم فني ميداني، شروط دفع مرنة. خبرة في إدارة مشروعات فنادق أكثر من 100 غرفة، سلاسل مطاعم تتجاوز 10 فروع، 50 متجرًا في مراكز التسوق. متطلبات الشراكة: مشروع بحد أدنى 50 مليون روبية أو أكثر من 5 مشاريع في السنة.`,
    metaKeywords: `شراكة أثاث بيكاسي، أثاث صناعي للمقاولين، مورد أثاث للمصممين الداخليين، تطوير أثاث للفنادق، مورد أثاث تجاري`,
    heroTitle: `الشراكة`,
    mainTitle: `لكل مشروع قصته الخاصة`,
    mainParagraphs: [
      `سواء كان الأمر يتعلق بتوريد أثاث لفندق أو فيلا أو مطعم أو منزل، فإن ما تحتاجه ليس المنتجات فقط، بل شريك عمل موثوقاً. Naturra Extal موجودة ليس كبائع، بل كجزء من فريقك.`,
      `ندرك أن المشروع يعني مواعيد نهائية، ومواصفات صارمة، وتعديلات مفاجئة، وتوقعات مرتفعة. أنت بحاجة إلى شريك يستطيع الاستجابة، لا أن يزيد التعقيد. من يستمع إليك، لا من يجيب فقط.`
    ],
    experienceTitle: `الخبرة تمنح قيمة مضافة`,
    experienceParagraphs: [
      `اعتدنا المشاركة في أنواع عديدة من المشاريع – من شقق وسط المدينة إلى المنتجعات الشاطئية وحتى تجهيز المساحات العامة. كل عميل يجلب تحديات مختلفة، وهذا ما جعلنا متمرسين؛ ليس فقط في صنع الأثاث، بل في فهم ديناميكيات المشروع كذلك.`,
      `بدءاً من عملية تعديل التصميم واختيار المواد وحتى جداول التسليم المرحلي، كل شيء قابل للنقاش. لن تحتاج إلى شرح الأمور مرتين، فنحن نعرف كيف نبني سير عمل فعّال.`
    ],
    collaborationTitle: `ليست مجرد صناعة، بل شراكة حقيقية`,
    collaborationSubtitle: `مقاولو الأثاث`,
    collaborationParagraphs: [
      `نؤمن أن نجاح المشروع لا يعتمد على عدد القطع المنتجة، بل على مدى دقة تنفيذ أفكارك. بعض العملاء يأتون بلوحة مزاجية، وآخرون يرسلون صوراً فقط، وهناك من يقول ببساطة: "أريد أجواءً استوائية دافئة لكن أنيقة."`,
      `كل ذلك محل نقاش. فريقنا منفتح على الحوار منذ البداية. يمكنك مشاركة احتياجاتك الخاصة: مقاسات المساحة، حدود الميزانية، أسلوب التصميم الداخلي، أو التفاصيل الإنشائية.`,
      `سنساعدك في صياغة الحلول؛ ليس بكلمات منمقة، بل برسومات، وحسابات مواد، ونماذج أولية عند الحاجة. كل شيء واضح وقابل للقياس.`
    ],
    flexibilityTitle: `نعرف متى يجب الإسراع، ومتى يجب التدقيق`,
    flexibilityParagraphs: [
      `بعض العملاء يحتاجون السرعة. آخرون يفضلون جدول تسليم حسب المناطق. وهناك من يطلب تعديل الإنتاج بناء على نتائج معاينة الموقع. كل ذلك منطقي وقابل للنقاش.`,
      `لا نقدّم حزمة واحدة لكل المشاريع. لديك حرية الاختيار. هل تريد التركيز على الخشب الصلب بلمسات يدوية؟ أم مزيجاً بين كفاءة الإنتاج والتفاصيل الفنية؟ سنساعدك على تحقيق ما تريد.`
    ],
    scaleTitle: `المشاريع الكبيرة أو الصغيرة نتعامل معها بالجدية نفسها`,
    scaleDescription: `عملنا على مئات الوحدات في آن واحد، كما صنعنا مجموعة كراسي واحدة لمساحة استقبال خاصة. الحجم ليس معياراً؛ المهم هو قيمة مشروعك.`,
    scaleQuestion: `إذا كانت الإجابة نعم، فلنبدأ الحديث بتفاصيل أكبر.`,
    ctaTitle: `هل أنت مستعد لبحث مشروعك؟`,
    ctaDescription: `أخبرنا باحتياجات مشروعك الآن. أرسل الصور أو المخططات أو المراجع، وسنساعدك على تحويلها إلى خطوات ملموسة.`,
    ctaButton: `تواصل معنا الآن`,
    contactTitle: `اعثر علينا`
  },
  zh: {
    pageTitle: `工业家具合作计划：承包商、设计师、开发商 - Naturra Extal`,
    metaDescription: `如何与 Naturra Extal 合作开展家具项目？针对承包商、室内设计师、房地产开发商和酒店集团的合作计划。合作优势：批量价格最高优惠 20%，专属项目经理，优先生产，免费 3D 渲染，现场技术支持，灵活的付款条件。拥有处理 100+ 间客房酒店项目、10+ 家餐饮连锁、50+ 家商场店铺的经验。合作要求：单个项目不少于 5,000 万印尼盾或每年 5 个以上项目。`,
    metaKeywords: `家具合作 Bekasi，工业风家具供应商，设计师家具合作，酒店家具采购，商业家具定制`,
    heroTitle: `合作计划`,
    mainTitle: `每一个项目都有自己的故事`,
    mainParagraphs: [
      `无论是酒店、别墅、餐厅还是住宅的家具采购，所需要的不仅是产品，更是可信赖的合作伙伴。Naturra Extal 不只是卖方，而是您团队的一员。`,
      `我们明白项目意味着紧迫的截止日期、严格的规格、临时的变更以及高标准的期望。您需要的是能够配合的伙伴，而不是增加复杂度的人，愿意倾听，而不仅仅是回应。`
    ],
    experienceTitle: `经验带来附加价值`,
    experienceParagraphs: [
      `我们习惯参与各种项目——从市中心公寓、海滨度假村到公共空间建设。每位客户都会带来不同的挑战，这让我们更加熟练，不仅擅长制作家具，也懂得项目的节奏。`,
      `从设计调整、材料选择到分阶段交付，所有流程都可以沟通。您无需反复说明，我们知道如何安排高效的工作流程。`
    ],
    collaborationTitle: `不仅是生产，更是协作`,
    collaborationSubtitle: `家具承包伙伴`,
    collaborationParagraphs: [
      `我们相信，项目的成功不取决于生产多少件家具，而在于我们能多精准地实现您的想法。有的客户带来情绪板，有的只发一张照片，甚至有人只说：“我想要热带、温暖又优雅的氛围。”`,
      `这些都可以讨论。我们的团队从一开始就乐于沟通。您可以告诉我们特殊需求：空间尺寸、预算限制、室内风格、结构细节等。`,
      `我们会帮助您制定方案；不是空洞的承诺，而是提供草图、材料计算，必要时还有样品。所有内容清晰且可衡量。`
    ],
    flexibilityTitle: `懂得何时加速，也懂得何时细致`,
    flexibilityParagraphs: [
      `有些客户需要快速交付，有些希望按区域分批发送，也有人根据现场勘查结果提出生产调整。我们都能理解并配合。`,
      `我们不会用一套方案套所有项目。您可以自行选择：是强调带有手工触感的实木，还是想兼顾效率与美感？我们都能帮您达成。`
    ],
    scaleTitle: `无论项目大小，我们同样重视`,
    scaleDescription: `我们曾在同一时间完成数百件产品，也曾只为私人接待区制作一套椅子。规模不是重点，重点在于这个项目对您是否重要。`,
    scaleQuestion: `如果答案是肯定的，那就让我们继续深入讨论。`,
    ctaTitle: `准备好讨论您的项目了吗？`,
    ctaDescription: `现在就告诉我们您的需求。发送图片、平面图或任何参考，我们会帮您把它们转化为切实的执行计划。`,
    ctaButton: `立即联系我们`,
    contactTitle: `联系我们`
  },
  ja: {
    pageTitle: `工業系家具パートナーシッププログラム：施工会社・デザイナー・デベロッパー向け - Naturra Extal`,
    metaDescription: `Naturra Extal と家具プロジェクトで協業する方法は？施工会社、インテリアデザイナー、開発会社、ホテルチェーン向けのパートナーシッププログラム。特典：最大 20% のボリューム割引、専任プロジェクトマネージャー、優先生産、無料 3D レンダリング、現場での技術サポート、柔軟な支払い条件。100 室規模のホテル案件や 10 店以上の飲食チェーン、50 以上のモールテナントを担当した実績。条件：最低 5,000 万ルピアの案件または年間 5 件以上のプロジェクト。`,
    metaKeywords: `家具 パートナーシップ ベカシ, 工業系家具 施工会社, インテリアデザイナー 家具サプライヤー, ホテル家具 調達, 商業用家具 カスタム`,
    heroTitle: `パートナーシップ`,
    mainTitle: `プロジェクトごとに物語があります`,
    mainParagraphs: [
      `ホテルやヴィラ、レストラン、住宅の家具調達において必要なのは、製品だけではなく信頼できるパートナーです。Naturra Extal は単なる販売者ではなく、あなたのチームの一員として伴走します。`,
      `プロジェクトには締切、厳しい仕様、突発的な変更、高い期待が付きものだと理解しています。必要なのは複雑さを増やす相手ではなく、寄り添って調整できるパートナー。答えるだけでなく、耳を傾ける存在です。`
    ],
    experienceTitle: `経験が価値を生み出します`,
    experienceParagraphs: [
      `都心のアパートメントから海辺のリゾート、公共スペースの案件まで、私たちはさまざまなプロジェクトに携わってきました。お客様ごとに異なる課題があり、それこそが私たちを鍛えてくれました。家具づくりの技術だけでなく、プロジェクト全体のダイナミクスを理解しています。`,
      `デザイン調整や素材の選定、段階的な納品スケジュールまで、すべてを一緒に検討できます。何度も説明する必要はありません。効率的なワークフローの組み立て方を熟知しています。`
    ],
    collaborationTitle: `生産ではなく、共創です`,
    collaborationSubtitle: `家具施工パートナー`,
    collaborationParagraphs: [
      `プロジェクトの成功は、どれだけ多く作るかではなく、どれだけ正確にあなたのアイデアを形にできるかで決まります。ムードボードを持参される方もいれば、写真だけ送ってくる方、そして「南国らしく温かく、それでいて上品に」と一言伝える方もいます。`,
      `どのケースでも対話が可能です。私たちは初期段階からオープンに話し合います。空間の寸法、予算の制約、インテリアのスタイル、構造的なディテールなど、必要な情報を共有してください。`,
      `甘い言葉ではなく、スケッチや材料計算、必要であれば試作品で解決策を提示します。すべてを明確にし、測定可能な形で進めます。`
    ],
    flexibilityTitle: `急ぐべき時と丁寧に進める時を見極めます`,
    flexibilityParagraphs: [
      `短納期を求めるお客様もいれば、エリアごとの段階納品を望むお客様もいます。現地調査の結果に基づく生産調整を依頼されることもあります。いずれも合理的であり、柔軟に対応します。`,
      `すべてのプロジェクトに同じパッケージを当てはめることはしません。無垢材と手仕事の温かさを重視しますか？それとも生産効率とデザイン性の両立を目指しますか？私たちが実現をサポートします。`
    ],
    scaleTitle: `大規模でも小規模でも、真剣さは変わりません`,
    scaleDescription: `一度に数百点を製作した経験もあれば、プライベートな応接スペース用に椅子を一組だけ作ったこともあります。規模が基準ではありません。そのプロジェクトがあなたにとって意味があるかどうかが大切です。`,
    scaleQuestion: `もし「はい」なら、ぜひ詳しくお話ししましょう。`,
    ctaTitle: `プロジェクトのご相談はお済みですか？`,
    ctaDescription: `今すぐプロジェクトの内容をお聞かせください。画像、図面、参考資料をお送りいただければ、実行可能なステップとしてまとめます。`,
    ctaButton: `今すぐ問い合わせる`,
    contactTitle: `アクセス`
  },
  es: {
    pageTitle: `Programa de Alianzas de Muebles Industriales: Contratistas, Diseñadores y Desarrolladores - Naturra Extal`,
    metaDescription: `¿Cómo colaborar con Naturra Extal en proyectos de mobiliario? Programa de partnership para contratistas, interioristas, desarrolladores inmobiliarios y cadenas hoteleras. Beneficios: precios por volumen con hasta 20% de descuento, project manager dedicado, producción prioritaria, renders 3D gratuitos, soporte técnico en obra y condiciones de pago flexibles. Experiencia en hoteles de más de 100 habitaciones, cadenas de restaurantes con más de 10 locales y 50 espacios comerciales en centros comerciales. Requisitos: proyectos desde 50 millones de rupias o más de 5 proyectos al año.`,
    metaKeywords: `alianza muebles bekasi, proveedor muebles industriales, socio muebles para diseñadores, abastecimiento muebles hotel, mobiliario comercial a medida`,
    heroTitle: `Alianzas`,
    mainTitle: `Cada proyecto tiene su propia historia`,
    mainParagraphs: [
      `Ya sea para un hotel, una villa, un restaurante o una residencia, lo que se necesita no son solo productos, sino un socio confiable. Naturra Extal está aquí no como vendedor, sino como parte de tu equipo.`,
      `Sabemos que un proyecto implica plazos, especificaciones estrictas, cambios inesperados y expectativas altas. Necesitas un aliado que pueda adaptarse, no que complique las cosas. Alguien que escuche, no solo que responda.`
    ],
    experienceTitle: `La experiencia suma valor`,
    experienceParagraphs: [
      `Estamos acostumbrados a trabajar en distintos formatos de proyecto: apartamentos urbanos, resorts en la costa, espacios públicos. Cada cliente trae desafíos diferentes y eso nos ha entrenado no solo para fabricar muebles, sino para entender la dinámica de cada proyecto.`,
      `Desde ajustes de diseño y selección de materiales hasta esquemas de entrega por etapas, todo puede conversarse. No tendrás que explicar dos veces; sabemos cómo organizar un flujo de trabajo eficiente.`
    ],
    collaborationTitle: `No solo producción, sino verdadera colaboración`,
    collaborationSubtitle: `Contratistas de mobiliario`,
    collaborationParagraphs: [
      `Creemos que el éxito del proyecto no se mide por cuántas piezas fabricamos, sino por qué tan fielmente ejecutamos tus ideas. Hay clientes que llegan con moodboards, otros envían fotos y algunos solo dicen: "Quiero una atmósfera tropical, cálida pero elegante".`,
      `Todo se puede conversar. Nuestro equipo está abierto al diálogo desde el principio. Puedes contarnos requisitos especiales: dimensiones del espacio, límite de presupuesto, estilo interior o detalles constructivos.`,
      `Te ayudamos a convertirlos en soluciones concretas: no con promesas vacías, sino con bocetos, cálculos de materiales e incluso prototipos cuando es necesario. Todo queda claro y medible.`
    ],
    flexibilityTitle: `Sabemos cuándo acelerar y cuándo cuidar los detalles`,
    flexibilityParagraphs: [
      `Algunos clientes necesitan rapidez. Otros desean entregas por zonas. También hay quienes piden ajustes tras una visita en obra. Todo eso es razonable y se puede planificar juntos.`,
      `No ofrecemos un paquete estándar para todos. Tú decides: ¿quieres resaltar la madera maciza y el toque artesanal? ¿O equilibrar eficiencia productiva con detalle estético? Te ayudaremos a conseguirlo.`
    ],
    scaleTitle: `Proyectos grandes o pequeños, el compromiso es el mismo`,
    scaleDescription: `Hemos fabricado cientos de piezas a la vez y también un solo set de sillas para un área VIP. La escala no determina nuestra dedicación; lo importante es si el proyecto tiene sentido para ti.`,
    scaleQuestion: `Si la respuesta es sí, hablemos con más detalle.`,
    ctaTitle: `¿Listo para hablar de tu proyecto?`,
    ctaDescription: `Cuéntanos lo que necesitas. Envía imágenes, planos o referencias y te ayudaremos a convertirlas en pasos concretos.`,
    ctaButton: `Contactarnos ahora`,
    contactTitle: `Encuéntranos`
  },
  fr: {
    pageTitle: `Programme de partenariat pour mobilier industriel : entrepreneurs, designers et promoteurs - Naturra Extal`,
    metaDescription: `Comment collaborer avec Naturra Extal pour vos projets de mobilier ? Programme destiné aux entrepreneurs, designers d’intérieur, promoteurs immobiliers et chaînes hôtelières. Avantages : tarifs volume jusqu’à 20 % de remise, chef de projet dédié, production prioritaire, rendus 3D gratuits, support technique sur site et conditions de paiement flexibles. Expérience sur des hôtels de plus de 100 chambres, des chaînes de restaurants de plus de 10 établissements et 50 espaces commerciaux en centre commercial. Conditions : projet d’au moins 50 millions de rupies ou plus de 5 projets par an.`,
    metaKeywords: `partenariat mobilier bekasi, fournisseur mobilier industriel, partenaire mobilier pour designers, mobilier hôtelier, mobilier commercial sur mesure`,
    heroTitle: `Partenariat`,
    mainTitle: `Chaque projet a sa propre histoire`,
    mainParagraphs: [
      `Qu’il s’agisse d’équiper un hôtel, une villa, un restaurant ou une résidence, il faut plus que des produits : il faut un partenaire de confiance. Naturra Extal n’est pas là comme simple vendeur, mais comme membre de votre équipe.`,
      `Nous savons qu’un projet signifie délais serrés, cahier des charges strict, révisions de dernière minute et attentes élevées. Vous avez besoin d’un partenaire qui facilite les choses, pas qui les complique. Quelqu’un qui écoute vraiment, pas qui se contente de répondre.`
    ],
    experienceTitle: `L’expérience fait la différence`,
    experienceParagraphs: [
      `Nous avons l’habitude de nous adapter à des projets variés : appartements urbains, resorts en bord de mer, espaces publics. Chaque client apporte son lot de défis, et c’est ce qui nous a formés non seulement à fabriquer du mobilier, mais aussi à comprendre la dynamique d’un projet.`,
      `Du réglage des designs au choix des matériaux, jusqu’aux livraisons par étapes, tout est discutable. Inutile de répéter vos besoins : nous savons construire un flux de travail efficace.`
    ],
    collaborationTitle: `Au-delà de la production, une vraie collaboration`,
    collaborationSubtitle: `Partenaire mobilier`,
    collaborationParagraphs: [
      `Pour nous, la réussite d’un projet ne se mesure pas au nombre de pièces produites, mais à la précision avec laquelle nous traduisons vos idées. Certains clients arrivent avec un moodboard, d’autres envoient une photo, parfois ils disent simplement : « Nous voulons une ambiance tropicale, chaleureuse et élégante. »`,
      `Tout peut se discuter. Notre équipe est ouverte dès le départ. Partagez vos besoins spécifiques : dimensions, budget, style intérieur, détails constructifs.`,
      `Nous transformons ces éléments en solutions tangibles, non pas avec de belles promesses, mais avec des croquis, des calculs de matériaux et, si nécessaire, des prototypes. Tout est clair et mesurable.`
    ],
    flexibilityTitle: `Savoir être rapide, savoir être minutieux`,
    flexibilityParagraphs: [
      `Certains projets exigent de la rapidité. D’autres préfèrent des livraisons par zone. Parfois, les résultats d’une inspection de site imposent des ajustements de production. Tout cela est logique et faisable.`,
      `Nous n’imposons pas un forfait unique. À vous de choisir : privilégier le bois massif et le travail artisanal ? Ou trouver l’équilibre entre efficacité et détail esthétique ? Nous vous accompagnons.`
    ],
    scaleTitle: `Grands ou petits projets, même engagement`,
    scaleDescription: `Nous avons déjà livré des centaines d’unités en une fois, mais aussi un seul ensemble de chaises pour un salon privé. La taille n’est pas le critère. Ce qui compte, c’est l’importance de votre projet.`,
    scaleQuestion: `Si oui, parlons-en plus en détail.`,
    ctaTitle: `Prêt à parler de votre projet ?`,
    ctaDescription: `Expliquez-nous vos besoins dès maintenant. Envoyez plans, images ou références et nous les traduirons en étapes concrètes.`,
    ctaButton: `Nous contacter maintenant`,
    contactTitle: `Nous trouver`
  },
  ko: {
    pageTitle: `산업용 가구 파트너십 프로그램: 시공사·디자이너·개발사 - Naturra Extal`,
    metaDescription: `Naturra Extal과 가구 프로젝트를 함께 진행하는 방법은? 시공사, 인테리어 디자이너, 부동산 개발사, 호텔 체인을 위한 파트너십 프로그램입니다. 혜택: 최대 20% 볼륨 할인, 전담 프로젝트 매니저, 생산 우선순위, 무료 3D 렌더링, 현장 기술 지원, 유연한 결제 조건. 100객실 이상의 호텔, 10개 이상 매장의 외식 체인, 50개 이상의 쇼핑몰 테넌트 프로젝트 경험 보유. 조건: 최소 5천만 루피아의 프로젝트 또는 연간 5건 이상의 협업.`,
    metaKeywords: `가구 파트너십 베카시, 산업용 가구 공급, 디자이너 가구 파트너, 호텔 가구 조달, 상업용 맞춤 가구`,
    heroTitle: `파트너십`,
    mainTitle: `프로젝트마다 각자의 이야기가 있습니다`,
    mainParagraphs: [
      `호텔, 빌라, 레스토랑, 주거 공간을 위한 가구 조달에서 필요한 것은 제품만이 아니라 믿을 수 있는 파트너입니다. Naturra Extal은 판매자가 아니라 당신 팀의 일원으로 함께합니다.`,
      `프로젝트에는 촉박한 마감, 까다로운 규격, 갑작스러운 수정, 높은 기대치가 따른다는 것을 잘 알고 있습니다. 복잡성을 더하지 않고 조율해 줄 파트너가 필요합니다. 대답만 하는 사람이 아니라 귀 기울여 듣는 사람이 필요합니다.`
    ],
    experienceTitle: `경험이 가치를 만듭니다`,
    experienceParagraphs: [
      `도심 아파트, 해변 리조트, 공공 공간까지 다양한 프로젝트를 경험했습니다. 고객마다 도전이 다르며, 그것이 우리를 단련시켜 단순한 가구 제작을 넘어 프로젝트의 흐름까지 이해하게 만들었습니다.`,
      `디자인 조정, 자재 선정, 단계별 납품 계획까지 모든 과정을 함께 논의할 수 있습니다. 두 번 설명할 필요가 없습니다. 효율적인 워크플로를 구성하는 방법을 잘 알고 있습니다.`
    ],
    collaborationTitle: `생산을 넘어서는 협업`,
    collaborationSubtitle: `가구 시공 파트너`,
    collaborationParagraphs: [
      `프로젝트 성공은 생산한 수량이 아니라 당신의 아이디어를 얼마나 정확하게 구현했는지에 달려 있다고 믿습니다. 어떤 고객은 무드보드를 가져오고, 어떤 고객은 사진 한 장만 보내며, 또 어떤 고객은 “따뜻하면서도 우아한 트로피컬 분위기를 원합니다”라고 말합니다.`,
      `모두 가능한 이야기입니다. 우리는 초기 단계부터 열린 마음으로 대화합니다. 공간 크기, 예산 한도, 인테리어 스타일, 구조 디테일 등 필요한 내용을 알려주세요.`,
      `멋진 말이 아니라 스케치, 자재 산출, 필요하다면 시제품으로 해결책을 제시합니다. 모든 과정을 명확하게 하고 측정 가능한 형태로 진행합니다.`
    ],
    flexibilityTitle: `빠르게 할 때와 꼼꼼히 할 때를 알고 있습니다`,
    flexibilityParagraphs: [
      `빠른 납품이 필요한 고객도 있고, 구역별 단계 납품을 원하는 고객도 있으며, 현장 점검 결과에 따라 생산 조정을 요청하는 경우도 있습니다. 모두 합리적이며 함께 조율할 수 있습니다.`,
      `모든 프로젝트에 동일한 패키지를 적용하지 않습니다. 수제 감성이 느껴지는 원목에 집중할지, 생산 효율과 디테일을 균형 있게 잡을지 선택하세요. 우리가 함께 구현합니다.`
    ],
    scaleTitle: `큰 프로젝트든 작은 프로젝트든 똑같이 진지합니다`,
    scaleDescription: `한 번에 수백 세트를 제작한 경험도 있고, 프라이빗 라운지를 위해 의자 한 세트만 만든 적도 있습니다. 규모가 아니라 프로젝트의 중요성이 기준입니다.`,
    scaleQuestion: `그렇다면 지금 바로 자세한 이야기를 나눠 보겠습니다.`,
    ctaTitle: `프로젝트 상담을 시작할 준비가 되었나요?`,
    ctaDescription: `필요한 내용을 지금 알려주세요. 이미지, 도면, 참고 자료를 보내주시면 실행 가능한 단계로 정리해 드립니다.`,
    ctaButton: `지금 문의하기`,
    contactTitle: `찾아오시는 길`
  }
}

const OG_LOCALES = ['id_ID', 'en_US', 'ar_SA', 'zh_CN', 'ja_JP', 'es_ES', 'fr_FR', 'ko_KR'] as const

const NaturraPartnership: React.FC = () => {
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
  const translations = PARTNERSHIP_TRANSLATIONS[language] ?? PARTNERSHIP_TRANSLATIONS.en

  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  return (
    <div className="partnership-page">
      <AnnouncementBar language={language} isIndonesian={isIndonesian} />
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>{translations.pageTitle}</title>
        <meta name="description" content={translations.metaDescription} />
        <meta name="keywords" content={translations.metaKeywords} />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`partnership-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        {OG_LOCALES.filter(altLocale => altLocale !== localeMeta.locale).map((altLocale) => (
          <meta key={`partnership-og-${altLocale}`} property="og:locale:alternate" content={altLocale} />
        ))}
      </Helmet>

      <NaturraHeader />

      {/* Hero Section */}
      <section className="partnership-hero">
        <div className="partnership-hero-image">
          <img
            src={heroImage}
            alt="Partnership Naturra Extal - Kerja Sama Workshop Furniture Industrial Bekasi"
            title="Partnership - Partner with Naturra Extal Industrial Furniture Manufacturer"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
            itemProp="image"
            data-image-type="partnership-hero"
            data-category="partnership"
          />
          <div className="partnership-hero-overlay"></div>
        </div>
        <div className="partnership-hero-content">
          <h1 className="partnership-hero-title">{translations.heroTitle}</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="partnership-main-section">
        <div className="partnership-main-container">
          <div className="partnership-main-content">
            <div className="partnership-main-text">
              <h2 className="partnership-main-title">{translations.mainTitle}</h2>
              <div className="partnership-main-body">
                {translations.mainParagraphs.map((paragraph, index) => (
                  <p key={index} className="partnership-main-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="partnership-main-media-wrapper">
              <video
                src={projectVideo}
                autoPlay
                loop
                muted
                playsInline
                className="partnership-main-video"
                aria-label={isIndonesian ? 'Video produk furniture industrial Naturra Extal' : 'Naturra Extal industrial furniture product video'}
              >
                <source src={projectVideo} type="video/mp4" />
                {isIndonesian ? 'Browser Anda tidak mendukung video.' : 'Your browser does not support the video tag.'}
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="partnership-experience-section">
        <div className="partnership-experience-container">
          <h2 className="partnership-experience-title">{translations.experienceTitle}</h2>

          <div className="partnership-experience-layout">
            <div className="partnership-experience-image-wrapper">
              <img
                src={experienceImage}
                alt={isIndonesian ? 'Pengalaman Produksi Furniture Industrial - Hollowline Display Rack' : 'Industrial Furniture Production Experience - Hollowline Display Rack'}
                className="partnership-experience-image"
                loading="lazy"
              />
            </div>
            <div className="partnership-experience-content">
              {translations.experienceParagraphs.map((paragraph, index) => (
                <p key={index} className="partnership-experience-description">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="partnership-collaboration-section">
        <div className="partnership-collaboration-container">
          <h2 className="partnership-collaboration-title">{translations.collaborationTitle}</h2>
          <p className="partnership-collaboration-subtitle">{translations.collaborationSubtitle}</p>

          <div className="partnership-collaboration-layout">
            <div className="partnership-collaboration-content">
              {translations.collaborationParagraphs.map((paragraph, index) => (
                <p key={index} className="partnership-collaboration-description">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="partnership-collaboration-image-wrapper">
              <img
                src={collaborationImage}
                alt={isIndonesian ? 'Kolaborasi Custom Design - Meja Kerja Industrial' : 'Custom Design Collaboration - Industrial Work Desk'}
                className="partnership-collaboration-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flexibility Section */}
      <section className="partnership-flexibility-section">
        <div className="partnership-flexibility-container">
          <h2 className="partnership-flexibility-title">{translations.flexibilityTitle}</h2>

          <div className="partnership-flexibility-layout">
            <div className="partnership-flexibility-image-wrapper">
              <img
                src={flexibilityImage}
                alt={isIndonesian ? 'Fleksibilitas Produksi - Kabinet Industrial Dapur' : 'Production Flexibility - Industrial Kitchen Cabinet'}
                className="partnership-flexibility-image"
                loading="lazy"
              />
            </div>
            <div className="partnership-flexibility-content">
              {translations.flexibilityParagraphs.map((paragraph, index) => (
                <p key={index} className="partnership-flexibility-description">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scale Section */}
      <section className="partnership-scale-section">
        <div className="partnership-scale-container">
          <h2 className="partnership-scale-title">{translations.scaleTitle}</h2>

          <div className="partnership-scale-image-wrapper">
            <img
              src={scaleImage}
              alt={isIndonesian ? 'Berbagai Skala Proyek - Dining Set Industrial' : 'Various Project Scales - Industrial Dining Set'}
              className="partnership-scale-image"
              loading="lazy"
            />
          </div>

          <div className="partnership-scale-content">
            <p className="partnership-scale-description">
              {translations.scaleDescription}
            </p>

            <p className="partnership-scale-question">
              {translations.scaleQuestion}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="partnership-cta-section">
        <div className="partnership-cta-container">
          <h2 className="partnership-cta-title">{translations.ctaTitle}</h2>
          <p className="partnership-cta-description">
            {translations.ctaDescription}
          </p>

          <div className="partnership-cta-buttons">
            <a
              href="https://wa.me/+628951395752"
              target="_blank"
              rel="noopener noreferrer"
              className="partnership-cta-button"
              onClick={() => trackWhatsAppClick('partnership_page_cta')}
            >
              {translations.ctaButton}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="partnership-contact-section">
        <div className="partnership-contact-container">
          <h2 className="partnership-contact-title">{translations.contactTitle}</h2>
          <div className="partnership-contact-info">
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ color: '#004D2C', display: 'block', marginBottom: '8px' }}>
                Workshop Bekasi:
              </strong>
              <p className="partnership-contact-address">
                <a
                  href="https://maps.app.goo.gl/5Bc5ymfVtAYRPtpK7"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2c2c2c', textDecoration: 'underline' }}
                >
                  Jl. Raya Setu Cibitung - Bekasi, Telajung, Kec. Cikarang Bar., Kabupaten Bekasi, Jawa Barat 17320
                </a>
              </p>
            </div>
            <p className="partnership-contact-phone">
              <a
                href="https://wa.me/+628951395752"
                style={{ color: '#004D2C', textDecoration: 'underline' }}
                onClick={() => trackWhatsAppClick('partnership_page_contact_info')}
                target="_blank"
                rel="noopener noreferrer"
              >
                +628951395752
              </a>
            </p>
            <p className="partnership-contact-email">
              <a href="mailto:hello@naturraextal.com" style={{ color: '#004D2C', textDecoration: 'underline' }}>
                hello@naturraextal.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <NaturraFooter />
    </div>
  )
}

export default NaturraPartnership
