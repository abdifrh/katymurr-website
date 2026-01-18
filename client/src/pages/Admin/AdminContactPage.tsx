import AdminContact from './AdminContact'
import './AdminDashboard.css'

function AdminContactPage() {
  return (
    <>
      <div className="wp-admin-content-header">
        <h1 className="wp-admin-content-title">Contact Messages</h1>
      </div>
      <div className="wp-admin-content-body">
        <AdminContact />
      </div>
    </>
  )
}

export default AdminContactPage

