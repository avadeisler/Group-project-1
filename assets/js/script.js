// JavaScript

//Global Var List
let catFact;

let corsKey ='temp_3b96f43bf425f922c76ba59cea93db0a';

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
const apiUrl = 'httpss://proxy.cors.sh/https://api.meteomatics.com/2024-02-02T00:00:00ZP1D:P1D/moon_phase:idx/50,10/json';

// fetch('https://proxy.cors.sh/https://acme.com', {
//   headers: {
//   'x-cors-api-key': 'temp_3b96f43bf425f922c76ba59cea93db0a'
//   }
// })


// Function to fetch moon phase information from Meteomatics API
// const fetchMoonPhase = () => {
//     fetch(apiUrl, {
//         headers: {
//             'Authorization': 'Basic ' + btoa(username + ':' + password)
//         }
        
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to fetch moon phase information');
//         }
//         console.log(response);
//         return response.json();
//     })
//     .then(data => {
//         console.log("Hello");
//         const moonPhase = data.moon_phase;
        
//         // Display moon phase information
//         document.getElementById('moonPhase').innerHTML = `<p>Moon Phase: ${moonPhase}</p>`;
//     })
//     .catch(error => {
//         console.error('Error fetching moon phase data:', error);
//         document.getElementById('moonPhase').innerHTML = '<p>Error fetching moon phase information.</p>';
//     });
// };

// Call the fetchMoonPhase function when the page loads
var astroId = 'fa8ed31d-c323-4bdd-9233-20d960020694';
var astroSecret = '54b7eb10e73c339f0d395c7fc83d455cd8cbe47e082ffd663757a9033f11fdb335c1ec0c2be03aefdce41970b072cca2eefcfa4dd2a210325020ce3ae99afb0c8c7bee8df8481148ad05bc3486bf4a59e8bc854076c10d4d95890f7a99abea95b9d07c282f98b30ff06347020fb355fe'


const authString = btoa(astroId + ':' + astroSecret);
const astroUrl = 'https://api.astronomyapi.com/api/v2/bodies';

const fetchMoonPhase = () => {
    fetch(astroUrl, {
        // credentials: 'include',
        headers: {
            'Authorization': 'Basic ' + authString
        }  
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Failed to fetch moon phase information');
        // }
        // console.log(response);
        return response.json();
    })
    .then(data => {
        // console.log("Hello");
        console.log(data);
        // const moonPhase = data.moon_phase;
        
        // Display moon phase information
        // document.getElementById('moonPhase').innerHTML = `<p>Moon Phase: ${moonPhase}</p>`;
    })
    .catch(error => {
        console.error('Error fetching moon phase data:', error);
        document.getElementById('moonPhase').innerHTML = '<p>Error fetching moon phase information.</p>';
    });
};

const catFactUrl = 'https://cat-fact.herokuapp.com/facts';

const fetchCatFact = () => {
    fetch(catFactUrl)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        catFact = data[0].text;
        console.log(catFact);
    })
    .catch(error => {
        console.error('Error fetching cat data:', error);
    })
}


window.onload = fetchMoonPhase;
fetchCatFact();