import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import logo from '../assets/logo.svg';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Collection', path: '/products' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  const categories = [
    { name: "Men's Wear", path: '/products/men' },
    { name: "Women's Wear", path: '/products/women' },
    { name: 'Wedding & Ethnic', path: '/products/wedding' },
    { name: 'Partywear', path: '/products/party' },
    { name: 'Corporate/Formal', path: '/products/formal' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 px-6 sm:px-10 py-12 z-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="FashionRent Logo" className="w-16 h-12 rounded-full object-cover" />
            <div>
              <h3 className="text-xl font-bold text-white font-playfair">
                Paridhra<span className="block text-sm font-poppins text-[#ffd700]">The house of fashion</span>
              </h3>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            Revolutionizing the way you dress. Rent premium fashion, make memories, and save space and money — all in style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path} className="hover:text-white transition-colors duration-200 block">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Popular Categories</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((cat, index) => (
              <li key={index}>
                <Link to={cat.path} className="hover:text-white transition-colors duration-200 block">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-sm space-y-6">
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>

          {/* Address */}
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-[#ffd700] text-xl shrink-0" />
            <p>
              Paridhra, Shop No: 6, Bhakti Anugan CHS, Plot No. 17A, Sector 12A,<br />
              near FAM Co-Operative Housing Society,<br />
              Kopar Khairane, Navi Mumbai, Maharashtra 400709
            </p>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 flex-wrap">
            <FaPhoneAlt className="text-[#ffd700] text-xl shrink-0" />
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <a href="tel:+919114519114" className="hover:underline">+91 9114519114</a>
              <span>/</span>
              <a href="tel:+919137399370" className="hover:underline">+91 9137399370</a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-[#ffd700] text-xl shrink-0" />
            <a href="mailto:paridhrafashion@gmail.com" className="hover:underline break-all">
              paridhrafashion@gmail.com
            </a>
          </div>

          {/* Button */}
          <div className="text-center sm:text-left">
            <button className="bg-[#ffd900d3] hover:bg-yellow-600 transition text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 mx-auto sm:mx-0">
              Get in Touch <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>© {new Date().getFullYear()} FashionRent. All rights reserved.</div>
        <div className="space-x-4">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms</Link>
          <Link to="/returns" className="hover:text-white">Return Policy</Link>
          <Link to="/faq" className="hover:text-white">FAQs</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
