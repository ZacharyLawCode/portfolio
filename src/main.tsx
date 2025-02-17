import React from 'react'; // Import React to use JSX syntax and React features
import ReactDOM from 'react-dom/client'; // Import ReactDOM to render the React component tree into the DOM
// @ts-expect-error Ignores App error not having a default export
import View from './View'; // Import the root App component of the application
import './index.css'; // Import global CSS, including Tailwind CSS setup


const rootElement = document.getElementById('root') as HTMLElement; // Get the root DOM element where the React app will be mounted
const root = ReactDOM.createRoot(rootElement); // Create a React root to manage the rendering of the component tree

// Render the App component inside React's StrictMode for development checks
root.render(
  <React.StrictMode> 
    <View /> {/* Render the main View component */}
  </React.StrictMode>
);
