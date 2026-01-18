import { useEffect, useState, createContext, useContext, ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../../contexts/LanguageContext'
import { fetchSettings } from '../../services/api'

interface SiteSettings {
  [key: string]: {
    id?: string
    key: string
    value: string
    type: string
    category: string
    language?: string
  }
}

interface SiteSettingsContextType {
  settings: SiteSettings
  getSetting: (key: string, language?: string) => string | undefined
  loading: boolean
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined)

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext)
  if (!context) {
    throw new Error('useSiteSettings must be used within SiteSettingsProvider')
  }
  return context
}

interface SiteSettingsProviderProps {
  children: ReactNode
}

export function SiteSettingsProvider({ children }: SiteSettingsProviderProps) {
  const { language } = useLanguage()
  const [settings, setSettings] = useState<SiteSettings>({})
  const [loading, setLoading] = useState(true)

  const loadSettings = async () => {
    try {
      const data = await fetchSettings()
      
      // Transform array to object
      const settingsObj: SiteSettings = {}
      if (Array.isArray(data)) {
        data.forEach((setting: any) => {
          settingsObj[setting.key] = setting
        })
      } else {
        Object.assign(settingsObj, data)
      }
      setSettings(settingsObj)
    } catch (error) {
      console.error('Error loading site settings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false
    
    const load = async () => {
      await loadSettings()
      if (cancelled) return
    }
    load()
    
    // Reload settings when window regains focus (user might have updated in another tab)
    const handleFocus = () => {
      if (!cancelled) {
        loadSettings()
      }
    }
    window.addEventListener('focus', handleFocus)
    
    // Also reload every 30 seconds to catch updates
    const interval = setInterval(() => {
      if (!cancelled) {
        loadSettings()
      }
    }, 30000)
    
    return () => {
      cancelled = true
      window.removeEventListener('focus', handleFocus)
      clearInterval(interval)
    }
  }, [])

  const getSetting = (key: string, lang?: string): string | undefined => {
    const langKey = lang || language
    
    // First, try key with language suffix (e.g., hero_title_en, hero_title_fr)
    const keyWithLang = `${key}_${langKey}`
    const settingWithSuffix = Object.values(settings).find(
      s => s.key === keyWithLang
    )
    if (settingWithSuffix) return settingWithSuffix.value
    
    // Second, try key with language field (e.g., key='hero_title', language='en')
    const langSetting = Object.values(settings).find(
      s => s.key === key && s.language === langKey
    )
    if (langSetting) return langSetting.value

    // Third, try global setting (no language)
    const globalSetting = Object.values(settings).find(
      s => s.key === key && !s.language
    )
    return globalSetting?.value
  }

  // Get settings for Helmet
  const siteName = getSetting('site_name') || 'Katy Murr'
  const faviconUrl = getSetting('favicon_url') || '/favicon.ico'
  const seoTitle = getSetting('seo_default_title', language) || `${siteName} - English Coaching, Interpreting & Writing Services`
  const seoDescription = getSetting('seo_default_description', language) || 'Professional English coaching, conference interpreting, and writing services.'
  const seoKeywords = getSetting('seo_default_keywords', language) || 'English coaching, conference interpreting, writing services'
  const seoOgImage = getSetting('seo_og_image') || ''

  return (
    <SiteSettingsContext.Provider value={{ settings, getSetting, loading }}>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <link rel="icon" href={faviconUrl} />
        <link rel="apple-touch-icon" href={faviconUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        {seoOgImage && <meta property="og:image" content={seoOgImage} />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {seoOgImage && <meta name="twitter:image" content={seoOgImage} />}
      </Helmet>
      {children}
    </SiteSettingsContext.Provider>
  )
}

