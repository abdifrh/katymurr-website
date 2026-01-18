import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useLanguage } from '../contexts/LanguageContext'
import { useSiteSettings } from '../components/SiteSettings/SiteSettingsProvider'
import { fetchReferences, fetchBlogPosts, fetchServices, fetchPage } from '../services/api'
import ReferenceCard from '../components/ReferenceCard/ReferenceCard'
import Loader from '../components/Loader/Loader'
import AnimatedSection from '../components/AnimatedSection/AnimatedSection'
import './Home.css'

interface Reference {
  id: string
  name: string
  position: string
  institution: string
  institution_logo?: string
  testimonial: string
  language: string
  featured: boolean
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string
  created_at: string
}

interface Service {
  id: string
  slug: string
  title: string
  subtitle?: string
  description?: string
  order_index: number
}

interface HomePage {
  id: string
  slug: string
  title: string
  content: string
  meta_title?: string
  meta_description?: string
}

function Home() {
  const { language } = useLanguage()
  const { getSetting } = useSiteSettings()
  const [featuredReferences, setFeaturedReferences] = useState<Reference[]>([])
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [homePage, setHomePage] = useState<HomePage | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Récupérer les valeurs hero dynamiquement depuis les settings
  // Utiliser settings dans les dépendances pour forcer le re-render quand les settings changent
  const heroImageUrl = getSetting('hero_image_url') || '/images/hero-image.jpg'
  const heroTitle = getSetting('hero_title', language) || (language === 'en' ? 'Welcome to Katy Murr' : 'Bienvenue chez Katy Murr')
  const heroSubtitle = getSetting('hero_subtitle', language) || (language === 'en' ? 'Professional English Coaching, Conference Interpreting & Writing Services' : 'Services professionnels de Coaching en anglais, Interprétation de conférence & Écriture')
  const heroCtaText = getSetting('hero_cta_text', language) || (language === 'en' ? 'Get Started' : 'Commencer')
  const heroCtaLink = getSetting('hero_cta_link') || '/contact'

  useEffect(() => {
    let cancelled = false
    
    const loadData = async () => {
      try {
        setLoading(true)
        // Charger toutes les données en parallèle
        const [refsEn, postsEn, servicesData, pageData] = await Promise.all([
          fetchReferences('en', true),
          fetchBlogPosts('en', 2),
          fetchServices(language, true),
          fetchPage('home', language).catch(() => null) // Si la page n'existe pas, on utilise le fallback
        ])
        
        if (cancelled) return
        
        // Prendre les 4 premières références en anglais
        setFeaturedReferences(refsEn.slice(0, 4))
        setRecentPosts(postsEn)
        // Prendre les services pour le carousel (limiter à 4)
        setServices(servicesData.slice(0, 4))
        setHomePage(pageData)
      } catch (error) {
        if (!cancelled) {
          console.error('Error loading home data:', error)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    loadData()
    
    return () => {
      cancelled = true
    }
  }, [language])

  // Le hero utilise toujours les settings dynamiques
  // Ne pas utiliser homePage?.content pour le hero, seulement pour d'autres sections si nécessaire

  const getCTAContent = () => {
    if (homePage?.content) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(homePage.content, 'text/html')
      const ctaContent = doc.querySelector('.cta-section-content')
      if (ctaContent) {
        return ctaContent.innerHTML
      }
    }
    return null
  }

  const ctaContent = getCTAContent()

  if (loading) {
    return (
      <div className="home">
        <Loader fullScreen />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{homePage?.meta_title || getSetting('seo_default_title', language) || 'Katy Murr - English Coaching, Interpreting & Writing Services'}</title>
        <meta name="description" content={homePage?.meta_description || getSetting('seo_default_description', language) || 'Professional English coaching, conference interpreting, and writing services. Fiction and non-fiction writing expertise.'} />
        <meta name="keywords" content={getSetting('seo_default_keywords', language) || 'english coaching, conference interpreting, writing services, fiction writing, non-fiction writing, language learning'} />
        <link rel="canonical" href="https://katymurr.com/" />
        {/* Open Graph */}
        <meta property="og:title" content={homePage?.meta_title || getSetting('seo_default_title', language) || 'Katy Murr - English Coaching, Interpreting & Writing Services'} />
        <meta property="og:description" content={homePage?.meta_description || getSetting('seo_default_description', language) || 'Professional English coaching, conference interpreting, and writing services.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://katymurr.com/" />
        <meta property="og:image" content={heroImageUrl.startsWith('http') ? heroImageUrl : `https://katymurr.com${heroImageUrl}`} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={homePage?.meta_title || getSetting('seo_default_title', language) || 'Katy Murr - English Coaching, Interpreting & Writing Services'} />
        <meta name="twitter:description" content={homePage?.meta_description || getSetting('seo_default_description', language) || 'Professional English coaching, conference interpreting, and writing services.'} />
        <meta name="twitter:image" content={heroImageUrl.startsWith('http') ? heroImageUrl : `https://katymurr.com${heroImageUrl}`} />
      </Helmet>

      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-background">
            <img src={heroImageUrl} alt="Katy Murr" className="hero-image" />
            <div className="hero-overlay"></div>
          </div>
          <div className="container">
            <div className="hero-content">
              {/* Hero content toujours dynamique depuis les settings */}
              <h1 className="hero-title">{heroTitle}</h1>
              <h2 className="hero-tagline">{heroSubtitle}</h2>
              <div className="hero-actions">
                <Link to={heroCtaLink} className="btn btn-primary">
                  {heroCtaText}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        {services.length > 0 && (
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <section className="section services-preview">
              <div className="container">
                <h2 className="section-title">
                  {language === 'en' ? 'Services' : 'Services'}
                </h2>
                <div className="services-carousel-wrapper">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    1024: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                  }}
                  navigation={false}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={services.length > 2}
                  grabCursor={true}
                  className="services-swiper"
                >
                  {services.map((service) => (
                    <SwiperSlide key={service.id}>
                      <div className="service-card">
                        <h3>{service.title}</h3>
                        <p>
                          {service.description || service.subtitle || ''}
                        </p>
                        <Link to={`/services/${service.slug}`} className="service-link">
                          {language === 'en' ? 'Learn more →' : 'En savoir plus →'}
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>
          </AnimatedSection>
        )}

        {/* Featured References */}
        {featuredReferences.length > 0 && (
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <section className="section references-preview">
              <div className="container">
                <h2 className="section-title">
                  {language === 'en' ? 'What Clients Say' : 'Témoignages'}
                </h2>
                <div className="references-grid">
                {featuredReferences.map((ref) => (
                  <ReferenceCard
                    key={ref.id}
                    id={ref.id}
                    name={ref.name}
                    position={ref.position}
                    institution={ref.institution}
                    institution_logo={ref.institution_logo}
                    testimonial={ref.testimonial}
                    maxLength={150}
                    language={language}
                  />
                ))}
              </div>
              <div className="text-center mt-md">
                <Link to="/references" className="btn btn-secondary">
                  {language === 'en' ? 'View All References' : 'Voir toutes les références'}
                </Link>
              </div>
            </div>
          </section>
          </AnimatedSection>
        )}

        {/* Recent Blog Posts */}
        {recentPosts.length > 0 && (
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <section className="section blog-preview">
              <div className="container">
                <h2 className="section-title">
                  {language === 'en' ? 'Latest from the Blog' : 'Derniers articles'}
                </h2>
                <div className="blog-grid">
                {recentPosts.map((post) => (
                  <article key={post.id} className="blog-card">
                    {post.featured_image && (
                      <div className="blog-card-image">
                        <img src={post.featured_image} alt={post.title} />
                      </div>
                    )}
                    <div className="blog-card-content">
                      <h3>{post.title}</h3>
                      {post.excerpt && <p>{post.excerpt}</p>}
                      <Link to={`/blog/${post.slug}`} className="blog-link">
                        {language === 'en' ? 'Read more →' : 'Lire la suite →'}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              <div className="text-center mt-md">
                <Link to="/blog" className="btn btn-secondary">
                  {language === 'en' ? 'View All Posts' : 'Voir tous les articles'}
                </Link>
              </div>
            </div>
          </section>
          </AnimatedSection>
        )}

        {/* CTA Section */}
        <AnimatedSection animation="fadeInUp" delay={0.4}>
          <section className="section cta-section">
            <div className="container">
              <div className="cta-content">
              {ctaContent ? (
                <div 
                  className="cta-section-content"
                  dangerouslySetInnerHTML={{ __html: ctaContent }}
                />
              ) : (
                <>
                  <h2>
                    {language === 'en'
                      ? 'Ready to improve your communication?'
                      : 'Prêt à améliorer votre communication ?'
                    }
                  </h2>
                  <p>
                    {language === 'en'
                      ? 'Let\'s work together to achieve your language and communication goals. Get in touch to discuss your project.'
                      : 'Travaillons ensemble pour atteindre vos objectifs linguistiques et de communication. Contactez-moi pour discuter de votre projet.'
                    }
                  </p>
                  <div className="cta-actions">
                    <Link to="/contact" className="btn btn-primary">
                      {language === 'en' ? 'Get in Touch' : 'Contactez-moi'}
                    </Link>
                    <Link to="/services" className="btn btn-secondary">
                      {language === 'en' ? 'View Services' : 'Voir les services'}
                    </Link>
                  </div>
                </>
              )}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </>
  )
}

export default Home
