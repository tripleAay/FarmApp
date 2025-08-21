import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UserHead({ location = "Unknown", balance = 0 }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("loggedInId");

  const marketDays = [
    "🌾 Monday Market Day – Fresh Start!",
    "🍅 Tuesday Harvest – Best Picks!",
    "🥔 Wednesday Deals – Root Crops!",
    "🥬 Thursday Greens – Fresh Veggies!",
    "🍌 Friday Fruits – Weekend Vibes!",
    "🐟 Saturday Special – Farm & Fish!",
    "🌻 Sunday Restock – Fresh For You!"
  ];
  const [currentDay, setCurrentDay] = useState(0);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("userRole");

      if (!token || !userId || !role) throw new Error("Not authenticated");

      const endpoint =
        role === "buyer"
          ? `/api/farmers/user/${userId}`
          : `/api/farmers/${userId}`;

      const response = await axios.get(`http://localhost:5000${endpoint}`);
      const result = response.data;

      setUser(result.founduser || result.farmer);
    } catch (error) {
      console.error("Fetch User Error:", error);
      toast.error("Failed to load user data", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setUser({ fullName: "Guest", profilePicture: null });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDay((prev) => (prev + 1) % marketDays.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full py-2 px-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        
        {/* Left Section */}
        <div className="flex items-center gap-2">
          {/* Profile */}
          <div className="relative group">
            {loading ? (
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            ) : user?.profilePicture ? (
              <img
                src={`http://localhost:5000${user.profilePicture}`}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-green-500 hover:scale-105 transition-transform"
                onError={() => setUser({ ...user, profilePicture: null })}
              />
            ) : (
              <FaUserCircle className="text-3xl text-gray-500 hover:text-green-600 transition-colors cursor-pointer" />
            )}
          </div>

          {/* User Info */}
          <div className="flex flex-col leading-tight">
            <span className="text-sm text-gray-700">
              Hi,{" "}
              <strong className="text-green-700">
                {loading ? "Loading..." : user?.fullName || "Guest"}
              </strong>
            </span>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <span>{location}</span>
              <span className="text-gray-300">•</span>
              <span className="text-green-700 font-semibold">
                ₦{balance.toLocaleString("en-NG")}
              </span>
            </div>
          </div>
        </div>

        {/* Center Rotating Market Day */}
        <div className="flex-1 text-center overflow-hidden h-5">
          <div
            key={currentDay}
            className="text-xs sm:text-sm text-green-800 font-medium inline-block animate-slideUp"
          >
            {marketDays[currentDay]}
          </div>
        </div>

        {/* Right Spacer */}
        <div className="w-6" />
      </div>

      <style>
        {`
          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(100%); }
            50% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-100%); }
          }
          .animate-slideUp {
            animation: slideUp 4s ease-in-out;
          }
        `}
      </style>
    </header>
  );
}

export default UserHead;
