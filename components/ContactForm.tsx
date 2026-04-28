'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Calendar, MessageSquare } from 'lucide-react'

type FormPath = 'reservation' | 'inquiry'

interface ReservationFormData {
  fullName: string
  email: string
  phone: string
  zipCode: string
  package: string
  dropOffDate: string
  pickUpDate: string
  agreeTerms: boolean
  agreeSMS: boolean
}

interface InquiryFormData {
  fullName: string
  email: string
  phone: string
  zipCode: string
  questions: string
  agreeTerms: boolean
  agreeSMS: boolean
}

export default function ContactForm() {
  const [activePath, setActivePath] = useState<FormPath>('reservation')
  
  // Reservation form state
  const [reservationData, setReservationData] = useState<ReservationFormData>({
    fullName: '',
    email: '',
    phone: '',
    zipCode: '',
    package: '2bed',
    dropOffDate: '',
    pickUpDate: '',
    agreeTerms: false,
    agreeSMS: false,
  })

  // Inquiry form state
  const [inquiryData, setInquiryData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    zipCode: '',
    questions: '',
    agreeTerms: false,
    agreeSMS: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Handle reservation form changes
  const handleReservationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setReservationData(prev => ({ ...prev, [name]: checked }))
    } else {
      setReservationData(prev => ({ ...prev, [name]: value }))
    }
  }

  // Handle inquiry form changes
  const handleInquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setInquiryData(prev => ({ ...prev, [name]: checked }))
    } else {
      setInquiryData(prev => ({ ...prev, [name]: value }))
    }
  }

  // Submit reservation form
  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!reservationData.agreeTerms) {
      alert('Please agree to the Terms and Privacy Policy to continue.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID_HERE'
      
      const payload = {
        lead_type: 'reservation',
        full_name: reservationData.fullName,
        email: reservationData.email,
        phone: reservationData.phone,
        zip_code: reservationData.zipCode,
        package: reservationData.package,
        drop_off_date: reservationData.dropOffDate,
        pick_up_date: reservationData.pickUpDate,
        agreed_to_terms: reservationData.agreeTerms,
        agreed_to_sms: reservationData.agreeSMS,
        submitted_at: new Date().toISOString(),
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setReservationData({
          fullName: '',
          email: '',
          phone: '',
          zipCode: '',
          package: '2bed',
          dropOffDate: '',
          pickUpDate: '',
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

  // Submit inquiry form
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inquiryData.agreeTerms) {
      alert('Please agree to the Terms and Privacy Policy to continue.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID_HERE'
      
      const payload = {
        lead_type: 'inquiry',
        full_name: inquiryData.fullName,
        email: inquiryData.email,
        phone: inquiryData.phone,
        zip_code: inquiryData.zipCode,
        questions: inquiryData.questions,
        agreed_to_terms: inquiryData.agreeTerms,
        agreed_to_sms: inquiryData.agreeSMS,
        submitted_at: new Date().toISOString(),
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setInquiryData({
          fullName: '',
          email: '',
          phone: '',
          zipCode: '',
          questions: '',
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
              Ready to Join the "Done That" Club?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose your path below. Reserve your dates now or get a custom quote. 
              We'll respond within 24 hours for Lima and Allen County.
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
                    Lima, OH and all of Allen County
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

          {/* Right: Form with Path Toggle */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Path Toggle Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActivePath('reservation')}
                className={`flex-1 px-6 py-4 font-semibold text-center transition-all ${
                  activePath === 'reservation'
                    ? 'bg-navy text-white border-b-4 border-orange'
                    : 'bg-cool-50 text-gray-600 hover:bg-cool-100'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Reserve My Dates</span>
                </div>
                <div className="text-xs mt-1 opacity-80">Ready Now</div>
              </button>
              <button
                onClick={() => setActivePath('inquiry')}
                className={`flex-1 px-6 py-4 font-semibold text-center transition-all ${
                  activePath === 'inquiry'
                    ? 'bg-navy text-white border-b-4 border-orange'
                    : 'bg-cool-50 text-gray-600 hover:bg-cool-100'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Get Custom Quote</span>
                </div>
                <div className="text-xs mt-1 opacity-80">Just Curious</div>
              </button>
            </div>

            <div className="p-8">
              {/* Path A: Reservation Form */}
              {activePath === 'reservation' && (
                <form onSubmit={handleReservationSubmit} className="space-y-6">
                  <div className="bg-orange/10 border-l-4 border-orange p-4 mb-6">
                    <p className="text-sm text-gray-900 font-semibold">
                      Ready to lock in your move? Reserve your dates and bins now!
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="res-fullName" className="block text-sm font-semibold text-navy mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="res-fullName"
                      name="fullName"
                      value={reservationData.fullName}
                      onChange={handleReservationChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="res-email" className="block text-sm font-semibold text-navy mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="res-email"
                      name="email"
                      value={reservationData.email}
                      onChange={handleReservationChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Mobile Phone */}
                  <div>
                    <label htmlFor="res-phone" className="block text-sm font-semibold text-navy mb-2">
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      id="res-phone"
                      name="phone"
                      value={reservationData.phone}
                      onChange={handleReservationChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="(419) 555-1234"
                    />
                  </div>

                  {/* Service Zip Code */}
                  <div>
                    <label htmlFor="res-zipCode" className="block text-sm font-semibold text-navy mb-2">
                      Service Zip Code *
                    </label>
                    <input
                      type="text"
                      id="res-zipCode"
                      name="zipCode"
                      value={reservationData.zipCode}
                      onChange={handleReservationChange}
                      required
                      pattern="[0-9]{5}"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="45801"
                    />
                    <p className="text-xs text-gray-500 mt-1">We serve Lima and all of Allen County</p>
                  </div>

                  {/* Package Selection */}
                  <div>
                    <label htmlFor="res-package" className="block text-sm font-semibold text-navy mb-2">
                      Selected Package *
                    </label>
                    <select
                      id="res-package"
                      name="package"
                      value={reservationData.package}
                      onChange={handleReservationChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                    >
                      <option value="1bed">1-Bedroom (15 bins) - $149</option>
                      <option value="2bed">2-Bedroom (25 bins) - $229</option>
                      <option value="3bed">3-Bedroom (40 bins) - $329</option>
                      <option value="custom">Custom Package - Let's Discuss</option>
                    </select>
                  </div>

                  {/* Drop-off Date */}
                  <div>
                    <label htmlFor="res-dropOffDate" className="block text-sm font-semibold text-navy mb-2">
                      Drop-off Date *
                    </label>
                    <input
                      type="date"
                      id="res-dropOffDate"
                      name="dropOffDate"
                      value={reservationData.dropOffDate}
                      onChange={handleReservationChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Pick-up Date */}
                  <div>
                    <label htmlFor="res-pickUpDate" className="block text-sm font-semibold text-navy mb-2">
                      Pick-up Date *
                    </label>
                    <input
                      type="date"
                      id="res-pickUpDate"
                      name="pickUpDate"
                      value={reservationData.pickUpDate}
                      onChange={handleReservationChange}
                      required
                      min={reservationData.dropOffDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">Standard rental is 2 weeks, extensions available</p>
                  </div>

                  {/* A2P Compliance Checkboxes */}
                  {/* Checkbox 1: Terms & Privacy (Required) */}
                  <div className="flex items-start space-x-3 p-4 bg-cool-50 rounded-lg border-2 border-navy/20">
                    <input
                      type="checkbox"
                      id="res-agreeTerms"
                      name="agreeTerms"
                      checked={reservationData.agreeTerms}
                      onChange={handleReservationChange}
                      required
                      className="mt-1 h-5 w-5 text-orange focus:ring-orange border-gray-300 rounded"
                    />
                    <label htmlFor="res-agreeTerms" className="text-sm text-gray-900 font-medium">
                      <span className="text-red-600 font-bold">* REQUIRED:</span> I agree to the{' '}
                      <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline font-semibold">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline font-semibold">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Checkbox 2: SMS Consent (Optional but prominent) */}
                  <div className="flex items-start space-x-3 bg-orange/10 p-5 rounded-lg border-2 border-orange/30">
                    <input
                      type="checkbox"
                      id="res-agreeSMS"
                      name="agreeSMS"
                      checked={reservationData.agreeSMS}
                      onChange={handleReservationChange}
                      className="mt-1 h-5 w-5 text-orange focus:ring-orange border-orange/50 rounded"
                    />
                    <label htmlFor="res-agreeSMS" className="text-sm text-gray-900">
                      <span className="font-semibold text-navy block mb-1">SMS/Text Message Consent (Optional)</span>
                      By providing your phone number, you agree to receive text messages from Bin There Totes 
                      regarding your inquiry, delivery confirmations, and pickup scheduling. Message and data rates may apply. 
                      Message frequency varies. Reply STOP to cancel at any time. Reply HELP for assistance.
                      <span className="block mt-2 text-xs text-gray-700 italic">
                        Your mobile information will not be shared with third parties for marketing purposes.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span>Reserving...</span>
                    ) : (
                      <>
                        <Calendar className="h-5 w-5" />
                        <span>Reserve My Dates</span>
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                      <p className="font-semibold">Reservation Received!</p>
                      <p className="text-sm">We've received your reservation request and will confirm your dates within 24 hours.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                      <p className="font-semibold">Oops!</p>
                      <p className="text-sm">Something went wrong. Please try again or call us at (419) 555-1234.</p>
                    </div>
                  )}
                </form>
              )}

              {/* Path B: Inquiry Form */}
              {activePath === 'inquiry' && (
                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  <div className="bg-navy/5 border-l-4 border-navy p-4 mb-6">
                    <p className="text-sm text-gray-900 font-semibold">
                      Not sure what you need? We'll create a custom quote just for you!
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="inq-fullName" className="block text-sm font-semibold text-navy mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="inq-fullName"
                      name="fullName"
                      value={inquiryData.fullName}
                      onChange={handleInquiryChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="inq-email" className="block text-sm font-semibold text-navy mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="inq-email"
                      name="email"
                      value={inquiryData.email}
                      onChange={handleInquiryChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Mobile Phone */}
                  <div>
                    <label htmlFor="inq-phone" className="block text-sm font-semibold text-navy mb-2">
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      id="inq-phone"
                      name="phone"
                      value={inquiryData.phone}
                      onChange={handleInquiryChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="(419) 555-1234"
                    />
                  </div>

                  {/* Service Zip Code */}
                  <div>
                    <label htmlFor="inq-zipCode" className="block text-sm font-semibold text-navy mb-2">
                      Service Zip Code *
                    </label>
                    <input
                      type="text"
                      id="inq-zipCode"
                      name="zipCode"
                      value={inquiryData.zipCode}
                      onChange={handleInquiryChange}
                      required
                      pattern="[0-9]{5}"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="45801"
                    />
                    <p className="text-xs text-gray-500 mt-1">We serve Lima and all of Allen County</p>
                  </div>

                  {/* Questions/Details */}
                  <div>
                    <label htmlFor="inq-questions" className="block text-sm font-semibold text-navy mb-2">
                      Questions/Details *
                    </label>
                    <textarea
                      id="inq-questions"
                      name="questions"
                      value={inquiryData.questions}
                      onChange={handleInquiryChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us about your move... How many rooms? Any special requirements? When are you planning to move?"
                    />
                  </div>

                  {/* A2P Compliance Checkboxes */}
                  {/* Checkbox 1: Terms & Privacy (Required) */}
                  <div className="flex items-start space-x-3 p-4 bg-cool-50 rounded-lg border-2 border-navy/20">
                    <input
                      type="checkbox"
                      id="inq-agreeTerms"
                      name="agreeTerms"
                      checked={inquiryData.agreeTerms}
                      onChange={handleInquiryChange}
                      required
                      className="mt-1 h-5 w-5 text-orange focus:ring-orange border-gray-300 rounded"
                    />
                    <label htmlFor="inq-agreeTerms" className="text-sm text-gray-900 font-medium">
                      <span className="text-red-600 font-bold">* REQUIRED:</span> I agree to the{' '}
                      <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline font-semibold">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline font-semibold">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Checkbox 2: SMS Consent (Optional but prominent) */}
                  <div className="flex items-start space-x-3 bg-orange/10 p-5 rounded-lg border-2 border-orange/30">
                    <input
                      type="checkbox"
                      id="inq-agreeSMS"
                      name="agreeSMS"
                      checked={inquiryData.agreeSMS}
                      onChange={handleInquiryChange}
                      className="mt-1 h-5 w-5 text-orange focus:ring-orange border-orange/50 rounded"
                    />
                    <label htmlFor="inq-agreeSMS" className="text-sm text-gray-900">
                      <span className="font-semibold text-navy block mb-1">SMS/Text Message Consent (Optional)</span>
                      By providing your phone number, you agree to receive text messages from Bin There Totes 
                      regarding your inquiry, delivery confirmations, and pickup scheduling. Message and data rates may apply. 
                      Message frequency varies. Reply STOP to cancel at any time. Reply HELP for assistance.
                      <span className="block mt-2 text-xs text-gray-700 italic">
                        Your mobile information will not be shared with third parties for marketing purposes.
                      </span>
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
                        <Send className="h-5 w-5" />
                        <span>Get a Custom Quote</span>
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                      <p className="font-semibold">Inquiry Received!</p>
                      <p className="text-sm">We've received your custom quote request and will respond within 24 hours.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                      <p className="font-semibold">Oops!</p>
                      <p className="text-sm">Something went wrong. Please try again or call us at (419) 555-1234.</p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
