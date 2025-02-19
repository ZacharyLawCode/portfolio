import Alpaca from '@alpacahq/alpaca-trade-api';

// Define the structure of candlestick data
interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

// Alpaca Model class
class AlpacaModel {
  private static alpaca = new Alpaca({
    keyId: import.meta.env.VITE_API_KEY as string,
    secretKey: import.meta.env.VITE_API_SECRET_KEY as string,
    paper: true, // Use paper trading mode
  });

  // Method to fetch candlestick data
  static async getCandles(
    symbol: string,
    start: string,
    end: string,
    timeframe: string,
    limit: number
  ): Promise<CandlestickData[]> {
    try {
      // Fetch bars using Alpaca API
      const barsIterator = this.alpaca.getBarsV2(symbol, {
        start,
        end,
        timeframe,
        limit,
      });

      const bars: CandlestickData[] = [];

      // Iterate over the async iterator and collect the bars data
      for await (const bar of barsIterator) {
        bars.push({
          time: new Date(bar.t).getTime(), // Convert timestamp to milliseconds
          open: bar.o,
          high: bar.h,
          low: bar.l,
          close: bar.c,
        });
      }

      if (bars.length === 0) {
        throw new Error('No bars data available for the given symbol and date range');
      }

      return bars;
    } catch (error: any) {
      console.error('Error fetching candlestick data:', error.message);
      throw new Error('Failed to fetch candlestick data from Alpaca API');
    }
  }
}

export default AlpacaModel;
