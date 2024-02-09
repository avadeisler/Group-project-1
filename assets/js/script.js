// Global Var List
let catFact;

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

window.onload = () => {
    fetchMoonPhase();
    initMap(); // Initialize Google Map
};

// Additional JavaScript code

const today = moment().format('YYYY-MM-DD')

const newMoonDays  = ['2022-01-02', '2022-02-01','2022-03-02', '2022-04-01', '2022-04-30', '2022-05-30', '2022-06-29', '2022-07-28', '2022-08-27', '2022-09-25', '2022-10-25', '2022-11-23', '2022-12-23']
const fullMoonDays= ['2022-01-18','2022-02-16','2022-03-18', '2022-04-16', '2022-05-16', '2022-06-14', '2022-07-13', '2022-08-12', '2022-09-10', '2022-10-09', '2022-11-08', '2022-12-08']

const nextFull = fullMoonDays.find(el => moment(el, 'YYYY-MM-DD').format('YYYY-MM-DD') >= today )
const nextNew = newMoonDays.find(el => moment(el, 'YYYY-MM-DD').format('YYYY-MM-DD') >= today)

const diff = moment(nextFull).diff(today, 'days')
const diffNew = moment(nextNew).diff(today, 'days')

const type = diff < diffNew ? "Full Moon" : 'New Moon'
const diffText = Math.min(diff, diffNew) > 1 ? `${Math.min(diff, diffNew)} days` : Math.min(diff, diffNew) === 1 ? `1 day` : ''

let className = ''
if (diff < diffNew) {
  className = diffNew > 0 ? `moon-full-${diff}` : 'moon-full'
} else {
  className = diffNew > 0 ? `moon-new-${diffNew}` : 'moon-new'
  
}
//className = 'moon-full-6'
const MOON = document.getElementById("moon")
const TYPE = document.getElementById("type")
const COUNT = document.getElementById("count")
MOON.classList.add(className)
TYPE.innerHTML = type
COUNT.innerHTML = diffText
