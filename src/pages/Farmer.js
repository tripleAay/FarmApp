import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { motion } from 'framer-motion';

const Farmer = () => {
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

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    setFormData({ ...formData, crops: selectedOptions.map((opt) => opt.value) });
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
      setError('Please fill all required fields.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Invalid email address.');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'crops') {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch('http://localhost:3000/api/farmer-signup', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Signup failed');

      alert('Signup successful! Welcome to the farming community.');
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      style={{
        background: 'linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 0.57) 64%, rgba(237, 221, 83, 1) 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-6xl mx-auto flex flex-col md:flex-row backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Left - Welcome */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="md:w-1/2 bg-green-900 text-white p-8 flex flex-col justify-center items-center text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Grow with Us 🌿</h2>
          <p className="text-lg mb-6">
            Join our vibrant farming community and showcase your crops to the world.
          </p>
          <img
            src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=387"
            alt="Farm"
            className="w-36 h-36 rounded-full object-cover shadow-md animate-pulse mb-4"
          />
          <Link
            to="/"
            className="text-green-100 hover:underline hover:text-white transition"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Right - Form */}
        <div className="md:w-1/2 p-6 md:p-8 bg-white bg-opacity-90">
          <h2 className="text-3xl font-bold text-center mb-6 text-green-800">Farmer Registration</h2>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center"
            >
              {error}
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: 'fullName', type: 'text', placeholder: 'e.g. John Adebayo' },
              { name: 'email', type: 'email', placeholder: 'e.g. john@example.com' },
              { name: 'password', type: 'password', placeholder: 'Choose a strong password' },
              { name: 'phoneNumber', type: 'text', placeholder: 'e.g. +234 123 456 7890' },
              { name: 'farmName', type: 'text', placeholder: 'e.g. Green Valley Farm' },
              { name: 'farmLocation', type: 'text', placeholder: 'e.g. Ogun State, Nigeria' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field.name.replace(/([A-Z])/g, ' $1')} *
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition-all bg-white bg-opacity-80 hover:border-green-500"
                />
              </div>
            ))}

            {/* Crop Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Crops or Produce *</label>
              <Select
                isMulti
                options={cropOptions}
                onChange={handleCropsChange}
                placeholder="Select your crops..."
              />
            </div>

            {/* Files */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleChange}
                className="w-full border p-3 rounded-md file:rounded file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Verification Documents</label>
              <input
                type="file"
                name="verificationDocs"
                accept=".pdf,.jpg,.png"
                onChange={handleChange}
                className="w-full border p-3 rounded-md file:rounded file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
              />
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 transition disabled:bg-gray-400 font-semibold shadow-md"
            >
              {loading ? 'Processing...' : 'Join the Harvest'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Farmer;
