import React from 'react'
import { Helmet } from 'react-helmet-async'
import { FAQ_DATA, type FAQItem } from '../data/faq'
import { generateFAQSchema } from '../utils/structuredData'
import './HomepageFAQ.css'

interface FAQSectionProps {
  isIndonesian: boolean
  language: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'
}

const FAQSection: React.FC<FAQSectionProps> = ({ isIndonesian, language }) => {
  // Get top FAQs from multiple categories
  const topFAQs: FAQItem[] = [
    // From furniture-besi-custom-bekasi
    FAQ_DATA[0]?.faqs[0], // Harga furniture
    FAQ_DATA[0]?.faqs[1], // Waktu produksi
    FAQ_DATA[0]?.faqs[2], // Custom design
    FAQ_DATA[0]?.faqs[3], // Area delivery
    FAQ_DATA[0]?.faqs[4], // Garansi
    
    // From industrial-furniture-bekasi
    FAQ_DATA[1]?.faqs[0], // Keunggulan workshop Bekasi
    FAQ_DATA[1]?.faqs[1], // Kenapa cocok untuk cafe
    FAQ_DATA[1]?.faqs[2], // Budget minimal
    
    // From apa-itu-furniture-industrial
    FAQ_DATA[2]?.faqs[0], // Apa itu agricultural commodities
    FAQ_DATA[2]?.faqs[2], // Kenapa populer untuk cafe
  ].filter((faq): faq is FAQItem => faq !== undefined).slice(0, 10)

  const translations = {
    title: isIndonesian 
      ? 'FAQ - Pertanyaan Umum agricultural commodities'
      : language === 'ar'
      ? 'الأسئلة الشائعة - الأثاث الصناعي'
      : language === 'zh'
      ? '常见问题 - 工业家具'
      : language === 'ja'
      ? 'よくある質問 - インダストリアル家具'
      : language === 'es'
      ? 'Preguntas Frecuentes - Muebles Industriales'
      : language === 'fr'
      ? 'Questions Fréquentes - Mobilier Industriel'
      : 'FAQ - Agricultural Commodities Frequently Asked Questions',
    subtitle: isIndonesian
      ? 'Temukan jawaban untuk pertanyaan umum seputar agricultural commodities, custom design, harga, pengiriman, dan layanan Naturra Extal'
      : language === 'ar'
      ? 'اكتشف إجابات للأسئلة الشائعة حول الأثاث الصناعي والتصميم المخصص والأسعار والشحن وخدمات مانجالا ليفينج'
      : language === 'zh'
      ? '查找有关工业家具、定制设计、价格、运输和曼加拉生活服务的常见问题解答'
      : language === 'ja'
      ? 'インダストリアル家具、カスタムデザイン、価格、配送、マンガラリビングのサービスに関するよくある質問の回答を見つける'
      : language === 'es'
      ? 'Encuentra respuestas a preguntas comunes sobre muebles industriales, diseño personalizado, precios, envío y servicios de Naturra Extal'
      : language === 'fr'
      ? 'Trouvez des réponses aux questions fréquentes sur les meubles industriels, le design personnalisé, les prix, la livraison et les services de Naturra Extal'
      : 'Find answers to common questions about Agricultural Commodities, custom design, pricing, shipping, and Naturra Extal services',
    contactUs: isIndonesian
      ? 'Punya pertanyaan lain? Hubungi kami!'
      : language === 'ar'
      ? 'هل لديك سؤال آخر؟ اتصل بنا!'
      : language === 'zh'
      ? '还有其他问题吗？联系我们！'
      : language === 'ja'
      ? '他に質問がありますか？お問い合わせください！'
      : language === 'es'
      ? '¿Tiene otras preguntas? ¡Contáctenos!'
      : language === 'fr'
      ? 'Vous avez d\'autres questions ? Contactez-nous !'
      : 'Have other questions? Contact us!'
  }

  // Generate FAQ Schema for rich snippets
  const faqSchema = generateFAQSchema(topFAQs)

  return (
    <>
      <Helmet>
        {/* FAQ Schema for Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <h2 className="faq-title">{translations.title}</h2>
            <p className="faq-subtitle">{translations.subtitle}</p>
          </div>
          
          <div className="faq-grid">
            {topFAQs.map((faq, index) => (
              <details key={index} className="faq-item" itemScope itemType="https://schema.org/Question">
                <summary className="faq-question" itemProp="name">
                  {faq.question}
                </summary>
                <div className="faq-answer" itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
          
          <div className="faq-cta">
            <p className="faq-cta-text">{translations.contactUs}</p>
            <a 
              href={`https://wa.me/6288801146881?text=${encodeURIComponent(
                isIndonesian 
                  ? 'Halo Naturra Extal, saya ingin bertanya tentang agricultural commodities'
                  : 'Hello Naturra Extal, I want to ask about Agricultural Commodities'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="faq-cta-button"
            >
              {isIndonesian ? 'Hubungi via WhatsApp' : language === 'ar' ? 'تواصل عبر واتساب' : language === 'zh' ? '通过WhatsApp联系' : language === 'ja' ? 'WhatsAppでお問い合わせ' : language === 'es' ? 'Contactar por WhatsApp' : language === 'fr' ? 'Contacter via WhatsApp' : 'Contact via WhatsApp'}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQSection

