'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    moveDate: '',
    package: '2bed',
    message: '',
    agreeTerms: false,
    agreeSMS: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.agreeTerms) {
      alert('Please agree to the Terms and Privacy Policy to continue.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Replace with actual GoHighLevel webhook URL
      const webhookUrl = 'YOUR_GHL_WEBHOOK_URL_HERE'
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          moveDate: '',
          package: '2bed',
          message: '',
          agreeTerms: false,
          agreeSMS: false,
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-cool-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy mb-6">
              Ready to Book Your Totes?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Fill out the form and we'll get back to you within 24 hours to confirm your rental and delivery details.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-orange p-3 rounded-lg flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Phone</h3>
                  <a href="tel:+14195551234" className="text-gray-600 hover:text-orange transition-colors">
                    (419) 555-1234
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange p-3 rounded-lg flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Email</h3>
                  <a href="mailto:info@bintheretotes.com" className="text-gray-600 hover:text-orange transition-colors">
                    info@bintheretotes.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange p-3 rounded-lg flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Service Area</h3>
                  <p className="text-gray-600">
                    Lima, OH and surrounding areas
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-navy p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-orange" />
                </div>
                <div>
                  <div className="font-semibold text-navy">Quick Response</div>
                  <div className="text-sm text-gray-600">We respond within 24 hours</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-navy p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-orange" />
                </div>
                <div>
                  <div className="font-semibold text-navy">Local Service</div>
                  <div className="text-sm text-gray-600">Veteran-owned Lima business</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                  placeholder="(419) 555-1234"
                />
              </div>

              {/* Move Date */}
              <div>
                <label htmlFor="moveDate" className="block text-sm font-semibold text-navy mb-2">
                  Preferred Delivery Date *
                </label>
                <input
                  type="date"
                  id="moveDate"
                  name="moveDate"
                  value={formData.moveDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Package Selection */}
              <div>
                <label htmlFor="package" className="block text-sm font-semibold text-navy mb-2">
                  Package *
                </label>
                <select
                  id="package"
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                >
                  <option value="1bed">1-Bedroom (15 bins) - $149</option>
                  <option value="2bed">2-Bedroom (25 bins) - $229</option>
                  <option value="3bed">3-Bedroom (40 bins) - $329</option>
                  <option value="custom">Custom Package</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">
                  Additional Details (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Any special requests or questions?"
                />
              </div>

              {/* Checkbox 1: Terms & Privacy (Required) */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 h-5 w-5 text-orange focus:ring-orange border-gray-300 rounded"
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="/terms" className="text-orange hover:underline font-semibold">
                    Terms
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-orange hover:underline font-semibold">
                    Privacy Policy
                  </a>{' '}
                  <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Checkbox 2: SMS Consent (Optional) */}
              <div className="flex items-start space-x-3 bg-orange/5 p-4 rounded-lg border border-orange/20">
                <input
                  type="checkbox"
                  id="agreeSMS"
                  name="agreeSMS"
                  checked={formData.agreeSMS}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 text-orange focus:ring-orange border-gray-300 rounded"
                />
                <label htmlFor="agreeSMS" className="text-sm text-gray-700">
                  By providing your phone number, you agree to receive text messages from Bin There Totes 
                  regarding your inquiry. Message and data rates may apply. Reply STOP to cancel.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Booking Request</span>
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                  <p className="font-semibold">Success!</p>
                  <p className="text-sm">We've received your booking request and will contact you within 24 hours.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  <p className="font-semibold">Oops!</p>
                  <p className="text-sm">Something went wrong. Please try again or call us at (419) 555-1234.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
