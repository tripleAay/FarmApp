import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashHead from '../components/DashHead';
import UserHead from '../components/userHead';
import FeaturedProducts from '../components/FeaturedProducts';
import UserOrder from '../components/userOrder';
import BottomNav from '../components/ButtomNav'; // Fixed import

// Fetch functions
const fetchUser = async ({ queryKey }) => {
  const [, userId, role] = queryKey;
  const token = localStorage.getItem('token');
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
  const response = await fetch('http://localhost:5000/api/products/user', {
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
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['user', userId, role],
    queryFn: fetchUser,
    enabled: !!userId && !!role, // only run if these exist
    retry: 1,
    onError: (err) => {
      toast.error('Failed to load user data', { theme: 'colored' });
      if (err.message === 'Not authenticated' || err.message.includes('401')) {
        navigate('/login');
      }
    },
  });

  const {
    data: stats,
    isLoading: isStatsLoading,
  } = useQuery({
    queryKey: ['stats', userId],
    queryFn: fetchStats,
    enabled: !!userId,
    retry: 1,
  });

  const {
    data: products,
    isLoading: isProductsLoading,
  } = useQuery({
    queryKey: ['featuredProducts', userId],
    queryFn: fetchFeaturedProducts,
    enabled: !!userId,
    retry: 1,
  });

  const {
    data: orders,
    isLoading: isOrdersLoading,
  } = useQuery({
    queryKey: ['orders', userId],
    queryFn: fetchOrders,
    enabled: !!userId,
    retry: 1,
  });

  const isLoading = isUserLoading || isStatsLoading || isProductsLoading || isOrdersLoading;

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
        cartItems={0}
      />
      <FeaturedProducts products={products || []} />
      <UserOrder orders={orders || []} />
      <BottomNav activeTab="dashboard" />
    </div>
  );
};

export default UserDashboard;
