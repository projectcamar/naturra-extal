import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import './CatalogModal.css'
import { trackEvent } from '../utils/analytics'
import { getLanguageFromLocation, type LanguageCode } from '../utils/languageManager'

// Import multiple product images for collage
// legacy mangala image import removed
// legacy mangala image import removed
// legacy mangala image import removed

interface CatalogModalProps {
  show?: boolean
  onClose?: () => void
}

const CatalogModal: React.FC<CatalogModalProps> = ({ show, onClose }) => {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false)
  const [language, setLanguage] = useState<LanguageCode>('id')
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    whatsapp: ''
  })

  // Translations for the modal
  const translations = {
    id: {
      title: 'TERIMA KASIH TELAH MENGUNDUH',
      subtitle: 'Katalog Mangala 2026 Anda sedang dalam proses! Bergabunglah dengan daftar email kami untuk mendapatkan pembaruan eksklusif. Dengan mengirimkan formulir ini, kami juga akan mengirimkan salinan PDF langsung ke email Anda!',
      firstName: 'Nama Lengkap',
      email: 'Email',
      whatsapp: 'Nomor WhatsApp',
      download: 'GABUNG SEKARANG'
    },
    en: {
      title: 'THANK YOU FOR DOWNLOADING',
      subtitle: 'Your Mangala 2026 Catalog is on its way! Join our emailing list for exclusive updates. By submitting this form, we will also send a PDF copy directly to your email!',
      firstName: 'Full Name',
      email: 'Email',
      whatsapp: 'WhatsApp Number',
      download: 'JOIN NEWSLETTER'
    },
    ar: {
      title: 'شكراً لتحميل الكتالوج',
      subtitle: 'كتالوج مانجالا 2026 في طريقه إليك! انضم إلى قائمتنا البريدية للحصول على تحديثات حصرية. بإرسال هذا النموذج، سنقوم أيضاً بإرسال نسخة PDF مباشرة إلى بريدك الإلكتروني!',
      firstName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      whatsapp: 'رقم واتساب',
      download: 'انضم الآن'
    },
    zh: {
      title: '感谢您下载目录',
      subtitle: '您的 2026 曼加拉目录即将推出！加入我们的邮件列表，获取独家更新。提交此表格后，我们还将把 PDF 副本直接发送到您的电子邮箱！',
      firstName: '全名',
      email: '电子邮件',
      whatsapp: 'WhatsApp号码',
      download: '立即加入'
    },
    ja: {
      title: 'ダウンロードしていただきありがとうございます',
      subtitle: '2026 マンガラカタログをお届けします！限定アップデートを得るために、メールリストにご登録ください。このフォームを送信すると、PDFのコピーもあなたのメールに直接お送りします！',
      firstName: '氏名',
      email: 'メールアドレス',
      whatsapp: 'WhatsApp番号',
      download: '今すぐ登録'
    },
    es: {
      title: 'GRACIAS POR DESCARGAR',
      subtitle: '¡Su catálogo Mangala 2026 está en camino! Únase a nuestra lista de correo para recibir actualizaciones exclusivas. ¡Al enviar este formulario, juga le enviaremos una copia en PDF langsung ke email Anda!',
      firstName: 'Nombre completo',
      email: 'Correo electrónico',
      whatsapp: 'Número de WhatsApp',
      download: 'UNIRSE AHORA'
    },
    fr: {
      title: 'MERCI D\'AVOIR TÉLÉCHARGÉ',
      subtitle: 'Votre catalogue Mangala 2026 est en route ! Rejoignez notre liste de diffusion untuk des mises à jour exclusives. En soumettant ce formulaire, nous vous enverrons également une copie PDF directement sur votre e-mail !',
      firstName: 'Nom complet',
      email: 'E-mail',
      whatsapp: 'Nomor WhatsApp',
      download: 'REJOINDRE MAINTENANT'
    },
    ko: {
      title: '다운로드해주셔서 감사합니다',
      subtitle: '2026 망갈라 카탈로그가 준비되었습니다! 독점 업데이트를 받으려면 이메일 목록에 가입하세요. 이 양식을 제출하시면 PDF 사본을 이메일로 직접 보내드립니다!',
      firstName: '성함',
      email: '이메일',
      whatsapp: 'WhatsApp 번호',
      download: '지금 가입하기'
    }
  }

  const t = translations[language]

  useEffect(() => {
    // 1. Handle explicit control from Header (after download or direct click)
    if (show) {
      setIsVisible(true)
      const urlLang = getLanguageFromLocation(location.pathname, location.search)
      if (urlLang) setLanguage(urlLang)
    } else if (show === false) {
      // Allow it to be closed from the parent
      setIsVisible(false)
    }
  }, [show, location.pathname, location.search])

  useEffect(() => {
    // 2. Handle automatic popup for first-time or returning visitors
    const initializeModal = () => {
      // Don't trigger automatic logic if it's already being shown by parent
      if (show) return

      // Get language from current page URL
      const urlLang = getLanguageFromLocation(location.pathname, location.search)
      let detectedLang: LanguageCode = 'id' // default

      if (urlLang) {
        detectedLang = urlLang
      } else {
        // Fallback to browser language
        const browserLang = navigator.language || navigator.languages?.[0]
        if (browserLang?.startsWith('id')) detectedLang = 'id'
        else if (browserLang?.startsWith('ar')) detectedLang = 'ar'
        else if (browserLang?.startsWith('zh')) detectedLang = 'zh'
        else if (browserLang?.startsWith('ja')) detectedLang = 'ja'
        else if (browserLang?.startsWith('es')) detectedLang = 'es'
        else if (browserLang?.startsWith('fr')) detectedLang = 'fr'
        else if (browserLang?.startsWith('ko')) detectedLang = 'ko'
        else detectedLang = 'en'
      }

      // Set language state
      setLanguage(detectedLang)

      // Store in localStorage
      try {
        localStorage.setItem('mangala_lang_preference', detectedLang)
      } catch (error) {
        console.warn('Failed to store language preference in localStorage:', error)
      }

      // Check if user clicked X recently (within 12 hours)
      const lastClosedTime = localStorage.getItem('catalogLastClosed')
      if (lastClosedTime) {
        const twelveHoursInMs = 12 * 60 * 60 * 1000
        if (Date.now() - parseInt(lastClosedTime) < twelveHoursInMs) return
      }

      // Check if user has downloaded catalog recently (within 3 days)
      const lastDownloadTime = localStorage.getItem('catalogLastDownload')
      if (lastDownloadTime) {
        const threeDaysInMs = 3 * 24 * 60 * 60 * 1000
        if (Date.now() - parseInt(lastDownloadTime) < threeDaysInMs) return
      }

      // Check visit history
      const hasVisitedBefore = localStorage.getItem('hasVisitedMangala')
      let shouldShow = false

      if (!hasVisitedBefore) {
        shouldShow = true
        localStorage.setItem('hasVisitedMangala', 'true')
      } else {
        shouldShow = Math.random() < 0.7
      }

      if (shouldShow) {
        setTimeout(() => {
          setIsVisible(true)
        }, 3000) // 3 seconds delay for auto-popup
      }
    }

    initializeModal()
  }, [])

  const handleClose = () => {
    setIsVisible(false)

    // Store the timestamp when user closes the modal
    // This prevents the popup from showing again for 12 hours
    localStorage.setItem('catalogLastClosed', Date.now().toString())

    if (onClose) onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault()

    // Get the button element
    const button = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement
    if (button) {
      button.disabled = true
      button.textContent = 'SENDING...'
    }

    try {
      // Send form data to email API
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          notificationType: 'subscription', // Changed to subscription as they already have the catalog
          catalogLanguage: language
        }),
      })

      if (response.ok) {
        console.log('Lead data sent successfully')
      }

      // Track the subscription event
      trackEvent.newsletterSignup(language)

      // Store the subscription timestamp
      localStorage.setItem('newsletterSubscribed', Date.now().toString())

      // Close the modal
      handleClose()

    } catch (error) {
      console.error('Error sending lead data:', error)
      alert(language === 'id' ? 'Gagal mengirim data. Silakan coba lagi.' : 'Failed to send data. Please try again.')

      // Reset button on error
      if (button) {
        button.textContent = t.download
        button.disabled = false
      }
    }
  }

  return (
    <div
      className={`catalog-modal-overlay ${isVisible ? 'catalog-modal-visible' : 'catalog-modal-hidden'}`}
      onClick={handleClose}
    >
      <div className="catalog-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="catalog-modal-close" onClick={handleClose} aria-label="Close catalog modal">
          <X size={24} />
        </button>

        <div className="catalog-modal-content">
          {/* Left Side - Product Collage */}
          <div className="catalog-preview">
            <div className="catalog-preview-wrapper">
              <div className="pdf-icon">
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="#E74C3C" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="12" y="17" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">PDF</text>
                </svg>
              </div>

              {/* Collage of 3 overlapping product images */}
              <div className="catalog-collage">
                <div className="catalog-year">2026</div>

                <div className="collage-image collage-image-1">
                  <img
                    src={catalogPreview1}
                    alt="Mangala Living Industrial Furniture - Corner Bench"
                    loading="lazy"
                  />
                </div>

                <div className="collage-image collage-image-2">
                  <img
                    src={catalogPreview2}
                    alt="Mangala Living Industrial Furniture - Dining Table"
                    loading="lazy"
                  />
                </div>

                <div className="collage-image collage-image-3">
                  <img
                    src={catalogPreview3}
                    alt="Mangala Living Industrial Furniture - Bar Chair"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="catalog-form-section">
            <h2 className="catalog-modal-title">
              {t.title}
            </h2>
            <p className="catalog-modal-subtitle">
              {t.subtitle}
            </p>

            <form onSubmit={handleSubmitLead} className="catalog-form">
              <div className="form-group">
                <label htmlFor="firstName">{t.firstName}</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="whatsapp">{t.whatsapp}</label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="catalog-download-btn">
                {t.download}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogModal

