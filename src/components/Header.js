import React from 'react';
import { Link } from 'react-router-dom'; // Added Link

export default function Header() {
  return (
    <header className="bg-green-600 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">Farm<span className="text-green-300">vest</span></span>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 12s4-8 9-8 9 8 9 8-4 8-9 8-9-8-9-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 font-semibold text-green-100">
          <a href="#" className="hover:text-white">Marketplace</a>
          <a href="#" className="hover:text-white">Services</a>
          <a href="#" className="hover:text-white">Farms</a>
          <a href="#" className="hover:text-white">Experts</a>
        </nav>

        {/* Search + Auth Buttons */}
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Products"
              className="rounded-md px-4 py-1 md:py-2 text-sm md:text-base w-40 md:w-60 focus:outline-none text-green-900"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 21l-4.35-4.35" />
                <circle cx="10" cy="10" r="7" />
              </svg>
            </button>
          </div>
          <Link
            to="/login"
            className="border border-white rounded px-3 py-1 hover:bg-green-500 text-white"
          >
            Login
          </Link>
          <Link
            to="/getstarted"
            className="bg-white text-green-700 rounded px-3 py-1 hover:bg-green-200"
          >
            Register
          </Link>
        </div>

        {/* Mobile nav (toggle can be added later) */}
      </div>
    </header>
  );
}