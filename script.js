function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: 0, lng: 0 }
  });

  const marker = new google.maps.Marker({
    position: { lat: 0, lng: 0 },
    map: map,
    title: "International Space Station"
  });

  function updateISSPosition() {
    fetch('https://api.open-notify.org/iss-now.json')
      .then(response => response.json())
      .then(data => {
        const { latitude, longitude } = data.iss_position;
        marker.setPosition({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
        map.setCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
      })
      .catch(error => console.error('Error fetching ISS data:', error));
  }

  // Update ISS position every 10 seconds
  setInterval(updateISSPosition, 10000);

  updateISSPosition(); // Initial update
}
