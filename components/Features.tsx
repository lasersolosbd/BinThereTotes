import { Shield, Leaf, Package, Clock, Recycle, TrendingUp } from 'lucide-react'

export default function Features() {
  return (
    <section id="how-it-works" className="py-20 bg-cool-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy mb-4">
            Why Choose Bin There Totes?
          </h2>
          <p className="text-xl text-gray-600">
            We combine military precision with environmental responsibility
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Veteran-Owned Precision */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-start space-x-4">
              <div className="bg-navy p-4 rounded-xl flex-shrink-0">
                <Shield className="h-8 w-8 text-orange" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-navy mb-3">
                  Veteran-Owned Precision
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Built on military values of reliability, punctuality, and attention to detail. 
                  We treat your belongings with the same care and precision we learned in service.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2 text-gray-700">
                    <Clock className="h-4 w-4 text-orange flex-shrink-0" />
                    <span className="text-sm">On-time delivery guaranteed</span>
                  </li>
                  <li className="flex items-center space-x-2 text-gray-700">
                    <Package className="h-4 w-4 text-orange flex-shrink-0" />
                    <span className="text-sm">Meticulously cleaned bins</span>
                  </li>
                  <li className="flex items-center space-x-2 text-gray-700">
                    <TrendingUp className="h-4 w-4 text-orange flex-shrink-0" />
                    <span className="text-sm">Professional service, every time</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Eco-Friendly & Cardboard-Free */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-start space-x-4">
              <div className="bg-orange p-4 rounded-xl flex-shrink-0">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-navy mb-3">
                  Eco-Friendly & Cardboard-Free
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Join Lima's green moving revolution. Our reusable bins eliminate cardboard waste 
                  and reduce your environmental footprint while making your move easier.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2 text-gray-700">
                    <Recycle className="h-4 w-4 text-orange flex-shrink-0" />
                    <span className="text-sm">100% reusable plastic bins</span>
                  </li>
                  <li className="flex items-center space-x-2 text-gray-700">
                    <Leaf className="h-4 w-4 text-orange flex-shrink-0" />
                    <span className="text-sm">Zero cardboard waste</span>
                  </li>
                  <li className="flex items-center space-x-2 text-gray-700">
                    <TrendingUp className="h-4 w-4 text-orange flex-shrink-0" />
                    <span className="text-sm">Reduce your carbon footprint</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Steps */}
        <div className="mt-16">
          <h3 className="text-3xl font-display font-bold text-navy text-center mb-12">
            Simple 3-Step Process
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange text-white rounded-full text-2xl font-bold mb-4">
                1
              </div>
              <h4 className="text-xl font-display font-bold text-navy mb-2">
                We Deliver
              </h4>
              <p className="text-gray-600">
                Choose your package and schedule delivery. We'll drop off clean, stackable bins at your door.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange text-white rounded-full text-2xl font-bold mb-4">
                2
              </div>
              <h4 className="text-xl font-display font-bold text-navy mb-2">
                You Pack
              </h4>
              <p className="text-gray-600">
                Pack at your own pace. No tape, no assembly - just fill and stack. Keep them as long as you need.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange text-white rounded-full text-2xl font-bold mb-4">
                3
              </div>
              <h4 className="text-xl font-display font-bold text-navy mb-2">
                We Pick Up
              </h4>
              <p className="text-gray-600">
                When you're done, we'll pick them up. No hassle, no cardboard mess to recycle. You're Done That!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
