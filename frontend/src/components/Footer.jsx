import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { Helmet } from 'react-helmet';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en');

  // Define language-specific text
  const subscribeTitle = isEnglish ? "Subscribe to Our Newsletter" : "Bültene Abone Olun";
  const subscribeDescription = isEnglish
    ? "Follow your favorite local artists, stages, and much more!"
    : "Favori lokal sanatçılarınızı, sahneleri ve çok daha fazlasını takip edin!";
  const subscribePlaceholder = isEnglish ? "Enter your email address" : "E-posta adresinizi girin";
  const subscribeButtonText = isEnglish ? "Subscribe" : "Abone Ol";
  
  const privacyLinkText = isEnglish ? "Privacy Policy" : "Gizlilik Politikası";
  const privacyLinkUrl = isEnglish ? "/en/privacy" : "/gizlilik";
  
  const termsLinkText = isEnglish ? "Terms of Use" : "Kullanım Şartları";
  const termsLinkUrl  = isEnglish ? "/en/terms" : "/terms";
  
  const copyrightText = isEnglish
    ? "© 2025 Gig Match. All rights reserved."
    : "© 2025 Gig Match. Tüm hakları saklıdır.";

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.gigmatch.io/api/subscribe/fan', {
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
        setSubscriptionMessage(isEnglish 
          ? "Subscription successful! Please check your email." 
          : "Abonelik başarılı! Lütfen e-postanızı kontrol edin.");
        console.log("Fan subscribed successfully!", data);
      } else {
        setSubscriptionMessage(isEnglish 
          ? "Subscription failed. Please try again." 
          : "Abonelik başarısız. Lütfen tekrar deneyin.");
        console.warn("Subscription failed", data);
      }
    } catch (error) {
      setSubscriptionMessage(isEnglish 
        ? "An error occurred. Please try again." 
        : "Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error("Error during subscription:", error);
    }
    setEmail("");
  };

  return (
    <>
      {/* SEO Structured Data for Organization */}
      <Helmet>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Gig Match",
            "url": "https://gigmatch.io",
            "logo": "https://gigmatch.io/assets/images/bannerlogo.svg",
            "sameAs": [
              "https://www.youtube.com/@GigMatch",
              "https://www.instagram.com/gigmatch.io/",
              "https://x.com/Gig_Match",
              "https://www.tiktok.com/@gig.match"
            ]
          }
        `}</script>
      </Helmet>
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
        <div className="container mx-auto px-4 space-y-8">
          {/* Subscribe Section */}
          <div className="bg-white max-w-lg mx-auto p-6 rounded-2xl shadow-lg border border-black">
            <h3 className="text-2xl font-bold mb-1 text-black">{subscribeTitle}</h3>
            <p className="mb-4 text-sm sm:text-base text-black">
              {subscribeDescription}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={subscribePlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-3 rounded border border-gray-800 bg-gray-800 focus:outline-none text-white placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="bg-pink-500 hover:bg-teal-500 transition px-6 py-3 rounded font-semibold"
              >
                {subscribeButtonText}
              </button>
            </form>
            {subscriptionMessage && (
              <p className="mt-4 text-center text-green-600 font-semibold">
                {subscriptionMessage}
              </p>
            )}
          </div>

          {/* Social & Info Section */}
          <div className="flex flex-col items-center space-y-4 text-sm">
            <div className="flex space-x-4">
              <Link 
                to={privacyLinkUrl}
                className="underline text-white hover:text-teal-500 transition"
              >
                {privacyLinkText}
              </Link>
              <Link 
                to={termsLinkUrl}
                className="underline text-white hover:text-teal-500 transition"
              >
                {termsLinkText}
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
              {copyrightText}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;