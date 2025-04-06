import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../contexts/AuthContext';

const UnderConstructionEN = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to homepage after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-navy text-white p-6">
      <Helmet>
        <title>404 - Page Not Found - Gig Match</title>
        <meta 
          name="description" 
          content="The page you are looking for does not exist or is under construction. You will be redirected shortly." 
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://gigmatch.io/en/404" />

        {/* Open Graph tags */}
        <meta property="og:title" content="404 - Page Not Found - Gig Match" />
        <meta 
          property="og:description" 
          content="The page you are looking for does not exist or is under construction. Please wait, you will be redirected to the homepage soon." 
        />
        <meta property="og:url" content="https://gigmatch.io/en/404" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="404 - Page Not Found - Gig Match" />
        <meta 
          name="twitter:description" 
          content="The page you are trying to access is not available or under construction. You will be redirected shortly." 
        />
        <meta name="keywords" content="Gig Match, 404, page not found, under construction, English" />
      </Helmet>
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">
          The page you are looking for does not exist or it is currently under construction.
        </p>
        <p className="text-md italic">
          You will be redirected to the homepage in a few seconds.
        </p>
      </div>
    </div>
  );
};

export default UnderConstructionEN;