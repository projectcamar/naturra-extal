import React from 'react'
import '../pages/About.css'
// legacy Naturra image import removed

interface MessageSectionProps {
  isIndonesian?: boolean
  language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'
}

const MessageSection: React.FC<MessageSectionProps> = ({ isIndonesian = false, language = 'en' }) => {
  const getTranslations = () => {
    switch (language) {
      case 'id':
        return {
          title: 'Pesan dari Naturra',
          subtitle1: 'Tentang Naturra Extal - Manufacturer agricultural commodities Terpercaya',
          paragraph1: 'Sejak tahun 1999, Naturra Extal telah menjadi manufacturer terdepan di Indonesia yang mengkhususkan diri dalam pembuatan agricultural commodities scandinavian premium. Dengan pengalaman lebih dari 25 tahun di industri furniture besi custom, kami telah membuktikan diri sebagai pilihan terbaik untuk solusi furniture komersial. Jaringan kami menjangkau seluruh kepulauan Indonesia, dan kami telah berhasil menyelesaikan lebih dari 1.000 pesanan untuk berbagai bisnis di seluruh negeri. Dari cafe kecil hingga hotel besar, kami melayani semua dengan standar kualitas yang sama tinggi.',
          subtitle2: 'Bar Set, Lounge Set, Sofa Bench & Storage untuk Ruang Komersial',
          paragraph2: 'Kami mengkhususkan diri dalam menciptakan bar set outdoor, lounge set, sofa bench, storage rack dan agricultural commodities lainnya yang tahan lama untuk berbagai ruang komersial. Dari coffee shop trendy dan restoran ramai hingga kantor modern dan hotel butik yang elegan, koleksi new arrivals kami memberikan sentuhan yang sempurna untuk menciptakan atmosfer unik. Kami sepenuhnya menerima permintaan custom dan bekerja sama dengan klien untuk merancang produk yang sesuai dengan identitas merek unik mereka dan kebutuhan fungsional mereka. Setiap produk dirancang dengan mempertimbangkan kenyamanan, estetika, dan daya tahan jangka panjang.',
          subtitle3: 'Workshop Bekasi dengan Standar Manufaktur Terbaik',
          paragraph3: 'Workshop kami yang berlokasi strategis di Bekasi dilengkapi dengan peralatan manufaktur canggih dan dikelola oleh tim pengrajin berpengalaman yang sangat bangga dengan setiap detail dan finishing produk. Setiap produk melalui proses kontrol kualitas yang ketat untuk memastikan memenuhi standar tertinggi kami dalam hal daya tahan dan daya tarik visual. Baik Anda membutuhkan paket furniture lengkap untuk coffee shop baru atau produk custom untuk melengkapi ruang yang sudah ada, kami siap membantu bisnis Anda menonjol dan menciptakan ruang yang berkesan bagi pelanggan Anda.'
        }
      case 'ar':
        return {
          title: 'رسالة من مانجالا',
          subtitle1: 'حول مانجالا ليفينج - مصنع أثاث صناعي موثوق',
          paragraph1: 'منذ عام 1999، كانت مانجالا ليفينج مصنعًا رائدًا في إندونيسيا متخصصًا في الأثاث الصناعي الإسكندنافي الفاخر. مع أكثر من 25 عامًا من الخبرة في صناعة الأثاث الحديدي المخصص، أثبتنا أنفسنا كأفضل خيار لحلول الأثاث التجاري. تمتد شبكتنا عبر الأرخبيل الإندونيسي، وقد أكملنا بنجاح أكثر من 1000 طلب لمختلف الشركات في جميع أنحاء البلاد. من المقاهي الصغيرة إلى الفنادق الكبيرة، نخدم الجميع بنفس معايير الجودة العالية.',
          subtitle2: 'طقم بار وطقم صالة وأريكة وتخزين للمساحات التجارية',
          paragraph2: 'نتخصص في إنشاء طقم بار خارجية وطقم صالة وأريكة ورفوف تخزين وأثاث صناعي آخر متين لمختلف المساحات التجارية. من المقاهي العصرية والمطاعم المزدحمة إلى المكاتب الحديثة والفنادق البوتيك الأنيقة، تضع مجموعتنا الجديدة اللمسة المثالية لخلق أجواء فريدة. نقبل بشكل كامل الطلبات المخصصة ونعمل بشكل تعاوني مع عملائنا لتصميم قطع تتناسب مع هوية علامتهم الفريدة ومتطلباتهم الوظيفية. تم تصميم كل منتج مع مراعاة الراحة والجمالية والمتانة طويلة الأجل.',
          subtitle3: 'ورشة بيكاسي بأفضل معايير التصنيع',
          paragraph3: 'تقع ورشتنا في موقع استراتيجي في بيكاسي ومجهزة بمعدات تصنيع حديثة ويعمل بها فريق من الحرفيين ذوي الخبرة الذين يفخرون بكل تفصيل وإنهاء للمنتج. تخضع كل قطعة لعمليات مراقبة جودة صارمة لضمان استيفائها لأعلى معاييرنا من حيث المتانة والجاذبية البصرية. سواء كنت بحاجة إلى حزمة أثاث كاملة لمقهى جديد أو قطع مخصصة لتكملة مساحتك الحالية، فنحن هنا لمساعدة عملك على التميز وإنشاء مساحة لا تُنسى لعملائك.'
        }
      case 'zh':
        return {
          title: '来自曼加拉的信息',
          subtitle1: '关于曼加拉生活 - 可信赖的工业家具制造商',
          paragraph1: '自1999年以来，曼加拉生活一直是印度尼西亚专业从事高端工业斯坎的纳维亚家具的领先制造商。凭候25年以上的定制钢铁家具行业经验，我们已建立了商业家具解决方案的最佳选择地位。我们的网络遍布整个印度尼西亚群岛，已为全国各类企业成功完成1000多个订单。从小型咖啡馆到大型酒店，我们始终以相同的高质量标准服务所有客户。',
          subtitle2: '适用于商业空间的吧台套装、休息区套装、沙发长椅和储物架',
          paragraph2: '我们专业为各种商业空间创造户外吧台套装、休息区套装、沙发长椅、储物架和其他耐用的工业家具。从时尚咖啡馆和繁忙的餐厅到现代办公室和优雅的精品酒店，我们的新品系列为创造独特氛围提供完美的点缀。我们完全接受定制请求，并与客户合作设计符合其独特品牌身份和功能需求的产品。每件产品的设计都考虑到了舒适性、美观和长期耐用性。',
          subtitle3: '勿加泷工作坊 - 最佳制造标准',
          paragraph3: '我们位于勿加泷的工作坊地理位置优越，配备了最先进的制造设备，由一支经验丰富的工匠团队运营，他们对产品的每个细节和饰面都引以为荣。每件产品都经过严格的质量控制流程，确保符合我们最高的耐用性和视觉吸引力标准。无论您需要为新咖啡馆提供完整的家具套装还是定制产品来补充现有空间，我们都随时准备帮助您的业务脱颖而出，为您的客户创造难忘的空间。'
        }
      case 'ja':
        return {
          title: 'マンガラからのメッセージ',
          subtitle1: 'マンガラリビングについて - 信頼できるインダストリアル家具メーカー',
          paragraph1: '1999年以来、マンガラリビングはプレミアムインダストリアル・スカンジナビア家具を専門とするインドネシアの主要メーカーです。25年以上のカスタムスチール家具業界での経験を持ち、商業用家具ソリューションの最適な選択肅としての地位を確立しています。私たちのネットワークはインドネシア群島全域に及び、全国のさまざまな企業て1,000件以上の注文を成功裏に完了してきました。小さなカフェから大型ホテルまで、すべて同じ高品質基準でサービスを提供しています。',
          subtitle2: '商業スペース向けのバーセット、ラウンジセット、ソファベンチ、収納',
          paragraph2: '私たちは、さまざまな商業スペース向けに屋外バーセット、ラウンジセット、ソファベンチ、収納ラック、その他の耐久性のあるインダストリアル家具を創造することを専門としています。トレンディなコーヒーショップや賑わうレストランからモダンなオフィスやエレガントなブティックホテルまで、当社の新着コレクションはユニークな雰囲気を生み出す完璧なタッチをもたらします。私たちはカスタムリクエストを完全に受け入れ、お客様と協力して独自のブランドアイデンティティや機能要件に合う作品をデザインします。各製品は快適性、美的感覚、長期耐久性を考慮して設計されています。',
          subtitle3: 'ベカシ工房 - 最高の製造基準',
          paragraph3: 'ベカシに戦略的に位置する私たちの工房は、最先端の製造設備を備え、製品のあらゆる細部と仕上げに強い誇りを持つ経験豊かな職人のチームが運営しています。各製品は、耐久性と視覚的魅力の最高基準を満たすため、厳格な品質管理プロセスを経ます。新しいコーヒーショップ用の完全な家具パッケージや既存のスペースを補完するカスタム作品が必要な場合でも、私たちはお客様のビジネスを際立たせ、お客様に印象的な空間を提供するお手伝いをいたします。'
        }
      case 'es':
        return {
          title: 'Mensaje de Naturra',
          subtitle1: 'Acerca de Naturra Extal - Fabricante de Muebles Industriales de Confianza',
          paragraph1: 'Desde 1999, Naturra Extal ha sido el fabricante líder de Indonesia especializado en muebles industriales escandinavos de alta calidad. Con más de 25 años de experiencia en la industria del mobiliario de acero personalizado, nos hemos establecido como la mejor opción para soluciones de mobiliario comercial. Nuestra red se extiende por todo el archipiélago indonesio y hemos completado con éxito más de 1,000 pedidos para diversos negocios en todo el país. Desde pequeños cafés hasta grandes hoteles, servimos a todos con los mismos estándares de alta calidad.',
          subtitle2: 'Set de Bar, Set de Sala, Sofá Banco y Almacenamiento para Espacios Comerciales',
          paragraph2: 'Nos especializamos en crear sets de bar para exteriores, sets de sala, sofás banco, estanterías de almacenamiento y otros muebles industriales duraderos para diversos espacios comerciales. Desde cafeterías modernas y restaurantes concurridos hasta oficinas modernas y elegantes hoteles boutique, nuestra colección de novedades proporciona el toque perfecto para crear una atmósfera única. Aceptamos completamente solicitudes personalizadas y trabajamos en colaboración con nuestros clientes para diseñar piezas que coincidan con su identidad de marca única y requisitos funcionales. Cada producto está diseñado teniendo en cuenta la comodidad, la estética y la durabilidad a largo plazo.',
          subtitle3: 'Taller de Bekasi con los Mejores Estándares de Fabricación',
          paragraph3: 'Nuestro taller ubicado estratégicamente en Bekasi está equipado con equipos de fabricación de última generación y cuenta con un equipo de artesanos experimentados que se enorgullecen enormemente de cada detalle y acabado del producto. Cada pieza pasa por rigurosos procesos de control de calidad para garantizar que cumple con nuestros más altos estándares de durabilidad y atractivo visual. Ya sea que necesite un paquete completo de muebles para una nueva cafetería o piezas personalizadas para complementar su espacio existente, estamos aquí para ayudar a que su negocio se destaque y cree un espacio memorable para sus clientes.'
        }
      case 'fr':
        return {
          title: 'Message de Naturra',
          subtitle1: 'À propos de Naturra Extal - Fabricant de Meubles Industriels de Confiance',
          paragraph1: 'Depuis 1999, Naturra Extal est le principal fabricant indonésien spécialisé dans les meubles industriels scandinaves haut de gamme. Avec plus de 25 ans d\'expérience dans l\'industrie du mobilier en acier sur mesure, nous nous sommes imposés comme le meilleur choix pour les solutions de mobilier commercial. Notre réseau s\'\u00e9tend dans tout l\'archipel indonésien et nous avons réalisé avec succès plus de 1 000 commandes pour diverses entreprises à travers le pays. Des petits cafés aux grands hôtels, nous servons tous avec les mêmes normes de haute qualité.',
          subtitle2: 'Set de Bar, Set de Salon, Banc Canapé et Rangement pour Espaces Commerciaux',
          paragraph2: 'Nous nous spécialisons dans la création de sets de bar extérieurs, sets de salon, bancs canapés, étagères de rangement et autres meubles industriels durables pour divers espaces commerciaux. Des coffee shops branchés et restaurants animés aux bureaux modernes et hôtels boutique élégants, notre collection de nouveautés offre la touche parfaite pour créer une atmosphère unique. Nous acceptons entièrement les demandes personnalisées et travaillons en collaboration avec nos clients pour concevoir des pièces qui correspondent à leur identité de marque unique et à leurs exigences fonctionnelles. Chaque produit est conçu en tenant compte du confort, de l\'esthétique et de la durabilité à long terme.',
          subtitle3: 'Atelier de Bekasi avec les Meilleurs Standards de Fabrication',
          paragraph3: 'Notre atelier situé stratégiquement à Bekasi est équipé d\'\u00e9quipements de fabrication de pointe et doté d\'une équipe d\'artisans expérimentés qui sont extrêmement fiers de chaque détail et finition du produit. Chaque pièce subit des processus de contrôle qualité rigoureux pour s\'assurer qu\'elle répond à nos normes les plus élevées en matière de durabilité et d\'attrait visuel. Que vous ayez besoin d\'un ensemble complet de meubles pour un nouveau café ou de pièces personnalisées pour compléter votre espace existant, nous sommes là pour aider votre entreprise à se démarquer et créer un espace mémorable pour vos clients.'
        }
      case 'ko':
        return {
          title: '망갈라의 메시지',
          subtitle1: '망갈라 리빙 소개 - 신뢰할 수 있는 산업용 가구 제조업체',
          paragraph1: '1999년부터 망갈라 리빙은 프리미엄 산업용 스칸디나비아 가구를 전문으로 하는 인도네시아의 선도적인 제조업체입니다. 맞춤형 철제 가구 산업에서 25년 이상의 경험을 바탕으로 상업용 가구 솔루션의 최고의 선택으로 자리매김했습니다. 저희의 네트워크는 인도네시아 군도 전체에 걸쳐 있으며, 전국의 다양한 비즈니스를 위해 1,000개 이상의 주문을 성공적으로 완료했습니다. 소규모 카페부터 대형 호텔까지 동일한 고품질 기준으로 모두를 서비스합니다.',
          subtitle2: '상업 공간을 위한 바 세트, 라운지 세트, 소파 벤치 및 수납',
          paragraph2: '저희는 다양한 상업 공간을 위한 야외용 바 세트, 라운지 세트, 소파 벤치, 수납 랙 및 기타 내구성 있는 산업용 가구 제작을 전문으로 합니다. 트렌디한 커피숍과 분주한 레스토랑부터 현대적인 사무실과 우아한 부티크 호텔까지, 저희의 신제품 컨렉션은 독특한 분위기를 연출하는 완벽한 터치를 제공합니다. 저희는 맞춤 요청을 완전히 수락하며 고객과 협력하여 고유한 브랜드 정체성과 기능 요구 사항에 맞는 제품을 디자인합니다. 각 제품은 편안함, 미학, 장기 내구성을 고려하여 디자인되었습니다.',
          subtitle3: '최고의 제조 표준을 갖춘 비카시 워크숍',
          paragraph3: '비카시에 전략적으로 위치한 저희 워크숍은 최첨단 제조 장비를 갖추고 있으며, 제품의 모든 디테일과 마무리에 많은 자부심을 가진 숙련된 장인 팀이 운영하고 있습니다. 각 제품은 내구성과 시각적 매력에 대한 최고 표준을 충족하도록 엄격한 품질 관리 프로세스를 거칩니다. 새 커피숍을 위한 완전한 가구 패키지가 필요하든 기존 공간을 보완할 맞춤형 제품이 필요하든, 저희는 귀하의 비즈니스가 돋보이고 고객에게 기억에 남는 공간을 만들 수 있도록 도와드립니다.'
        }
      default:
        return {
          title: 'Message from Naturra',
          subtitle1: 'About Naturra Extal - Trusted Agricultural Commodities Manufacturer',
          paragraph1: 'Since 1999, Naturra Extal has been Indonesia\'s leading manufacturer specializing in premium industrial scandinavian furniture. With more than 25 years of experience in the custom steel furniture industry, we\'ve established ourselves as the best choice for commercial furniture solutions. Our network spans across the Indonesian archipelago, and we have successfully completed over 1,000 orders for various businesses nationwide. From small cafes to large hotels, we serve all with the same high quality standards.',
          subtitle2: 'Bar Set, Lounge Set, Sofa Bench & Storage for Commercial Spaces',
          paragraph2: 'We specialize in creating bar set outdoor, lounge set, sofa bench, storage rack and other durable Agricultural Commodities for various commercial spaces. From trendy coffee shops and bustling restaurants to modern offices and elegant boutique hotels, our new arrivals collection sets the perfect tone to create a unique atmosphere. We fully accept custom requests and work collaboratively with our clients to design pieces that match their unique brand identity and functional requirements. Each product is designed with consideration for comfort, aesthetics, and long-term durability.',
          subtitle3: 'Bekasi Workshop with Best Manufacturing Standards',
          paragraph3: 'Our strategically located workshop in Bekasi is equipped with state-of-the-art manufacturing equipment and staffed by a team of experienced craftsmen who take immense pride in every detail and finish of the product. Each piece undergoes rigorous quality control processes to ensure it meets our highest standards of durability and visual appeal. Whether you need a complete furniture package for a new coffee shop or custom pieces to complement your existing space, we\'re here to help your business stand out and create a memorable space for your customers.'
        }
    }
  }

  const t = getTranslations()
  return (
    <section className="about-message-section">
      <div className="about-message-container">
        <div className="about-message-content">
          <div className="about-message-text">
            <h2 className="about-message-title">
              {t.title}
            </h2>
            <div className="about-message-body">
              <>
                <h3 className="about-message-subtitle">{t.subtitle1}</h3>
                <p className="about-message-paragraph">
                  {t.paragraph1}
                </p>

                <h3 className="about-message-subtitle">{t.subtitle2}</h3>
                <p className="about-message-paragraph">
                  {t.paragraph2}
                </p>

                <h3 className="about-message-subtitle">{t.subtitle3}</h3>
                <p className="about-message-paragraph">
                  {t.paragraph3}
                </p>
              </>
            </div>
          </div>

          <div className="about-message-image-wrapper">
            <img
              src={showroomImage}
              alt={isIndonesian ? "Workshop Naturra Extal Bekasi - Manufacturer agricultural commodities Besi Custom dengan Peralatan Modern dan Pengrajin Berpengalaman" : "Naturra Extal Bekasi Workshop - Industrial Steel Custom Furniture Manufacturer with Modern Equipment and Experienced Craftsmen"}
              title={isIndonesian ? "Workshop Naturra Extal - Premium Agricultural Commodities Manufacturing in Bekasi Since 1999" : "Naturra Extal Workshop - Premium Agricultural Commodities Manufacturing in Bekasi Since 1999"}
              className="about-message-image"
              loading="lazy"
              width="600"
              height="450"
              itemProp="image"
              data-image-type="workshop"
              data-category="about-us"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessageSection

