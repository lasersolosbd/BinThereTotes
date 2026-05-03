'use client'

import { Shield, ArrowRight, CheckCircle, Package } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="bg-white pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Veteran Badge */}
            <div className="inline-flex items-center space-x-2 bg-navy text-white px-4 py-2 rounded-full text-sm font-semibold">
              <Shield className="h-4 w-4 text-orange" />
              <span>Veteran-Owned & Operated</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-gray-900 leading-tight">
              The <span className="text-orange-500">"Bin There,<br />Done That"</span><br />Way to Move
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-700 leading-relaxed">
              Rent our stackable bins, pack them at your pace, and we'll pick them up.{' '}
              Skip the cardboard chaos. <span className="font-semibold text-navy">Join the "Done That" club</span> in Lima, OH and Surrounding Areas.
            </p>

            {/* Key Benefits */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-orange flex-shrink-0" />
                <span className="text-gray-700 font-medium">No assembly, no tape, no mess</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-orange flex-shrink-0" />
                <span className="text-gray-700 font-medium">Delivered and picked up on your schedule</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-orange flex-shrink-0" />
                <span className="text-gray-700 font-medium">100% eco-friendly and reusable</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Book Your Totes</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#packages" className="btn-secondary inline-flex items-center justify-center">
                See Packages
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-bins.webp"
                alt="Family using Bin There Totes branded moving bins at their Allen County home"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-orange/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-navy/5 rounded-full blur-3xl"></div>
    </section>
  )
}
