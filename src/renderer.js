function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
        const {lat, long}  = position.coords
    })
    if (lat && long){
        return [lat,long]
    }
    else {
        return [0,0]
    }
    
}


var map = L.map('map');
var [lat,long] = getCurrentPosition();
console.log("Lat:",lat)
console.log("Long:",long)
map.setView([lat,long], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: tokens[MapBox_Token]
}).addTo(mymap);