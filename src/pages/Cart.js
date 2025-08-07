import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';

const dummyCartItems = [
  {
    id: 1,
    name: 'Fresh Tomatoes (Basket)',
    image: 'https://via.placeholder.com/80x80.png?text=Tomatoes',
    price: 1200,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Plantain Bunch',
    image: 'https://via.placeholder.com/80x80.png?text=Plantain',
    price: 1800,
    quantity: 1,
  },
];

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(dummyCartItems);

  // Handle quantity increment
  const handleIncrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle quantity decrement
  const handleDecrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle item removal
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 pb-24 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
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
            onClick={() => navigate('/shop')}
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
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{item.name}</div>
                <div className="text-sm text-gray-600">₦{item.price.toLocaleString()}</div>
                <div className="flex items-center mt-3 space-x-3">
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-50"
                    disabled={item.quantity === 1}
                  >
                    <span className="text-lg">-</span>
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <button
                  onClick={() => handleRemove(item.id)}
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
            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition shadow-md">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;