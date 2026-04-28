'use client'

import { Package, Phone, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cool-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className="bg-orange p-2 rounded-lg transform group-hover:rotate-12 transition-transform duration-300">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-navy">
              Bin There Totes
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#packages" className="text-navy-light hover:text-orange transition-colors font-medium">
              Packages
            </a>
            <a href="/#how-it-works" className="text-navy-light hover:text-orange transition-colors font-medium">
              How It Works
            </a>
            <a href="/#faq" className="text-navy-light hover:text-orange transition-colors font-medium">
              FAQ
            </a>
            <a href="/#contact" className="text-navy-light hover:text-orange transition-colors font-medium">
              Contact
            </a>
            <a href="tel:+14195551234" className="flex items-center space-x-2 text-orange hover:text-orange-dark transition-colors font-semibold">
              <Phone className="h-4 w-4" />
              <span>(419) 555-1234</span>
            </a>
            <a href="/#contact" className="btn-primary">
              Book Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-navy"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-cool-200">
            <a href="/#packages" className="block text-navy-light hover:text-orange transition-colors font-medium">
              Packages
            </a>
            <a href="/#how-it-works" className="block text-navy-light hover:text-orange transition-colors font-medium">
              How It Works
            </a>
            <a href="/#faq" className="block text-navy-light hover:text-orange transition-colors font-medium">
              FAQ
            </a>
            <a href="/#contact" className="block text-navy-light hover:text-orange transition-colors font-medium">
              Contact
            </a>
            <a href="tel:+14195551234" className="flex items-center space-x-2 text-orange font-semibold">
              <Phone className="h-4 w-4" />
              <span>(419) 555-1234</span>
            </a>
            <a href="/#contact" className="btn-primary block text-center">
              Book Now
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
