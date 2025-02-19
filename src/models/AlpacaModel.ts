// models/AlpacaModel.ts

// Accessing the environment variables defined in .env file
const API_URL = import.meta.env.VITE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;
const API_SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY as string;

export interface AccountData {
  id: string;
  status: string;
  currency: string;
  cash: string;
  // Add more fields as needed based on the Alpaca API response
}

class FetchAccount {
  // Method to fetch account data from Alpaca API
  static async getAccountData(): Promise<AccountData> {
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
      const data = (await response.json()) as AccountData;
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching data: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred while fetching data');
      }
    }
  }
}

export default FetchAccount;
