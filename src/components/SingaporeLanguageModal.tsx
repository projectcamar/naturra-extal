import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './SingaporeLanguageModal.css'
import { detectVisitorLocation } from '../utils/geolocation'
import { storeLanguage, type LanguageCode } from '../utils/languageManager'

const SG_LANG_CHOICE_KEY = 'Naturra_sg_lang_choice'

const SingaporeLanguageModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true

    const checkAndShowModal = async () => {
      if (typeof window === 'undefined') return

      try {
        // If user already chose, don't show again (unless triggered by Alt+F)
        const existingChoice = localStorage.getItem(SG_LANG_CHOICE_KEY)
        if (existingChoice) return

        const location = await detectVisitorLocation()

        // Only show for Singapore visitors
        if (!isMounted) return
        if (location.countryCode === 'SG') {
          setIsVisible(true)
        }
      } catch (error) {
        // Fail silently – no modal, no impact
        console.log('Singapore language modal detection failed', error)
      }
    }

    checkAndShowModal()

    return () => {
      isMounted = false
    }
  }, [])

  // Keyboard shortcut: Alt + F to show modal (always active, for testing)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + F to show modal (for testing - always works)
      if (e.altKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault()
        setIsVisible(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!isVisible) return null

  const handleChoice = (lang: LanguageCode) => {
    try {
      storeLanguage(lang)
      localStorage.setItem(SG_LANG_CHOICE_KEY, lang)
    } catch (error) {
      console.log('Failed to store Singapore language choice', error)
    }

    setIsVisible(false)

    // Update URL with ?lang= parameter to trigger language change without reload
    const currentPath = location.pathname
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('lang', lang)
    
    // Navigate to same path with lang parameter - this will trigger language change
    navigate(`${currentPath}?${searchParams.toString()}`, { replace: true })
    
    // Trigger a custom event to notify components about language change
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }))
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <div className="sg-lang-modal-overlay" onClick={handleClose}>
      <div
        className="sg-lang-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sg-lang-modal-title"
      >
        <div className="sg-lang-modal-header">
          <div className="sg-lang-badge">
            <div>Naturra EXPORT &amp; INTERNATIONAL</div>
            <div className="sg-lang-badge-zh">Naturra出口与国际</div>
          </div>
          <h2 id="sg-lang-modal-title">
            <div>Welcome Singapore buyer!</div>
            <div className="sg-lang-title-zh">欢迎新加坡买家！</div>
          </h2>
          <p className="sg-lang-subtitle">
            <div>Welcome to Naturra Extal. Please choose your preferred language for this site.</div>
            <div className="sg-lang-subtitle-zh">欢迎来到Naturra Extal。请选择您偏好的网站语言。</div>
          </p>
        </div>

        <div className="sg-lang-options">
          <button
            className="sg-lang-button sg-lang-button-en"
            onClick={() => handleChoice('en')}
            type="button"
          >
            <div className="sg-lang-button-content">
              <span className="sg-lang-flag sg-flag-en" />
              <div className="sg-lang-text">
                <span className="sg-lang-label-main">English</span>
                <span className="sg-lang-label-sub">Click to translate page to English</span>
              </div>
            </div>
          </button>

          <button
            className="sg-lang-button sg-lang-button-zh"
            onClick={() => handleChoice('zh')}
            type="button"
          >
            <div className="sg-lang-button-content">
              <span className="sg-lang-flag sg-flag-zh" />
              <div className="sg-lang-text">
                <span className="sg-lang-label-main">中文 (Chinese)</span>
                <span className="sg-lang-label-sub">点击将页面翻译为中文</span>
              </div>
            </div>
          </button>
        </div>

        <p className="sg-lang-note">
          <div>We&apos;ll remember your choice for your next visits from this device.</div>
          <div className="sg-lang-note-zh">我们会记住您的选择，以便您下次从此设备访问。</div>
        </p>

        <button
          className="sg-lang-close"
          type="button"
          onClick={handleClose}
          aria-label="Close language selection"
        >
          <span>Skip for now</span>
          <span className="sg-lang-close-zh">暂时跳过</span>
        </button>
      </div>
    </div>
  )
}

export default SingaporeLanguageModal


