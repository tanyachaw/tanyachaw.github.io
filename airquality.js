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

// let dcDataset = null;
// let sfDataset = null;

// // Initialize the Chart with Delhi by default
// const ctx = document.getElementById('aqiChart').getContext('2d');
// const aqiChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: [], // Shared time labels
//         datasets: [] // Delhi dataset added dynamically after fetching data
//     },
//     options: {
//         responsive: true,
//         title: {
//             display: true,
//             text: 'Air Quality Index (AQI)'
//         },
//         scales: {
//             xAxes: [{
//                 type: 'time',
//                 time: {
//                     unit: 'day'
//                 },
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Day',
//                     fontSize: 10
//                 },
//                 ticks: {
//                     fontSize: 10
//                 }
//             }],
//             yAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'AQI',
//                     fontSize: 10
//                 },
//                 ticks: {
//                     fontSize: 10
//                 }
//             }]
//         }
//     }
// });

// // Fetch data for a given city
// function fetchData(city, callback) {
//     let file;
//     if (city === 'Delhi') file = 'delhi_aqi.csv';
//     else if (city === 'DC') file = 'dc aqi.csv';
//     else if (city === 'SF') file = 'sf aqi.csv';
//     else return;

//     Papa.parse(file, {
//         download: true,
//         header: true,
//         complete: function(results) {
//             const data = results.data;

//             // Extract labels and AQI values
//             const labels = data.map(row => row.Date);
//             const aqiValues = data.map(row => parseFloat(row.AQI));

//             callback(labels, aqiValues);
//         }
//     });
// }

// // Prepare Delhi data and add to the chart by default
// fetchData('Delhi', (labels, aqiValues) => {
//     const delhiDataset = {
//         label: 'Delhi AQI',
//         data: aqiValues,
//         borderColor: "rgba(255, 99, 132, 1)",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         fill: false
//     };

//     aqiChart.data.labels = labels; // Use Delhi's labels as the initial labels
//     aqiChart.data.datasets.push(delhiDataset); // Add Delhi dataset
//     aqiChart.update(); // Render the chart
// });

// // Prepare DC data
// fetchData('DC', (labels, aqiValues) => {
//     dcDataset = {
//         label: 'DC AQI',
//         data: aqiValues,
//         borderColor: "rgba(54, 162, 235, 1)",
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         fill: false
//     };
// });

// // Prepare SF data
// fetchData('SF', (labels, aqiValues) => {
//     sfDataset = {
//         label: 'SF AQI',
//         data: aqiValues,
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         fill: false
//     };
// });

// // Toggle dataset visibility
// function toggleDataset(dataset) {
//     if (!dataset) {
//         alert('Data is not loaded yet. Please try again later.');
//         return; // Prevent toggling if dataset is null
//     }

//     const existingDatasetIndex = aqiChart.data.datasets.findIndex(d => d.label === dataset.label);

//     if (existingDatasetIndex > -1) {
//         // Remove the dataset if it already exists
//         aqiChart.data.datasets.splice(existingDatasetIndex, 1);
//     } else {
//         // Add the dataset if it doesn't exist
//         aqiChart.data.datasets.push(dataset);
//     }

//     aqiChart.update(); // Re-render the chart
// }

// // Button event listener to toggle DC
// document.getElementById('toggleDC').addEventListener('click', () => {
//     toggleDataset(dcDataset);
// });

// // Button event listener to toggle SF
// document.getElementById('toggleSF').addEventListener('click', () => {
//     toggleDataset(sfDataset);
// });

const datasets = {}; // Object to store datasets for all cities

