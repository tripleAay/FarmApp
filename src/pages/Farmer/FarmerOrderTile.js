import React, { useEffect, useState } from "react";

function groupOrdersById(orders) {
  return orders.reduce((acc, order) => {
    const { orderId, ...rest } = order;
    if (!acc[orderId]) {
      acc[orderId] = {
        orderId,
        status: rest.status,
        products: []
      };
    }
    acc[orderId].products.push(rest);
    return acc;
  }, {});
}

export default function FarmerOrderTile({ orders }) {
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [isupdating, setIsupdating] = useState(false);

  useEffect(() => {
    setGroupedOrders(Object.values(groupOrdersById(orders || [])));
  }, [orders]);

  console.log("Grouped orders", groupedOrders)

  const handleStatusChange = (orderId, newStatus) => {
    setGroupedOrders(prev =>
      prev.map(order =>
        order.orderId === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const handleSave = async () => {
    try {
      setIsupdating(true)
      const updates = groupedOrders.map(order => ({
        orderId: order.orderId,
        status: order.status
      }));

      await fetch("http://localhost:5000/api/farmers/orders/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });

      alert("Statuses updated successfully!");
    } catch (error) {
      console.log("Error updating statuses", error)
    } finally {
      setIsupdating(false)
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      case "Delivered":
        return "bg-green-100 text-green-700 border border-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">
        Manage Order Status
      </h2>

      {groupedOrders.map(order => (
        <div
          key={order.orderId}
          className="bg-white shadow-lg rounded-lg p-5 mb-8 border border-gray-200"
        >
          {/* Order Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h3 className="font-bold text-lg">Order ID: {order.orderId}</h3>

            {/* One status for the whole order */}
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
              className={`px-3 py-2 rounded-lg font-medium ${getStatusStyle(order.status)}`}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Product List */}
          <div className="space-y-4">
            {order.products.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-gray-50 border border-gray-100"
              >
                <p className="font-semibold text-gray-800">{p.product}</p>
                <p className="text-sm text-gray-600">Buyer: {p.buyer}</p>
                <p className="text-sm">
                  Quantity: {p.quantity} | ₦{Number(p.totalPrice).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  Date: {new Date(p.orderDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Save Button */}
      {groupedOrders.length > 0 && (
        <div className="text-right">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            {isupdating ? "updating...." : "Save All Changes"}
          </button>
        </div>
      )}
    </div>
  );
}
