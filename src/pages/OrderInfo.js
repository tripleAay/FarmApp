import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OrderInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const fetchOrderById = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Not authenticated');
        const response = await fetch(`http://localhost:5000/api/products/orderinfo/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Failed to fetch order info');
        return result.order;
        console.log(result.order);

    };


    const { data: order, isLoading, error } = useQuery({
        queryKey: ['orderInfo', id],
        queryFn: () => fetchOrderById(id),
        retry: 1,
        onError: (err) => {
            toast.error(err.message || 'Error loading order', { theme: 'colored' });
            if (err.message.includes('Not authenticated')) {
                navigate('/login');
            }
        },
    });

    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50">
                <p className="text-green-700 text-lg">Loading Order Info...</p>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50">
                <p className="text-red-600">Failed to load order details.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 p-4 sm:p-6 md:p-8">
            {/* Header */}
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-6">
                <h1 className="text-2xl font-bold text-green-700">Order Details</h1>
                <p className="text-gray-600">Order ID: {order._id}</p>
                <p className="mt-1">
                    <span className="font-semibold">Status:</span>{' '}
                    <span
                        className={`px-2 py-1 rounded-full text-sm ${order.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                    >
                        {order.status}
                    </span>
                </p>
            </div>

            {/* Products */}
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-6">
                <h2 className="text-xl font-bold text-green-700 mb-4">Products</h2>
                <div className="space-y-4">
                    {order.products.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-4 border-b pb-4 last:border-none last:pb-0"
                        >
                            <img
                                src={`http://localhost:5000/${item.thumbnail.replace(/\\/g, '/')}`}

                                alt={item.productName}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-1">
                                <p className="font-semibold">{item.productName}</p>
                                <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-green-700">
                                ${item.price.toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Info */}
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-6">
                <h2 className="text-xl font-bold text-green-700 mb-4">Order Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <p><span className="font-semibold">Ordered Date:</span> {formatDate(order.orderedDate)}</p>
                    <p><span className="font-semibold">Delivery Date:</span> {formatDate(order.dateToBeDelivered)}</p>
                    <p><span className="font-semibold">Date Delivered:</span> {formatDate(order.dateDelivered)}</p>
                    <p><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</p>
                    <p><span className="font-semibold">Transaction ID:</span> {order.transactionId || 'N/A'}</p>
                    <p><span className="font-semibold">Paid:</span> {order.paid ? 'Yes' : 'No'}</p>
                    <p><span className="font-semibold">Approved:</span> {order.approved ? 'Yes' : 'No'}</p>
                    <p><span className="font-semibold">Total Price:</span> ₦{order.totalPrice?.toFixed(2)}</p>
                </div>
            </div>

            {/* Payment Proof */}
            {order.paymentImage && (
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-6">
                    <h2 className="text-xl font-bold text-green-700 mb-4">Payment Proof</h2>
                    <img
                        src={order.paymentImage}
                        alt="Payment Proof"
                        className="w-full max-w-md rounded-lg border"
                    />
                </div>
            )}

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
                Back
            </button>
        </div>
    );
};

export default OrderInfo;
