import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet';

const LoginEN = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://api.gigmatch.io/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred during login.');
      }
      toast.success('Login successful!');
      login(data);
      navigate('/underconstruction');
    } catch (error) {
      toast.error(error.message);
      console.error("Login error:", error);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred during Google login.');
      }
      toast.success('Google login successful!');
      login(data);
      navigate('/underconstruction');
    } catch (error) {
      toast.error(error.message);
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <Helmet>
        <title>Login - Gig Match</title>
        <meta name="description" content="Sign in to Gig Match to connect with venues, artists, and fans." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gigmatch.io/en/login" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Login - Gig Match" />
        <meta property="og:description" content="Login to your Gig Match account and access a world of music and creativity." />
        <meta property="og:url" content="https://gigmatch.io/en/login" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login - Gig Match" />
        <meta name="twitter:description" content="Sign in to Gig Match to continue your journey in the world of music." />
        <meta name="keywords" content="Gig Match, login, sign in, music, artist, venue, English" />
      </Helmet>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded font-semibold hover:bg-blue-600 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error('Google login failed.')}
            shape="pill"
            text="Sign in with Google"
            theme="filled_blue"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginEN;