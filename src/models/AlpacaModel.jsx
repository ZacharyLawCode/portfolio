// Import API credentials from environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY;
const API_URL = import.meta.env.VITE_API_URL;


async function fetchAccountInfo() { // Asynchronous function to fetch account information from the API

  const response = await fetch(`${API_URL}/account`, {   // Send a GET request to the account endpoint of the API
    method: 'GET', // HTTP method used for the request
    headers: {
      'APCA-API-KEY-ID': API_KEY, // API key for authentication
      'APCA-API-SECRET-KEY': API_SECRET_KEY, // API secret key for authentication
      'Content-Type': 'application/json', // Specifies JSON as the content type
    },
  });

  if (!response.ok) {   // Check if the response is successful; if not, log an error and return null
    console.error('Error fetching account info:', response.status, response.statusText);
    return null;
  }
  return response.json();   // Parse and return the JSON response from the API
}

export { fetchAccountInfo }; // Export the function so it can be used in other parts of the application

// Log the API credentials
console.log("API Key:", API_KEY);
console.log("API Secret Key:", API_SECRET_KEY);
console.log("API URL:", API_URL);
