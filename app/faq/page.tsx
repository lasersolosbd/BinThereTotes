import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export default function FAQPage() {
  const faqs = [
    { q: "How long is a standard moving bin rental?", a: "Our standard rental period is two weeks, providing ample time for packing and unpacking. Extensions are available upon request." },
    { q: "Are the bins cleaned between rentals?", a: "Yes. Every tote is thoroughly sanitized and disinfected before delivery to ensure a clean packing experience." },
    { q: "How much weight can the totes hold?", a: "Our industrial-grade totes are rated for up to 75 lbs and are designed to be stacked safely without crushing." }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="bg-gray-100 pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
      </div>
      <section className="max-w-3xl mx-auto px-4 py-16 space-y-8">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-2">{faq.q}</h2>
            <p className="text-gray-700 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </section>
      <ContactForm />
      <Footer />
    </main>
  )
}
