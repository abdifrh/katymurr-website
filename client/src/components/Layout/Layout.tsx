import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import CookieConsent from '../CookieConsent/CookieConsent'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

export default Layout

