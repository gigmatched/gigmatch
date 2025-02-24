import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/subscribe/fan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      let data = {};
      try {
        data = await response.json();
      } catch (err) {
        console.error("Error parsing response JSON:", err);
      }
      
      if (data.success) {
        setSubscriptionMessage("Abonelik başarılı! Lütfen epostanızı kontrol edin.");
        console.log("Fan subscribed successfully!", data);
      } else {
        setSubscriptionMessage("Abonelik başarısız. Lütfen tekrar deneyin.");
        console.warn("Subscription failed", data);
      }
    } catch (error) {
      setSubscriptionMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error("Error during subscription:", error);
    }
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
      <div className="container mx-auto px-4 space-y-8">
        {/* Subscribe Section */}
        <div className="bg-white max-w-lg mx-auto p-6 rounded-2xl shadow-lg border border-black">
          <h3 className="text-2xl font-bold mb-1 text-black">Bültene Abone Olun</h3>
          <p className="mb-4 text-sm sm:text-base text-black">
            Favori lokal sanatçılarınızı, sahneleri ve çok daha fazlasını kaçırmayın!
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="E-posta adresinizi girin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 p-3 rounded border border-gray-800 bg-gray-800 focus:outline-none text-white placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-teal-500 transition px-6 py-3 rounded font-semibold"
            >
              Abone Ol
            </button>
          </form>
          {subscriptionMessage && (
            <p className="mt-4 text-center text-green-600 font-semibold">
              {subscriptionMessage}
            </p>
          )}
        </div>

        {/* Social & Info Section - Updated Order */}
        <div className="flex flex-col items-center space-y-4 text-sm">
          <div>
            <Link to="/privacy" className="text-white hover:text-teal-500 transition">
              Privacy Policy
            </Link>
          </div>
          <div className="flex space-x-4">
            <a 
              href="https://www.youtube.com/@GigMatch" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-teal-500 transition"
            >
              <FaYoutube size={24} />
            </a>
            <a 
              href="https://www.instagram.com/gigmatch.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-teal-500 transition"
            >
              <FaInstagram size={24} />
            </a>
            <a 
              href="https://x.com/Gig_Match" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-teal-500 transition"
            >
              <FaTwitter size={24} />
            </a>
            <a 
              href="https://www.tiktok.com/@gig.match" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-teal-500 transition"
            >
              <SiTiktok size={24} />
            </a>
          </div>
          <p className="text-white">
            &copy; 2025 Gig Match. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;