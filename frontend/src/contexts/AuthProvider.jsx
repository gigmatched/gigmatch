// src/contexts/AuthProvider.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log("AuthProvider login:", userData);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // İsteğe bağlı: Kullanıcı verilerini temizleyebilirsiniz
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;