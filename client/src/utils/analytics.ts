// Analytics tracking utility

let sessionId: string | null = null
let visitStartTime: number = Date.now()

// Generate or retrieve session ID
function getSessionId(): string {
  if (!sessionId) {
    sessionId = localStorage.getItem('session_id') || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('session_id', sessionId)
  }
  return sessionId
}

// Track page visit
export async function trackPageVisit(pagePath: string, pageTitle?: string) {
  try {
    const duration = Math.floor((Date.now() - visitStartTime) / 1000)
    visitStartTime = Date.now()

    const data = {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      referrer: document.referrer || undefined,
      user_agent: navigator.userAgent,
      language: navigator.language.split('-')[0],
      session_id: getSessionId(),
      duration_seconds: duration > 0 ? duration : undefined,
    }

    // Track in background (don't block page load)
    // Utiliser une URL relative pour que le proxy Vite fonctionne avec ngrok
    const apiUrl = import.meta.env.VITE_API_URL || '/api'
    fetch(`${apiUrl}/analytics/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(err => {
      console.error('Analytics tracking error:', err)
    })
  } catch (error) {
    console.error('Error tracking page visit:', error)
  }
}

// Track page visibility changes
export function setupPageVisibilityTracking() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Page is hidden, could track exit time
    } else {
      // Page is visible again
      visitStartTime = Date.now()
    }
  })
}

