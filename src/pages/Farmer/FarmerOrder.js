import React, { useEffect, useState } from 'react';
import FarmerOrderTile from './FarmerOrderTile';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FarmerOrder() {
  const [orders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem('loggedInId');


  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/farmers/orders/${id}`
      );
      setRecentOrders(response.data.orders || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load Order');
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    fetchOrder();
  }, [id])





  // Color based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'Shipped':
        return 'text-blue-600 bg-blue-100';
      case 'Delivered':
        return 'text-green-600 bg-green-100';
      case 'Cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">My Orders</h1>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-green-100 text-left">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Buyer</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Order Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="py-3 px-4">{order.product}</td>
                  <td className="py-3 px-4">{order.buyer}</td>
                  <td className="py-3 px-4">{order.quantity}</td>
                  <td className="py-3 px-4">{order.totalPrice}</td>
                  <td className="py-3 px-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <FarmerOrderTile orders={orders} />
      </div>
    </div>
  );
}

export default FarmerOrder;
