// JavaScript

//Global Var List
let catFact;
let lat = 40.75344;
let long = -88.29310;
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
let month = parseFloat(dayjs().format('MM'));

console.log(lat);

console.log(month);

let starDisplay = document.getElementById('starDisplay');
let positionList = document.getElementById('positionLabels');
let zodiaImg = document.getElementById('zodiac').firstElementChild;

let sunZodia = document.createElement('p');
let sunAzimuth = document.createElement('p');
let sunAltitude = document.createElement('p');
let sunDeclination = document.createElement('p');
let sunAscension = document.createElement('p');
let sunMagnitude = document.createElement('p');
let sunDistance = document.createElement('p');
let lunarZodia = document.createElement('p');
let lunarAzimuth = document.createElement('p');
let lunarAltitude = document.createElement('p');
let lunarDeclination = document.createElement('p');
let lunarAscension = document.createElement('p');
let lunarMagnitude = document.createElement('p');
let lunarDistance = document.createElement('p');
let venusZodia = document.createElement('p');
let venusAzimuth = document.createElement('p');
let venusAltitude = document.createElement('p');
let venusDeclination = document.createElement('p');
let venusAscension = document.createElement('p');
let venusMagnitude = document.createElement('p');
let venusDistance= document.createElement('p');


console.log(today);
console.log(oneYear);
console.log(now);

let corsKey ='temp_3b96f43bf425f922c76ba59cea93db0a';

// Display current date in the header using Day.js
document.getElementById('currentDate').innerText = dayjs().format('dddd MM-DD-YY');

// Display current time after "Current Time" text
document.getElementById('currentTime').innerText = dayjs().format('hh:mm:ss A');

// Get current location
// fetch('https://ipapi.co/json/')
//     .then(response => response.json())
//     .then(data => {
//         const city = data.city;
//         const country = data.country_name;
//         document.getElementById('currentLocation').innerText = `City: ${city}, Country: ${country}`;

//         lat = data.latitude;
//         long = data.longitude;
//     })
//     .catch(error => {
//         console.error('Error fetching current location:', error);
//         document.getElementById('currentLocation').innerText = 'Error fetching current location';
//     });



var astroId = 'fa8ed31d-c323-4bdd-9233-20d960020694';
var astroSecret = '54b7eb10e73c339f0d395c7fc83d455cd8cbe47e082ffd663757a9033f11fdb335c1ec0c2be03aefdce41970b072cca2eefcfa4dd2a210325020ce3ae99afb0c8c7bee8df8481148ad05bc3486bf4a59e8bc854076c10d4d95890f7a99abea95b9d07c282f98b30ff06347020fb355fe'


const authString = btoa(astroId + ':' + astroSecret);
const astroUrl = 'https://api.astronomyapi.com/api/v2';

