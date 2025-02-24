import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UnderConstruction = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Log the received user object for debugging
  console.log("UnderConstruction - user:", user);

  if (!user) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Giriş Yapılmamış</h1>
        <p>Lütfen giriş yapınız.</p>
      </div>
    );
  }

  // Extract the actual user data if it's nested (e.g. user.user)
  const actualUser = user.user ? user.user : user;

  // Convert to lower case for a case-insensitive comparison
  const userRole = actualUser.role?.toLowerCase();
  console.log("UnderConstruction - userRole:", userRole);

  if (userRole !== 'artist' && userRole !== 'organizer') {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Erişim Yetkiniz Yok</h1>
        <p>Bu sayfa yalnızca sanatçı ve organizatörler için geçerlidir.</p>
      </div>
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Update destination as needed
    }, 10000); // Redirect after 10 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-navy text-white p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Yakında Hizmetindeyiz!</h1>
        <p className="text-lg mb-4">
          Üye olduğun için çok teşekkürler! Sitemiz çok yakında işlevli hale gelecektir.
          Bu sırada takipte kalmak için mail bültenimize abone olmayı unutma.
        </p>
        <p className="text-md italic">
          Bu sayfa geçicidir ve lansmandan sonra kaldırılacaktır. Otomatik olarak yönlendirileceksiniz.
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;