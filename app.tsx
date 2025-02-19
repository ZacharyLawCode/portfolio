import { useEffect, useState } from "react";
import Alpaca from "@alpacahq/alpaca-trade-api";

const alpaca = new Alpaca({
  keyId: "PKCTSTJZVT4ITJRXDQQS",
  secretKey: "4QGKqw3Gp3Tln2n6Bm6XwN3W1iiAp1JXNfE32FBp",
  paper: true,
});

type Bar = {
  t: string; // timestamp
  o: number; // open price
  h: number; // high price
  l: number; // low price
  c: number; // close price
  v: number; // volume
};

const fetchBars = async (): Promise<Bar[]> => {
  try {
    const barsIterator = alpaca.getBarsV2("AAPL", {
      start: "2024-04-01T00:00:00Z",
      end: "2024-04-30T23:59:59Z",
      timeframe: "5Min",
      limit: 100,
    });

    const bars: Bar[] = [];
    for await (let bar of barsIterator) {
      bars.push(bar);
    }
    return bars;
  } catch (error) {
    console.error("Error fetching candlestick data:", error);
    return [];
  }
};

function App() {
  const [bars, setBars] = useState<Bar[]>([]);

  useEffect(() => {
    fetchBars().then(setBars);
  }, []);

  return (
    <div>
      <h1>AAPL Stock Candlestick Data</h1>
      <ul>
        {bars.map((bar, index) => (
          <li key={index}>
            {bar.t}: Open: {bar.o}, High: {bar.h}, Low: {bar.l}, Close: {bar.c}, Volume: {bar.v}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;