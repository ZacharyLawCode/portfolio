// Import necessary modules from React and a custom model
import React, { useEffect, useState } from 'react';
import { fetchAccountInfo } from '../models/AlpacaModel.jsx';


const AccountInfo = () => { // Functional component to display account information
  const [accountInfo, setAccountInfo] = useState(null);   // State to store account information
  const [error, setError] = useState(null);   // State to store any error message
 
  useEffect(() => {

    const getAccountInfo = async () => {     // Fetch the account info when the component mounts
      try {
        const info = await fetchAccountInfo();         // Call the function to fetch account info from the API    
        if (info) {         // If account info is received, update the state
          setAccountInfo(info);
        } else {
          setError('Failed to fetch account info.');           // If no info is returned, set an error message
        }
      } catch (err) {
        setError('Error fetching account info.');         // Handle any errors during the fetch operation
      }
    };


    getAccountInfo();     // Call the async function to fetch data
  }, []); // Empty dependency array to run the effect only once, after the initial render


  if (error) {   // If there's an error, display the error message
    return <div>Error: {error}</div>;
  }


  if (!accountInfo) {   // If account info is not yet loaded, show a loading message
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

export default AccountInfo; // Export the component to be used in other parts of the application
