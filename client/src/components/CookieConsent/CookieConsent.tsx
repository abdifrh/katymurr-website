import { useState, useEffect } from 'react'
import './CookieConsent.css'

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    // Add closing animation
    const banner = document.querySelector('.cookie-consent-banner')
    if (banner) {
      banner.classList.add('closing')
      setTimeout(() => {
        setShowBanner(false)
      }, 300)
    } else {
      setShowBanner(false)
    }
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    // Add closing animation
    const banner = document.querySelector('.cookie-consent-banner')
    if (banner) {
      banner.classList.add('closing')
      setTimeout(() => {
        setShowBanner(false)
      }, 300)
    } else {
      setShowBanner(false)
    }
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className="cookie-consent-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <h3 className="cookie-consent-title">Cookies & Confidentialité</h3>
          <p className="cookie-consent-description">
            Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
            En continuant à naviguer, vous acceptez notre utilisation des cookies. 
            <a href="/privacy" className="cookie-consent-link">En savoir plus</a>
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button 
            className="cookie-consent-button cookie-consent-button-decline"
            onClick={handleDecline}
            aria-label="Refuser les cookies"
          >
            Refuser
          </button>
          <button 
            className="cookie-consent-button cookie-consent-button-accept"
            onClick={handleAccept}
            aria-label="Accepter les cookies"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent

