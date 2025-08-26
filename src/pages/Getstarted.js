import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Tractor, Utensils } from "lucide-react";

// Placeholder image (replace with local asset if available)
const smileTrader = "https://images.unsplash.com/photo-1516594798947-e65505ebb29a?q=80&w=1920";

const GetStarted = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleFarmerClick = () => {
    navigate("/farmer");
  };

  const handleFoodieClick = () => {
    navigate("/foodie");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)", transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${smileTrader})`,
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-[#57C785]"></div>

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
          className="absolute top-12 left-12 sm:left-16 text-white/20"
          animate={{ rotate: [0, 10, -10, 0], y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Leaf className="w-10 h-10 sm:w-12 sm:h-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-12 right-12 sm:right-16 text-white/20"
          animate={{ rotate: [0, -10, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <Leaf className="w-10 h-10 sm:w-12 sm:h-12" />
        </motion.div>
      </motion.div>

      {/* Desktop View */}
      <div className="hidden md:flex min-h-screen items-center justify-center px-6 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-24">
        <motion.div
          className="bg-white/95 rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 max-w-6xl w-full backdrop-blur-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Section - Text and Options */}
            <div className="space-y-8">
              <motion.div className="text-center lg:text-left" variants={textVariants}>
                <Link to="/" className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                  <motion.span
                    className="bg-white text-green-700 rounded-full w-14 h-14 flex items-center justify-center font-bold text-2xl shadow-lg ring-2 ring-green-300/50"
                    whileHover={{ scale: 1.15, rotateY: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    F
                  </motion.span>
                  <h1 className="text-3xl sm:text-4xl font-bold text-green-800">
                    Farm<span className="text-green-300">Marketplace</span>
                  </h1>
                </Link>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-800 leading-tight drop-shadow-md">
                  Your Farm Marketplace Adventure Starts Here
                </h2>
                <p className="text-gray-600 text-base sm:text-lg lg:text-xl mt-4 max-w-lg leading-relaxed">
                  Join Nigeria’s thriving community of farmers and foodies. Whether you grow the freshest produce or crave authentic flavors, we’ve got you covered!
                </p>
                <motion.div
                  className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" />
                  <span>Trusted by 50,000+ farmers and foodies</span>
                </motion.div>
              </motion.div>
              <div className="space-y-4">
                <motion.button
                  className="w-full bg-yellow-400 text-green-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-yellow-500 shadow-md"
                  onClick={handleFarmerClick}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Join as a Farmer"
                >
                  I’m a Farmer
                </motion.button>
                <motion.button
                  className="w-full bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-green-700 shadow-md"
                  onClick={handleFoodieClick}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Join as a Foodie"
                >
                  I’m a Foodie
                </motion.button>
                <motion.button
                  className="w-full bg-transparent border-2 border-green-300 text-green-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-green-300 hover:text-green-900 transition-all duration-300"
                  onClick={handleCancel}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Cancel and return to home"
                >
                  Cancel
                </motion.button>
              </div>
            </div>

            {/* Right Section - Image */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={smileTrader}
                alt="Farm produce trader smiling in a vibrant market"
                className="w-full max-w-lg h-auto rounded-2xl shadow-lg object-cover"
                onError={(e) => {
                  e.target.src = "https://shorturl.at/uWcyJ";
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
        <motion.div
          className="bg-white/95 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full backdrop-blur-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-8" variants={textVariants}>
            <Link to="/" className="flex items-center justify-center gap-2 mb-4">
              <motion.span
                className="bg-white text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg ring-2 ring-green-300/50"
                whileHover={{ scale: 1.15, rotateY: 180 }}
                transition={{ duration: 0.3 }}
              >
                F
              </motion.span>
              <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
                Farm<span className="text-green-300">Marketplace</span>
              </h1>
            </Link>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-green-800 mb-3 leading-tight drop-shadow-md">
              Kickstart Your Journey
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              Are you a farmer or a foodie? Choose your path to unlock fresh produce and vibrant communities.
            </p>
          </motion.div>

          {/* Selection Cards */}
          <div className="space-y-6 mb-8">
            <motion.div
              className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={handleFarmerClick}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              role="button"
              aria-label="Join as a Farmer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Tractor className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">I’m a Farmer</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Grow, sell, and connect with buyers</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={handleFoodieClick}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              role="button"
              aria-label="Join as a Foodie"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-400 rounded-full flex items-center justify-center">
                  <Utensils className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">I’m a Foodie</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Savor fresh, local produce</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cancel Button */}
          <motion.button
            className="w-full bg-transparent border-2 border-green-300 text-green-300 px-6 py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-green-300 hover:text-green-900 transition-all duration-300"
            onClick={handleCancel}
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Cancel and return to home"
          >
            Cancel
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default GetStarted;