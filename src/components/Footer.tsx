
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo1.jpg" 
                alt="SAN Finance Footer Logo" 
                className="w-12 h-12 object-contain rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold">SAN Finance</h3>
                <p className="text-gray-400 text-sm">Your Financial Aid</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fast, secure, and personalized financial support for individuals and businesses.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link to="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                Services
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100064148612577"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/sanfinance_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 SAN Finance. All Rights Reserved.
            </p>
            <p className="text-gray-400 text-xs text-center md:text-right max-w-md">
              Please borrow responsibly. Terms and conditions apply. Financial decisions should be made with careful consideration.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
