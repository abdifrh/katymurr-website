import AdminAnalytics from './AdminAnalytics'
import './AdminDashboard.css'

function AdminAnalyticsPage() {
  return (
    <>
      <div className="wp-admin-content-header">
        <h1 className="wp-admin-content-title">Analytics</h1>
      </div>
      <div className="wp-admin-content-body">
        <AdminAnalytics />
      </div>
    </>
  )
}

export default AdminAnalyticsPage

