import React, { useEffect, useState } from 'react';
import { fetchAccountInfo } from '../models/AlpacaModel.jsx';


const AccountInfo = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the account info when the component mounts
    const getAccountInfo = async () => {
      try {
        const info = await fetchAccountInfo();
        if (info) {
          setAccountInfo(info);
        } else {
          setError('Failed to fetch account info.');
        }
      } catch (err) {
        setError('Error fetching account info.');
      }
    };

    getAccountInfo();
  }, []); // Empty array to run the effect only once, after initial render

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!accountInfo) {
    return <div>Loading account info...</div>;
  }

  return (
    <div>
      <h2>Account Information</h2>
      <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
    </div>
  );
};

export default AccountInfo;
