import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ShoppingCart } from "lucide-react";
import axios from 'axios';


function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('loggedInId');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://farmapp-backend-auwd.onrender.com/api/products/user");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [userId]);

  // Simulate add to cart with loading spinner
  const handleAddToCart = async (product) => {
    try {
      setLoadingId(product._id);

      const res = await axios.post(
        `https://farmapp-backend-auwd.onrender.com/api/products/addtocart/${userId}/${product._id}`,
        {
          quantity: 1,

        }
      );

      if (res.data.success) {
        alert(`${product.name} has been added to your cart! ✅`);
      }
    } catch (err) {
      console.error("Add to cart error:", err);
    } finally {
      setLoadingId(null); // Always reset, success or fail
    }
  };


  return (
    <section className="min-h-screen  py-12">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Featured Products 🌱
          </h2>
          <button className="text-sm bg-green-600 text-white px-5 py-2 rounded-full shadow hover:bg-green-700 transition duration-300">
            Filter Options
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden group relative"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
                <span
                  className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${product.availability === 'Available Now'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                    }`}
                >
                  {product.availability || "In Stock"}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col justify-between h-52">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Min Order: {product.quantity || "1 Pack"}
                  </p>
                  <p className="text-green-700 font-semibold text-lg">
                    ₦{product.price?.toLocaleString('en-NG')} / {product.quantity || "pack"}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {product.location}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-between items-center gap-2">
                  <button
                    onClick={() => navigate(`/productdetails/${product._id}`)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-2 rounded-xl transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-xl shadow transition px-2"
                  >
                    {loadingId === product._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShoppingCart className="w-4 h-4" />
                    )}
                    {loadingId === product._id ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;