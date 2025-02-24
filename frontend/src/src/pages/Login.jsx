import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Giriş sırasında hata oluştu.');
      }

      login(data);
      toast.success('Başarıyla giriş yaptınız!');
      
      // Redirect to Under Construction page after login
      navigate('/underconstruction');
    } catch (error) {
      toast.error(error.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
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
        throw new Error(data.message || 'Google ile giriş sırasında hata oluştu.');
      }
      login(data);
      toast.success('Google ile giriş başarılı!');
      
      // Redirect to Under Construction page after Google login
      navigate('/underconstruction');
    } catch (error) {
      toast.error(error.message);
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">Giriş Yap</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-pink-500 text-white p-3 rounded font-semibold hover:bg-pink-600 transition`}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google ile giriş başarısız.')}
            shape="pill"
            text="Google ile Giriş Yap"
            theme="filled_blue"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;