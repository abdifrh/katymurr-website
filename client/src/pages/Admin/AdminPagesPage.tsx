import AdminPages from './AdminPages'
import './AdminDashboard.css'

function AdminPagesPage() {
  return (
    <>
      <div className="wp-admin-content-header">
        <h1 className="wp-admin-content-title">Pages</h1>
      </div>
      <div className="wp-admin-content-body">
        <AdminPages />
      </div>
    </>
  )
}

export default AdminPagesPage

