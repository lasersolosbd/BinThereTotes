'use client'

import { useState } from 'react'
import { Phone, Calendar, MessageSquare, Send, CheckCircle, Bot, Mic, Keyboard, MapPin, Mail } from 'lucide-react'

type ViewState = 'request' | 'ai' | 'quote'

interface RequestFormData {
  fullName: string
  email: string
  phone: string
  currentAddress: string
  currentZip: string
  movingToAddress: string
  movingToZip: string
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
  const [activeView, setActiveView] = useState<ViewState>('request')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Form 1: Request to Book (Now with Address Fields)
  const [requestData, setRequestData] = useState<RequestFormData>({
    fullName: '', email: '', phone: '', currentAddress: '', currentZip: '', movingToAddress: '', movingToZip: '', package: '3bed', dropOffDate: '', pickUpDate: '', agreeSMS: false, agreeVoice: false
  })

  // Form 2: Custom Quote
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

  // Helper to change views and reset success/error messages
  const changeView = (view: ViewState) => {
    setActiveView(view)
    setSubmitStatus('idle')
  }

  return (
    <section id="contact" className="py-20 bg-cool-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-4">
            <h2 className="text-4xl font-display font-bold text-navy mb-6">
              Ready to Join the "Done That" Club?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Select an option to reserve your bins, speak with our AI, or get a custom quote.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-orange p-3 rounded-lg flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Phone</h3>
                  <a href="tel:+15678251714" className="text-gray-600 hover:text-orange transition-colors">(567) 825-1714</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-orange p-3 rounded-lg flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Email</h3>
                  <a href="mailto:info@bintheretotes.com" className="text-gray-600 hover:text-orange transition-colors">info@bintheretotes.com</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-orange p-3 rounded-lg flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Service Area</h3>
                  <p className="text-gray-600">Lima, OH and all of Allen County</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The "Command Center" Form Box */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-10">
            
            {/* TOP NAVIGATION MINI-BOXES */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
              <button 
                onClick={() => changeView('request')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center text-center transition-all ${activeView === 'request' ? 'border-orange bg-orange/5' : 'border-gray-100 hover:border-orange/40 bg-white'}`}
              >
                <Calendar className={`h-6 w-6 mb-2 ${activeView === 'request' ? 'text-orange' : 'text-gray-400'}`} />
                <span className={`text-xs md:text-sm font-bold uppercase tracking-wider ${activeView === 'request' ? 'text-navy' : 'text-gray-500'}`}>Reserve</span>
              </button>
              
              <button 
                onClick={() => changeView('ai')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center text-center transition-all ${activeView === 'ai' ? 'border-orange bg-orange/5' : 'border-gray-100 hover:border-orange/40 bg-white'}`}
              >
                <Bot className={`h-6 w-6 mb-2 ${activeView === 'ai' ? 'text-orange' : 'text-gray-400'}`} />
                <span className={`text-xs md:text-sm font-bold uppercase tracking-wider ${activeView === 'ai' ? 'text-navy' : 'text-gray-500'}`}>Ask AI</span>
              </button>

              <button 
                onClick={() => changeView('quote')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center text-center transition-all ${activeView === 'quote' ? 'border-orange bg-orange/5' : 'border-gray-100 hover:border-orange/40 bg-white'}`}
              >
                <MessageSquare className={`h-6 w-6 mb-2 ${activeView === 'quote' ? 'text-orange' : 'text-gray-400'}`} />
                <span className={`text-xs md:text-sm font-bold uppercase tracking-wider ${activeView === 'quote' ? 'text-navy' : 'text-gray-500'}`}>Custom</span>
              </button>
            </div>

            {/* STATUS MESSAGES */}
            {submitStatus === 'success' && (
              <div className="text-center py-10 animate-fade-in">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-navy mb-2">Received!</h3>
                <p className="text-gray-600">We have your details and will be in touch shortly to confirm.</p>
                <button onClick={() => setSubmitStatus('idle')} className="mt-6 text-orange font-semibold hover:underline">Submit another request</button>
              </div>
            )}

            {/* TAB 1: REQUEST TO BOOK */}
            {activeView === 'request' && submitStatus !== 'success' && (
              <form onSubmit={handleRequestSubmit} className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Full Name *</label>
                    <input type="text" name="fullName" value={requestData.fullName} onChange={handleRequestChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Phone *</label>
                    <input type="tel" name="phone" value={requestData.phone} onChange={handleRequestChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-1">Email *</label>
                  <input type="email" name="email" value={requestData.email} onChange={handleRequestChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                </div>

                {/* New Address Fields for Booking */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">Location Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Current Address *</label>
                      <input type="text" name="currentAddress" value={requestData.currentAddress} onChange={handleRequestChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Current Zip *</label>
                      <input type="text" name="currentZip" value={requestData.currentZip} onChange={handleRequestChange} required pattern="[0-9]{5}" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Moving To Address <span className="text-gray-400 font-normal">(Optional)</span></label>
                      <input type="text" name="movingToAddress" value={requestData.movingToAddress} onChange={handleRequestChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Moving To Zip *</label>
                      <input type="text" name="movingToZip" value={requestData.movingToZip} onChange={handleRequestChange} required pattern="[0-9]{5}" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">Rental Details</h4>
                  <label className="block text-sm font-semibold text-navy mb-1">Select Package *</label>
                  <select name="package" value={requestData.package} onChange={handleRequestChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none mb-4">
                    <option value="studio">Studio / 1-Bed House (15 Bins)</option>
                    <option value="2bed">2-Bedroom House (35 Bins)</option>
                    <option value="3bed">3-Bedroom House (50 Bins)</option>
                    <option value="4-5bed">4-5 Bedroom House (75 Bins)</option>
                    <option value="larger">Larger House - Let's Discuss</option>
                  </select>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">Drop-off Date *</label>
                      <input type="date" name="dropOffDate" value={requestData.dropOffDate} onChange={handleRequestChange} required min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">Pick-up Date *</label>
                      <input type="date" name="pickUpDate" value={requestData.pickUpDate} onChange={handleRequestChange} required min={requestData.dropOffDate || new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                    </div>
                  </div>
                </div>

                {/* A2P Checkboxes */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start space-x-3 bg-navy/5 p-4 rounded-lg border border-navy/10">
                    <input type="checkbox" id="req-agreeSMS" name="agreeSMS" checked={requestData.agreeSMS} onChange={handleRequestChange} required className="mt-1 h-5 w-5 text-orange focus:ring-orange rounded" />
                    <label htmlFor="req-agreeSMS" className="text-xs text-gray-800">By providing your phone number, you consent to receive marketing text messages from Bin There Totes. Consent is not a condition of purchase. Message & data rates may apply. Reply STOP to opt out.</label>
                  </div>
                  <div className="flex items-start space-x-3 bg-navy/5 p-4 rounded-lg border border-navy/10">
                    <input type="checkbox" id="req-agreeVoice" name="agreeVoice" checked={requestData.agreeVoice} onChange={handleRequestChange} className="mt-1 h-5 w-5 text-navy focus:ring-navy rounded" />
                    <label htmlFor="req-agreeVoice" className="text-xs text-gray-800"><span className="font-bold text-navy block">AI Voice & Automated Calls (Optional)</span>I consent to receive phone calls from Bin There Totes, which may include automated, pre-recorded, or AI voice assistant communications. I understand I can opt out of future calls by requesting to be placed on the do-not-call list.</label>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-orange text-white py-4 rounded-lg font-bold hover:bg-orange/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
                  {isSubmitting ? <span>Checking...</span> : <><Calendar className="h-5 w-5" /><span>Submit Request</span></>}
                </button>
              </form>
            )}

            {/* TAB 2: AI ASSISTANT */}
            {activeView === 'ai' && (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-24 h-24 bg-navy rounded-full mx-auto flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full animate-ping bg-navy/20"></div>
                  <Bot className="h-12 w-12 text-orange relative z-10" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">Hello! I'm your virtual assistant.</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  I can answer questions about bin sizes, delivery areas, pricing, and availability. How would you like to connect?
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto">
                  <button 
                    onClick={() => alert("This will trigger the WebRTC Voice connection.")}
                    className="flex-1 bg-navy text-white py-4 px-6 rounded-lg font-bold hover:bg-navy/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mic className="h-5 w-5" /> Talk
                  </button>
                  <button 
                    onClick={() => alert("This will pop open the GoHighLevel Chat Widget.")}
                    className="flex-1 border-2 border-navy text-navy py-4 px-6 rounded-lg font-bold hover:bg-navy/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <Keyboard className="h-5 w-5" /> Type
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: CUSTOM QUOTE */}
            {activeView === 'quote' && submitStatus !== 'success' && (
              <form onSubmit={handleQuoteSubmit} className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Full Name *</label>
                    <input type="text" name="fullName" value={quoteData.fullName} onChange={handleQuoteChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Phone *</label>
                    <input type="tel" name="phone" value={quoteData.phone} onChange={handleQuoteChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-1">Email *</label>
                  <input type="email" name="email" value={quoteData.email} onChange={handleQuoteChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">Location Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Current Address *</label>
                      <input type="text" name="currentAddress" value={quoteData.currentAddress} onChange={handleQuoteChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Current Zip *</label>
                      <input type="text" name="currentZip" value={quoteData.currentZip} onChange={handleQuoteChange} required pattern="[0-9]{5}" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Moving To Address <span className="text-gray-400 font-normal">(Optional)</span></label>
                      <input type="text" name="movingToAddress" value={quoteData.movingToAddress} onChange={handleQuoteChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Moving To Zip *</label>
                      <input type="text" name="movingToZip" value={quoteData.movingToZip} onChange={handleQuoteChange} required pattern="[0-9]{5}" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-semibold text-navy mb-1">Details & Questions *</label>
                  <textarea name="questions" value={quoteData.questions} onChange={handleQuoteChange} required rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none resize-none" placeholder="Tell us about your move. How many rooms? Any special requests?" />
                </div>

                {/* A2P Checkboxes */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start space-x-3 bg-navy/5 p-4 rounded-lg border border-navy/10">
                    <input type="checkbox" id="quote-agreeSMS" name="agreeSMS" checked={quoteData.agreeSMS} onChange={handleQuoteChange} required className="mt-1 h-5 w-5 text-orange focus:ring-orange rounded" />
                    <label htmlFor="quote-agreeSMS" className="text-xs text-gray-800">By providing your phone number, you consent to receive marketing text messages from Bin There Totes. Consent is not a condition of purchase. Message & data rates may apply. Reply STOP to opt out.</label>
                  </div>
                  <div className="flex items-start space-x-3 bg-navy/5 p-4 rounded-lg border border-navy/10">
                    <input type="checkbox" id="quote-agreeVoice" name="agreeVoice" checked={quoteData.agreeVoice} onChange={handleQuoteChange} className="mt-1 h-5 w-5 text-navy focus:ring-navy rounded" />
                    <label htmlFor="quote-agreeVoice" className="text-xs text-gray-800"><span className="font-bold text-navy block">AI Voice & Automated Calls (Optional)</span>I consent to receive phone calls from Bin There Totes, which may include automated, pre-recorded, or AI voice assistant communications. I understand I can opt out of future calls by requesting to be placed on the do-not-call list.</label>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-orange text-white py-4 rounded-lg font-bold hover:bg-orange/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
                  {isSubmitting ? <span>Sending...</span> : <><Send className="h-5 w-5" /><span>Get Custom Quote</span></>}
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
