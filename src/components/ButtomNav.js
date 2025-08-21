import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaClock,
  FaUser,
  FaPlus,
  FaArrowLeft,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function BottomNav({ activeTab = "home" }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const tabs = [
    { id: "home", label: "Home", icon: <FaHome />, path: "/dashboard" },
    { id: "cart", label: "Cart", icon: <FaShoppingCart />, path: "/cart" },
    { id: "waitlist", label: "Waitlist", icon: <FaClock />, path: "/products" },
    { id: "profile", label: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  const handleTabClick = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 800);
  };

  const handleFabClick = () => {
    const confirmed = window.confirm("Add a new product to your store?");
    if (confirmed) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/products-add");
        window.alert("Redirecting to add product...");
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="relative">
      {/* Desktop Sidebar Trigger Zone */}
      <motion.div
        className="hidden md:block fixed top-0 right-0 h-full w-4 z-[100]"
        onMouseEnter={() => setIsSidebarVisible(true)}
      >
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 left-1 text-green-300"
          animate={{ x: [-2, 2, -2], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaArrowLeft className="text-sm" />
        </motion.div>
      </motion.div>

      {/* Desktop Sidebar */}
      <AnimatePresence>
        {isSidebarVisible && (
          <motion.nav
            className="fixed top-0 right-0 h-full w-20 bg-gradient-to-b from-green-900 to-green-800 flex-col items-center py-6 z-[100] shadow-2xl"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onMouseLeave={() => setIsSidebarVisible(false)}
          >
            <ul className="flex flex-col space-y-6">
              {tabs.map((tab) => (
                <motion.li
                  key={tab.id}
                  onClick={() => handleTabClick(tab.path)}
                  className={`flex flex-col items-center text-sm cursor-pointer transition-all duration-300 relative
                    ${
                      activeTab === tab.id
                        ? "text-white bg-green-700 rounded-lg p-2 shadow-md"
                        : "text-gray-300 hover:text-white"
                    }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Navigate to ${tab.label}`}
                >
                  <motion.div
                    className="text-2xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    {tab.icon}
                  </motion.div>
                  <span className="text-xs mt-1 font-medium">{tab.label}</span>

                  {/* Tooltip */}
                  <motion.div
                    className="absolute right-24 top-1/2 -translate-y-1/2 bg-green-700 text-white text-xs rounded px-3 py-1 shadow-md"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {tab.label}
                  </motion.div>
                </motion.li>
              ))}
            </ul>

            {/* Floating Add Button */}
            <motion.div
              className="absolute bottom-6 bg-green-600 rounded-full p-3 shadow-lg cursor-pointer ring-2 ring-green-400/50"
              onClick={handleFabClick}
              whileHover={{ scale: 1.2, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 rgba(34,197,94,0)",
                  "0 0 15px rgba(34,197,94,0.6)",
                  "0 0 0 rgba(34,197,94,0)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              aria-label="Add new product"
            >
              <FaPlus className="text-white text-xl" />
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <motion.nav
        className="md:hidden fixed bottom-0 left-0 w-full bg-green-900 z-[100] shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ul className="flex justify-around items-center py-3 px-2">
          {tabs.map((tab) => (
            <motion.li
              key={tab.id}
              onClick={() => handleTabClick(tab.path)}
              className={`flex flex-col items-center text-sm cursor-pointer transition-all duration-300
                ${
                  activeTab === tab.id
                    ? "text-white bg-green-700 rounded-lg p-2"
                    : "text-gray-300 hover:text-white"
                }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Navigate to ${tab.label}`}
            >
              <motion.div
                className="text-xl"
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {tab.icon}
              </motion.div>
              <span className="font-medium">{tab.label}</span>
            </motion.li>
          ))}
        </ul>

        {/* Floating Add Button */}
        <motion.div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-600 rounded-full p-3 shadow-lg cursor-pointer"
          onClick={handleFabClick}
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Add new product"
        >
          <FaPlus className="text-white text-xl" />
        </motion.div>
      </motion.nav>

      {/* Loading Spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[150]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-12 h-12 border-4 border-t-green-500 border-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BottomNav;
