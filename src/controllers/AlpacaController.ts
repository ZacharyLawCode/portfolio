import AlpacaModel from '../models/AlpacaModel';

class AlpacaController {
  // Method to fetch account data (replace with Alpaca API call if needed)
  static async fetchAccountData() {
    try {
      const response = await fetch('/api/account'); // Placeholder for actual API call
      if (!response.ok) {
        throw new Error('Failed to fetch account data');
      }
      const data = await response.json();
      return { success: true, data };
    } catch (error: any) {
      console.error('Error fetching account data:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Method to fetch candlestick data using AlpacaModel
  static async fetchCandles(
    symbol: string,
    start: string,
    end: string,
    timeframe: string,
    limit: number
  ) {
    try {
      const candles = await AlpacaModel.getCandles(symbol, start, end, timeframe, limit);
      return { success: true, data: candles };
    } catch (error: any) {
      console.error('Error fetching candlestick data:', error.message);
      return { success: false, error: 'Failed to fetch candles from Alpaca' };
    }
  }
}

export default AlpacaController;
