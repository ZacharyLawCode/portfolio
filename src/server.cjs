const express = require('express');
const Alpaca = require('@alpacahq/alpaca-trade-api');
const cors = require('cors');  // To enable CORS for frontend requests

const app = express();
const port = 3000;  // You can choose any port

// Enable CORS to allow frontend to make requests to this server
app.use(cors());

// Instantiate Alpaca API with your credentials
const alpaca = new Alpaca({
  keyId: 'PKCTSTJZVT4ITJRXDQQS',
  secretKey: '4QGKqw3Gp3Tln2n6Bm6XwN3W1iiAp1JXNfE32FBp',
  paper: true,  // Use paper trading for testing
});

app.get("/api/bars", async (req, res) => {
  try {
    const barsIterator = alpaca.getBarsV2("AAPL", {
      start: "2024-01-01T00:00:00Z",
      end: "2025-12-31T23:59:59Z",  // Ensures full-year data
      timeframe: "1D",
      limit: 1000,
      feed: "iex",  // Ensures compatibility with free-tier Alpaca accounts
    });
    const bars = [];

    // Collect bars data from the async iterator
    for await (let bar of barsIterator) {
      bars.push(bar);
    }

    // Return bars data as JSON response
    res.json(bars);
  } catch (error) {
    console.error("Error fetching candlestick data from Alpaca:", error);
    res.status(500).send("Error fetching data");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
