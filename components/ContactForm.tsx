'use client'

import { useState } from 'react'
import { Phone, Calendar, MessageSquare, ChevronLeft, ArrowRight, Send, CheckCircle } from 'lucide-react'

type ViewState = 'menu' | 'request' | 'quote'

interface RequestFormData {
  fullName: string
  email: string
  phone: string
  package: string
  dropOffDate: string
  pickUpDate: string
  agreeSMS: boolean
  agreeVoice: boolean
}

interface QuoteFormData {
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
  const [activeView, setActiveView] = useState<ViewState>('menu')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // State for Form 1: Request to Book
  const [requestData, setRequestData] = useState<RequestFormData>({
    fullName: '', email: '', phone: '', package: '3bed', dropOffDate: '', pickUpDate: '', agreeSMS: false, agreeVoice: false
  })

  // State for Form 2: Custom Quote
  const [quoteData, setQuoteData] = useState<QuoteFormData>({
    fullName: '', email: '', phone: '', currentAddress: '', currentZip: '', movingToAddress: '', movingToZip: '', questions: '', agreeSMS: false, agreeVoice: false
  })

  // Handlers
  const handleRequestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setRequestData(prev => ({ ...prev, [name]: checked }))
    } else {
      setRequestData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setQuoteData(prev => ({ ...prev, [name]: checked }))
    } else {
      setQuoteData(prev => ({ ...prev, [name]: value }))
    }
  }

  // Submissions
  const submitWebhook = async (payload: any) => {
    const webhookUrl = 'https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID_HERE'
    return fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, submitted_at: new Date().toISOString() })
    })
  }

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!requestData.agreeSMS) return alert('You must consent to receive text messages to continue.')
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const res = await submitWebhook({ lead_type: 'booking_request', ...requestData })
      if (res.ok) setSubmitStatus('success')
      else setSubmitStatus('error')
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quoteData.agreeSMS) return alert('You must consent to receive text messages to continue.')
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const res = await submitWebhook({ lead_type: 'custom_quote', ...quoteData })
      if (res.ok) setSubmitStatus('success')
      else setSubmitStatus('error')
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetView = () => {
    setActiveView('menu')
    setSubmitStatus('idle')
  }

  return (
    <section id="contact" className="py-20 bg-cool-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy mb-6">
            Ready to Join the "Done That" Club?
          </h2>
          <p className="text-xl text-gray-600">
            Choose how you'd like to proceed. Request your dates, speak to our AI assistant, or get a detailed custom quote.
          </p>
        </div>

        {/* Dynamic Content Area */}
        <div className="max-w-5xl mx-auto">
          
          {/* MENU VIEW */}
          {activeView === 'menu' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Option 1 */}
              <button onClick={() => setActiveView('request')} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-orange hover:-translate-y-1 transition-all group flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center mb-6 group-hover:bg-orange transition-colors">
                  <Calendar className="h-8 w-8 text-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Request to Book</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">Select your package and target dates. We will verify inventory and send your invoice instantly.</p>
                <span className="text-sm font-bold tracking-wider uppercase text-orange flex items-center gap-2">Check Dates <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
              </button>

              {/* Option 2 */}
              <button onClick={() => alert("WebRTC / Voice AI integration will trigger here.")} className="bg-navy p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-orange hover:-translate-y-1 transition-all group flex flex-col items-center text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full animate-ping bg-orange/30 opacity-75"></div>
                  <Phone className="h-8 w-8 text-orange relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Speak to AI Assistant</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">Have quick questions about sizing or delivery? Talk to our instant voice assistant right now.</p>
                <span className="text-sm font-bold tracking-wider uppercase text-orange flex items-center gap-2">Push to Talk <Phone size={14} className="group-hover:scale-110 transition-transform" /></span>
              </button>

              {/* Option 3 */}
              <button onClick={() => setActiveView('quote')} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-orange hover:-translate-y-1 transition-all group flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center mb-6 group-hover:bg-orange transition-colors">
                  <MessageSquare className="h-8 w-8 text-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Custom Quote</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">Have a complex move, multiple locations, or special requirements? Let's figure it out.</p>
                <span className="text-sm font-bold tracking-wider uppercase text-orange flex items-center gap-2">Get a Quote <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
              </button>

            </div>
          )}

          {/* REQUEST TO BOOK VIEW */}
          {activeView === 'request' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative animate-fade-in">
              <button onClick={resetView} className="absolute top-6 left-6 text-gray-500 hover:text-navy flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors">
                <ChevronLeft size={18} /> Back
              </button>

              {submitStatus === 'success' ? (
                <div className="text-center py-16">
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-navy mb-4">Request Received!</h3>
                  <p className="text-gray-600 text-lg">We are checking our inventory for your dates and will send your booking confirmation and invoice shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="max-w-2xl mx-auto mt-8 space-y-6">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold text-navy mb-2">Request Your Dates</h3>
                    <p className="text-gray-600">Submit your target dates and we'll check availability immediately.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Full Name *</label>
                      <input type="text" name="fullName" value={requestData.fullName} onChange={handleRequestChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Phone *</label>
                      <input type="tel" name="phone" value={requestData.phone} onChange={handleRequestChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Email *</label>
                    <input type="email" name="email" value={requestData.email} onChange={handleRequestChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Select Package *</label>
                    <select name="package" value={requestData.package} onChange={handleRequestChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none">
                      <option value="studio">Studio / 1-Bed House (15 Bins)</option>
                      <option value="2bed">2-Bedroom House (35 Bins)</option>
                      <option value="3bed">3-Bedroom House (50 Bins)</option>
                      <option value="4-5bed">4-5 Bedroom House (75 Bins)</option>
                      <option value="larger">Larger House - Let's Discuss</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Drop-off Date *</label>
                      <input type="date" name="dropOffDate" value={requestData.dropOffDate} onChange={handleRequestChange} required min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Pick-up Date *</label>
                      <input type="date" name="pickUpDate" value={requestData.pickUpDate} onChange={handleRequestChange} required min={requestData.dropOffDate || new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none" />
                    </div>
                  </div>

                  {/* A2P Checkboxes */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start space-x-3 bg-navy/5 p-5 rounded-lg border-2 border-navy/20">
                      <input type="checkbox" id="req-agreeSMS" name="agreeSMS" checked={requestData.agreeSMS} onChange={handleRequestChange} required className="mt-1 h-5 w-5 text-orange focus:ring-orange border-orange/50 rounded" />
                      <label htmlFor="req-agreeSMS" className="text-sm text-gray-900">
                        By providing your phone number, you consent to receive marketing text messages from Bin There Totes. Consent is not a condition of purchase. Message & data rates may apply. Reply STOP to opt out.
                      </label>
                    </div>
                    <div className="flex items-start space-x-3 bg-navy/5 p-5 rounded-lg border-2 border-navy/20">
                      <input type="checkbox" id="req-agreeVoice" name="agreeVoice" checked={requestData.agreeVoice} onChange={handleRequestChange} className="mt-1 h-5 w-5 text-navy focus:ring-navy border-gray-300 rounded" />
                      <label htmlFor="req-agreeVoice" className="text-sm text-gray-900">
                        <span className="font-semibold text-navy block mb-1">AI Voice & Automated Calls (Optional)</span>
                        I consent to receive phone calls from Bin There Totes, which may include automated, pre-recorded, or AI voice assistant communications. I understand I can opt out of future calls by requesting to be placed on the do-not-call list.
                      </label>
                    </div>
                  </div>

                  {submitStatus === 'error' && <p className="text-red-600 text-center font-semibold">Error submitting form. Please try again.</p>}

                  <button type="submit" disabled={isSubmitting} className="w-full btn-primary flex items-center justify-center space-x-2 bg-orange text-white py-4 rounded-lg font-bold hover:bg-orange/90 transition-colors disabled:opacity-50">
                    {isSubmitting ? <span>Checking...</span> : <><Calendar className="h-5 w-5" /><span>Submit Request</span></>}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* CUSTOM QUOTE VIEW */}
          {activeView === 'quote' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative animate-fade-in">
              <button onClick={resetView} className="absolute top-6 left-6 text-gray-500 hover:text-navy flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors">
                <ChevronLeft size={18} /> Back
              </button>

              {submitStatus === 'success' ? (
                <div className="text-center py-16">
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-navy mb-4">Inquiry Received!</h3>
                  <p className="text-gray-600 text-lg">We've received your details and will put together a custom quote for you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="max-w-3xl mx-auto mt-8 space-y-8">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold text-navy mb-2">Build Your Custom Quote</h3>
                    <p className="text-gray-600">Give us the details of your move so we can build the perfect package.</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-navy uppercase tracking-wider border-b pb-2">Contact Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                        <input type="text" name="fullName" value={quoteData.fullName} onChange={handleQuoteChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
                        <input type="tel" name="phone" value={quoteData.phone} onChange={handleQuoteChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                      <input type="email" name="email" value={quoteData.email} onChange={handleQuoteChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-navy uppercase tracking-wider border-b pb-2">Location Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Current Address *</label>
                        <input type="text" name="currentAddress" value={quoteData.currentAddress} onChange={handleQuoteChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none" />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Current Zip *</label>
                        <input type="text" name="currentZip" value={quoteData.currentZip} onChange={handleQuoteChange} required pattern="[0-9]{5}" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Moving To Address <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <input type="text" name="movingToAddress" value={quoteData.movingToAddress} onChange={handleQuoteChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none" />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Moving To Zip *</label>
                        <input type="text" name="movingToZip" value={quoteData.movingToZip} onChange={handleQuoteChange} required pattern="[0-9]{5}" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Details & Questions *</label>
                      <textarea name="questions" value={quoteData.questions} onChange={handleQuoteChange} required rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none resize-none" placeholder="Tell us about your move. How many rooms? When are you planning to move? Any stairs?" />
                    </div>
                  </div>

                  {/* A2P Checkboxes */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start space-x-3 bg-navy/5 p-5 rounded-lg border-2 border-navy/20">
                      <input type="checkbox" id="quote-agreeSMS" name="agreeSMS" checked={quoteData.agreeSMS} onChange={handleQuoteChange} required className="mt-1 h-5 w-5 text-orange focus:ring-orange border-orange/50 rounded" />
                      <label htmlFor="quote-agreeSMS" className="text-sm text-gray-900">
                        By providing your phone number, you consent to receive marketing text messages from Bin There Totes. Consent is not a condition of purchase. Message & data rates may apply. Reply STOP to opt out.
                      </label>
                    </div>
                    <div className="flex items-start space-x-3 bg-navy/5 p-5 rounded-lg border-2 border-navy/20">
                      <input type="checkbox" id="quote-agreeVoice" name="agreeVoice" checked={quoteData.agreeVoice} onChange={handleQuoteChange} className="mt-1 h-5 w-5 text-navy focus:ring-navy border-gray-300 rounded" />
                      <label htmlFor="quote-agreeVoice" className="text-sm text-gray-900">
                        <span className="font-semibold text-navy block mb-1">AI Voice & Automated Calls (Optional)</span>
                        I consent to receive phone calls from Bin There Totes, which may include automated, pre-recorded, or AI voice assistant communications. I understand I can opt out of future calls by requesting to be placed on the do-not-call list.
                      </label>
                    </div>
                  </div>

                  {submitStatus === 'error' && <p className="text-red-600 text-center font-semibold">Error submitting form. Please try again.</p>}

                  <button type="submit" disabled={isSubmitting} className="w-full btn-primary flex items-center justify-center space-x-2 bg-orange text-white py-4 rounded-lg font-bold hover:bg-orange/90 transition-colors disabled:opacity-50">
                    {isSubmitting ? <span>Sending...</span> : <><Send className="h-5 w-5" /><span>Get Custom Quote</span></>}
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
