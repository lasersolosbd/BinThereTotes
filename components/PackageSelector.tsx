'use client'

import { useState } from 'react'
import { Package, Plus, Minus, Check } from 'lucide-react'

const STANDARD_PACKAGES = [
  {
    id: '1bed',
    name: '1-Bedroom',
    bins: 15,
    price: 149,
    description: 'Perfect for studios and 1-bedroom apartments',
    popular: false,
  },
  {
    id: '2bed',
    name: '2-Bedroom',
    bins: 25,
    price: 229,
    description: 'Ideal for 2-bedroom homes and apartments',
    popular: true,
  },
  {
    id: '3bed',
    name: '3-Bedroom',
    bins: 40,
    price: 329,
    description: 'Great for larger homes and families',
    popular: false,
  },
]

export default function PackageSelector() {
  const [selectedPackage, setSelectedPackage] = useState('2bed')
  const [customMode, setCustomMode] = useState(false)
  const [customBins, setCustomBins] = useState(25)

  const calculateCustomPrice = (bins: number) => {
    // $8 per bin base price
    return Math.round(bins * 8)
  }

  const handleCustomIncrease = () => {
    setCustomBins(prev => Math.min(prev + 5, 100))
  }

  const handleCustomDecrease = () => {
    setCustomBins(prev => Math.max(prev - 5, 5))
  }

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy mb-4">
            Choose Your Package
          </h2>
          <p className="text-xl text-gray-600">
            Select a pre-built package or customize your bin count to match your exact needs
          </p>
        </div>

        {/* Custom Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-cool-100 rounded-lg p-1">
            <button
              onClick={() => setCustomMode(false)}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                !customMode
                  ? 'bg-white text-navy shadow-md'
                  : 'text-gray-600 hover:text-navy'
              }`}
            >
              Standard Packages
            </button>
            <button
              onClick={() => setCustomMode(true)}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                customMode
                  ? 'bg-white text-navy shadow-md'
                  : 'text-gray-600 hover:text-navy'
              }`}
            >
              Custom Setup
            </button>
          </div>
        </div>

        {/* Standard Packages View */}
        {!customMode && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STANDARD_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`relative cursor-pointer rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 ${
                  selectedPackage === pkg.id
                    ? 'bg-navy text-white shadow-2xl ring-4 ring-orange'
                    : 'bg-cool-50 hover:shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 -right-3 bg-orange text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Check Mark */}
                {selectedPackage === pkg.id && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-orange rounded-full p-1">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </div>
                )}

                {/* Package Icon */}
                <div className={`inline-flex p-4 rounded-xl mb-4 ${
                  selectedPackage === pkg.id ? 'bg-orange/20' : 'bg-orange/10'
                }`}>
                  <Package className={`h-8 w-8 ${
                    selectedPackage === pkg.id ? 'text-orange-light' : 'text-orange'
                  }`} />
                </div>

                {/* Package Name */}
                <h3 className="text-2xl font-display font-bold mb-2">
                  {pkg.name}
                </h3>

                {/* Bin Count */}
                <div className={`text-4xl font-bold mb-2 ${
                  selectedPackage === pkg.id ? 'text-white' : 'text-navy'
                }`}>
                  {pkg.bins} Bins
                </div>

                {/* Description */}
                <p className={`mb-6 ${
                  selectedPackage === pkg.id ? 'text-cool-100' : 'text-gray-600'
                }`}>
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="border-t pt-4 mt-auto" style={{
                  borderColor: selectedPackage === pkg.id ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
                }}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-3xl font-bold">${pkg.price}</span>
                      <span className={`ml-2 ${
                        selectedPackage === pkg.id ? 'text-cool-100' : 'text-gray-500'
                      }`}>
                        /rental
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Setup View */}
        {customMode && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 text-white shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-orange/20 rounded-xl mb-4">
                  <Package className="h-12 w-12 text-orange-light" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-2">
                  Custom Package
                </h3>
                <p className="text-cool-100">
                  Adjust the bin count to perfectly match your moving needs
                </p>
              </div>

              {/* Bin Counter */}
              <div className="bg-white/10 rounded-xl p-8 mb-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handleCustomDecrease}
                    disabled={customBins <= 5}
                    className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 transition-all"
                  >
                    <Minus className="h-6 w-6" />
                  </button>

                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">{customBins}</div>
                    <div className="text-cool-100 text-lg">Bins</div>
                  </div>

                  <button
                    onClick={handleCustomIncrease}
                    disabled={customBins >= 100}
                    className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 transition-all"
                  >
                    <Plus className="h-6 w-6" />
                  </button>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={customBins}
                  onChange={(e) => setCustomBins(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-orange"
                />
                <div className="flex justify-between mt-2 text-sm text-cool-100">
                  <span>5 bins</span>
                  <span>100 bins</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-orange rounded-xl p-6 text-center">
                <div className="text-cool-100 text-sm mb-1">Total Price</div>
                <div className="text-5xl font-bold">${calculateCustomPrice(customBins)}</div>
                <div className="text-cool-100 mt-2">
                  ${(calculateCustomPrice(customBins) / customBins).toFixed(2)} per bin
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a href="#contact" className="btn-primary inline-flex items-center space-x-2">
            <span>Book {customMode ? 'Custom Package' : 'This Package'}</span>
            <Check className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
