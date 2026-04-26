import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <footer className="bg-black text-gray-300 px-8 py-12 text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo + Description */}
        <div>
          <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
            <span className="bg-orange-500 text-white px-2 py-1 rounded">
              🔥
            </span>
            <span className='text-orange-500'>BurnTrack</span>
          </h3>
          <p className="text-xs">
            Join a community of fitness enthusiasts and achieve your goals together.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-xs">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}> <li className="hover:text-white cursor-pointer">Browse Challenges</li></Link>
            <Link to="/features" onClick={() => window.scrollTo(0, 0)}><li className="hover:text-white cursor-pointer">Features</li></Link>
            <Link to="/howitworks" onClick={() => window.scrollTo(0, 0)}></Link><li className="hover:text-white cursor-pointer">How It Works</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-xs">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}><li className="hover:text-white cursor-pointer">About Us</li></Link>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}><li className="hover:text-white cursor-pointer">Blog</li></Link>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}><li className="hover:text-white cursor-pointer">Careers</li></Link>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-xs">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}><li className="hover:text-white cursor-pointer">Privacy Policy</li></Link>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}><li className="hover:text-white cursor-pointer">Terms of Service</li></Link>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}><li className="hover:text-white cursor-pointer">Contact</li></Link>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
        © 2026 <span className='text-orange-500'>BurnTrack</span>. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

