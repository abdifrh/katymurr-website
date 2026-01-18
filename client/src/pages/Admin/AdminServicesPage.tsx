import AdminServices from './AdminServices'
import './AdminDashboard.css'

function AdminServicesPage() {
  return (
    <>
      <div className="wp-admin-content-header">
        <h1 className="wp-admin-content-title">Services</h1>
      </div>
      <div className="wp-admin-content-body">
        <AdminServices />
      </div>
    </>
  )
}

export default AdminServicesPage

