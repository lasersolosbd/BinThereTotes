import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Script from 'next/script'
import BinIcon from '@/components/BinIcon'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Moving Bin & Box Rental in Wapakoneta, OH | Bin There Totes',
  description: 'Rent heavy-duty, water resistant moving bins in Wapakoneta, OH (45895). Veteran-owned. Delivered and picked up. The smart cardboard box alternative for Auglaize County moves.',
  keywords: [
    'moving bin rental Wapakoneta OH',
    'moving boxes Wapakoneta OH',
    'heavy duty moving boxes Wapakoneta',
    'water resistant moving containers Wapakoneta OH',
    'moving dolly rental Wapakoneta OH',
    'cardboard box alternative Wapakoneta OH',
    'plastic moving totes Auglaize County',
    'reusable moving bins 45895',
    'moving bins Wapak Ohio',
  ].join(', '),
  alternates: {
    canonical: 'https://www.bintheretotes.com/areas/wapakoneta',
  },
  openGraph: {
    title: 'Moving Bin & Box Rental in Wapakoneta, OH | Bin There Totes',
    description: 'Heavy-duty, water resistant moving bins delivered to your door in Wapakoneta, OH. Veteran-owned. No cardboard, no tape, no store runs.',
    url: 'https://www.bintheretotes.com/areas/wapakoneta',
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
      "name": "Where can I rent moving boxes in Wapakoneta, Ohio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bin There Totes offers reusable plastic moving bin rentals throughout Wapakoneta, OH (zip code 45895). We deliver sanitized, heavy-duty bins directly to your home or office and pick them up when your move is complete — no store run required. We serve all of Auglaize County."
      }
    },
    {
      "@type": "Question",
      "name": "Does Bin There Totes service neighborhoods near the Neil Armstrong Air and Space Museum in Wapakoneta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We service all Wapakoneta neighborhoods including the historic downtown area near the Neil Armstrong Air and Space Museum, residential streets throughout Auglaize County, and commercial areas along Defiance Street and Lincoln Highway."
      }
    }
  ]
}

const localFeatures: { title: string; body: string }[] = [
  {
    title: 'Zip Code 45895',
    body: 'Full delivery and pickup coverage throughout Wapakoneta and Auglaize County.',
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

export default function WapakonetaSilo() {
  return (
    <main className="min-h-screen bg-white">
      <Script
        id="wapakoneta-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="beforeInteractive"
      />

      <Header />

      {/* Hero */}
      <div className="bg-blue-600 pt-32 pb-20 text-center">
        <BinIcon className="w-16 h-16 mx-auto mb-6" />
        <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-3">
          Wapakoneta, OH · Auglaize County · Zip Code 45895
        </p>
        <h1 className="text-4xl font-extrabold text-white sm:text-6xl">
          Moving Bin &amp; Box Rental Alternatives in Wapakoneta, OH
        </h1>
        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
          Heavy-duty, water resistant moving bins delivered to your door in Wapak. The smarter cardboard box alternative for Auglaize County residents and businesses.
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
            Where can I rent moving boxes in Wapakoneta, Ohio?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Bin There Totes is Wapakoneta&apos;s local moving bin rental service, delivering sanitized,
            heavy-duty plastic bins directly to homes and businesses throughout zip code <strong>45895</strong>.
            Whether you&apos;re relocating near the <strong>Neil Armstrong Air &amp; Space Museum</strong>,
            moving along <strong>Defiance Street</strong> or <strong>Lincoln Highway</strong>, or
            transitioning near downtown Wapak, we drop off clean bins on your schedule and pick them
            up when you&apos;re done.
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
            Serving Every Neighborhood in Wapakoneta, OH
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Wapakoneta is the <strong>Auglaize County</strong> seat and sits directly on the
            <strong> I-75 corridor</strong> — which puts it squarely in our delivery zone. We know
            the streets from the historic neighborhoods near the <strong>Neil Armstrong Air &amp; Space
            Museum</strong> to the residential areas throughout Auglaize County and the commercial
            strips along Defiance Street. Our routing is built around I-75, so we reach any
            Wapakoneta address efficiently.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            We handle residential moves, apartment transitions, senior relocations, and commercial
            office moves throughout the Wapakoneta area. Not sure if your address is in our zone?
            Call us at{' '}
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
            For most Wapakoneta moves, yes. Our bins are a direct <strong>cardboard box alternative</strong> built
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
            Ready to move smarter in Wapakoneta?
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
