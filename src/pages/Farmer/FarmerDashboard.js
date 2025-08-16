import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Added for client-side routing
import DashHead from '../../components/DashHead';
import FarmerProfile from './FarmerProfile'; // Assumes FarmerProfile expects a `user` prop (optional)
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// Dummy user data in case database isn't ready
const dummyUser = {
  fullName: 'Adeshina Adeniyi',
  email: 'adeshina@example.com',
  phoneNumber: '+2348012345678',
  walletBalance: 50000,
  profilePicture: null,
};

function FarmerDashboard() {
  const [farmer, setFarmer] = useState([]);
  const id = localStorage.getItem('loggedInId');
  const [products, setProducts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [stockAlerts, setStockAlert] = useState([]);



  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/farmers/stats/${id}`
      );
      setProducts(response.data.stats || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchFarmer = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/farmers/${id}`);
      const data = await res.json();

      setFarmer(data.products || []);
      setRecentOrders(data.recentOrders || [])
      setStockAlert(data.stockAlerts || [])
    } catch (error) {
      console.error("Error fetching farmer", error);
    }
  };

  useEffect(() => {

    fetchProducts();
    fetchFarmer();
  }, [id]);
  return (
    <div className="flex min-h-screen bg-gray-100 mt-20">
      {/* Sidebar */}
      <ToastContainer />

      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6 text-green-800">Farmer Panel</h2>
        <nav className="space-y-4 text-gray-700 font-medium">
          <Link to="/products-display" className="hover:text-green-600 block">📦 My Products</Link>
          <Link to="/farmer-order" className="hover:text-green-600 block">🛒 Orders</Link>
          <Link to="/products-add" className="hover:text-green-600 block">➕ Add Product</Link>
          <a href="#wallet" className="hover:text-green-600 block">💰 Wallet</a>
          <a href="#messages" className="hover:text-green-600 block">💬 Messages</a>
          <a href="#settings" className="hover:text-green-600 block">⚙️ Settings</a>
          <a href="#support" className="hover:text-green-600 block">🛠️ Support</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <DashHead />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">

          <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold">{products.totalProducts}</div>
            <p>Total Products Listed</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold">{products.pendingOrdersCount}</div>
            <p>Pending Orders</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold">{products.totalEarnings}</div>
            <p>Total Earnings</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold">{products.totalSold}</div>
            <p>Products Sold</p>
          </div>

        </div>

        {/* Recent Orders and Stock Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">📥 Recent Orders</h3>
            <div className="space-y-2">
              {recentOrders && recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <div
                    key={order.orderId || index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md text-sm"
                  >
                    <span>#{order.orderId?.slice(-5) || "N/A"}</span>
                    <span>{order.productName || "N/A"}</span>
                    <span
                      className={`px-2 py-1 rounded-full ${order.status === "Pending"
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
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic text-sm p-3 bg-gray-50 rounded-md text-center">
                  No recent orders
                </div>
              )}
            </div>

          </section>

          <section className="bg-yellow-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">⚠️ Stock Alert</h3>

            {stockAlerts && stockAlerts.length > 0 ? (
              <>
                {stockAlerts.map((item, index) => (
                  <p key={index} className="text-yellow-800 font-medium">
                    {item.name} — Only {item.stock} left!
                  </p>
                ))}
              </>
            ) : (
              <p className="text-gray-500 italic">No stock alerts</p>
            )}
          </section>

        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {[
            <Link key="add" to="/products-add" className="hover:text-green-600 block">
              ➕ Add New Product
            </Link>,

            <Link key="withdraw" to="/withdraw" className="hover:text-green-600 block">
              💳 Withdraw Earnings
            </Link>,

            <Link key="support" to="/support" className="hover:text-green-600 block">
              📞 Contact Support
            </Link>
          ]
            .map((action, idx) => (
              <div key={idx} className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
                <button className="text-green-700 font-semibold hover:underline">
                  {action}
                </button>
              </div>
            ))}
        </div>

        {/* Profile Summary */}
        {/* <div className="mt-10">
          <FarmerProfile user={dummyUser} />
        </div> */}
      </main >
    </div >
  );
}

export default FarmerDashboard;