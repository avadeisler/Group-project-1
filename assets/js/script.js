//Global Var List
let catFact;
let lat;
let long;
let sZodia;
let sAzimuth;
let sAltitude;
let sDeclination;
let sAscension;
let sMagnitude;
let sDistance;
let lZodia;
let lAzimuth;
let lAltitude;
let lDeclination;
let lAscension;
let lMagnitude;
let lDistance;
let vZodia;
let vAzimuth;
let vAltitude;
let vDeclination;
let vAscension;
let vMagnitude;
let vDistance;
let today = dayjs().format('YYYY-MM-DD');
let oneYear = dayjs().add(1, 'year').format('YYYY-MM-DD');
let now = dayjs().format('HH:mm:ss')

let starDisplay = document.getElementById('starDisplay');

starDisplay.classList.add('bg-green')


console.log(today);
console.log(oneYear);
console.log(now);

let corsKey ='temp_3b96f43bf425f922c76ba59cea93db0a';

// Display current date in the header using Day.js
document.getElementById('currentDate').innerText = dayjs().format('dddd MM-DD-YY');

// Get current date using Day.js and format it
const currentDate = dayjs().format('YYYY-MM-DD');

// Display current date in the header
document.getElementById('currentDate').innerText = currentDate;

// Display current time after "Current Time" text
document.getElementById('currentTime').innerText = dayjs().format('hh:mm:ss A');

// Get current location
fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        const city = data.city;
        const country = data.country_name;
        document.getElementById('currentLocation').innerText = `City: ${city}, Country: ${country}`;

        lat = data.latitude;
        long = data.longitude;

        fetchBodyPosition();
        fetchMoonEvent();
        fetchMoonPhase();
    })
    .catch(error => {
        console.error('Error fetching current location:', error);
        document.getElementById('currentLocation').innerText = 'Error fetching current location';
    });

// Define your AstronomyAPI credentials
const applicationId = '7f7ceb9c-e61c-46d8-902f-6339015ada71';
const applicationSecret = 'ef4a8a96cb60bf0545d5e39a4ea8654922a0fbe4a31265c5813aeb998698bee0b65c3eaba3c58797433ba220ec75514fd40f56a4cd9f43c6c90b51ded91472aef574fa589bf394b9ecf736929be28fa2bfb57c2b726a459e074643252b996ef792b76307afab559a9e048c8241eb0d64';

// Construct the authentication string
const authString = btoa(`${applicationId}:${applicationSecret}`);

// Define the API endpoint
const apiUrl = 'https://api.astronomyapi.com/api/v2/studio/moon-phase';

// Function to fetch moon phase information from AstronomyAPI
const fetchMoonPhase = () => {
    const observer = {
        latitude: 6.56774,
        longitude: 79.88956,
        date: currentDate // Use the formatted current date
    };

    const data = JSON.stringify({
        style: {
            moonStyle: "sketch",
            backgroundStyle: "stars",
            backgroundColor: "#000000",
            headingColor: "#ffffff",
            textColor: "#ffffff"
        },
        observer,
        view: {
            type: "portrait-simple",
            orientation: "south-up"
        }
    });

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${authString}`,
            "Origin": "https://api.astronomyapi.com/api/v2/studio/moon-phase" // Set the Origin to the domain of the website
        },
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch moon phase information');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the response data to the console
        const imageUrl = data.data.imageUrl;
        document.getElementById('moonPhase').innerHTML = `<img src="${imageUrl}" alt="Moon Phase Image">`;
    })
    .catch(error => {
        console.error('Error fetching moon phase data:', error);
        document.getElementById('moonPhase').innerHTML = '<p>Error fetching moon phase information.</p>';
    });
};

// Google Maps API
// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });

  map.addListener("center_changed", () => {
    window.setTimeout(() => {
        map.panTo(marker.getPosition());
    }, 3000);
  });
  marker.addListener("click", () => {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
}
fetchCatalog();

// // Google Maps API
// // Initialize and add the map
// // Initialize and add the map
// let map;

// async function initMap() {
//     // The location of Uluru
//     const position = { lat: -25.344, lng: 131.031 };
//     // Request needed libraries.
//     //@ts-ignore
//     const { Map } = await google.maps.importLibrary("maps");
//     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
//     // The map, centered at Uluru
//     map = new Map(document.getElementById("map"), {
//       zoom: 4,
//       center: position,
//       mapId: "DEMO_MAP_ID",
//     });
  
//     // The marker, positioned at Uluru
//     const marker = new AdvancedMarkerElement({
//       map: map,
//       position: position,
//       title: "Uluru",
//     });
  
//     map.addListener("center_changed", () => {
//       window.setTimeout(() => {
//           map.panTo(marker.getPosition());
//       }, 3000);
//     });
//     marker.addListener("click", () => {
//       map.setZoom(8);
//       map.setCenter(marker.getPosition());
//     });
//   }



// window.onload = () => {
//     fetchMoonPhase();
//     initMap();
// };
window.onload = () => {
    fetchMoonPhase();
    initMap(); // Initialize Google Map
};
