import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import * as serviceWorker from '@/serviceWorker';


const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  // If there's already content, hydrate it
  ReactDOM.hydrateRoot(rootElement, <App />);
} else {
  // Otherwise, render normally (Standard CSR)
  ReactDOM.createRoot(rootElement).render(<App />);
}

serviceWorker.register();
