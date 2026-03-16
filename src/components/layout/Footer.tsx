import React from 'react'
import { Link } from 'react-router-dom'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About BeSA</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              BeSA is your trusted marketplace for authentic African products. 
              We connect local artisans and businesses with customers across Kenya and beyond.
            </p>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Contact Us</h4>
              <p className="text-gray-300 text-sm">
                Email: info@besa.co.ke<br />
                Phone: +254 700 000 000<br />
                Nairobi, Kenya
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=electronics" className="text-gray-300 hover:text-white text-sm">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=fashion" className="text-gray-300 hover:text-white text-sm">
                  Fashion & Apparel
                </Link>
              </li>
              <li>
                <Link to="/products?category=home-kitchen" className="text-gray-300 hover:text-white text-sm">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link to="/products?category=beauty-health" className="text-gray-300 hover:text-white text-sm">
                  Beauty & Health
                </Link>
              </li>
              <li>
                <Link to="/products?category=food-groceries" className="text-gray-300 hover:text-white text-sm">
                  Food & Groceries
                </Link>
              </li>
              <li>
                <Link to="/products?category=sports-outdoors" className="text-gray-300 hover:text-white text-sm">
                  Sports & Outdoors
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white text-sm">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white text-sm">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 BeSA Marketplace. All rights reserved. Made with ❤️ in Kenya.
          </p>
        </div>
      </div>
    </footer>
  )
}