Chart.defaults.global.defaultFontFamily = "'DM Mono', monospace";

document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = 1;
});

Papa.parse("delhi_aqi.csv", {
    download: true,
    header: true, // Ensure the first row is treated as headers
    complete: function(results) {
        const data = results.data;

        // Extract labels (Dates) and values (AQI)
        const labels = data.map(row => row.Date);
        const aqiValues = data.map(row => parseFloat(row.AQI));

        // Create the Chart
        const ctx = document.getElementById('aqiChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'AQI in Delhi',
                    data: aqiValues,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Delhi Air Quality Index Over Time',
                    font: {
                        family: 'DM Mono', 
                        size: 24 // Set title font size
                    }
                },
                scales: {
                    x: {
                        type: 'time', // Interpret x-axis as time
                        time: {
                            unit: 'day'
                        },
                        ticks: {
                            font: {
                                family: 'DM Mono', 
                                size: 14 // X-axis font size
                            }
                        },
                        title: {
                            display: true,
                            text: 'Date',
                            font: {
                                family: 'DM Mono', 
                                size: 18 // X-axis label font size
                            }
                        }
                    },
                    y: {
                        ticks: {
                            font: {
                                family: 'DM Mono', 
                                size: 14 // Y-axis font size
                            }
                        },
                        title: {
                            display: true,
                            text: 'AQI',
                            font: {
                                family: 'DM Mono', 
                                size: 18 // Y-axis label font size
                            }
                        }
                    }
                }
            }
        });
    }
});
