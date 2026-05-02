'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PackageSelector from '@/components/PackageSelector'
import Features from '@/components/Features'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import Link from 'next/link'

// Geographic Data for Map Pins
const serviceAreas = [
  { id: 'lima', name: 'Lima (Hub)', x: '50%', y: '50%', path: '/areas/lima' },
  { id: 'delphos', name: 'Delphos', x: '15%', y: '45%', path: '/areas/delphos' },
  { id: 'bluffton', name: 'Bluffton', x: '85%', y: '15%', path: '/areas/bluffton' },
  { id: 'wapak', name: 'Wapakoneta', x: '50%', y: '85%', path: '/areas/wapakoneta' },
]

export default function Home() {
  const [activePin, setActivePin] = useState<typeof serviceAreas[0] | null>(null)

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      {/* Interactive Geographic Silo Hub */}
      <section id="areas" className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header & Allen County Branding */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Serving Allen County & The I-75 Corridor</h2>
              <p className="mt-4 text-xl text-gray-600">
                Strategic moving bin hubs located along the I-75 and US-30 corridors for maximum efficiency.
              </p>
            </div>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
              <div className="bg-orange-500 text-white p-3 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-orange-800 uppercase tracking-wider">Official Service Provider</p>
                <p className="text-lg font-extrabold text-gray-900">ALL OF ALLEN COUNTY</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left: Interactive SVG Map Container */}
            <div className="relative bg-blue-50 rounded-3xl border border-blue-100 p-8 shadow-inner overflow-hidden aspect-square sm:aspect-video lg:aspect-square">
              {/* Abstract Corridor Visualization */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                <line x1="50" y1="0" x2="50" y2="100" stroke="#2563eb" strokeWidth="4" strokeDasharray="4 2" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="#2563eb" strokeWidth="4" strokeDasharray="4 2" />
              </svg>

              {/* Pins Layer */}
              <div className="relative w-full h-full">
                {serviceAreas.map((area) => (
                  <div
                    key={area.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: area.x, top: area.y }}
                    onClick={() => setActivePin(area)}
                  >
                    <div className="bg-orange-500 rounded-full w-6 h-6 border-4 border-white shadow-lg group-hover:scale-125 transition-transform"></div>
                    <span className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm border border-gray-100">
                      {area.name}
                    </span>
                  </div>
                ))}

                {/* Popover UI */}
                {activePin && (
                  <div
                    className="absolute z-10 p-4 bg-white rounded-xl shadow-2xl border border-gray-100 w-64 transform -translate-x-1/2"
                    style={{ left: activePin.x, top: `calc(${activePin.y} - 100px)` }}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); setActivePin(null); }}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >✕</button>
                    <h4 className="font-bold text-gray-900 mb-1">{activePin.name}</h4>
                    <p className="text-xs text-gray-600 mb-3 text-pretty">
                      Providing sanitized bin delivery and pickup services in {activePin.name}.
                    </p>
                    <Link
                      href={activePin.path}
                      target="_blank"
                      className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
                    >
                      View Area Details
                    </Link>
                  </div>
                )}
              </div>
              <p className="absolute bottom-4 left-4 text-[10px] text-blue-400 font-bold tracking-widest uppercase">Corridor Hub Map v1.0</p>
            </div>

            {/* Right: Quick Links & USPs */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Our Local Hubs</h3>
                <div className="space-y-4">
                  {serviceAreas.map((area) => (
                    <Link
                      key={area.id}
                      href={area.path}
                      target="_blank"
                      className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-orange-500 font-bold">
                          {area.name.charAt(0)}
                        </div>
                        <span className="font-bold text-gray-800">{area.name}</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Commercial & Contact Bridge */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <Link href="/commercial-moves" target="_blank" className="flex items-center gap-4 p-4 bg-gray-900 rounded-2xl text-white hover:bg-gray-800 transition-colors">
                  <div className="p-2 bg-gray-700 rounded-lg">🏢</div>
                  <div>
                    <p className="font-bold">Commercial & Office Relocations</p>
                    <p className="text-sm text-gray-400">Specialized logistics for Lima businesses.</p>
                  </div>
                </Link>

                <div className="mt-6 text-center lg:text-left">
                  <p className="text-gray-500 font-medium">Not sure if we service your area?</p>
                  <Link href="/#contact" className="text-orange-500 font-bold hover:underline">
                    Send us an inquiry and we&apos;ll check for you &rarr;
                  </Link>
                </div>
              </div>
            </div>

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
