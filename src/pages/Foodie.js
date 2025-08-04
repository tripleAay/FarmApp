import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Foodie = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    profilePicture: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber
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
      if (formData.profilePicture) formDataToSend.append('profilePicture', formData.profilePicture);

      const response = await fetch('http://localhost:3000/api/buyer-signup', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Signup failed');

      alert('Signup successful! Welcome to the foodie community.');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        profilePicture: null,
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
        <div className="md:w-1/2 bg-orange-600 text-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-4 text-center text-shadow">Taste the Freshness!</h2>
          <p className="text-lg mb-6 text-center text-shadow">
            Join our foodie community to explore and buy the freshest farm produce. Sign up to start your tasty journey!
          </p>
          <img
            src="https://images.unsplash.com/photo-1571051549906-a659836d71f9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fresh Produce"
            className="w-32 h-32 rounded-full object-cover shadow-md mb-4 animate-bounce"
          />
          <Link
            to="/"
            className="text-orange-100 hover:text-white font-semibold text-lg transition-colors duration-300 hover:underline"
          >
            Back to Home
          </Link>
        </div>

        {/* Right Child: Form Section */}
        <div className="md:w-1/2 p-8 bg-white bg-opacity-90">
          <h2 className="text-3xl font-bold mb-6 text-center text-orange-800 text-shadow">Join Our Foodie Community</h2>
          {error && <p className="text-red-500 mb-4 text-center font-semibold bg-white bg-opacity-80 p-2 rounded">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-800">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-200 hover:border-orange-400 bg-white bg-opacity-80"
                placeholder="e.g., Sarah Johnson"
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
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-200 hover:border-orange-400 bg-white bg-opacity-80"
                placeholder="e.g., foodie@example.com"
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
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-200 hover:border-orange-400 bg-white bg-opacity-80"
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
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-200 hover:border-orange-400 bg-white bg-opacity-80"
                placeholder="e.g., +234 987 654 3210"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-3 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-100 file:text-orange-800 hover:file:bg-orange-200 transition-all duration-200 bg-white bg-opacity-80"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white p-3 rounded-md hover:bg-orange-700 transition-all duration-300 disabled:bg-gray-400 transform hover:scale-105"
            >
              {loading ? 'Processing...' : 'Join the Foodie Feast'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Foodie;