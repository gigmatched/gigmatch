import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/bannerlogo.svg';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine language based on the pathname; if it starts with '/en', use English.
  const isEnglish = location.pathname.startsWith('/en');

  // Define labels based on the language.
  const labels = isEnglish
    ? {
        home: 'Home',
        ourStory: 'Our Story',
        contact: 'Contact',
        blog: 'Blog',
        profile: 'Profile',
        logout: 'Logout',
        login: 'Login',
        register: 'Register',
        languageToggle: 'TR'
      }
    : {
        home: 'Anasayfa',
        ourStory: 'Hikayemiz',
        contact: 'İletişim',
        blog: 'Blog',
        profile: 'Profil',
        logout: 'Çıkış Yap',
        login: 'Giriş Yap',
        register: 'Kayıt Ol',
        languageToggle: 'EN'
      };

  const handleLogout = () => {
    logout();
    // Redirect to the appropriate homepage based on language.
    navigate(isEnglish ? '/en/' : '/');
  };

  return (
    <header className="bg-navy">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left: Logo */}
        <Link to={isEnglish ? '/en/' : '/'}>
          <img src={logo} alt="GigMatch Logo" className="logo h-12" />
        </Link>

        {/* Right: Navigation and Buttons */}
        <nav className="flex items-center space-x-6">
          {/* Navigation Links */}
          <Link
            to={isEnglish ? '/en/' : '/'}
            className="text-white font-semibold hover:text-teal transition"
          >
            {labels.home}
          </Link>
          <Link
            to={isEnglish ? '/en/ourstory' : '/hikayemiz'}
            className="text-white font-semibold hover:text-teal transition"
          >
            {labels.ourStory}
          </Link>
          <Link
            to={isEnglish ? '/en/contact' : '/iletisim'}
            className="text-white font-semibold hover:text-teal transition"
          >
            {labels.contact}
          </Link>
                    <Link
            to={isEnglish ? '/en/blog' : '/blog'}
            className="text-white font-semibold hover:text-teal transition"
          >
            {labels.blog}
          </Link>

          {user ? (
            <>
              <Link
                to={isEnglish ? '/en/profile' : '/profil'}
                className="ml-4 bg-transparent border border-teal text-teal px-4 py-2 rounded-full font-semibold hover:bg-teal hover:text-white transition"
              >
                {labels.profile}
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 bg-pink text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-500 transition"
              >
                {labels.logout}
              </button>
            </>
          ) : (
            <>
              <Link
                to={isEnglish ? '/en/login' : '/giris'}
                className="ml-4 bg-transparent border border-teal text-teal px-4 py-2 rounded-full font-semibold hover:bg-teal hover:text-white transition"
              >
                {labels.login}
              </Link>
              <Link
                to={isEnglish ? '/en/register' : '/kayitol'}
                className="ml-2 bg-pink text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-500 transition"
              >
                {labels.register}
              </Link>
            </>
          )}

          {/* Language Toggle Button */}
          <Link
            to={isEnglish ? '/' : '/en'}
            className="ml-6 bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition"
          >
            {labels.languageToggle}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;