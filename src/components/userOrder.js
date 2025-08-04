import React from 'react';
import { Link } from 'react-router-dom';

// Dummy data for orders
const dummyOrders = [
  {
    id: 1234,
    status: 'Pending Delivery',
    date: null,
  },
  {
    id: 1221,
    status: 'Delivered',
    date: 'July 30, 2025',
  },
  {
    id: 1220,
    status: 'Processing',
    date: null,
  },
  {
    id: 1219,
    status: 'Delivered',
    date: 'July 25, 2025',
  },
];

function UserOrder() {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          My Orders
        </h2>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {dummyOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="font-semibold text-gray-800">#{order.id}</span>
                <span
                  className={`text-sm ${
                    order.status === 'Delivered'
                      ? 'text-green-600'
                      : order.status === 'Pending Delivery'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  }`}
                >
                  {order.status}
                  {order.date && ` on ${order.date}`}
                </span>
              </div>
              <Link
                to={`/order/${order.id}`}
                className="text-sm text-green-600 hover:text-green-800 font-medium transition duration-200"
              >
                View
              </Link>
            </div>
          ))}
          {/* View All Orders */}
          <div className="mt-6 text-center">
            <Link
              to="/orders"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition duration-200"
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserOrder;