import { useState, useEffect, useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '../../components/DataTable/DataTable'
import './AdminReferences.css'
import './AdminForms.css'

interface Reference {
  id: string
  name: string
  position: string
  institution: string
  institution_logo: string
  testimonial: string
  language: string
  featured: boolean
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
const token = localStorage.getItem('supabase_token')

async function fetchReferences() {
  const response = await fetch(`${API_BASE_URL}/admin/references`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!response.ok) throw new Error('Failed to fetch references')
  return response.json()
}

function AdminReferences() {
  const [references, setReferences] = useState<Reference[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Reference | null>(null)

  useEffect(() => {
    loadReferences()
  }, [])

  const loadReferences = async () => {
    try {
      setLoading(true)
      const data = await fetchReferences()
      setReferences(data)
    } catch (error) {
      console.error('Error loading references:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = useMemo<ColumnDef<Reference>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <strong>{row.original.name}</strong>,
      },
      {
        accessorKey: 'institution',
        header: 'Institution',
      },
      {
        accessorKey: 'position',
        header: 'Position',
      },
      {
        accessorKey: 'language',
        header: 'Language',
        cell: ({ row }) => row.original.language.toUpperCase(),
      },
      {
        accessorKey: 'featured',
        header: 'Featured',
        cell: ({ row }) =>
          row.original.featured ? (
            <span className="status-publish">Yes</span>
          ) : (
            <span className="status-draft">No</span>
          ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <button
            className="button-link edit-link"
            onClick={(e) => {
              e.stopPropagation()
              setEditing(row.original)
            }}
          >
            Edit
          </button>
        ),
      },
    ],
    []
  )

  return (
    <div className="admin-references">
      <div className="admin-section-header">
        <h2>References</h2>
        <button className="btn btn-primary" onClick={() => setEditing({} as Reference)}>
          Create New Reference
        </button>
      </div>

      {editing && (
        <ReferenceEditor
          reference={editing}
          onSave={() => {
            setEditing(null)
            loadReferences()
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="wp-admin-table-container">
        <DataTable
          data={references}
          columns={columns}
          loading={loading}
          emptyMessage="No references found."
          onRowClick={(ref) => setEditing(ref)}
        />
      </div>
    </div>
  )
}

function ReferenceEditor({ reference, onSave, onCancel }: { reference: Reference, onSave: () => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: reference.name || '',
    position: reference.position || '',
    institution: reference.institution || '',
    institution_logo: reference.institution_logo || '',
    testimonial: reference.testimonial || '',
    language: reference.language || 'en',
    featured: reference.featured || false,
  })
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [media, setMedia] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)

  const loadMedia = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/media`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!response.ok) throw new Error('Failed to fetch media')
      const data = await response.json()
      setMedia(data)
    } catch (error) {
      console.error('Error loading media:', error)
    }
  }

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true)
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('category', 'logos')
      uploadFormData.append('alt_text', `Logo for ${formData.institution || 'institution'}`)

      const xhr = new XMLHttpRequest()
      
      xhr.upload.addEventListener('progress', () => {
        // Progress handled by UI
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          setFormData({ ...formData, institution_logo: response.url })
          setUploading(false)
          loadMedia() // Refresh media library
        } else {
          const error = JSON.parse(xhr.responseText)
          alert(`Upload failed: ${error.error || 'Unknown error'}`)
          setUploading(false)
        }
      })

      xhr.addEventListener('error', () => {
        alert('Upload failed. Please check your connection and try again.')
        setUploading(false)
      })

      xhr.open('POST', `${API_BASE_URL}/upload`)
      xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      xhr.send(uploadFormData)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload file')
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = reference.id
        ? `${API_BASE_URL}/admin/references/${reference.id}`
        : `${API_BASE_URL}/admin/references`
      
      const method = reference.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to save reference')
      onSave()
    } catch (error) {
      console.error('Error saving reference:', error)
      alert('Failed to save reference')
    }
  }

  return (
    <div className="admin-form-container">
      <div className="admin-form-header">
        <h2>{reference.id ? '✏️ Edit Reference' : '➕ Add New Reference'}</h2>
        <p className="form-description">
          {reference.id ? 'Update the reference information below.' : 'Create a new reference by filling in the details below.'}
        </p>
      </div>
      <div className="admin-form-body">
        <form onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div className="form-section">
            <h3 className="form-section-title">👤 Reference Information</h3>
            
            <div className="form-two-columns">
              <div className="form-field">
                <label>
                  Name <span className="required">*</span>
                </label>
                <p className="field-description">The name of the person providing the reference.</p>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-field">
                <label>Position</label>
                <p className="field-description">The position or title of the person.</p>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="CEO, Director, etc."
                />
              </div>
            </div>

            <div className="form-field">
              <label>Institution</label>
              <p className="field-description">The name of the institution or company.</p>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="Company Name"
              />
            </div>
          </div>

          {/* Institution Logo Section */}
          <div className="form-section">
            <h3 className="form-section-title">🏢 Institution Logo</h3>
            <p className="form-section-description">Add the logo of the institution or company.</p>
            
            <div className="form-field">
              <div className="image-upload-field">
                {formData.institution_logo ? (
                  <div className="image-preview-container has-image">
                    <img src={formData.institution_logo} alt="Institution logo" />
                    <div className="image-preview-actions">
                      <button
                        type="button"
                        className="button-link"
                        onClick={() => setFormData({ ...formData, institution_logo: '' })}
                      >
                        Remove Logo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="image-preview-container">
                    <p style={{ textAlign: 'center', color: '#646970', padding: '20px' }}>
                      No logo selected
                    </p>
                  </div>
                )}
                
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Or enter logo URL directly"
                    value={formData.institution_logo}
                    onChange={(e) => setFormData({ ...formData, institution_logo: e.target.value })}
                  />
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => {
                      setShowMediaLibrary(!showMediaLibrary)
                      if (!showMediaLibrary) loadMedia()
                    }}
                  >
                    {showMediaLibrary ? 'Hide Library' : '📚 Media Library'}
                  </button>
                  <label className="image-upload-button">
                    {uploading ? '⏳ Uploading...' : '📤 Upload Logo'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file)
                      }}
                      disabled={uploading}
                    />
                  </label>
                </div>
                {showMediaLibrary && (
                  <div className="media-library">
                    <div className="media-library-header">
                      <h3>Select Logo</h3>
                      <button
                        type="button"
                        className="button-link"
                        onClick={() => setShowMediaLibrary(false)}
                      >
                        Close
                      </button>
                    </div>
                    <div className="media-grid">
                      {media.filter(m => m.mime_type?.startsWith('image/')).map((item) => (
                        <div
                          key={item.id}
                          className={`media-item ${formData.institution_logo === item.url ? 'selected' : ''}`}
                          onClick={() => {
                            setFormData({ ...formData, institution_logo: item.url })
                            setShowMediaLibrary(false)
                          }}
                        >
                          <img src={item.url} alt={item.alt_text || item.filename} />
                          <div className="media-item-info">
                            <span>{item.original_filename}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="form-section">
            <h3 className="form-section-title">💬 Testimonial</h3>
            <p className="form-section-description">The testimonial or reference text.</p>
            
            <div className="form-field">
              <label>
                Testimonial <span className="required">*</span>
              </label>
              <p className="field-description">Enter the testimonial text provided by the reference.</p>
              <textarea
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                rows={6}
                required
                placeholder="Enter the testimonial here..."
              />
            </div>
          </div>

          {/* Settings Section */}
          <div className="form-section">
            <h3 className="form-section-title">⚙️ Settings</h3>
            
            <div className="form-two-columns">
              <div className="form-field">
                <label>Language</label>
                <p className="field-description">Select the language for this reference.</p>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                >
                  <option value="en">🇬🇧 English</option>
                  <option value="fr">🇫🇷 Français</option>
                </select>
              </div>

              <div className="form-field">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  Featured Reference
                </label>
                <p className="field-description">Show this reference on the homepage.</p>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="button button-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              {reference.id ? '💾 Update Reference' : '✨ Create Reference'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminReferences

