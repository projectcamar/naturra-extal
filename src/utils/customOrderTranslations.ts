import type { LanguageCode } from './languageManager';
type CustomOrderTranslations = Record<string, any>;
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
        },
        filterTitleHS: "HS 코드",
        filterTitleApps: "용도",
        hsPure: "순수 코코아 파우더",
        hsSweet: "가당 코코아",
        appConf: "제과",
        appBak: "베이커리",
        appBev: "음료",
        appHort: "원예",
        appPharm: "제약",
        appInd: "산업용",
        originTitle: "술라웨시 및 수마트라 산",
        qualityTitle: "국제 품질 표준",
        productData: {
            "cocoa-powder-pure": {
                name: "순수 코코아 파우더",
                description: "지방 함량이 높은 프리미엄 인도네시아산 순수 코코아 파우더. 전문 베이킹 및 제과용으로 적합합니다.",
                specs: ["지방: 10-12%", "pH: 5.0-6.0", "HS: 1805.00.0"]
            },
            "cocoa-powder-sweet": {
                name: "가당 코코아",
                description: "전문적으로 블렌딩된 가당 코코아 파우더. 즉석 음료 및 디저트 토핑에 적합합니다.",
                specs: ["당분: 30%", "지방: 8-10%", "HS: 1806.00.0"]
            },
            "cloves-premium": {
                name: "정향 (Cengkeh)",
                description: "북술라웨시산 프리미엄 A 등급 정향. 최고의 향미를 위해 수작업으로 수확하고 햇볕에 건조했습니다.",
                specs: ["수분: <12%", "유제놀: 70%+", "A 등급"]
            },
            "cocopeat-block": {
                name: "코코피트 블록",
                description: "고수익 원예 및 지속 가능한 농업용 압축 코코피트 블록.",
                specs: ["EC: <0.5 ms/cm", "복원량: 15L/kg", "pH: 5.5-6.5"]
            }
        }
    }
};
