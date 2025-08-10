import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FarmerProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/farmer'); // Update endpoint as necessary
      setProducts(response.data.products || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10 px-4">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">My Products</h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500">You have not added any products yet.</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col justify-between"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-green-700">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">{product.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-green-600 font-bold text-lg">₦{product.price}</span>
                  <span className="text-xs text-gray-400">{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FarmerProductDisplay;
