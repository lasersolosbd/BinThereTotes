import { Package, MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-orange p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold">
                Bin There Totes
              </span>
            </div>
            <p className="text-cool-100 text-sm">
              Veteran-owned reusable moving bin rentals serving Lima, OH and surrounding areas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cool-100 hover:text-orange transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-cool-100 hover:text-orange transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#packages" className="text-cool-100 hover:text-orange transition-colors">
                  Packages
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="text-cool-100 hover:text-orange transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-cool-100 hover:text-orange transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-cool-100 hover:text-orange transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-orange mt-0.5 flex-shrink-0" />
                <span className="text-cool-100 text-sm">Lima, OH 45801</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-orange flex-shrink-0" />
                <a href="tel:+15678251714" className="text-cool-100 hover:text-orange transition-colors text-sm">
                  (567) 825-1714
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-orange flex-shrink-0" />
                <a href="mailto:info@bintheretotes.com" className="text-cool-100 hover:text-orange transition-colors text-sm">
                  info@bintheretotes.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-cool-100 hover:text-orange transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-cool-100 hover:text-orange transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-light mt-8 pt-8 text-center text-cool-100 text-sm">
          <p>&copy; {currentYear} Bin There Totes. All rights reserved. Proudly Veteran-Owned.</p>
        </div>
      </div>
    </footer>
  )
}
