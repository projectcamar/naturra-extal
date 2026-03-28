import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, ChevronDown, ChevronUp } from 'lucide-react'
import './Footer.css'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import { getLinkWithLanguage } from '../utils/languageManager'
import { getAllBlogPosts } from '../data/blog'
import logoILW from '../assets/LOGO-ILW-800.png'
import logoSVLK from '../assets/SVLK-LOGO-INDONESIA.png'

interface FooterProps {
  isIndonesian?: boolean
  language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'
}

const Footer: React.FC<FooterProps> = ({ language = 'en' }) => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isBlogArchiveExpanded, setIsBlogArchiveExpanded] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, email }),
      })

      if (response.ok) {
        setMessage({
          type: 'success',
          text: language === 'id'
            ? 'Terima kasih telah berlangganan!'
            : language === 'ar'
              ? 'شكراً لاشتراكك!'
              : language === 'zh'
                ? '感谢您的订阅！'
                : language === 'ja'
                  ? 'ご登録ありがとうございます！'
                  : language === 'es'
                    ? '¡Gracias por suscribirte!'
                    : language === 'fr'
                      ? 'Merci de vous être abonné !'
                      : language === 'ko'
                        ? '구독해 주셔서 감사합니다!'
                        : 'Thank you for subscribing!'
        })
        setFirstName('')
        setEmail('')
      } else {
        setMessage({
          type: 'error',
          text: language === 'id'
            ? 'Gagal berlangganan. Silakan coba lagi.'
            : language === 'ar'
              ? 'فشل الاشتراك. يرجى المحاولة مرة أخرى.'
              : language === 'zh'
                ? '订阅失败。请重试。'
                : language === 'ja'
                  ? '登録に失敗しました。もう一度お試しください。'
                  : language === 'es'
                    ? 'Suscripción fallida. Por favor, inténtalo de nuevo.'
                    : language === 'fr'
                      ? 'Échec de l\'abonnement. Veuillez réessayer.'
                      : language === 'ko'
                        ? '구독에 실패했습니다. 다시 시도해주세요.'
                        : 'Subscription failed. Please try again.'
        })
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setMessage({
        type: 'error',
        text: language === 'id'
          ? 'Terjadi kesalahan. Silakan coba lagi.'
          : language === 'ar'
            ? 'حدث خطأ. يرجى المحاولة مرة أخرى.'
            : language === 'zh'
              ? '发生错误。请重试。'
              : language === 'ja'
                ? 'エラーが発生しました。もう一度お試しください。'
                : language === 'es'
                  ? 'Ocurrió un error. Por favor, inténtalo de nuevo.'
                  : language === 'fr'
                    ? 'Une erreur s\'est produite. Veuillez réessayer.'
                    : language === 'ko'
                      ? '오류가 발생했습니다. 다시 시도해주세요.'
                      : 'An error occurred. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <footer className="footer" role="contentinfo" itemScope itemType="https://schema.org/WPFooter">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <h2 className="footer-logo">Naturra</h2>
            <p className="footer-description">
              {language === 'id'
                ? "Pilihan terbaik untuk agricultural commodities scandinavian premium sejak 1999. Melayani coffee shop, restoran, dan bisnis di seluruh Indonesia. Pesanan custom diterima."
                : language === 'ar'
                  ? "خيارك الأفضل للأثاث الصناعي الاسكندنافي الفاخر منذ عام 1999. نخدم المقاهي والمطاعم والأعمال في جميع أنحاء إندونيسيا وجاكرتا والأسواق الدولية الرئيسية. نرحب بالطلبات المخصصة."
                  : language === 'zh'
                    ? "自1999年以来，您的优质工业斯堪的纳维亚家具的最佳选择。服务于印度尼西亚、雅加达和主要国际市场的咖啡店、餐厅和企业。欢迎定制订单。"
                    : language === 'ja'
                      ? "1999年以来、プレミアムインダストリアル・スカンジナビア家具のベストチョイス。インドネシア、ジャカルタ、主要国際市場のカフェ、レストラン、ビジネスにサービスを提供。カスタムオーダー歓迎。"
                      : language === 'es'
                        ? "Su mejor opción para muebles industriales escandinavos premium desde 1999. Sirviendo a cafeterías, restaurantes y negocios en Indonesia, Yakarta y principales mercados internacionales. Pedidos personalizados bienvenidos."
                        : language === 'fr'
                          ? "Votre meilleur choix pour des meubles industriels scandinaves premium depuis 1999. Au service des cafés, restaurants et entreprises à travers l'Indonésie, Jakarta et les principaux marchés internationaux. Commandes personnalisées bienvenues."
                          : language === 'ko'
                            ? "1999년부터 프리미엄 산업용 스칸디나비아 가구의 최고 선택. 인도네시아, 자카르타 및 주요 국제 시장의 카페, 레스토랑, 비즈니스에 서비스 제공. 맞춤 주문 환영."
                            : "Your best choice for premium industrial scandinavian furniture since 1999. Serving coffee shops, restaurants, and businesses across Indonesia, Jabodetabek, Jakarta, and major international markets. Custom orders welcome."
              }
            </p>
            <div className="footer-contact-info">
              <h4>{language === 'id' ? "Hubungi Kami" : language === 'ar' ? "اتصل بنا" : language === 'zh' ? "联系我们" : language === 'ja' ? "お問い合わせ" : language === 'es' ? "Contáctenos" : language === 'fr' ? "Contactez-nous" : language === 'ko' ? "연락처" : "Contact Us"}</h4>
              <p>
                <a href="mailto:lifewithNaturra@gmail.com" style={{ color: 'inherit', textDecoration: 'underline' }}>
                  lifewithNaturra@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/+6288801146881"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                  onClick={() => trackWhatsAppClick('footer_contact_info')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +6288801146881
                </a>
              </p>
              <div className="footer-social-icons">
                <a href="https://instagram.com/Naturra_living" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com/Naturraliving" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Find Us */}
          <div className="footer-column">
            <h4>{language === 'id' ? "Temukan Kami" : language === 'ar' ? "موقعنا" : language === 'zh' ? "找到我们" : language === 'ja' ? "アクセス" : language === 'es' ? "Encuéntranos" : language === 'fr' ? "Nous Trouver" : language === 'ko' ? "찾아오시는 길" : "Find Us"}</h4>
            <div className="footer-location">
              <h5>Workshop Bekasi :</h5>
              <p>
                <a
                  href="https://maps.app.goo.gl/5Bc5ymfVtAYRPtpK7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-address-link"
                >
                  Jl. Raya Setu Cibitung - Bekasi, Telajung, Kec. Cikarang Bar., Kabupaten Bekasi, Jawa Barat 17320
                </a>
              </p>
              <p className="footer-phone">
                <a
                  href="https://wa.me/+6288801146881"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                  onClick={() => trackWhatsAppClick('footer_workshop_address')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +6288801146881
                </a>
              </p>
              <h5 className="footer-certifications-title">
                {language === 'id' ? "Sertifikasi :" : language === 'ar' ? "الشهادات :" : language === 'zh' ? "认证 :" : language === 'ja' ? "認証 :" : language === 'es' ? "Certificaciones :" : language === 'fr' ? "Certifications :" : language === 'ko' ? "인증 :" : "Certifications :"}
              </h5>
              <div className="footer-certification-logos">
                <div className="footer-cert-logo-wrapper">
                  <img
                    src={logoILW}
                    alt="Legal Wood Sourcing"
                    className="footer-cert-logo"
                  />
                  <div className="footer-cert-tooltip">
                    {language === 'id'
                      ? 'Legal Wood Sourcing - Semua kayu kami berasal dari pemasok yang memiliki dokumen legalitas lengkap dan mematuhi regulasi kehutanan Indonesia.'
                      : language === 'ar'
                        ? 'توريد أخشاب قانوني - جميع أخشابنا تأتي من موردين موثقين يقدمون مستندات قانونية كاملة ويلتزمون بلوائح الغابات الإندونيسية.'
                        : language === 'zh'
                          ? '合法木材采购——我们的木材全部来自提供完整合法文件并遵守印度尼西亚林业法规的供应商。'
                          : language === 'ja'
                            ? '合法木材調達 - すべての木材は完全な法的書類を備え、インドネシアの森林規制を遵守するサプライヤーから仕入れています。'
                            : language === 'es'
                              ? 'Abastecimiento Legal de Madera: toda nuestra madera proviene de proveedores verificados que entregan documentación completa y cumplen la normativa forestal de Indonesia.'
                              : language === 'fr'
                                ? 'Approvisionnement légal en bois - Tout notre bois provient de fournisseurs vérifiés qui fournissent une documentation complète et respectent la réglementation forestière indonésienne.'
                                : language === 'ko'
                                  ? '합법 목재 조달 - 모든 목재는 완전한 법적 서류를 갖추고 인도네시아 산림 규정을 준수하는 공급업체에서만 공급받습니다.'
                                  : 'Legal Wood Sourcing - We partner only with verified suppliers who provide complete legal documentation and comply with Indonesian forestry regulations.'}
                  </div>
                </div>
                <div className="footer-cert-logo-wrapper">
                  <img
                    src={logoSVLK}
                    alt="SVLK Certification"
                    className="footer-cert-logo"
                  />
                  <div className="footer-cert-tooltip">
                    {language === 'id'
                      ? 'Sistem Verifikasi Legalitas Kayu (SVLK) - Sertifikasi resmi Indonesia untuk memastikan kayu berasal dari sumber legal dan berkelanjutan. Kami berkomitmen pada praktik logging yang bertanggung jawab dan ramah lingkungan.'
                      : language === 'ar'
                        ? 'Sistem Verifikasi Legalitas Kayu (SVLK) - شهادة إندونيسية رسمية لضمان أن الخشب يأتي من مصادر قانونية ومستدامة. نحن ملتزمون بممارسات قطع الأشجار المسؤولة والصديقة للبيئة.'
                        : language === 'zh'
                          ? 'Sistem Verifikasi Legalitas Kayu (SVLK) - 印度尼西亚官方认证，确保木材来自合法和可持续的来源。我们致力于负责任的环保采伐实践。'
                          : language === 'ja'
                            ? 'Sistem Verifikasi Legalitas Kayu (SVLK) - 木材が合法的で持続可能な源から来ることを保証するインドネシアの公式認証。責任ある環境に配慮した伐採慣行に取り組んでいます。'
                            : language === 'es'
                              ? 'Sistem Verifikasi Legalitas Kayu (SVLK) - Certificación oficial de Indonesia para garantizar que la madera proviene de fuentes legales y sostenibles. Estamos comprometidos con prácticas de tala responsables y respetuosas con el medio ambiente.'
                              : language === 'fr'
                                ? 'Sistem Verifikasi Legalitas Kayu (SVLK) - Certification officielle indonésienne garantissant que le bois provient de sources légales et durables. Nous nous engageons à des pratiques d\'exploitation forestière responsables et respectueuses de l\'environnement.'
                                : language === 'ko'
                                  ? 'Sistem Verifikasi Legalitas Kayu (SVLK) - 목재가 합법적이고 지속 가능한 원천에서 나온다는 것을 보장하는 인도네시아 공식 인증. 책임감 있고 환경 친화적인 벌채 관행에 전념하고 있습니다.'
                                  : 'Sistem Verifikasi Legalitas Kayu (SVLK) - Official Indonesian certification ensuring wood comes from legal and sustainable sources. We are committed to responsible and environmentally-friendly logging practices.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4>{language === 'id' ? "Tautan Cepat" : language === 'ar' ? "روابط سريعة" : language === 'zh' ? "快速链接" : language === 'ja' ? "クイックリンク" : language === 'es' ? "Enlaces Rápidos" : language === 'fr' ? "Liens Rapides" : language === 'ko' ? "빠른 링크" : "Quick Links"}</h4>
            <ul className="footer-links">
              <li><Link to={getLinkWithLanguage("/shop", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Toko' : language === 'ar' ? 'متجر' : language === 'zh' ? '商店' : language === 'ja' ? 'ショップ' : language === 'es' ? 'Tienda' : language === 'fr' ? 'Boutique' : language === 'ko' ? '상점' : 'Shop'}</Link></li>
              <li><Link to={getLinkWithLanguage("/about", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Tentang' : language === 'ar' ? 'حول' : language === 'zh' ? '关于' : language === 'ja' ? '会社概要' : language === 'es' ? 'Acerca de' : language === 'fr' ? 'À propos' : language === 'ko' ? '회사 소개' : 'About'}</Link></li>
              <li><Link to={getLinkWithLanguage("/blog", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Blog' : language === 'ar' ? 'مدونة' : language === 'zh' ? '博客' : language === 'ja' ? 'ブログ' : language === 'es' ? 'Blog' : language === 'fr' ? 'Blog' : language === 'ko' ? '블로그' : 'Blog'}</Link></li>
              <li><Link to={getLinkWithLanguage("/shipping-information", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? "Pengiriman" : language === 'ar' ? "الشحن" : language === 'zh' ? "运输" : language === 'ja' ? "配送" : language === 'es' ? "Envío" : language === 'fr' ? "Expédition" : language === 'ko' ? "배송" : "Shipping"}</Link></li>
              <li><Link to={getLinkWithLanguage("/contact-us", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Hubungi Kami' : language === 'ar' ? 'اتصل بنا' : language === 'zh' ? '联系我们' : language === 'ja' ? 'お問い合わせ' : language === 'es' ? 'Contáctenos' : language === 'fr' ? 'Contactez-nous' : language === 'ko' ? '문의하기' : 'Contact Us'}</Link></li>
              <li><Link to={getLinkWithLanguage("/custom-order", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? "Pesanan Khusus" : language === 'ar' ? "طلب مخصص" : language === 'zh' ? "定制订单" : language === 'ja' ? "カスタム注文" : language === 'es' ? "Pedido Personalizado" : language === 'fr' ? "Commande Personnalisée" : language === 'ko' ? "맞춤 주문" : "Custom Order"}</Link></li>
              <li><Link to={getLinkWithLanguage("/partnership", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? "Kerja Sama" : language === 'ar' ? "شراكة" : language === 'zh' ? "合作" : language === 'ja' ? "パートナーシップ" : language === 'es' ? "Asociación" : language === 'fr' ? "Partenariat" : language === 'ko' ? "파트너십" : "Partnership"}</Link></li>
              <li><Link to={getLinkWithLanguage("/terms-of-service", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? "Syarat & Ketentuan" : language === 'ar' ? "الشروط والأحكام" : language === 'zh' ? "服务条款" : language === 'ja' ? "利用規約" : language === 'es' ? "Términos de Servicio" : language === 'fr' ? "Conditions de Service" : language === 'ko' ? "서비스 약관" : "Terms of Service"}</Link></li>
              <li><Link to={getLinkWithLanguage("/image-license", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? "Lisensi Gambar" : language === 'ar' ? "ترخيص الصور" : language === 'zh' ? "图像许可" : language === 'ja' ? "画像ライセンス" : language === 'es' ? "Licencia de Imagen" : language === 'fr' ? "Licence d'Image" : language === 'ko' ? "이미지 라이선스" : "Image License"}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-column">
            <h4>{language === 'id' ? 'Kategori' : language === 'ar' ? 'الفئات' : language === 'zh' ? '类别' : language === 'ja' ? 'カテゴリー' : language === 'es' ? 'Categorías' : language === 'fr' ? 'Catégories' : language === 'ko' ? '카테고리' : 'Categories'}</h4>
            <ul className="footer-links">
              <li><Link to={getLinkWithLanguage("/product-category/new-arrivals", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Produk Baru' : language === 'ar' ? 'وصل حديثاً' : language === 'zh' ? '新品' : language === 'ja' ? '新着' : language === 'es' ? 'Novedades' : language === 'fr' ? 'Nouveautés' : language === 'ko' ? '신제품' : 'New Arrivals'}</Link></li>
              <li><Link to={getLinkWithLanguage("/product-category/lounge-seating-set", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Set Lounge' : language === 'ar' ? 'طقم صالة' : language === 'zh' ? '休息区套装' : language === 'ja' ? 'ラウンジセット' : language === 'es' ? 'Set de Sala' : language === 'fr' ? 'Set de Salon' : language === 'ko' ? '라운지 세트' : 'Lounge Set'}</Link></li>
              <li><Link to={getLinkWithLanguage("/product-category/industrial-sofa-bench", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Sofa Bench' : language === 'ar' ? 'أريكة' : language === 'zh' ? '沙发长椅' : language === 'ja' ? 'ソファベンチ' : language === 'es' ? 'Sofá Banco' : language === 'fr' ? 'Banc Canapé' : language === 'ko' ? '소파 벤치' : 'Sofa Bench'}</Link></li>
              <li><Link to={getLinkWithLanguage("/product-category/dining-set-collection", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Set Makan' : language === 'ar' ? 'طقم طعام' : language === 'zh' ? '餐桌套装' : language === 'ja' ? 'ダイニングセット' : language === 'es' ? 'Set de Comedor' : language === 'fr' ? 'Set de Salle à Manger' : language === 'ko' ? '다이닝 세트' : 'Dining Set'}</Link></li>
              <li><Link to={getLinkWithLanguage("/product-category/bar-furniture-collection", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Set Bar' : language === 'ar' ? 'طقم بار' : language === 'zh' ? '吧台套装' : language === 'ja' ? 'バーセット' : language === 'es' ? 'Set de Bar' : language === 'fr' ? 'Set de Bar' : language === 'ko' ? '바 세트' : 'Bar Set'}</Link></li>
              <li><Link to={getLinkWithLanguage("/product-category/balcony-outdoor-collection", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Outdoor' : language === 'ar' ? 'خارجي' : language === 'zh' ? '户外' : language === 'ja' ? 'アウトドア' : language === 'es' ? 'Exterior' : language === 'fr' ? 'Extérieur' : language === 'ko' ? '야외용' : 'Outdoor'}</Link></li>
              <li><Link to={getLinkWithLanguage("/product-category/daybed-lounge-frame", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Daybed' : language === 'ar' ? 'سرير نهاري' : language === 'zh' ? '躺椅' : language === 'ja' ? 'デイベッド' : language === 'es' ? 'Cama de Día' : language === 'fr' ? 'Lit de Jour' : language === 'ko' ? '데이베드' : 'Daybed'}</Link></li>
              <li><Link to={getLinkWithLanguage("/product-category/accessories-storage", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Penyimpanan' : language === 'ar' ? 'تخزين' : language === 'zh' ? '储物' : language === 'ja' ? '収納' : language === 'es' ? 'Almacenamiento' : language === 'fr' ? 'Rangement' : language === 'ko' ? '수납' : 'Storage'}</Link></li>
              <li><Link to={getLinkWithLanguage("/product-category/table-collection", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Meja' : language === 'ar' ? 'طاولات' : language === 'zh' ? '桌子' : language === 'ja' ? 'テーブル' : language === 'es' ? 'Mesas' : language === 'fr' ? 'Tables' : language === 'ko' ? '테이블' : 'Tables'}</Link></li>
              <li><Link to={getLinkWithLanguage("/product-category/dining-table-collection", language)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{language === 'id' ? 'Meja Makan' : language === 'ar' ? 'طاولة طعام' : language === 'zh' ? '餐桌' : language === 'ja' ? 'ダイニングテーブル' : language === 'es' ? 'Mesa de Comedor' : language === 'fr' ? 'Table à Manger' : language === 'ko' ? '식탁' : 'Dine Table'}</Link></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="footer-column">
            <h4>{language === 'id' ? "Berlangganan" : language === 'ar' ? "اشترك" : language === 'zh' ? "订阅" : language === 'ja' ? "登録" : language === 'es' ? "Suscríbete" : language === 'fr' ? "S'abonner" : language === 'ko' ? "구독" : "Subscribe"}</h4>
            <form onSubmit={handleSubscribe} className="footer-subscribe-form">
              <input
                type="text"
                placeholder={language === 'id' ? "Nama depan" : language === 'ar' ? "الاسم الأول" : language === 'zh' ? "名字" : language === 'ja' ? "名前" : language === 'es' ? "Nombre" : language === 'fr' ? "Prénom" : language === 'ko' ? "이름" : "First name"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <input
                type="email"
                placeholder={language === 'ar' ? "البريد الإلكتروني" : language === 'zh' ? "电子邮件" : language === 'ja' ? "メールアドレス" : language === 'es' ? "Correo electrónico" : language === 'fr' ? "Email" : language === 'ko' ? "이메일" : "Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? (language === 'id' ? "Mengirim..." : language === 'ar' ? "جاري الإرسال..." : language === 'zh' ? "发送中..." : language === 'ja' ? "送信中..." : language === 'es' ? "Enviando..." : language === 'fr' ? "Envoi..." : language === 'ko' ? "보내는 중..." : "Sending...")
                  : (language === 'id' ? "BERLANGGANAN" : language === 'ar' ? "اشترك" : language === 'zh' ? "订阅" : language === 'ja' ? "登録" : language === 'es' ? "SUSCRIBIRSE" : language === 'fr' ? "S'ABONNER" : language === 'ko' ? "구독하기" : "SUBSCRIBE")
                }
              </button>
              {message && (
                <div className={`subscribe-message ${message.type}`}>
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Blog Posts Links Section - Collapsible but always in DOM for SEO crawlability */}
        <div className="footer-blog-archive">
          <button
            className="footer-blog-archive-toggle"
            onClick={() => setIsBlogArchiveExpanded(!isBlogArchiveExpanded)}
            aria-expanded={isBlogArchiveExpanded}
            aria-label={language === 'id' ? "Toggle arsip blog" : "Toggle blog archive"}
          >
            <h4>{language === 'id' ? "Arsip Blog" : language === 'ar' ? "أرشيف المدونة" : language === 'zh' ? "博客存档" : language === 'ja' ? "ブログアーカイブ" : language === 'es' ? "Archivo del Blog" : language === 'fr' ? "Archives du Blog" : language === 'ko' ? "블로그 아카이브" : "Blog Archive"}</h4>
            {isBlogArchiveExpanded ? (
              <ChevronUp size={20} className="footer-toggle-icon" />
            ) : (
              <ChevronDown size={20} className="footer-toggle-icon" />
            )}
          </button>
          <nav
            className={`footer-blog-links ${isBlogArchiveExpanded ? 'expanded' : 'collapsed'}`}
            aria-label="Blog posts"
            aria-hidden={!isBlogArchiveExpanded}
          >
            {getAllBlogPosts().map((post) => (
              <Link
                key={post.id}
                to={getLinkWithLanguage(`/blog/${post.slug}`, language)}
                className="footer-blog-link"
                aria-label={`${post.title} - ${post.category}`}
              >
                {post.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <p>Copyright 2025 Naturra Extal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
