// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // This will include your Tailwind CSS setup

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

// Simply Render the App.jsx config file.
root.render(
  <React.StrictMode> 
    <App /> 
  </React.StrictMode>
); 
