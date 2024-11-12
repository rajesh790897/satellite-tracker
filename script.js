let map;
let issMarker;
let issPosition = { lat: 0, lng: 0 };  // Default initial position

// Initialize the Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: issPosition,
        zoom: 3,
    });

    // Create a marker for the ISS position
    issMarker = new google.maps.Marker({
        position: issPosition,
        map: map,
        title: "International Space Station (ISS)",
    });

    // Start tracking the ISS
    trackISS();
}

// Function to fetch the ISS position and update the map
function trackISS() {
    fetch("http://api.open-notify.org/iss-now.json")
        .then((response) => response.json())
        .then((data) => {
            const lat = parseFloat(data.iss_position.latitude);
            const lng = parseFloat(data.iss_position.longitude);
            issPosition = { lat, lng };

            // Update the marker position on the map
            issMarker.setPosition(issPosition);
            map.setCenter(issPosition);
        })
        .catch((error) => console.log("Error fetching ISS location:", error));

    // Update the position every 5 seconds
    setTimeout(trackISS, 5000);
}

// Initialize the map and start tracking when the page loads
window.onload = initMap;
