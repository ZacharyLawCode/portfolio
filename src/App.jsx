// Import React to create a functional component
import React from 'react';
// Import the AccountInfo component from the controllers folder
import AccountInfo from './controllers/AlpacaController.jsx';

// Main App component
function App() {
  return (
    // Main container for the application
    <div className="App">
      {/* Heading for the application */}
      <h1>Alpaca Account Info</h1>
      {/* Render the AccountInfo component to display account details */}
      <AccountInfo />
    </div>
  );
}

// Export the App component to be used as the root component
export default App;
