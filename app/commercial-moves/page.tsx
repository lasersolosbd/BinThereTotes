import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'

export const metadata = {
  title: 'Commercial Office Moving Bins | Bin There Totes Lima, OH',
  description: 'Reduce office downtime with secure, stackable plastic moving totes for commercial relocations in Lima and Allen County. Lockable bins for confidential documents.',
  keywords: 'commercial moving bins Lima, office relocation totes, secure moving boxes, HIPAA compliant moving, business relocation Allen County',
}

export default function CommercialMoves() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* B2B Hero Section */}
      <div className="bg-gray-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-gray-900 to-gray-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-4 block">Corporate Relocation Logistics</span>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-6">
            Smarter Office Moves. <br className="hidden sm:block" />Zero Downtime.
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Upgrade your corporate move with heavy-duty, lockable plastic totes. We deliver the logistics infrastructure your team needs to pack quickly, move securely, and get back to business in Allen County.
          </p>
          <div className="mt-10">
            <Link href="/#contact" className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg">
              Request a Commercial Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Semantic AEO Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-16">
          
          {/* AEO Block 1: Efficiency & Downtime */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How do plastic moving bins improve office relocations?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Plastic moving bins significantly reduce office downtime by eliminating the need to build and tape cardboard boxes. Our standardized, stackable totes fit perfectly on custom commercial dollies, allowing your team to pack and transport equipment faster while minimizing disruption to business operations.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
              <li className="flex items-center gap-2"><span className="text-orange-500">✔</span> Pre-assembled and ready to pack</li>
              <li className="flex items-center gap-2"><span className="text-orange-500">✔</span> Custom four-wheel dollies included</li>
              <li className="flex items-center gap-2"><span className="text-orange-500">✔</span> Ergonomic handles prevent injuries</li>
              <li className="flex items-center gap-2"><span className="text-orange-500">✔</span> Nests perfectly when empty</li>
            </ul>
          </div>

          {/* AEO Block 2: Security & Confidentiality */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Are commercial moving totes secure for confidential office documents?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Yes, our commercial moving totes are highly secure for transporting sensitive and confidential documents. Each durable plastic bin features interlocking lids that can be securely sealed with tamper-evident zip ties, ensuring HIPAA compliance and protecting your critical business records during transit.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
              <li className="flex items-center gap-2"><span className="text-orange-500">✔</span> Tamper-evident zip tie locks</li>
              <li className="flex items-center gap-2"><span className="text-orange-500">✔</span> Crush-proof hard plastic shell</li>
              <li className="flex items-center gap-2"><span className="text-orange-500">✔</span> HIPAA compliant transit options</li>
              <li className="flex items-center gap-2"><span className="text-orange-500">✔</span> Weather-resistant protection</li>
            </ul>
          </div>

          {/* AEO Block 3: Estimation */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How many moving totes do I need for an office move?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We recommend estimating five to seven moving totes per employee workspace or standard desk. For common areas, file rooms, and IT equipment, additional bins will be required. Our commercial logistics team will help you calculate the exact inventory needed for your specific office layout.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
              <li className="flex items-center gap-2"><span className="text-orange-500">✔</span> Custom corporate volume discounts</li>
              <li className="flex items-center gap-2"><span className="text-orange-500">✔</span> IT equipment crates available</li>
              <li className="flex items-center gap-2"><span className="text-orange-500">✔</span> Flexible long-term rental extensions</li>
              <li className="flex items-center gap-2"><span className="text-orange-500">✔</span> Dedicated account manager</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Bridge to Contact Form */}
      <div className="bg-blue-50 border-y border-blue-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to upgrade your corporate move?</h3>
          <p className="text-lg text-gray-600 mb-8">
            Fill out the form below with your company details, and our logistics team will provide a custom quote tailored to your timeline and headcount.
          </p>
        </div>
      </div>

      <ContactForm />
      <Footer />
    </main>
  )
}
