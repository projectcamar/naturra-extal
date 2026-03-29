import React from 'react'
import type { LanguageCode } from '../utils/languageManager'
import './AuthorCard.css'

interface AuthorCardProps {
  name: string
  title: string
  experience: string[]
  linkedIn?: string
  language?: LanguageCode
  backgroundImage?: string
}

const AUTHOR_TRANSLATIONS: Record<LanguageCode, {
  by: string
  linkedInProfile: string
}> = {
  id: {
    by: 'Oleh:',
    linkedInProfile: 'Profil LinkedIn'
  },
  en: {
    by: 'By:',
    linkedInProfile: 'LinkedIn Profile'
  },
  ar: {
    by: 'بواسطة:',
    linkedInProfile: 'ملف LinkedIn الشخصي'
  },
  zh: {
    by: '作者：',
    linkedInProfile: 'LinkedIn 个人资料'
  },
  ja: {
    by: '著者：',
    linkedInProfile: 'LinkedInプロフィール'
  },
  es: {
    by: 'Por:',
    linkedInProfile: 'Perfil de LinkedIn'
  },
  fr: {
    by: 'Par :',
    linkedInProfile: 'Profil LinkedIn'
  },
  ko: {
    by: '작성자:',
    linkedInProfile: 'LinkedIn 프로필'
  }
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  name,
  title,
  experience,
  linkedIn,
  language = 'id',
  backgroundImage
}) => {
  const translations = AUTHOR_TRANSLATIONS[language] || AUTHOR_TRANSLATIONS.en

  return (
    <div
      className={`author-card ${backgroundImage ? 'author-card--has-bg' : ''}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {backgroundImage && <div className="author-card-overlay"></div>}
      <div className="author-card-content">
        <div className="author-card-header">
          <div className="author-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="author-info">
            <h4 className="author-name">
              <span className="author-by-label">{translations.by} </span>
              {name}
            </h4>
            <p className="author-title">{title}</p>
          </div>
        </div>
        <div className="author-experience">
          {experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <span className="experience-dot"></span>
              {exp}
            </div>
          ))}
        </div>
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="author-linkedin"
            aria-label={`${translations.linkedInProfile} ${name}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            {translations.linkedInProfile}
          </a>
        )}
      </div>
    </div>
  )
}

export default AuthorCard
