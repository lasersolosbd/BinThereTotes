'use client'

import { useState } from 'react'
import { ChevronDown, Package } from 'lucide-react'

const FAQS = [
  {
    question: 'Where can I rent moving boxes in Lima, OH?',
    answer: 'Bin There Totes offers reusable plastic moving bin rentals throughout Lima, OH and surrounding areas. We deliver sanitized bins directly to your door and pick them up when your move is complete — no store visit required. Our service covers Lima and all of Allen County.',
    detail: 'No need to hunt down cardboard boxes, buy tape, or figure out what to do with the mess afterward. We drop off clean, stackable bins on your schedule and handle pickup when you\'re done. It\'s the simplest way to move in the Lima area.',
  },
  {
    question: 'Are plastic moving bins cheaper than cardboard?',
    answer: 'Yes. When you add up the cost of cardboard boxes, packing tape, and the time spent assembling and disposing of them, our reusable bin rentals are more cost-effective for most moves. There\'s no tape to buy, no boxes to break down, and no recycling run at the end.',
    detail: 'Our bins also won\'t fall apart mid-move the way wet or overloaded cardboard can. You get a fixed rental price, a set number of bins, and zero hidden supply costs — making budgeting for your move straightforward from the start.',
  },
  {
    question: 'How long can I keep the bins?',
    answer: 'Our standard rental period is 2 weeks, giving you plenty of time to pack at your own pace. If you need more time, we offer flexible extensions — just let us know before your pickup date and we\'ll adjust your schedule at no hassle.',
    detail: 'Two weeks covers the vast majority of residential moves, including time to pack, move, and unpack before we retrieve the bins. For larger moves, office relocations, or staged transitions, extended rentals are available — contact us to discuss your timeline.',
  },
  {
    question: 'What size are the bins?',
    answer: 'Our bins have exterior dimensions of 18.6" L × 12.75" W × 12.9" H, with interior dimensions of 18" L × 12" W × 12.25" H. They hold up to 65 pounds each, stack securely, and have comfortable side handles for easy carrying.',
    detail: 'This size works well for books, kitchen items, clothing, and most household goods. Unlike cardboard boxes, our bins won\'t buckle under weight or collapse when stacked — making loading a truck faster and safer. They\'re also uniform in size, so they stack cleanly in any moving vehicle.',
  },
  {
    question: 'Do you deliver and pick up?',
    answer: 'Yes — delivery and pickup are both included with every rental. You schedule your delivery date when booking, pack at your pace, and call us when you\'re ready for pickup. We\'ll retrieve the bins from your new location anywhere in our service area.',
    detail: 'There\'s no need to transport bins yourself or return them to a store. We handle the full logistics so you can focus on your move. Delivery windows are scheduled to fit your timeline, not ours.',
  },
  {
    question: 'What if I need more bins mid-move?',
    answer: 'Just give us a call and we can deliver additional bins within 24 hours. Moving needs change, and we\'re built to be flexible. There\'s no penalty for adding bins — we\'ll quote you the additional cost and get them out to you quickly.',
    detail: 'It\'s common for customers to underestimate bin count, especially for kitchens, garages, or storage areas. We\'d rather you have what you need than scramble mid-move. When in doubt, we can also help you estimate the right package size before your delivery date.',
  },
  {
    question: 'Are the bins clean?',
    answer: 'Yes. Every bin is thoroughly cleaned and sanitized between rentals before it\'s delivered to you. We inspect each bin for damage and cleanliness as part of our standard process — you will never receive a dirty or compromised bin.',
    detail: 'Cleanliness is part of our military-precision approach to operations. We treat every delivery like it matters, because it does. If a bin ever arrives in a condition you\'re not satisfied with, call us immediately and we\'ll make it right.',
  },
  {
    question: 'Can I use these bins for storage?',
    answer: 'Our bins are designed for moving, but some customers use them for short-term storage during transitions. Extended rental periods for storage purposes are available — contact us to discuss pricing and availability for longer-term use.',
    detail: 'If you\'re between homes, staging a renovation, or need temporary storage while settling in, our bins can bridge that gap. Reach out before your pickup date and we\'ll work out an arrangement that fits your situation.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about renting moving bins in Lima, OH
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="bg-cool-50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg font-display font-semibold text-navy pr-8">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`h-6 w-6 text-orange flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 space-y-3">
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {faq.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-navy to-navy-light rounded-2xl text-white">
          <h3 className="text-2xl font-display font-bold mb-2">
            Still have questions?
          </h3>
          <p className="text-cool-100 mb-6">
            We&apos;re here to help! Give us a call or send us a message.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
              href="tel:+15673200620"
              className="bg-orange hover:bg-orange-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Call (567) 320-0620
            </a>
            
              href="#contact"
              className="bg-white text-navy hover:bg-cool-50 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              Send a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
