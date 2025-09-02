import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Package, ShoppingCart, DollarSign, Leaf, Menu, X, MessageSquare, Settings, Headphones } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashHead from "../../components/DashHead";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("loggedInId");
  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState({
    totalProducts: 0,
    pendingOrdersCount: 0,
    totalEarnings: 0,
    totalSold: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [stockAlerts, setStockAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchData = async () => {
    if (!id) {
      toast.error("Please log in to access your dashboard.", { icon: "🌾" });
      setTimeout(() => navigate("/login"), 3000);
      setLoading(false);
      return;
    }

    try {
      const [statsResponse, farmerResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/farmers/stats/${id}`),
        axios.get(`http://localhost:5000/api/farmers/${id}`),
      ]);

      setProducts(statsResponse.data.stats || {
        totalProducts: 0,
        pendingOrdersCount: 0,
        totalEarnings: 0,
        totalSold: 0,
      });
      setFarmer(farmerResponse.data.farmer || {});
      setRecentOrders(farmerResponse.data.recentOrders || []);
      setStockAlerts(farmerResponse.data.stockAlerts || []);
    } catch (error) {
      toast.error("Failed to load dashboard data.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const cardVariants = {
    hover: { scale: 1.05, boxShadow: "0 0 15px rgba(74, 222, 128, 0.5)" },
    tap: { scale: 0.95 },
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 to-green-600">
        <motion.p
          className="text-lg font-medium text-white flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Leaf className="w-6 h-6 animate-pulse" />
          Loading your dashboard...
        </motion.p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-yellow-400">
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

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-green-800 text-white p-6 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg`}
        >
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-3">
              <motion.span
                className="bg-white text-green-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg ring-2 ring-green-300/50"
                whileHover={{ scale: 1.15, rotateY: 180 }}
                transition={{ duration: 0.3 }}
              >
                F
              </motion.span>
              <h2 className="text-xl font-bold text-white">
                Farm<span className="text-green-300">Marketplace</span>
              </h2>
            </Link>
            <button
              className="md:hidden text-white hover:text-green-300"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <h3 className="text-lg font-semibold mb-4">Farmer Panel</h3>
          <nav className="space-y-3 text-green-100 font-medium">
            {[
              { to: "/products-display", label: "My Products", icon: <Package className="w-5 h-5" /> },
              { to: "/farmer-order", label: "Orders", icon: <ShoppingCart className="w-5 h-5" /> },
              { to: "/products-add", label: "Add Product", icon: <Leaf className="w-5 h-5" /> },
              { to: "/withdraw", label: "Wallet", icon: <DollarSign className="w-5 h-5" /> },
              { to: "/messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
              { to: "/profile", label: "Settings", icon: <Settings className="w-5 h-5" /> },
              { to: "/support", label: "Support", icon: <Headphones className="w-5 h-5" /> },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 hover:text-green-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={() => setIsSidebarOpen(false)}
                aria-label={item.label}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile Sidebar Toggle */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 text-white"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <Menu className="w-8 h-8" />
        </button>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <DashHead />
          <motion.div
            className="max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Welcome Banner */}
            <motion.section
              className="bg-white/95 rounded-2xl mt-20 shadow-lg p-6 sm:p-8 mb-8 backdrop-blur-lg flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={farmer?.profilePicture || "https://via.placeholder.com/64?text=Farmer"}
                alt="Farmer profile"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-md"
              />
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-2">
                  Welcome, {farmer?.fullName || "Farmer"}! 🌾
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Manage your farm, track orders, and grow your success with Farm Marketplace.
                </p>
                <motion.div
                  className="mt-2 flex items-center gap-2 text-sm sm:text-base text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Leaf className="w-5 h-5 text-green-300" />
                  <span>Trusted by 50,000+ farmers and foodies</span>
                </motion.div>
              </div>
            </motion.section>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {[
                { label: "Total Products", value: products.totalProducts || 0, icon: <Package className="w-6 h-6 text-green-600" /> },
                { label: "Pending Orders", value: products.pendingOrdersCount || 0, icon: <ShoppingCart className="w-6 h-6 text-green-600" /> },
                { label: "Total Earnings", value: `₦${(products.totalEarnings || 0).toLocaleString()}`, icon: <DollarSign className="w-6 h-6 text-green-600" /> },
                { label: "Products Sold", value: products.totalSold || 0, icon: <Leaf className="w-6 h-6 text-green-600" /> },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/95 p-4 sm:p-6 rounded-xl shadow-md backdrop-blur-lg"
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm sm:text-base text-gray-600">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-800">{stat.value}</p>
                    </div>
                    {stat.icon}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders and Stock Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
              <section className="bg-white/95 p-4 sm:p-6 rounded-xl shadow-md backdrop-blur-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-green-800">📥 Recent Orders</h3>
                  <Link
                    to="/farmer-order"
                    className="text-green-600 hover:text-green-800 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    View All
                  </Link>
                </div>
                {recentOrders.length > 0 ? (
                  <div className="space-y-3">
                    {recentOrders.slice(0, 5).map((order, index) => (
                      <motion.div
                        key={order.orderId || index}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg text-sm sm:text-base"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <span>#{order.orderId?.slice(-5) || "N/A"}</span>
                        <span className="truncate max-w-[120px] sm:max-w-[200px]">{order.productName || "N/A"}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs sm:text-sm ${order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {order.status || "Unknown"}
                        </span>
                        <span>
                          {order.date
                            ? new Date(order.date).toLocaleString("en-GB", {
                              month: "short",
                              day: "numeric",
                            })
                            : "N/A"}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm sm:text-base p-3 bg-gray-50 rounded-lg text-center">
                    No recent orders
                  </p>
                )}
              </section>

              <section className="bg-white/95 p-4 sm:p-6 rounded-xl shadow-md backdrop-blur-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-green-800">⚠️ Stock Alerts</h3>
                  <Link
                    to="/products-display"
                    className="text-green-600 hover:text-green-800 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Manage Stock
                  </Link>
                </div>
                {stockAlerts.length > 0 ? (
                  <div className="space-y-3">
                    {stockAlerts.slice(0, 5).map((item, index) => (
                      <motion.p
                        key={index}
                        className="text-sm sm:text-base text-gray-800 font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {item.name} — Only <span className="text-yellow-600">{item.stock}</span> left!
                      </motion.p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm sm:text-base p-3 bg-gray-50 rounded-lg text-center">
                    No stock alerts
                  </p>
                )}
              </section>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { to: "/products-add", label: "Add New Product", icon: <Leaf className="w-6 h-6 text-green-600" /> },
                { to: "/withdraw", label: "Withdraw Earnings", icon: <DollarSign className="w-6 h-6 text-green-600" /> },
                { to: "/support", label: "Contact Support", icon: <Headphones className="w-6 h-6 text-green-600" /> },
              ].map((action, index) => (
                <motion.div
                  key={index}
                  className="bg-white/95 p-4 sm:p-6 rounded-xl shadow-md backdrop-blur-lg text-center"
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to={action.to}
                    className="flex items-center justify-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    aria-label={action.label}
                  >
                    {action.icon}
                    {action.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </section>
  );
};

export default FarmerDashboard;