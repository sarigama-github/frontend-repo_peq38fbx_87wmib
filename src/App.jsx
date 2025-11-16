import Hero from './components/Hero'
import Features from './components/Features'
import Configurator from './components/Configurator'
import AuthBar from './components/AuthBar'
import CompanyList from './components/CompanyList'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50">
        <AuthBar />
        <header className="bg-white/80 backdrop-blur border-b">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-gray-900">Flames ERP</a>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
              <a href="#get-started" className="hover:text-red-600">Get started</a>
              <a href="/test" className="hover:text-red-600">Status</a>
              <a href="#features" className="hover:text-red-600">Features</a>
            </nav>
            <a href="#get-started" className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-white font-medium shadow hover:bg-red-700 transition-colors">
              Try it now
            </a>
          </div>
        </header>
      </div>

      <main>
        <Hero />
        <div id="features"><Features /></div>
        <Configurator />
        <div className="max-w-6xl mx-auto px-6">
          <CompanyList />
        </div>
      </main>

      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Flames • Global Management Platform</p>
          <a href="/test" className="hover:text-red-600">Backend status</a>
        </div>
      </footer>
    </div>
  )
}

export default App
