// models/AlpacaModel.js

// Accessing the environment variables defined in .env file
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY;

class AlpacaModel {
  // Method to fetch account data from Alpaca API
  static async getAccountData() {
    try {
      const response = await fetch(`${API_URL}/account`, {
        method: 'GET',
        headers: {
          'APCA-API-KEY-ID': API_KEY,
          'APCA-API-SECRET-KEY': API_SECRET_KEY,
          'Content-Type': 'application/json',
        },
      });

      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error('Failed to fetch account data from Alpaca API');
      }

      // Parse the response as JSON
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }
}

export default AlpacaModel;
