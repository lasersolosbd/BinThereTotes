'use client'
import { useState, useCallback } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PackageSelector from '@/components/PackageSelector'
import Features from '@/components/Features'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'

// Exact GPS Coordinates for the Geographic Silos
const serviceAreas = [
  { id: 'lima', name: 'Lima (Hub)', lat: 40.7425, lng: -84.1052, path: '/areas/lima' },
  { id: 'delphos', name: 'Delphos', lat: 40.8442, lng: -84.3413, path: '/areas/delphos' },
  { id: 'bluffton', name: 'Bluffton', lat: 40.8953, lng: -83.8966, path: '/areas/bluffton' },
  { id: 'wapak', name: 'Wapakoneta', lat: 40.5678, lng: -84.1936, path: '/areas/wapakoneta' },
]

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1.5rem'
}

// Center map between the hubs
const center = {
  lat: 40.7500,
  lng: -84.1500
}

export default function Home() {
  const [activePin, setActivePin] = useState<typeof serviceAreas[0] | null>(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBibJqdJLOMmS0sOWsHqSKT4jfbn2qp9G0" // Protected by HTTP Referrer Restriction in Google Cloud
  })

  const onLoad = useCallback(function callback(map: any) {
    // Map loaded successfully
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setActivePin(null)
  }, [])

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
              <div className="bg-orange-500 text-white p-3 rounded-full flex-shrink-0">
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
            
            {/* Left: Google Maps Component */}
            <div className="relative bg-gray-100 rounded-3xl border border-gray-200 p-2 shadow-inner h-[500px] lg:h-auto lg:aspect-square overflow-hidden">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={10}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  options={{
                    disableDefaultUI: false,
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                  }}
                >
                  {serviceAreas.map((area) => (
                    <Marker
                      key={area.id}
                      position={{ lat: area.lat, lng: area.lng }}
                      onClick={() => setActivePin(area)}
                    />
                  ))}

                  {activePin && (
                    <InfoWindow
                      position={{ lat: activePin.lat, lng: activePin.lng }}
                      onCloseClick={() => setActivePin(null)}
                    >
                      <div className="p-2 w-48">
                        <h4 className="font-bold text-gray-900 mb-1">{activePin.name}</h4>
                        <p className="text-xs text-gray-600 mb-3">
                          Providing sanitized bin delivery and pickup services in {activePin.name}.
                        </p>
                        <Link 
                          href={activePin.path} 
                          target="_blank"
                          className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-3xl">
                  <p className="text-gray-500 font-medium animate-pulse">Loading interactive map...</p>
                </div>
              )}
            </div>

            {/* Right: Quick Links & USPs */}
            <div className="flex flex-col justify-between h-full">
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
                  <div className="p-2 bg-gray-700 rounded-lg text-xl">🏢</div>
                  <div>
                    <p className="font-bold">Commercial & Office Relocations</p>
                    <p className="text-sm text-gray-400">Specialized logistics for local businesses.</p>
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
