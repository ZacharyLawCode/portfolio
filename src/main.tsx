// Import React to use JSX syntax and React features
import React from 'react';
// Import ReactDOM to render the React component tree into the DOM
import ReactDOM from 'react-dom/client';
// Import the root App component of the application
import App from './App';
// Import global CSS, including Tailwind CSS setup
import './index.css';

// Get the root DOM element where the React app will be mounted
const rootElement = document.getElementById('root') as HTMLElement;
// Create a React root to manage the rendering of the component tree
const root = ReactDOM.createRoot(rootElement);

// Render the App component inside React's StrictMode for development checks
root.render(
  <React.StrictMode> 
    <App /> {/* Render the main App component */}
  </React.StrictMode>
);
