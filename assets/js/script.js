// Display current date in the header
$("#currentDay").text(dayjs().format("dddd MM/DD/YY"));

// Construct the API request URL for Meteomatics API
const apiUrl = "https://api.meteomatics.com/2024-02-02T00:00:00ZP15D:P1D/moon_phase:idx/50,10/json";

// Function to fetch moon phase information from Meteomatics API
const fetchMoonPhase = () => {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch moon phase information');
            }
            return response.json();
        })
        .then(data => {
            const moonPhase = data.data[0].moon_phase.value;

            // Display moon phase information
            document.getElementById('moonPhase').innerHTML = `<p>Moon Phase: ${moonPhase}</p>`;
        })
        .catch(error => {
            console.error('Error fetching moon phase data:', error);
            document.getElementById('moonPhase').innerHTML = '<p>Error fetching moon phase information.</p>';
        });
};

// Call the fetchMoonPhase function when the page loads
window.onload = fetchMoonPhase;