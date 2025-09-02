import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Added for client-side routing

function FarmerProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const farmerId = localStorage.getItem('loggedInId');
  const [pageNum, setPageNum] = useState(1);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/farmer/${farmerId}?page=${pageNum}&limit=5`
      );
      setProducts(response.data.products || []);

    } catch (error) {
      console.error(error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/delete/${farmerId}/${productId}`);
      toast.success(response.data?.message);
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNum]);

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
                  src={product.thumbnail}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-green-700">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">{product.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-green-600 font-bold text-lg">₦{product.price}</span>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setPageNum((prev) => Math.max(prev - 1, 1))}
            disabled={pageNum === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPageNum((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default FarmerProductDisplay;
