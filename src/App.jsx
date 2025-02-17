// src/components/AccountInfo.jsx

import React, { useEffect, useState } from 'react';
import AlpacaController from './controllers/AlpacaController';

const AccountInfo = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch account data on component mount
  useEffect(() => {
    const getAccountData = async () => {
      setLoading(true);
      const result = await AlpacaController.fetchAccountData();
      if (result.success) {
        setAccount(result.data); // Store the account data
      } else {
        setError(result.error); // Store the error message if any
      }
      setLoading(false);
    };

    getAccountData(); // Fetch the data when the component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Account Information</h1>
      <p><strong>Account ID:</strong> {account.id}</p>
      <p><strong>Cash:</strong> {account.cash}</p>
      <p><strong>Buying Power:</strong> {account.buying_power}</p>
      {/* You can display other fields based on the Alpaca account data */}
    </div>
  );
};

export default AccountInfo;
