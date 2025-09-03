import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, Home, Leaf, Upload, Eye, EyeOff } from "lucide-react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FarmerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    farmName: "",
    farmLocation: "",
    crops: [],
    profilePicture: null,
    verificationDocs: null,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const cropOptions = [
    { value: "maize", label: "Maize" },
    { value: "yam", label: "Yam" },
    { value: "cassava", label: "Cassava" },
    { value: "tomatoes", label: "Tomatoes" },
    { value: "rice", label: "Rice" },
    { value: "peppers", label: "Peppers" },
    { value: "plantain", label: "Plantain" },
    { value: "cocoa", label: "Cocoa" },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      if (name === "profilePicture" && file) {
        setPreviewImage(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCropsChange = (selectedOptions) => {
    setFormData({ ...formData, crops: selectedOptions ? selectedOptions.map((opt) => opt.value) : [] });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber ||
      !formData.farmName ||
      !formData.farmLocation
    ) {
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
    if (!/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber)) {
      toast.error("Invalid phone number format (e.g., +2341234567890).");
      return false;
    }
    if (formData.profilePicture && !["image/jpeg", "image/png"].includes(formData.profilePicture.type)) {
      toast.error("Profile picture must be a JPEG or PNG file.");
      return false;
    }
    if (
      formData.verificationDocs &&
      !["image/jpeg", "image/png", "application/pdf"].includes(formData.verificationDocs.type)
    ) {
      toast.error("Verification documents must be a JPEG, PNG, or PDF file.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "crops") {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch("https://farmapp-backend-auwd.onrender.com/api/farmersignup", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Signup failed");

      toast.success("Signup successful! Redirecting to login...", { icon: "🌾" });
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        farmName: "",
        farmLocation: "",
        crops: [],
        profilePicture: null,
        verificationDocs: null,
      });
      setPreviewImage(null);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
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
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
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

      <motion.div
        className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row bg-white/95 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left - Welcome */}
        <motion.div
          className="lg:w-1/2 bg-green-800 text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-center items-center text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link to="/" className="flex items-center justify-center gap-2 mb-6">
            <motion.span
              className="bg-white text-green-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg ring-2 ring-green-300/50"
              whileHover={{ scale: 1.15, rotateY: 180 }}
              transition={{ duration: 0.3 }}
            >
              F
            </motion.span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Farm<span className="text-green-300">Marketplace</span>
            </h2>
          </Link>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 drop-shadow-md">
            Grow with Us 🌾
          </h3>
          <p className="text-base sm:text-lg lg:text-xl mb-6 max-w-md leading-relaxed">
            Join Nigeria’s thriving farming community. Sell your fresh produce and connect with buyers worldwide.
          </p>
          <motion.div
            className="flex items-center gap-2 text-sm sm:text-base text-green-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Trusted by 50,000+ farmers and buyers</span>
          </motion.div>
        </motion.div>

        {/* Right - Form */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 bg-white/95">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-green-800 drop-shadow-md">
            Farmer Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data" noValidate>
            {[
              {
                name: "fullName",
                type: "text",
                placeholder: "e.g., John Adebayo",
                label: "Full Name",
                icon: <User className="w-5 h-5 text-gray-500" />,
              },
              {
                name: "email",
                type: "email",
                placeholder: "e.g., john@farmmarketplace.com",
                label: "Email Address",
                icon: <Mail className="w-5 h-5 text-gray-500" />,
              },
              {
                name: "password",
                type: showPassword ? "text" : "password",
                placeholder: "Choose a strong password",
                label: "Password",
                icon: <Lock className="w-5 h-5 text-gray-500" />,
                extra: (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors duration-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                ),
              },
              {
                name: "phoneNumber",
                type: "text",
                placeholder: "e.g., +2341234567890",
                label: "Phone Number",
                icon: <Phone className="w-5 h-5 text-gray-500" />,
              },
              {
                name: "farmName",
                type: "text",
                placeholder: "e.g., Green Valley Farm",
                label: "Farm Name",
                icon: <Home className="w-5 h-5 text-gray-500" />,
              },
              {
                name: "farmLocation",
                type: "text",
                placeholder: "e.g., Ogun State, Nigeria",
                label: "Farm Location",
                icon: <Leaf className="w-5 h-5 text-gray-500" />,
              },
            ].map((field) => (
              <div key={field.name} className="relative">
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-800 mb-1">
                  {field.label} *
                </label>
                <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300 bg-white/70 text-gray-800 placeholder-gray-400"
                    aria-required="true"
                    aria-describedby={`${field.name}-error`}
                  />
                  {field.icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{field.icon}</span>
                  )}
                  {field.extra}
                </motion.div>
              </div>
            ))}

            <div>
              <label htmlFor="crops" className="block text-sm font-medium text-gray-800 mb-1">
                Crops You Grow
              </label>
              <Select
                id="crops"
                isMulti
                options={cropOptions}
                value={cropOptions.filter((option) => formData.crops.includes(option.value))}
                onChange={handleCropsChange}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select your crops..."
                aria-describedby="crops-error"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: "#d1d5db",
                    padding: "0.25rem",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "0.5rem",
                    "&:hover": { borderColor: "#4ADE80" },
                    "&:focus": { borderColor: "#4ADE80", boxShadow: "0 0 0 2px rgba(74, 222, 128, 0.5)" },
                  }),
                }}
              />
            </div>

            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-800 mb-1">
                Profile Picture (Optional, JPEG/PNG)
              </label>
              <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                <input
                  id="profilePicture"
                  type="file"
                  name="profilePicture"
                  accept="image/jpeg,image/png"
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300 bg-white/70 text-gray-800"
                  aria-describedby="profilePicture-error"
                />
                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </motion.div>
              {previewImage && (
                <motion.img
                  src={previewImage}
                  alt="Profile picture preview"
                  className="mt-4 w-24 h-24 rounded-full object-cover shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>

            <div>
              <label htmlFor="verificationDocs" className="block text-sm font-medium text-gray-800 mb-1">
                Verification Documents (Optional, JPEG/PNG/PDF)
              </label>
              <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                <input
                  id="verificationDocs"
                  type="file"
                  name="verificationDocs"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300 bg-white/70 text-gray-800"
                  aria-describedby="verificationDocs-error"
                />
                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </motion.div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white p-3 sm:p-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                  Signing Up...
                </span>
              ) : (
                "Join the Harvest"
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <Link
              to="/login"
              className="text-green-600 hover:text-green-300 font-medium text-sm sm:text-base transition-colors duration-300 hover:underline focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Already have an account? Sign In
            </Link>
            <Link
              to="/getstarted"
              className="block text-green-600 hover:text-green-300 font-medium text-sm sm:text-base transition-colors duration-300 hover:underline focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Choose a different account type
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FarmerSignup;