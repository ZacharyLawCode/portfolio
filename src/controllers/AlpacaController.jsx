// Import necessary modules from React and a custom model
import React, { useEffect, useState } from 'react';
import { fetchAccountInfo } from '../models/AlpacaModel.jsx';

// Functional component to display account information
const AccountInfo = () => {
  // State to store account information
  const [accountInfo, setAccountInfo] = useState(null);
  // State to store any error message
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the account info when the component mounts
    const getAccountInfo = async () => {
      try {
        // Call the function to fetch account info from the API
        const info = await fetchAccountInfo();
        
        // If account info is received, update the state
        if (info) {
          setAccountInfo(info);
        } else {
          // If no info is returned, set an error message
          setError('Failed to fetch account info.');
        }
      } catch (err) {
        // Handle any errors during the fetch operation
        setError('Error fetching account info.');
      }
    };

    // Call the async function to fetch data
    getAccountInfo();
  }, []); // Empty dependency array to run the effect only once, after the initial render

  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If account info is not yet loaded, show a loading message
  if (!accountInfo) {
    return <div>Loading account info...</div>;
  }

  // Render the account information as a formatted JSON object
  return (
    <div>
      <h2>Account Information</h2>
      <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
    </div>
  );
};

// Export the component to be used in other parts of the application
export default AccountInfo;
