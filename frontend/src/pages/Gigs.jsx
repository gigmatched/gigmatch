// src/pages/Gigs.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        // API endpoint'inizi buraya ekleyin. Örnek:
        const response = await axios.get('/api/gigs');
        setGigs(response.data);
      } catch (err) {
        setError('Gig verileri alınırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  if (loading) {
    return <div className="p-4">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Gig'ler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gigs.map((gig) => (
          <div key={gig.id} className="border rounded-lg overflow-hidden shadow-md">
            <img
              src={gig.image || 'https://via.placeholder.com/300'}
              alt={gig.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{gig.title}</h2>
              <p className="text-gray-600">{gig.shortDescription}</p>
              <Link
                to={`/gigs/${gig.id}`}
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Detayları Gör
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gigs;