async function fetchStockData(symbol) {
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1mo&interval=1d`);
    const data = await response.json();
    return data.chart.result[0].indicators.quote[0].close;
}

async function renderChart() {
    const stockSymbol = 'AAPL'; // Example stock symbol
    const stockData = await fetchStockData(stockSymbol);

    const options = {
        series: [{
            name: `${stockSymbol} Stock Price`,
            data: stockData
        }],
        chart: {
            type: 'line',
            height: 350,
            foreColor: '#fff',
            background: '#121212',
        },
        title: {
            text: `${stockSymbol} Stock Price (Last Month)`,
            align: 'center',
            style: {
                color: '#fff',
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: '#fff',
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#fff',
                }
            }
        }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

renderChart();
