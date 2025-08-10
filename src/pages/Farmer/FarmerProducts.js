import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FarmerAddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);

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
    image: Yup.mixed()
      .required('Product image is required')
      .test('fileSize', 'Image is too large (max 5MB)', value => {
        return value && value.size <= 5 * 1024 * 1024;
      }),
  });

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('image', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('image', values.image);

      const res = await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(res.data?.message || 'Product added successfully');
      resetForm();
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 'Failed to add product. Please try again.'
      );
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
          initialValues={{ name: '', description: '', price: '', image: null }}
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

              {/* Image Upload */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                />
                <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="col-span-1 sm:col-span-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="rounded-lg shadow-md h-48 object-cover w-full mt-2"
                  />
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
