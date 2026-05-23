'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Phone, Calendar, MessageSquare, Send, CheckCircle, MapPin, Mail, Mic, PhoneOff, StopCircle, AlertTriangle } from 'lucide-react'
import { RetellWebClient } from 'retell-client-js-sdk'

const retellWebClient = new RetellWebClient()

const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/nQv4T6cT4sx1HYZZVpsn/webhook-trigger/ddcc6997-7fad-4cee-b2de-653cd224e260'

// Stage 1: 0–120s  → normal operation
// Stage 2: 120–180s → warning banner with countdown
// Stage 3: 180s     → auto-close
const WARN_AT_SECONDS = 120
const CLOSE_AT_SECONDS = 180

type ViewState = 'request' | 'quote' | 'voice' | 'chat'

interface SharedFields {
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface AiTabData {
  agreeSMS: boolean
  agreePromo: boolean
}

interface ChatMessage {
  role: 'user' | 'agent'
  content: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildTranscript(messages: ChatMessage[]): string {
  return messages
    .map(m => `${m.role === 'user' ? 'User' : 'Agent'}: ${m.content}`)
    .join('\n')
}

function buildSummary(messages: ChatMessage[]): string {
  const userLines = messages.filter(m => m.role === 'user').map(m => m.content)
  if (userLines.length === 0) return 'No user messages recorded.'
  return `User asked about: ${userLines.slice(0, 3).join(' | ')}${userLines.length > 3 ? ' …and more.' : '.'}`
}

// ── Sub-components (defined outside ContactForm to prevent remount on re-render) ──

interface SharedFieldBlockProps {
  shared: SharedFields
  errors: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputCls: (field: string) => string
}

function SharedFieldBlock({ shared, errors, onChange, inputCls }: SharedFieldBlockProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1">First Name *</label>
          <input type="text" name="firstName" value={shared.firstName} onChange={onChange} placeholder="First name" className={inputCls('firstName')} />
          {errors.firstName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1">Last Name *</label>
          <input type="text" name="lastName" value={shared.lastName} onChange={onChange} placeholder="Last name" className={inputCls('lastName')} />
          {errors.lastName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.lastName}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1">Email *</label>
          <input type="email" name="email" value={shared.email} onChange={onChange} placeholder="you@email.com" className={inputCls('email')} />
          {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1">Phone *</label>
          <input type="tel" name="phone" value={shared.phone} onChange={onChange} maxLength={14} placeholder="(567) 000-0000" className={inputCls('phone')} />
          {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
        </div>
      </div>
    </div>
  )
}

interface A2PBlockProps {
  smsId: string
  promoId: string
  smsChecked: boolean
  promoChecked: boolean
  smsError?: string
  promoError?: string
  onSmsChange: (v: boolean) => void
  onPromoChange: (v: boolean) => void
}

function A2PBlock({ smsId, promoId, smsChecked, promoChecked, smsError, promoError, onSmsChange, onPromoChange }: A2PBlockProps) {
  return (
    <div className="space-y-3 pt-4 border-t border-gray-100">
      <div className="flex items-start space-x-3 bg-navy/5 p-4 rounded-lg border border-navy/10">
        <input type="checkbox" id={smsId} checked={smsChecked} onChange={e => onSmsChange(e.target.checked)}
          className="mt-1 h-5 w-5 text-orange focus:ring-orange rounded flex-shrink-0" />
        <label htmlFor={smsId} className="text-xs text-gray-800 leading-relaxed">
          By submitting, you authorize Sheets Holdings DBA Bin There Totes to text/call the number above for
          informational/transactional messages, possibly using automated means. Msg/data rates apply, msg frequency
          varies. Consent is not a condition of purchase.{' '}
          <a href="https://www.leadconnectorhq.com/terms2" target="_blank" rel="noopener noreferrer" className="underline text-orange hover:text-orange/80">See terms</a>
          {' '}and{' '}
          <a href="https://www.leadconnectorhq.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline text-orange hover:text-orange/80">privacy policy</a>.
          {' '}Text HELP for help and STOP to unsubscribe.
        </label>
      </div>
      {smsError && <p className="text-red-500 text-xs font-semibold pl-1">{smsError}</p>}
      <div className="flex items-start space-x-3 bg-navy/5 p-4 rounded-lg border border-navy/10">
        <input type="checkbox" id={promoId} checked={promoChecked} onChange={e => onPromoChange(e.target.checked)}
          className="mt-1 h-5 w-5 text-orange focus:ring-orange rounded flex-shrink-0" />
        <label htmlFor={promoId} className="text-xs text-gray-800 leading-relaxed">
          By submitting, you authorize Sheets Holdings DBA Bin There Totes to text/call the number above for
          promotional messages, possibly using automated means. Msg/data rates apply, msg frequency varies.
          Consent is not a condition of purchase.{' '}
          <a href="https://www.leadconnectorhq.com/terms2" target="_blank" rel="noopener noreferrer" className="underline text-orange hover:text-orange/80">See terms</a>
          {' '}and{' '}
          <a href="https://www.leadconnectorhq.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline text-orange hover:text-orange/80">privacy policy</a>.
          {' '}Text HELP for help and STOP to unsubscribe.
        </label>
      </div>
      {promoError && <p className="text-red-500 text-xs font-semibold pl-1">{promoError}</p>}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [activeView, setActiveView] = useState<ViewState>('request')
  const [hoveredTab, setHoveredTab] = useState<ViewState | null>(null)

  const [shared, setShared] = useState<SharedFields>({
    firstName: '', lastName: '', email: '', phone: '',
  })

  const [requestData, setRequestData] = useState({
    currentAddress: '', currentZip: '', movingToAddress: '', movingToZip: '',
    package: '3bed', dropOffDate: '', pickUpDate: '', agreeSMS: false, agreeVoice: false,
  })

  const [quoteData, setQuoteData] = useState({
    currentAddress: '', currentZip: '', movingToAddress: '', movingToZip: '',
    questions: '', agreeSMS: false, agreeVoice: false,
  })

  const [voiceAiData, setVoiceAiData] = useState<AiTabData>({ agreeSMS: false, agreePromo: false })
  const [chatAiData, setChatAiData] = useState<AiTabData>({ agreeSMS: false, agreePromo: false })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [isCalling, setIsCalling] = useState(false)
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle')

  const [chatId, setChatId] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [chatClosedReason, setChatClosedReason] = useState<string | null>(null)

  // 3-stage idle timer state
  const [idleSeconds, setIdleSeconds] = useState(0)
  const [showIdleWarning, setShowIdleWarning] = useState(false)

  // Refs
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const idleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Stable refs for use inside event listeners and callbacks
  const sharedRef = useRef(shared)
  const chatMessagesRef = useRef(chatMessages)
  const chatIdRef = useRef(chatId)

  useEffect(() => { sharedRef.current = shared }, [shared])
  useEffect(() => { chatMessagesRef.current = chatMessages }, [chatMessages])
  useEffect(() => { chatIdRef.current = chatId }, [chatId])

  // ── Retell voice listeners ──
  useEffect(() => {
    retellWebClient.on('call_started', () => { setIsCalling(true); setVoiceStatus('active') })
    retellWebClient.on('call_ended', () => { setIsCalling(false); setVoiceStatus('idle') })
    retellWebClient.on('error', (err: any) => {
      console.error('Retell error:', err)
      setIsCalling(false)
      setVoiceStatus('error')
    })
    return () => {
      retellWebClient.off('call_started')
      retellWebClient.off('call_ended')
      retellWebClient.off('error')
    }
  }, [])

  // ── Scroll chat box (not the page) on new messages ──
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }, [chatMessages, isSending])

  // ── Restore input focus after send completes ──
  useEffect(() => {
    if (!isSending && chatId && chatInputRef.current) {
      chatInputRef.current.focus()
    }
  }, [isSending, chatId])

  // ── Webhook summary sender ──
  const sendChatSummaryWebhook = useCallback((
    userData: SharedFields,
    messages: ChatMessage[],
    keepalive = false
  ) => {
    const payload = JSON.stringify({
      lead_type: 'ai_chat',
      form_type: 'chat_summary',
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      transcript: buildTranscript(messages),
      summary: buildSummary(messages),
      submitted_at: new Date().toISOString(),
    })
    return fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive,
    })
  }, [])

