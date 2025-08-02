import React from 'react';
import plantain from '../assets/images/chuttersnap-zQWuVlP_bNI-unsplash.jpg'; 
import yam from '../assets/images/yam.jpg'; 
import melonseed from '../assets/images/david-gabrielyan-ta_JSWGh8sQ-unsplash.jpg';
import pepper from '../assets/images/joanna-kosinska-hkRU8viMpRA-unsplash.jpg';

const Product = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800">Top Products</h2>
          
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Product 1: Yam */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src= {yam}
              alt="Fresh Yam"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Fresh Nigerian Yam</h3>
              <p className="text-green-600 bg-green-100 inline-block px-2 py-1 rounded-full text-sm mt-2">
                Available Now
              </p>
              <p className="text-gray-600 text-sm mt-2">Min order: 50kg</p>
              <p className="text-yellow-600 font-medium mt-1">₦2,500 / 50kg</p>
              <p className="text-gray-500 text-xs mt-1">Olu Farms, Ibadan, Oyo</p>
            </div>
          </div>

          {/* Product 2: Plantain */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src= {plantain}
              alt="Ripe Plantain"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Ripe Plantain Bunch</h3>
              <p className="text-green-600 bg-green-100 inline-block px-2 py-1 rounded-full text-sm mt-2">
                Available Now
              </p>
              <p className="text-gray-600 text-sm mt-2">Min order: 20kg</p>
              <p className="text-yellow-600 font-medium mt-1">₦1,800 / 20kg</p>
              <p className="text-gray-500 text-xs mt-1">Ayo Farms, Lagos</p>
            </div>
          </div>

          {/* Product 3: Scotch Bonnet Pepper */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src= {pepper}
              alt="Scotch Bonnet Pepper"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Scotch Bonnet Pepper</h3>
              <p className="text-green-600 bg-green-100 inline-block px-2 py-1 rounded-full text-sm mt-2">
                Available Now
              </p>
              <p className="text-gray-600 text-sm mt-2">Min order: 10kg</p>
              <p className="text-yellow-600 font-medium mt-1">₦3,000 / 10kg</p>
              <p className="text-gray-500 text-xs mt-1">Chika Farms, Enugu</p>
            </div>
          </div>

          {/* Product 4: Melon Seeds */}
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src= {melonseed}
              alt="Melon Seeds"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Egusi Melon Seeds</h3>
              <p className="text-green-600 bg-green-100 inline-block px-2 py-1 rounded-full text-sm mt-2">
                Available Now
              </p>
              <p className="text-gray-600 text-sm mt-2">Min order: 5kg</p>
              <p className="text-yellow-600 font-medium mt-1">₦1,200 / 5kg</p>
              <p className="text-gray-500 text-xs mt-1">Tunde Farms, Kano</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;