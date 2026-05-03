'use client'
import Link from 'next/link'

import { useState } from 'react'
import { Phone, Calendar, MessageSquare, Send, CheckCircle, Bot, Mic, Keyboard, MapPin, Mail } from 'lucide-react'

type ViewState = 'request' | 'ai' | 'quote'

interface RequestFormData {
  firstName: string
  lastName: string
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
  firstName: string
  lastName: string
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
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [requestData, setRequestData] = useState<RequestFormData>({
    firstName: '', lastName: '', email: '', phone: '', currentAddress: '', currentZip: '', movingToAddress: '', movingToZip: '', package: '3bed', dropOffDate: '', pickUpDate: '', agreeSMS: false, agreeVoice: false
  })

  const [quoteData, setQuoteData] = useState<QuoteFormData>({
    firstName: '', lastName: '', email: '', phone: '', currentAddress: '', currentZip: '', movingToAddress: '', movingToZip: '', questions: '', agreeSMS: false, agreeVoice: false
  })


  const [aiData, setAiData] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [aiSubmitted, setAiSubmitted] = useState(false)

  const handleAiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    setAiData(prev => ({ ...prev, [name]: value }))
  }

  const validateAi = () => {
    const e: Record<string, string> = {}
    if (!aiData.firstName.trim()) e.firstName = "Please fill this out."
    if (!aiData.lastName.trim()) e.lastName = "Please fill this out."
    if (!aiData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aiData.email)) e.email = "Please enter a valid email."
    if (aiData.phone.replace(/\D/g, '').length < 10) e.phone = "Please enter a valid 10-digit phone number."
    return e
  }

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateAi()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsSubmitting(true)
    try {
      const res = await submitWebhook({ lead_type: 'ai_chat', form_type: 'ask_ai', ...aiData })
      if (res.ok) {
        setAiSubmitted(true)
        if (typeof window !== 'undefined') {
          const trigger = document.querySelector('[data-chat-widget-trigger]') as HTMLElement | null
          if (trigger) trigger.click()
          else if ((window as any).openChatWidget) (window as any).openChatWidget(aiData.firstName)
          else if ((window as any).LeadConnector?.ChatWidget?.openWidget) (window as any).LeadConnector.ChatWidget.openWidget()
        }
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper to calculate exactly 14 days later
  const getMinPickUpDate = (dropDateString: string) => {
    if (!dropDateString) return new Date().toISOString().split('T')[0]
    const dropDate = new Date(dropDateString + 'T12:00:00')
    dropDate.setDate(dropDate.getDate() + 14)
    return dropDate.toISOString().split('T')[0]
  }

  // Validation Logic
  const validateRequest = () => {
    const e: Record<string, string> = {}
    if (!requestData.firstName.trim()) e.firstName = "Please fill this out."
    if (!requestData.lastName.trim()) e.lastName = "Please fill this out."
    if (!requestData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requestData.email)) e.email = "Please enter a valid email."
    if (requestData.phone.replace(/\D/g, '').length < 10) e.phone = "Please enter a valid 10-digit phone number."
    if (!requestData.currentAddress.trim()) e.currentAddress = "Please fill this out."
    if (!/^\d{5}$/.test(requestData.currentZip)) e.currentZip = "Please enter a valid 5-digit zip."
    if (!/^\d{5}$/.test(requestData.movingToZip)) e.movingToZip = "Please enter a valid 5-digit zip."
    if (!requestData.dropOffDate) e.dropOffDate = "Please select a date."
    if (!requestData.pickUpDate) e.pickUpDate = "Please select a date."
    return e
  }

  const validateQuote = () => {
    const e: Record<string, string> = {}
    if (!quoteData.firstName.trim()) e.firstName = "Please fill this out."
    if (!quoteData.lastName.trim()) e.lastName = "Please fill this out."
    if (!quoteData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quoteData.email)) e.email = "Please enter a valid email."
    if (quoteData.phone.replace(/\D/g, '').length < 10) e.phone = "Please enter a valid 10-digit phone number."
    if (!quoteData.currentAddress.trim()) e.currentAddress = "Please fill this out."
    if (!/^\d{5}$/.test(quoteData.currentZip)) e.currentZip = "Please enter a valid 5-digit zip."
    if (!/^\d{5}$/.test(quoteData.movingToZip)) e.movingToZip = "Please enter a valid 5-digit zip."
    if (!quoteData.questions.trim()) e.questions = "Please provide details about your move."
    return e
  }

  // Handlers
  const handleRequestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    // Clear error immediately when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setRequestData(prev => ({ ...prev, [name]: checked }))
    } else {
      if (name === 'dropOffDate') {
        const autoPickUp = getMinPickUpDate(value)
        setRequestData(prev => ({ ...prev, dropOffDate: value, pickUpDate: autoPickUp }))
      } else {
        setRequestData(prev => ({ ...prev, [name]: value }))
      }
    }
  }

  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    // Clear error immediately when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setQuoteData(prev => ({ ...prev, [name]: checked }))
    } else {
      setQuoteData(prev => ({ ...prev, [name]: value }))
    }
  }

  const submitWebhook = async (payload: any) => {
    // REMINDER: Make sure your real GHL Webhook URL is pasted here!
    const webhookUrl = 'https://services.leadconnectorhq.com/hooks/nQv4T6cT4sx1HYZZVpsn/webhook-trigger/ddcc6997-7fad-4cee-b2de-653cd224e260'
    return fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, submitted_at: new Date().toISOString() })
    })
  }

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateRequest()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return // Stop submission if there are errors
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const res = await submitWebhook({ lead_type: 'booking_request', form_type: 'reserve', ...requestData })
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
    const validationErrors = validateQuote()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return // Stop submission if there are errors
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const res = await submitWebhook({ lead_type: 'custom_quote', form_type: 'custom', ...quoteData })
      if (res.ok) setSubmitStatus('success')
      else setSubmitStatus('error')
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const changeView = (view: ViewState) => {
    setActiveView(view)
    setSubmitStatus('idle')
    setErrors({}) // Clear errors when switching tabs
  }

  // Dynamic styling helper for inputs
  const getInputClass = (fieldName: string) => {
    return `w-full px-4 py-3 border rounded-lg outline-none transition-all ${
      errors[fieldName] 
        ? 'border-red-500 focus:ring-2 focus:ring-red-500 bg-red-50' 
        : 'border-gray-300 focus:ring-2 focus:ring-orange'
    }`
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
                <p className="text-gray-600">We have your details and will be in touch shortly.</p>
                <button onClick={() => setSubmitStatus('idle')} className="mt-6 text-orange font-semibold hover:underline">Submit another request</button>
              </div>
            )}

            {/* TAB 1: REQUEST TO BOOK */}
            {activeView === 'request' && submitStatus !== 'success' && (
              <form onSubmit={handleRequestSubmit} noValidate className="space-y-6 animate-fade-in">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">First Name *</label>
                    <input type="text" name="firstName" value={requestData.firstName} onChange={handleRequestChange} className={getInputClass('firstName')} />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Last Name *</label>
                    <input type="text" name="lastName" value={requestData.lastName} onChange={handleRequestChange} className={getInputClass('lastName')} />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Email *</label>
                    <input type="email" name="email" value={requestData.email} onChange={handleRequestChange} className={getInputClass('email')} />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Phone (10 digits) *</label>
                    <input type="tel" name="phone" value={requestData.phone} onChange={handleRequestChange} maxLength={14} placeholder="5678251714" className={getInputClass('phone')} />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">Location Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Current Address *</label>
                      <input type="text" name="currentAddress" value={requestData.currentAddress} onChange={handleRequestChange} className={getInputClass('currentAddress')} />
                      {errors.currentAddress && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.currentAddress}</p>}
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Current Zip *</label>
                      <input type="text" name="currentZip" value={requestData.currentZip} onChange={handleRequestChange} placeholder="45801" className={getInputClass('currentZip')} />
                      {errors.currentZip && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.currentZip}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Moving To Address <span className="text-gray-400 font-normal">(Optional)</span></label>
                      <input type="text" name="movingToAddress" value={requestData.movingToAddress} onChange={handleRequestChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Moving To Zip *</label>
                      <input type="text" name="movingToZip" value={requestData.movingToZip} onChange={handleRequestChange} placeholder="45801" className={getInputClass('movingToZip')} />
                      {errors.movingToZip && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.movingToZip}</p>}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">Rental Details</h4>
                  <label className="block text-sm font-semibold text-navy mb-1">Select Package *</label>
                  <select name="package" value={requestData.package} onChange={handleRequestChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none mb-4">
                    <option value="studio">Studio / 1-Bed House (15 Bins)</option>
                    <option value="2bed">2-Bedroom House (35 Bins)</option>
                    <option value="3bed">3-Bedroom House (50 Bins)</option>
                    <option value="4-5bed">4-5 Bedroom House (75 Bins)</option>
                    <option value="larger">Larger House - Let's Discuss</option>
                  </select>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">Drop-off Date *</label>
                      <input type="date" name="dropOffDate" value={requestData.dropOffDate} onChange={handleRequestChange} min={new Date().toISOString().split('T')[0]} className={getInputClass('dropOffDate')} />
                      {errors.dropOffDate && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.dropOffDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">Pick-up Date (Min. 14 Days) *</label>
                      <input type="date" name="pickUpDate" value={requestData.pickUpDate} onChange={handleRequestChange} min={requestData.dropOffDate ? getMinPickUpDate(requestData.dropOffDate) : new Date().toISOString().split('T')[0]} className={getInputClass('pickUpDate')} />
                      {errors.pickUpDate && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.pickUpDate}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start space-x-3 bg-navy/5 p-4 rounded-lg border border-navy/10">
                    <input type="checkbox" id="req-agreeSMS" name="agreeSMS" checked={requestData.agreeSMS} onChange={handleRequestChange} className="mt-1 h-5 w-5 text-orange focus:ring-orange rounded" />
                    <label htmlFor="req-agreeSMS" className="text-xs text-gray-800">By providing your phone number, you consent to receive marketing text messages from Bin There Totes. Consent is not a condition of purchase. Message & data rates may apply. Reply STOP to opt out. See our{' '}<Link href="/privacy" target="_blank" className="underline text-orange-600 hover:text-orange-800">Privacy Policy</Link>.</label>
                  </div>
                  <div className="flex items-start space-x-3 bg-navy/5 p-4 rounded-lg border border-navy/10">
                    <input type="checkbox" id="req-agreeVoice" name="agreeVoice" checked={requestData.agreeVoice} onChange={handleRequestChange} className="mt-1 h-5 w-5 text-navy focus:ring-navy rounded" />
                    <label htmlFor="req-agreeVoice" className="text-xs text-gray-800"><span className="font-bold text-navy block">AI Voice & Automated Calls (Optional)</span>I consent to receive phone calls from Bin There Totes, which may include automated, pre-recorded, or AI voice assistant communications. I understand I can opt out of future calls by requesting to be placed on the do-not-call list. View our{' '}<Link href="/terms" target="_blank" className="underline text-blue-600 hover:text-blue-800">Terms of Service</Link>.</label>
                  </div>
                </div>

                {submitStatus === 'error' && <p className="text-red-600 text-center font-semibold">Error submitting form. Please try again.</p>}

                <button type="submit" disabled={isSubmitting} className="w-full bg-orange text-white py-4 rounded-lg font-bold hover:bg-orange/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
                  {isSubmitting ? <span>Checking...</span> : <><Calendar className="h-5 w-5" /><span>Submit Request</span></>}
                </button>
              </form>
            )}

            {/* TAB 2: AI ASSISTANT */}
            {activeView === 'ai' && (
              <div className="animate-fade-in">
                {aiSubmitted ? (
                  <div className="text-center py-10">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-navy mb-2">You're all set!</h3>
                    <p className="text-gray-600 mb-2">Your info has been saved. The chat widget is opening now.</p>
                    <p className="text-sm text-gray-400">(If it doesn't open automatically, look for the chat bubble in the corner.)</p>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-navy rounded-full mx-auto flex items-center justify-center mb-4 relative">
                        <div className="absolute inset-0 rounded-full animate-ping bg-navy/20"></div>
                        <Bot className="h-8 w-8 text-orange relative z-10" />
                      </div>
                      <h3 className="text-xl font-bold text-navy mb-1">Chat with Elizabeth</h3>
                      <p className="text-sm text-gray-600">Enter your info below to start chatting with our AI assistant.</p>
                    </div>
                    <form onSubmit={handleAiSubmit} noValidate className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-navy mb-1">First Name *</label>
                          <input type="text" name="firstName" value={aiData.firstName} onChange={handleAiChange} className={getInputClass('firstName')} />
                          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-navy mb-1">Last Name *</label>
                          <input type="text" name="lastName" value={aiData.lastName} onChange={handleAiChange} className={getInputClass('lastName')} />
                          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-navy mb-1">Email *</label>
                          <input type="email" name="email" value={aiData.email} onChange={handleAiChange} className={getInputClass('email')} />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-navy mb-1">Phone *</label>
                          <input type="tel" name="phone" value={aiData.phone} onChange={handleAiChange} maxLength={14} placeholder="5678251714" className={getInputClass('phone')} />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                      <button type="submit" disabled={isSubmitting} className="w-full bg-navy text-white py-4 rounded-lg font-bold hover:bg-navy/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
                        {isSubmitting ? <span>Starting chat...</span> : <><Bot className="h-5 w-5" /><span>Start Chatting with Elizabeth</span></>}
                      </button>
                      <p className="text-xs text-gray-400 text-center">Your info is saved so we can follow up after your chat.</p>
                    </form>
                  </>
                )}
              </div>
            )}

            {/* TAB 3: CUSTOM QUOTE */}
            {activeView === 'quote' && submitStatus !== 'success' && (
              <form onSubmit={handleQuoteSubmit} noValidate className="space-y-6 animate-fade-in">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">First Name *</label>
                    <input type="text" name="firstName" value={quoteData.firstName} onChange={handleQuoteChange} className={getInputClass('firstName')} />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Last Name *</label>
                    <input type="text" name="lastName" value={quoteData.lastName} onChange={handleQuoteChange} className={getInputClass('lastName')} />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Email *</label>
                    <input type="email" name="email" value={quoteData.email} onChange={handleQuoteChange} className={getInputClass('email')} />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">Phone (10 digits) *</label>
                    <input type="tel" name="phone" value={quoteData.phone} onChange={handleQuoteChange} maxLength={14} placeholder="5678251714" className={getInputClass('phone')} />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">Location Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Current Address *</label>
                      <input type="text" name="currentAddress" value={quoteData.currentAddress} onChange={handleQuoteChange} className={getInputClass('currentAddress')} />
                      {errors.currentAddress && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.currentAddress}</p>}
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Current Zip *</label>
                      <input type="text" name="currentZip" value={quoteData.currentZip} onChange={handleQuoteChange} placeholder="45801" className={getInputClass('currentZip')} />
                      {errors.currentZip && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.currentZip}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Moving To Address <span className="text-gray-400 font-normal">(Optional)</span></label>
                      <input type="text" name="movingToAddress" value={quoteData.movingToAddress} onChange={handleQuoteChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none" />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Moving To Zip *</label>
                      <input type="text" name="movingToZip" value={quoteData.movingToZip} onChange={handleQuoteChange} placeholder="45801" className={getInputClass('movingToZip')} />
                      {errors.movingToZip && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.movingToZip}</p>}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-semibold text-navy mb-1">Details & Questions *</label>
                  <textarea name="questions" value={quoteData.questions} onChange={handleQuoteChange} rows={4} placeholder="Tell us about your move. How many rooms? Any special requests?" className={`${getInputClass('questions')} resize-none`} />
                  {errors.questions && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.questions}</p>}
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start space-x-3 bg-navy/5 p-4 rounded-lg border border-navy/10">
                    <input type="checkbox" id="quote-agreeSMS" name="agreeSMS" checked={quoteData.agreeSMS} onChange={handleQuoteChange} className="mt-1 h-5 w-5 text-orange focus:ring-orange rounded" />
                    <label htmlFor="quote-agreeSMS" className="text-xs text-gray-800">By providing your phone number, you consent to receive marketing text messages from Bin There Totes. Consent is not a condition of purchase. Message & data rates may apply. Reply STOP to opt out. See our{' '}<Link href="/privacy" target="_blank" className="underline text-orange-600 hover:text-orange-800">Privacy Policy</Link>.</label>
                  </div>
                  <div className="flex items-start space-x-3 bg-navy/5 p-4 rounded-lg border border-navy/10">
                    <input type="checkbox" id="quote-agreeVoice" name="agreeVoice" checked={quoteData.agreeVoice} onChange={handleQuoteChange} className="mt-1 h-5 w-5 text-navy focus:ring-navy rounded" />
                    <label htmlFor="quote-agreeVoice" className="text-xs text-gray-800"><span className="font-bold text-navy block">AI Voice & Automated Calls (Optional)</span>I consent to receive phone calls from Bin There Totes, which may include automated, pre-recorded, or AI voice assistant communications. I understand I can opt out of future calls by requesting to be placed on the do-not-call list. View our{' '}<Link href="/terms" target="_blank" className="underline text-blue-600 hover:text-blue-800">Terms of Service</Link>.</label>
                  </div>
                </div>

                {submitStatus === 'error' && <p className="text-red-600 text-center font-semibold">Error submitting form. Please try again.</p>}

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
