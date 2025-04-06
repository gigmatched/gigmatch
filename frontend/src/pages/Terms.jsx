import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  return (
    <div className="terms-container" style={{ padding: '2rem', lineHeight: '1.6' }}>
      <Helmet>
        <meta charSet="UTF-8" />
        <title>Kullanım Şartları - Gig Match</title>
      </Helmet>
      <h1>Kullanım Şartları</h1>
      <p>Son Güncelleme: [Tarih]</p>

      <h2>1. Şartların Kabulü</h2>
      <p>
        https://gigmatch.io ("Platform") erişimle birlikte, bu yasal bağlayıcı şartları kabul etmiş sayılırsınız...
      </p>

      <h2>2. Hizmet Tanımı</h2>
      <p>
        Gig Match, bağımsız müzisyenler ("Sanatçılar") ile Türkiye ve İngiltere'deki mekanları ("Mekanlar") buluşturur...
      </p>

      <h2>3. Kullanıcı Yükümlülükleri</h2>
      <p>3.1. Tüm etkinlik listelerinizin:</p>
      <ul>
        <li>5651 Sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi kanununa uygun olması</li>
        <li>Fikri mülkiyet haklarını ihlal etmemesi</li>
        <li>Doğru etkinlik detayları içermesi</li>
      </ul>

      <h2>4. Bilet Satışları & Ödemeler</h2>
      <p>4.1. Platform üzerinden bilet satılan etkinliklerde:</p>
      <ul>
        <li>İptal edilmeyen etkinliklerde iade yapılmaz</li>
        <li>Hizmet bedeli: Bilet fiyatının %5'i (iade edilmez)</li>
      </ul>

      <h2>5. İçerik Lisansı</h2>
      <p>
        Etkinlik bilgisi veya sanatçı profili paylaşarak, Gig Match'e içeriği görüntüleme lisansı vermiş sayılırsınız...
      </p>

      <h2>6. Sözleşme Feshi</h2>
      <p>
        5846 Sayılı Fikir ve Sanat Eserleri Kanunu'nu ihlal eden hesapları askıya alabiliriz...
      </p>

      <h2>7. Uygulanacak Hukuk</h2>
      <p>
        7.1. Türk kullanıcılar: İstanbul Mahkemeleri<br />
        7.2. İngiltere kullanıcıları: İngiltere ve Galler hukuku
      </p>

      <h2>8. Değişiklikler</h2>
      <p>
        Şartları 30 gün ön bildirimle platform üzerinden güncelleyebiliriz.
      </p>

      <p>
        İletişim: support@gigmatch.io<br />
      </p>
    </div>
  );
};

export default Terms;