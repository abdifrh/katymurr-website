import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../utils/supabase'
import { 
  HiOutlineViewGrid, 
  HiOutlineDocumentText, 
  HiOutlineNewspaper, 
  HiOutlineHome,
  HiOutlineStar,
  HiOutlinePhotograph,
  HiOutlineMenu,
  HiOutlineChartBar,
  HiOutlineMail,
  HiOutlineCog,
  HiOutlineChatAlt,
  HiOutlineMenuAlt2,
  HiOutlineLogout,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle
} from 'react-icons/hi'
import { fetchDashboardStats } from '../../services/api'
import AdminPages from './AdminPages'
import AdminBlog from './AdminBlog'
import AdminReferences from './AdminReferences'
import AdminServices from './AdminServices'
import AdminMedia from './AdminMedia'
import AdminMenu from './AdminMenu'
import AdminAnalytics from './AdminAnalytics'
import AdminNewsletter from './AdminNewsletter'
import AdminSettings from './AdminSettings'
import AdminContact from './AdminContact'
import './AdminDashboard.css'
import './AdminResponsiveTables.css' // Global responsive table styles

type MenuItem = 'dashboard' | 'pages' | 'blog' | 'services' | 'references' | 'media' | 'menu' | 'analytics' | 'newsletter' | 'settings' | 'contact'

interface DashboardStats {
  counts: {
    pages: number
    blog: number
    services: number
    references: number
    media: number
    contact: number
    newsletter: number
    unread_messages: number
    published_blog: number
    draft_blog: number
    published_services: number
  }
  recent: {
    pages: any[]
    blog: any[]
    contact: any[]
  }
}

