import AdminMenu from './AdminMenu'
import './AdminDashboard.css'

function AdminMenuPage() {
  return (
    <>
      <div className="wp-admin-content-header">
        <h1 className="wp-admin-content-title">Menu Management</h1>
      </div>
      <div className="wp-admin-content-body">
        <AdminMenu />
      </div>
    </>
  )
}

export default AdminMenuPage

