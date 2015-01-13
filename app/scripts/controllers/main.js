'use strict';

/**
 * @ngdoc function
 * @name bigdriveAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bigdriveAngularApp
 */
angular.module('bigdriveAngularApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    var map = initMap();
    var pathOverlays = [];

    var source = new EventSource('/sse/');
    source.addEventListener('message', function (event) {
      try {
        var c = JSON.parse(event.data);
      } catch (err) { return; }

      if (c.type === 'path') {
        var path = addPath(map, c.lat1, c.lon1, c.lat2, c.lon2);
        pathOverlays.push(path);
      } else if (c.type === 'point') {
        var marker = addMarker(map, c.lat, c.lon);
        pathOverlays.push(marker);
      }
    });

    $scope.play = function () {
      $http.get('/api/play/')
        .success(function (data, status, headers, config) {
        });  
    };

    $scope.clearMap = function () {
      for (var i = 0; i < pathOverlays.length; i++) {
        map.removeLayer(pathOverlays[i]);
      }

      var lat = -6.890092;
      var lon = 107.6247682;
      map.setView([lat, lon], 14);
    };
  }]);


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
