// API service functions

// Utiliser une URL relative pour que le proxy Vite fonctionne avec ngrok
// Si VITE_API_URL est défini, l'utiliser, sinon utiliser '/api' (proxy Vite)
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }

  return response.json()
}

// Pages API
export async function fetchPage(slug: string, language: string) {
  return fetchAPI(`/pages/${slug}/${language}`)
}

export async function fetchPages(language: string) {
  return fetchAPI(`/pages/${language}`)
}

// Blog API
export async function fetchBlogPosts(
  language: string,
  limit: number = 10,
  category?: string
) {
  const params = new URLSearchParams({ limit: limit.toString() })
  if (category) {
    params.append('category', category)
  }
  return fetchAPI(`/blog/${language}?${params}`)
}

export async function fetchBlogPost(language: string, slug: string) {
  return fetchAPI(`/blog/${language}/${slug}`)
}

export async function fetchCategories(language: string) {
  return fetchAPI(`/blog/${language}/categories/list`)
}

// References API
export async function fetchReferences(language: string, featured?: boolean) {
  const params = featured ? '?featured=true' : ''
  return fetchAPI(`/references/${language}${params}`)
}

// Media API
export async function fetchMedia(limit: number = 50) {
  return fetchAPI(`/media?limit=${limit}`)
}

// Services API
export async function fetchServices(language: string, published: boolean = true) {
  const params = published ? '?published=true' : ''
  return fetchAPI(`/services/${language}${params}`)
}

export async function fetchService(slug: string, language: string) {
  return fetchAPI(`/services/${language}/${slug}`)
}

export async function fetchMediaItem(id: string) {
  return fetchAPI(`/media/${id}`)
}

// Menu API
export async function fetchMenu(language: string) {
  return fetchAPI(`/menu/${language}`)
}

// Newsletter API
export async function subscribeNewsletter(email: string, name?: string, language?: string, source?: string) {
  return fetchAPI('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email, name, language, source }),
  })
}

export async function unsubscribeNewsletter(email: string) {
  return fetchAPI('/newsletter/unsubscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

// Analytics API
export async function trackVisit(data: {
  page_path: string
  page_title?: string
  referrer?: string
  user_agent?: string
  ip_address?: string
  country?: string
  language?: string
  session_id?: string
  duration_seconds?: number
}) {
  return fetchAPI('/analytics/visit', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// Settings API
export async function fetchSettings(category?: string, language?: string) {
  const params = new URLSearchParams()
  if (category) params.append('category', category)
  if (language) params.append('language', language)
  const query = params.toString()
  return fetchAPI(`/settings${query ? `?${query}` : ''}`)
}

export async function fetchSetting(key: string, language?: string) {
  const query = language ? `?language=${language}` : ''
  return fetchAPI(`/settings/${key}${query}`)
}

// Contact form API
export async function submitContactForm(data: {
  name: string
  email: string
  subject: string
  message: string
  service_type?: string
}) {
  return fetchAPI('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// Admin API - requires authentication
async function fetchAdminAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('supabase_token')
  if (!token) {
    throw new Error('Not authenticated')
  }

  return fetchAPI(endpoint, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  })
}

// Dashboard Statistics
export async function fetchDashboardStats() {
  return fetchAdminAPI('/admin/dashboard/stats')
}

export async function fetchAnalyticsStats() {
  return fetchAdminAPI('/admin/analytics/stats')
}

