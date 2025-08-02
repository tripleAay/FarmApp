// Testimonial.js
import React from 'react';

const Testimonial = ({ testimonials }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-6 animate-fade-in">
          What Our People Say
        </h2>
        <p className="text-center text-gray-600 mb-12 animate-fade-in-delay">
          Hear from our Nigerian customers about their experience
        </p>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-green-500"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  {/* Placeholder for profile image */}
                  <svg
                    className="w-full h-full text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.417 8.275L12 18.81l-7.416 3.456 1.417-8.275-6.001-5.822 8.332-1.151z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
                {testimonial.text}
              </p>
              <p className="text-green-600 font-semibold">{testimonial.name}</p>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </div>
          ))}
        </div>

        {/* Contact Button */}
        <div className="text-center mt-12">
          <button className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300 transform hover:scale-105 animate-bounce-slow">
            Reach Out to Us
          </button>
        </div>
      </div>
    </section>
  );
};

// Example usage with Nigerian-inspired content
const sampleTestimonials = [
  {
    text: "Farms Market na the best place to buy fresh yam and vegetable for my family. No wahala at all!",
    name: "Chinedu Okonkwo",
    role: "Farmer",
  },
  {
    text: "This site dey like Onitsha Market online! I buy palm oil and garri without stress.",
    name: "Aminat Bello",
    role: "Trader",
  },
  {
    text: "E get plenty good tools for farm work here. I don recommend am for my people!",
    name: "Emeka Nwosu",
    role: "Marketer",
  },
];

export default function App() {
  return <Testimonial testimonials={sampleTestimonials} />;
}