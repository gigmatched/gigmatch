import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-black mb-6">İletişim</h1>
        <p className="text-center text-black mb-6">
          Bizimle iletişime geçmek için lütfen formu doldurunuz:
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-black mb-1">Adınız:</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-black mb-1">Email:</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-black mb-1">Mesajınız:</label>
            <textarea
              name="message"
              required
              className="w-full p-3 rounded border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white p-3 rounded font-semibold hover:bg-teal-600 transition"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;