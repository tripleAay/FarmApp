import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('loggedInId')

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`https://farmapp-backend-auwd.onrender.com/api/products/cart/${userId}`);
      setCartItems(res.data.products || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    setPlacingOrder(true)
    try {
      const res = await axios.post(`https://farmapp-backend-auwd.onrender.com/api/products/place-order/${userId}`);
      fetchCart();
      toast.success(res.data.message)
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setPlacingOrder(false);
    }
  }

  useEffect(() => {


    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const handleIncrement = async (productId) => {
    const action = "add";
    try {
      await axios.patch(`https://farmapp-backend-auwd.onrender.com/api/products/cart/update/${userId}/${productId}/${action}`);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      fetchCart();
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  const handleDecrement = async (productId) => {
    const action = "remove";
    try {
      await axios.patch(`https://farmapp-backend-auwd.onrender.com/api/products/cart/update/${userId}/${productId}/${action}`);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      fetchCart();
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };

  // Handle item removal
  const handleRemove = async (productId) => {
    try {
      await axios.patch(`https://farmapp-backend-auwd.onrender.com/api/products/cart/remove/${userId}/${productId}`);

      // Update state locally
      setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));

    } catch (error) {
      console.error("Error removing item", error);
    }
  };


  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 pb-24 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <ToastContainer />
      {/* Header with Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 ml-3">My Cart</h2>
      </div>

      {/* Empty Cart State */}
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-16">
          <div className="text-4xl mb-4">🧺</div>
          <p className="text-lg font-medium">Your cart is empty</p>
          <p className="text-sm mt-2">Add some fresh items to get started!</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={item.thumbnail}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{item.name}</div>
                <div className="text-sm text-gray-600">₦{item.price.toLocaleString()}</div>
                <div className="flex items-center mt-3 space-x-3">
                  <button
                    onClick={() => handleDecrement(item.productId)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-50"
                    disabled={item.quantity === 1}
                  >
                    <span className="text-lg">-</span>
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.productId)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="p-1 rounded-full hover:bg-red-100 transition"
                  aria-label="Remove item"
                >
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </button>
                <div className="font-semibold text-gray-800">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-xl">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total:</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </div>
            <button
              onClick={placeOrder}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition shadow-md">
              {placingOrder ? "Placing Your Order" : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Cart;