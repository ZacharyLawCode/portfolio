const Alpaca = require('@alpacahq/alpaca-trade-api');

// Instantiate Alpaca API with your credentials
const alpaca = new Alpaca({
  keyId: 'PKCTSTJZVT4ITJRXDQQS',
  secretKey: '4QGKqw3Gp3Tln2n6Bm6XwN3W1iiAp1JXNfE32FBp',
  paper: true, // Use paper trading for testing
});

// Define the options for the bars request
const options = {
  symbol: 'AAPL',
  start: "2024-04-01T00:00:00Z", // Start date: April 1, 2024
  end: "2024-04-30T23:59:59Z",   // End date: April 30, 2024, end of the day
  timeframe: "5Min",             // 5-minute bars
  limit: 100                     // Limit the number of bars returned
};

// Fetch the bars for a specific symbol
async function fetchBars(options) {
  try {
    // Using getBarsV2 which returns an AsyncGenerator for a single symbol
    const barsIterator = alpaca.getBarsV2(options.symbol, {
      start: options.start,
      end: options.end,
      timeframe: options.timeframe,
      limit: options.limit,
    });

    const bars = [];
    
    // Properly handle the async generator to collect all bars
    for await (let bar of barsIterator) {
      bars.push(bar);
    }

    // Log the raw bars data to inspect its structure
    console.log("Raw bars data:", bars);

  } catch (error) {
    console.error("Error fetching candlestick data:", error);
  }
}


// Example usage: Fetch bars for AAPL stock
fetchBars(options);
