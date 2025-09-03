import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();
  const buyerId = localStorage.getItem("loggedInId");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: "",
    profilePicture: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://farmapp-backend-auwd.onrender.com/api/farmers/buyer/${buyerId}`
        );
        if (res.data && res.data.foundBuyer) {
          setFormData(res.data.foundBuyer);
        }
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (buyerId) fetchProfile();
    else setLoading(false);
  }, [buyerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("deliveryAddress", formData.deliveryAddress);
      if (file) data.append("profilePicture", file);

      const res = await axios.put(
        `https://farmapp-backend-auwd.onrender.com/api/farmers/profile/${buyerId}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data) {
        alert("✅ Profile updated successfully!");
        setFormData(res.data.user);
        navigate("/profile");
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-yellow-100">
        <motion.p
          className="text-lg font-medium text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading your profile...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 p-6 sm:p-10 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden"
      >
        {/* Profile Sidebar */}
        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-green-200 via-green-100 to-white">
          <div className="relative group">
            <img
              src={
                formData.profilePicture ||
                "https://via.placeholder.com/150?text=No+Image"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
            />
            <label
              htmlFor="fileUpload"
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
            >
              Change
            </label>
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            {formData.fullName || "Unnamed User"}
          </h3>
          <p className="text-gray-500 text-sm">{formData.email}</p>
        </div>

        {/* Form Section */}
        <div className="md:col-span-2 p-8">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Delivery Address
              </label>
              <textarea
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                rows="3"
                className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-2 text-white rounded-xl shadow transition ${saving
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
