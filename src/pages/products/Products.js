import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronLeft, Star, Plus, Minus } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const userId = localStorage.getItem("loggedInId");

  // Fetch product details
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/products/${id}`);
      setProduct(res.data);
      setActiveImage(res.data.thumbnail || "https://via.placeholder.com/600");
      setSelectedSize(res.data.sizes?.[0] || "");
    } catch (error) {
      console.error("Fetch product error:", error);
      toast.error("Failed to load product details");
    } finally {
      setProductLoading(false);
    }
  };

  // Check if product is in cart
  const ifInCart = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/products/check-in-cart/${userId}/${id}`);
      setIsInCart(res.data.inCart);
    } catch (error) {
      console.error("Check cart error:", error);
      toast.error("Failed to check cart status");
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    ifInCart();
  }, [userId, id]);

  // Handle Add to Cart
  const [updating, setUpdating] = useState(false);
  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please log in to add items to your cart");
      navigate("/login");
      return;
    }
    if (!selectedSize && product?.sizes?.length) {
      toast.error("Please select a size");
      return;
    }
    try {
      setUpdating(true);
      const res = await axios.post(`http://localhost:5000/api/products/addtocart/${userId}/${id}`, {
        quantity,
        size: selectedSize,
      });
      if (res.data.success) {
        toast.success("✅ Added to cart!");
        ifInCart();
      } else {
        toast.error("⚠️ Could not add to cart: " + (res.data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      if (err.code === "ERR_NETWORK") {
        toast.error("❌ Network error: Unable to connect to the server. Please check your connection or try again later.");
      } else {
        toast.error(`❌ Error adding to cart: ${err.message}`);
      }
    } finally {
      setUpdating(false);
    }
  };

  // Quantity controls
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product?.stock || 10)));
  };

  // Image gallery handler
  const handleImageClick = (img) => {
    setActiveImage(img || "https://via.placeholder.com/600");
  };

  const isLoading = productLoading || cartLoading;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#166534] hover:text-blue-600 transition"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          <span className="mx-2">/</span>
          <a href="/" className="hover:text-blue-600">Home</a>
          <span className="mx-2">/</span>
          <span className="text-gray-500">{product?.category || "Category"}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-500">{product?.name || "Product"}</span>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 grid lg:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-xl"></div>
            ) : product ? (
              <>
                <img
                  src={activeImage}
                  alt={product.name || "Product"}
                  className="w-full h-[400px] object-contain rounded-xl shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                />
                <div className="flex gap-2 overflow-x-auto">
                  {[product.thumbnail, ...(product.images || [])].map((img, index) => (
                    <img
                      key={index}
                      src={img || "https://via.placeholder.com/100"}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition-all duration-200 ${activeImage === img ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-200"
                        }`}
                      onClick={() => handleImageClick(img)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && handleImageClick(img)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-center py-10">No product data available</div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                <div className="w-3/4 h-8 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-1/3 h-6 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-full h-16 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-1/4 h-8 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ) : product ? (
              <>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.round(product.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.numReviews || 0} Reviews)</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{product.description || "No description available"}</p>
                <div className="text-2xl font-semibold text-gray-900">
                  ${product.price?.toLocaleString("en-US", { minimumFractionDigits: 2 }) || "0.00"}
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through ml-3">
                      ${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>

                {/* Size Selector */}
                {product.sizes?.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Size:</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                      aria-label="Select product size"
                    >
                      <option value="">Select a size</option>
                      {product.sizes.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 disabled:opacity-50"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-4 py-2">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= (product.stock || 10)}
                      className="p-2 disabled:opacity-50"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart || updating || product.stock === 0}
                  className={`w-full py-3 rounded-lg text-lg font-semibold transition duration-300 ${isInCart || product.stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#166534] hover:bg-[#2ba65a] text-white"
                    }`}
                  aria-label={isInCart ? "Product already in cart" : "Add product to cart"}
                >
                  {isInCart ? "Added to Cart" : updating ? "Adding..." : "Add to Cart"}
                </button>

                {/* Additional Info */}
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✅ Premium Quality Product</li>
                  <li>🚚 Free Shipping on Orders Over $50</li>
                  <li>🔄 30-Day Return Policy</li>
                  <li>💳 Secure Checkout</li>
                </ul>
              </>
            ) : (
              <div className="text-gray-500">No product data available</div>
            )}
          </div>
        </div>

        {/* Customer Reviews (Placeholder) */}
        {product && !isLoading && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Customer Reviews</h2>
            {product.reviews?.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.slice(0, 3).map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{review.user}</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            )}
            <button
              className="mt-4 text-[#166534] hover:text-[#319658] font-medium"
              onClick={() => navigate(`/product/${id}/reviews`)}
            >
              Write a Review
            </button>
          </div>
        )}

        {/* Related Products (Placeholder) */}
        {product && !isLoading && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(4)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigate(`/product/${index + 1}`)}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1hyLmBOdkNwILGTv3fAHKYk05fKBHTE61dg&s"
                      alt="Related product"
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">Related Product {index + 1}</h3>
                    <p className="text-gray-600">$29.99</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;