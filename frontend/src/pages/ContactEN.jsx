import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const ContactEN = () => {
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
        <title>Contact - Gig Match</title>
        <meta 
          name="description" 
          content="Get in touch with Gig Match. Send us your queries and feedback, and our support team will assist you promptly." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gigmatch.io/en/contact" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Contact - Gig Match" />
        <meta 
          property="og:description" 
          content="Reach out to Gig Match for any inquiries or feedback. Our support team is ready to assist you." 
        />
        <meta property="og:url" content="https://gigmatch.io/en/contact" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact - Gig Match" />
        <meta 
          name="twitter:description" 
          content="Send your inquiries and feedback to Gig Match. Our team is here to assist you." 
        />
        <meta name="keywords" content="Gig Match, contact, inquiries, feedback, support, English" />
      </Helmet>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Contact</h1>
        <p className="text-center text-black mb-6">
          Please fill out the form below to get in touch with us:
        </p>
        {success && <p className="text-green-500 mb-4">Thank you! Your message has been received.</p>}
        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black mb-1">Name:</label>
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
            <label className="block text-black mb-1">Message:</label>
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
            className="w-full bg-blue-500 text-white p-3 rounded font-semibold hover:bg-blue-600 transition"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactEN;