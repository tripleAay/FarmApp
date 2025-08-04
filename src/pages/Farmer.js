import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

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

  // Expanded crop options
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
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('farmName', formData.farmName);
      formDataToSend.append('farmLocation', formData.farmLocation);
      formDataToSend.append('crops', JSON.stringify(formData.crops));
      if (formData.profilePicture) formDataToSend.append('profilePicture', formData.profilePicture);
      if (formData.verificationDocs) formDataToSend.append('verificationDocs', formData.verificationDocs);

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
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        background: 'linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 0.57) 64%, rgba(237, 221, 83, 1) 100%)',
      }}
    >
      <div className="container max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
        {/* Left Child: Welcome Section */}
        <div className="md:w-1/2 bg-green-800 text-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-4 text-center text-shadow">Grow with Us!</h2>
          <p className="text-lg mb-6 text-center text-shadow">
            Join our vibrant farming community and showcase your crops to the world. Sign up to start your journey!
          </p>
          <img
            src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Farm Landscape"
            className="w-32 h-32 rounded-full object-cover shadow-md mb-4 animate-pulse"
          />
          <Link
            to="/"
            className="text-green-100 hover:text-white font-semibold text-lg transition-colors duration-300 hover:underline"
          >
            Back to Home
          </Link>
        </div>

        {/* Right Child: Form Section */}
        <div className="md:w-1/2 p-8 bg-white bg-opacity-90 max-h-[calc(100vh-150px)] overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-900 text-shadow">Join Our Farming Community</h2>
          {error && <p className="text-red-500 mb-4 text-center font-semibold bg-white bg-opacity-80 p-2 rounded">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-800">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none transition-all duration-200 hover:border-green-500 bg-white bg-opacity-80"
                placeholder="e.g., John Adebayo"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none transition-all duration-200 hover:border-green-500 bg-white bg-opacity-80"
                placeholder="e.g., farmfresh@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none transition-all duration-200 hover:border-green-500 bg-white bg-opacity-80"
                placeholder="Enter a strong password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Phone Number *</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none transition-all duration-200 hover:border-green-500 bg-white bg-opacity-80"
                placeholder="e.g., +234 123 456 7890"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Farm Name *</label>
              <input
                type="text"
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none transition-all duration-200 hover:border-green-500 bg-white bg-opacity-80"
                placeholder="e.g., Green Valley Farms"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Farm Location *</label>
              <input
                type="text"
                name="farmLocation"
                value={formData.farmLocation}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none transition-all duration-200 hover:border-green-500 bg-white bg-opacity-80"
                placeholder="e.g., 123 Farm Road"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Crops or Produce *</label>
              <Select
                isMulti
                options={cropOptions}
                onChange={handleCropsChange}
                className="w-full"
                placeholder="Select your crops..."
                required
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: '0.375rem',
                    borderColor: '#d1d5db',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': { borderColor: '#10b981' },
                    transition: 'all 0.2s',
                  }),
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-3 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-100 file:text-green-800 hover:file:bg-green-200 transition-all duration-200 bg-white bg-opacity-80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Verification Documents</label>
              <input
                type="file"
                name="verificationDocs"
                accept=".pdf,.jpg,.png"
                onChange={handleChange}
                className="w-full p-3 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-100 file:text-green-800 hover:file:bg-green-200 transition-all duration-200 bg-white bg-opacity-80"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white p-3 rounded-md hover:bg-green-800 transition-all duration-300 disabled:bg-gray-400 transform hover:scale-105"
            >
              {loading ? 'Processing...' : 'Join the Harvest'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Farmer;