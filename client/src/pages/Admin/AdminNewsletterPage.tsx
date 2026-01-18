import AdminNewsletter from './AdminNewsletter'
import './AdminDashboard.css'

function AdminNewsletterPage() {
  return (
    <>
      <div className="wp-admin-content-header">
        <h1 className="wp-admin-content-title">Newsletter</h1>
      </div>
      <div className="wp-admin-content-body">
        <AdminNewsletter />
      </div>
    </>
  )
}

export default AdminNewsletterPage

