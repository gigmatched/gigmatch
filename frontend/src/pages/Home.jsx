import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import ImageWithFallback from "../components/ImageWithFallback";

// WebP and fallback images
import musicianImgWebp from "../assets/images/musician.webp";
import musicianImg from "../assets/images/musician.jpg";

import venueImgWebp from "../assets/images/venue.webp";
import venueImg from "../assets/images/venue.jpg";

import sceneImgWebp from "../assets/images/scene.webp";
import sceneImg from "../assets/images/scene.jpg";

import djImgWebp from "../assets/images/dj.webp";
import djImg from "../assets/images/dj.jpg";

import vocalistImgWebp from "../assets/images/vocalist.webp";
import vocalistImg from "../assets/images/vocalist.jpg";

import rockImgWebp from "../assets/images/rock.webp";
import rockImg from "../assets/images/rock.jpg";

import womensaxplayerImgWebp from "../assets/images/womensaxplayer.webp";
import womensaxplayerImg from "../assets/images/womensaxplayer.avif";

const Home = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="min-h-screen bg-navy">
      <Helmet>
        <title>Gig Match | Müzisyenleri Sahneyle Buluşturuyoruz</title>
        <meta
          name="description"
          content="Gig Match, müzisyenleri sahneyle buluşturup, en iyi performansları sunan platform. Keşfedin, takip edin ve sanatın buluşma noktasında yerinizi alın."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gigmatch.io/" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Gig Match | Müzisyenleri Sahneyle Buluşturuyoruz" />
        <meta property="og:description" content="Gig Match, müzisyenleri sahneyle buluşturup, en iyi performansları sunan platform." />
        <meta property="og:url" content="https://gigmatch.io/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gig Match | Müzisyenleri Sahneyle Buluşturuyoruz" />
        <meta name="twitter:description" content="Gig Match, müzisyenleri sahneyle buluşturup, en iyi performansları sunan platform." />

        {/* Optional Keywords */}
        <meta name="keywords" content="Gig Match, müzisyen, sahne, konser, sanat, müzik" />
      </Helmet>

      {/* 1. Header (Hero) Section */}
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-bold text-poppins text-5xl md:text-6xl mb-6 leading-tight">
            <span className="text-teal-500">Müzisyenin</span>
            <br />
            <span className="text-pink-300">Sahneyle</span>
            <br />
            <span className="text-white">Buluşma Noktası</span>
          </h1>
          <p className="font-regular text-poppins text-xl md:text-2xl text-white mb-12">
            Gig Match ile sahne almak veya yeni sanatçıları keşfetmek artık çok kolay.
            <br className="hidden md:block" />
            Ücretsiz kaydol, sahnenin kapılarını arala!
          </p>
          {/* Only show login/register buttons if there is no logged in user */}
          {!user && (
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Link
      to="/giris" // updated route for Turkish login
      className="bg-transparent border border-pink-300 text-pink-300 px-8 py-4 rounded-full font-semibold hover:bg-pink-300 hover:text-white transition"
    >
      Giriş Yap
    </Link>
    <Link
      to="/kayitol" // updated route for Turkish register
      className="bg-pink-300 text-white px-8 py-4 rounded-full font-semibold hover:bg-pink-400 transition"
    >
      Kayıt Ol
    </Link>
  </div>
)}
        </div>
      </section>

      {/* 2. Herkesin Sahnesi Burada Section */}
      <section className="py-32 bg-navy">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-bold text-poppins text-3xl md:text-4xl text-teal-500 mb-6">
            Herkesin Sahnesi <span className="text-pink-300">Burada</span>
          </h2>
          <p className="font-regular text-poppins text-lg md:text-xl text-white mb-10">
            İster dinleyici ol, ister müzisyen,
            <br className="hidden md:block" />
            Gig Match ile sahne ve sanat buluşuyor; sen de bu buluşmanın bir parçası ol.
          </p>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sol Bölüm */}
            <div className="relative flex-1">
              <ImageWithFallback
                webp={musicianImgWebp}
                fallback={musicianImg}
                alt="Müzisyenler"
                className="w-full rounded-lg shadow-lg object-cover h-64 md:h-80"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 p-4 rounded-lg max-w-xs">
                <h3 className="font-bold text-poppins text-lg mb-2 text-white">
                  En yetenekli müzisyenler için:
                </h3>
                <p className="font-regular text-poppins text-sm text-white">
                  Artık nasıl sahne alacağım derdine son!
                  <br className="hidden md:block" />
                  Sen sadece müziğine odaklan, gerisini biz halledelim.
                </p>
              </div>
            </div>
            {/* Sağ Bölüm */}
            <div className="relative flex-1">
              <ImageWithFallback
                webp={venueImgWebp}
                fallback={venueImg}
                alt="Mekanlar"
                className="w-full rounded-lg shadow-lg object-cover h-64 md:h-80"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 p-4 rounded-lg max-w-xs">
                <h3 className="font-bold text-poppins text-lg mb-2 text-white">
                  En gözde mekanlar için:
                </h3>
                <p className="font-regular text-poppins text-sm text-white">
                  Sahnen artık hiç boş kalmasın!
                  <br className="hidden md:block" />
                  Güvenilir ve yetenekli müzisyenlere ulaşmak çok kolay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sahne Seni Bulsun Section */}
      <section className="py-32 bg-navy">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8 text-white">
          {/* Sol Metin */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-bold text-poppins text-3xl md:text-4xl text-teal-500 mb-6">
              Sahne Seni <span className="text-pink-300">Bulsun</span>
            </h2>
            <p className="font-regular text-poppins text-lg md:text-xl mb-6">
              Müzisyenlerle mekanların birbirlerine ulaşmasını mümkün kılan
              ve aradaki süreçleri kolaylaştıran online platform.
            </p>
          </div>
          {/* Sağ Görsel */}
          <div className="flex-1 relative">
            <ImageWithFallback
              webp={sceneImgWebp}
              fallback={sceneImg}
              alt="Sahne"
              className="w-full rounded-lg shadow-lg object-cover h-64 md:h-80"
            />
            <div className="absolute bottom-4 right-4 bg-pink-300 bg-opacity-75 p-4 rounded-lg max-w-xs">
              <p className="font-regular text-poppins text-lg text-white">
                Bağımsız müzisyenler için yeni bir devir başladı.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Keşfet, Keşfedil Section */}
      <section className="py-32 text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-bold text-3xl md:text-4xl text-teal-500 mb-8">
            Gig Match'le Keşfet, <span className="text-pink-300">Keşfedil</span>
          </h2>
          <div className="mb-10 space-y-4 font-sans text-lg md:text-xl text-white text-center">
            <p>İster DJ ol, ister vokalist!</p>
            <p>İstersen geleneksel mekanlarda türkü çal, istersen sahnede grubunla rock yıldızı ol!</p>
            <p>Gig Match'de ayrım yok.</p>
          </div>

          {/* Image Grid Section */}
          <div className="flex flex-col">
            {/* Row 1 */}
            <div className="flex justify-center space-x-8 mb-4">
              <div className="relative overflow-hidden rounded-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
                <ImageWithFallback
                  webp={djImgWebp}
                  fallback={djImg}
                  alt="DJ performing at a crowded venue"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
                <ImageWithFallback
                  webp={rockImgWebp}
                  fallback={rockImg}
                  alt="Vocalist singing with a band in a studio setting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex justify-center space-x-4">
              <div className="relative overflow-hidden rounded-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
                <ImageWithFallback
                  webp={womensaxplayerImgWebp}
                  fallback={womensaxplayerImg}
                  alt="Woman playing saxophone"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
                <ImageWithFallback
                  webp={vocalistImgWebp}
                  fallback={vocalistImg}
                  alt="Women singing on stage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section (only shown if no user is logged in) */}
      {!user && (
  <section className="py-32 bg-navy text-center">
    <div className="container mx-auto px-6">
      <h2 className="font-bold text-poppins text-3xl md:text-4xl text-teal-500 mb-6">
        Gig Match'e <span className="text-pink-300">Kaydolun</span>
      </h2>
      <p className="font-regular text-poppins text-lg md:text-xl text-white mb-8">
        Kaydolun, birbirinden farklı konserlere ve sanatçılara erişim sağlayın!
      </p>
      <Link
        to="/kayitol" // updated route for Turkish register
        className="bg-pink-300 text-white px-8 py-4 rounded-full font-semibold hover:bg-pink-400 transition"
      >
        Ücretsiz Kayıt Olun
      </Link>
    </div>
  </section>
)}
    </div>
  );
};

export default Home;