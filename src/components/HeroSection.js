import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";

// Farm-themed images (using Unsplash URLs for reliability; replace with local assets)
const slides = [
  {
    image: "https://shorturl.at/Jj8i0",
    title: "Freshly Harvested for You",
    subtitle: "Discover farm-fresh produce delivered straight to your door",
    ctaText: "Shop Fresh Now",
    ctaLink: "/shop",
  },
  {
    image: "https://shorturl.at/sjkXt",
    title: "Pure Organic Excellence",
    subtitle: "Sustainably sourced, naturally grown delights",
    ctaText: "Explore Organic",
    ctaLink: "/products?category=organic",
  },
  {
    image: "https://images.unsplash.com/photo-1500932334442-8761ee4810a7?q=80&w=1920",
    title: "Empower Local Farmers",
    subtitle: "Support our vibrant farming community in Nigeria",
    ctaText: "Meet Our Farmers",
    ctaLink: "/farms",
  },
  {
    image: "https://shorturl.at/TLOZg",
    title: "From Farm to Your Table",
    subtitle: "Taste the essence of freshness with every bite",
    ctaText: "Discover More",
    ctaLink: "/products",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState({});

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Handle image load errors
  const handleImageError = (index) => {
    setImageError((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  // Animation variants
  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
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
          className="absolute top-10 left-10 text-white/20"
          animate={{ rotate: [0, 10, -10, 0], y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Leaf className="w-8 h-8 sm:w-10 sm:h-10" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-white/20"
          animate={{ rotate: [0, -10, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <Leaf className="w-8 h-8 sm:w-10 sm:h-10" />
        </motion.div>
      </motion.div>

      {/* Slides */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false}>
          {slides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={index}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      imageError[index]
                        ? "https://via.placeholder.com/1920x1080?text=Farm+Marketplace"
                        : slide.image
                    })`,
                  }}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute invisible"
                    onError={() => handleImageError(index)}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex items-center justify-center">
                    <motion.div
                      className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight drop-shadow-lg">
                        {slide.title}
                      </h1>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 font-medium drop-shadow-md">
                        {slide.subtitle}
                      </p>
                      <Link to={slide.ctaLink}>
                        <motion.button
                          className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-green-700 shadow-lg"
                          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(74, 222, 128, 0.5)" }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          aria-label={slide.ctaText}
                        >
                          {slide.ctaText}
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <motion.button
          className="absolute left-4 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 sm:p-4 hover:bg-black/70 transition-colors"
          onClick={goToPrevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </motion.button>
        <motion.button
          className="absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 sm:p-4 hover:bg-black/70 transition-colors"
          onClick={goToNextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </motion.button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full cursor-pointer transition-colors ${
                index === currentSlide ? "bg-green-400" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
              role="button"
              aria-label={`Go to slide ${index + 1}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Social Proof */}
        <motion.div
          className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 text-white/80 text-sm sm:text-base flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Trusted by 50,000+ farmers and customers</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;