const fetchBodyPosition = () => {
    fetch(astroUrl+'/bodies/positions?latitude='+lat+'&longitude='+long+'&from_date='+today+'&to_date='+today+'&time='+now+'&elevation=0', {
        headers: {
            'Authorization': 'Basic ' + authString
        }  
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        sZodia = data.data.table.rows[0].cells[0].position.constellation.name;
        sAzimuth = data.data.table.rows[0].cells[0].position.horizontal.azimuth.degrees;
        sAltitude = data.data.table.rows[0].cells[0].position.horizontal.altitude.degrees;
        sDeclination = data.data.table.rows[0].cells[0].position.equatorial.declination.degrees;
        sAscension = data.data.table.rows[0].cells[0].position.equatorial.rightAscension.hours;
        sMagnitude = data.data.table.rows[0].cells[0].extraInfo.magnitude;
        sDistance = data.data.table.rows[0].cells[0].distance.fromEarth.au;
        lZodia = data.data.table.rows[1].cells[0].position.constellation.name;
        lAzimuth = data.data.table.rows[1].cells[0].position.horizontal.azimuth.degrees;
        lAltitude = data.data.table.rows[1].cells[0].position.horizontal.altitude.degrees;
        lDeclination = data.data.table.rows[1].cells[0].position.equatorial.declination.degrees;
        lAscension = data.data.table.rows[1].cells[0].position.equatorial.rightAscension.hours;
        lMagnitude = data.data.table.rows[1].cells[0].extraInfo.magnitude;
        lDistance = data.data.table.rows[1].cells[0].distance.fromEarth.au;
        vZodia = data.data.table.rows[3].cells[0].position.constellation.name;
        vAzimuth = data.data.table.rows[3].cells[0].position.horizontal.azimuth.degrees;
        vAltitude = data.data.table.rows[3].cells[0].position.horizontal.altitude.degrees;
        vDeclination = data.data.table.rows[3].cells[0].position.equatorial.declination.degrees;
        vAscension = data.data.table.rows[3].cells[0].position.equatorial.rightAscension.hours;
        vMagnitude = data.data.table.rows[3].cells[0].extraInfo.magnitude;
        vDistance = data.data.table.rows[3].cells[0].distance.fromEarth.au;


        sunZodia.textContent = "Solar Zodia: " + sZodia;
        sunAzimuth.textContent = 'Solar Azimuth: ' + sAzimuth;
        sunAltitude.textContent = 'Solar Altitude: ' + sAltitude;
        sunDeclination.textContent = 'Solar Declination: ' + sDeclination;
        sunAscension.textContent = 'Solar Ascension: ' + sAscension;
        sunMagnitude.textContent = 'Solar Magnitude: ' + sMagnitude ;
        sunDistance.textContent = 'Solar Distance: ' + sDistance;
        lunarZodia.textContent = "Lunar Zodia: " + lZodia;
        lunarAzimuth.textContent = 'Lunar Azimuth: ' + lAzimuth;
        lunarAltitude.textContent = 'Lunar Altitude: ' + lAltitude;
        lunarDeclination.textContent = 'Lunar Declination: ' + lDeclination;
        lunarAscension.textContent = 'Lunar Ascension: ' + lAscension;
        lunarMagnitude.textContent = 'Lunar Magnitude: ' + lMagnitude ;
        lunarDistance.textContent = 'Lunar Distance: ' + lDistance;        
        venusZodia.textContent = "Morning Star Zodia: " + vZodia;
        venusAzimuth.textContent = 'Morning Star Azimuth: ' + vAzimuth;
        venusAltitude.textContent = 'Morning Star Altitude: ' + vAltitude;
        venusDeclination.textContent = 'Morning Star Declination: ' + vDeclination;
        venusAscension.textContent = 'Morning Star Ascension: ' + vAscension;
        venusMagnitude.textContent = 'Morning Star Magnitude: ' + vMagnitude ;
        venusDistance.textContent = 'Morning Star Distance: ' + vDistance;

        positionList.appendChild(sunZodia);
        positionList.appendChild(sunAzimuth);
        positionList.appendChild(sunAltitude);
        positionList.appendChild(sunDeclination);
        positionList.appendChild(sunAscension);
        positionList.appendChild(sunMagnitude);
        positionList.appendChild(sunDistance);
        positionList.appendChild(lunarZodia);
        positionList.appendChild(lunarAzimuth);
        positionList.appendChild(lunarAltitude);
        positionList.appendChild(lunarDeclination);
        positionList.appendChild(lunarAscension);
        positionList.appendChild(lunarMagnitude);
        positionList.appendChild(lunarDistance);
        positionList.appendChild(venusZodia);
        positionList.appendChild(venusAzimuth);
        positionList.appendChild(venusAltitude);
        positionList.appendChild(venusDeclination);
        positionList.appendChild(venusAscension);
        positionList.appendChild(venusMagnitude);
        positionList.appendChild(venusDistance);

        zodiaImg.src='./assets/images/'+sZodia+'.jpg'
    })
    .catch(error => {
        console.error('Error fetching moon phase data:', error);
        document.getElementById('moonPhase').innerHTML = '<p>Error fetching moon phase information.</p>';
    });
};

const fetchMoonEvent = () => {
    fetch(astroUrl+'/bodies/events/moon?latitude='+lat+'&longitude='+long+'&from_date='+today+'&to_date='+oneYear+'&time='+now+'&elevation=0', {
        headers: {
            'Authorization': 'Basic ' + authString
        }  
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching moon phase data:', error);
        document.getElementById('moonPhase').innerHTML = '<p>Error fetching moon phase information.</p>';
    });
};







