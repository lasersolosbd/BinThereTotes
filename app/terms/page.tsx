import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms of Service - Sheets Holdings DBA Bin There Totes',
  description: 'Terms of service for Sheets Holdings DBA Bin There Totes moving bin rentals',
}

export default function TermsOfService() {
  const currentDate = new Date()
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-navy mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-8">
            Last Updated: {monthYear}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using Sheets Holdings DBA Bin There Totes' services, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Service Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bin There Totes provides reusable plastic moving bin rental services in Lima, OH and surrounding areas. 
                Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Delivery of clean, stackable moving bins to your specified address</li>
                <li>Flexible rental periods (standard 2-week rental with extension options)</li>
                <li>Pickup of bins after your move is complete</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Rental Terms</h2>
              
              <h3 className="text-xl font-display font-semibold text-navy mb-3 mt-6">Rental Period</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The standard rental period is 2 weeks from delivery date. Extensions are available for an additional fee. 
                Late returns beyond the agreed rental period may incur additional charges.
              </p>

              <h3 className="text-xl font-display font-semibold text-navy mb-3 mt-6">Delivery and Pickup</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We will deliver bins to your specified address during the agreed delivery window. You must be available 
                to receive delivery or make alternative arrangements. For pickup, bins must be emptied, reasonably clean, 
                and accessible at the agreed pickup location.
              </p>

              <h3 className="text-xl font-display font-semibold text-navy mb-3 mt-6">Bin Care and Responsibility</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are responsible for the bins during the rental period. This includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Protecting bins from damage, loss, or theft</li>
                <li>Using bins only for their intended purpose (household moving and packing)</li>
                <li>Returning bins in reasonably clean condition</li>
                <li>Not exceeding the 65-pound weight limit per bin</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Payment is due at the time of booking. We accept major credit cards and other payment methods as specified. 
                Rental fees are non-refundable once delivery has occurred, except as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Damage and Loss</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You will be charged for bins that are lost, stolen, or damaged beyond normal wear and tear. 
                Damage fees will be assessed based on the extent of damage and cost of repair or replacement.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Lost or stolen bins: Full replacement cost ($25 per bin)</li>
                <li>Damaged bins: Repair cost or replacement cost as applicable</li>
                <li>Excessively dirty bins: Additional cleaning fee ($10 per bin)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Cancellation Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may cancel your reservation up to 48 hours before the scheduled delivery date for a full refund. 
                Cancellations made within 48 hours of delivery or after delivery has occurred are non-refundable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sheets Holdings DBA Bin There Totes is not responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Damage to your belongings during packing, moving, or storage</li>
                <li>Delays in delivery or pickup due to circumstances beyond our control</li>
                <li>Any indirect, incidental, or consequential damages arising from use of our services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our total liability shall not exceed the amount you paid for the rental.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Prohibited Uses</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not use our bins for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Storing or transporting hazardous materials, chemicals, or illegal substances</li>
                <li>Commercial purposes without prior written agreement</li>
                <li>Any purpose that violates applicable laws or regulations</li>
                <li>Resale or subletting to third parties</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Indemnification</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to indemnify and hold Sheets Holdings DBA Bin There Totes harmless from any claims, damages, or expenses 
                arising from your use of the bins or violation of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective 
                immediately upon posting to our website. Your continued use of our services after changes 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service shall be governed by and construed in accordance with the laws of the 
                State of Ohio, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-cool-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Sheets Holdings DBA Bin There Totes</strong></p>
                <p className="text-gray-700 mb-2">Lima, OH 45801</p>
                <p className="text-gray-700 mb-2">Phone: <a href="tel:+14195551234" className="text-orange hover:underline">(419) 555-1234</a></p>
                <p className="text-gray-700">Email: <a href="mailto:info@bintheretotes.com" className="text-orange hover:underline">info@bintheretotes.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