function AdminDashboard() {
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState<MenuItem>('dashboard')
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('supabase_token')
      if (!token) {
        navigate('/admin/login')
        return
      }

      try {
        const { data: { user }, error } = await supabase.auth.getUser(token)
        if (user && !error) {
          setAuthenticated(true)
          setUser(user)
          // Load dashboard stats
          loadDashboardStats()
        } else {
          navigate('/admin/login')
        }
      } catch (error) {
        navigate('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [navigate])

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 782 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  const loadDashboardStats = async () => {
    try {
      setStatsLoading(true)
      const stats = await fetchDashboardStats()
      setDashboardStats(stats)
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
    } finally {
      setStatsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleMenuClick = (menuItem: MenuItem) => {
    setActiveMenu(menuItem)
    // Close mobile menu when item is clicked on mobile
    if (window.innerWidth <= 782) {
      setMobileMenuOpen(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('supabase_token')
    navigate('/admin/login')
  }

  if (loading) {
    return (
      <div className="wp-admin">
        <div className="wp-admin-loading">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className={`wp-admin ${sidebarCollapsed ? 'folded' : ''}`}>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="wp-admin-mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Top Bar */}
      <div className="wp-admin-bar">
        <div className="wp-admin-bar-left">
          <button 
            className="wp-admin-bar-menu-toggle"
            onClick={() => {
              // On mobile, toggle mobile menu
              if (window.innerWidth <= 782) {
                setMobileMenuOpen(!mobileMenuOpen)
              } else {
                // On desktop, toggle sidebar collapse
                setSidebarCollapsed(!sidebarCollapsed)
              }
            }}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <HiOutlineMenuAlt2 size={20} />
          </button>
          <a href="/" className="wp-admin-bar-site-name" target="_blank" rel="noopener noreferrer">
            Visit Site
          </a>
        </div>
        <div className="wp-admin-bar-right">
          <span className="wp-admin-bar-user">
            {user?.email}
          </span>
          <button onClick={handleLogout} className="wp-admin-bar-logout">
            <HiOutlineLogout size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            Log Out
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`wp-admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="wp-admin-sidebar-header">
          <h1 className="wp-admin-sidebar-title">Katy Murr</h1>
          <p className="wp-admin-sidebar-subtitle">CMS</p>
        </div>
        <nav className="wp-admin-sidebar-menu">
          <button
            type="button"
            className={`wp-admin-menu-item ${activeMenu === 'dashboard' ? 'current' : ''}`}
            onClick={() => handleMenuClick('dashboard')}
          >
            <HiOutlineViewGrid size={20} />
            <span className="menu-text">Dashboard</span>
          </button>
          <button
            type="button"
            className={`wp-admin-menu-item ${activeMenu === 'pages' ? 'current' : ''}`}
            onClick={() => handleMenuClick('pages')}
          >
            <HiOutlineDocumentText size={20} />
            <span className="menu-text">Pages</span>
          </button>
          <button
            type="button"
            className={`wp-admin-menu-item ${activeMenu === 'blog' ? 'current' : ''}`}
            onClick={() => handleMenuClick('blog')}
          >
            <HiOutlineNewspaper size={20} />
            <span className="menu-text">Blog</span>
          </button>
          <button
            type="button"
            className={`wp-admin-menu-item ${activeMenu === 'services' ? 'current' : ''}`}
            onClick={() => handleMenuClick('services')}
          >
            <HiOutlineHome size={20} />
            <span className="menu-text">Services</span>
          </button>
          <button
            type="button"
            className={`wp-admin-menu-item ${activeMenu === 'references' ? 'current' : ''}`}
            onClick={() => handleMenuClick('references')}
          >
            <HiOutlineStar size={20} />
            <span className="menu-text">References</span>
          </button>
          <button
            type="button"
            className={`wp-admin-menu-item ${activeMenu === 'media' ? 'current' : ''}`}
            onClick={() => handleMenuClick('media')}
          >
            <HiOutlinePhotograph size={20} />
            <span className="menu-text">Media</span>
          </button>
          <button
            type="button"
            className={`wp-admin-menu-item ${activeMenu === 'menu' ? 'current' : ''}`}
            onClick={() => handleMenuClick('menu')}
          >
            <HiOutlineMenu size={20} />
            <span className="menu-text">Menu</span>
          </button>
          <button
            type="button"
            className={`wp-admin-menu-item ${activeMenu === 'analytics' ? 'current' : ''}`}
            onClick={() => handleMenuClick('analytics')}
          >
            <HiOutlineChartBar size={20} />
            <span className="menu-text">Analytics</span>
          </button>
          <button
            type="button"
            className={`wp-admin-menu-item ${activeMenu === 'newsletter' ? 'current' : ''}`}
            onClick={() => handleMenuClick('newsletter')}
          >
            <HiOutlineMail size={20} />
            <span className="menu-text">Newsletter</span>
          </button>
          <button
            type="button"
            className={`wp-admin-menu-item ${activeMenu === 'settings' ? 'current' : ''}`}
            onClick={() => handleMenuClick('settings')}
          >
            <HiOutlineCog size={20} />
            <span className="menu-text">Settings</span>
          </button>
          <button
            type="button"
            className={`wp-admin-menu-item ${activeMenu === 'contact' ? 'current' : ''}`}
            onClick={() => handleMenuClick('contact')}
          >
            <HiOutlineChatAlt size={20} />
            <span className="menu-text">Contact Messages</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="wp-admin-content">
        <div className="wp-admin-content-header">
          <h1 className="wp-admin-content-title">
            {activeMenu === 'dashboard' && 'Dashboard'}
            {activeMenu === 'pages' && 'Pages'}
            {activeMenu === 'blog' && 'Blog Posts'}
            {activeMenu === 'services' && 'Services'}
            {activeMenu === 'references' && 'References'}
            {activeMenu === 'media' && 'Media Library'}
            {activeMenu === 'menu' && 'Menu Management'}
            {activeMenu === 'analytics' && 'Analytics'}
            {activeMenu === 'newsletter' && 'Newsletter'}
            {activeMenu === 'settings' && 'Site Settings'}
            {activeMenu === 'contact' && 'Contact Messages'}
          </h1>
        </div>
        <div className="wp-admin-content-body">
          {activeMenu === 'dashboard' && (
            <div className="wp-admin-dashboard">
              <div className="wp-admin-welcome">
                <h2>Welcome to Katy Murr CMS</h2>
                <p>Manage your website content from here. Use the menu on the left to navigate.</p>
              </div>

              {statsLoading ? (
                <div className="wp-admin-loading-stats">
                  <p>Loading statistics...</p>
                </div>
              ) : (
                <>
                  {/* Statistics Cards */}
                  <div className="wp-admin-stats">
                    <div 
                      className="wp-admin-stat-card clickable"
                      onClick={() => handleMenuClick('pages')}
                    >
                      <div className="stat-icon">
                        <HiOutlineDocumentText size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>Pages</h3>
                        <p className="stat-number">{dashboardStats?.counts.pages || 0}</p>
                      </div>
                    </div>
                    <div 
                      className="wp-admin-stat-card clickable"
                      onClick={() => handleMenuClick('blog')}
                    >
                      <div className="stat-icon">
                        <HiOutlineNewspaper size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>Blog Posts</h3>
                        <p className="stat-number">
                          {dashboardStats?.counts.published_blog || 0} published
                          {dashboardStats && dashboardStats.counts.draft_blog > 0 && (
                            <span className="stat-draft">, {dashboardStats.counts.draft_blog} draft</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div 
                      className="wp-admin-stat-card clickable"
                      onClick={() => handleMenuClick('services')}
                    >
                      <div className="stat-icon">
                        <HiOutlineHome size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>Services</h3>
                        <p className="stat-number">{dashboardStats?.counts.published_services || 0} published</p>
                      </div>
                    </div>
                    <div 
                      className="wp-admin-stat-card clickable"
                      onClick={() => handleMenuClick('references')}
                    >
                      <div className="stat-icon">
                        <HiOutlineStar size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>References</h3>
                        <p className="stat-number">{dashboardStats?.counts.references || 0}</p>
                      </div>
                    </div>
                    <div 
                      className="wp-admin-stat-card clickable"
                      onClick={() => handleMenuClick('media')}
                    >
                      <div className="stat-icon">
                        <HiOutlinePhotograph size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>Media</h3>
                        <p className="stat-number">{dashboardStats?.counts.media || 0} files</p>
                      </div>
                    </div>
                    <div 
                      className={`wp-admin-stat-card clickable ${dashboardStats && dashboardStats.counts.unread_messages > 0 ? 'has-notification' : ''}`}
                      onClick={() => handleMenuClick('contact')}
                    >
                      <div className="stat-icon">
                        <HiOutlineChatAlt size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>Contact Messages</h3>
                        <p className="stat-number">
                          {dashboardStats?.counts.contact || 0} total
                          {dashboardStats && dashboardStats.counts.unread_messages > 0 && (
                            <span className="stat-unread"> • {dashboardStats.counts.unread_messages} new</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div 
                      className="wp-admin-stat-card clickable"
                      onClick={() => handleMenuClick('newsletter')}
                    >
                      <div className="stat-icon">
                        <HiOutlineUsers size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>Newsletter</h3>
                        <p className="stat-number">{dashboardStats?.counts.newsletter || 0} subscribers</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="wp-admin-dashboard-sections">
                    {/* Recent Contact Messages */}
                    {dashboardStats && dashboardStats.recent.contact.length > 0 && (
                      <div className="wp-admin-dashboard-section">
                        <div className="section-header">
                          <h3>
                            <HiOutlineChatAlt size={20} />
                            Recent Contact Messages
                          </h3>
                          <button 
                            className="button-link"
                            onClick={() => handleMenuClick('contact')}
                          >
                            View all →
                          </button>
                        </div>
                        <div className="recent-items">
                          {dashboardStats.recent.contact.slice(0, 5).map((message: any) => (
                            <div key={message.id} className="recent-item">
                              <div className="recent-item-header">
                                <strong>{message.name}</strong>
                                <span className={`status-badge status-${message.status}`}>
                                  {message.status}
                                </span>
                              </div>
                              <p className="recent-item-subject">{message.subject}</p>
                              <p className="recent-item-meta">
                                <HiOutlineClock size={14} />
                                {formatDate(message.created_at)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Blog Posts */}
                    {dashboardStats && dashboardStats.recent.blog.length > 0 && (
                      <div className="wp-admin-dashboard-section">
                        <div className="section-header">
                          <h3>
                            <HiOutlineNewspaper size={20} />
                            Recent Blog Posts
                          </h3>
                          <button 
                            className="button-link"
                            onClick={() => handleMenuClick('blog')}
                          >
                            View all →
                          </button>
                        </div>
                        <div className="recent-items">
                          {dashboardStats.recent.blog.slice(0, 5).map((post: any) => (
                            <div key={post.id} className="recent-item">
                              <div className="recent-item-header">
                                <strong>{post.title}</strong>
                                {post.published ? (
                                  <span className="status-badge status-published">
                                    <HiOutlineCheckCircle size={14} />
                                    Published
                                  </span>
                                ) : (
                                  <span className="status-badge status-draft">
                                    <HiOutlineXCircle size={14} />
                                    Draft
                                  </span>
                                )}
                              </div>
                              <p className="recent-item-meta">
                                <HiOutlineClock size={14} />
                                Updated {formatDate(post.updated_at)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Pages */}
                    {dashboardStats && dashboardStats.recent.pages.length > 0 && (
                      <div className="wp-admin-dashboard-section">
                        <div className="section-header">
                          <h3>
                            <HiOutlineDocumentText size={20} />
                            Recent Pages
                          </h3>
                          <button 
                            className="button-link"
                            onClick={() => handleMenuClick('pages')}
                          >
                            View all →
                          </button>
                        </div>
                        <div className="recent-items">
                          {dashboardStats.recent.pages.slice(0, 5).map((page: any) => (
                            <div key={page.id} className="recent-item">
                              <div className="recent-item-header">
                                <strong>{page.title}</strong>
                                <span className="recent-item-slug">/{page.slug}</span>
                              </div>
                              <p className="recent-item-meta">
                                <HiOutlineClock size={14} />
                                Updated {formatDate(page.updated_at)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          {activeMenu === 'pages' && <AdminPages />}
          {activeMenu === 'blog' && <AdminBlog />}
          {activeMenu === 'services' && <AdminServices />}
          {activeMenu === 'references' && <AdminReferences />}
          {activeMenu === 'media' && <AdminMedia />}
          {activeMenu === 'menu' && <AdminMenu />}
          {activeMenu === 'analytics' && <AdminAnalytics />}
          {activeMenu === 'newsletter' && <AdminNewsletter />}
          {activeMenu === 'settings' && <AdminSettings />}
          {activeMenu === 'contact' && <AdminContact />}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
