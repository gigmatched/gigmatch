import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Giriş Yapılmamış</h1>
        <p>Lütfen giriş yapınız.</p>
      </div>
    );
  }

  // Some responses nest user data under a "user" property.
  const actualUser = user.user ? user.user : user;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profil</h1>
      <p>Hoş geldiniz, {actualUser.fullname}!</p>
      {/* Kullanıcı bilgilerinizi buraya ekleyebilirsiniz */}
    </div>
  );
};

export default Profile;