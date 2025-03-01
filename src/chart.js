let originalRows = [];

async function fetchBars() {
  try {
    const response = await fetch('http://localhost:3000/api/bars');
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    
    const bars = await response.json();
    if (bars && bars.length > 0) {
      const chartData = formatDataForChart(bars);
      console.log("Formatted Chart Data: ", chartData);
      plotChart(chartData, bars);
      logTrades(bars);
    } else {
      console.error('No data found.');
    }
  } catch (error) {
    console.error("Error fetching candlestick data:", error);
  }
}

function formatDataForChart(bars) {
  return bars.map(bar => ({
    x: moment(bar.Timestamp).valueOf(),
    o: bar.OpenPrice,
    h: bar.HighPrice,
    l: bar.LowPrice,
    c: bar.ClosePrice
  }));
}

Chart.register(ChartZoom);

function plotChart(data, bars) {
  const ctx = document.getElementById('chart').getContext('2d');

  const chart = new Chart(ctx, {
    type: 'candlestick',
    data: {
      datasets: [{
        label: 'Stock Prices',
        data: data,
        borderColor: 'black',
        color: {
          up: 'green',
          down: 'red',
          unchanged: 'gray'
        },
        barThickness: 5,
        categoryPercentage: 0.8,
        barPercentage: 0.8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // ✅ Allow resizing
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(context) {
              return context.raw.c.toFixed(2);
            }
          }
        },
        annotation: {
          annotations: bars.map((bar, index) => {
            const action = (index % 2 === 0) ? "BUY" : "SELL";
            return {
              type: 'point',
              xValue: moment(bar.Timestamp).valueOf(),
              yValue: bar.ClosePrice,
              radius: 5,
              backgroundColor: action === 'BUY' ? 'green' : 'red',
              pointStyle: 'triangle',
              label: {
                content: action,
                enabled: true,
                position: 'top'
              }
            };
          })
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true, // ✅ Enable zooming with mouse wheel
            },
            pinch: {
              enabled: true, // ✅ Enable pinch zooming on touch devices
            },
            mode: 'x', // ✅ Zoom only on the x-axis
          }
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'll',
            displayFormats: {
              day: 'MM/DD/YYYY'
            }
          },
          title: {
            display: true,
            text: 'Date'
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        },
        y: {
          title: {
            display: true,
            text: 'Price'
          }
        }
      }
    }
  });
}

fetchBars();



function logTrades(bars) {
  let lastBuyPrice = null;
  let totalNetDifference = 0;
  const logTable = document.getElementById('trade-log');
  const totalNetDiffCell = document.getElementById('total-net-diff');

  bars.forEach(bar => {
    const date = new Date(bar.Timestamp);
    const action = date.getDate() % 2 === 0 ? "BUY" : "SELL";
    const price = bar.ClosePrice;
    let netDifference = '';

    if (action === "BUY") {
      lastBuyPrice = price;
    } else if (action === "SELL" && lastBuyPrice !== null) {
      netDifference = (price - lastBuyPrice).toFixed(2);
      totalNetDifference += parseFloat(netDifference);
      lastBuyPrice = null;
    }

    const row = `<tr><td>${date.toDateString()}</td><td>${action}</td><td>${price.toFixed(2)}</td><td>${netDifference}</td></tr>`;
    logTable.innerHTML += row;
  });

  totalNetDiffCell.textContent = totalNetDifference.toFixed(2);
  originalRows = Array.from(logTable.rows);
}

function sortTable(column) {
  const table = document.getElementById('trade-table');
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.rows);
  let sortOrder = 1;

  const header = table.querySelector(`th[data-sort=${column}]`);
  if (!header) return;

  sortOrder = header.classList.contains('sort-asc') ? -1 : 1;

  const sortedRows = rows.sort((a, b) => {
    const valA = a.cells[column === 'price' || column === 'net-diff' ? 2 : 0].textContent.trim();
    const valB = b.cells[column === 'price' || column === 'net-diff' ? 2 : 0].textContent.trim();
    return valA > valB ? sortOrder : -sortOrder;
  });

  tbody.innerHTML = '';
  tbody.append(...sortedRows);
}

function resetSort() {
  document.getElementById('trade-log').innerHTML = '';
  document.getElementById('trade-log').append(...originalRows);
}

fetchBars();
