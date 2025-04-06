import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyEN = () => {
  return (
    <div className="min-h-screen bg-navy text-white px-4 py-8">
      <Helmet>
        <title>Privacy Policy - Gig Match</title>
        <meta 
          name="description" 
          content="Gig Match's Privacy Policy details how your information is collected, used, disclosed, and protected." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gigmatch.io/privacy" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Privacy Policy - Gig Match" />
        <meta 
          property="og:description" 
          content="Learn how Gig Match collects, uses, and protects your personal information." 
        />
        <meta property="og:url" content="https://gigmatch.io/privacy" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy - Gig Match" />
        <meta 
          name="twitter:description" 
          content="Discover how Gig Match manages your personal data with our comprehensive Privacy Policy." 
        />

        {/* Optional Keywords */}
        <meta 
          name="keywords" 
          content="Gig Match, privacy policy, data security, personal data, privacy, GigMatch, English" 
        />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          This Privacy Policy explains how your information is collected, used, disclosed, and protected when you visit and use our website, https://gigmatch.io.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal data that you voluntarily provide to us when registering or using our services, such as your name, email address, and other contact details.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the collected data for purposes including:
          <ul className="list-disc list-inside mt-2">
            <li>Operating, maintaining, and improving our website</li>
            <li>Enhancing your experience with our services</li>
            <li>Communicating with you for customer support purposes</li>
            <li>Sending you updates, marketing materials, and other informative content</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">3. Sharing of Your Information</h2>
        <p className="mb-4">
          We may share your information with trusted third-party service providers who assist us in operating our website. We do not sell your personal information to third parties.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">4. Cookies and Tracking Technologies</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to analyze usage trends and enhance your experience. You can manage your cookie settings through your browser.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">5. Security of Your Information</h2>
        <p className="mb-4">
          We implement industry-standard measures to protect your personal information and ensure it is maintained in accordance with this Privacy Policy.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">6. Your Rights</h2>
        <p className="mb-4">
          Depending on your jurisdiction, you may have rights to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">7. Changes to Our Privacy Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated effective date.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions regarding this Privacy Policy, please contact us at support@gigmatch.io.
        </p>

        <p className="mt-8 text-sm text-gray-400">
          Last updated: [March 10, 2025]
        </p>
      </div>
    </div>
  );
};

export default PrivacyEN;