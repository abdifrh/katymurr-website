import { useLanguage } from '../contexts/LanguageContext'
import DynamicPage from '../components/DynamicPage/DynamicPage'
import AnimatedSection from '../components/AnimatedSection/AnimatedSection'
import './LegalPages.css'

function TermsOfService() {
  const { language } = useLanguage()

  const fallbackContent = (
    <>
      <AnimatedSection animation="fadeInUp">
        <section className="section page-header">
          <div className="container">
            <h1>{language === 'en' ? 'Terms of Service' : 'Conditions d\'Utilisation'}</h1>
            <p className="page-intro">
              {language === 'en'
                ? 'Terms and conditions for using our website and services.'
                : 'Conditions d\'utilisation de notre site web et de nos services.'
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
                  <h2>Acceptance of Terms</h2>
                  <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                  
                  <h2>Use License</h2>
                  <p>Permission is granted to temporarily download one copy of the materials on this website for personal, non-commercial transitory viewing only.</p>
                  
                  <h2>Services</h2>
                  <p>Our services include English coaching, conference interpreting, and writing services. All services are subject to availability and individual agreements.</p>
                  
                  <h2>Limitations</h2>
                  <p>In no event shall Katy Murr or its suppliers be liable for any damages arising out of the use or inability to use the materials on this website.</p>
                  
                  <h2>Revisions</h2>
                  <p>Katy Murr may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
                </>
              ) : (
                <>
                  <h2>Acceptation des conditions</h2>
                  <p>En accédant et en utilisant ce site web, vous acceptez et convenez d'être lié par les termes et dispositions de cet accord.</p>
                  
                  <h2>Licence d'utilisation</h2>
                  <p>L'autorisation est accordée de télécharger temporairement une copie des matériaux sur ce site web uniquement pour un visionnement personnel, non commercial et transitoire.</p>
                  
                  <h2>Services</h2>
                  <p>Nos services comprennent le coaching en anglais, l'interprétation de conférence et les services d'écriture. Tous les services sont soumis à la disponibilité et à des accords individuels.</p>
                  
                  <h2>Limitations</h2>
                  <p>En aucun cas Katy Murr ou ses fournisseurs ne seront responsables des dommages résultant de l'utilisation ou de l'impossibilité d'utiliser les matériaux sur ce site web.</p>
                  
                  <h2>Révisions</h2>
                  <p>Katy Murr peut réviser ces conditions d'utilisation à tout moment sans préavis. En utilisant ce site web, vous acceptez d'être lié par la version actuelle de ces conditions d'utilisation.</p>
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
      slug="terms-of-service"
      fallbackTitle={language === 'en' ? 'Terms of Service' : 'Conditions d\'Utilisation'}
      fallbackContent={fallbackContent}
      fallbackMetaDescription={language === 'en'
        ? 'Terms and conditions for using katymurr.com'
        : 'Conditions d\'utilisation pour katymurr.com'
      }
      className="legal-page"
    />
  )
}

export default TermsOfService

