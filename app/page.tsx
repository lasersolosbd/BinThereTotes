import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PackageSelector from '@/components/PackageSelector'
import Features from '@/components/Features'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      {/* AEO Silo Navigation Hub - Injected for geographic and commercial routing */}
      <section className="bg-gray-50 py-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Serving Allen County & The I-75 Corridor</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Providing fully sanitized, eco-friendly moving totes for seamless residential transitions and efficient commercial relocations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
            <Link href="/commercial-moves" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">Commercial Office Moves</Link>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <Link href="/areas/delphos" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">Delphos</Link>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <Link href="/areas/bluffton" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">Bluffton</Link>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <Link href="/areas/wapakoneta" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">Wapakoneta</Link>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <Link href="/faq" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">Moving Logistics FAQ</Link>
          </div>
        </div>
      </section>

      <PackageSelector />
      <Features />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  )
}
