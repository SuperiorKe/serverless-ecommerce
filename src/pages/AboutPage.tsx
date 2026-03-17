import React from 'react'

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About BeSA</h1>
        <p className="text-gray-600">Connecting African artisans with the world</p>
      </div>

      <div className="prose max-w-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              BeSA (Buy and Sell Africa) is dedicated to connecting local African artisans and businesses 
              with customers worldwide. We believe in authentic craftsmanship, fair trade, and sustainable 
              economic growth for communities across the continent.
            </p>
            <p className="text-gray-600">
              Our platform showcases the rich diversity of African products, from traditional handicrafts 
              to modern innovations, all while ensuring that creators receive fair compensation for their work.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span><strong>Authenticity:</strong> Every product is verified for genuine African origin</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span><strong>Fair Trade:</strong> Ensuring fair prices and working conditions for artisans</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span><strong>Sustainability:</strong> Supporting environmentally conscious production methods</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span><strong>Community:</strong> Building connections between creators and customers</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">Why Choose BeSA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">🌍</span>
              </div>
              <h3 className="font-semibold mb-2">Support Local Artisans</h3>
              <p className="text-gray-600 text-sm">Directly support African creators and their communities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">✨</span>
              </div>
              <h3 className="font-semibold mb-2">Unique Products</h3>
              <p className="text-gray-600 text-sm">Discover one-of-a-kind items you won't find elsewhere</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">🤝</span>
              </div>
              <h3 className="font-semibold mb-2">Trusted Platform</h3>
              <p className="text-gray-600 text-sm">Secure payments and reliable delivery across Kenya</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions or want to learn more about our sellers? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:info@besa.africa" 
              className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
            >
              Email Us
            </a>
            <a 
              href="tel:+254700000000" 
              className="px-6 py-3 border border-brand-600 text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
