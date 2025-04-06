import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogPostForm from '../components/BlogPostForm';

const EditBlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get API base URL from environment variables
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // e.g., "https://api.gigmatch.io"
  
  // Fetch blog post by ID for admin editing
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/api/blogs/admin/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setBlog(data.data);
        } else {
          setError(data.message || 'Failed to fetch blog post');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.message || 'An error occurred while fetching the blog post');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id, apiBaseUrl]);
  
  // Handle form submission for updating blog post
  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(values)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update blog post');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Redirect to the admin blog list page
        navigate('/admin/blog');
      } else {
        setError(data.message || 'Failed to update blog post');
      }
    } catch (err) {
      console.error('Error updating blog post:', err);
      setError(err.message || 'An error occurred while updating the blog post');
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09E1CE]"></div>
      </div>
    );
  }
  
  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {error || 'Blog post not found'}
        </p>
        <button
          onClick={() => navigate('/admin/blog')}
          className="bg-[#09E1CE] hover:bg-[#09E1CE]/80 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Back to Blog Management
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Blog Post</h1>
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
          <BlogPostForm 
            initialValues={blog} 
            onSubmit={handleSubmit} 
            isEditing={true} 
          />
        </div>
      </div>
    </div>
  );
};

export default EditBlogPost;