import React from 'react'; // Import React to create a functional component
import AccountInfo from './controllers/AlpacaController.jsx'; // Import the AccountInfo component from the controllers folder


function App() { // Main App component
  return (
    // Main container for the application
    <div className="App">       {/* Heading for the application */}
      <h1>Alpaca Account Info</h1>       {/* Render the AccountInfo component to display account details */}
      <AccountInfo />
    </div>
  );
}

export default App; // Export the App component to be used as the root component
