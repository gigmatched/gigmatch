import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogPostForm from '../components/BlogPostForm';

const CreateBlogPost = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Get the API base URL from environment variables
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // e.g., "https://api.gigmatch.io"

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create blog post');
      }

      const data = await response.json();

      if (data.success) {
        // Redirect to the admin blog list page
        navigate('/admin/blog');
      } else {
        setError(data.message || 'Failed to create blog post');
      }
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError(err.message || 'An error occurred while creating the blog post');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Blog Post</h1>
          <button
            onClick={() => navigate('/admin/blog')}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Cancel
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <BlogPostForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;