// Initialize the Chart with Delhi as the default
const ctx = document.getElementById('aqiChart').getContext('2d');
const aqiChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Shared time labels
        datasets: [] // Datasets will be added dynamically
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Air Quality Index (AQI)'
        },
        legend: {
            labels: {
                fontSize: 10 // Set the font size for legend labels
            }
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

// List of cities, corresponding file names, colors, and button IDs
const cities = {
    Delhi: { file: 'delhi_aqi.csv', buttonId: null, color: 'rgba(110, 0, 0, 0.8)', backgroundColor: 'rgba(110, 0, 0, 0.8)' },
    DC: { file: 'dc aqi.csv', buttonId: 'toggleDC', color: 'rgba(50, 128, 62, 0.8)', backgroundColor: 'rgba(50, 128, 62, 0.8)' },
    SF: { file: 'sf aqi.csv', buttonId: 'toggleSF', color: 'rgba(92, 200, 101, 0.8)', backgroundColor: 'rgba(92, 200, 101, 0.8)' },
    Beijing: { file: 'beijing aqi.csv', buttonId: 'toggleBE', color: 'rgba(255, 0, 0, 0.8)', backgroundColor: 'rgba(255, 0, 0, 0.8)' },
    Berlin: { file: 'berlin aqi.csv', buttonId: 'toggleBR', color: 'rgba(245, 190, 26, 0.8)', backgroundColor: 'rgba(245, 190, 26, 0.8)' },
    //Islamabad: { file: 'islamabad aqi.csv', buttonId: 'toggleIS', color: 'rgba(179, 85, 68, 0.8)', backgroundColor: 'rgba(179, 85, 68, 0.8)' },
    Lahore: { file: 'lahore aqi.csv', buttonId: 'toggleLA', color: 'rgba(95, 0, 180, 0.8)', backgroundColor: 'rgba(95, 0, 180, 0.8)' }
};

// Fetch data for a given city
function fetchData(city, file, callback) {
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

// Initialize datasets and link buttons
Object.keys(cities).forEach(city => {
    const { file, buttonId, color, backgroundColor } = cities[city];

    // Fetch data for the city
    fetchData(city, file, (labels, aqiValues) => {
        datasets[city] = {
            label: `${city} AQI`,
            data: aqiValues,
            borderColor: color,
            backgroundColor: backgroundColor,
            fill: false
        };

        // Set initial chart labels to Delhi's data
        if (city === 'Delhi') {
            aqiChart.data.labels = labels;
            aqiChart.data.datasets.push(datasets[city]); // Add Delhi dataset
            aqiChart.update(); // Render chart with Delhi data
        }
    });

    // Add event listener to the button if it exists
    if (buttonId) {
        document.getElementById(buttonId).addEventListener('click', () => toggleDataset(city));
    }
});

// Toggle dataset visibility
function toggleDataset(city) {
    const dataset = datasets[city];

    if (!dataset) {
        alert(`Data for ${city} is not loaded yet. Please try again later.`);
        return; // Prevent toggling if dataset is null
    }

    const existingDatasetIndex = aqiChart.data.datasets.findIndex(d => d.label === dataset.label);

    if (existingDatasetIndex > -1) {
        // Remove the dataset if it already exists
        aqiChart.data.datasets.splice(existingDatasetIndex, 1);
    } else {
        // Add the dataset if it doesn't exist
        aqiChart.data.datasets.push(dataset);
    }

    aqiChart.update(); // Re-render the chart
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
            // Format labels as "Oct 1", "Oct 2", etc.
            const [month, day] = row.Date.split('/');
            const formattedDate = moment(`${month}/${day}`, "MM/DD").format("MMM D");
            labels.push(formattedDate);

            // Parse cigarette data as integers
            cigaretteData.push(parseInt(row.Cigarettes, 10));
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
                    borderColor: 'rgba(110, 0, 0, 1)',
                    backgroundColor: 'rgba(110, 0, 0, 0.2)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'How much cigarette smoke are people in Delhi breathing?'
                },
                legend: {
                    labels: {
                        fontSize: 10 // Set the font size for legend labels
                    }
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Date',
                            fontSize: 10
                        },
                        ticks: {
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of Cigarettes',
                            fontSize: 10
                        },
                        ticks: {
                            fontSize: 10
                        }
                    }]
                }
            }
        });
    }
});

// Get the new context for the pollution chart
const pollutionCtx = document.getElementById('pollutionChart').getContext('2d');

const pollutionSources = [
    "Vehicle Exhaust",
    "Road & Construction Dust",
    "Power Plants",
    "Cooking & Heating",
    "Open Waste Burning",
    "Stubble Burning",
    "Dust Storms",
    "Diwali Firecrackers"
];

const pollutionRanges = [
    { min: 10, max: 30 },   // Vehicle Exhaust
    { min: 10, max: 30 },   // Road & Construction Dust
    { min: 10, max: 30 },   // Power Plants
    { min: 10, max: 30 },   // Cooking & Heating
    { min: 5, max: 15 },    // Open Waste Burning
    { min: 3, max: 4 },    // Stubble Burning
    { min: 0, max: 5 },     // Dust Storms
    { min: 0, max: 1 }      // Diwali Firecrackers
];

// Calculate average of ranges
const pollutionAverages = pollutionRanges.map(range => (range.min + range.max) / 2);

// Create a bar chart for pollution sources
const pollutionChart = new Chart(pollutionCtx, {
    type: 'bar',
    data: {
        labels: pollutionSources,
        datasets: [
            {
                label: 'Average Contribution (%)',
                data: pollutionAverages,
                backgroundColor: [
                    'rgba(153, 0, 3, 0.8)', // Light green
                    'rgba(153, 0, 3, 0.8)', // Yellow
                    'rgba(153, 0, 3, 0.8)', // Red
                    'rgba(153, 0, 3, 0.8)', // Purple
                    'rgba(153, 0, 3, 0.8)', // Orange
                    'rgba(153, 0, 3, 0.8)',
                    'rgba(153, 0, 3, 0.8)', // Blue
                    'rgba(153, 0, 3, 0.8)' // Grey
                ],
                borderColor: [
                    'rgba(153, 0, 3, 1)',
                    'rgba(153, 0, 3, 1)',
                    'rgba(153, 0, 3, 1)',
                    'rgba(153, 0, 3, 1)',
                    'rgba(153, 0, 3, 1)',
                   'rgba(153, 0, 3, 1)',
                    'rgba(153, 0, 3, 1)',
                    'rgba(153, 0, 3, 1)'
                ],
                borderWidth: 3
            }
        ]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Annual Air Pollution Source Breakdown in Delhi'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: 0, // Minimum value for the y-axis
                    max: 30,
                    fontSize: 8
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Avg. Contribution (%)',
                    fontSize:10
                }
            }],
            xAxes: [{
                ticks: {
                    fontSize: 9
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Pollution Sources',
                    fontSize: 10
                }
            }]
        },
        legend: {
            display: false,
            labels: {
                fontSize: 12
            }
        }
    }
});














