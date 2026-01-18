import AdminMedia from './AdminMedia'
import './AdminDashboard.css'

function AdminMediaPage() {
  return (
    <>
      <div className="wp-admin-content-header">
        <h1 className="wp-admin-content-title">Media Library</h1>
      </div>
      <div className="wp-admin-content-body">
        <AdminMedia />
      </div>
    </>
  )
}

export default AdminMediaPage

