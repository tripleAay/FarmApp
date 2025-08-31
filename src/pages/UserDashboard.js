import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaFire } from 'react-icons/fa';
import DashHead from '../components/DashHead';
import UserHead from '../components/userHead';
import UserOrder from '../components/userOrder';
import FeaturedProducts from '../components/FeaturedProducts';
import ButtomNav from '../components/ButtomNav';
import HotProducts from '../components/HotProducts';

// Fetch functions (unchanged)
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
    enabled: !!userId && !!role,
    retry: 1,
    onError: (err) => {
      toast.error('Failed to load user data', { theme: 'colored' });
      if (err.message === 'Not authenticated' || err.message.includes('401')) {
        navigate('/login');
      }
    },
  });

  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['stats', userId],
    queryFn: fetchStats,
    enabled: !!userId,
    retry: 1,
  });

  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ['featuredProducts', userId],
    queryFn: fetchFeaturedProducts,
    enabled: !!userId,
    retry: 1,
  });

  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ['orders', userId],
    queryFn: fetchOrders,
    enabled: !!userId,
    retry: 1,
  });

  const isLoading = isUserLoading || isStatsLoading || isProductsLoading || isOrdersLoading;

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loader"
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg px-8 py-6 text-center relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute top-4 left-4 text-green-400/60"
              animate={{ y: [0, 6, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaLeaf className="w-5 h-5" />
            </motion.div>
            <motion.div
              className="absolute bottom-4 right-4 text-orange-400/60"
              animate={{ y: [0, -6, 0], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <FaFire className="w-5 h-5" />
            </motion.div>
            <h3 className="text-lg font-semibold text-green-700">
              Loading your dashboard...
            </h3>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          className="min-h-screen bg-[#F9FBB2] p-4 sm:p-6 md:p-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <DashHead stats={stats} />
          <UserHead className="mt-30"
            user={user}
            location={user?.location || 'Unknown'}
            balance={user?.walletBalance || 0}
            cartItems={0}
          />

          <motion.div
            className="max-w-6xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="  p-5 transition-all"
              whileHover={{ scale: 1.01 }}
            >
              <HotProducts />
            </motion.div>
          </motion.div>

          <motion.div
            className="max-w-6xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.div
              className=" p-5"
              whileHover={{ scale: 1.01 }}
            >
              <h2 className="text-xl font-semibold text-green-800 mb-3">
                Featured Products
              </h2>
              <FeaturedProducts products={products || []} />
            </motion.div>

            <motion.div
              className=""
              whileHover={{ scale: 1.01 }}
            >
              <h2 className="text-xl font-semibold text-green-800 mb-3">
                Your Orders
              </h2>
              <UserOrder orders={orders || []} />
            </motion.div>
          </motion.div>

          <ButtomNav activeTab="home" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserDashboard;
