import React from 'react';
import { Link } from 'react-router-dom';

const DashHead = () => {
  const currentTime = new Date().toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York',
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-green-800 text-white p-3 z-50 shadow-sm">
        <div className="flex items-center justify-between px-2">
          {/* Hamburger Menu */}
          <button className="focus:outline-none transition-transform duration-200 hover:scale-105">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Title */}
          <h1 className="text-lg font-semibold font-serif">FarmProduceMart</h1>

          {/* Spacer for balance */}
          <div className="w-5 h-5"></div>
        </div>

        {/* Mobile Time Display */}
        <div className="text-xs text-green-100 mt-1 text-center transition-opacity duration-300 hover:opacity-75">
          {currentTime} EDT, {currentDate}
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex fixed top-0 left-0 w-full bg-green-800 text-white p-4 shadow-sm z-50">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-yellow-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
              />
            </svg>
            <h1 className="text-xl font-serif font-medium">FarmProduceMart</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-grow max-w-md px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 pl-3 pr-8 rounded-md text-sm bg-white/80 text-green-900 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-900 transition-transform duration-200 hover:scale-110">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M15 10.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Time Display */}
          <div className="text-xs text-yellow-100 transition-opacity duration-300 hover:opacity-75">
            {currentTime} EDT, {currentDate}
          </div>
        </div>
      </header>
    </>
  );
};

export default DashHead;
