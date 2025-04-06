import React from 'react';
import { Helmet } from 'react-helmet';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-navy text-white px-4 py-8">
      <Helmet>
        <title>Gizlilik Politikası - Gig Match</title>
        <meta 
          name="description" 
          content="Gig Match’in Gizlilik Politikası, bilgilerinizin nasıl toplandığı, kullanıldığı, paylaşıldığı ve korunduğu hakkında detaylı bilgi sunar." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gigmatch.io/gizlilik" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Gizlilik Politikası - Gig Match" />
        <meta 
          property="og:description" 
          content="Gig Match’in Gizlilik Politikası, bilgilerinizi nasıl topladığımız, kullandığımız ve koruduğumuz hakkında bilgilendirme sağlar." 
        />
        <meta property="og:url" content="https://gigmatch.io/gizlilik" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gizlilik Politikası - Gig Match" />
        <meta 
          name="twitter:description" 
          content="Gig Match’in Gizlilik Politikası kapsamında bilgilerinizin toplama, kullanım ve paylaşım detaylarını öğrenin." 
        />

        {/* Optional Keywords */}
        <meta 
          name="keywords" 
          content="Gig Match, gizlilik politikası, veri güvenliği, kişisel veriler, gizlilik, GigMatch, Türk" 
        />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Gizlilik Politikası</h1>
        <p className="mb-4">
          Bu Gizlilik Politikası, web sitemiz https://gigmatch.io’u ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda bilgilerinizin nasıl toplandığını, kullanıldığını, ifşa edildiğini ve korunduğunu açıklar.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">1. Topladığımız Bilgiler</h2>
        <p className="mb-4">
          Kayıt olurken veya hizmetlerimizi kullanırken gönüllü olarak bize sağladığınız isim, e-posta adresi ve diğer iletişim bilgileri gibi kişisel verileri toplayabiliriz.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">2. Bilgilerinizi Nasıl Kullanıyoruz</h2>
        <p className="mb-4">
          Topladığımız bilgileri şu amaçlarla kullanıyoruz:
          <ul className="list-disc list-inside mt-2">
            <li>Web sitemizi sağlamak, işletmek ve sürdürmek</li>
            <li>Hizmetlerimizde deneyiminizi geliştirmek</li>
            <li>Müşteri hizmetleri ve destek için sizinle iletişim kurmak</li>
            <li>Güncellemeler, pazarlama malzemeleri ve diğer bilgilendirici içerikleri size göndermek</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">3. Bilgilerinizin Paylaşılması</h2>
        <p className="mb-4">
          Web sitemizi işletmemize yardımcı olan güvenilir üçüncü taraf hizmet sağlayıcılarla bilgilerinizi paylaşabiliriz. Kişisel bilgilerinizi üçüncü şahıslara satmıyoruz.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">4. Çerezler ve İzleme Teknolojileri</h2>
        <p className="mb-4">
          Hizmetimizin kullanım eğilimlerini ve trendlerini analiz etmek amacıyla çerezler ve benzeri izleme teknolojilerini kullanıyoruz. Tarayıcınız üzerinden çerez ayarlarınızı yönetebilirsiniz.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">5. Bilgilerinizin Güvenliği</h2>
        <p className="mb-4">
          Kişisel bilgilerinizin güvenliğini sağlamak için sektör standartlarına uygun protokoller uyguluyor ve bilgilerinizin bu Gizlilik Politikası doğrultusunda korunmasını temin ediyoruz.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">6. Haklarınız</h2>
        <p className="mb-4">
          Konumunuza bağlı olarak, kişisel bilgilerinize erişme, bilgileri düzeltme veya silme gibi haklara sahip olabilirsiniz. Bu haklarınızı kullanmak isterseniz bizimle iletişime geçiniz.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">7. Bu Gizlilik Politikasındaki Değişiklikler</h2>
        <p className="mb-4">
          Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Değişiklikleri, geçerli tarihi güncelleyerek bu sayfada yayınlayarak bildiririz.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">8. Bizimle İletişim</h2>
        <p className="mb-4">
          Bu Gizlilik Politikası ile ilgili sorularınız varsa lütfen support@gigmatch.io adresinden bizimle iletişime geçiniz.
        </p>

        <p className="mt-8 text-sm text-gray-400">
          Son güncelleme: [21.02.2025]
        </p>
      </div>
    </div>
  );
};

export default Privacy;