// src/pages/GigDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GigDetails = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        // API endpoint'inizi buraya ekleyin. Örnek:
        const response = await axios.get(`/api/gigs/${id}`);
        setGig(response.data);
      } catch (err) {
        setError('Gig verisi alınırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  if (loading) {
    return <div className="p-4">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!gig) {
    return <div className="p-4">Gig bulunamadı.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{gig.title}</h1>
      <img
        src={gig.image || 'https://via.placeholder.com/600'}
        alt={gig.title}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <p className="text-gray-700">{gig.description || 'Gig açıklaması yok.'}</p>
      {/* İhtiyacınıza göre daha fazla detay ekleyebilirsiniz */}
    </div>
  );
};

export default GigDetails;