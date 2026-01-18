import { useState, useEffect, useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '../../components/DataTable/DataTable'
import './AdminNewsletter.css'

interface Subscriber {
  id: string
  email: string
  name?: string
  language: string
  subscribed: boolean
  subscribed_at: string
  source?: string
  tags?: string[]
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  content_html: string
  content_text?: string
  template_type: string
  language: string
  variables?: string[]
}

interface Campaign {
  id: string
  name: string
  subject: string
  template_id?: string
  content_html?: string
  status: string
  scheduled_at?: string
  sent_at?: string
  recipient_count: number
  opened_count: number
  clicked_count: number
  language: string
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
const token = localStorage.getItem('supabase_token')

async function fetchSubscribers() {
  const response = await fetch(`${API_BASE_URL}/admin/newsletter/subscribers`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!response.ok) throw new Error('Failed to fetch subscribers')
  return response.json()
}

async function fetchTemplates() {
  const response = await fetch(`${API_BASE_URL}/admin/newsletter/templates`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!response.ok) throw new Error('Failed to fetch templates')
  return response.json()
}

async function fetchCampaigns() {
  const response = await fetch(`${API_BASE_URL}/admin/newsletter/campaigns`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!response.ok) throw new Error('Failed to fetch campaigns')
  return response.json()
}

function AdminNewsletter() {
  const [activeTab, setActiveTab] = useState<'subscribers' | 'templates' | 'campaigns'>('subscribers')
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    try {
      setLoading(true)
      if (activeTab === 'subscribers') {
        const data = await fetchSubscribers()
        setSubscribers(data)
      } else if (activeTab === 'templates') {
        const data = await fetchTemplates()
        setTemplates(data)
      } else if (activeTab === 'campaigns') {
        const data = await fetchCampaigns()
        setCampaigns(data)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="wp-admin-newsletter">
      <div className="newsletter-tabs">
        <button
          className={`tab-button ${activeTab === 'subscribers' ? 'active' : ''}`}
          onClick={() => setActiveTab('subscribers')}
        >
          Subscribers ({subscribers.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          Templates ({templates.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'campaigns' ? 'active' : ''}`}
          onClick={() => setActiveTab('campaigns')}
        >
          Campaigns ({campaigns.length})
        </button>
      </div>

      {loading ? (
        <div className="wp-admin-loading">Loading...</div>
      ) : (
        <>
          {activeTab === 'subscribers' && (
            <div className="newsletter-content">
              <h2>Newsletter Subscribers</h2>
              <SubscribersTable
                subscribers={subscribers}
                loading={loading}
                onDelete={async (id) => {
                  if (confirm('Delete this subscriber?')) {
                    try {
                      await fetch(`${API_BASE_URL}/admin/newsletter/subscribers/${id}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${token}` },
                      })
                      loadData()
                    } catch (error) {
                      alert('Failed to delete subscriber')
                    }
                  }
                }}
              />
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="newsletter-content">
              <div className="wp-admin-table-header">
                <h2>Email Templates</h2>
                <button className="button button-primary" onClick={() => alert('Template editor coming soon!')}>
                  Add New Template
                </button>
              </div>
              <p>Template management interface coming soon. For now, templates can be managed directly in Supabase.</p>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="newsletter-content">
              <div className="wp-admin-table-header">
                <h2>Email Campaigns</h2>
                <button className="button button-primary" onClick={() => alert('Campaign creator coming soon!')}>
                  Create Campaign
                </button>
              </div>
              <p>Campaign management interface coming soon. For now, campaigns can be managed directly in Supabase.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function SubscribersTable({
  subscribers,
  loading,
  onDelete,
}: {
  subscribers: Subscriber[]
  loading: boolean
  onDelete: (id: string) => void
}) {
  const columns = useMemo<ColumnDef<Subscriber>[]>(
    () => [
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => row.original.name || '-',
      },
      {
        accessorKey: 'language',
        header: 'Language',
        cell: ({ row }) => row.original.language.toUpperCase(),
      },
      {
        accessorKey: 'subscribed',
        header: 'Subscribed',
        cell: ({ row }) => (row.original.subscribed ? 'Yes' : 'No'),
      },
      {
        accessorKey: 'source',
        header: 'Source',
        cell: ({ row }) => row.original.source || '-',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <button
            className="button-link delete-link"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(row.original.id)
            }}
          >
            Delete
          </button>
        ),
      },
    ],
    [onDelete]
  )

  return (
    <DataTable
      data={subscribers}
      columns={columns}
      loading={loading}
      emptyMessage="No subscribers found."
    />
  )
}

export default AdminNewsletter

