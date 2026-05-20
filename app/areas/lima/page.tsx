import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Moving Bin & Box Rental in Lima, OH | Bin There Totes',
  description: 'Rent heavy-duty, waterproof moving bins in Lima, OH (45801, 45804, 45805). Veteran-owned. Delivered and picked up. The smart cardboard box alternative for Allen County moves.',
  keywords: [
    'moving bin rental Lima OH',
    'moving boxes Lima OH',
    'moving box rental Lima Ohio',
    'heavy duty moving boxes Lima',
    'waterproof moving containers Lima OH',
    'moving dolly rental Lima OH',
    'cardboard box alternative Lima OH',
    'plastic moving totes Allen County',
    'reusable moving bins 45801',
  ].join(', '),
  alternates: {
    canonical: 'https://www.bintheretotes.com/areas/lima',
  },
  openGraph: {
    title: 'Moving Bin & Box Rental in Lima, OH | Bin There Totes',
    description: 'Heavy-duty, waterproof moving bins delivered to your door in Lima, OH. Veteran-owned. No cardboard, no tape, no store runs.',
    url: 'https://www.bintheretotes.com/areas/lima',
    siteName: 'Bin There Totes',
    locale: 'en_US',
    type: 'website',
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where can I rent moving boxes in Lima, Ohio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bin There Totes offers reusable plastic moving bin rentals throughout Lima, OH, including zip codes 45801, 45804, and 45805. We deliver sanitized, heavy-duty bins directly to your home or office and pick them up when your move is complete — no store run required."
      }
    },
    {
      "@type": "Question",
      "name": "Are plastic moving bins better than cardboard boxes for a Lima move?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our waterproof plastic moving bins are sturdier than cardboard boxes, hold up to 65 lbs each, and stack securely on a dolly. They won't collapse, tear, or absorb moisture — making them the preferred cardboard box alternative for Lima, OH residents and businesses."
      }
    }
  ]
}

export default function LimaSilo() {

  const localFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'All Lima Zip Codes',
      body: 'We serve 45801, 45804, and 45805 — every corner of Lima and the Allen County surrounding area.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
        </svg>
      ),
      title: 'Heavy-Duty Bins',
      body: 'Waterproof, stackable plastic bins that hold up to 65 lbs — far stronger than any cardboard box.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
        </svg>
      ),
      title: 'Dolly Rental Add-On',
      body: 'Add a moving dolly to any package. No separate rental trip — we bring it with your bins.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Veteran-Owned & Operated',
      body: 'Military precision on every delivery. Sanitized bins, on-time drop-off, professional pickup.',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Script
        id="lima-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="beforeInteractive"
      />

      <Header />

      {/* Hero */}
      <div className="bg-blue-600 pt-32 pb-20 text-center">
        <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-3">
          Lima, OH · Allen County · Zip Codes 45801, 45804, 45805
        </p>
        <h1 className="text-4xl font-extrabold text-white sm:text-6xl">
          Moving Bin &amp; Box Rental Alternatives in Lima, OH
        </h1>
        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
          Heavy-duty, waterproof moving bins delivered to your door. The smarter cardboard box alternative for Lima residents and businesses.
        </p>
      </div>

      {/* Feature Grid */}
      <section className="bg-gray-50 border-b border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {localFeatures.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="text-blue-600 mb-3">{f.icon}</div>
                <p className="font-bold text-gray-900 text-sm mb-1">{f.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-14">

        {/* FAQ Block 1 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Where can I rent moving boxes in Lima, Ohio?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Bin There Totes is Lima&apos;s local moving bin rental service, delivering sanitized, heavy-duty
            plastic bins directly to homes and businesses across zip codes <strong>45801, 45804, and 45805</strong>.
            Whether you&apos;re relocating near <strong>St. Rita&apos;s Medical Center</strong>, moving across
            town from the <strong>Lima Memorial Health System</strong> corridor, or transitioning a
            business off <strong>North West Street</strong>, we drop off clean bins on your schedule and
            pick them up when you&apos;re done.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Unlike cardboard moving boxes — which require a store run, tape, and assembly — our bins
            arrive ready to pack. No hunting for packing supplies. No boxes that collapse under weight
            or absorb moisture on a rainy Lima moving day. Just durable, waterproof containers that
            stack cleanly and protect your belongings from pickup to drop-off.
          </p>
        </div>

        {/* Local Context Block */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Serving Every Neighborhood in Lima, OH
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Allen County is our home base. We know the streets — from the Ottawa River neighborhoods
            on Lima&apos;s west side to the subdivisions east of <strong>Elida Road</strong>, from
            the historic blocks near <strong>Veterans Memorial Civic &amp; Convention Center</strong>
            to the residential areas surrounding <strong>Allen County Fairgrounds</strong>. Our
            delivery routing is built around the I-75 and US-30 corridors, so we can reach any
            Lima-area address efficiently.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            We serve residential movers, apartment transitions, senior relocations, and commercial
            office moves throughout the city. If you&apos;re not sure whether your specific address
            falls inside our service zone, call us at{' '}
            <a href="tel:+15673200620" className="text-blue-600 font-bold hover:underline">
              (567) 320-0620
            </a>{' '}
            and we&apos;ll confirm same-day.
          </p>
        </div>

        {/* Cardboard Alternative Block */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Are Plastic Moving Bins Better Than Cardboard Boxes?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            For most Lima moves, yes. Our bins are a direct cardboard box alternative built for
            real-world moving conditions. Each bin holds up to <strong>65 pounds</strong>, features
            comfortable side handles, and locks securely when stacked — no tape required. They&apos;re
            waterproof, so a rainy moving day in Allen County won&apos;t damage your belongings the
            way a soggy cardboard box would.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Add a <strong>moving dolly rental</strong> to any package and your bins roll smoothly
            from room to truck without straining your back. We bring the dolly with your bin
            delivery — no separate trip to a hardware store required. When the move is complete,
            we pick everything up. No breaking down boxes, no recycling run, no mess.
          </p>
        </div>

        {/* CTA Nudge */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-extrabold text-gray-900 mb-2">
            Ready to move smarter in Lima?
          </h3>
          <p className="text-gray-600 mb-6">
            Fill out the form below for a custom quote, or call us directly at{' '}
            <a href="tel:+15673200620" className="text-blue-600 font-bold hover:underline">
              (567) 320-0620
            </a>.
          </p>
          
            href="#contact"
            className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Get My Free Quote
          </a>
        </div>

      </section>

      <ContactForm />
      <Footer />
    </main>
  )
}
