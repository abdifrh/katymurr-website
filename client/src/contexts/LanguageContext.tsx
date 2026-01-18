import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.references': 'References',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'services.english-coaching': 'English Coaching',
    'services.interpreting': 'Conference Interpreting',
    'services.writing': 'Writing',
    'services.writing.nonfiction': 'Non-fiction',
    'services.writing.fiction': 'Fiction',
    'footer.copyright': '© 2026 Katy Murr. All rights reserved.',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.about': 'À propos',
    'nav.references': 'Références',
    'nav.blog': 'Journal',
    'nav.contact': 'Contact',
    'services.english-coaching': 'Coaching en anglais',
    'services.interpreting': 'Interprétation de conférence',
    'services.writing': 'Écriture',
    'services.writing.nonfiction': 'Non-fiction',
    'services.writing.fiction': 'Fiction',
    'footer.copyright': '© 2026 Katy Murr. Tous droits réservés.',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved === 'en' || saved === 'fr') ? saved : 'en'
  })

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

