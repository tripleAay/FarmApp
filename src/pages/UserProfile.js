import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  const dummyUser = {
    fullName: 'Adeshina Shina',
    email: 'shina@example.com',
    phoneNumber: '+234 701 234 5678',
    profilePicture: null,
    walletBalance: 12000,
  };

  const currentUser = user || dummyUser;

  const {
    fullName,
    email,
    phoneNumber,
    profilePicture,
    walletBalance = 0,
  } = currentUser;

  const firstName = fullName?.split(' ')[0] || 'User';
  const avatar = profilePicture
    ? URL.createObjectURL(profilePicture)
    : `https://ui-avatars.com/api/?name=${firstName}&background=FFA500&color=fff`;

  const handleBack = () => navigate(-1);
  const handleEditProfile = () => {
    alert('Edit Profile coming soon!'); // Replace with modal or redirect to edit page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-orange-100 to-yellow-100 p-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-4 flex items-center text-green-700 hover:text-green-900 transition"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-xl max-w-2xl mx-auto overflow-hidden transition hover:shadow-2xl">
        {/* Top Banner */}
        <div className="bg-green-600 text-white py-6 px-8 text-center relative">
          <h2 className="text-3xl font-bold">Welcome, {firstName} 👋</h2>
          <p className="text-sm mt-1 opacity-90">Your farm fresh journey continues here.</p>

          {/* Edit Profile Button */}
          <button
            onClick={handleEditProfile}
            className="absolute top-4 right-4 bg-white text-green-700 p-2 rounded-full shadow hover:bg-green-100 transition"
            title="Edit Profile"
          >
            <FaEdit />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center p-8">
          <img
            src={avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-green-500 object-cover shadow-lg mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800">{fullName}</h3>
          <p className="text-gray-600">{email}</p>
          <p className="text-gray-600">{phoneNumber}</p>

          {/* Wallet Card */}
          <div className="mt-6 bg-orange-100 border border-orange-300 rounded-lg p-4 w-full max-w-sm text-center shadow-md">
            <h4 className="text-lg font-semibold text-orange-800">Wallet Balance</h4>
            <p className="text-2xl font-bold text-orange-900 mt-2">₦{walletBalance.toLocaleString()}</p>
            <button className="mt-3 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition">
              Top Up Wallet
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="border-t px-8 py-4 text-sm text-gray-700 flex flex-col gap-2">
          <a href="/orders" className="hover:text-green-600 transition">🧺 View My Orders</a>
          <a href="/cart" className="hover:text-green-600 transition">🛒 My Cart</a>
          <a href="/settings" className="hover:text-green-600 transition">⚙️ Account Settings</a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
