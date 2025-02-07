const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY;
const API_URL = import.meta.env.VITE_API_URL;

async function fetchAccountInfo() {
  const response = await fetch(`${API_URL}/account`, {
    method: 'GET',
    headers: {
      'APCA-API-KEY-ID': API_KEY,
      'APCA-API-SECRET-KEY': API_SECRET_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error('Error fetching account info:', response.status, response.statusText);
    return null;
  }

  return response.json();
}

export { fetchAccountInfo };

console.log("API Key:", API_KEY);
console.log("API Secret Key:", API_SECRET_KEY);
console.log("API URL:", API_URL);
