// HeroSection.jsx
import React, { useState, useEffect } from 'react';
import farm1 from '../assets/images/dan-meyers-0AgtPoAARtE-unsplash.jpg';
import farm2 from '../assets/images/frances-gunn-QcBAZ7VREHQ-unsplash.jpg';
import farm3 from '../assets/images/premium_photo-1661962692059-55d5a4319814.jpg';
import farm4 from '../assets/images/stijn-te-strake-UdhpcfImQ9Y-unsplash.jpg'

// Farm-themed images (replace with your actual image URLs)
const slides = [
  {
    image: farm1,
    title: 'Fresh from Our Farms',
    subtitle: 'Discover locally grown produce delivered to your door'
  },
  {
    image: farm2,
    title: 'Organic Excellence',
    subtitle: 'Pure, natural, and sustainably sourced'
  },
  {
    image: farm3,
    title: 'Support Local Farmers',
    subtitle: 'Connect directly with our farming community'
  },
  {
    image: farm4,
    title: 'Farm to Table',
    subtitle: 'Experience the taste of freshness'
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);


  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-shadow">
                  {slide.subtitle}
                </p>
                <button className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-700 hover:scale-105 transition-transform duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 md:p-4 hover:bg-black/70 transition-colors"
          onClick={goToPrevSlide}
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 md:p-4 hover:bg-black/70 transition-colors"
          onClick={goToNextSlide}
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;