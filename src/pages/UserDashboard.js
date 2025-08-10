import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashHead from '../components/DashHead';
import UserHead from '../components/UserHead';
import FeaturedProducts from '../components/FeaturedProducts';
import UserOrder from '../components/UserOrder';
import BottomNav from '../components/ButtomNav'; // Fixed import

const fetchUser = async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');
  if (!token || !userId || !role) throw new Error('Not authenticated');
  const endpoint = role === 'buyer' ? `/api/buyer/${userId}` : `/api/farmer/${userId}`;
  const response = await fetch(`http://localhost:5000${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Failed to fetch user');
  return result.user || result.farmer;
};

const fetchStats = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const response = await fetch('http://localhost:5000/api/stats', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Failed to fetch stats');
  return result;
};

const fetchFeaturedProducts = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const response = await fetch('http://localhost:5000/api/products/featured', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Failed to fetch products');
  return result;
};

const fetchOrders = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const response = await fetch('http://localhost:5000/api/orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Failed to fetch orders');
  return result;
};

const UserDashboard = () => {
  const navigate = useNavigate();

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: 1,
    onError: (err) => {
      toast.error('Failed to load user data', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      if (err.message === 'Not authenticated' || err.message.includes('401')) {
        navigate('/login');
      }
    },
  });

  const {
    data: stats,
    isLoading: isStatsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    retry: 1,
    onError: (err) => {
      toast.error('Failed to load dashboard stats', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      if (err.message === 'Not authenticated' || err.message.includes('401')) {
        navigate('/login');
      }
    },
  });

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: fetchFeaturedProducts,
    retry: 1,
    onError: (err) => {
      toast.error('Failed to load featured products', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      if (err.message === 'Not authenticated' || err.message.includes('401')) {
        navigate('/login');
      }
    },
  });

  const {
    data: orders,
    isLoading: isOrdersLoading,
    error: ordersError,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    retry: 1,
    onError: (err) => {
      toast.error('Failed to load orders', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      if (err.message === 'Not authenticated' || err.message.includes('401')) {
        navigate('/login');
      }
    },
  });

  const isLoading = isUserLoading || isStatsLoading || isProductsLoading || isOrdersLoading;

  if (userError || statsError || productsError || ordersError) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl mx-auto p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800">Error Loading Dashboard</h3>
          <p className="text-gray-600 mt-2">
            {userError?.message === 'Not authenticated' ||
            statsError?.message === 'Not authenticated' ||
            productsError?.message === 'Not authenticated' ||
            ordersError?.message === 'Not authenticated'
              ? 'Please log in to view your dashboard.'
              : 'An error occurred while fetching your dashboard. Check if the server is running and endpoints are configured.'}
          </p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl mx-auto p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800">Loading Dashboard...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-6 md:p-8">
      <DashHead stats={stats} />
      <UserHead
        user={user}
        location={user?.location || 'Unknown'}
        balance={user?.walletBalance || 0}
        cartItems={0} // Update with actual cart data if available
      />
      <FeaturedProducts products={products || []} />
      <UserOrder orders={orders || []} />
      <BottomNav activeTab="dashboard" />
    </div>
  );
};

export default UserDashboard;