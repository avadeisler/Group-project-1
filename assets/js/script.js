 // Display current date in the header
 $("#currentDay").text(dayjs().format("dddd MM/DD/YY"));

 // GEt info frm 7 timer API
// Fetch data from the provided APIs
fetch("http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json")
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the fetched data to the console for testing
        
        // Example: Displaying sunrise and sunset times
        const sunriseTime = data.astronomy.astro[0].sunrise;
        const sunsetTime = data.astronomy.astro[0].sunset;
        
        // Update the DOM with the fetched data
        document.getElementById("sunriseTime").textContent = sunriseTime;
        document.getElementById("sunsetTime").textContent = sunsetTime;
    })
    .catch(error => console.error('Error fetching data:', error));
