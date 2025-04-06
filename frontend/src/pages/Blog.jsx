import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import CategoryFilter from '../components/CategoryFilter';
import BlogSearch from '../components/BlogSearch';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 1,
  });

  // Get query parameters
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');

  // Available categories
  const categories = [
    'musician-album',
    'music-technology',
    'music-business',
    'musician-guides',
    'music-events',
    'music-venues',
  ];

  // Build base URL using env variables
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // e.g., "https://api.gigmatch.io"
  const blogsPath = import.meta.env.VITE_API_BLOGS_PATH; // e.g., "/api/blogs"

  // Fetch blogs based on filters
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let url = `${apiBaseUrl}${blogsPath}/published?page=${page}&limit=${pagination.limit}`;

        if (category) {
          url = `${apiBaseUrl}${blogsPath}/category/${category}?page=${page}&limit=${pagination.limit}`;
        }

        if (search) {
          url = `${apiBaseUrl}${blogsPath}/search?query=${encodeURIComponent(search)}`;
        }

        const response = await fetch(url);
        // If the response is HTML, throw an error
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          if (data.success) {
            setBlogs(data.data);
            setPagination(
              data.pagination || {
                page: 1,
                limit: 9,
                total: data.data.length,
                pages: 1,
              }
            );
          } else {
            setError('Failed to fetch blog posts');
          }
        } catch (jsonError) {
          throw new Error('Received non-JSON response');
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('An error occurred while fetching blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category, search, page, pagination.limit, apiBaseUrl, blogsPath]);

  // Fetch featured blogs
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const url = `${apiBaseUrl}${blogsPath}/featured?limit=3`;
        const response = await fetch(url);
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          if (data.success) {
            setFeaturedBlogs(data.data);
          }
        } catch (jsonError) {
          console.error('Received non-JSON response for featured blogs');
        }
      } catch (err) {
        console.error('Error fetching featured blogs:', err);
      }
    };

    fetchFeaturedBlogs();
  }, [apiBaseUrl, blogsPath]);

  // Handle category change
  const handleCategoryChange = (selectedCategory) => {
    const params = new URLSearchParams();
    if (selectedCategory) {
      params.append('category', selectedCategory);
    }
    params.append('page', '1'); // Reset to first page on category change
    setSearchParams(params);
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append('search', searchTerm);
    }
    setSearchParams(params);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Gig Match Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Insights, guides, and news for musicians and music venues
        </p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto mb-12">
        <BlogSearch onSearch={handleSearch} />
        <CategoryFilter
          categories={categories}
          activeCategory={category}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Featured Posts (only show if not searching or filtering) */}
      {!search && !category && featuredBlogs.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Featured Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} featured={true} />
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mb-12">
        {search && (
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Search Results for "{search}"
          </h2>
        )}

        {category && (
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {category.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())}
          </h2>
        )}

        {!search && !category && (
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Latest Posts
          </h2>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09E1CE]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            {search ? 'No results found for your search.' : 'No blog posts available.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && !error && blogs.length > 0 && pagination.pages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 rounded border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-300"
            >
              Previous
            </button>

            {[...Array(pagination.pages).keys()].map((num) => (
              <button
                key={num + 1}
                onClick={() => handlePageChange(num + 1)}
                className={`px-3 py-1 rounded ${
                  page === num + 1
                    ? 'bg-[#09E1CE] text-white'
                    : 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300'
                }`}
              >
                {num + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === pagination.pages}
              className="px-3 py-1 rounded border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-300"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Blog;