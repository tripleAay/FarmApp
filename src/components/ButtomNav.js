import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaShoppingCart, FaUser, FaClock } from 'react-icons/fa';

function BottomNav({ activeTab = 'home' }) {
  const navigate = useNavigate();

  const tabs = [
    { id: 'home', label: 'Home', icon: <FaHome />, path: '/dashboard' },
    { id: 'cart', label: 'Cart', icon: <FaShoppingCart />, path: '/cart' },
    { id: 'Waitlist', label: 'Waitlist', icon: <FaClock />, path: '/products' },
    { id: 'profile', label: 'Profile', icon: <FaUser />, path: '/profile' },
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 shadow-sm">
      <ul className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className={`flex flex-col items-center text-sm cursor-pointer transition-colors ${activeTab === tab.id ? 'text-green-600' : 'text-gray-500'
              }`}
          >
            <div className="text-xl">{tab.icon}</div>
            <span>{tab.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNav;
