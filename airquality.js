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

//  Papa.parse("delhi_aqi.csv", {
//     download: true,
//     header: true, // Ensure the first row is treated as headers
//     complete: function(results) {
//         const data = results.data;

//         // Extract labels (Dates) and values (AQI)
//         const labels = data.map(row => row.Date);
//         const aqiValues = data.map(row => parseFloat(row.AQI));

//         // Create the Chart
//         const ctx = document.getElementById('aqiChart').getContext('2d');
//         new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: 'AQI',
//                     data: aqiValues,
//                     borderColor: "rgba(255, 99, 132, 1)",
//                     backgroundColor: "rgba(255, 99, 132, 0.2)",
//                     fill: false,
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 title: {
//                     display: true,
//                     text: 'Delhi Air Quality Index',
//                     fontSize: 12, // Set title font size
//                     fontFamily: 'DM Mono' // Set title font family
//                 },
//                 scales: {
//                     xAxes: [{
//                         type: 'time', // Interpret x-axis as time
//                         time: {
//                             unit: 'day'
//                         },
//                         ticks: {
//                             fontSize: 10, // X-axis font size
//                             fontFamily: 'DM Mono' // X-axis font family
//                         },
//                         scaleLabel: {
//                             display: true,
//                             labelString: 'Date',
//                             fontSize: 12, // X-axis label font size
//                             fontFamily: 'DM Mono' // X-axis label font family
//                         }
//                     }],
//                     yAxes: [{
//                         ticks: {
//                             fontSize: 10, // Y-axis font size
//                             fontFamily: 'DM Mono' // Y-axis font family
//                         },
//                         scaleLabel: {
//                             display: true,
//                             labelString: 'AQI',
//                             fontSize: 12, // Y-axis label font size
//                             fontFamily: 'DM Mono' // Y-axis label font family
//                         }
//                     }]
//                 }
//             }
//         });
//     }
// });

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
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'AQI'
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
