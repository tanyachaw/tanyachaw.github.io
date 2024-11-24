document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = 1;
});

document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("map");
    const tooltip = document.getElementById("tooltip");

    // Load the SVG dynamically
    fetch("in.svg")
        .then(response => response.text())
        .then(svgData => {
            // Insert the SVG into the container
            mapContainer.innerHTML = svgData;

            const map = mapContainer.querySelector("svg");

            // Fetch the CSV data
            fetch("carbs.csv")
                .then(response => response.text())
                .then(csvData => {
                    const rows = csvData.split("\n").slice(1); // Skip header
                    const stateData = {};

                    rows.forEach(row => {
                        const [state, carbs] = row.split(",");
                        stateData[state.trim()] = +carbs.trim();
                    });

                    // Calculate max and min carbs for coloring
                    const carbsValues = Object.values(stateData);
                    const maxCarbs = Math.max(...carbsValues);
                    const minCarbs = Math.min(...carbsValues);

                    // Scale the colors based on carbs value
                    const getColor = (value) => {
                        const intensity = Math.round((255 * (value - minCarbs)) / (maxCarbs - minCarbs));
                        return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
                    };

                    // Apply colors to map
                    Object.keys(stateData).forEach(state => {
                        const path = map.querySelector(`[id="${state}"], [data-name="${state}"]`);
                        if (path) {
                            path.style.fill = getColor(stateData[state]);

                            // Add hover interaction
                            path.addEventListener("mouseenter", (e) => {
                                tooltip.style.display = "block";
                                tooltip.textContent = `${state}: ${stateData[state]}g carbs`;
                                tooltip.style.left = `${e.pageX + 10}px`;
                                tooltip.style.top = `${e.pageY + 10}px`;
                            });

                            path.addEventListener("mousemove", (e) => {
                                tooltip.style.left = `${e.pageX + 10}px`;
                                tooltip.style.top = `${e.pageY + 10}px`;
                            });

                            path.addEventListener("mouseleave", () => {
                                tooltip.style.display = "none";
                            });
                        }
                    });
                })
                .catch(error => console.error("Error loading CSV:", error));
        })
        .catch(error => console.error("Error loading SVG:", error));
});