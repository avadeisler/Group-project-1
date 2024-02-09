//Global Var List
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

// Function to initialize Google Map
function initMap() {
    const myLatlng = { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng,
    });
    const marker = new google.maps.Marker({
        position: myLatlng,
        map,
        title: "Click to zoom",
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

// Define your AstronomyAPI credentials and API endpoint
const applicationId = '7f7ceb9c-e61c-46d8-902f-6339015ada71';
const applicationSecret = 'ef4a8a96cb60bf0545d5e39a4ea8654922a0fbe4a31265c5813aeb998698bee0b65c3eaba3c58797433ba220ec75514fd40f56a4cd9f43c6c90b51ded91472aef574fa589bf394b9ecf736929be28fa2bfb57c2b726a459e074643252b996ef792b76307afab559a9e048c8241eb0d64';
const authString = btoa(`${applicationId}:${applicationSecret}`);
const apiUrl = 'https://api.astronomyapi.com/api/v2/studio/moon-phase';

// Function to fetch moon phase information from AstronomyAPI
const fetchMoonPhase = () => {
    const observer = {
        latitude: 6.56774,
        longitude: 79.88956,
        date: currentDate
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
            "Origin": "https://api.astronomyapi.com/api/v2/studio/moon-phase"
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
        console.log(data);
        const imageUrl = data.data.imageUrl;
        document.getElementById('moonPhase').innerHTML = `<img src="${imageUrl}" alt="Moon Phase Image">`;
    })
    .catch(error => {
        console.error('Error fetching moon phase data:', error);
        document.getElementById('moonPhase').innerHTML = '<p>Error fetching moon phase information.</p>';
    });
};

window.onload = () => {
    fetchMoonPhase();
    initMap(); // Initialize Google Map
};
