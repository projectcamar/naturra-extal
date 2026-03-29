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
    // From commodity-export-bekasi
    FAQ_DATA[0]?.faqs[0], // Komoditas apa saja
    FAQ_DATA[0]?.faqs[1], // Standar kualitas kakao
    FAQ_DATA[0]?.faqs[3], // Keunggulan cengkeh
    FAQ_DATA[0]?.faqs[4], // Cocopeat
    FAQ_DATA[0]?.faqs[5], // Lead time
    FAQ_DATA[0]?.faqs[6], // Dokumen ekspor

    // From cocoa-powder-export-guide
    FAQ_DATA[1]?.faqs[0], // Natural vs Alkalized
    FAQ_DATA[1]?.faqs[1], // Kenapa kakao Indonesia
  ].filter((faq): faq is FAQItem => faq !== undefined).slice(0, 10)

  const translations = {
    title: isIndonesian
      ? 'FAQ - Pertanyaan Umum Ekspor Komoditas'
      : language === 'ar'
        ? 'الأسئلة الشائعة - تصدير السلع'
        : language === 'zh'
          ? '常见问题 - 大宗商品出口'
          : language === 'ja'
            ? 'よくある質問 - 農業コモディティ輸出'
            : language === 'es'
              ? 'Preguntas Frecuentes - Exportación de Productos'
              : language === 'fr'
                ? 'Questions Fréquentes - Exportation de Produits'
                : 'FAQ - Agricultural Commodity Export Frequently Asked Questions',
    subtitle: isIndonesian
      ? 'Temukan jawaban untuk pertanyaan umum seputar ekspor komoditas, standar kualitas, logistik, dan layanan Naturra Extal'
      : language === 'ar'
        ? 'اكتشف إجابات للأسئلة الشائعة حول تصدير السلع ومعايير الجودة والخدمات اللوجستية وخدمات ناتورا إكستال'
        : language === 'zh'
          ? '查找有关大宗商品出口、质量标准、物流和 Naturra Extal 服务的常见问题解答'
          : language === 'ja'
            ? 'コモディティ輸出、品質基準、物流、および Naturra Extal のサービスに関するよくある質問の回答を見つける'
            : language === 'es'
              ? 'Encuentra respuestas a preguntas comunes sobre exportación de productos, estándares de calidad, logística y servicios de Naturra Extal'
              : language === 'fr'
                ? 'Trouvez des réponses aux questions fréquentes sur l\'exportation de produits, les normes de qualité, la logistique et les services de Naturra Extal'
                : 'Find answers to common questions about commodity export, quality standards, logistics, and Naturra Extal services',
    contactUs: isIndonesian
      ? 'Punya pertanyaan lain? Hubungi tim ekspor kami!'
      : language === 'ar'
        ? 'هل لديك سؤال آخر؟ اتصل بفريق التصدير لدينا!'
        : language === 'zh'
          ? '还有其他问题吗？联系我们的出口团队！'
          : language === 'ja'
            ? '他に質問がありますか？弊社の輸出チームにお問い合わせください！'
            : language === 'es'
              ? '¿Tiene otras preguntas? ¡Contacte a nuestro equipo de exportación!'
              : language === 'fr'
                ? 'Vous avez d\'autres questions ? Contactez notre équipe export !'
                : 'Have other questions? Contact our export team!'
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
                  <p itemProp="text" dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                </div>
              </details>
            ))}
          </div>

          <div className="faq-cta">
            <p className="faq-cta-text">{translations.contactUs}</p>
            <a
              href={`https://wa.me/628951395752?text=${encodeURIComponent(
                isIndonesian
                  ? 'Halo Naturra Extal, saya ingin bertanya tentang ekspor komoditas pertanian'
                  : 'Hello Naturra Extal, I want to ask about agricultural commodity export'
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