// Function to fetch moon phase information from AstronomyAPI
const fetchMoonPhase = () => {
    const observer = {
        latitude: lat,
        longitude: long,
        date: today // Use the formatted current date
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

    fetch(astroUrl+'/studio/moon-phase', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${authString}`,
            // "Origin": "https://api.astronomyapi.com/api/v2/studio/moon-phase" // Set the Origin to the domain of the website
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
        const imageUrl = data.data.imageUrl;
        document.getElementById('moonPhase').innerHTML = `<img src="${imageUrl}" alt="Moon Phase Image">`; // Display moon phase image
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
        console.log(data);
        catFact = data[0].text;
        console.log(catFact);
    })
    .catch(error => {
        console.error('Error fetching cat data:', error);
    })
}

fetchCatFact();

function fetchCatalog() {
    fetch('https://api.astrocats.space')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Error fetching cat data:', error);
    })
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
// }

fetchBodyPosition();
    fetchMoonEvent();
    fetchMoonPhase();
    



const constellations = [
    {
        name: "Andromeda, Triangulum",
        latRange: [-40, 90],
        monthRange: [9, 10, 11, 12, 1, 2]
    },
    {
        name: "Aquarius",
        latRange: [-90, 65],
        monthRange: [9, 10, 11, 12, 1, 2]
    },
    {
        name: "Aries",
        latRange: [-60, 90],
        monthRange: [10, 11, 12, 1, 2, 3]
    },
    {
        name: "Auriga",
        latRange: [-40, 90],
        monthRange: [11, 12, 1, 2, 3]
    },
    {
        name: "Bootes, Canes Venatici, Coma Berenices",
        latRange: [-50, 90],
        monthRange: [3, 4, 5, 6, 7]
    },
    {
        name: "Camelopardalis",
        latRange: [20, 90],
        monthRange: [12, 1, 2, 3]
    },
    {
        name: "Cancer",
        latRange: [-60, 90],
        monthRange: [3, 4, 5, 6]
    },
    {
        name: "Canis Major, Lepus, Columba Noachi, Caelum",
        latRange: [-90, 60],
        monthRange: [12, 1, 2, 3]
    },
    {
        name: "Capricornus",
        latRange: [-90, 60],
        monthRange: [8, 9, 10]
    },
    {
        name: "Cassiopeia",
        latRange: [-20, 90],
        monthRange: [9, 10, 11, 12, 1, 2, 3, 4]
    },
    {
        name: "Cepheus",
        latRange: [-10, 90],
        monthRange: [10, 11, 12, 1, 2, 3]
    },
    {
        name: "Cetus, Eridanus, Sculptor, Fornax",
        latRange: [-90, 70],
        monthRange: [11, 12, 1, 2, 3]
    },
    {
        name: "Delphinus, Sagitta, Aquila",
        latRange: [-70, 90],
        monthRange: [8, 9, 10]
    },
    {
        name: "Draco",
        latRange: [-15, 90],
        monthRange: [4, 5, 6, 7, 8, 9]
    },
    {
        name: "Gemini",
        latRange: [-60, 90],
        monthRange: [12, 1, 2, 3, 4]
    },
    {
        name: "Hercules, Corona Borealis",
        latRange: [-50, 90],
        monthRange: [4, 5, 6, 7, 8, 9]
    },
    {
        name: "Hydra, Corvus, Crater, Sextans, Lupus, Centaurus, Antlia, Pyxis",
        latRange: [-83, 54],
        monthRange: [3, 4, 5]
    },
    {
        name: "Lacerta, Cygnus, Lyra, Vulpecula",
        latRange: [40, 90],
        monthRange: [9, 10, 11, 12, 1, 2]
    },
    {
        name: "Leo Major, Leo Minor",
        latRange: [-65, 90],
        monthRange: [3, 4, 5, 6]
    },
    {
        name: "Libra",
        latRange: [-90, 65],
        monthRange: [4, 5, 6, 7, 8]
    },
    {
        name: "Lynx, Telescopium",
        latRange: [40, 90],
        monthRange: [12, 1, 2, 3]
    },
    {
        name: "Monoceros, Canis Minor",
        latRange: [-90, 75],
        monthRange: [12, 1, 2, 3]
    },
    {
        name: "Ophiuchus, Serpens, Scutum",
        latRange: [-80, 80],
        monthRange: [7, 8, 9]
    },
    {
        name: "Orion",
        latRange: [-75, 85],
        monthRange: [12, 1, 2, 3]
    },
    {
        name: "Pegasus, Equuleus",
        latRange: [-60, 90],
        monthRange: [9, 10, 11, 12, 1, 2, 3]
    },
    {
        name: "Perseus",
        latRange: [-35, 90],
        monthRange: [9, 10, 11, 12, 1, 2, 3]
    },
    {
        name: "Pisces",
        latRange: [-65, 90],
        monthRange: [10, 11, 12, 1, 2, 3]
    },
    {
        name: "Sagittarius, Corona Australis",
        latRange: [-90, 60],
        monthRange: [6, 7, 8]
    },
    {
        name: "Scorpius",
        latRange: [-90, 40],
        monthRange: [4, 5, 6, 7]
    },
    {
        name: "Taurus",
        latRange: [-65, 90],
        monthRange: [12, 1, 2, 3]
    },
    {
        name: "Ursa Minor",
        latRange: [10, 90],
        monthRange: [3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
        name: "Ursa Major",
        latRange: [-30, 90],
        monthRange: [3, 4, 5, 6, 7, 8, 9, 10]
    }
];

console.log(constellations);

function displayConstellation() {

    let visibleConstellations = [];

    for (i=0; i<constellations.length; i++) {
        console.log(lat);
        console.log(constellations[i].latRange)
        console.log(month);

        if (lat >= constellations[i].latRange[0] && lat <= constellations[i].latRange[1] &&
            constellations[i].monthRange.includes(month)) {
            visibleConstellations.push(constellations[i].name);
            console.log(constellations[i])
        }
    }
    const constellationElement = document.getElementById("constellation");
    if (visibleConstellations.length > 0) {
        constellationElement.textContent = visibleConstellations.join(", ");
    } else {
        constellationElement.textContent = "No visible constellations for the given latitude and month.";
    }

    console.log(constellations[1])
}


displayConstellation();