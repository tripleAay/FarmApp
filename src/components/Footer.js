import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-600 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-8">
        {/* Logo and Description */}
        <div className="text-center lg:text-left mb-6 lg:mb-0">
          <h2 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-3">
            FarmProduceMart
          </h2>
          <p className="text-base lg:text-lg text-gray-200 max-w-sm lg:max-w-xs leading-relaxed">
            Connecting Nigerian farmers and buyers with fresh produce, tools, and a thriving community.
          </p>
        </div>

        {/* Subscription */}
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6 lg:mb-0">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-l-md text-gray-800 w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 text-green-900 font-semibold px-6 py-3 rounded-r-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-md">
            Subscribe
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 text-center lg:text-right">
          <a href="#" className="text-lg hover:text-yellow-300 transition-colors duration-300">Terms</a>
          <a href="#" className="text-lg hover:text-yellow-300 transition-colors duration-300">Privacy</a>
        </div>

        {/* Contact and Social */}
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 text-center lg:text-right">
          <p className="text-base lg:text-lg">+234 916 774 0076</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300">
              <span className="sr-only">Instagram - Farming Community</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-12c-2.21 0-4 1.79-4 4v12c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4v-12c0-2.21-1.79-4-4-4zm-5.5 14c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm4-8c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300">
              <span className="sr-only">Twitter - Market Updates</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2h-16c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-16c0-1.103-.897-2-2-2zm-9 13c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm8-10h-16v16h16v-16z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300">
              <span className="sr-only">Facebook - Farmer Connections</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2h-16c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h8v-8h-2v-3h2v-2c0-1.654 1.346-3 3-3h2v3h-2c-.552 0-1 .448-1 1v2h3l-1 3h-2v8h4c1.103 0 2-.897 2-2v-16c0-1.103-.897-2-2-2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;