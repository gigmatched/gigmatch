import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsEn = () => {
  return (
    <div className="terms-container" style={{ padding: '2rem', lineHeight: '1.6' }}>
      <Helmet>
        <meta charSet="UTF-8" />
        <title>Terms of Use - Gig Match</title>
      </Helmet>
      <h1>Terms of Use</h1>
      <p>Last Updated: [Date]</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing https://gigmatch.io ("Platform"), you agree to these legally binding terms...</p>

      <h2>2. Service Description</h2>
      <p>Gig Match connects independent musicians ("Artists") with venues ("Hosts") in Turkey and UK...</p>

      <h2>3. User Obligations</h2>
      <p>3.1. You warrant that all event listings:</p>
      <ul>
        <li>Comply with local regulations (Turkish Law No. 5651 &amp; UK Consumer Rights Act 2015)</li>
        <li>Do not infringe intellectual property rights</li>
        <li>Accurately represent event details</li>
      </ul>

      <h2>4. Ticket Sales &amp; Payments</h2>
      <p>4.1. For events using our ticketing system:</p>
      <ul>
        <li>All sales are final unless event is canceled</li>
        <li>Service fee: 5% of ticket price (non-refundable)</li>
      </ul>

      <h2>5. Content Licensing</h2>
      <p>By posting event details or artist profiles, you grant Gig Match a non-exclusive license to display content...</p>

      <h2>6. Termination</h2>
      <p>We may suspend accounts violating Turkish Law on Intellectual Property (No. 5846) or UK Copyright...</p>

      <h2>7. Governing Law</h2>
      <p>
        7.1. Turkish users: Disputes governed by Istanbul Courts<br />
        7.2. UK users: Governed by laws of England and Wales
      </p>

      <h2>8. Amendments</h2>
      <p>We may update terms with 30 days' notice via platform notification.</p>

      <p>
        Contact: support@gigmatch.io<br />
      </p>
    </div>
  );
};

export default TermsEn;