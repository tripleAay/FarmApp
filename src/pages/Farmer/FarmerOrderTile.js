import React, { useState, useEffect } from "react";

function FarmerOrderTile({ orders }) {
  const [groupedOrders, setGroupedOrders] = useState({});

  // Group orders by orderId when prop changes
  useEffect(() => {
    if (!orders) return;
    const grouped = orders.reduce((acc, order) => {
      if (!acc[order.orderId]) {
        acc[order.orderId] = {
          orderId: order.orderId,
          buyer: order.buyer,
          orderDate: order.orderDate,
          status: order.status,
          products: []
        };
      }
      acc[order.orderId].products.push({
        product: order.product,
        quantity: order.quantity,
        totalPrice: order.totalPrice
      });
      return acc;
    }, {});
    setGroupedOrders(grouped);
  }, [orders]);

  const handleStatusChange = (orderId, newStatus) => {
    setGroupedOrders(prev => ({
      ...prev,
      [orderId]: { ...prev[orderId], status: newStatus }
    }));
  };

  const handleSave = async () => {
    try {
      const updates = Object.values(groupedOrders).map(order => ({
        orderId: order.orderId,
        status: order.status
      }));

      const res = await fetch("http://localhost:5000/api/farmers/orders/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates })
      });

      if (!res.ok) throw new Error("Failed to update");
      alert("Order statuses updated successfully!");
    } catch (error) {
      console.error("Error updating orders:", error);
      alert("Failed to update order statuses.");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Shipped":
        return "text-blue-600 bg-blue-100";
      case "Delivered":
        return "text-green-600 bg-green-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Manage Order Status</h2>
      <div className="space-y-6">
        {Object.values(groupedOrders).map(order => (
          <div key={order.orderId} className="bg-white p-5 shadow-md rounded-lg border">
            <div className="mb-2">
              <h3 className="text-lg font-bold">Buyer: {order.buyer}</h3>
              <p className="text-sm text-gray-500">
                Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>

            <div className="mb-3">
              {order.products.map((p, idx) => (
                <div key={idx} className="flex justify-between text-sm border-b py-1">
                  <span>{p.product} (x{p.quantity})</span>
                  <span>₦{Number(p.totalPrice).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <label className="text-sm font-medium block mb-1">Status:</label>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
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

      {Object.keys(groupedOrders).length > 0 && (
        <div className="mt-6 text-right">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default FarmerOrderTile;
