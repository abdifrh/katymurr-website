import AdminSettings from './AdminSettings'
import './AdminDashboard.css'

function AdminSettingsPage() {
  return (
    <>
      <div className="wp-admin-content-header">
        <h1 className="wp-admin-content-title">Site Settings</h1>
      </div>
      <div className="wp-admin-content-body">
        <AdminSettings />
      </div>
    </>
  )
}

export default AdminSettingsPage

