import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaLink } from 'react-icons/fa';

const BlogSocialShare = ({ title, slug }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Create the full URL for sharing
  const currentUrl = `https://gigmatch.io/blog/${slug}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);
  
  // Social media share URLs
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  
  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };
  
  return (
    <div className="flex items-center space-x-4 my-6">
      <span className="text-gray-600 dark:text-gray-300 text-sm">Share:</span>
      
      <a 
        href={facebookShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        aria-label="Share on Facebook"
      >
        <FaFacebook size={20} />
      </a>
      
      <a 
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-500 hover:text-sky-700 transition-colors duration-200"
        aria-label="Share on Twitter"
      >
        <FaTwitter size={20} />
      </a>
      
      <a 
        href={linkedinShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin size={20} />
      </a>
      
      <button
        onClick={copyToClipboard}
        className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
        aria-label="Copy link"
      >
        <FaLink size={20} />
      </button>
    </div>
  );
};

export default BlogSocialShare;
