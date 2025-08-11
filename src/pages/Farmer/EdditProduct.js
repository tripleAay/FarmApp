import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const farmerId = localStorage.getItem("loggedInId");
    const [isUpdating, setIsUpdating] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        featured: false,
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [existingThumbnail, setExistingThumbnail] = useState(null);
    const [deletedThumbnail, setDeletedThumbnail] = useState(false);

    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);

    const [loading, setLoading] = useState(true);

    const categories = [
        'Vegetables',
        'Fruits',
        'Grains',
        'Legumes',
        'Tubers',
        'Dairy Products',
        'Poultry',
        'Livestock',
        'Fish & Seafood',
        'Herbs & Spices'
    ];

    // Fetch product details
    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/products/products/${id}`);
            const product = res.data;
            console.log(res);

            setFormData({
                name: product.name || "",
                description: product.description || "",
                price: product.price || "",
                category: product.category || "",
                quantity: product.quantity || "",
                featured: product.featured || false,
            });

            setExistingThumbnail(product.thumbnail);
            setExistingImages(product.images || []);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load product details");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Remove existing image
    const handleRemoveExistingImage = (index) => {
        const imgToRemove = existingImages[index];
        setExistingImages(existingImages.filter((_, i) => i !== index));
        setDeletedImages([...deletedImages, imgToRemove]);
    };

    // Remove new image before upload
    const handleRemoveNewImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true)

        try {
            const form = new FormData();

            // Append allowed fields exactly as backend expects
            form.append("name", formData.name || "");
            form.append("description", formData.description || "");
            form.append("category", formData.category || "");
            form.append("price", String(formData.price || 0));
            form.append("quantity", String(formData.quantity || 0));
            form.append("unit", formData.unit || "");

            if (thumbnail) {
                form.append("thumbnail", thumbnail);
            }

            form.append("deletedThumbnail", deletedThumbnail ? "true" : "false");

            if (images.length > 0) {
                images.forEach((img) => form.append("images", img));
            }

            if (deletedImages.length > 0) {
                form.append("deletedImages", JSON.stringify(deletedImages));
            }

            const res = await axios.post(
                `http://localhost:5000/api/products/updateproduct/${farmerId}/${id}`,
                form,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            // ✅ Use backend message
            toast.success(res.data?.message);

            setTimeout(() => navigate("/products-display"), 1500);
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to update product"
            );
        } finally {
            setIsUpdating(false)
        }
    };


    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading product details...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10 px-4">
            <ToastContainer />
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-green-800 mb-6">Edit Product</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Fields */}
                    {["name", "description", "price", "category", "quantity"].map((field) => (
                        <div key={field}>
                            <label className="block text-gray-700 capitalize">{field}</label>

                            {field === "description" ? (
                                <textarea
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2 mt-1"
                                    rows="4"
                                ></textarea>
                            ) : field === "category" ? (
                                <select
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2 mt-1"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field === "price" ? "number" : "text"}  // <-- only price is number, quantity is text now
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2 mt-1"
                                />
                            )}
                        </div>
                    ))}



                    {/* Featured */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                        />
                        <label className="text-gray-700">Mark as Featured</label>
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block text-gray-700 mb-2">Thumbnail</label>
                        {thumbnail ? (
                            <div className="relative w-32 h-32 mb-2">
                                <img
                                    src={URL.createObjectURL(thumbnail)}
                                    alt="New Thumbnail"
                                    className="object-cover w-full h-full rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => setThumbnail(null)}
                                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            existingThumbnail &&
                            !deletedThumbnail && (
                                <div className="relative w-32 h-32 mb-2">
                                    <img
                                        src={`http://localhost:5000/${existingThumbnail.replace(/\\/g, "/")}`}
                                        alt="Thumbnail"
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setDeletedThumbnail(true)}
                                        className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files.length > 0) {
                                    setThumbnail(e.target.files[0]);
                                    setDeletedThumbnail(false);
                                }
                            }}
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    {/* Additional Images */}
                    <div>
                        <label className="block text-gray-700 mb-2">Additional Images (Max 5)</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {existingImages.map((img, index) => (
                                <div key={index} className="relative w-24 h-24">
                                    <img
                                        src={`http://localhost:5000/${img.replace(/\\/g, "/")}`}
                                        alt={`Image ${index + 1}`}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExistingImage(index)}
                                        className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-2">
                            {images.map((img, index) => (
                                <div key={index} className="relative w-24 h-24">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`New Image ${index + 1}`}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveNewImage(index)}
                                        className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setImages([...images, ...Array.from(e.target.files)].slice(0, 5))}
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            {isUpdating ? "updating...." : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
