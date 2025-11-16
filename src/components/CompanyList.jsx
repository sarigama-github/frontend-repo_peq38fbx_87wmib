import { useEffect, useMemo, useState } from 'react'

function CompanyList() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = localStorage.getItem('apiKey') || ''
        const res = await fetch(`${baseUrl}/api/companies`, { headers: { 'X-API-Key': key } })
        if (!res.ok) throw new Error('Failed to fetch companies')
        const data = await res.json()
        setCompanies(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [baseUrl])

  if (loading) return <p className="text-gray-600">Loading companies...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900">Existing companies</h3>
      {companies.length === 0 && <p className="text-sm text-gray-600 mt-2">No companies yet.</p>}
      <ul className="mt-4 grid gap-3">
        {companies.map(c => (
          <li key={c._id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{c.name}</p>
                <p className="text-sm text-gray-600">{c.industry || '—'} • {c.country || '—'}</p>
              </div>
              <div className="text-sm text-gray-700">Modules: {Array.isArray(c.modules) && c.modules.length ? c.modules.join(', ') : '—'}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CompanyList
