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

// API endpoint to fetch bars
app.get("/api/bars", async (req, res) => {
  try {
    // Fetching bars data from Alpaca API for AAPL
    const barsIterator = alpaca.getBarsV2("AAPL", {
      start: "2023-04-01T00:00:00Z",
      end: "2024-04-30T23:59:59Z",
      timeframe: "1D",
      limit: 100,
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
