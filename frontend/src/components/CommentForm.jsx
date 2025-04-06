import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CommentForm = ({ blogId, parentCommentId = null, onCommentSubmitted }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      content: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      content: Yup.string().required('Comment is required').min(3, 'Comment must be at least 3 characters')
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            blogId,
            parentCommentId,
            name: values.name,
            email: values.email,
            content: values.content
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          resetForm();
          if (onCommentSubmitted) {
            onCommentSubmitted(data.data);
          }
        } else {
          console.error('Error submitting comment:', data.message);
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      } finally {
        setSubmitting(false);
      }
    }
  });
  
  return (
    <form onSubmit={formik.handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {parentCommentId ? 'Leave a Reply' : 'Join the Conversation'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09E1CE] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email * (will not be published)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09E1CE] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Comment *
        </label>
        <textarea
          id="content"
          name="content"
          rows="4"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09E1CE] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            formik.touched.content && formik.errors.content ? 'border-red-500' : 'border-gray-300'
          }`}
          {...formik.getFieldProps('content')}
        ></textarea>
        {formik.touched.content && formik.errors.content && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.content}</div>
        )}
      </div>
      
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="bg-[#09E1CE] hover:bg-[#09E1CE]/80 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50"
      >
        {formik.isSubmitting ? 'Submitting...' : 'Post Comment'}
      </button>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Your comment will be reviewed before appearing on the site.
      </p>
    </form>
  );
};

export default CommentForm;
