import React, { useEffect, useState, useRef } from 'react';
import AlpacaController from './controllers/AlpacaController'; // Ensure this controller is set up correctly
import { Chart, registerables } from 'chart.js';
import 'chartjs-chart-financial'; // Import financial chart plugin

Chart.register(...registerables); // Register necessary Chart.js components

const AccountInfo = () => {
  const [account, setAccount] = useState<any>(null);
  const [candles, setCandles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // To store chart instance

  // Fetch account data on component mount
  useEffect(() => {
    const getAccountData = async () => {
      setLoading(true);
      try {
        const result = await AlpacaController.fetchAccountData();
        if (result.success) {
          setAccount(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Failed to fetch account data');
      }
      setLoading(false);
    };

    const getCandlesData = async () => {
      try {
        const response = await AlpacaController.fetchCandles(
          'AAPL',  
          '2024-04-01', // Start date
          '2024-04-30', // End date
          '30Min', // Timeframe
          100 // Limit
        );

        if (response.success) {
          setCandles(response.data);
        } else {
          setError(response.error);
        }
      } catch (err) {
        setError('Failed to fetch candle data');
      }
    };

    getAccountData();
    getCandlesData();
  }, []);

  // Initialize or update the chart when candles data is available
  useEffect(() => {
    if (candles.length > 0 && chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      const chartData = {
        datasets: [
          {
            label: 'AAPL Candlestick Chart',
            data: candles.map((candle) => ({
              x: new Date(candle.time), // Convert time to Date object
              o: candle.open,
              h: candle.high,
              l: candle.low,
              c: candle.close,
            })),
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            upColor: 'rgba(0, 255, 0, 0.6)',
            downColor: 'rgba(255, 0, 0, 0.6)',
            upBorderColor: 'rgba(0, 255, 0, 1)',
            downBorderColor: 'rgba(255, 0, 0, 1)',
          },
        ],
      };

      const options = {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute',
              tooltipFormat: 'll HH:mm',
              displayFormats: { minute: 'HH:mm' },
            },
            title: { display: true, text: 'Time' },
          },
          y: {
            title: { display: true, text: 'Price ($)' },
            beginAtZero: false,
          },
        },
        plugins: {
          tooltip: { mode: 'index', intersect: false },
        },
      };

      chartInstanceRef.current = new Chart(ctx, {
        type: 'candlestick',
        data: chartData,
        options: options,
      });
    }
  }, [candles]); // Re-run when candles data changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Account Information</h1>
      {account ? (
        <>
          <p><strong>Account ID:</strong> {account.id}</p>
          <p><strong>Cash:</strong> ${account.cash}</p>
          <p><strong>Buying Power:</strong> ${account.buying_power}</p>
        </>
      ) : (
        <p>No account data available.</p>
      )}

      <h2>Candlestick Chart</h2>
      <canvas ref={chartRef} width="800" height="400"></canvas>
    </div>
  );
};

export default AccountInfo;
