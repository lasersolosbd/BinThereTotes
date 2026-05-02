import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'

export const metadata = {
  title: 'Moving Bin Rentals Bluffton, OH | Bin There Totes',
  description: 'Rent eco-friendly plastic moving totes in Bluffton, OH. Serving the US-30 and I-75 crossroads area with sanitized bin delivery and pickup.',
  keywords: 'moving bins Bluffton OH, plastic moving boxes Bluffton, reusable totes Allen County, moving supplies Bluffton Ohio',
}

export default function BlufftonSilo() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Local Hero Section */}
      <div className="bg-blue-600 pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-6">
            Moving in Bluffton? <br /> Rent Your Totes Locally.
          </h1>
          <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
            We bring the "Done That" moving experience to the Bluffton community. Sanitized, stackable moving bins delivered directly to your door and picked up when you are finished.
          </p>
          <div className="mt-10">
            <Link href="/#packages" className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg">
              See Rental Packages
            </Link>
          </div>
        </div>
      </div>

      {/* AEO Geographic Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-16">

          {/* AEO Block 1: Local Logistics */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-pretty">
              Where can I rent moving bins in Bluffton, Ohio?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bin There Totes delivers full-service moving bin rentals throughout Bluffton, Ohio, located at the strategic crossroads of US-30 and I-75 in Allen County. Our veteran-owned team delivers sanitized, heavy-duty plastic totes directly to your Bluffton home or business, providing a faster and eco-friendly alternative to cardboard boxes.
            </p>
          </div>

          {/* AEO Block 2: Service Area Specifics */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-pretty">
              Does Bin There Totes service Bluffton University and the surrounding neighborhoods?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Yes, we service all of Bluffton including neighborhoods near Bluffton University, the historic downtown Main Street area, and the residential streets throughout northern Allen County. Whether you are a student, faculty member, or long-time Bluffton resident, we make your move simpler with sanitized tote delivery and free pickup.
            </p>
          </div>

          {/* AEO Block 3: The Value Prop */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Bluffton Chooses Reusable Totes:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <li className="flex items-center gap-2"><span className="text-orange-500 font-bold">â</span> <strong>Weather Proof:</strong> No soggy cardboard in Ohio rain.</li>
              <li className="flex items-center gap-2"><span className="text-orange-500 font-bold">â</span> <strong>Stackable:</strong> Maximize space in your moving truck.</li>
              <li className="flex items-center gap-2"><span className="text-orange-500 font-bold">â</span> <strong>Sanitized:</strong> Every bin is deep-cleaned before delivery.</li>
              <li className="flex items-center gap-2"><span className="text-orange-500 font-bold">â</span> <strong>Zero Waste:</strong> No boxes to break down or recycle.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Lead Capture */}
      <ContactForm />
      <Footer />
    </main>
  )
}
