import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const UnderConstruction = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("UnderConstruction - user:", user);

  if (!user) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Giriş Yapılmamış</h1>
        <p>Lütfen giriş yapınız.</p>
      </div>
    );
  }

  const actualUser = user.user ? user.user : user;
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
      navigate('/');
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-navy text-white p-6">
      <Helmet>
        <title>404 - Sayfa Bulunamadı - Gig Match</title>
        <meta 
          name="description" 
          content="Aradığınız sayfa bulunamadı veya henüz hazır değil. Gig Match üzerinde bu sayfa üzerinde çalışmalar sürüyor." 
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://gigmatch.io/404" />

        {/* Open Graph tags */}
        <meta property="og:title" content="404 - Sayfa Bulunamadı - Gig Match" />
        <meta 
          property="og:description" 
          content="Aradığınız sayfa bulunamadı veya henüz hazır değil. Lütfen biraz bekleyin, kısa süre sonra ana sayfaya yönlendirileceksiniz." 
        />
        <meta property="og:url" content="https://gigmatch.io/404" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="404 - Sayfa Bulunamadı - Gig Match" />
        <meta 
          name="twitter:description" 
          content="Aradığınız sayfa mevcut değil veya inşaat aşamasında. Lütfen ana sayfaya yönlendirileceksiniz." 
        />

        {/* Optional Keywords */}
        <meta name="keywords" content="Gig Match, 404, sayfa bulunamadı, under construction, müzik, sahne" />
      </Helmet>
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Sayfa Bulunamadı</h1>
        <p className="text-lg mb-4">
          Aradığınız sayfa mevcut değil veya şu anda hazır değil. Sayfa üzerinde çalışmalar sürüyor.
        </p>
        <p className="text-md italic">
          Bu sayfa geçici olup, kısa süre sonra ana sayfaya yönlendirileceksiniz.
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;