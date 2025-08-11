import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'; // Install @heroicons/react for icons

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(''); // Clear error on input change
    setSuccess('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Login failed');
      // console.log(result.user.id)
      // Store JWT token
      localStorage.setItem('loggedInId', result.user.id);
      localStorage.setItem('token', result.token);
      localStorage.setItem('userRole', result.user.role);

      // Redirect based on role
      const { role } = result.user;
      if (role === 'buyer') {
        setSuccess('Login successful! Redirecting to buyer dashboard...');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else if (role === 'farmer') {
        setSuccess('Login successful! Redirecting to farmer dashboard...');
        setTimeout(() => navigate('/farmerdashboard'), 1000);
      } else {
        throw new Error('Invalid user role');
      }

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
      className="min-h-screen flex items-center justify-center p-6 sm:p-8 bg-gradient-to-r from-teal-600 via-green-400 to-yellow-300"
      role="main"
    >
      <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl p-8 sm:p-10 backdrop-blur-lg transform transition-all duration-500 hover:shadow-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-teal-900 drop-shadow-md">
            FarmProduceMart
          </h2>
          <div className="w-20 h-1 mx-auto mt-2 bg-gradient-to-r from-yellow-400 to-teal-600 rounded-full"></div>
          <p className="text-gray-600 mt-3 text-base sm:text-lg">
            Log in to your farmer or buyer account
          </p>
        </div>

        {/* Messages */}
        {error && (
          <p className="text-red-600 mb-6 text-center font-medium bg-red-100/90 p-3 rounded-lg animate-pulse">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 mb-6 text-center font-medium bg-green-100/90 p-3 rounded-lg animate-pulse">
            {success}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-teal-500 outline-none transition-all duration-300 hover:border-teal-500 bg-white/70 text-gray-800 placeholder-gray-400"
              placeholder="e.g., farmfresh@example.com"
              required
              aria-required="true"
              aria-describedby="email-error"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-800">
              Password *
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-teal-500 outline-none transition-all duration-300 hover:border-teal-500 bg-white/70 text-gray-800 placeholder-gray-400"
              placeholder="Enter your password"
              required
              aria-required="true"
              aria-describedby="password-error"
            />
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
          </div>
          <button
            type="submit"
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
              'Log In'
            )}
          </button>
        </form>

        {/* Navigation Links */}
        <div className="mt-6 text-center space-y-3">
          <Link
            to="/"
            className="text-teal-700 hover:text-yellow-400 font-medium text-base transition-colors duration-300 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Back to Home
          </Link>
          <div className="text-gray-600 text-sm">Don't have an account?</div>
          <Link
            to="/getstarted"
            className="text-teal-700 hover:text-yellow-400 font-medium text-base transition-colors duration-300 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;