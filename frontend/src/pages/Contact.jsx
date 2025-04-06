import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      // Adjust the URL to match your backend API endpoint
      const response = await axios.post('/api/contact', form);
      if (response.data.success) {
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        setErrorMsg(response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Failed to send message. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <Helmet>
        <title>İletişim - Gig Match</title>
        <meta 
          name="description" 
          content="Gig Match ile iletişime geçin ve sorularınızı bize iletin. Müşteri hizmetlerimizle destek almaktan çekinmeyin." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gigmatch.io/iletisim" />
      </Helmet>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-black mb-6">İletişim</h1>
        <p className="text-center text-black mb-6">
          Bizimle iletişime geçmek için lütfen formu doldurunuz:
        </p>
        {success && <p className="text-green-500 mb-4">Teşekkürler! Mesajınız alındı.</p>}
        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black mb-1">Adınız:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-black mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-black mb-1">Mesajınız:</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-white p-3 rounded font-semibold hover:bg-teal-600 transition"
          >
            {loading ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;