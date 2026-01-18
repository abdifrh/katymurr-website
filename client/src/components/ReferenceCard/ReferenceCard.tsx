import { useState } from 'react'
import './ReferenceCard.css'

interface ReferenceCardProps {
  id: string
  name: string
  position?: string
  institution?: string
  institution_logo?: string
  testimonial: string
  featured?: boolean
  maxLength?: number
  language: string
}

function ReferenceCard({
  name,
  position,
  institution,
  institution_logo,
  testimonial,
  maxLength = 200,
  language
}: ReferenceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = testimonial.length > maxLength
  const displayText = isExpanded || !shouldTruncate 
    ? testimonial 
    : testimonial.substring(0, maxLength) + '...'

  return (
    <div className="reference-card">
      <div className="reference-testimonial">
        <p className="reference-text">"{displayText}"</p>
        {shouldTruncate && (
          <button
            className="read-more-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Read less' : 'Read more'}
          >
            {isExpanded 
              ? (language === 'en' ? 'Read less' : 'Lire moins')
              : (language === 'en' ? 'Read more' : 'Lire la suite')
            }
          </button>
        )}
      </div>
      <div className="reference-author">
        <div className="author-info">
          <strong>{name}</strong>
          {position && <span className="position">{position}</span>}
          {institution && <span className="institution">{institution}</span>}
        </div>
        {institution_logo && (
          <div className="institution-logo">
            <img src={institution_logo} alt={institution || ''} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ReferenceCard

