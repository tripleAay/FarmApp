import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
                {/* SVG Illustration */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-32 h-32 mx-auto mb-6 text-green-500"
                    fill="currentColor"
                >
                    <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 32c97.2 0 176 78.8 176 176s-78.8 176-176 176S80 353.2 80 256 158.8 80 256 80zm-64 80c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm128 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-64 64c-44.2 0-80 35.8-80 80h32c0-26.5 21.5-48 48-48s48 21.5 48 48h32c0-44.2-35.8-80-80-80z" />
                </svg>

                {/* Text */}
                <h1 className="text-6xl font-extrabold text-red-600 mb-3">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-500 mb-8">
                    The page you’re looking for doesn’t exist or may have been moved.
                    Let’s get you back on track!
                </p>

                {/* Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300"
                >
                    ⬅ Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;
