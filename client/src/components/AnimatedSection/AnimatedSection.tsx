import { ReactNode } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import './AnimatedSection.css'

interface AnimatedSectionProps {
  children: ReactNode
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'slideInUp' | 'scaleIn'
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

function AnimatedSection({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  className = '',
  threshold = 0.1,
}: AnimatedSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce: true,
  })

  const animationClass = isVisible ? `animate-${animation}` : 'animate-hidden'
  const style = {
    '--animation-delay': `${delay}s`,
    '--animation-duration': `${duration}s`,
  } as React.CSSProperties

  return (
    <div
      ref={elementRef}
      className={`animated-section ${animationClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default AnimatedSection

