import { useLanguage } from '../contexts/LanguageContext'
import { useSiteSettings } from '../components/SiteSettings/SiteSettingsProvider'
import DynamicPage from '../components/DynamicPage/DynamicPage'
import AnimatedSection from '../components/AnimatedSection/AnimatedSection'
import './LegalPages.css'

function LegalNotice() {
  const { language } = useLanguage()
  const { getSetting } = useSiteSettings()

  const siteName = getSetting('site_name') || 'Katy Murr'
  const contactEmail = getSetting('contact_email') || 'contact@katymurr.com'
  const companyNumber = getSetting('company_number') || 'CHE-365.506.039'

  const fallbackContent = (
    <>
      <AnimatedSection animation="fadeInUp">
        <section className="section page-header">
          <div className="container">
            <h1>{language === 'en' ? 'Legal Notice' : 'Mentions Légales'}</h1>
            <p className="page-intro">
              {language === 'en'
                ? 'Legal information and company details.'
                : 'Informations légales et détails de l\'entreprise.'
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
                  <h2>Publisher</h2>
                  <p>
                    <strong>{siteName}</strong><br />
                    {companyNumber && <>Registered Company Number: {companyNumber}<br /></>}
                    Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                  </p>
                  
                  <h2>Hosting</h2>
                  <p>This website is hosted on a VPS server. For technical inquiries, please contact the website administrator.</p>
                  
                  <h2>Intellectual Property</h2>
                  <p>All content on this website, including text, images, and graphics, is the property of {siteName} and is protected by copyright laws.</p>
                  
                  <h2>Contact</h2>
                  <p>For any questions or concerns, please contact us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
                </>
              ) : (
                <>
                  <h2>Éditeur</h2>
                  <p>
                    <strong>{siteName}</strong><br />
                    {companyNumber && <>Numéro d'entreprise enregistré : {companyNumber}<br /></>}
                    Email : <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                  </p>
                  
                  <h2>Hébergement</h2>
                  <p>Ce site web est hébergé sur un serveur VPS. Pour les questions techniques, veuillez contacter l'administrateur du site web.</p>
                  
                  <h2>Propriété Intellectuelle</h2>
                  <p>Tout le contenu de ce site web, y compris les textes, images et graphiques, est la propriété de {siteName} et est protégé par les lois sur le droit d'auteur.</p>
                  
                  <h2>Contact</h2>
                  <p>Pour toute question ou préoccupation, veuillez nous contacter à <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
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
      slug="legal-notice"
      fallbackTitle={language === 'en' ? 'Legal Notice' : 'Mentions Légales'}
      fallbackContent={fallbackContent}
      fallbackMetaDescription={language === 'en'
        ? 'Legal notice and company information for katymurr.com'
        : 'Mentions légales et informations sur l\'entreprise pour katymurr.com'
      }
      className="legal-page"
    />
  )
}

export default LegalNotice

