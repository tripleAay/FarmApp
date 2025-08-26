import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sample testimonials (replace with API data if available)
const sampleTestimonials = [
  {
    text: "Farm Marketplace brings fresh yam and veggies straight to my door. No wahala, just pure quality!",
    name: "Chinedu Okonkwo",
    role: "Farmer, Enugu",
    verified: true,
  },
  {
    text: "This platform is like Onitsha Market online! Palm oil, garri, everything fresh and easy to order.",
    name: "Aminat Bello",
    role: "Trader, Lagos",
    verified: true,
  },
  {
    text: "I found the best farm tools here. I dey recommend Farm Marketplace to all my people!",
    name: "Emeka Nwosu",
    role: "Agricultural Marketer, Abuja",
    verified: false,
  },
  {
    text: "Tomatoes and peppers from here make my stew taste like home. Fast delivery, no stress!",
    name: "Funmi Adebayo",
    role: "Home Cook, Ibadan",
    verified: true,
  },
  {
    text: "The quality of their grains is top-notch. My customers keep coming back for more!",
    name: "Sani Yusuf",
    role: "Market Vendor, Kano",
    verified: true,
  },
  {
    text: "Farm Marketplace connects me to farmers directly. It’s a game-changer for my business!",
    name: "Ngozi Eze",
    role: "Retailer, Port Harcourt",
    verified: false,
  },
];

const Testimonial = ({ testimonials = sampleTestimonials }) => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const testimonialsPerPage = 3; // Show 3 testimonials at a time
  const totalGroups = Math.ceil(testimonials.length / testimonialsPerPage);

  // Auto-scroll every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentGroup((prev) => (prev + 1) % totalGroups);
    }, 8000);
    return () => clearInterval(timer);
  }, [totalGroups]);

  const goToPrev = () => {
    setDirection(-1);
    setCurrentGroup((prev) => (prev - 1 + totalGroups) % totalGroups);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentGroup((prev) => (prev + 1) % totalGroups);
  };

  // Get current group of testimonials
  const currentTestimonials = testimonials.slice(
    currentGroup * testimonialsPerPage,
    (currentGroup + 1) * testimonialsPerPage
  );

  // Animation variants
  const cardVariants = {
    enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -100 : 100, opacity: 0 }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <ToastContainer position="bottom-right" autoClose={3000} />
      {/* Background Leaf Accent */}
      <motion.div
        className="absolute inset-0 opacity-5 pointer-events-none"
        animate={{
          backgroundImage: [
            "radial-gradient(circle at 20% 30%, rgba(74, 222, 128, 0.1), transparent)",
            "radial-gradient(circle at 80% 70%, rgba(74, 222, 128, 0.1), transparent)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.div
          className="absolute top-12 left-12 text-green-300/10"
          animate={{ rotate: [0, 10, -10, 0], y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Leaf className="w-10 h-10" />
        </motion.div>
        <motion.div
          className="absolute bottom-12 right-12 text-green-300/10"
          animate={{ rotate: [0, -10, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <Leaf className="w-10 h-10" />
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 tracking-tight drop-shadow-md">
            Real Stories, Real Impact
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            From bustling markets to rural farms, hear how Farm Marketplace is transforming lives across Nigeria.
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentGroup}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
            custom={direction}
            variants={{
              enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (direction) => ({ x: direction > 0 ? -100 : 100, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {currentTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500 relative"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Verified Badge */}
                {testimonial.verified && (
                  <motion.div
                    className="absolute top-4 right-4 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Leaf className="w-4 h-4" />
                    Verified
                  </motion.div>
                )}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="text-green-600 font-semibold text-sm sm:text-base mt-1">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <motion.p
                  className="text-gray-700 text-sm sm:text-base leading-relaxed"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  "{testimonial.text}"
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <motion.button
          className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 bg-green-600/50 rounded-full p-3 sm:p-4 hover:bg-green-700/70 transition-colors"
          onClick={goToPrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </motion.button>
        <motion.button
          className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 bg-green-600/50 rounded-full p-3 sm:p-4 hover:bg-green-700/70 transition-colors"
          onClick={goToNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next testimonials"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </motion.button>

        {/* Indicators */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8">
          {Array.from({ length: totalGroups }).map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full cursor-pointer transition-colors ${
                index === currentGroup ? "bg-green-400" : "bg-gray-300"
              }`}
              onClick={() => {
                setDirection(index > currentGroup ? 1 : -1);
                setCurrentGroup(index);
              }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
              role="button"
              aria-label={`Go to testimonial group ${index + 1}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setCurrentGroup(index)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/shop">
            <motion.button
              className="bg-green-600 text-white px-8 sm:px-10 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-green-700 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(74, 222, 128, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Shop fresh produce"
            >
              Shop Fresh Produce
            </motion.button>
          </Link>
          <Link to="/community">
            <motion.button
              className="bg-transparent border border-green-300 text-green-300 px-8 sm:px-10 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-green-300 hover:text-green-900 transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(74, 222, 128, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Join our community"
            >
              Join Our Community
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Example usage
export default function App() {
  return <Testimonial testimonials={sampleTestimonials} />;
}