Chart.defaults.global.defaultFontFamily = "'DM Mono', monospace";

document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = 1;
});

function dark() {
    const body = document.body;
    const button = document.querySelector('#button1');
    const headerImage = document.getElementById('headerImage');
    const links = document.querySelectorAll('a');
 
    if (body.style.backgroundColor === 'black') {
     // Switch to light mode
     body.style.backgroundColor = 'white';
     body.style.color = 'black';
     headerImage.src = 'header.png'; // Replace with your light mode header image path
     button.textContent = 'dark mode'; // Update button text
 
     links.forEach(link => {
         link.style.color = ''; // Reset to default (or initial CSS)
     });
 
     } else {
 
     body.style.backgroundColor = 'black';
     body.style.color = 'white';
     headerImage.src = 'header white.png'
     button.textContent = 'light mode';
 
     links.forEach(link => {
         link.style.color = 'rgb(249, 240, 158)'; // Set dark mode link color
     });
     }
 }
// Dataset placeholders
let dcDataset = null;

// Initialize the Chart with Delhi by default
const ctx = document.getElementById('aqiChart').getContext('2d');
const aqiChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Shared time labels
        datasets: [] // Delhi dataset added dynamically after fetching data
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Air Quality Index (AQI)'
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day'
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Day',
                    fontSize: 10
                },
                ticks: {
                    fontSize: 10
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'AQI',
                    fontSize: 10
                },
                ticks: {
                    fontSize: 10
                }
            }]
        }
    }
});

// Fetch data for both cities
function fetchData(city, callback) {
    const file = city === 'Delhi' ? 'delhi_aqi.csv' : 'dc aqi.csv';
    Papa.parse(file, {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;

            // Extract labels and AQI values
            const labels = data.map(row => row.Date);
            const aqiValues = data.map(row => parseFloat(row.AQI));

            callback(labels, aqiValues);
        }
    });
}

// Prepare Delhi data and add to the chart by default
fetchData('Delhi', (labels, aqiValues) => {
    const delhiDataset = {
        label: 'Delhi AQI',
        data: aqiValues,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false
    };

    aqiChart.data.labels = labels; // Use Delhi's labels as the initial labels
    aqiChart.data.datasets.push(delhiDataset); // Add Delhi dataset
    aqiChart.update(); // Render the chart
});

// Prepare DC data
fetchData('DC', (labels, aqiValues) => {
    dcDataset = {
        label: 'DC AQI',
        data: aqiValues,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false
    };
});

// Button event listener to toggle DC
document.getElementById('toggleDC').addEventListener('click', () => {
    toggleDataset(dcDataset);
});

// Toggle dataset visibility
function toggleDataset(dataset) {
    const existingDatasetIndex = aqiChart.data.datasets.findIndex(d => d.label === dataset.label);

    if (existingDatasetIndex > -1) {
        // Remove the dataset if it already exists
        aqiChart.data.datasets.splice(existingDatasetIndex, 1);
    } else {
        // Add the dataset if it doesn't exist
        aqiChart.data.datasets.push(dataset);
    }

    aqiChart.update();
}

// Define file paths and colors for each year
const yearFiles = {
    2019: '2019_gs.csv',
    2020: '2020_gs.csv',
    2021: '2021_gs.csv',
    2022: '2022_gs.csv',
    2023: '2023_gs.csv',
};

const yearColors = {
    2019: 'rgba(255, 99, 132, 1)',
    2020: 'rgba(54, 162, 235, 1)',
    2021: 'rgba(75, 192, 192, 1)',
    2022: 'rgba(153, 102, 255, 1)',
    2023: 'rgba(255, 206, 86, 1)',
};

// Prepare datasets array and month labels
const trendDatasets = [];
const monthLabels = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

// Fetch and process data for each year
Promise.all(Object.keys(yearFiles).map(year => {
    return new Promise((resolve) => {
        Papa.parse(yearFiles[year], {
            download: true,
            header: true,
            complete: function(results) {
                const data = results.data;
                const popularityByMonth = Array(12).fill(0); // Initialize array for monthly averages
                const counts = Array(12).fill(0); // Count of weeks per month

                // Aggregate popularity by month
                data.forEach(row => {
                    const [month, day] = row.Week.split('-'); // Extract month (MM)
                    const monthIndex = parseInt(month, 10) - 1; // Convert to 0-based index
                    popularityByMonth[monthIndex] += parseFloat(row.Popularity);
                    counts[monthIndex]++;
                });

                // Calculate monthly averages
                const monthlyAverages = popularityByMonth.map((total, index) =>
                    counts[index] > 0 ? total / counts[index] : 0
                );

                // Create dataset for this year
                trendDatasets.push({
                    label: `${year}`,
                    data: monthlyAverages,
                    borderColor: yearColors[year],
                    fill: false
                });

                resolve();
            }
        });
    });
})).then(() => {
    // Create the chart
    const ctx = document.getElementById('searchTrendsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthLabels, // X-axis labels as months
            datasets: trendDatasets,
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Worldwide Google Search Trends of "delhi aqi"'
            },
            plugins: {
                legend: {
                    display: true
                },
            },
            scales: {
                xAxes : [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Month',
                        fontSize: 10
                    },
                    ticks: {
                        fontSize: 10
                    }
                }],

                yAxes : [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Avg. Popularity',
                        fontSize: 10
                    },
                    ticks: {
                        fontSize: 10
                    }
                }]
            },
        },
    });
});

Papa.parse("cigarettes.csv", {
    download: true,
    header: true,
    complete: function(results) {
        const data = results.data;

        // Prepare the data for the chart
        const labels = [];
        const cigaretteData = [];

        data.forEach(row => {
            labels.push(row.Date); // Use the "Date" column for X-axis labels
            cigaretteData.push(parseFloat(row.Cigarettes)); // Use "Cigarettes" column for Y-axis values
        });

        // Create the chart
        const ctx = document.getElementById('cigarettesChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels, // Dates
                datasets: [{
                    label: 'Cigarettes Passively Breathed in Delhi (per day)',
                    data: cigaretteData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Cigarettes'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }
});










