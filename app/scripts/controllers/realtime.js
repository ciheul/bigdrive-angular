'use strict';

/**
 * @ngdoc function
 * @name bigdriveAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bigdriveAngularApp
 */
angular.module('bigdriveAngularApp')
  .controller('RealTimeCtrl', ['$scope', '$http', function ($scope, $http) {

    var map = initMap();
    var pathOverlays = [];

    $http.get('/devices/')
      .success(function (data, status, headers, config) {
        $scope.devices = data;
      });

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


