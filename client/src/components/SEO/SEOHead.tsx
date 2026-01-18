import { Helmet } from 'react-helmet-async'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

function SEOHead({ 
  title = 'Katy Murr - English Coaching, Interpreting & Writing Services',
  description = 'Professional English coaching, conference interpreting, and writing services. Fiction and non-fiction writing expertise.',
  keywords = 'english coaching, conference interpreting, writing services, fiction writing, non-fiction writing',
  image,
  url,
  type = 'website'
}: SEOHeadProps) {
  const siteUrl = 'https://katymurr.com'
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.jpg`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  )
}

export default SEOHead

