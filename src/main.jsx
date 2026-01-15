/**
 * Application Entry Point
 * Renders the React application to the DOM
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';

// Initialize security logging if not already present
if (!window.securityAnalytics) {
  window.securityAnalytics = {
    logs: [],
    trackEvent: function(event) {
      this.logs.push({
        ...event,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      });
      console.log('[Security Analytics]', event);
    },
    getLogs: function() {
      return this.logs;
    }
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);