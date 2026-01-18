import { useLanguage } from '../contexts/LanguageContext'
import DynamicPage from '../components/DynamicPage/DynamicPage'
import AnimatedSection from '../components/AnimatedSection/AnimatedSection'
import './LegalPages.css'

function PrivacyPolicy() {
  const { language } = useLanguage()

  const fallbackContent = (
    <>
      <AnimatedSection animation="fadeInUp">
        <section className="section page-header">
          <div className="container">
            <h1>{language === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}</h1>
            <p className="page-intro">
              {language === 'en'
                ? 'How we collect, use, and protect your personal information.'
                : 'Comment nous collectons, utilisons et protégeons vos informations personnelles.'
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
                  <h2>Information We Collect</h2>
                  <p>We collect information that you provide directly to us, such as when you fill out a contact form or subscribe to our newsletter.</p>
                  
                  <h2>How We Use Your Information</h2>
                  <p>We use the information we collect to respond to your inquiries, send you newsletters, and improve our services.</p>
                  
                  <h2>Data Protection</h2>
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                  
                  <h2>Your Rights</h2>
                  <p>You have the right to access, modify, or delete your personal information at any time. Please contact us to exercise these rights.</p>
                  
                  <h2>Contact</h2>
                  <p>For any questions regarding this privacy policy, please contact us at contact@katymurr.com</p>
                </>
              ) : (
                <>
                  <h2>Informations que nous collectons</h2>
                  <p>Nous collectons les informations que vous nous fournissez directement, par exemple lorsque vous remplissez un formulaire de contact ou vous abonnez à notre newsletter.</p>
                  
                  <h2>Comment nous utilisons vos informations</h2>
                  <p>Nous utilisons les informations collectées pour répondre à vos demandes, vous envoyer des newsletters et améliorer nos services.</p>
                  
                  <h2>Protection des données</h2>
                  <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès non autorisé, l'altération, la divulgation ou la destruction.</p>
                  
                  <h2>Vos droits</h2>
                  <p>Vous avez le droit d'accéder, de modifier ou de supprimer vos informations personnelles à tout moment. Veuillez nous contacter pour exercer ces droits.</p>
                  
                  <h2>Contact</h2>
                  <p>Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à contact@katymurr.com</p>
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
      slug="privacy-policy"
      fallbackTitle={language === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}
      fallbackContent={fallbackContent}
      fallbackMetaDescription={language === 'en'
        ? 'Privacy policy and data protection information for katymurr.com'
        : 'Politique de confidentialité et informations sur la protection des données pour katymurr.com'
      }
      className="legal-page"
    />
  )
}

export default PrivacyPolicy

