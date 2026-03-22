import React from 'react'

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors">About Elites</h1>
        <p className="text-gray-600 dark:text-gray-300 transition-colors">Connecting African artisans with the world</p>
      </div>

      <div className="prose max-w-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 transition-colors">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors">
              Elites is a premium marketplace dedicated to connecting local African artisans and businesses 
              with customers worldwide. We believe in authentic craftsmanship, fair trade, and sustainable 
              economic growth for communities across the continent.
            </p>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">
              Our platform showcases the rich diversity of African products, from traditional handicrafts 
              to modern innovations, all while ensuring that creators receive fair compensation for their work.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 transition-colors">Our Values</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 transition-colors">
              <li className="flex items-start">
                <span className="text-brand-600 dark:text-brand-400 mr-2 transition-colors">•</span>
                <span><strong className="text-gray-900 dark:text-gray-100 transition-colors">Authenticity:</strong> Every product is verified for genuine African origin</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 dark:text-brand-400 mr-2 transition-colors">•</span>
                <span><strong className="text-gray-900 dark:text-gray-100 transition-colors">Fair Trade:</strong> Ensuring fair prices and working conditions for artisans</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 dark:text-brand-400 mr-2 transition-colors">•</span>
                <span><strong className="text-gray-900 dark:text-gray-100 transition-colors">Sustainability:</strong> Supporting environmentally conscious production methods</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 dark:text-brand-400 mr-2 transition-colors">•</span>
                <span><strong className="text-gray-900 dark:text-gray-100 transition-colors">Community:</strong> Building connections between creators and customers</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-secondary-800 rounded-lg p-8 mb-12 border border-transparent dark:border-secondary-700 transition-colors">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100 transition-colors">Why Choose Elites?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">🌍</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100 transition-colors">Support Local Artisans</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">Directly support African creators and their communities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">✨</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100 transition-colors">Unique Products</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">Discover one-of-a-kind items you won't find elsewhere</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">🤝</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100 transition-colors">Trusted Platform</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">Secure payments and reliable delivery across Kenya</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 transition-colors">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors">
            Have questions or want to learn more about our sellers? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:info@elites.africa" 
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
