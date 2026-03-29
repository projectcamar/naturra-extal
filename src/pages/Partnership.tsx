import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
// Premium Agricultural Commodity Images
const heroImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80'
const experienceImage = 'https://images.unsplash.com/photo-1516053303028-569806443c52?w=1200'
const collaborationImage = 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=1200'
const flexibilityImage = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200'
const scaleImage = 'https://images.unsplash.com/photo-1586528116311-ad866efd92bf?w=1200'

import projectVideo from '../assets/meja-makan-industrial.mp4'
// legacy Naturra image import removed
// legacy Naturra image import removed
// legacy Naturra image import removed
// legacy Naturra image import removed
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import './Partnership.css'

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
    pageTitle: `Program Kemitraan Komoditas Pertanian: Importir, Wholesaler, Industri - Naturra Extal`,
    metaDescription: `Bagaimana cara kerja sama dengan Naturra Extal untuk pasokan komoditas pertanian? Program partnership untuk importir global, wholesaler, dan industri makanan. Keuntungan partnership: Harga volume kompetitif, jaminan kualitas, prioritas pengiriman, dukungan logistik internasional, dan fleksibilitas kontrak. Pengalaman menangani ekspor skala besar ke Asia, Eropa, dan Amerika.`,
    metaKeywords: `partnership komoditas pertanian, ekspor cokelat, supplier cengkeh, distributor cocopeat, mitra ekspor pertanian indonesia`,
    heroTitle: `Kerja Sama`,
    mainTitle: `Setiap proyek punya cerita sendiri`,
    mainParagraphs: [
      `Baik itu pasokan Cocoa Powder untuk industri cokelat, Cengkeh premium untuk ritel, atau Cocopeat untuk kebutuhan agrikultur skala besar - yang dibutuhkan bukan hanya produk, tapi mitra eksportir yang bisa dipercaya. Naturra Extal hadir sebagai bagian dari rantai pasok global Anda.`,
      `Kami mengerti bahwa ekspor berarti standar kualitas ketat, kepastian logistik, pemenuhan kuota tepat waktu, dan transparansi harga. Anda butuh rekan yang bisa mengakomodasi kebutuhan industri, bukan menambah kerumitan birokrasi.`
    ],
    experienceTitle: `Pengalaman Jadi Nilai Tambah`,
    experienceParagraphs: [
      `Kami sudah terbiasa ikut dalam banyak skema pasokan internasional - dari pemenuhan bahan baku industri manufaktur di Eropa hingga distributor rempah-rempah di Timur Tengah. Setiap pasar membawa tantangan regulasi berbeda.`,
      `Mulai dari proses penyesuaian sertifikasi, pemilihan grading teknis, hingga skema pengiriman laut/udara yang efisien, semuanya bisa dikomunikasikan secara profesional. Kami tahu bagaimana menyusun alur pasokan komoditas yang handal.`
    ],
    collaborationTitle: `Bukan Sekadar Suplai, Tapi Kemitraan Strategis`,
    collaborationSubtitle: `Mitra Ekspor Komoditas Global`,
    collaborationParagraphs: [
      `Kami percaya, keberhasilan kemitraan bukan hanya dari volume yang dikirim, tapi dari seberapa akurat kami memenuhi spesifikasi teknis industri Anda. Kami siap melayani permintaan khusus terkait parameter kimia, tingkat kadar air, hingga metode pengemasan bulk.`,
      `Tim kami terbuka untuk berdiskusi terkait kontrak jangka panjang dan jaminan kontinuitas pasokan. Anda bisa menyampaikan keperluan khusus: standardisasi kualitas, batasan anggaran logistik, atau detail pengiriman internasional.`,
      `Kami akan bantu merumuskan solusi pasokan. Bukan hanya janji ketersediaan, tapi dengan data teknis, laporan inspeksi kualitas, dan prototipe produk bila diperlukan untuk pengujian laboratorium Anda.`
    ],
    flexibilityTitle: `Fleksibilitas Logistik & Volume`,
    flexibilityParagraphs: [
      `Beberapa klien butuh pengiriman cepat skala LCL. Ada yang menginginkan kontrak tahunan skala FCL. Ada pula yang meminta penyesuaian grading berdasarkan hasil pengujian sampel awal. Semua itu bisa dibicarakan.`,
      `Kami tidak menawarkan paket kaku untuk semua mitra. Anda bisa memilih. Mau fokus pada kualitas premium (Grade A) untuk pasar ritel? Atau kombinasi antara efisiensi biaya dan volume besar untuk kebutuhan industri? Kami bantu wujudkan.`
    ],
    scaleTitle: `Kemitraan Skala Global`,
    scaleDescription: `Telah menangani pengiriman kontainer dalam jumlah besar secara berkelanjutan. Juga siap membantu bisnis menengah yang sedang berekspansi ke pasar internasional. Skala volume bukan penghambat komitmen kami.`,
    scaleQuestion: `Jika Anda mencari mitra suplai komoditas yang handal, mari kita bicarakan kerja sama ini.`,
    ctaTitle: `Siap Membahas Rencana Suplai Anda?`,
    ctaDescription: `Ceritakan kebutuhan komoditas Anda sekarang. Kirimkan spesifikasi teknis, estimasi volume, atau detail proyek Anda, dan kami akan membantu merumuskannya jadi langkah nyata.`,
    ctaButton: `Hubungi tim ekspor kami`,
    contactTitle: `Temukan Kami`
  },
  en: {
    pageTitle: `Agricultural Commodities Partnership Program: Importers, Wholesalers, Industry - Naturra Extal`,
    metaDescription: `How to partner with Naturra Extal for agricultural commodity supply? Partnership program for global importers, wholesalers, and food industries. Partnership benefits: Competitive volume pricing, quality assurance, shipping priority, international logistics support, and contract flexibility. Experience handling large-scale exports to Asia, Europe, and America.`,
    metaKeywords: `agricultural partnership, cocoa export partner, clove supplier, cocopeat distributor, indonesia export partner`,
    heroTitle: `Partnership`,
    mainTitle: `Global Supply Chain Excellence`,
    mainParagraphs: [
      `Whether it's Cocoa Powder for the chocolate industry, premium Cloves for retail, or Cocopeat for large-scale agricultural needs - what's required is not just a product, but a trusted export partner. Naturra Extal serves as an integral part of your global supply chain.`,
      `We understand that export means strict quality standards, logistical certainty, timely quota fulfillment, and price transparency. You need a partner who can accommodate industrial needs without adding bureaucratic complexity.`
    ],
    experienceTitle: `Experience as Added Value`,
    experienceParagraphs: [
      `We are accustomed to participating in many international supply schemes - from fulfilling raw material needs for manufacturing in Europe to spice distributors in the Middle East. Each market brings different regulatory challenges.`,
      `From certification adjustment processes to technical grading selection and efficient sea/air shipping schemes, everything can be communicated professionally. We know how to organize reliable commodity supply flows.`
    ],
    collaborationTitle: `More Than Supply, A Strategic Partnership`,
    collaborationSubtitle: `Global Commodity Export Partner`,
    collaborationParagraphs: [
      `We believe partnership success is not just about the volume shipped, but how accurately we meet your industry's technical specifications. We are ready to serve special requests regarding chemical parameters, moisture levels, and bulk packaging methods.`,
      `Our team is open to discussing long-term contracts and supply continuity guarantees. You can convey specific needs: quality standardization, logistics budget constraints, or international shipping details.`,
      `We will help formulate supply solutions. Not just availability promises, but with technical data, quality inspection reports, and product prototypes if needed for your laboratory testing.`
    ],
    flexibilityTitle: `Logistics & Volume Flexibility`,
    flexibilityParagraphs: [
      `Some clients need fast LCL shipments. Some want FCL annual contracts. Others request grading adjustments based on initial sample testing results. All of this can be discussed.`,
      `We don't offer rigid packages for all partners. You can choose. Want to focus on premium quality (Grade A) for the retail market? Or a combination of cost efficiency and large volume for industrial needs? We'll help make it happen.`
    ],
    scaleTitle: `Global Scale Partnership`,
    scaleDescription: `Handling large-scale container shipments sustainably. Also ready to assist medium businesses expanding into international markets. Volume scale is not a hindrance to our commitment.`,
    scaleQuestion: `If you are looking for a reliable commodity supply partner, let's discuss this cooperation.`,
    ctaTitle: `Ready to Discuss Your Supply Plan?`,
    ctaDescription: `Tell us your commodity needs now. Send technical specifications, volume estimates, or your project details, and we will help formulate them into concrete steps.`,
    ctaButton: `Contact our export team`,

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
    pageTitle: `Programa de Alianzas de Materias Primas Agrícolas: Importadores, Mayoristas e Industria - Naturra Extal`,
    metaDescription: `¿Cómo colaborar con Naturra Extal para el suministro de materias primas agrícolas? Programa de asociación para importadores globales, mayoristas e industrias alimentarias. Beneficios: Precios competitivos por volumen, garantía de calidad, prioridad de envío, soporte logístico internacional y flexibilidad de contratos. Experiencia en exportaciones a gran escala a Asia, Europa y América.`,
    metaKeywords: `alianza agrícola, exportación de cacao, proveedor de clavo, distribuidor de cocopeat, socio de exportación indonesia`,
    heroTitle: `Alianzas`,
    mainTitle: `Excelencia en la Cadena de Suministro Global`,
    mainParagraphs: [
      `Ya sea para el suministro de cacao en polvo para la industria del chocolate, clavo de olor premium para el sector minorista o cocopeat para necesidades agrícolas a gran escala, lo que se necesita no es solo un producto, sino un socio exportador confiable. Naturra Extal actúa como una parte integral de su cadena de suministro global.`,
      `Entendemos que la exportación significa estándares de calidad estrictos, certeza logística, cumplimiento puntual de cuotas y transparencia de precios. Usted necesita un socio que pueda adaptarse a las necesidades industriales sin añadir complejidad burocrática.`
    ],
    experienceTitle: `La Experiencia como Valor Añadido`,
    experienceParagraphs: [
      `Estamos acostumbrados a participar en diversos esquemas de suministro internacional, desde el abastecimiento de materias primas para la industria manufacturera en Europa hasta distribuidores de especias en Oriente Medio. Cada mercado presenta desafíos regulatorios diferentes.`,
      `Desde procesos de ajuste de certificación hasta selección de grados técnicos y esquemas eficientes de envío marítimo/aéreo, todo se puede comunicar profesionalmente. Sabemos cómo organizar flujos de suministro de productos básicos confiables.`
    ],
    collaborationTitle: `Más que Suministro, una Alianza Estratégica`,
    collaborationSubtitle: `Socio de Exportación de Productos Básicos Globales`,
    collaborationParagraphs: [
      `Creemos que el éxito de una asociación no se basa solo en el volumen enviado, sino en la precisión con la que cumplimos las especificaciones técnicas de su industria. Estamos listos para atender solicitudes especiales sobre parámetros químicos, niveles de humedad y métodos de embalaje a granel.`,
      `Nuestro equipo está abierto a discutir contratos a largo plazo y garantías de continuidad del suministro. Puede comunicarnos sus necesidades específicas: estandarización de calidad, restricciones presupuestarias logísticas o detalles de envío internacional.`,
      `Ayudaremos a formular soluciones de suministro. No solo promesas de disponibilidad, sino con datos técnicos, informes de inspección de calidad y prototipos de productos si es necesario para sus pruebas de laboratorio.`
    ],
    flexibilityTitle: `Flexibilidad Logística y de Volumen`,
    flexibilityParagraphs: [
      `Algunos clientes requieren envíos rápidos LCL. Otros desean contratos anuales FCL. Algunos solicitan ajustes de grado basados en resultados de pruebas de muestras iniciales. Todo esto se puede discutir.`,
      `No ofrecemos paquetes rígidos para todos los socios. Usted puede elegir. ¿Quiere centrarse en calidad premium (Grado A) para el mercado minorista? ¿O una combinación de eficiencia de costos y gran volumen para necesidades industriales? Ayudaremos a que suceda.`
    ],
    scaleTitle: `Alianza a Escala Global`,
    scaleDescription: `Manejo de envíos de contenedores a gran escala de manera sostenible. También estamos listos para ayudar a medianas empresas que se expanden a mercados internacionales. La escala de volumen no es un obstáculo para nuestro compromiso.`,
    scaleQuestion: `Si busca un socio confiable para el suministro de materias primas, hablemos de esta cooperación.`,
    ctaTitle: `¿Listo para Discutir su Plan de Suministro?`,
    ctaDescription: `Cuéntenos sus necesidades de productos ahora. Envíe especificaciones técnicas, estimaciones de volumen o detalles de su proyecto, y ayudaremos a formularlos en pasos concretos.`,
    ctaButton: `Contactar a nuestro equipo de exportación`,
    contactTitle: `Encuéntranos`
  },
  fr: {
    pageTitle: `Programme de Partenariat Agricole : Importateurs, Grossistes et Industrie - Naturra Extal`,
    metaDescription: `Comment s'associer avec Naturra Extal pour l'approvisionnement en matières premières agricoles ? Programme de partenariat pour les importateurs mondiaux, les grossistes et les industries agroalimentaires. Avantages : Prix de volume compétitifs, assurance qualité, priorité d'expédition, support logistique international et flexibilité contractuelle. Expérience dans la gestion d'exportations à grande échelle vers l'Asie, l'Europe et l'Amérique.`,
    metaKeywords: `partenariat agricole, export cacao, fournisseur clous de girofle, distributeur cocopeat, partenaire export indonésie`,
    heroTitle: `Partenariat`,
    mainTitle: `Excellence de la Chaîne d'Approvisionnement Mondiale`,
    mainParagraphs: [
      `Qu'il s'agisse de poudre de cacao pour l'industrie chocolatière, de clous de girofle premium pour la vente au détail ou de cocopeat pour des besoins agricoles à grande échelle - ce qu'il faut, ce n'est pas seulement un produit, mais un partenaire exportateur de confiance. Naturra Extal fait partie intégrante de votre chaîne d'approvisionnement mondiale.`,
      `Nous comprenons que l'exportation signifie des normes de qualité strictes, une certitude logistique, le respect des quotas et une transparence des prix. Vous avez besoin d'un partenaire capable de répondre aux besoins industriels sans ajouter de complexité bureaucratique.`
    ],
    experienceTitle: `L'Expérience comme Valeur Ajoutée`,
    experienceParagraphs: [
      `Nous avons l'habitude de participer à de nombreux schémas d'approvisionnement internationaux - de la fourniture de matières premières pour l'industrie manufacturière en Europe aux distributeurs d'épices au Moyen-Orient. Chaque marché apporte des défis réglementaires différents.`,
      `Des processus d'ajustement de certification à la sélection du grading technique et aux schémas d'expédition maritime/aérienne efficaces, tout peut être communiqué professionnellement. Nous savons comment organiser des flux d'approvisionnement fiables en matières premières.`
    ],
    collaborationTitle: `Plus qu'un Approvisionnement, un Partenariat Stratégique`,
    collaborationSubtitle: `Partenaire Export de Matières Premières Globales`,
    collaborationParagraphs: [
      `Nous pensons que le succès d'un partenariat ne réside pas seulement dans le volume expédié, mais dans la précision avec laquelle nous répondons aux spécifications techniques de votre industrie. Nous sommes prêts à répondre aux demandes spéciales concernant les paramètres chimiques, les taux d'humidité et les méthodes d'emballage en vrac.`,
      `Notre équipe est ouverte à la discussion sur des contrats à long terme et des garanties de continuité d'approvisionnement. Vous pouvez nous faire part de vos besoins spécifiques : standardisation de la qualité, contraintes budgétaires logistiques ou détails d'expédition internationale.`,
      `Nous vous aiderons à formuler des solutions d'approvisionnement. Pas seulement des promesses de disponibilité, mais avec des données techniques, des rapports d'inspection qualité et des prototypes de produits si nécessaire pour vos tests en laboratoire.`
    ],
    flexibilityTitle: `Flexibilité Logistique et de Volume`,
    flexibilityParagraphs: [
      `Certains clients ont besoin d'expéditions LCL rapides. D'autres souhaitent des contrats annuels FCL. D'autres encore demandent des ajustements de grading basés sur les résultats des tests d'échantillons initiaux. Tout cela peut être discuté.`,
      `Nous n'offrons pas de forfaits rigides pour tous les partenaires. Vous pouvez choisir. Vous voulez vous concentrer sur la qualité premium (Grade A) pour le marché de détail ? Ou une combinaison d'efficacité des coûts et de gros volumes pour les besoins industriels ? Nous vous aiderons à y parvenir.`
    ],
    scaleTitle: `Partenariat à l'Échelle Mondiale`,
    scaleDescription: `Gestion durable des expéditions de conteneurs à grande échelle. Également prêt à aider les moyennes entreprises qui se développent sur les marchés internationaux. L'échelle du volume n'est pas un obstacle à notre engagement.`,
    scaleQuestion: `Si vous recherchez un partenaire fiable pour l'approvisionnement en matières premières, discutons de cette coopération.`,
    ctaTitle: `Prêt à Discuter de Votre Plan d'Approvisionnement ?`,
    ctaDescription: `Dites-nous vos besoins en matières premières dès maintenant. Envoyez des spécifications techniques, des estimations de volume ou les détails de votre projet, et nous vous aiderons à les transformer en étapes concrètes.`,
    ctaButton: `Contactez notre équipe export`,
    contactTitle: `Nous trouver`
  },
  ko: {
    pageTitle: `농산물 원자재 파트너십 프로그램: 수입업체·도매업체·산업군 - Naturra Extal`,
    metaDescription: `농산물 원자재 공급을 위해 Naturra Extal과 협력하는 방법은 무엇입니까? 글로벌 수입업체, 도매업체 및 식품 산업을 위한 파트너십 프로그램입니다. 파트너십 혜택: 경쟁력 있는 대량 구매 가격, 품질 보증, 배송 우선순위, 국제 물류 지원 및 계약 유연성. 아시아, 유럽 및 미주 지역 대규모 수출 처리 경험 보유.`,
    metaKeywords: `농업 파트너십, 코코아 수출 파트너, 정향 공급업체, 코코피트 유통업체, 인도네시아 수출 협력`,
    heroTitle: `파트너십`,
    mainTitle: `글로벌 공급망 우수성`,
    mainParagraphs: [
      `초콜릿 산업을 위한 코코아 파우더, 소매용 프리미엄 정향, 또는 대규모 농업용 코코피트 공급 등 필요한 것은 단순히 제품뿐만 아니라 신뢰할 수 있는 수출 파트너입니다. Naturra Extal은 귀하의 글로벌 공급망의 핵심 일원으로서 봉사합니다.`,
      `수출은 엄격한 품질 표준, 물류의 확실성, 적시 쿼터 이행 및 가격 투명성을 의미한다는 것을 잘 알고 있습니다. 복잡한 관료적 절차 없이 산업적 요구를 수용할 수 있는 파트너가 필요합니다.`
    ],
    experienceTitle: `가치를 더하는 경험`,
    experienceParagraphs: [
      `유럽의 제조업 원료 공급부터 중동의 향신료 유통업체까지 다양한 국제 공급 체계에 참여해 왔습니다. 각 시장은 서로 다른 규제적 도전을 제시합니다.`,
      `인증 조정 프로세스부터 기술적 등급 선정, 효율적인 해상/항공 운송 체계에 이르기까지 모든 과정을 전문적으로 소통할 수 있습니다. 우리는 신뢰할 수 있는 원자재 공급 흐름을 조직하는 방법을 알고 있습니다.`
    ],
    collaborationTitle: `공급을 넘어선 전략적 파트너십`,
    collaborationSubtitle: `글로벌 농산물 수출 파트너`,
    collaborationParagraphs: [
      `파트너십의 성공은 단순히 선적된 물량뿐만 아니라 귀사의 산업 기술 사양을 얼마나 정확하게 충족하느냐에 달려 있다고 믿습니다. 화학적 파라미터, 수분 함량 및 대량 포장 방식에 관한 특별 요청을 처리할 준비가 되어 있습니다.`,
      `우리 팀은 장기 계약 및 공급 연속성 보장에 대해 논의할 준비가 되어 있습니다. 품질 표준화, 물류 예산 제약 또는 국제 배송 상세 내용 등 구체적인 요구 사항을 전달해 주십시오.`,
      `우리는 공급 솔루션을 수립하는 데 도움을 드릴 것입니다. 단순한 가용성 약속이 아니라, 귀사의 연구소 테스트에 필요한 경우 기술 데이터, 품질 검사 보고서 및 제품 샘플을 함께 제공합니다.`
    ],
    flexibilityTitle: `물류 및 물량의 유연성`,
    flexibilityParagraphs: [
      `신속한 LCL 선적이 필요한 클라이언트도 있고, 연간 FCL 계약을 원하는 클라이언트도 있습니다. 초기 샘플 테스트 결과에 따라 등급 조정을 요청하는 경우도 있습니다. 이 모든 것이 논의 가능합니다.`,
      `우리는 모든 파트너에게 천편일률적인 패키지를 제안하지 않습니다. 선택은 귀하의 몫입니다. 소매 시장을 위한 프리미엄 품질(Grade A)에 집중하시겠습니까? 아니면 산업적 요구를 위한 비용 효율성과 대량 물량의 조합을 원하십니까? 우리가 실현을 돕겠습니다.`
    ],
    scaleTitle: `글로벌 스케일 파트너십`,
    scaleDescription: `대규모 컨테이너 선적을 지속 가능하게 처리하고 있습니다. 또한 국제 시장으로 확장 중인 중소기업을 도울 준비가 되어 있습니다. 물량 규모는 우리의 약속에 걸림돌이 되지 않습니다.`,
    scaleQuestion: `신뢰할 수 있는 원자재 공급 파트너를 찾고 계시다면, 이번 협력에 대해 논의해 봅시다.`,
    ctaTitle: `공급 계획을 논의할 준비가 되셨나요?`,
    ctaDescription: `지금 바로 필요한 원자재에 대해 알려주세요. 기술 사양, 예상 물량 또는 프로젝트 상세 내용을 보내주시면 구체적인 단계로 수립해 드립니다.`,
    ctaButton: `수출팀에 문의하기`,
    contactTitle: `찾아오시는 길`
  }
}


