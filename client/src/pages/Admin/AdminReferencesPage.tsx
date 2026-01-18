import AdminReferences from './AdminReferences'
import './AdminDashboard.css'

function AdminReferencesPage() {
  return (
    <>
      <div className="wp-admin-content-header">
        <h1 className="wp-admin-content-title">References</h1>
      </div>
      <div className="wp-admin-content-body">
        <AdminReferences />
      </div>
    </>
  )
}

export default AdminReferencesPage

