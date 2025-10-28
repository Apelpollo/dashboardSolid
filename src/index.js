import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Disable scroll restoration before React mounts
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