const OG_LOCALES = ['id_ID', 'en_US', 'ar_SA', 'zh_CN', 'ja_JP', 'es_ES', 'fr_FR', 'ko_KR'] as const

const Partnership: React.FC = () => {
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

      <Header isIndonesian={isIndonesian} language={language} />

      {/* Hero Section */}
      <section className="partnership-hero">
        <div className="partnership-hero-image">
          <img
            src={heroImage}
            alt="Partnership Naturra Extal - Kerja Sama Workshop agricultural commodities Bekasi"
            title="Partnership - Partner with Naturra Extal Agricultural Commodities Manufacturer"
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
                aria-label={isIndonesian ? 'Video produk agricultural commodities Naturra Extal' : 'Naturra Extal Agricultural Commodities product video'}
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
                alt={isIndonesian ? 'Pengalaman Produksi agricultural commodities - Hollowline Display Rack' : 'Agricultural Commodities Production Experience - Hollowline Display Rack'}
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
              href="https://wa.me/+6289513957752"
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
              <strong style={{ color: '#8B7355', display: 'block', marginBottom: '8px' }}>
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
                href="https://wa.me/+6289513957752"
                style={{ color: '#8B7355', textDecoration: 'underline' }}
                onClick={() => trackWhatsAppClick('partnership_page_contact_info')}
                target="_blank"
                rel="noopener noreferrer"
              >
                +6289513957752
              </a>
            </p>
            <p className="partnership-contact-email">
              <a href="mailto:hello@naturraextal.com" style={{ color: '#8B7355', textDecoration: 'underline' }}>
                hello@naturraextal.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer isIndonesian={isIndonesian} language={language} />
    </div>
  )
}

export default Partnership

