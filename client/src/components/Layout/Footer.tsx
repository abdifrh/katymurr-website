import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { useSiteSettings } from '../SiteSettings/SiteSettingsProvider'
import { subscribeNewsletter } from '../../services/api'
import './Footer.css'

function Footer() {
  const { t, language } = useLanguage()
  const { getSetting } = useSiteSettings()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  const siteName = getSetting('site_name') || 'Katy Murr'
  const contactEmail = getSetting('contact_email') || 'contact@katymurr.com'
  const contactPhone = getSetting('contact_phone') || '+41 79 658 56 71'
  const companyNumber = getSetting('company_number') || 'CHE-365.506.039'
  const copyrightText = getSetting('footer_copyright_text') || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`
  const logoFooterUrl = getSetting('logo_url') || '/logo-footer.png'

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      setShowScrollTop(scrollY > 300) // Show button after scrolling 300px
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError(language === 'en' ? 'Please enter a valid email address' : 'Veuillez entrer une adresse email valide')
      return
    }

    try {
      await subscribeNewsletter(email, undefined, language, 'footer')
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'An error occurred. Please try again.' : 'Une erreur s\'est produite. Veuillez réessayer.'))
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        {/* Newsletter Section - Full Width at Top */}
        <div className="footer-newsletter-full">
          <h4>{language === 'en' ? 'Newsletter' : 'Newsletter'}</h4>
          <p className="newsletter-description">
            {language === 'en' 
              ? 'Stay updated with tips, insights, and news about language learning and communication.'
              : 'Restez informé avec des conseils, des idées et des nouvelles sur l\'apprentissage des langues et la communication.'
            }
          </p>
          {subscribed ? (
            <div className="newsletter-success">
              {language === 'en' 
                ? 'Thank you for subscribing!'
                : 'Merci de vous être abonné !'
              }
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder={language === 'en' ? 'Your email address' : 'Votre adresse email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">
                {language === 'en' ? 'Subscribe' : 'S\'abonner'}
              </button>
            </form>
          )}
          {error && <p className="newsletter-error">{error}</p>}
        </div>

        <div className="footer-content">
          <div className="footer-section">
            {logoFooterUrl && <img src={logoFooterUrl} alt={siteName} className="footer-logo" />}
            <p>{getSetting('site_tagline', language) || 'English Coaching, Interpreting & Writing Services'}</p>
            {contactPhone && <p>Phone: <a href={`tel:${contactPhone.replace(/\s/g, '')}`}>{contactPhone}</a></p>}
            {contactEmail && <p>Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>}
          </div>

          <div className="footer-section">
            <h4>{language === 'en' ? 'Quick Links' : 'Liens rapides'}</h4>
            <nav className="footer-nav">
              <Link to="/">{t('nav.home')}</Link>
              <Link to="/services">{t('nav.services')}</Link>
              <Link to="/about">{t('nav.about')}</Link>
              <Link to="/blog">{t('nav.blog')}</Link>
              <Link to="/contact">{t('nav.contact')}</Link>
            </nav>
          </div>

          <div className="footer-section footer-legal">
            <h4>{language === 'en' ? 'Legal' : 'Légal'}</h4>
            <nav className="footer-nav">
              <Link to="/privacy-policy">
                {language === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}
              </Link>
              <Link to="/terms-of-service">
                {language === 'en' ? 'Terms of Service' : 'Conditions d\'Utilisation'}
              </Link>
              <Link to="/legal-notice">
                {language === 'en' ? 'Legal Notice' : 'Mentions Légales'}
              </Link>
              <Link to="/cookie-policy">
                {language === 'en' ? 'Cookie Policy' : 'Politique des Cookies'}
              </Link>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{copyrightText}</p>
          {companyNumber && <p>Registered Company Number: {companyNumber}</p>}
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label={language === 'en' ? 'Scroll to top' : 'Retour en haut'}
          title={language === 'en' ? 'Scroll to top' : 'Retour en haut'}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 19V5M5 12L12 5L19 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </footer>
  )
}

export default Footer

