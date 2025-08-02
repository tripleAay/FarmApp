import React from 'react';
import livestock from '../assets/images/annie-spratt-2INKkSrEmc8-unsplash.jpg';
import fish from '../assets/images/gregor-moser-QGIJUqnEpCY-unsplash.jpg';
import corn from '../assets/images/shraddha-kulkarni-BkaTsvOwa-4-unsplash.jpg';
import tomato from '../assets/images/immo-wegmann-S-de8PboZmI-unsplash.jpg';

const Gateway = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center transform transition-all duration-300 hover:shadow-2xl">
        {/* Left Section - Text Content */}
        <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-2 leading-tight">
            Are You a Farmer?
          </h1>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Every new member strengthens our marketplace, broadening our community of buyers and expanding opportunities. Join us to embark on a journey toward shared success and let us support your growth.
          </p>
          <button className="bg-yellow-500 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-md">
            Sign up for Free Today →
          </button>
        </div>

        {/* Right Section - Image and Icons */}
        <div className="w-full md:w-1/2 relative">
          {/* Main Image */}
          <img
            src={livestock}
            alt="Farmer with livestock"
            className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-b-2xl md:rounded-none"
          />
          {/* Overlay Icons */}
          <div className="absolute bottom-6 right-6 flex space-x-3">
            <img
              src={tomato}
              alt="Tomato"
              className="w-14 h-14 rounded-full border-2 border-white shadow-lg transform hover:scale-110 transition-transform duration-300"
            />
            <img
              src={corn}
              alt="Corn"
              className="w-14 h-14 rounded-full border-2 border-white shadow-lg transform hover:scale-110 transition-transform duration-300"
            />
            <img
              src={fish}
              alt="Fish"
              className="w-14 h-14 rounded-full border-2 border-white shadow-lg transform hover:scale-110 transition-transform duration-300"
            />
          </div>
          {/* Mockup Screens */}
          <div className="absolute top-6 right-6 flex flex-col space-y-3">
            <div className="bg-gray-50 p-3 rounded-xl shadow-lg">
              <p className="text-sm font-medium text-gray-800">Yemi Farmer Farm</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl shadow-lg">
              <p className="text-sm font-medium text-gray-800">Fresh Produce</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gateway;