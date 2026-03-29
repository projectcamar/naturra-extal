import React from 'react'
import '../pages/About.css'

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
          subtitle1: 'Tentang Naturra Extal - Eksportir Komoditas Pertanian Terpercaya',
          paragraph1: 'Sejak tahun 1999, Naturra Extal telah menjadi mitra terpercaya bagi pembeli internasional yang mencari komoditas pertanian premium dari Indonesia. Dengan pengalaman lebih dari 25 tahun, kami telah membangun jaringan kuat yang menghubungkan petani lokal di Sulawesi, Sumatra, dan Jawa dengan pasar global. Kami mengkhususkan diri dalam pengadaan, kontrol kualitas, dan logistik ekspor untuk produk unggulan seperti Bubuk Kakao, Cengkeh, dan Cocopeat.',
          subtitle2: 'Sourcing Langsung & Kontrol Kualitas Ketat',
          paragraph2: 'Kami percaya bahwa kualitas dimulai dari sumbernya. Itulah sebabnya tim kami bekerja sama langsung dengan jaringan petani untuk memastikan setiap produk memenuhi standar internasional (Global GAP & COA). Baik itu Bubuk Kakao dengan profil rasa yang kaya, Cengkeh Grade Lal Pari yang aromatik, atau Cocopeat Low EC untuk hortikultura berkelanjutan, kami menjamin konsistensi pasokan dan kemurnian produk di setiap pengiriman.',
          subtitle3: 'Pusat Logistik Ekspor Bekasi & Surabaya',
          paragraph3: 'Fasilitas operasional kami di Bekasi dan Surabaya berfungsi sebagai pusat kontrol kualitas dan konsolidasi logistik. Dilengkapi dengan teknologi pemrosesan modern dan staf berpengalaman, kami memastikan setiap kontainer yang berangkat telah melalui pemeriksaan menyeluruh. Naturra Extal siap menjadi mitra strategis Anda dalam mengamankan rantai pasok komoditas pertanian berkualitas tinggi dari kepulauan Indonesia ke seluruh penjuru dunia.'
        }
      case 'ar':
        return {
          title: 'رسالة من Naturra',
          subtitle1: 'حول Naturra Extal - مصدر سلع زراعية موثوق',
          paragraph1: 'منذ عام 1999 ، كانت Naturra Extal شريكًا موثوقًا للمشترين الدوليين الذين يبحثون عن سلع زراعية متميزة من إندونيسيا. مع أكثر من 25 عامًا من الخبرة ، قمنا ببناء شبكة قوية تربط المزارعين المحليين في سولاويزي وسومطرة وجاوة بالأسواق العالمية. نحن متخصصون في التوريد ومراقبة الجودة ولوجستيات التصدير للمنتجات الرائدة مثل مسحوق الكاكاو والقرنفل وكوكوبيت.',
          subtitle2: 'التوريد المباشر ومراقبة الجودة الصارمة',
          paragraph2: 'نحن نؤمن بأن الجودة تبدأ من المصدر. لهذا السبب يعمل فريقنا مباشرة مع مزارعينا لضمان استيفاء كل منتج للمعايير الدولية. سواء كان مسحوق الكاكاو بنكهة غنية ، أو قرنفل لالا باري العطري ، أو كوكوبيت منخفض الملوحة للبستنة المستدامة ، فإننا نضمن اتساق العرض ونقاء المنتج في كل شحنة.',
          subtitle3: 'مركز بيكاسي وسورابايا اللوجستي للتصدير',
          paragraph3: 'تعمل مرافقنا التشغيلية في بيكاسي وسورابايا كمراكز لمراقبة الجودة وتوحيد اللوجستيات. مجهزة بتقنيات المعالجة الحديثة وموظفين ذوي خبرة ، نضمن أن كل حاوية مغادرة قد خضعت لفحص شامل. Naturra Extal مستعدة لتكون شريكك الاستراتيجي في تأمين سلسلة توريد سلع زراعية عالية الجودة من الأرخبيل الإندونيسي إلى جميع أنحاء العالم.'
        }
      case 'zh':
        return {
          title: '来自 Naturra 的信息',
          subtitle1: '关于 Naturra Extal - 值得信赖的农产品出口商',
          paragraph1: '自1999年以来，Naturra Extal 一直是寻求印尼优质农产品的国际买家的可靠合作伙伴。凭借25年以上的经验，我们建立了强大的网络，将苏拉威西、苏门答腊和爪哇的当地农民与全球市场联系起来。我们专注于可可粉、丁香和椰糠等领先产品的采购、质量控制和出口物流。',
          subtitle2: '直接采购与严格的质量控制',
          paragraph2: '我们相信质量始于源头。这就是为什么我们的团队直接与农民网络合作，以确保每件产品都符合国际标准。无论是风味丰富的可可粉、香气浓郁的 Lal Pari 级丁香，还是用于可持续园艺的低 EC 椰糠，我们都保证每批货物的供应一致性和产品纯度。',
          subtitle3: '勿加泗和泗水出口物流中心',
          paragraph3: '我们在勿加泗和泗水的运营设施是质量控制和物流整合的中心。我们配备了现代化的加工技术和经验丰富的员工，确保每集装箱货物在出发前都经过彻底检查。Naturra Extal 随时准备成为您的战略合作伙伴，将来自印尼群岛的高质量农产品供应链输送到世界各地。'
        }
      case 'ja':
        return {
          title: 'Naturraからのメッセージ',
          subtitle1: 'Naturra Extalについて - 信頼される農産物輸出業者',
          paragraph1: '1999年以来、Naturra Extalはインドネシア産のプレミアム農産物を求める国際的なバイヤーにとって信頼できるパートナーです。25年以上の経験を活かし、スラウェシ、スマトラ、ジャワの地元農家とグローバル市場を結ぶ強力なネットワークを構築してきました。ココアパウダー、クローブ、ココピートなどの主要製品の調達、品質管理、輸出物流を専門としています。',
          subtitle2: '直接調達と厳格な品質管理',
          paragraph2: '品質は源泉から始まると私たちは信じています。そのため、当社のチームは農家ネットワークと直接協力し、すべての製品が国際基準を満たしていることを確認しています。豊かな風味のココアパウダー、芳香の強いラルパリグレードのクローブ、持続可能な園芸用の低ECココピートなど、すべての出荷において供給の一貫性と製品の純度を保証します。',
          subtitle3: 'ベカシとスラバヤの輸出物流センター',
          paragraph3: 'ベカシとスラバヤにある当社の運営施設は、品質管理と物流統合の拠点として機能しています。最新の加工技術と経験豊富なスタッフを備え、出発するすべてのコンテナが徹底的な検査を受けていることを保証します。Naturra Extalは、インドネシア諸島から世界中へ高品質な農産物サプライチェーンを確保するための戦略的パートナーとなる準備ができています。'
        }
      case 'es':
        return {
          title: 'Mensaje de Naturra',
          subtitle1: 'Acerca de Naturra Extal - Exportador de Materias Primas Agrícolas de Confianza',
          paragraph1: 'Desde 1999, Naturra Extal ha sido un socio confiable para compradores internacionales que buscan materias primas agrícolas premium de Indonesia. Con más de 25 años de experiencia, hemos construido una red sólida que conecta a agricultores locales en Sulawesi, Sumatra y Java con los mercados globales. Nos especializamos en el abastecimiento, control de calidad y logística de exportación de productos líderes como cacao en polvo, clavo y cocopeat.',
          subtitle2: 'Abastecimiento Directo y Estricto Control de Calidad',
          paragraph2: 'Creemos que la calidad comienza en la fuente. Por eso nuestro equipo trabaja directamente con redes de agricultores para garantizar que cada producto cumpla con los estándares internacionales. Ya sea cacao en polvo con un perfil de sabor rico, clavo de grado Lal Pari aromático o cocopeat de baja CE para horticultura sostenible, garantizamos la consistencia del suministro y la pureza del producto en cada envío.',
          subtitle3: 'Centros Logísticos de Exportación en Bekasi y Surabaya',
          paragraph3: 'Nuestras instalaciones operativas en Bekasi y Surabaya funcionan como centros de control de calidad y consolidación logística. Equipados con tecnología de procesamiento moderna y personal experimentado, aseguramos que cada contenedor que sale haya pasado por una inspección exhaustiva. Naturra Extal está lista para ser su socio estratégico en el aseguramiento de la cadena de suministro de materias primas agrícolas de alta calidad desde el archipiélago indonesio al resto del mundo.'
        }
      case 'fr':
        return {
          title: 'Message de Naturra',
          subtitle1: 'À propos de Naturra Extal - Exportateur de Matières Premières Agricoles de Confiance',
          paragraph1: 'Depuis 1999, Naturra Extal est un partenaire de confiance pour les acheteurs internationaux à la recherche de matières premières agricoles de qualité supérieure en provenance d\'Indonésie. Avec plus de 25 ans d\'expérience, nous avons bâti un réseau solide reliant les agriculteurs locaux de Sulawesi, Sumatra et Java aux marchés mondiaux. Nous sommes spécialisés dans le sourcing, le contrôle qualité et la logistique d\'exportation pour des produits phares tels que la poudre de cacao, les clous de girofle et le cocopeat.',
          subtitle2: 'Sourcing Direct et Contrôle Qualité Strict',
          paragraph2: 'Nous pens po que la qualité commence à la source. C\'est pourquoi notre équipe travaille directement avec les réseaux d\'agriculteurs pour s\'assurer que chaque produit répond aux normes internationales. Qu\'il s\'agisse de poudre de cacao au profil aromatique riche, de clous de girofle de qualité Lal Pari aromatiques ou de cocopeat à faible EC pour une horticulture durable, nous garantissons la constance de l\'approvisionnement et la pureté du produit à chaque expédition.',
          subtitle3: 'Centres Logistiques d\'Exportation de Bekasi et Surabaya',
          paragraph3: 'Nos installations opérationnelles à Bekasi et Surabaya servent de centres de contrôle qualité et de consolidation logistique. Équipés d\'une technologie de traitement moderne et d\'un personnel expérimenté, nous veillons à ce que chaque conteneur au départ ait subi une inspection approfondie. Naturra Extal est prête à être votre partenaire stratégique pour sécuriser la chaîne d\'approvisionnement en matières premières agricoles de haute qualité, de l\'archipel indonésien vers le monde entier.'
        }
      case 'ko':
        return {
          title: 'Naturra의 메시지',
          subtitle1: 'Naturra Extal 소개 - 신뢰할 수 있는 농산물 수출업체',
          paragraph1: '1999년부터 Naturra Extal은 인도네시아산 프리미엄 농산물을 찾는 국제 바이어들에게 신뢰할 수 있는 파트너였습니다. 25년 이상의 경험을 통해 술라웨시, 수마트라, 자바의 현지 농부들과 글로벌 시장을 잇는 강력한 네트워크를 구축했습니다. 당사는 코코아 가루, 정향, 코코피트와 같은 주요 제품의 소싱, 품질 관리 및 수출 물류를 전문으로 합니다.',
          subtitle2: '직접 소싱 및 엄격한 품질 관리',
          paragraph2: '품질은 원천에서 시작된다고 믿습니다. 이것이 바로 당사 팀이 농가 네트워크와 직접 협력하여 모든 제품이 국제 표준을 충족하도록 보장하는 이유입니다. 풍부한 풍미의 코코아 가루, 향긋한 Lal Pari 등급의 정향, 또는 지속 가능한 원예를 위한 낮은 EC 코코피트 등 모든 선적에서 공급의 일관성과 제품의 순도를 보장합니다.',
          subtitle3: '비카시 및 수라바야 수출 물류 센터',
          paragraph3: '비카시와 수라바야에 위치한 당사의 운영 시설은 품질 관리 및 물류 통합의 허브 역할을 합니다. 현대적인 가공 기술과 숙련된 직원을 갖추고 있어, 출고되는 모든 컨테이너가 철저한 검사를 거쳤음을 보장합니다. Naturra Extal은 인도네시아 군도에서 전 세계로 고품질 농산물 공급망을 확보하기 위한 전략적 파트너가 될 준비가 되어 있습니다.'
        }
      default:
        return {
          title: 'Message from Naturra',
          subtitle1: 'About Naturra Extal - Trusted Agricultural Commodities Exporter',
          paragraph1: 'Since 1999, Naturra Extal has been a trusted partner for international buyers seeking premium agricultural commodities from Indonesia. With more than 25 years of experience, we\'ve built a robust network connecting local farmers in Sulawesi, Sumatra, and Java to global markets. We specialize in the sourcing, quality control, and export logistics of leading products such as Cocoa Powder, Cloves, and Cocopeat.',
          subtitle2: 'Direct Sourcing & Strict Quality Control',
          paragraph2: 'We believe that quality starts at the source. That\'s why our team works directly with farmer networks to ensure every product meets international standards. Whether it\'s Cocoa Powder with a rich flavor profile, aromatic Lal Pari Grade Cloves, or Low EC Cocopeat for sustainable horticulture, we guarantee supply consistency and product purity in every shipment.',
          subtitle3: 'Bekasi & Surabaya Export Logistics Hub',
          paragraph3: 'Our operational facilities in Bekasi and Surabaya serve as centers for quality control and logistics consolidation. Equipped with modern processing technology and experienced staff, we ensure every departing container has undergone thorough inspection. Naturra Extal is ready to be your strategic partner in securing a high-quality agricultural commodity supply chain from the Indonesian archipelago to all corners of the world.'
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
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200"
              alt={isIndonesian ? "Fasilitas Ekspor Naturra Extal - Pengiriman Komoditas Pertanian Premium dengan Standar Internasional" : "Naturra Extal Export Facility - Shipping Premium Agricultural Commodities with International Standards"}
              title={isIndonesian ? "Naturra Extal - Eksportir Komoditas Pertanian Premium sejak 1999" : "Naturra Extal - Premium Agricultural Commodity Exporter Since 1999"}
              className="about-message-image"
              loading="lazy"
              width="600"
              height="450"
              itemProp="image"
              data-image-type="export-facility"
              data-category="about-us"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessageSection
