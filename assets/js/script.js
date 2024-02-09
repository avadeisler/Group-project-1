// Global Var List
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

console.log(today);
console.log(oneYear);
console.log(now);

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
        vAscension = data.data.table.rows[3].cells[0].position.equatorial.rightAscension.hours
        ;
        vMagnitude = data.data.table.rows[3].cells[0].extraInfo.magnitude;
        vDistance = data.data.table.rows[3].cells[0].distance.fromEarth.au;

        console.log(sZodia);
        console.log(sAltitude);
        console.log(sAscension);
        console.log(sAzimuth);
        console.log(sDeclination);
        console.log(sDistance);
        console.log(sMagnitude);

        console.log(lZodia);
        console.log(lAltitude);
        console.log(lAscension);
        console.log(lAzimuth);
        console.log(lDeclination);
        console.log(lDistance);
        console.log(lMagnitude);

        console.log(vZodia);
        console.log(vAltitude);
        console.log(vAscension);
        
        console.log(vAzimuth);
        console.log(vDeclination);
        console.log(vDistance);
        console.log(vMagnitude);
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

window.onload = () => {
    fetchMoonPhase();
    initMap(); // Initialize Google Map
    fetchCatFact();

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
};
