import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogPostForm = ({ initialValues, onSubmit, isEditing = false }) => {
  const [imagePreview, setImagePreview] = useState(initialValues?.coverImage || '');
  
  const formik = useFormik({
    initialValues: {
      title: initialValues?.title || '',
      excerpt: initialValues?.excerpt || '',
      content: initialValues?.content || '',
      category: initialValues?.category || 'musician-album',
      coverImage: initialValues?.coverImage || '',
      isFeatured: initialValues?.isFeatured || false,
      status: initialValues?.status || 'draft',
      seoMetaDescription: initialValues?.seoMetaDescription || '',
      readTime: initialValues?.readTime || 5
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      excerpt: Yup.string().required('Excerpt is required').max(500, 'Excerpt must be 500 characters or less'),
      content: Yup.string().required('Content is required'),
      category: Yup.string().required('Category is required'),
      coverImage: Yup.string().required('Cover image URL is required'),
      seoMetaDescription: Yup.string().max(160, 'SEO description must be 160 characters or less'),
      readTime: Yup.number().min(1, 'Read time must be at least 1 minute')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await onSubmit(values);
      setSubmitting(false);
    }
  });
  
  // Handle image preview
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    formik.setFieldValue('coverImage', url);
    setImagePreview(url);
  };
  
  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];
  
  // Category options
  const categoryOptions = [
    { value: 'musician-album', label: 'Musician & Album' },
    { value: 'music-technology', label: 'Music Technology' },
    { value: 'music-business', label: 'Music Business' },
    { value: 'musician-guides', label: 'Musician Guides' },
    { value: 'music-events', label: 'Music Events' },
    { value: 'music-venues', label: 'Music Venues' }
  ];
  
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09E1CE] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          {...formik.getFieldProps('title')}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
        )}
      </div>
      
      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Excerpt * (max 500 characters)
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows="3"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09E1CE] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            formik.touched.excerpt && formik.errors.excerpt ? 'border-red-500' : 'border-gray-300'
          }`}
          {...formik.getFieldProps('excerpt')}
        ></textarea>
        <div className="flex justify-between">
          {formik.touched.excerpt && formik.errors.excerpt ? (
            <div className="text-red-500 text-xs mt-1">{formik.errors.excerpt}</div>
          ) : (
            <div className="text-gray-500 text-xs mt-1">Brief summary that appears in blog listings</div>
          )}
          <div className="text-gray-500 text-xs mt-1">
            {formik.values.excerpt.length}/500
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Content *
        </label>
        <ReactQuill
          theme="snow"
          value={formik.values.content}
          onChange={(content) => formik.setFieldValue('content', content)}
          modules={modules}
          formats={formats}
          className="bg-white dark:bg-gray-700 rounded-md"
        />
        {formik.touched.content && formik.errors.content && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.content}</div>
        )}
      </div>
      
      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category *
        </label>
        <select
          id="category"
          name="category"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09E1CE] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            formik.touched.category && formik.errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
          {...formik.getFieldProps('category')}
        >
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.category}</div>
        )}
      </div>
      
      {/* Cover Image */}
      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Cover Image URL *
        </label>
        <input
          id="coverImage"
          name="coverImage"
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09E1CE] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            formik.touched.coverImage && formik.errors.coverImage ? 'border-red-500' : 'border-gray-300'
          }`}
          onChange={handleImageUrlChange}
          value={formik.values.coverImage}
        />
        {formik.touched.coverImage && formik.errors.coverImage && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.coverImage}</div>
        )}
        
        {imagePreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Image Preview:</p>
            <img 
              src={imagePreview} 
              alt="Cover preview" 
              className="w-full max-h-48 object-cover rounded-md"
              onError={() => setImagePreview('')}
            />
          </div>
        )}
      </div>
      
      {/* SEO Meta Description */}
      <div>
        <label htmlFor="seoMetaDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          SEO Meta Description (max 160 characters)
        </label>
        <textarea
          id="seoMetaDescription"
          name="seoMetaDescription"
          rows="2"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09E1CE] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            formik.touched.seoMetaDescription && formik.errors.seoMetaDescription ? 'border-red-500' : 'border-gray-300'
          }`}
          {...formik.getFieldProps('seoMetaDescription')}
        ></textarea>
        <div className="flex justify-between">
          {formik.touched.seoMetaDescription && formik.errors.seoMetaDescription ? (
            <div className="text-red-500 text-xs mt-1">{formik.errors.seoMetaDescription}</div>
          ) : (
            <div className="text-gray-500 text-xs mt-1">Description for search engines</div>
          )}
          <div className="text-gray-500 text-xs mt-1">
            {formik.values.seoMetaDescription.length}/160
          </div>
        </div>
      </div>
      
      {/* Read Time */}
      <div>
        <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Read Time (minutes)
        </label>
        <input
          id="readTime"
          name="readTime"
          type="number"
          min="1"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09E1CE] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            formik.touched.readTime && formik.errors.readTime ? 'border-red-500' : 'border-gray-300'
          }`}
          {...formik.getFieldProps('readTime')}
        />
        {formik.touched.readTime && formik.errors.readTime && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.readTime}</div>
        )}
      </div>
      
      {/* Featured Post */}
      <div className="flex items-center">
        <input
          id="isFeatured"
          name="isFeatured"
          type="checkbox"
          className="h-4 w-4 text-[#09E1CE] focus:ring-[#09E1CE] border-gray-300 rounded"
          checked={formik.values.isFeatured}
          onChange={() => formik.setFieldValue('isFeatured', !formik.values.isFeatured)}
        />
        <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Feature this post on the blog homepage
        </label>
      </div>
      
      {/* Status */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            id="draft"
            name="status"
            type="radio"
            value="draft"
            className="h-4 w-4 text-[#09E1CE] focus:ring-[#09E1CE] border-gray-300"
            checked={formik.values.status === 'draft'}
            onChange={() => formik.setFieldValue('status', 'draft')}
          />
          <label htmlFor="draft" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Save as Draft
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="published"
            name="status"
            type="radio"
            value="published"
            className="h-4 w-4 text-[#09E1CE] focus:ring-[#09E1CE] border-gray-300"
            checked={formik.values.status === 'published'}
            onChange={() => formik.setFieldValue('status', 'published')}
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Publish Now
          </label>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-[#09E1CE] hover:bg-[#09E1CE]/80 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 disabled:opacity-50"
        >
          {formik.isSubmitting ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;
