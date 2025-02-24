import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId="291328943108-8146tgvmau8q58bbvrdk5msvofd0uua7.apps.googleusercontent.com"
      clientsecret="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"
      scriptStrategy="onload"
      initOptions={{
        ux_mode: "popup",  // Ensure popup UX mode
        context: "signin"   // Hint for rendering the standard sign-in button
      }}
    >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);