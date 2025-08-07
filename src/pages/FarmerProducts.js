import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FarmerAddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);

  // Form validation schema
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

  // Preview selected image
  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('image', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10 px-4">
      <ToastContainer />
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Add New Product</h1>
        <Formik
          initialValues={{ name: '', description: '', price: '', image: null }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-6" encType="multipart/form-data">
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="e.g., Fresh Tomatoes"
                  className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Product Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  placeholder="Describe your product..."
                  className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Product Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (₦)
                </label>
                <Field
                  type="number"
                  name="price"
                  min="0.01"
                  step="0.01"
                  placeholder="e.g., 1500.00"
                  className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Product Image Upload */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-green-100 file:text-green-800 hover:file:bg-green-200"
                />
                <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="h-40 w-auto rounded-lg shadow"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60"
                >
                  {isSubmitting ? 'Adding...' : 'Add Product'}
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