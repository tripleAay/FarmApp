import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "lucide-react";

function UserOrder() {
  const userId = localStorage.getItem("loggedInId");
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `https://farmapp-backend-auwd.onrender.com/api/products/order/${userId}`
      );
      setOrderItems(res.data.orders || []);
      console.log(res.data.orders);

    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  return (
    <section className="min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
            <User className="w-8 h-8 text-green-700" />
          </div>
          <h2 className="mt-3 text-xl md:text-2xl font-bold text-green-800">
            My Orders
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {orderItems.length > 0
              ? `You have ${orderItems.length} active orders`
              : "No orders yet, start shopping today!"}
          </p>
        </div>

        {/* Orders Section */}
        <div className="grid gap-4 md:grid-cols-2">
          {orderItems.map((order, index) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  #{index + 1}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mt-3 text-gray-600 text-xs italic">
                {order.orderedDate &&
                  `Placed on ${new Date(
                    order.orderedDate
                  ).toLocaleDateString()} at ${new Date(
                    order.orderedDate
                  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
              </div>

              <div className="mt-4 flex justify-end">
                <Link
                  to={`/order/${order._id}`}
                  className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Orders Button */}
        {orderItems.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/orders"
              className="inline-block px-5 py-2.5 bg-green-700 text-white rounded-full font-medium text-sm shadow-sm hover:bg-green-800 transition duration-300"
            >
              View All Orders
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default UserOrder;
