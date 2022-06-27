// Station info URL
const infoURL = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json';
// Station status URL
const statusURL = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json';

// Update time
const time = new Date().toLocaleTimeString('no-NO', {hour: '2-digit', minute: '2-digit'});
document.getElementById('time').textContent = 'Sist oppdatert kl. ' + time;

// Fetch data from given URL
function fetchData(url) {
    return fetch(url).then(res => res.json()).then(data => data.data);
}

// Generate cards
fetchData(infoURL).then(data => {
    for (const station of data.stations) {
        let card = document.createElement('div');
        card.innerHTML = '<h3>' + station.name + '</h3>';
        fetchStatus(station.station_id,card);
        document.body.appendChild(card);
    }
})

// Fetch station status and add to card
function fetchStatus(id,card) {
    fetchData(statusURL).then(data => {
        for (const station of data.stations) {
            if (station.station_id == id) {
                card.innerHTML += '<li><b>Ledige sykler:</b> ' + station.num_bikes_available + '</li>';
                card.innerHTML += '<li><b>Tilgjengelige låser:</b> ' + station.num_docks_available + '</li>';
                break;
            }
        }
    }
    )
}