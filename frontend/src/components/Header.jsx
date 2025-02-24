import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/bannerlogo.svg';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-navy">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Sol Kısım: Logo */}
        <Link to="/">
          <img src={logo} alt="GigMatch Logo" className="logo h-12" />
        </Link>

        {/* Sağ Kısım: Navigasyon ve Butonlar */}
        <nav className="flex items-center space-x-6">
          {/* Navigasyon Linkleri */}
          <Link
            to="/"
            className="text-white font-semibold hover:text-teal transition"
          >
            Anasayfa
          </Link>
          <Link
            to="/ourstory"
            className="text-white font-semibold hover:text-teal transition"
          >
            Hikayemiz
          </Link>
          <Link
            to="/contact"
            className="text-white font-semibold hover:text-teal transition"
          >
            İletişim
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="ml-4 bg-transparent border border-teal text-teal px-4 py-2 rounded-full font-semibold hover:bg-teal hover:text-white transition"
              >
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 bg-pink text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-500 transition"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="ml-4 bg-transparent border border-teal text-teal px-4 py-2 rounded-full font-semibold hover:bg-teal hover:text-white transition"
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                className="ml-2 bg-pink text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-500 transition"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;