  // ── Stop the idle interval ──
  const stopIdleTimer = useCallback(() => {
    if (idleIntervalRef.current) {
      clearInterval(idleIntervalRef.current)
      idleIntervalRef.current = null
    }
    setIdleSeconds(0)
    setShowIdleWarning(false)
  }, [])

  // ── Clean shutdown (manual or idle stage 3) ──
  const endChatSession = useCallback(async (reason: 'manual' | 'idle') => {
    stopIdleTimer()
    const messages = chatMessagesRef.current
    const userData = sharedRef.current
    if (messages.length > 0) {
      try { await sendChatSummaryWebhook(userData, messages) } catch { /* best effort */ }
    }
    setChatId(null)
    setChatMessages([])
    setChatInput('')
    setShowIdleWarning(false)
    setIdleSeconds(0)
    setChatClosedReason(
      reason === 'idle'
        ? 'Chat closed due to inactivity. Start a new chat anytime.'
        : 'Chat ended. Thanks for chatting with us!'
    )
  }, [stopIdleTimer, sendChatSummaryWebhook])

  // ── Reset idle counter (called on every sent/received message) ──
  const resetIdleTimer = useCallback(() => {
    setIdleSeconds(0)
    setShowIdleWarning(false)
  }, [])

  // ── Start/stop the 1-second idle interval when chatId changes ──
  useEffect(() => {
    if (!chatId) {
      stopIdleTimer()
      return
    }
    // Start a 1-second tick
    idleIntervalRef.current = setInterval(() => {
      setIdleSeconds(prev => {
        const next = prev + 1
        if (next >= CLOSE_AT_SECONDS) {
          // Stage 3 — trigger shutdown asynchronously to avoid setState-in-render
          setTimeout(() => endChatSession('idle'), 0)
          return prev
        }
        if (next >= WARN_AT_SECONDS) {
          setShowIdleWarning(true)
        }
        return next
      })
    }, 1000)

    return () => stopIdleTimer()
  }, [chatId, stopIdleTimer, endChatSession])

