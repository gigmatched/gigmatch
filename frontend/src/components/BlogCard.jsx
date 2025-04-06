import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const BlogCard = ({ blog, featured = false }) => {
  const publishedDate = new Date(blog.publishedAt);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });
  
  return (
    <div className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl ${featured ? 'bg-gradient-to-r from-[#09E1CE]/10 to-[#FD54C9]/10' : 'bg-white dark:bg-gray-800'}`}>
      <Link to={`/blog/${blog.slug}`}>
        <div className="relative">
          <img 
            src={blog.coverImage} 
            alt={blog.title} 
            className="w-full h-48 object-cover"
          />
          {featured && (
            <div className="absolute top-3 left-3 bg-[#FD54C9] text-white text-xs font-bold px-2 py-1 rounded">
              Featured
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="text-white text-xs uppercase tracking-wider">
              {blog.category.replace('-', ' & ')}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/blog/${blog.slug}`}>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-[#09E1CE] transition-colors duration-200">
            {blog.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
        
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <span>{timeAgo}</span>
            <span className="mx-2">•</span>
            <span>{blog.readTime} min read</span>
          </div>
          
          <Link 
            to={`/blog/${blog.slug}`} 
            className="text-[#09E1CE] hover:text-[#FD54C9] font-medium transition-colors duration-200"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
