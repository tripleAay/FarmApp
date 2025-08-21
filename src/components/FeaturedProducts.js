import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ShoppingCart } from "lucide-react";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('loggedInId');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/user");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [userId]);

  const handleAddToCart = (product) => {
    setLoadingId(product._id);
    setTimeout(() => {
      setLoadingId(null);
      alert(`${product.name} has been added to your cart! ✅`);
    }, 1500);
  };

  return (
    <section className="min-h-screen mt-20 py-10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Featured Products 🌱
          </h2>
          <button className="text-xs bg-green-600 text-white px-4 py-1.5 rounded-full shadow hover:bg-green-700 transition">
            Filter Options
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden group relative"
            >
              {/* Image */}
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                />
                <span
                  className={`absolute top-2 left-2 px-2.5 py-0.5 text-[11px] font-medium rounded-full shadow-md ${
                    product.availability === 'Available Now'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {product.availability || "In Stock"}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col justify-between h-44">
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-0.5 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-0.5">
                    Min Order: {product.quantity || "1 Pack"}
                  </p>
                  <p className="text-green-700 font-semibold text-sm">
                    ₦{product.price?.toLocaleString('en-NG')} / {product.quantity || "pack"}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {product.location}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-3 flex justify-between items-center gap-2">
                  <button
                    onClick={() => navigate(`/productdetails/${product._id}`)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-1.5 rounded-lg transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs py-1.5 rounded-lg shadow transition"
                  >
                    {loadingId === product._id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <ShoppingCart className="w-3.5 h-3.5" />
                    )}
                    {loadingId === product._id ? "Adding..." : "Cart"}
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