  // ── Tab close / pagehide beacon ──
  useEffect(() => {
    const handlePageHide = () => {
      const messages = chatMessagesRef.current
      const activeChatId = chatIdRef.current
      if (!activeChatId || messages.length === 0) return
      const userData = sharedRef.current
      const payload = JSON.stringify({
        lead_type: 'ai_chat',
        form_type: 'chat_summary',
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        transcript: buildTranscript(messages),
        summary: buildSummary(messages),
        submitted_at: new Date().toISOString(),
      })
      if (navigator.sendBeacon) {
        navigator.sendBeacon(GHL_WEBHOOK_URL, new Blob([payload], { type: 'application/json' }))
      } else {
        fetch(GHL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        })
      }
    }
    window.addEventListener('pagehide', handlePageHide)
    return () => window.removeEventListener('pagehide', handlePageHide)
  }, [])

  // ── Utilities ──
  const getMinPickUpDate = (dropDateString: string) => {
    if (!dropDateString) return new Date().toISOString().split('T')[0]
    const d = new Date(dropDateString + 'T12:00:00')
    d.setDate(d.getDate() + 14)
    return d.toISOString().split('T')[0]
  }

  const inputCls = (field: string) =>
    `w-full px-4 py-3 border rounded-lg outline-none transition-all text-sm ${
      errors[field]
        ? 'border-red-500 focus:ring-2 focus:ring-red-500 bg-red-50'
        : 'border-gray-300 focus:ring-2 focus:ring-orange'
    }`

  const changeView = (view: ViewState) => {
    setActiveView(view)
    setSubmitStatus('idle')
    setErrors({})
    setChatClosedReason(null)
    setVoiceAiData({ agreeSMS: false, agreePromo: false })
    setChatAiData({ agreeSMS: false, agreePromo: false })
  }

