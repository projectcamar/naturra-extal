import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../utils/languageContext'
import './NotFound.css'

// Use the modern "Naturra" components for better wiring and reliability
const NaturraHeader = lazy(() => import('../components/NaturraHeader'))
const NaturraFooter = lazy(() => import('../components/NaturraFooter'))

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
      ? 'Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan. Kami mengundang Anda untuk menjelajahi produk berkualitas kami.'
      : 'Sorry, the page you are looking for is not available or has been moved. We invite you to explore our premium products.',
    back: isIndonesian ? 'Kembali ke Beranda' : 'Back to Home',
    explore: isIndonesian ? 'Jelajahi Produk' : 'Explore Products'
  }

  return (
    <div className="not-found-page">
      <Helmet>
        <title>{isIndonesian ? '404 - Halaman Tidak Ditemukan | Naturra Extal' : '404 - Page Not Found | Naturra Extal'}</title>
      </Helmet>

      <Suspense fallback={<div style={{ height: '100px' }} />}>
        <NaturraHeader isIndonesian={isIndonesian} language={language as any} />
      </Suspense>

      <main className="not-found-main">
        <div className="container" style={{ textAlign: 'center', padding: '120px 20px 80px' }}>
          <div className="not-found-hero">
            <h1 className="not-found-title" style={{ fontSize: '150px', margin: 0, color: '#004D2C', fontWeight: 900, opacity: 0.1, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '150px', zIndex: -1 }}>404</h1>
            <h2 className="not-found-subtitle" style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>{t.title}</h2>
            <p className="not-found-description" style={{ fontSize: '18px', color: '#666', marginBottom: '40px', maxWidth: '600px', marginInline: 'auto' }}>
              {t.desc}
            </p>
            <div className="not-found-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <Link
                to="/"
                className="btn-primary"
                style={{
                  background: '#004D2C',
                  color: 'white',
                  padding: '12px 30px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  borderRadius: '4px'
                }}
              >
                {t.back}
              </Link>
              <Link
                to="/products"
                className="btn-secondary"
                style={{
                  border: '2px solid #004D2C',
                  color: '#004D2C',
                  padding: '10px 28px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  borderRadius: '4px'
                }}
              >
                {t.explore}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Suspense fallback={<div style={{ height: '100px' }} />}>
        <NaturraFooter />
      </Suspense>
    </div>
  )
}

export default NotFound
