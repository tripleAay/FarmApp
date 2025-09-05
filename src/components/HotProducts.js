import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ShoppingCart, Loader2 } from 'lucide-react';

function HotProducts() {
  const [products, setProducts] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('loggedInId');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://farmapp-backend-auwd.onrender.com/api/products/user');
        const data = await res.json();
        const hotProducts = (data.products || []).slice(0, 8);
        setProducts(hotProducts);
      } catch (error) {
        console.error('Error fetching hot products:', error);
      }
    };
    fetchProducts();
  }, [userId]);

  const handleAddToCart = (product) => {
    setLoadingId(product._id);
    setTimeout(() => {
      setLoadingId(null);
      alert(`${product.name} has been added to your cart!`);
    }, 1500);
  };

  return (
    <section className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#FE4A49] tracking-tight">
            Sizzling Hot Products
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Discover the freshest picks straight from our farmers
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              {/* Hot Badge */}
              <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-semibold px-2 py-1 rounded-sm shadow">
                Hot
              </div>

              {/* Farmer Info */}
              <div className="absolute top-3 right-3 bg-orange-100 text-orange-700 text-[11px] px-2 py-0.5 rounded-full">
                {product.farmerName || 'Local Farmer'}
              </div>

              {/* Image */}
              <div className="relative w-full h-40 sm:h-44 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col h-44 justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">
                    Min Order: {product.quantity || '1 Pack'}
                  </p>
                  <p className="text-base font-bold text-red-600">
                    ₦{product.price?.toLocaleString('en-NG')}{' '}
                    <span className="text-xs font-normal text-gray-500">
                      / {product.quantity || 'pack'}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {product.location || 'Local Market'}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/productdetails/${product._id}`)}
                    className="flex-1 bg-gray-100 text-gray-700 text-xs py-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs py-2 rounded-md hover:brightness-110 transition-all duration-300"
                  >
                    {loadingId === product._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Flame className="w-4 h-4" />
                    )}
                    {loadingId === product._id ? 'Adding' : 'Grab'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-all duration-300 shadow-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Explore More Deals
          </button>
        </div>
      </div>
    </section>
  );
}

export default HotProducts;
