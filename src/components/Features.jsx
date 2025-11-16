function Features() {
  const features = [
    {
      title: 'Modular by design',
      desc: 'Turn on sales, inventory, HR, finance and more. Only pay the complexity you need.',
    },
    {
      title: 'Global ready',
      desc: 'Multi-currency, multi-language friendly UI, and region-aware defaults out of the box.',
    },
    {
      title: 'Secure and scalable',
      desc: 'Built on modern APIs and a robust database foundation to grow with your team.',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border p-6 hover:shadow-sm transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
