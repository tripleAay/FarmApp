import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const FarmerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    farmName: '',
    farmLocation: '',
    crops: [],
    profilePicture: null,
    verificationDocs: null,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const cropOptions = [
    { value: 'maize', label: 'Maize' },
    { value: 'yam', label: 'Yam' },
    { value: 'cassava', label: 'Cassava' },
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'rice', label: 'Rice' },
    { value: 'peppers', label: 'Peppers' },
    { value: 'plantain', label: 'Plantain' },
    { value: 'cocoa', label: 'Cocoa' },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
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
      !formData.farmLocation ||
      !formData.crops.length
    ) {
      toast.error('Please fill all required fields.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Invalid email address.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      return false;
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber)) {
      toast.error('Invalid phone number format (e.g., +2341234567890).', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      return false;
    }
    if (formData.profilePicture && !['image/jpeg', 'image/png'].includes(formData.profilePicture.type)) {
      toast.error('Profile picture must be a JPEG or PNG file.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      return false;
    }
    if (
      formData.verificationDocs &&
      !['image/jpeg', 'image/png', 'application/pdf'].includes(formData.verificationDocs.type)
    ) {
      toast.error('Verification documents must be a JPEG, PNG, or PDF file.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
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
        if (key === 'crops') {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch('http://localhost:5000/api/farmersignup', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Signup failed');

      toast.success('Signup successful! Redirecting to login...', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        icon: '🌾',
      });

      setFormData({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        farmName: '',
        farmLocation: '',
        crops: [],
        profilePicture: null,
        verificationDocs: null,
      });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      toast.error(err.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 sm:p-8 bg-gradient-to-r from-teal-600 via-green-400 to-yellow-300"
      role="main"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-4xl mx-auto flex flex-col md:flex-row backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Left - Welcome */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="md:w-1/2 bg-teal-800 text-white p-8 flex flex-col justify-center items-center text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 drop-shadow-md">
            Grow with FarmProduceMart 🌾
          </h2>
          <p className="text-base sm:text-lg mb-6">
            Join our vibrant farming community and connect with buyers worldwide.
          </p>
          <img
            src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=387"
            alt="Farm landscape"
            className="w-32 h-32 rounded-full object-cover shadow-md animate-pulse mb-4"
            loading="lazy"
          />
          <Link
            to="/"
            className="text-teal-100 hover:text-white font-medium transition-colors duration-300 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Right - Form */}
        <div className="md:w-1/2 p-6 md:p-8 bg-white/95">
          <h2 className="text-3xl font-serif font-bold text-center mb-6 text-teal-900 drop-shadow-md">
            Farmer Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data" noValidate>
            {[
              { name: 'fullName', type: 'text', placeholder: 'e.g., John Adebayo', label: 'Full Name' },
              { name: 'email', type: 'email', placeholder: 'e.g., john@example.com', label: 'Email Address' },
              {
                name: 'password',
                type: showPassword ? 'text' : 'password',
                placeholder: 'Choose a strong password',
                label: 'Password',
              },
              { name: 'phoneNumber', type: 'text', placeholder: 'e.g., +2341234567890', label: 'Phone Number' },
              { name: 'farmName', type: 'text', placeholder: 'e.g., Green Valley Farm', label: 'Farm Name' },
              {
                name: 'farmLocation',
                type: 'text',
                placeholder: 'e.g., Ogun State, Nigeria',
                label: 'Farm Location',
              },
            ].map((field) => (
              <div key={field.name} className="relative">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-800 capitalize"
                >
                  {field.label} *
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-teal-500 outline-none transition-all duration-300 hover:border-teal-500 bg-white/70 text-gray-800 placeholder-gray-400"
                  aria-required="true"
                  aria-describedby={`${field.name}-error`}
                />
                {field.name === 'password' && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-10 text-gray-500 hover:text-teal-600 transition-colors duration-200"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="crops" className="block text-sm font-medium text-gray-800">
                Crops or Produce *
              </label>
              <Select
                isMulti
                options={cropOptions}
                onChange={handleCropsChange}
                placeholder="Select your crops..."
                className="mt-1"
                classNamePrefix="select"
                required
                aria-required="true"
                aria-describedby="crops-error"
              />
            </div>

            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-800">
                Profile Picture (JPEG/PNG)
              </label>
              <input
                id="profilePicture"
                type="file"
                name="profilePicture"
                accept="image/jpeg,image/png"
                onChange={handleChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-teal-500 outline-none transition-all duration-300 hover:border-teal-500 bg-white/70 text-gray-800"
                aria-describedby="profilePicture-error"
              />
            </div>
            <div>
              <label htmlFor="verificationDocs" className="block text-sm font-medium text-gray-800">
                Verification Documents (JPEG/PNG/PDF)
              </label>
              <input
                id="verificationDocs"
                type="file"
                name="verificationDocs"
                accept="image/jpeg,image/png,application/pdf"
                onChange={handleChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-teal-500 outline-none transition-all duration-300 hover:border-teal-500 bg-white/70 text-gray-800"
                aria-describedby="verificationDocs-error"
              />
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="w-full bg-teal-700 text-white p-3 rounded-lg font-semibold text-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:to-teal-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Join the Harvest'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <Link
              to="/login"
              className="text-teal-700 hover:text-yellow-400 font-medium text-base transition-colors duration-300 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Already have an account? Log In
            </Link>
            <Link
              to="/getstarted"
              className="block text-teal-700 hover:text-yellow-400 font-medium text-base transition-colors duration-300 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Choose a different account type
            </Link>
          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default FarmerSignup;