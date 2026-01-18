import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  HiOutlineDocumentText, 
  HiOutlineNewspaper, 
  HiOutlineHome,
  HiOutlineStar,
  HiOutlinePhotograph,
  HiOutlineChatAlt,
  HiOutlineMail
} from 'react-icons/hi'
import { fetchDashboardStats } from '../../services/api'
import './AdminDashboard.css'

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
    pages: { id: string; title: string; slug: string; updated_at: string }[]
    blog: { id: string; title: string; published: boolean; updated_at: string }[]
    contact: { id: string; name: string; subject: string; status: string; created_at: string }[]
  }
}

function DashboardHome() {
  const navigate = useNavigate()
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    loadDashboardStats()
  }, [])

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

  const handleMenuClick = (path: string) => {
    navigate(path)
  }

  return (
    <>
      <div className="wp-admin-content-header">
        <h1 className="wp-admin-content-title">Dashboard</h1>
      </div>
      <div className="wp-admin-content-body">
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
            dashboardStats && (
              <>
                {/* Statistics Cards */}
                <div className="wp-admin-stats">
                  <div 
                    className="wp-admin-stat-card clickable"
                    onClick={() => handleMenuClick('/admin/pages')}
                  >
                    <div className="stat-icon">
                      <HiOutlineDocumentText size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>Pages</h3>
                      <p className="stat-number">{dashboardStats.counts.pages}</p>
                    </div>
                  </div>
                  <div 
                    className="wp-admin-stat-card clickable"
                    onClick={() => handleMenuClick('/admin/blog')}
                  >
                    <div className="stat-icon">
                      <HiOutlineNewspaper size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>Blog Posts</h3>
                      <p className="stat-number">
                        {dashboardStats.counts.published_blog || 0} published
                        {dashboardStats && dashboardStats.counts.draft_blog > 0 && (
                          <span className="stat-draft">, {dashboardStats.counts.draft_blog} draft</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div 
                    className="wp-admin-stat-card clickable"
                    onClick={() => handleMenuClick('/admin/services')}
                  >
                    <div className="stat-icon">
                      <HiOutlineHome size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>Services</h3>
                      <p className="stat-number">{dashboardStats.counts.published_services || 0} published</p>
                    </div>
                  </div>
                  <div 
                    className="wp-admin-stat-card clickable"
                    onClick={() => handleMenuClick('/admin/references')}
                  >
                    <div className="stat-icon">
                      <HiOutlineStar size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>References</h3>
                      <p className="stat-number">{dashboardStats.counts.references || 0}</p>
                    </div>
                  </div>
                  <div 
                    className="wp-admin-stat-card clickable"
                    onClick={() => handleMenuClick('/admin/media')}
                  >
                    <div className="stat-icon">
                      <HiOutlinePhotograph size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>Media</h3>
                      <p className="stat-number">{dashboardStats.counts.media || 0} files</p>
                    </div>
                  </div>
                  <div 
                    className={`wp-admin-stat-card clickable ${dashboardStats && dashboardStats.counts.unread_messages > 0 ? 'has-notification' : ''}`}
                    onClick={() => handleMenuClick('/admin/contact')}
                  >
                    <div className="stat-icon">
                      <HiOutlineChatAlt size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>Contact Messages</h3>
                      <p className="stat-number">
                        {dashboardStats.counts.contact || 0} total
                        {dashboardStats && dashboardStats.counts.unread_messages > 0 && (
                          <span className="stat-unread"> • {dashboardStats.counts.unread_messages} new</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div 
                    className="wp-admin-stat-card clickable"
                    onClick={() => handleMenuClick('/admin/newsletter')}
                  >
                    <div className="stat-icon">
                      <HiOutlineMail size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>Newsletter Subscribers</h3>
                      <p className="stat-number">{dashboardStats.counts.newsletter || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="wp-admin-recent-activity">
                  <div className="recent-section">
                    <h3>Recent Contact Messages <button className="button-link" onClick={() => handleMenuClick('/admin/contact')}>View all →</button></h3>
                    {dashboardStats.recent.contact.length > 0 ? (
                      <ul>
                        {dashboardStats.recent.contact.map(msg => (
                          <li key={msg.id}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <strong>{msg.name}</strong>
                              <span style={{ color: '#646970', marginLeft: '8px' }}>— {msg.subject}</span>
                            </div>
                            <span className={`status-badge status-${msg.status}`}>{msg.status}</span>
                            <span className="item-date">{formatDate(msg.created_at)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No recent contact messages.</p>
                    )}
                  </div>

                  <div className="recent-section">
                    <h3>Recent Blog Posts <button className="button-link" onClick={() => handleMenuClick('/admin/blog')}>View all →</button></h3>
                    {dashboardStats.recent.blog.length > 0 ? (
                      <ul>
                        {dashboardStats.recent.blog.map(post => (
                          <li key={post.id}>
                            <strong>{post.title}</strong>
                            <span className={`status-badge status-${post.published ? 'published' : 'draft'}`}>
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                            <span className="item-date">{formatDate(post.updated_at)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No recent blog posts.</p>
                    )}
                  </div>

                  <div className="recent-section">
                    <h3>Recent Pages <button className="button-link" onClick={() => handleMenuClick('/admin/pages')}>View all →</button></h3>
                    {dashboardStats.recent.pages.length > 0 ? (
                      <ul>
                        {dashboardStats.recent.pages.map(page => (
                          <li key={page.id}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <strong>{page.title}</strong>
                              <code style={{ marginLeft: '8px' }}>/{page.slug}</code>
                            </div>
                            <span className="item-date">{formatDate(page.updated_at)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No recent pages.</p>
                    )}
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  )
}

export default DashboardHome

