// Import API credentials from environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// Asynchronous function to fetch account information from the API
async function fetchAccountInfo() {
  // Send a GET request to the account endpoint of the API
  const response = await fetch(`${API_URL}/account`, {
    method: 'GET', // HTTP method used for the request
    headers: {
      'APCA-API-KEY-ID': API_KEY, // API key for authentication
      'APCA-API-SECRET-KEY': API_SECRET_KEY, // API secret key for authentication
      'Content-Type': 'application/json', // Specifies JSON as the content type
    },
  });

  // Check if the response is successful; if not, log an error and return null
  if (!response.ok) {
    console.error('Error fetching account info:', response.status, response.statusText);
    return null;
  }

  // Parse and return the JSON response from the API
  return response.json();
}

// Export the function so it can be used in other parts of the application
export { fetchAccountInfo };

// Log the API credentials (Note: Avoid logging sensitive credentials in production!)
console.log("API Key:", API_KEY);
console.log("API Secret Key:", API_SECRET_KEY);
console.log("API URL:", API_URL);
