import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import BlogSocialShare from '../components/BlogSocialShare';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  // Build base URL from env variables
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // e.g., "https://api.gigmatch.io"
  const blogsPath = import.meta.env.VITE_API_BLOGS_PATH;  // e.g., "/api/blogs"
  
  // Fetch blog post by slug
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}${blogsPath}/slug/${slug}`);
        const data = await response.json();
        
        if (data.success) {
          setBlog(data.data);
          // If comments are included, set them; otherwise fetch them separately.
          if (data.data.comments) {
            setComments(data.data.comments);
          } else {
            fetchComments(data.data._id);
          }
        } else {
          setError('Failed to fetch blog post');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('An error occurred while fetching the blog post');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [slug, apiBaseUrl, blogsPath]);
  
  // Fetch comments for the blog post
  const fetchComments = async (blogId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/comments/blog/${blogId}`);
      const data = await response.json();
      
      if (data.success) {
        setComments(data.data);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };
  
  // Fetch related posts based on category
  useEffect(() => {
    if (blog) {
      const fetchRelatedPosts = async () => {
        try {
          const response = await fetch(`${apiBaseUrl}${blogsPath}/category/${blog.category}?limit=3`);
          const data = await response.json();
          
          if (data.success) {
            // Filter out the current blog post
            const filtered = data.data.filter(post => post._id !== blog._id);
            setRelatedPosts(filtered.slice(0, 3)); // Limit to 3 related posts
          }
        } catch (err) {
          console.error('Error fetching related posts:', err);
        }
      };
      
      fetchRelatedPosts();
    }
  }, [blog, apiBaseUrl, blogsPath]);
  
  // Handle new comment submission
  const handleCommentSubmitted = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
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
        <Link 
          to="/blog" 
          className="inline-block bg-[#09E1CE] hover:bg-[#09E1CE]/80 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Back to Blog
        </Link>
      </div>
    );
  }
  
  const publishedDate = new Date(blog.publishedAt);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });
  
  // Format category for display
  const categoryDisplay = blog.category
    .replace('-', ' & ')
    .replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to blog link */}
      <div className="mb-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-[#09E1CE] hover:text-[#FD54C9] transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Blog
        </Link>
      </div>
      
      {/* Blog header */}
      <header className="mb-8">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
          <Link 
            to={`/blog?category=${blog.category}`}
            className="text-[#09E1CE] hover:text-[#FD54C9] transition-colors duration-200"
          >
            {categoryDisplay}
          </Link>
          <span className="mx-2">•</span>
          <span>{timeAgo}</span>
          <span className="mx-2">•</span>
          <span>{blog.readTime} min read</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {blog.title}
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          {blog.excerpt}
        </p>
        
        {blog.author && (
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 mr-3">
              {blog.author.fullname ? blog.author.fullname.charAt(0) : 'A'}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {blog.author.fullname || 'Anonymous'}
              </p>
            </div>
          </div>
        )}
      </header>
      
      {/* Featured image */}
      <div className="mb-8">
        <img 
          src={blog.coverImage} 
          alt={blog.title} 
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      
      {/* Blog content */}
      <div className="max-w-3xl mx-auto mb-12">
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
      
      {/* Social sharing */}
      <div className="max-w-3xl mx-auto mb-12">
        <BlogSocialShare title={blog.title} slug={slug} />
      </div>
      
      {/* Comments section */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Join the Conversation
        </h2>
        
        <CommentForm 
          blogId={blog._id} 
          onCommentSubmitted={handleCommentSubmitted} 
        />
        
        <CommentList comments={comments} />
      </div>
      
      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Related Posts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(post => (
              <div key={post._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <Link to={`/blog/${post.slug}`}>
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                </Link>
                
                <div className="p-4">
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white hover:text-[#09E1CE] transition-colors duration-200">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="text-[#09E1CE] hover:text-[#FD54C9] text-sm font-medium transition-colors duration-200"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;