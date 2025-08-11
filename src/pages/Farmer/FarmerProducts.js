import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FarmerAddProduct = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const farmerId = localStorage.getItem('loggedInId');
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Farm product categories
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

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Product name is required')
      .max(50, 'Name must be 50 characters or less'),
    description: Yup.string()
      .required('Description is required')
      .max(500, 'Description must be 500 characters or less'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive')
      .min(0.01, 'Price must be at least 0.01'),
    quantity: Yup.string()
      .required('Quantity is required')
      .max(50, 'Quantity must be 50 characters or less'),
    category: Yup.string()
      .required('Category is required'),
    thumbnail: Yup.mixed().required('Thumbnail is required'),
    images: Yup.array()
      .max(5, 'You can upload a maximum of 5 images')
      .of(Yup.mixed())
  });

  const handleThumbnailChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('thumbnail', file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e, setFieldValue) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error('You can only upload up to 5 images');
      return;
    }
    setFieldValue('images', files);
    setGalleryPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('quantity', values.quantity);
      formData.append('category', values.category);
      formData.append('farmerId', farmerId);
      formData.append('thumbnail', values.thumbnail);
      values.images.forEach((file) => formData.append('images', file));

      const res = await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(res.data?.message || 'Product added successfully');
      resetForm();
      setThumbnailPreview(null);
      setGalleryPreviews([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-10">
      <ToastContainer />
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-10">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Add New Product</h1>
        <Formik
          initialValues={{ name: '', description: '', price: '', quantity: '', category: '', thumbnail: null, images: [] }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="grid grid-cols-1 gap-6 sm:grid-cols-2" encType="multipart/form-data">

              {/* Product Name */}
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="e.g., Fresh Tomatoes"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Category Dropdown */}
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <Field
                  as="select"
                  name="category"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:ring-green-500 focus:border-green-500 text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Description */}
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  placeholder="Describe your product..."
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Price */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Price (₦)</label>
                <Field
                  type="number"
                  name="price"
                  placeholder="e.g., 1500.00"
                  min="0.01"
                  step="0.01"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
                <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Quantity */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <Field
                  type="text"
                  name="quantity"
                  placeholder="e.g., 1 basket, 3 bags"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
                <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Thumbnail Upload */}
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleThumbnailChange(e, setFieldValue)}
                  className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                />
                <ErrorMessage name="thumbnail" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Thumbnail Preview */}
              {thumbnailPreview && (
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Thumbnail Preview</label>
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="rounded-lg shadow-md h-48 object-cover w-full mt-2"
                  />
                </div>
              )}

              {/* Multiple Images Upload */}
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Additional Images (Max 5)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImagesChange(e, setFieldValue)}
                  className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                />
                <ErrorMessage name="images" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Gallery Previews */}
              {galleryPreviews.length > 0 && (
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Additional Images Preview</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                    {galleryPreviews.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`Gallery Preview ${idx + 1}`}
                        className="rounded-lg shadow-md h-32 object-cover w-full"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="col-span-1 sm:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 font-medium shadow-md transition-all duration-200 ease-in-out disabled:opacity-60"
                >
                  {isSubmitting ? 'Adding Product...' : 'Add Product'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FarmerAddProduct;
