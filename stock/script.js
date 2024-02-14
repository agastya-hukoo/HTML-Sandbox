async function fetchStockData(symbol, range) {
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=${range}&interval=1d`);
    const data = await response.json();
    console.log(data); // Log the response data to check if it's correct
    return data.chart.result[0].indicators.quote[0].close;
}


async function renderChart(symbol, range) {
    const stockData = await fetchStockData(symbol, range);

    const options = {
        series: [{
            name: `${symbol} Stock Price`,
            data: stockData
        }],
        chart: {
            type: 'line',
            height: 350,
            foreColor: '#fff',
            background: '#121212',
        },
        title: {
            text: `${symbol} Stock Price (Last ${range})`,
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

    const chartElement = document.querySelector("#chart");
    chartElement.innerHTML = ''; // Clear the previous chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
}

document.getElementById('update').addEventListener('click', () => {
    const symbol = document.getElementById('symbol').value;
    const range = document.getElementById('range').value;
    renderChart(symbol, range);
});

renderChart('AAPL', '1mo'); // Initial chart
