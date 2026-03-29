import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Suspense, lazy } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { enableImageProtection, addImageProtectionStyles } from './utils/imageProtection'
import { initializeGlobalWhatsAppTracking } from './utils/globalWhatsAppTracking'
import { LanguageProvider } from './utils/languageContext.tsx'
import './App.css'

// ===== NATURRA EXTAL - Primary Landing Pages =====
import NaturraHome from './pages/NaturraHome'
import NotFound from './pages/NotFound'
import WhatsAppButton from './components/WhatsAppButton'
import SingaporeLanguageModal from './components/SingaporeLanguageModal'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'

const NaturraAbout = lazy(() => import('./pages/NaturraAbout'))
const NaturraProducts = lazy(() => import('./pages/NaturraProducts'))
const NaturraBlog = lazy(() => import('./pages/NaturraBlog'))
const NaturraBlogPost = lazy(() => import('./pages/NaturraBlogPost'))
const NaturraCustomOrder = lazy(() => import('./pages/NaturraCustomOrder'))
const NaturraPartnership = lazy(() => import('./pages/NaturraPartnership'))

// Admin Pages
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AdminBlogManager = lazy(() => import('./pages/AdminBlogManager'))

// SEO & Legal Pages
const CommodityExportBekasi = lazy(() => import('./pages/CommodityExportBekasi'))
const SearchResults = lazy(() => import('./pages/SearchResults'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const ShippingInformation = lazy(() => import('./pages/ShippingInformation'))
const ImageLicense = lazy(() => import('./pages/ImageLicense'))

// Minimal loading for better UX
const Loading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#fff'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #333',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

import { TutorialProvider } from './context/TutorialContext.tsx'
import AdminTutorial from './components/AdminTutorial'

function App() {
  // Enable image protection globally
  useEffect(() => {
    addImageProtectionStyles()
    const cleanup = enableImageProtection()
    return cleanup
  }, [])

  // Initialize global WhatsApp click tracking
  useEffect(() => {
    initializeGlobalWhatsAppTracking()
  }, [])

  return (
    <HelmetProvider>
      <Router>
        <LanguageProvider>
          <TutorialProvider>
            <ScrollToTop />
            <SingaporeLanguageModal />
            <Routes>
              {/* Primary Routes */}
              <Route path="/" element={<NaturraHome />} />
              {/* ... same routes ... */}
              <Route path="/about" element={
                <Suspense fallback={<Loading />}>
                  <NaturraAbout />
                </Suspense>
              } />
              <Route path="/products" element={
                <Suspense fallback={<Loading />}>
                  <NaturraProducts />
                </Suspense>
              } />
              <Route path="/blog" element={
                <Suspense fallback={<Loading />}>
                  <NaturraBlog />
                </Suspense>
              } />
              <Route path="/blog/:slug" element={
                <Suspense fallback={<Loading />}>
                  <NaturraBlogPost />
                </Suspense>
              } />
              <Route path="/custom-order" element={
                <Suspense fallback={<Loading />}>
                  <NaturraCustomOrder />
                </Suspense>
              } />
              <Route path="/partnership" element={
                <Suspense fallback={<Loading />}>
                  <NaturraPartnership />
                </Suspense>
              } />

              {/* Search */}
              <Route path="/search" element={
                <Suspense fallback={<Loading />}>
                  <SearchResults />
                </Suspense>
              } />

              {/* Legal Pages */}
              <Route path="/terms-of-service" element={
                <Suspense fallback={<Loading />}>
                  <TermsOfService />
                </Suspense>
              } />
              <Route path="/shipping-information" element={
                <Suspense fallback={<Loading />}>
                  <ShippingInformation />
                </Suspense>
              } />
              <Route path="/image-license" element={
                <Suspense fallback={<Loading />}>
                  <ImageLicense />
                </Suspense>
              } />

              {/* Admin Routes */}
              <Route path="/admin/login" element={
                <Suspense fallback={<Loading />}>
                  <AdminLogin />
                </Suspense>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Suspense fallback={<Loading />}>
                    <AdminDashboard />
                  </Suspense>
                </ProtectedRoute>
              } />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <Suspense fallback={<Loading />}>
                    <AdminDashboard />
                  </Suspense>
                </ProtectedRoute>
              } />
              <Route path="/admin/blog" element={
                <ProtectedRoute>
                  <Suspense fallback={<Loading />}>
                    <AdminBlogManager />
                  </Suspense>
                </ProtectedRoute>
              } />

              {/* SEO Landing Pages */}
              <Route path="/commodity-export-bekasi" element={
                <Suspense fallback={<Loading />}>
                  <CommodityExportBekasi />
                </Suspense>
              } />

              {/* Language path redirects to home */}
              <Route path="/id" element={<NaturraHome />} />
              <Route path="/eng" element={<NaturraHome />} />
              <Route path="/ar" element={<NaturraHome />} />
              <Route path="/zh" element={<NaturraHome />} />
              <Route path="/ja" element={<NaturraHome />} />
              <Route path="/es" element={<NaturraHome />} />
              <Route path="/fr" element={<NaturraHome />} />
              <Route path="/ko" element={<NaturraHome />} />

              {/* 404 Pages */}
              <Route path="/404-not-found" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AdminTutorial />
            <WhatsAppButton />
            <Analytics />
            <SpeedInsights />
          </TutorialProvider>
        </LanguageProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App
