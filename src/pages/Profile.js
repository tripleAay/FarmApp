import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const buyerId = localStorage.getItem("loggedInId");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        deliveryAddress: "",
        profilePicture: "", // store URL from backend
    });

    const [file, setFile] = useState(null); // store selected file
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch existing profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/farmers/buyer/${buyerId}`
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

    // Handle input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle save
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const data = new FormData();
            data.append("fullName", formData.fullName);
            data.append("email", formData.email);
            data.append("phoneNumber", formData.phoneNumber);
            data.append("deliveryAddress", formData.deliveryAddress);
            if (file) {
                data.append("profilePicture", file); // actual file
            }

            const res = await axios.put(
                `http://localhost:5000/api/farmers/profile/${buyerId}`,
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (res.data) {
                alert("✅ Profile updated successfully!");
                setFormData(res.data.user); // update state with new data
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-orange-100 to-yellow-100">
                <p className="text-lg font-semibold text-gray-700">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-100 via-orange-100 to-yellow-100 p-6 sm:p-8 md:p-10">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl mx-auto p-8">
                <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
                    Edit Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* Email (read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email (cannot change)
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            disabled
                            className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* Delivery Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Delivery Address
                        </label>
                        <textarea
                            name="deliveryAddress"
                            value={formData.deliveryAddress}
                            onChange={handleChange}
                            rows="3"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        ></textarea>
                    </div>

                    {/* Profile Picture Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            name="profilePicture"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="mt-1 block w-full text-sm"
                        />
                        {formData.profilePicture && (
                            <img
                                src={formData.profilePicture}
                                alt="Preview"
                                className="w-24 h-24 mt-3 rounded-full object-cover border-2 border-green-500"
                            />
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className={`px-6 py-2 text-white rounded-md transition ${saving
                                ? "bg-green-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                                }`}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
