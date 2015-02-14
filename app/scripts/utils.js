'use strict';


function initMap() {
  var lat = -6.890092;
  var lon = 107.6247682;
  var map = L.map('map').setView([lat, lon], 14);

  L.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy OpenStreetMap',
    maxZoom: 18  
  }).addTo(map);

  return map;
}


function clearMap(map, pathOverlays) {
  for (var i = 0; i < pathOverlays.length; i++) {
    map.removeLayer(pathOverlays[i]);
  }

  var lat = -6.890092;
  var lon = 107.6247682;
  map.setView([lat, lon], 14);
}

function addMarker(map, lat, lon) {
  var marker = L.marker([lat, lon]).addTo(map);
  map.setView([lat, lon], 14);
  return marker;
}


function addPath(map, lat1, lon1, lat2, lon2) {
  var a = new L.LatLng(lat1, lon1);
  var b = new L.LatLng(lat2, lon2);

  var line = new L.Polyline([a, b], {
    color: 'red',
    weight: 3,
    smoothFactor: 1,
  });

  line.addTo(map);
  map.setView([lat2, lon2], 14);

  return line;
} 


function getCurrentDate() {
  var d = new Date();
  var month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  var currDate = d.getFullYear() + '-' + month + '-' + d.getDate();
  return currDate;
}
