import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import { SiteSettingsProvider } from './components/SiteSettings/SiteSettingsProvider'
import Layout from './components/Layout/Layout'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import About from './pages/About'
import References from './pages/References'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import LegalNotice from './pages/LegalNotice'
import CookiePolicy from './pages/CookiePolicy'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminLayout from './pages/Admin/AdminLayout'
import DashboardHome from './pages/Admin/DashboardHome'
import AdminPagesPage from './pages/Admin/AdminPagesPage'
import AdminBlogPage from './pages/Admin/AdminBlogPage'
import AdminServicesPage from './pages/Admin/AdminServicesPage'
import AdminReferencesPage from './pages/Admin/AdminReferencesPage'
import AdminMediaPage from './pages/Admin/AdminMediaPage'
import AdminMenuPage from './pages/Admin/AdminMenuPage'
import AdminAnalyticsPage from './pages/Admin/AdminAnalyticsPage'
import AdminNewsletterPage from './pages/Admin/AdminNewsletterPage'
import AdminSettingsPage from './pages/Admin/AdminSettingsPage'
import AdminContactPage from './pages/Admin/AdminContactPage'
import { trackPageVisit, setupPageVisibilityTracking } from './utils/analytics'

function AppRoutes() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  // Track page visits
  useEffect(() => {
    if (!isAdminRoute) {
      trackPageVisit(location.pathname)
      setupPageVisibilityTracking()
    }
  }, [location.pathname, isAdminRoute])

  const routes = (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/references" element={<References />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/legal-notice" element={<LegalNotice />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="pages" element={<AdminPagesPage />} />
        <Route path="blog" element={<AdminBlogPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="references" element={<AdminReferencesPage />} />
        <Route path="media" element={<AdminMediaPage />} />
        <Route path="menu" element={<AdminMenuPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
        <Route path="newsletter" element={<AdminNewsletterPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="contact" element={<AdminContactPage />} />
      </Route>
    </Routes>
    </>
  )

  if (isAdminRoute) {
    return routes
  }

  return <Layout>{routes}</Layout>
}

function App() {
  return (
    <LanguageProvider>
      <SiteSettingsProvider>
        <AppRoutes />
      </SiteSettingsProvider>
    </LanguageProvider>
  )
}

export default App

