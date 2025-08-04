import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
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
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Login failed');

      navigate('/getstarted');
      setFormData({
        email: '',
        password: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 sm:p-8"
      style={{
        background: 'linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 0.57) 64%, rgba(237, 221, 83, 1) 100%)',
      }}
    >
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 sm:p-10 backdrop-blur-md transform transition-all duration-500 hover:shadow-2xl">
        {/* Header with Decorative Underline */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif font-bold text-teal-900 text-shadow">Welcome to FarmProduceMart</h2>
          <div className="w-24 h-1 mx-auto mt-2 bg-gradient-to-r from-yellow-400 to-teal-600 rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">Log in to access your farmer or foodie account</p>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 mb-6 text-center font-semibold bg-red-100/80 p-3 rounded-lg">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[calc(100vh-150px)] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-800">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-300 hover:border-teal-500 bg-white/80"
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
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-300 hover:border-teal-500 bg-white/80"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 text-white p-3 rounded-lg font-semibold text-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:to-teal-600 transition-all duration-300 disabled:bg-gray-400 transform hover:scale-105"
          >
            {loading ? 'Processing...' : 'Log In'}
          </button>
        </form>

        {/* Navigation Links */}
        <div className="mt-6 text-center space-y-2">
          <Link
            to="/"
            className="text-teal-700 hover:text-yellow-400 font-medium text-base transition-colors duration-300 hover:underline"
          >
            Back to Home
          </Link>
          <div className="text-gray-600">Don't have an account?</div>
          <Link
            to="/getstarted"
            className="text-teal-700 hover:text-yellow-400 font-medium text-base transition-colors duration-300 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;