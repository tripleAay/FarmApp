import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios
  from 'axios';
function UserHead({ location = 'Unknown', balance = 0, cartItems = 0 }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dummyTexts = [
    'Welcome to Farm Mgt!',
    'Explore our products',
    'Check your orders',
    'Happy farming!',
  ];
  const [currentText, setCurrentText] = useState(0);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('loggedInId');
      const role = localStorage.getItem('userRole'); // 'buyer' or 'farmer'

      if (!token || !userId || !role) {
        throw new Error('Not authenticated');
      }

      const endpoint = role === 'buyer'
        ? `/api/farmers/user/${userId}`
        : `/api/farmers/${userId}`;

      const response = await axios.get(`http://localhost:5000${endpoint}`);
      const result = response.data;

      setUser(result.founduser || result.farmer);
      console.log(result);

    } catch (error) {
      console.error('Fetch User Error:', error);
      toast.error('Failed to load user data', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      setUser({ fullName: 'Guest', profilePicture: null });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    fetchUser();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dummyTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b py-3 px-4 shadow-sm z-30 mt-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Profile Picture */}
          <div className="relative group">
            {loading ? (
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            ) : user && user.profilePicture ? (
              <img
                src={`http://localhost:5000${user.profilePicture}`}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
                onError={() => setUser({ ...user, profilePicture: null })}
              />
            ) : (
              <FaUserCircle
                className="text-4xl text-gray-600 hover:text-blue-500 transition duration-200 cursor-pointer"
                aria-label="User Profile"
              />
            )}
            <div className="absolute top-10 left-0 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              View Profile
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-wrap gap-1 text-sm font-medium truncate">
            <span className="text-gray-900 truncate">
              Hello, <strong>{loading ? 'Loading...' : user?.fullName || 'Guest'}</strong>
            </span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="text-gray-600 truncate">{location}</span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="text-green-600">₦{balance.toLocaleString('en-NG')}</span>
          </div>
        </div>

        {/* Center Section - Rotating Text */}
        <div className="absolute left-1/2 -translate-x-1/2 max-w-[80%] sm:max-w-none text-center">
          <span className="text-sm sm:text-base text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full shadow animate-fadeIn truncate">
            {dummyTexts[currentText]}
          </span>
        </div>

        {/* Right Section - Cart */}
        <div className="relative group">
          <div className="relative">
            <FaShoppingCart
              className="text-xl text-gray-600 hover:text-blue-500 transition-transform duration-200 cursor-pointer"
              aria-label="Shopping Cart"
            />
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cartItems}
              </span>
            )}
          </div>
          <div className="absolute top-8 right-0 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            View Cart
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserHead;