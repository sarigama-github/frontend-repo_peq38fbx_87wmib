import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-b from-red-50 via-white to-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/M2rj0DQ6tP7dSzSz/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-red-600 ring-1 ring-red-200">
            Global Management Platform
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Mini ERP that adapts to your business
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600">
            Configure sales, inventory, HR, finance and more. Enable only what you need. Secure, fast, and designed for teams across the world.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#get-started" className="inline-flex items-center justify-center rounded-md bg-red-600 px-5 py-3 text-white font-medium shadow hover:bg-red-700 transition-colors">
              Get started
            </a>
            <a href="/test" className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-gray-700 font-medium ring-1 ring-gray-200 hover:bg-gray-50 transition-colors">
              Check backend
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

export default Hero
