import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Leaf } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill all required fields.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email address.");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Login failed");

      localStorage.setItem("loggedInId", result.user.id);
      localStorage.setItem("token", result.token);
      localStorage.setItem("userRole", result.user.role);

      const { role } = result.user;
      if (role === "buyer") {
        toast.success("Login successful! Redirecting to buyer dashboard...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else if (role === "farmer") {
        toast.success("Login successful! Redirecting to farmer dashboard...");
        setTimeout(() => navigate("/farmerdashboard"), 1500);
      } else {
        throw new Error("Invalid user role");
      }

      setFormData({ email: "", password: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#4ADE80", transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 0 15px rgba(74, 222, 128, 0.5)" },
    tap: { scale: 0.95 },
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-700 to-green-600"
      role="main"
    >
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
          className="absolute top-10 left-10 text-white/20"
          animate={{ rotate: [0, 10, -10, 0], y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Leaf className="w-10 h-10" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-white/20"
          animate={{ rotate: [0, -10, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <Leaf className="w-10 h-10" />
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center gap-2 mb-4">
            <motion.span
              className="bg-white text-green-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg ring-2 ring-green-300/50"
              whileHover={{ scale: 1.15, rotateY: 180 }}
              transition={{ duration: 0.3 }}
            >
              F
            </motion.span>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800">
              Farm<span className="text-green-300">Marketplace</span>
            </h2>
          </Link>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Log in to connect with fresh produce and vibrant communities
          </p>
          <motion.div
            className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Leaf className="w-5 h-5 text-green-300" />
            <span>Trusted by 50,000+ farmers and buyers</span>
          </motion.div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Email Address *
            </label>
            <div className="relative">
              <motion.input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300 bg-white/70 text-gray-800 placeholder-gray-400"
                placeholder="e.g., farmfresh@marketplace.com"
                required
                aria-required="true"
                aria-describedby="email-error"
                whileFocus="focus"
                variants={inputVariants}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Password *
            </label>
            <div className="relative">
              <motion.input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300 bg-white/70 text-gray-800 placeholder-gray-400"
                placeholder="Enter your password"
                required
                aria-required="true"
                aria-describedby="password-error"
                whileFocus="focus"
                variants={inputVariants}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors duration-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                  />
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        {/* Navigation Links */}
        <div className="mt-6 text-center space-y-4">
          <div className="text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/getstarted"
              className="text-green-600 hover:text-green-300 font-medium transition-colors duration-300 hover:underline focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Register
            </Link>
          </div>
          <Link
            to="/"
            className="text-green-600 hover:text-green-300 font-medium transition-colors duration-300 hover:underline focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;