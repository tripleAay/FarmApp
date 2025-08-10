import React, { useState } from 'react';

function FarmerOrderTile({ orders }) {
  const [orderStates, setOrderStates] = useState(() =>
    orders.map(order => ({ ...order }))
  );

  const handleStatusChange = (id, newStatus) => {
    setOrderStates(prev =>
      prev.map(order =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleSave = () => {
    // TODO: Replace this with API call to save changes
    console.log('Saving updated orders:', orderStates);
    alert('Order statuses saved (check console for output).');
  };

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
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Manage Order Status</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orderStates.map((order) => (
          <div key={order._id} className="bg-white p-5 shadow-md rounded-lg border">
            <div className="mb-2">
              <h3 className="text-lg font-bold">{order.productName}</h3>
              <p className="text-sm text-gray-600">Buyer: {order.buyerName}</p>
            </div>
            <p>Quantity: {order.quantity}</p>
            <p>Total: ₦{order.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>

            <div className="mt-3">
              <label className="text-sm font-medium block mb-1">Status:</label>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className={`w-full p-2 rounded ${getStatusStyle(order.status)}`}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default FarmerOrderTile;
