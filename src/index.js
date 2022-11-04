import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './assets/style/normalize.css';
import './assets/style/fonts.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
