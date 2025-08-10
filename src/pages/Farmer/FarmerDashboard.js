import React from 'react';
import { Link } from 'react-router-dom'; // Added for client-side routing
import DashHead from '../../components/DashHead';
import FarmerProfile from './FarmerProfile'; // Assumes FarmerProfile expects a `user` prop (optional)

// Dummy user data in case database isn't ready
const dummyUser = {
  fullName: 'Adeshina Adeniyi',
  email: 'adeshina@example.com',
  phoneNumber: '+2348012345678',
  walletBalance: 50000,
  profilePicture: null,
};

function FarmerDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 mt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6 text-green-800">Farmer Panel</h2>
        <nav className="space-y-4 text-gray-700 font-medium">
          <Link to="/products-display" className="hover:text-green-600 block">📦 My Products</Link>
          <Link to="/farmer-order" className="hover:text-green-600 block">🛒 Orders</Link>
          <Link to="/products-add" className="hover:text-green-600 block">➕ Add Product</Link>
          <a href="#wallet" className="hover:text-green-600 block">💰 Wallet</a>
          <a href="#messages" className="hover:text-green-600 block">💬 Messages</a>
          <a href="#settings" className="hover:text-green-600 block">⚙️ Settings</a>
          <a href="#support" className="hover:text-green-600 block">🛠️ Support</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <DashHead />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
          {[
            { label: 'Total Products Listed', value: 12 },
            { label: 'Pending Orders', value: 3 },
            { label: 'Total Earnings', value: '₦50,000' },
            { label: 'Products Sold', value: 20 },
          ].map((item, index) => (
            <div key={index} className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
              <div className="text-2xl font-bold">{item.value}</div>
              <p>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders and Stock Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">📥 Recent Orders</h3>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md text-sm">
              <span>#12345</span>
              <span>Plantain Bunch</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Pending</span>
              <span>Aug 4</span>
            </div>
          </section>

          <section className="bg-yellow-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">⚠️ Stock Alert</h3>
            <p className="text-yellow-800 font-medium">Tomatoes — Only 3 left!</p>
          </section>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {[
            'Add New Product',
            'Withdraw Earnings',
            'Contact Support',
          ].map((action, idx) => (
            <div key={idx} className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
              <button className="text-green-700 font-semibold hover:underline">
                {action}
              </button>
            </div>
          ))}
        </div>

        {/* Profile Summary */}
        <div className="mt-10">
          <FarmerProfile user={dummyUser} />
        </div>
      </main>
    </div>
  );
}

export default FarmerDashboard;