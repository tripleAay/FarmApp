import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInCart, setIsInCart] = useState(false);
    const userId = localStorage.getItem('loggedInId');


    const fetchProduct = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/products/products/${id}`
            );
            setProduct(res.data);  // true or false

        } catch (error) {
            console.error(error);
            toast.error("Failed to load product details");
        } finally {
            setLoading(false);
        }
    };

    const ifInCart = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/products/check-in-cart/${userId}/${id}`
            );

            setIsInCart(res.data.inCart);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load product details");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct();
        ifInCart();

    }, [userId, id]);

    const [updating, setupdating] = useState(false);
    const [message, setMessage] = useState("");

    const handleAddToCart = async () => {
        try {
            setupdating(true);
            setMessage("");

            const res = await axios.post(
                `http://localhost:5000/api/products/addtocart/${userId}/${id}`,
                { quantity: 1 }
            );


            if (res.data.success) {
                setMessage("✅ Added to cart!");
                toast.success("✅ ", res.data.message);

            } else {
                setMessage("⚠️ Could not add to cart");
            }
            ifInCart();
        } catch (err) {
            console.error(err);
            setMessage("❌ Error adding to cart");
        } finally {
            setupdating(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <ToastContainer />

            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10">
                {/* Left: Image Gallery */}
                <div>
                    {loading ? (
                        <div className="w-full h-96 bg-gray-200 animate-pulse rounded-xl"></div>
                    ) : (
                        <>
                            <img
                                src={
                                    product?.thumbnail
                                        ? `http://localhost:5000/${product.thumbnail.replace(
                                            /\\/g,
                                            "/"
                                        )}`
                                        : "/fallback-image.png"
                                }
                                alt={product?.name || "Product"}
                                className="rounded-xl w-full h-96 object-cover shadow-md"
                            />
                            <div className="flex gap-3 mt-4">
                                {product?.images?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={
                                            product?.thumbnail
                                                ? `http://localhost:5000/${img.replace(
                                                    /\\/g,
                                                    "/"
                                                )}`
                                                : "/fallback-image.png"
                                        }

                                        alt=""
                                        className="w-20 h-20 object-cover rounded-lg border hover:border-green-500 cursor-pointer"
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Right: Product Info */}
                <div>
                    {loading ? (
                        <div className="space-y-4">
                            <div className="w-2/3 h-8 bg-gray-200 animate-pulse rounded"></div>
                            <div className="w-1/3 h-6 bg-gray-200 animate-pulse rounded"></div>
                            <div className="w-full h-20 bg-gray-200 animate-pulse rounded"></div>
                            <div className="w-1/4 h-8 bg-gray-200 animate-pulse rounded"></div>
                            <div className="w-full h-12 bg-gray-200 animate-pulse rounded"></div>
                            <div className="space-y-2">
                                <div className="w-2/3 h-4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="w-1/3 h-4 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold text-green-700 mb-2">
                                {product?.name}
                            </h2>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-yellow-500 text-lg">
                                    ⭐ {product?.rating ?? 0}
                                </span>
                                <span className="text-gray-500">
                                    ({product?.numReviews ?? 0} Reviews)
                                </span>
                            </div>

                            <p className="text-gray-600 mb-4">
                                {product?.description || "No description available"}
                            </p>

                            {/* Price */}
                            <div className="text-2xl font-semibold text-green-700 mb-6">
                                ₦{product?.price?.toLocaleString() || "0"}
                            </div>

                            {/* Size Selector */}
                            <label className="block mb-2 font-medium text-gray-700">
                                Select Pack Size:
                            </label>
                            <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 mb-6">
                                {product?.sizes?.map((size, index) => (
                                    <option key={index}>{size}</option>
                                )) || <option>Default</option>}
                            </select>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isInCart} // disables if true
                                className={`w-full py-3 rounded-lg text-lg shadow-md transition duration-300
    ${isInCart
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700 text-white"
                                    }`}
                            >
                                🛒 {isInCart
                                    ? "Added in Cart"
                                    : updating
                                        ? "Updating Cart"
                                        : "Add to Cart"}
                            </button>


                            {/* Extra Info */}
                            <ul className="mt-6 text-gray-600 space-y-2">
                                <li>✅ Farm Fresh & Organic</li>
                                <li>🚚 Free Delivery on Bulk Orders</li>
                                <li>💯 Satisfaction Guaranteed</li>
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
