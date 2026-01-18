import AdminBlog from './AdminBlog'
import './AdminDashboard.css'

function AdminBlogPage() {
  return (
    <>
      <div className="wp-admin-content-header">
        <h1 className="wp-admin-content-title">Blog Posts</h1>
      </div>
      <div className="wp-admin-content-body">
        <AdminBlog />
      </div>
    </>
  )
}

export default AdminBlogPage

