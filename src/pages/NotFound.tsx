import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../utils/languageContext'
import './NotFound.css'

const NotFound: React.FC = () => {
  const { language } = useLanguage()
  const isIndonesian = language === 'id'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const t = {
    title: isIndonesian ? 'Halaman Tidak Ditemukan' : 'Page Not Found',
    desc: isIndonesian
      ? 'Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.'
      : 'Sorry, the page you are looking for is not available or has been moved.',
    back: isIndonesian ? 'Kembali ke Beranda' : 'Back to Home'
  }

  return (
    <div className="not-found-page">
      <div className="not-found-main">
        <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h1 style={{ fontSize: '120px', margin: 0, color: '#2c2c2c', fontWeight: 900 }}>404</h1>
          <h2 style={{ fontSize: '24px', margin: '20px 0', color: '#333' }}>{t.title}</h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px', maxWidth: '500px', marginInline: 'auto' }}>
            {t.desc}
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '12px 30px',
              background: '#2c2c2c',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 600,
              borderRadius: '4px'
            }}
          >
            {t.back}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
