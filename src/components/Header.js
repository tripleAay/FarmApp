import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingCart, User, Leaf, ChevronLeft } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // To detect current route for back button
  const [cartCount, setCartCount] = useState(0); // Placeholder for cart item count

  // Fetch cart count (placeholder; replace with actual API call)
  useEffect(() => {
    // Example: Fetch cart count from backend
    // const fetchCartCount = async () => {
    //   try {
    //     const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
    //     setCartCount(res.data.items.length);
    //   } catch (error) {
    //     console.error("Failed to fetch cart count:", error);
    //   }
    // };
    // fetchCartCount();
    setCartCount(3); // Mock data for demo
  }, []);

  // Current time and date (EST for American audience)
  const currentTime = new Date().toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  });
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Determine if back button should be shown (e.g., on product details page)
  const showBackButton = location.pathname.includes("/product/");

  return (
    <motion.header
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-700 to-green-600 shadow-lg z-50 overflow-hidden"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background Leaf Animation */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        animate={{
          backgroundImage: [
            "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.2), transparent)",
            "radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.2), transparent)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.div
          className="absolute top-4 left-4 text-white/20"
          animate={{ rotate: [0, 10, -10, 0], y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Leaf className="w-6 h-6" />
        </motion.div>
        <motion.div
          className="absolute bottom-4 right-4 text-white/20"
          animate={{ rotate: [0, -10, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <Leaf className="w-6 h-6" />
        </motion.div>
      </motion.div>

      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4 relative">
        {/* Left: Back Button (Conditional) & Logo */}
        <div className="flex items-center gap-4">
          {showBackButton && (
            <motion.button
              onClick={() => window.history.back()}
              className="flex items-center text-white hover:text-green-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <motion.span
              className="bg-white text-green-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-2xl ring-2 ring-green-300/50"
              whileHover={{ scale: 1.15, rotateY: 180 }}
              animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0 rgba(74, 222, 128, 0)", "0 0 15px rgba(74, 222, 128, 0.5)", "0 0 0 rgba(74, 222, 128, 0)"] }}
              transition={{ duration: 0.3, scale: { repeat: Infinity, duration: 1.5 } }}
            >
              F
            </motion.span>
            <motion.span
              className="text-xl md:text-2xl font-semibold text-white"
              whileHover={{ color: "#E5FCF5", scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Farm <span className="text-green-300">Marketplace</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-green-300 w-0"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </Link>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-grow max-w-md mx-6 relative">
          <div className="relative w-full">
            <motion.input
              type="text"
              placeholder="Search fresh produce..."
              className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-green-300 bg-white/95 backdrop-blur-md focus:ring-2 focus:ring-green-400 focus:outline-none text-sm text-gray-800 shadow-md"
              whileFocus={{ scale: 1.03, borderColor: "#4ADE80" }}
              transition={{ duration: 0.2 }}
              aria-label="Search products"
            />
            <motion.button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600"
              whileHover={{ scale: 1.3, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <motion.div
                className="absolute -top-8 right-0 bg-green-600 text-white text-xs rounded px-2 py-1 shadow-md"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Search
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Right Side: Navigation, Icons, and Auth */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 font-semibold text-green-100">
            {["Marketplace", "Services", "Farms", "Experts"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ color: "#FFFFFF", scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={`/${item.toLowerCase()}`} className="relative">
                  {item}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-green-300 w-0"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Date/Time (Desktop) */}
          <motion.div
            className="hidden md:block text-xs text-white/90 font-medium"
            animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentTime} EDT, {currentDate}
          </motion.div>

          {/* Cart Icon */}
          <Link to="/cart">
            <motion.button
              className="text-white hover:text-green-300 relative"
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {cartCount}
                </motion.span>
              )}
              <motion.div
                className="absolute -top-8 right-0 bg-green-600 text-white text-xs rounded px-2 py-1 shadow-md"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Cart
              </motion.div>
            </motion.button>
          </Link>

          {/* Profile Icon */}
          <Link to="/profile">
            <motion.button
              className="text-white hover:text-green-300 relative"
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              aria-label="User profile"
            >
              <User className="w-5 h-5" />
              <motion.div
                className="absolute -top-8 right-0 bg-green-600 text-white text-xs rounded px-2 py-1 shadow-md"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Profile
              </motion.div>
            </motion.button>
          </Link>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="border border-white rounded px-3 py-1 text-sm text-white hover:bg-green-500 transition"
            >
              Login
            </Link>
            <Link
              to="/getstarted"
              className="bg-white text-green-700 rounded px-3 py-1 text-sm hover:bg-green-200 transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-green-300 relative"
            whileHover={{ scale: 1.3, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
            <motion.div
              className="absolute -top-8 right-0 bg-green-600 text-white text-xs rounded px-2 py-1 shadow-md"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              Menu
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-green-50 border-t border-green-100 px-4 pb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile Search */}
            <div className="relative mt-3">
              <motion.input
                type="text"
                placeholder="Search fresh produce..."
                className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-green-300 bg-white/95 backdrop-blur-md focus:ring-2 focus:ring-green-600 focus:outline-none text-sm text-gray-800 shadow-md"
                whileFocus={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                aria-label="Search products"
              />
              <motion.button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            <nav className="mt-4 space-y-2">
              {["Marketplace", "Services", "Farms", "Experts", "Login", "Register"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    to={item === "Login" ? "/login" : item === "Register" ? "/getstarted" : `/${item.toLowerCase()}`}
                    className="block text-green-800 font-medium hover:text-green-600 relative"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-0.5 bg-green-600 w-0"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;