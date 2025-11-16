import { useEffect, useState } from 'react'

function AuthBar() {
  const [apiKey, setApiKey] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const existing = localStorage.getItem('apiKey') || ''
    setApiKey(existing)
  }, [])

  const save = () => {
    localStorage.setItem('apiKey', apiKey.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3">
        <span className="text-sm text-gray-700">API Key</span>
        <input
          value={apiKey}
          onChange={(e)=>setApiKey(e.target.value)}
          placeholder="Paste X-API-Key"
          className="flex-1 min-w-0 rounded-md border px-3 py-1.5 text-sm focus:ring-2 focus:ring-red-500 outline-none"
        />
        <button onClick={save} className="rounded-md bg-red-600 text-white text-sm px-3 py-1.5 hover:bg-red-700">Save</button>
        {saved && <span className="text-sm text-green-600">Saved</span>}
      </div>
    </div>
  )
}

export default AuthBar
