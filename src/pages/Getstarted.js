import React from 'react';
import { useNavigate } from 'react-router-dom';
import smileTrader from '../assets/images/tobias-nii-kwatei-quartey-rpcCF2Asrx8-unsplash.jpg';

const GetStarted = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>

      {/* Desktop View */}
      <div className="hidden md:flex min-h-screen items-center justify-center px-12 py-16">
        <div className="bg-white/95 rounded-3xl shadow-2xl p-12 max-w-4xl w-full transform transition-all duration-500 hover:shadow-3xl">
          <div className="grid grid-cols-2 gap-30 items-center">
            {/* Left Section - Text and Options */}
            <div className="space-y-8">
              <h1 className="text-5xl font-extrabold text-green-900 mb-4 leading-tight text-shadow-lg">
                Start Your FarmProduceMart Journey
              </h1>
              <p className="text-gray-700 text-lg max-w-md leading-relaxed text-shadow">
                Let us tailor your experience by identifying your role—connect with Nigeria’s finest farmers or savor the freshest produce.
              </p>
              <div className="space-y-6">
                <button className="splash-button w-full bg-yellow-500 text-white px-8 py-4 rounded-xl font-semibold text-xl hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  I’m a Farmer
                </button>
                <button className="splash-button w-full bg-green-500 text-white px-8 py-4 rounded-xl font-semibold text-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  I’m a Foodie
                </button>
              </div>
              <button
                className="splash-button w-full bg-red-500 text-white px-6 py-3 rounded-xl font-medium text-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>

            {/* Right Section - Image */}
            <div className="flex justify-end">
              <img
                src={smileTrader}
                alt="Farm produce trader"
                className="w-[28rem] h-[28rem] object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden min-h-screen flex items-center justify-center px-6 py-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full transform transition-all duration-300 hover:scale-105">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-green-800 mb-2 leading-tight">
              Let’s Get Started On Your Journey
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tell us who you are, so we can tailor your Farmers’ Market experience.
            </p>
          </div>

          {/* Selection Cards */}
          <div className="flex flex-col space-y-6 mb-8">
            {/* Farmer Card */}
            <div className="bg-gradient-to-br from-yellow-200 to-orange-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">I’m a Farmer</h3>
                  <p className="text-gray-600 text-sm">For those who grow the goodness</p>
                </div>
              </div>
            </div>

            {/* Foodie Card */}
            <div className="bg-gradient-to-br from-green-200 to-lime-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">I’m a Foodie</h3>
                  <p className="text-gray-600 text-sm">For those who savor the goodness</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cancel Button */}
          <button
            className="splash-button w-full bg-red-500 text-white px-6 py-3 rounded-xl font-medium text-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-md"
            onClick={handleCancel}
          >
            Cancel
          </button>

          {/* Decorative Elements */}
          <div className="absolute top-6 left-6 text-green-600 text-xs opacity-50 animate-pulse">
            5:23 PM WAT, Jul 31, 2025
          </div>
          <div className="absolute bottom-6 right-6 flex space-x-2">
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-200"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-400"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;