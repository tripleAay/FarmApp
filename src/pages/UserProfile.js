import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  // Define avatar and related logic at the top level
  const firstName = user?.fullName?.split(' ')[0] || 'User';
  const avatar = user?.profilePicture
    ? typeof user.profilePicture === 'string'
      ? user.profilePicture
      : URL.createObjectURL(user.profilePicture)
    : `https://ui-avatars.com/api/?name=${firstName}&background=FFA500&color=fff`;

  // Clean up URL.createObjectURL to prevent memory leaks
  useEffect(() => {
    if (user?.profilePicture && typeof user.profilePicture !== 'string') {
      return () => {
        URL.revokeObjectURL(avatar);
      };
    }
  }, [user?.profilePicture, avatar]);

  // Handle case where user prop is not provided
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-green-100 via-orange-100 to-yellow-100 p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl mx-auto p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800">No User Data Available</h3>
          <p className="text-gray-600 mt-2">Please log in or provide user information to view your profile.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const { fullName, email, phoneNumber, walletBalance = 0 } = user;

  const handleBack = () => navigate(-1);
  const handleEditProfile = () => navigate('/edit-profile');
  const handleTopUpWallet = () => navigate('/wallet/top-up');

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-orange-100 to-yellow-100 p-4 sm:p-6 md:p-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-4 flex items-center text-green-700 hover:text-green-900 transition"
        aria-label="Go back"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-xl max-w-2xl mx-auto overflow-hidden transition hover:shadow-2xl">
        {/* Top Banner */}
        <div className="bg-green-600 text-white py-6 px-8 text-center relative">
          <h2 className="text-3xl font-bold">Welcome, {firstName} 👋</h2>
          <p className="text-sm mt-1 opacity-90">Your farm fresh journey continues here.</p>
          <button
            onClick={handleEditProfile}
            className="absolute top-4 right-4 bg-white text-green-700 p-2 rounded-full shadow hover:bg-green-100 transition"
            aria-label="Edit Profile"
            title="Edit Profile"
          >
            <FaEdit />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center p-8">
          <img
            src={avatar}
            alt={`${fullName || 'User'}'s profile picture`}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-green-500 object-cover shadow-lg mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800">{fullName || 'Unknown User'}</h3>
          <p className="text-gray-600">{email || 'No email provided'}</p>
          <p className="text-gray-600">{phoneNumber || 'No phone number provided'}</p>

          {/* Wallet Card */}
          <div className="mt-6 bg-orange-100 border border-orange-300 rounded-lg p-4 w-full max-w-sm text-center shadow-md">
            <h4 className="text-lg font-semibold text-orange-800">Wallet Balance</h4>
            <p className="text-2xl font-bold text-orange-900 mt-2">
              ₦{(walletBalance >= 0 ? walletBalance : 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </p>
            <button
              onClick={handleTopUpWallet}
              className="mt-3 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
            >
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

UserProfile.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    profilePicture: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
    walletBalance: PropTypes.number,
  }),
};

export default UserProfile;