'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    question: 'Where can I rent moving boxes in Lima, OH?',
    answer: 'Bin There Totes offers reusable plastic moving bin rentals throughout Lima, OH and surrounding areas. We deliver and pick up right at your door, making the process incredibly convenient. No need to visit a store or deal with cardboard boxes.',
  },
  {
    question: 'Are plastic moving bins cheaper than cardboard?',
    answer: 'Yes! When you factor in the cost of purchasing cardboard boxes, packing tape, and the time spent assembling them, our reusable bins are more cost-effective. Plus, you don\'t have to worry about boxes falling apart or needing reinforcement. Our bins are also better for the environment.',
  },
  {
    question: 'How long can I keep the bins?',
    answer: 'Our standard rental period is 2 weeks, which gives you plenty of time to pack at your own pace. Need more time? No problem! We offer flexible extensions. Just let us know and we\'ll work with your schedule.',
  },
  {
    question: 'What size are the bins?',
    answer: 'Our bins are 27" L x 17" W x 12" H - the perfect size for most household items. They\'re stackable, have comfortable handles, and hold up to 65 pounds each. Unlike cardboard boxes, they won\'t collapse or tear.',
  },
  {
    question: 'Do you deliver and pick up?',
    answer: 'Absolutely! We handle both delivery and pickup. Just schedule your delivery date when booking, and when you\'re done with your move, give us a call to schedule pickup. We\'ll come grab the bins from wherever you\'ve moved to in the Lima area.',
  },
  {
    question: 'What if I need more bins mid-move?',
    answer: 'No worries! Just give us a call and we can deliver additional bins within 24 hours. We understand that moving needs can change, and we\'re here to help you adjust on the fly.',
  },
  {
    question: 'Are the bins clean?',
    answer: 'Absolutely. Every bin is thoroughly cleaned and sanitized between rentals. We take pride in delivering spotless bins - it\'s part of our military precision and attention to detail.',
  },
  {
    question: 'Can I use these bins for storage?',
    answer: 'While our bins are designed for moving, some customers do use them for short-term storage during transitions. Contact us to discuss longer rental periods if you need storage solutions.',
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
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
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
            We're here to help! Give us a call or send us a message.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15678251714"
              className="bg-orange hover:bg-orange-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Call (567) 825-1714
            </a>
            <a
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