  const handleSharedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
    setShared(p => ({ ...p, [name]: value }))
  }

  const submitWebhook = (payload: any) =>
    fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, submitted_at: new Date().toISOString() }),
    })

  // ── Validation ──
  const validateShared = () => {
    const e: Record<string, string> = {}
    if (!shared.firstName.trim()) e.firstName = 'Please fill this out.'
    if (!shared.lastName.trim()) e.lastName = 'Please fill this out.'
    if (!shared.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shared.email)) e.email = 'Please enter a valid email.'
    if (shared.phone.replace(/\D/g, '').length < 10) e.phone = 'Please enter a valid 10-digit phone number.'
    return e
  }

  const validateRequest = () => {
    const e = validateShared()
    if (!requestData.currentAddress.trim()) e.currentAddress = 'Please fill this out.'
    if (!/^\d{5}$/.test(requestData.currentZip)) e.currentZip = 'Please enter a valid 5-digit zip.'
    if (!/^\d{5}$/.test(requestData.movingToZip)) e.movingToZip = 'Please enter a valid 5-digit zip.'
    if (!requestData.dropOffDate) e.dropOffDate = 'Please select a date.'
    if (!requestData.pickUpDate) e.pickUpDate = 'Please select a date.'
    return e
  }

  const validateQuote = () => {
    const e = validateShared()
    if (!quoteData.currentAddress.trim()) e.currentAddress = 'Please fill this out.'
    if (!/^\d{5}$/.test(quoteData.currentZip)) e.currentZip = 'Please enter a valid 5-digit zip.'
    if (!/^\d{5}$/.test(quoteData.movingToZip)) e.movingToZip = 'Please enter a valid 5-digit zip.'
    if (!quoteData.questions.trim()) e.questions = 'Please provide details about your move.'
    return e
  }

  const validateAi = (aiData: AiTabData) => {
    const e = validateShared()
    if (!aiData.agreeSMS) e.agreeSMS = 'Please accept to continue.'
    if (!aiData.agreePromo) e.agreePromo = 'Please accept to continue.'
    return e
  }

  // ── Form handlers ──
  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateRequest()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setIsSubmitting(true); setSubmitStatus('idle')
    try {
      const res = await submitWebhook({
        lead_type: 'booking_request', form_type: 'reserve',
        first_name: shared.firstName, last_name: shared.lastName,
        email: shared.email, phone: shared.phone,
        current_address: requestData.currentAddress, current_zip: requestData.currentZip,
        moving_to_address: requestData.movingToAddress, moving_to_zip: requestData.movingToZip,
        package: requestData.package,
        drop_off_date: requestData.dropOffDate, pick_up_date: requestData.pickUpDate,
        agree_sms: requestData.agreeSMS, agree_voice: requestData.agreeVoice,
      })
      setSubmitStatus(res.ok ? 'success' : 'error')
    } catch { setSubmitStatus('error') }
    finally { setIsSubmitting(false) }
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateQuote()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setIsSubmitting(true); setSubmitStatus('idle')
    try {
      const res = await submitWebhook({
        lead_type: 'custom_quote', form_type: 'custom',
        first_name: shared.firstName, last_name: shared.lastName,
        email: shared.email, phone: shared.phone,
        current_address: quoteData.currentAddress, current_zip: quoteData.currentZip,
        moving_to_address: quoteData.movingToAddress, moving_to_zip: quoteData.movingToZip,
        questions: quoteData.questions,
        agree_sms: quoteData.agreeSMS, agree_voice: quoteData.agreeVoice,
      })
      setSubmitStatus(res.ok ? 'success' : 'error')
    } catch { setSubmitStatus('error') }
    finally { setIsSubmitting(false) }
  }

  const handleStartVoice = async () => {
    const errs = validateAi(voiceAiData)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({}); setVoiceStatus('connecting')
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      alert('Microphone access denied. Please allow audio in your browser settings.')
      setVoiceStatus('error'); return
    }
    try {
      await submitWebhook({
        lead_type: 'ai_voice', form_type: 'voice',
        first_name: shared.firstName, last_name: shared.lastName,
        email: shared.email, phone: shared.phone,
      })
      const res = await fetch('/api/retell', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...shared, mode: 'voice' }),
      })
      const data = await res.json()
      if (!res.ok || !data.accessToken) throw new Error('Token error')
      await retellWebClient.startCall({ accessToken: data.accessToken })
    } catch (err: any) {
      console.error('Voice failed:', err); setVoiceStatus('error')
    }
  }

  const handleEndCall = () => retellWebClient.stopCall()

  const handleStartChat = async () => {
    const errs = validateAi(chatAiData)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setChatClosedReason(null)
    try {
      await submitWebhook({
        lead_type: 'ai_chat', form_type: 'chat',
        first_name: shared.firstName, last_name: shared.lastName,
        email: shared.email, phone: shared.phone,
      })
      const res = await fetch('/api/retell', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...shared, mode: 'text' }),
      })
      const data = await res.json()
      if (!res.ok || !data.chatId) throw new Error('Chat session error')
      setChatId(data.chatId)
      setChatMessages([{
        role: 'agent',
        content: `Hey ${shared.firstName}! I'm the Bin There Totes AI assistant. I can help you figure out the right bin package, walk through pricing, or answer questions about your move. What would you like to know?`,
      }])
    } catch (err: any) { console.error('Chat failed:', err) }
  }

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !chatId || isSending) return
    const msg = chatInput.trim()
    setChatInput('')
    setIsSending(true)
    resetIdleTimer()
    setChatMessages(p => [...p, { role: 'user', content: msg }])
    try {
      const res = await fetch('/api/retell', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'chat_message', chatId, message: msg }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error('Reply failed')
      const reply = data.reply?.content || 'Sorry, something went wrong. Please try again.'
      setChatMessages(p => [...p, { role: 'agent', content: reply }])
      resetIdleTimer() // also reset on agent reply
    } catch {
      setChatMessages(p => [...p, { role: 'agent', content: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setIsSending(false)
    }
  }

  const handleChatKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage() }
  }

  const handleReset = () => {
    stopIdleTimer()
    setChatId(null)
    setChatMessages([])
    setChatInput('')
    setChatClosedReason(null)
    setVoiceStatus('idle')
    setIsCalling(false)
  }

  const tabs: { id: ViewState; topLabel: string; bottomLabel: string; icon: React.ReactNode }[] = [
    { id: 'request', topLabel: 'Reserve',  bottomLabel: 'Bins Now',  icon: <Calendar className="h-5 w-5" /> },
    { id: 'quote',   topLabel: 'Custom',   bottomLabel: 'Bin Order', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'voice',   topLabel: 'Talk',     bottomLabel: 'to AI',     icon: <Mic className="h-5 w-5" /> },
    { id: 'chat',    topLabel: 'Chat',     bottomLabel: 'with AI',   icon: <Send className="h-5 w-5" /> },
  ]

  // Countdown seconds remaining in warning stage
  const warningCountdown = CLOSE_AT_SECONDS - idleSeconds

  return (
    <section id="contact" className="py-20 bg-cool-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-4">
            <h2 className="text-4xl font-display font-bold text-navy mb-6">
              Ready to Join the "Done That" Club?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Reserve your bins, get a custom quote, or get instant answers from our AI — available 24/7.
            </p>
            <div className="space-y-6">
              {[
                { icon: <Phone className="h-6 w-6 text-white" />, label: 'Phone', content: <a href="tel:+15673200620" className="text-gray-600 hover:text-orange transition-colors">(567) 320-0620</a> },
                { icon: <Mail className="h-6 w-6 text-white" />, label: 'Email', content: <a href="mailto:info@bintheretotes.com" className="text-gray-600 hover:text-orange transition-colors">info@bintheretotes.com</a> },
                { icon: <MapPin className="h-6 w-6 text-white" />, label: 'Service Area', content: <p className="text-gray-600">Lima, OH and all of Allen County</p> },
              ].map(item => (
                <div key={item.label} className="flex items-start space-x-4">
                  <div className="bg-orange p-3 rounded-lg flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{item.label}</h3>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-10">

            {/* ── Segmented pill tab bar ── */}
            <div className="flex bg-gray-100/80 rounded-xl p-1 mb-8">
              {tabs.map((tab, index) => {
                const isActive = activeView === tab.id
                const isHovered = hoveredTab === tab.id
                const isLast = index === tabs.length - 1
                const nextIsActive = index < tabs.length - 1 && activeView === tabs[index + 1].id
                const nextIsHovered = index < tabs.length - 1 && hoveredTab === tabs[index + 1].id

                let bgColor = 'transparent'
                if (isActive) bgColor = '#ffffff'
                else if (isHovered) bgColor = 'rgba(0,0,0,0.05)'

                const contentColor = isActive ? '#E8561E' : isHovered ? '#1f2937' : '#374151'

                return (
                  <button
                    key={tab.id}
                    onClick={() => changeView(tab.id)}
                    onMouseEnter={() => setHoveredTab(tab.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className="relative flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-1 rounded-lg transition-all duration-150"
                    style={isActive ? {
                      backgroundColor: bgColor,
                      border: '1px solid #E8561E',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.10), 0 0.5px 1px rgba(0,0,0,0.06)',
                    } : {
                      backgroundColor: bgColor,
                      border: '1px solid transparent',
                    }}
                  >
                    {!isLast && !isActive && !nextIsActive && !isHovered && !nextIsHovered && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px bg-gray-300" style={{ height: '55%' }} aria-hidden="true" />
                    )}
                    <span className="text-[9px] font-bold uppercase tracking-wider leading-tight transition-colors duration-150" style={{ color: contentColor }}>
                      {tab.topLabel}
                    </span>
                    <span style={{ color: contentColor }} className="transition-colors duration-150">
                      {tab.icon}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider leading-tight transition-colors duration-150" style={{ color: contentColor }}>
                      {tab.bottomLabel}
                    </span>
                  </button>
                )
              })}
            </div>

            {submitStatus === 'success' && (
              <div className="text-center py-10">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-navy mb-2">Received!</h3>
                <p className="text-gray-600 mb-2">We have your details and will be in touch shortly.</p>
                <p className="text-sm text-gray-500 mb-6">
                  Still have questions?{' '}
                  <button onClick={() => changeView('chat')} className="text-orange font-semibold hover:underline">Chat with our AI</button>
                  {' '}or{' '}
                  <button onClick={() => changeView('voice')} className="text-orange font-semibold hover:underline">talk to it now</button>.
                </p>
                <button onClick={() => setSubmitStatus('idle')} className="text-sm text-gray-400 hover:underline">Submit another request</button>
              </div>
            )}

            {activeView === 'request' && submitStatus !== 'success' && (
              <form onSubmit={handleRequestSubmit} noValidate className="space-y-6">
                <SharedFieldBlock shared={shared} errors={errors} onChange={handleSharedChange} inputCls={inputCls} />
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">Location Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Current Address *</label>
                      <input type="text" value={requestData.currentAddress}
                        onChange={e => { if (errors.currentAddress) setErrors(p => ({ ...p, currentAddress: '' })); setRequestData(p => ({ ...p, currentAddress: e.target.value })) }}
                        className={inputCls('currentAddress')} />
                      {errors.currentAddress && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.currentAddress}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Current Zip *</label>
                      <input type="text" value={requestData.currentZip} placeholder="45801" maxLength={5}
                        onChange={e => { if (errors.currentZip) setErrors(p => ({ ...p, currentZip: '' })); setRequestData(p => ({ ...p, currentZip: e.target.value })) }}
                        className={inputCls('currentZip')} />
                      {errors.currentZip && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.currentZip}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Moving To Address <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input type="text" value={requestData.movingToAddress}
                        onChange={e => setRequestData(p => ({ ...p, movingToAddress: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Moving To Zip *</label>
                      <input type="text" value={requestData.movingToZip} placeholder="45801" maxLength={5}
                        onChange={e => { if (errors.movingToZip) setErrors(p => ({ ...p, movingToZip: '' })); setRequestData(p => ({ ...p, movingToZip: e.target.value })) }}
                        className={inputCls('movingToZip')} />
                      {errors.movingToZip && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.movingToZip}</p>}
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">Rental Details</h4>
                  <label className="block text-sm font-semibold text-navy mb-1">Select Package *</label>
                  <select value={requestData.package} onChange={e => setRequestData(p => ({ ...p, package: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none text-sm mb-4">
                    <option value="studio">Studio / 1-Bed House (15 Bins)</option>
                    <option value="2bed">2-Bedroom House (35 Bins)</option>
                    <option value="3bed">3-Bedroom House (50 Bins)</option>
                    <option value="4-5bed">4-5 Bedroom House (75 Bins)</option>
                    <option value="larger">Larger House — Let's Discuss</option>
                  </select>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">Drop-off Date *</label>
                      <input type="date" value={requestData.dropOffDate} min={new Date().toISOString().split('T')[0]}
                        onChange={e => {
                          if (errors.dropOffDate) setErrors(p => ({ ...p, dropOffDate: '' }))
                          setRequestData(p => ({ ...p, dropOffDate: e.target.value, pickUpDate: getMinPickUpDate(e.target.value) }))
                        }}
                        className={inputCls('dropOffDate')} />
                      {errors.dropOffDate && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.dropOffDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">Pick-up Date (Min. 14 Days) *</label>
                      <input type="date" value={requestData.pickUpDate}
                        min={requestData.dropOffDate ? getMinPickUpDate(requestData.dropOffDate) : new Date().toISOString().split('T')[0]}
                        onChange={e => { if (errors.pickUpDate) setErrors(p => ({ ...p, pickUpDate: '' })); setRequestData(p => ({ ...p, pickUpDate: e.target.value })) }}
                        className={inputCls('pickUpDate')} />
                      {errors.pickUpDate && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.pickUpDate}</p>}
                    </div>
                  </div>
                </div>
                <A2PBlock
                  smsId="req-sms" promoId="req-promo"
                  smsChecked={requestData.agreeSMS} promoChecked={requestData.agreeVoice}
                  smsError={errors.agreeSMS} promoError={errors.agreePromo}
                  onSmsChange={v => setRequestData(p => ({ ...p, agreeSMS: v }))}
                  onPromoChange={v => setRequestData(p => ({ ...p, agreeVoice: v }))}
                />
                {submitStatus === 'error' && <p className="text-red-600 text-center font-semibold text-sm">Error submitting. Please try again.</p>}
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-orange text-white py-4 rounded-lg font-bold hover:bg-orange/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2 text-sm uppercase tracking-wider">
                  {isSubmitting ? 'Submitting...' : <><Calendar className="h-5 w-5" /> Submit Reservation Request</>}
                </button>
              </form>
            )}

            {activeView === 'quote' && submitStatus !== 'success' && (
              <form onSubmit={handleQuoteSubmit} noValidate className="space-y-6">
                <SharedFieldBlock shared={shared} errors={errors} onChange={handleSharedChange} inputCls={inputCls} />
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">Location Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Current Address *</label>
                      <input type="text" value={quoteData.currentAddress}
                        onChange={e => { if (errors.currentAddress) setErrors(p => ({ ...p, currentAddress: '' })); setQuoteData(p => ({ ...p, currentAddress: e.target.value })) }}
                        className={inputCls('currentAddress')} />
                      {errors.currentAddress && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.currentAddress}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Current Zip *</label>
                      <input type="text" value={quoteData.currentZip} placeholder="45801" maxLength={5}
                        onChange={e => { if (errors.currentZip) setErrors(p => ({ ...p, currentZip: '' })); setQuoteData(p => ({ ...p, currentZip: e.target.value })) }}
                        className={inputCls('currentZip')} />
                      {errors.currentZip && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.currentZip}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Moving To Address <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input type="text" value={quoteData.movingToAddress}
                        onChange={e => setQuoteData(p => ({ ...p, movingToAddress: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Moving To Zip *</label>
                      <input type="text" value={quoteData.movingToZip} placeholder="45801" maxLength={5}
                        onChange={e => { if (errors.movingToZip) setErrors(p => ({ ...p, movingToZip: '' })); setQuoteData(p => ({ ...p, movingToZip: e.target.value })) }}
                        className={inputCls('movingToZip')} />
                      {errors.movingToZip && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.movingToZip}</p>}
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-semibold text-navy mb-1">Details & Questions *</label>
                  <textarea value={quoteData.questions} rows={4}
                    placeholder="Tell us about your move. How many rooms? Any special requests?"
                    onChange={e => { if (errors.questions) setErrors(p => ({ ...p, questions: '' })); setQuoteData(p => ({ ...p, questions: e.target.value })) }}
                    className={`${inputCls('questions')} resize-none`} />
                  {errors.questions && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.questions}</p>}
                </div>
                <A2PBlock
                  smsId="quote-sms" promoId="quote-promo"
                  smsChecked={quoteData.agreeSMS} promoChecked={quoteData.agreeVoice}
                  smsError={errors.agreeSMS} promoError={errors.agreePromo}
                  onSmsChange={v => setQuoteData(p => ({ ...p, agreeSMS: v }))}
                  onPromoChange={v => setQuoteData(p => ({ ...p, agreeVoice: v }))}
                />
                {submitStatus === 'error' && <p className="text-red-600 text-center font-semibold text-sm">Error submitting. Please try again.</p>}
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-orange text-white py-4 rounded-lg font-bold hover:bg-orange/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2 text-sm uppercase tracking-wider">
                  {isSubmitting ? 'Sending...' : <><Send className="h-5 w-5" /> Get Custom Quote</>}
                </button>
              </form>
            )}

            {activeView === 'voice' && (
              <div className="space-y-6">
                {isCalling ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 rounded-full bg-orange/10 border-2 border-orange/30 flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Mic className="h-9 w-9 text-orange" />
                    </div>
                    <p className="text-xl font-bold text-navy mb-2">Call Connected</p>
                    <p className="text-gray-500 text-sm mb-8">You're live with the Bin There Totes AI. Speak naturally!</p>
                    <button onClick={handleEndCall}
                      className="flex items-center gap-2 mx-auto bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-sm py-3 px-8 rounded-lg transition-colors uppercase tracking-wider">
                      <PhoneOff className="h-4 w-4" /> End Call
                    </button>
                  </div>
                ) : (
                  <>
                    {voiceStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 font-semibold text-center">
                        Connection failed. Please check your microphone settings and try again.
                      </div>
                    )}
                    <p className="text-sm text-gray-600">
                      Our AI agent can walk you through bin sizes, availability, and pricing — right now, no hold music.
                      Enter your info and click Start to connect.
                    </p>
                    <SharedFieldBlock shared={shared} errors={errors} onChange={handleSharedChange} inputCls={inputCls} />
                    <A2PBlock
                      smsId="voice-sms" promoId="voice-promo"
                      smsChecked={voiceAiData.agreeSMS} promoChecked={voiceAiData.agreePromo}
                      smsError={errors.agreeSMS} promoError={errors.agreePromo}
                      onSmsChange={v => { if (errors.agreeSMS) setErrors(p => ({ ...p, agreeSMS: '' })); setVoiceAiData(p => ({ ...p, agreeSMS: v })) }}
                      onPromoChange={v => { if (errors.agreePromo) setErrors(p => ({ ...p, agreePromo: '' })); setVoiceAiData(p => ({ ...p, agreePromo: v })) }}
                    />
                    <button onClick={handleStartVoice} disabled={voiceStatus === 'connecting'}
                      className="w-full bg-orange text-white py-4 rounded-lg font-bold hover:bg-orange/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2 text-sm uppercase tracking-wider">
                      {voiceStatus === 'connecting' ? 'Connecting...' : <><Mic className="h-5 w-5" /> Start Voice Consultation</>}
                    </button>
                  </>
                )}
              </div>
            )}

            {activeView === 'chat' && (
              <div className="space-y-4">
                {chatId ? (
                  <div className="space-y-3">

                    {/* ── Stage 2: Idle warning banner ── */}
                    {showIdleWarning && (
                      <div className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold">
                          <AlertTriangle className="h-4 w-4 flex-shrink-0 text-amber-500" />
                          Are you still there? This chat will close in{' '}
                          <span className="font-bold text-amber-900">{warningCountdown}s</span>.
                        </div>
                        <button
                          onClick={resetIdleTimer}
                          className="flex-shrink-0 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Keep Chatting
                        </button>
                      </div>
                    )}

                    {/* ── Chat scroll box ── */}
                    <div
                      ref={chatScrollRef}
                      className="h-64 overflow-y-auto space-y-3 pr-1 border border-gray-100 rounded-xl p-4 bg-gray-50"
                    >
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-orange text-white rounded-br-sm'
                              : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {isSending && (
                        <div className="flex justify-start">
                          <div className="bg-white border border-gray-200 text-gray-400 px-4 py-2.5 rounded-xl rounded-bl-sm text-sm shadow-sm">
                            <span className="animate-pulse">Typing…</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ── Input row ── */}
                    <div className="flex gap-2">
                      <input
                        ref={chatInputRef}
                        type="text"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        onKeyDown={handleChatKeyDown}
                        placeholder="Type your message…"
                        disabled={isSending}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange transition-all disabled:opacity-50"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={isSending || !chatInput.trim()}
                        className="bg-orange hover:bg-orange/90 text-white px-4 py-3 rounded-lg transition-colors disabled:opacity-40"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>

                    {/* ── End Chat + reset row ── */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => endChatSession('manual')}
                        className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <StopCircle className="h-3.5 w-3.5" /> End Chat
                      </button>
                      <button onClick={handleReset} className="text-gray-400 hover:text-gray-600 text-xs transition-colors">
                        Start a new inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Closed reason banner */}
                    {chatClosedReason && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600 text-center">
                        {chatClosedReason}
                      </div>
                    )}
                    <p className="text-sm text-gray-600">
                      Questions at 3am? No problem. Our AI chat agent can answer questions about bin sizes, move timing,
                      and pricing at any hour — no phone call required.
                    </p>
                    <SharedFieldBlock shared={shared} errors={errors} onChange={handleSharedChange} inputCls={inputCls} />
                    <A2PBlock
                      smsId="chat-sms" promoId="chat-promo"
                      smsChecked={chatAiData.agreeSMS} promoChecked={chatAiData.agreePromo}
                      smsError={errors.agreeSMS} promoError={errors.agreePromo}
                      onSmsChange={v => { if (errors.agreeSMS) setErrors(p => ({ ...p, agreeSMS: '' })); setChatAiData(p => ({ ...p, agreeSMS: v })) }}
                      onPromoChange={v => { if (errors.agreePromo) setErrors(p => ({ ...p, agreePromo: '' })); setChatAiData(p => ({ ...p, agreePromo: v })) }}
                    />
                    <button onClick={handleStartChat}
                      className="w-full bg-orange text-white py-4 rounded-lg font-bold hover:bg-orange/90 transition-colors flex justify-center items-center gap-2 text-sm uppercase tracking-wider">
                      <MessageSquare className="h-5 w-5" /> Start Chat
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
