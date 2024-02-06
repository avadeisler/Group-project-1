// JavaScript

// Display current date in the header using Day.js
document.getElementById('currentDate').innerText = dayjs().format('dddd MM-DD-YY');

// Display current time after "Current Time" text
document.getElementById('currentTime').innerText = dayjs().format('hh:mm:ss A');

// Get current location
fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        const city = data.city;
        const country = data.country_name;
        document.getElementById('currentLocation').innerText = `City: ${city}, Country: ${country}`;
    })
    .catch(error => {
        console.error('Error fetching current location:', error);
        document.getElementById('currentLocation').innerText = 'Error fetching current location';
    });

// Define your Meteomatics API credentials
const username = 'home_asenciomorales_carlos';
const password = 'KiyoL21L3u';

// Construct the API request URL
const apiUrl = 'https://api.meteomatics.com/2024-02-02T00:00:00ZP15D:P1D/moon_phase:idx/50,10/json';

// Function to fetch moon phase information from Meteomatics API
const fetchMoonPhase = () => {
    fetch(apiUrl, {
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        }
        
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch moon phase information');
        }
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log("Hello");
        const moonPhase = data.moon_phase;
        
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