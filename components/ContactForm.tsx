'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'

interface FormData {
  fullName: string
  email: string
  phone: string
  currentAddress: string
  currentZip: string
  movingToAddress: string
  movingToZip: string
  questions: string
  agreeSMS: boolean
  agreeVoice: boolean
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    currentAddress: '',
    currentZip: '',
    movingToAddress: '',
    movingToZip: '',
    questions: '',
    agreeSMS: false,
    agreeVoice: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    
    if (!formData.agreeSMS) {
      alert('You must consent to receive text messages to continue.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID_HERE'
      
      const payload = {
        lead_type: 'custom_quote',
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        current_address: formData.currentAddress,
        current_zip: formData.currentZip,
        moving_to_address: formData.movingToAddress,
        moving_to_zip: formData.movingToZip,
        questions: formData.questions,
        agreed_to_sms: formData.agreeSMS,
        agreed_to_voice: formData.agreeVoice,
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
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          currentAddress: '',
          currentZip: '',
          movingToAddress: '',
          movingToZip: '',
          questions: '',
          agreeSMS: false,
          agreeVoice: false,
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
              Fill out the form to get a custom quote. We'll respond within 24 hours for Lima and Allen County.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-orange p-3 rounded-lg flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Phone</h3>
                  <a href="tel:+15678251714" className="text-gray-600 hover:text-orange transition-colors">
                    (567) 825-1714
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

          {/* Right: Custom Quote Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
            <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-gray-100">
              <div className="bg-orange/10 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-orange" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-navy">Get a Custom Quote</h3>
                <p className="text-sm text-gray-500">Tell us about your move.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-navy uppercase tracking-wider">Contact Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="(567) 825-1714"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
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
              </div>

              {/* Move Details */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-bold text-navy uppercase tracking-wider">Moving Details</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="currentAddress" className="block text-sm font-semibold text-gray-700 mb-1">Current Street Address *</label>
                    <input
                      type="text"
                      id="currentAddress"
                      name="currentAddress"
                      value={formData.currentAddress}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="123 Main St"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="currentZip" className="block text-sm font-semibold text-gray-700 mb-1">Current Zip *</label>
                    <input
                      type="text"
                      id="currentZip"
                      name="currentZip"
                      value={formData.currentZip}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{5}"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="45801"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="movingToAddress" className="block text-sm font-semibold text-gray-700 mb-1">Moving To Address <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input
                      type="text"
                      id="movingToAddress"
                      name="movingToAddress"
                      value={formData.movingToAddress}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="456 New Home Ave"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="movingToZip" className="block text-sm font-semibold text-gray-700 mb-1">Moving To Zip *</label>
                    <input
                      type="text"
                      id="movingToZip"
                      name="movingToZip"
                      value={formData.movingToZip}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{5}"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                      placeholder="45804"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="questions" className="block text-sm font-semibold text-gray-700 mb-1">Details & Questions *</label>
                  <textarea
                    id="questions"
                    name="questions"
                    value={formData.questions}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your move. How many rooms? When are you planning to move? Any stairs or special requirements?"
                  />
                </div>
              </div>

              {/* TCPA Compliance Checkboxes */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                {/* Checkbox 1: SMS Consent (Required) */}
                <div className="flex items-start space-x-3 bg-navy/5 p-5 rounded-lg border-2 border-navy/20">
                  <input
                    type="checkbox"
                    id="agreeSMS"
                    name="agreeSMS"
                    checked={formData.agreeSMS}
                    onChange={handleChange}
                    required
                    className="mt-1 h-5 w-5 text-orange focus:ring-orange border-orange/50 rounded"
                  />
                  <label htmlFor="agreeSMS" className="text-sm text-gray-900">
                    By providing your phone number, you consent to receive marketing text messages from Bin There Totes. Consent is not a condition of purchase. Message & data rates may apply. Reply STOP to opt out.
                  </label>
                </div>

                {/* Checkbox 2: Voice/AI Consent (Optional but prominent) */}
                <div className="flex items-start space-x-3 bg-navy/5 p-5 rounded-lg border-2 border-navy/20">
                  <input
                    type="checkbox"
                    id="agreeVoice"
                    name="agreeVoice"
                    checked={formData.agreeVoice}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 text-navy focus:ring-navy border-gray-300 rounded"
                  />
                  <label htmlFor="agreeVoice" className="text-sm text-gray-900">
                    <span className="font-semibold text-navy block mb-1">AI Voice & Automated Calls (Optional)</span>
                    I consent to receive phone calls from Bin There Totes, which may include automated, pre-recorded, or AI voice assistant communications. I understand I can opt out of future calls by requesting to be placed on the do-not-call list.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed bg-orange text-white py-4 rounded-lg font-bold hover:bg-orange/90 transition-colors"
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
                  <p className="text-sm">Something went wrong. Please try again or call us at (567) 825-1714.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
