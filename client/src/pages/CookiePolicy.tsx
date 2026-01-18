import { useLanguage } from '../contexts/LanguageContext'
import DynamicPage from '../components/DynamicPage/DynamicPage'
import AnimatedSection from '../components/AnimatedSection/AnimatedSection'
import './LegalPages.css'

function CookiePolicy() {
  const { language } = useLanguage()

  const fallbackContent = (
    <>
      <AnimatedSection animation="fadeInUp">
        <section className="section page-header">
          <div className="container">
            <h1>{language === 'en' ? 'Cookie Policy' : 'Politique des Cookies'}</h1>
            <p className="page-intro">
              {language === 'en'
                ? 'Information about how we use cookies on our website.'
                : 'Informations sur l\'utilisation des cookies sur notre site web.'
              }
            </p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={0.1}>
        <section className="section page-content">
          <div className="container">
            <div className="legal-content">
              {language === 'en' ? (
                <>
                  <h2>What Are Cookies</h2>
                  <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.</p>
                  
                  <h2>How We Use Cookies</h2>
                  <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. We only use essential cookies that are necessary for the website to function properly.</p>
                  
                  <h2>Types of Cookies We Use</h2>
                  <ul>
                    <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be switched off.</li>
                    <li><strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website.</li>
                    <li><strong>Preference Cookies:</strong> These cookies remember your preferences, such as language selection.</li>
                  </ul>
                  
                  <h2>Managing Cookies</h2>
                  <p>You can control and manage cookies in your browser settings. However, disabling cookies may affect the functionality of this website.</p>
                  
                  <h2>Contact</h2>
                  <p>If you have any questions about our use of cookies, please contact us at contact@katymurr.com</p>
                </>
              ) : (
                <>
                  <h2>Qu'est-ce qu'un Cookie</h2>
                  <p>Les cookies sont de petits fichiers texte qui sont placés sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Ils sont largement utilisés pour rendre les sites web plus efficaces et fournir des informations aux propriétaires de sites web.</p>
                  
                  <h2>Comment nous utilisons les cookies</h2>
                  <p>Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et personnaliser le contenu. Nous n'utilisons que des cookies essentiels nécessaires au bon fonctionnement du site web.</p>
                  
                  <h2>Types de cookies que nous utilisons</h2>
                  <ul>
                    <li><strong>Cookies essentiels :</strong> Ces cookies sont nécessaires au fonctionnement du site web et ne peuvent pas être désactivés.</li>
                    <li><strong>Cookies d'analyse :</strong> Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web.</li>
                    <li><strong>Cookies de préférence :</strong> Ces cookies mémorisent vos préférences, telles que la sélection de la langue.</li>
                  </ul>
                  
                  <h2>Gestion des cookies</h2>
                  <p>Vous pouvez contrôler et gérer les cookies dans les paramètres de votre navigateur. Cependant, la désactivation des cookies peut affecter le fonctionnement de ce site web.</p>
                  
                  <h2>Contact</h2>
                  <p>Si vous avez des questions sur notre utilisation des cookies, veuillez nous contacter à contact@katymurr.com</p>
                </>
              )}
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  )

  return (
    <DynamicPage
      slug="cookie-policy"
      fallbackTitle={language === 'en' ? 'Cookie Policy' : 'Politique des Cookies'}
      fallbackContent={fallbackContent}
      fallbackMetaDescription={language === 'en'
        ? 'Cookie policy and information about cookie usage on katymurr.com'
        : 'Politique des cookies et informations sur l\'utilisation des cookies sur katymurr.com'
      }
      className="legal-page"
    />
  )
}

export default CookiePolicy

