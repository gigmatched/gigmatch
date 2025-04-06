import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('artist'); // default role selection
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting registration:", { fullname, email, password, role });

    if (!fullname.trim() || !email.trim() || !password.trim() || !role.trim()) {
      toast.error('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }
    
    // Password validation regex: Minimum 8 characters, at least one uppercase, one lowercase, and one number
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
      toast.error('Şifre en az 8 karakter olmalı, en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.');
      return;
    }
    
    try {
      const response = await fetch('https://api.gigmatch.io/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullname, email, password, role })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Kayıt sırasında bir hata oluştu.');
      }
      
      toast.success('Kayıt işlemi başarılı!');
      
      login(data);
      
      navigate('/underconstruction');
    } catch (error) {
      toast.error(error.message);
      console.error("Registration error:", error);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: credentialResponse.credential })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Google ile kayıt sırasında hata oluştu.');
      }
      toast.success('Google ile kayıt başarılı!');
      login(data);
      navigate('/underconstruction');
    } catch (error) {
      toast.error(error.message);
      console.error("Google registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <Helmet>
        <title>Üye Ol - Gig Match</title>
        <meta 
          name="description" 
          content="Gig Match'e üye olun ve müzik sahnesinin en iyi etkinliklerine erişin." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gigmatch.io/uyeol" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Üye Ol - Gig Match" />
        <meta 
          property="og:description" 
          content="Gig Match'e üye olun ve müzik sahnesinin en iyi etkinliklerine erişin." 
        />
        <meta property="og:url" content="https://gigmatch.io/uyeol" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Üye Ol - Gig Match" />
        <meta 
          name="twitter:description" 
          content="Gig Match'e üye olun ve müzik sahnesinin en iyi etkinliklerine erişin." 
        />

        {/* Optional Keywords */}
        <meta name="keywords" content="Gig Match, üye ol, kayıt, müzik, sahne, GigMatch, Türk" />
      </Helmet>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-teal-500 mb-6">Üye Ol</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Adınız Soyadınız"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          {/* Role selector */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded border border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          >
            <option value="artist">Artist</option>
            <option value="organizer">Organizer</option>
          </select>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white p-3 rounded font-semibold hover:bg-teal-600 transition"
          >
            Hemen Üye Ol
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error('Google ile kayıt başarısız.')}
            shape="pill"
            text="Google ile Kayıt Olun"
            theme="filled_blue"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;