import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Handle newsletter subscription (placeholder for API call)
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubmitting(true);
    try {
      // Replace with actual API call
      // await axios.post("http://localhost:5000/api/newsletter/subscribe", { email });
      toast.success("🎉 Subscribed to Farm Marketplace newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("❌ Failed to subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const linkVariants = {
    hover: { scale: 1.05, color: "#FCD34D", transition: { duration: 0.2 } }, // Yellow-400
  };

  return (
    <footer className="bg-gradient-to-r from-green-700 to-green-600 text-white py-12 relative overflow-hidden">
      <ToastContainer position="bottom-right" autoClose={3000} />
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
          className="absolute top-8 left-8 text-white/20"
          animate={{ rotate: [0, 10, -10, 0], y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Leaf className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute bottom-8 right-8 text-white/20"
          animate={{ rotate: [0, -10, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <Leaf className="w-8 h-8" />
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <motion.div
          className="text-center lg:text-left"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link to="/" className="flex items-center gap-2 justify-center lg:justify-start mb-4">
            <motion.span
              className="bg-white text-green-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg ring-2 ring-green-300/50"
              whileHover={{ scale: 1.15, rotateY: 180 }}
              transition={{ duration: 0.3 }}
            >
              F
            </motion.span>
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Farm<span className="text-green-300">Marketplace</span>
            </h2>
          </Link>
          <p className="text-sm lg:text-base text-gray-200 max-w-xs leading-relaxed">
            Connecting farmers and buyers with fresh, organic produce and sustainable tools for a thriving community.
          </p>
          <motion.div
            className="mt-4 flex items-center gap-2 justify-center lg:justify-start text-sm text-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Leaf className="w-5 h-5 text-green-300" />
            <span>Trusted by 50,000+ farmers and customers</span>
          </motion.div>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          className="text-center lg:text-left"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-green-300 mb-4">Explore</h3>
          <ul className="space-y-2">
            {[
              { name: "Marketplace", path: "/marketplace" },
              { name: "Services", path: "/services" },
              { name: "Farms", path: "/farms" },
              { name: "Experts", path: "/experts" },
            ].map((link) => (
              <motion.li key={link.name} variants={linkVariants} whileHover="hover">
                <Link to={link.path} className="text-gray-200 hover:text-yellow-400 transition-colors">
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Support Links */}
        <motion.div
          className="text-center lg:text-left"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-green-300 mb-4">Support</h3>
          <ul className="space-y-2">
            {[
              { name: "Terms of Service", path: "/terms" },
              { name: "Privacy Policy", path: "/privacy" },
              { name: "Contact Us", path: "/contact" },
              { name: "FAQ", path: "/faq" },
            ].map((link) => (
              <motion.li key={link.name} variants={linkVariants} whileHover="hover">
                <Link to={link.path} className="text-gray-200 hover:text-yellow-400 transition-colors">
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact and Subscription */}
        <motion.div
          className="text-center lg:text-left"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-green-300 mb-4">Stay Connected</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md text-gray-800 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/95"
              aria-label="Email for newsletter"
              disabled={submitting}
            />
            <motion.button
              type="submit"
              className="bg-yellow-400 text-green-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300 shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(252, 211, 77, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              disabled={submitting}
              aria-label="Subscribe to newsletter"
            >
              {submitting ? "Subscribing..." : "Subscribe"}
            </motion.button>
          </form>
          <div className="space-y-2 text-gray-200">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Phone className="w-5 h-5 text-green-300" />
              <p>+234 916 774 0076</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Mail className="w-5 h-5 text-green-300" />
              <p>support@farmmarketplace.com</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <MapPin className="w-5 h-5 text-green-300" />
              <p>Lagos, Nigeria</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Social Media and Copyright */}
      <div className="border-t border-green-500/50 mt-8 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex space-x-4">
            {[
              { name: "Instagram", icon: Instagram, href: "https://instagram.com/farmmarketplace" },
              { name: "Twitter", icon: Twitter, href: "https://twitter.com/farmmarketplace" },
              { name: "Facebook", icon: Facebook, href: "https://facebook.com/farmmarketplace" },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`${social.name} - Farm Marketplace`}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
          <motion.p
            className="text-sm text-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            &copy; {new Date().getFullYear()} Farm Marketplace. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;