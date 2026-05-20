import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Script from 'next/script'
import BinIcon from '@/components/BinIcon'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Moving Bin & Box Rental in Delphos, OH | Bin There Totes',
  description: 'Rent heavy-duty, water resistant moving bins in Delphos, OH (45833). Veteran-owned. Delivered and picked up. The smart cardboard box alternative for Allen and Van Wert County moves.',
  keywords: [
    'moving bin rental Delphos OH',
    'moving boxes Delphos OH',
    'heavy duty moving boxes Delphos',
    'water resistant moving containers Delphos OH',
    'moving dolly rental Delphos OH',
    'cardboard box alternative Delphos OH',
    'plastic moving totes Allen County',
    'reusable moving bins 45833',
    'moving bins Van Wert County',
  ].join(', '),
  alternates: {
    canonical: 'https://www.bintheretotes.com/areas/delphos',
  },
  openGraph: {
    title: 'Moving Bin & Box Rental in Delphos, OH | Bin There Totes',
    description: 'Heavy-duty, water resistant moving bins delivered to your door in Delphos, OH. Veteran-owned. No cardboard, no tape, no store runs.',
    url: 'https://www.bintheretotes.com/areas/delphos',
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
      "name": "Where can I rent moving boxes in Delphos, Ohio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bin There Totes offers reusable plastic moving bin rentals throughout Delphos, OH (zip code 45833). We deliver sanitized, heavy-duty bins directly to your home or office and pick them up when your move is complete — no store run required. We serve both the Allen and Van Wert County sides of Delphos."
      }
    },
    {
      "@type": "Question",
      "name": "Does Bin There Totes deliver to both the Allen and Van Wert sides of Delphos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our delivery and pickup services cover the entirety of Delphos regardless of which county line your residence falls on. We regularly service neighborhoods near the historic Miami-Erie Canal and commercial hubs along West 5th Street."
      }
    }
  ]
}

const localFeatures: { title: string; body: string }[] = [
  {
    title: 'Zip Code 45833',
    body: 'Full delivery and pickup coverage throughout Delphos, serving both Allen and Van Wert County residents.',
  },
  {
    title: 'Heavy-Duty Bins',
    body: 'Water resistant, stackable plastic bins that hold up to 65 lbs — far stronger than any cardboard box.',
  },
  {
    title: 'Dolly Rental Add-On',
    body: 'Add a moving dolly to any package. No separate rental trip — we bring it with your bins.',
  },
  {
    title: 'Veteran-Owned & Operated',
    body: 'Military precision on every delivery. Sanitized bins, on-time drop-off, professional pickup.',
  },
]

export default function DelphosSilo() {
  return (
    <main className="min-h-screen bg-white">
      <Script
        id="delphos-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="beforeInteractive"
      />

      <Header />

      {/* Hero */}
      <div className="bg-blue-600 pt-32 pb-20 text-center">
        <BinIcon className="w-16 h-16 mx-auto mb-6" />
        <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-3">
          Delphos, OH · Allen &amp; Van Wert County · Zip Code 45833
        </p>
        <h1 className="text-4xl font-extrabold text-white sm:text-6xl">
          Moving Bin &amp; Box Rental Alternatives in Delphos, OH
        </h1>
        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
          Heavy-duty, water resistant moving bins delivered to your door in the Canal City. The smarter cardboard box alternative for Delphos residents and businesses.
        </p>
        <div className="mt-10">
          <Link
            href="/#packages"
            className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg"
          >
            See Rental Packages
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <section className="bg-gray-50 border-b border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {localFeatures.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <BinIcon className="w-8 h-8 mb-3" />
                <p className="font-bold text-gray-900 text-sm mb-1">{f.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-14">

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Where can I rent moving boxes in Delphos, Ohio?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Bin There Totes is Delphos&apos;s local moving bin rental service, delivering sanitized,
            heavy-duty plastic bins directly to homes and businesses throughout zip code <strong>45833</strong>.
            Delphos sits uniquely on the <strong>Allen and Van Wert County</strong> border — and we
            serve both sides. Whether you&apos;re relocating near the historic <strong>Miami-Erie Canal</strong>,
            moving along <strong>West 5th Street</strong>, or transitioning near the
            <strong> Jefferson Street</strong> downtown corridor, we drop off clean bins on your
            schedule and pick them up when you&apos;re done.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Unlike cardboard moving boxes — which require a store run, tape, and assembly — our bins
            arrive ready to pack. No hunting for packing supplies. No boxes that collapse under weight
            or absorb moisture on a rainy Ohio moving day. Just durable, water resistant containers that
            stack cleanly and protect your belongings from pickup to drop-off.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Serving Every Neighborhood in Delphos, OH
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Delphos is a tight-knit community and we treat every delivery that way. Our routing runs
            along the <strong>US-30 corridor</strong> connecting Delphos to Lima, which means we reach
            any Delphos address efficiently. We serve the historic neighborhoods near the
            <strong> Miami-Erie Canal Commission</strong> area, residential streets on both the Allen
            and Van Wert county sides, and commercial properties throughout the city.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            We handle residential moves, apartment transitions, senior relocations, and commercial
            office moves throughout Delphos and the surrounding corridor. Not sure if your address
            is in our zone? Call us at{' '}
            <a href="tel:+15673200620" className="text-blue-600 font-bold hover:underline">
              (567) 320-0620
            </a>{' '}
            and we&apos;ll confirm same-day.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Are Plastic Moving Bins Better Than Cardboard Boxes?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            For most Delphos moves, yes. Our bins are a direct <strong>cardboard box alternative</strong> built
            for real-world moving conditions. Each bin holds up to <strong>65 pounds</strong>, features
            comfortable side handles, and locks securely when stacked — no tape required. They&apos;re
            water resistant, so an unpredictable Ohio moving day won&apos;t damage your belongings the way
            a soggy cardboard box would.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Add a <strong>moving dolly rental</strong> to any package and your bins roll smoothly from
            room to truck without straining your back. We bring the dolly with your bin delivery — no
            separate trip to a hardware store required. When the move is complete, we pick everything
            up. No breaking down boxes, no recycling run, no mess.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-extrabold text-gray-900 mb-2">
            Ready to move smarter in Delphos?
          </h3>
          <p className="text-gray-600 mb-6">
            Fill out the form below for a custom quote, or call us directly at{' '}
            <a href="tel:+15673200620" className="text-blue-600 font-bold hover:underline">
              (567) 320-0620
            </a>.
          </p>
          <a
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
