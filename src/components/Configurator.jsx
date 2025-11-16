import { useMemo, useState } from 'react'

const MODULES = [
  { key: 'sales', label: 'Sales' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'hr', label: 'HR' },
  { key: 'finance', label: 'Finance' },
  { key: 'projects', label: 'Projects' },
]

function Configurator() {
  const [companyName, setCompanyName] = useState('Acme Corp')
  const [industry, setIndustry] = useState('Manufacturing')
  const [country, setCountry] = useState('USA')
  const [enabled, setEnabled] = useState(['sales', 'inventory'])
  const [creating, setCreating] = useState(false)
  const [message, setMessage] = useState('')
  const [createdId, setCreatedId] = useState('')

  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  const toggle = (key) => {
    setEnabled((prev) => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }

  const createCompany = async () => {
    setCreating(true)
    setMessage('')
    try {
      const key = localStorage.getItem('apiKey') || ''
      const res = await fetch(`${baseUrl}/api/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': key },
        body: JSON.stringify({ name: companyName, industry, country, modules: enabled })
      })
      if (!res.ok) throw new Error('Failed to create company (check API key)')
      const data = await res.json()
      setCreatedId(data.id)
      setMessage(`Created company with id ${data.id}. Modules saved.`)

      // Wire module toggles
      await Promise.all(
        MODULES.map(async (m) => {
          const toggled = enabled.includes(m.key)
          await fetch(`${baseUrl}/api/modules/toggle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-API-Key': key },
            body: JSON.stringify({ company_id: data.id, name: m.key, enabled: toggled })
          })
        })
      )
    } catch (e) {
      setMessage(e.message)
    } finally {
      setCreating(false)
    }
  }

  return (
    <section id="get-started" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Tailor modules for your company</h2>
            <p className="mt-3 text-gray-600">Enable only the features you need. You can revisit these choices anytime.</p>

            <div className="mt-6 space-y-4">
              {MODULES.map(m => (
                <label key={m.key} className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{m.label}</p>
                    <p className="text-sm text-gray-500">{`Core ${m.label.toLowerCase()} capabilities`}</p>
                  </div>
                  <input type="checkbox" checked={enabled.includes(m.key)} onChange={() => toggle(m.key)} className="h-5 w-5 text-red-600 focus:ring-red-500"/>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border">
            <h3 className="text-lg font-semibold text-gray-900">Company profile</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Company name</label>
                <input value={companyName} onChange={e=>setCompanyName(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="e.g. Acme"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Industry</label>
                  <input value={industry} onChange={e=>setIndustry(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="e.g. SaaS"/>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Country</label>
                  <input value={country} onChange={e=>setCountry(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="e.g. USA"/>
                </div>
              </div>
              <button onClick={createCompany} disabled={creating} className="w-full mt-4 rounded-md bg-red-600 text-white py-2.5 font-medium hover:bg-red-700 transition-colors disabled:opacity-60">
                {creating ? 'Saving...' : 'Save and continue'}
              </button>
              {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
              {createdId && <p className="mt-1 text-xs text-gray-500">Company ID: {createdId}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Configurator
