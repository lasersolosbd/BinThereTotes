import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy - Bin There Totes',
  description: 'Privacy policy for Bin There Totes moving bin rentals',
}

export default function PrivacyPolicy() {
  const currentDate = new Date()
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-navy mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Last Updated: {monthYear}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bin There Totes ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Delivery and pickup addresses</li>
                <li>Moving dates and scheduling preferences</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Process your bin rental orders and deliver our services</li>
                <li>Communicate with you about your rental, including delivery and pickup scheduling</li>
                <li>Send you service updates, confirmations, and administrative messages</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our services and customer experience</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">SMS/Text Message Communications</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you provide your phone number and consent to receive text messages, we may send you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Delivery and pickup confirmations</li>
                <li>Service updates related to your rental</li>
                <li>Responses to your inquiries</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                No mobile information will be shared with third parties/affiliates for marketing/promotional purposes.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may opt-out of receiving text messages at any time by replying STOP. Message and data rates may apply.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Service Providers:</strong> Third parties who perform services on our behalf, such as payment processing and delivery logistics</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of assets, or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. However, 
                no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for text message communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to improve your browsing experience, 
                analyze site traffic, and understand where our visitors are coming from. You can control 
                cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-cool-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Bin There Totes</strong></p>
                <p className="text-gray-700 mb-2">Lima, OH 45801</p>
                <p className="text-gray-700 mb-2">Phone: <a href="tel:+14195551234" className="text-orange hover:underline">(419) 555-1234</a></p>
                <p className="text-gray-700">Email: <a href="mailto:privacy@bintheretotes.com" className="text-orange hover:underline">privacy@bintheretotes.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
