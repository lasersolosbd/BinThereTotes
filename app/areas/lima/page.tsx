import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export default function LimaSilo() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="bg-blue-600 pt-32 pb-20 text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-6xl">Moving in Lima?</h1>
        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">The central logistics hub for sanitized moving totes in Allen County.</p>
      </div>
      <section className="max-w-4xl mx-auto px-4 py-20 space-y-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Where can I rent moving boxes in Lima, Ohio?</h2>
        <p className="text-lg text-gray-700">Bin There Totes provides full-service moving bin rentals in Lima, OH, delivering sanitized plastic totes to homes and offices near downtown, St. Rita's, and Lima Memorial. Our stackable, heavy-duty bins provide a professional alternative to cardboard, making local relocations faster and more efficient.</p>
      </section>
      <ContactForm />
      <Footer />
    </main>
  )
}
